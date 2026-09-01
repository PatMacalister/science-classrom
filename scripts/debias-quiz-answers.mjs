/**
 * One-shot codemod: de-bias multiple-choice answer positions in the Spark
 * and Catalyst quizzes (pre-fix: 77% / 85% of correct answers sat on B, and
 * 32 quizzes were answerable by always picking B).
 *
 * For each question it swaps the correct choice with the choice at a target
 * position drawn from a balanced, seeded shuffle — and applies the SAME swap
 * to the German translation of that question, so EN and DE answer indices
 * stay in lockstep (localize.tsx and the review deck rely on that).
 *
 * Only choice positions move; no text changes. Questions whose wording is
 * position-dependent ("none of the above", "Option A", …) are left alone.
 * Deterministic (fixed PRNG seed) but NOT idempotent — a second --apply
 * reshuffles again. Verify with scripts/check-quiz-parity.mjs afterwards.
 *
 *   node scripts/debias-quiz-answers.mjs           # dry run, report only
 *   node scripts/debias-quiz-answers.mjs --apply   # rewrite the files
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  parseSource,
  unitFiles,
  collectEnLessons,
  collectDeEntries,
  applyEdits,
} from "./curriculum-ast.mjs";

const APPLY = process.argv.includes("--apply");
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const COURSES = ["catalyst", "spark"];

/* Wording that ties a choice to its position — such questions must not move. */
const POSITIONAL =
  /of the above|of these (is|are)|all of the above|none of the above|both of the above|\boption [a-d]\b|\banswer [a-d]\b|alle genannten|keines? davon|beides davon|nichts davon|\bantwort [a-d]\b/i;

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(0xa11ce);
const shuffled = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const histogram = (answers) => {
  const h = [0, 0, 0, 0];
  for (const a of answers) h[a] = (h[a] ?? 0) + 1;
  return h.map((c, i) => `${"ABCD"[i]}:${c}`).join(" ");
};

let failed = false;
const fail = (msg) => {
  failed = true;
  console.error(`  ✗ ${msg}`);
};

for (const course of COURSES) {
  const dir = path.join(ROOT, "src", course, "lib", "curriculum");
  const enSrcs = unitFiles(dir).map(parseSource);
  const deSrcs = unitFiles(path.join(dir, "de")).map(parseSource);
  const enLessons = enSrcs.flatMap(collectEnLessons).filter((l) => l.quiz?.length);
  const deBySlug = new Map(
    deSrcs.flatMap(collectDeEntries).filter((e) => e.quiz?.length).map((e) => [e.slug, e])
  );

  console.log(`\n=== ${course}: ${enLessons.length} quizzes ===`);

  /* -- validate EN↔DE lockstep before touching anything ------------------- */
  for (const en of enLessons) {
    const de = deBySlug.get(en.slug);
    for (const [qi, q] of en.quiz.entries()) {
      if (!q) fail(`${en.slug} q${qi + 1}: unparseable EN question`);
      else if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.choices.length)
        fail(`${en.slug} q${qi + 1}: answer ${q.answer} out of range`);
    }
    if (!de) continue; // no DE quiz → German falls back to EN; EN-only swap is safe
    if (de.quiz.length !== en.quiz.length) {
      fail(`${en.slug}: EN has ${en.quiz.length} questions, DE has ${de.quiz.length}`);
      continue;
    }
    for (const [qi, q] of en.quiz.entries()) {
      const dq = de.quiz[qi];
      if (!dq) fail(`${en.slug} q${qi + 1}: unparseable DE question`);
      else if (dq.choices.length !== q.choices.length)
        fail(`${en.slug} q${qi + 1}: choice count EN ${q.choices.length} vs DE ${dq.choices.length}`);
      else if (dq.answer !== q.answer)
        fail(`${en.slug} q${qi + 1}: answer EN ${q.answer} vs DE ${dq.answer} — fix before debiasing`);
    }
  }
  if (failed) continue;

  /* -- decide swaps ------------------------------------------------------- */
  const before = [];
  const after = [];
  const edits = new Map(); // file → edit list
  const addEdit = (src, range, text) => {
    if (!edits.has(src.file)) edits.set(src.file, { src, list: [] });
    edits.get(src.file).list.push({ start: range.start, end: range.end, text });
  };
  let swapped = 0;
  let guarded = 0;
  const allSameBefore = [];
  const allSameAfter = [];

  for (const en of enLessons) {
    const de = deBySlug.get(en.slug);
    const finals = [];
    const targets = shuffled(en.quiz.map((_, i) => i % 4));

    en.quiz.forEach((q, qi) => {
      before.push(q.answer);
      const dq = de?.quiz[qi];
      const wording = [q.q, q.explain, ...q.choices.map((c) => c.text)]
        .concat(dq ? [dq.q, dq.explain, ...dq.choices.map((c) => c.text)] : [])
        .join(" ");
      if (POSITIONAL.test(wording)) {
        guarded++;
        finals.push({ q, dq, to: q.answer });
        return;
      }
      finals.push({ q, dq, to: targets[qi] % q.choices.length });
    });

    // never leave a quiz all-same-position
    if (finals.length >= 2 && new Set(finals.map((f) => f.to)).size === 1) {
      const f = finals[finals.length - 1];
      f.to = (f.to + 1) % f.q.choices.length;
    }

    if (en.quiz.length >= 2 && new Set(en.quiz.map((q) => q.answer)).size === 1)
      allSameBefore.push(en.slug);
    if (finals.length >= 2 && new Set(finals.map((f) => f.to)).size === 1)
      allSameAfter.push(en.slug);

    for (const { q, dq, to } of finals) {
      after.push(to);
      const from = q.answer;
      if (from === to) continue;
      swapped++;
      addEdit(en.src, q.choices[from], q.choices[to].text);
      addEdit(en.src, q.choices[to], q.choices[from].text);
      addEdit(en.src, q.answerRange, String(to));
      if (dq) {
        addEdit(de.src, dq.choices[from], dq.choices[to].text);
        addEdit(de.src, dq.choices[to], dq.choices[from].text);
        addEdit(de.src, dq.answerRange, String(to));
      }
    }
  }

  console.log(`  before: ${histogram(before)}  all-same quizzes: ${allSameBefore.length}`);
  console.log(`  after:  ${histogram(after)}  all-same quizzes: ${allSameAfter.length}`);
  console.log(`  questions moved: ${swapped}, position-locked (wording): ${guarded}`);

  if (!APPLY) continue;

  /* -- apply and self-verify --------------------------------------------- */
  const expectedTexts = new Map(); // slug → per-question sorted choice texts (EN)
  for (const en of enLessons)
    expectedTexts.set(en.slug, en.quiz.map((q) => q.choices.map((c) => c.text).sort()));

  for (const { src, list } of edits.values()) {
    fs.writeFileSync(src.file, applyEdits(src.text, list));
  }

  const reEn = unitFiles(dir).map(parseSource).flatMap(collectEnLessons).filter((l) => l.quiz?.length);
  const reDe = new Map(
    unitFiles(path.join(dir, "de")).map(parseSource).flatMap(collectDeEntries)
      .filter((e) => e.quiz?.length).map((e) => [e.slug, e])
  );
  for (const en of reEn) {
    const exp = expectedTexts.get(en.slug);
    const de = reDe.get(en.slug);
    en.quiz.forEach((q, qi) => {
      const got = q.choices.map((c) => c.text).sort();
      if (JSON.stringify(got) !== JSON.stringify(exp[qi]))
        fail(`${en.slug} q${qi + 1}: choice texts changed during rewrite`);
      if (de && de.quiz[qi].answer !== q.answer)
        fail(`${en.slug} q${qi + 1}: EN/DE answers desynced during rewrite`);
    });
  }
  console.log(failed ? "  ✗ post-apply verification FAILED" : "  ✓ applied and self-verified");
}

process.exit(failed ? 1 : 0);
