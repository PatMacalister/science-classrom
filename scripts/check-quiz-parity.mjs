/**
 * EN↔DE curriculum parity checker — runs on prebuild and fails the build
 * when a German translation drifts from its English original in a way that
 * breaks stored progress or the review deck:
 *
 *  - quiz: question count, per-question choice count, answer index
 *    (the review deck stores question indices and grades against `answer`)
 *  - numeric problems: answer / tolerancePct must be textually equal
 *    (unit is display text and may be translated — "molecules"/"Moleküle")
 *  - checklists: id sequence must match (progress is keyed `slug:id`)
 *
 * A German entry may omit any section — it falls back to English — but a
 * section that IS translated must match its original exactly.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  parseSource,
  unitFiles,
  collectEnLessons,
  collectDeEntries,
} from "./curriculum-ast.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const COURSES = ["spark", "catalyst", "helix", "vector", "servo"];

let failures = 0;
const fail = (course, msg) => {
  failures++;
  console.error(`  ✗ [${course}] ${msg}`);
};

for (const course of COURSES) {
  const dir = path.join(ROOT, "src", course, "lib", "curriculum");
  const enLessons = unitFiles(dir).map(parseSource).flatMap(collectEnLessons);
  const deBySlug = new Map(
    unitFiles(path.join(dir, "de")).map(parseSource).flatMap(collectDeEntries).map((e) => [e.slug, e])
  );
  let checked = { quiz: 0, problems: 0, checklist: 0 };

  for (const en of enLessons) {
    const de = deBySlug.get(en.slug);
    if (!de) continue;

    if (en.quiz && de.quiz) {
      checked.quiz++;
      if (en.quiz.length !== de.quiz.length) {
        fail(course, `${en.slug}: ${en.quiz.length} EN questions vs ${de.quiz.length} DE`);
      } else {
        en.quiz.forEach((q, i) => {
          const dq = de.quiz[i];
          if (!q || !dq) return fail(course, `${en.slug} q${i + 1}: unparseable question`);
          if (q.choices.length !== dq.choices.length)
            fail(course, `${en.slug} q${i + 1}: ${q.choices.length} EN choices vs ${dq.choices.length} DE`);
          if (q.answer !== dq.answer)
            fail(course, `${en.slug} q${i + 1}: answer index EN ${q.answer} vs DE ${dq.answer}`);
        });
      }
    }

    if (en.problems && de.problems) {
      checked.problems++;
      if (en.problems.length !== de.problems.length) {
        fail(course, `${en.slug}: ${en.problems.length} EN problems vs ${de.problems.length} DE`);
      } else {
        en.problems.forEach((p, i) => {
          const dp = de.problems[i];
          for (const key of ["answer", "tolerancePct"]) {
            if ((p[key] ?? null) !== (dp[key] ?? null))
              fail(course, `${en.slug} problem ${i + 1}: ${key} EN ${p[key]} vs DE ${dp[key]}`);
          }
        });
      }
    }

    if (en.checklist && de.checklist) {
      checked.checklist++;
      const enIds = en.checklist.join(",");
      const deIds = de.checklist.join(",");
      if (enIds !== deIds)
        fail(course, `${en.slug}: checklist ids EN [${enIds}] vs DE [${deIds}]`);
    }
  }

  console.log(
    `[${course}] parity: ${checked.quiz} quizzes, ${checked.problems} problem sets, ` +
      `${checked.checklist} checklists compared against German translations`
  );
}

if (failures) {
  console.error(`\n${failures} EN↔DE parity failure(s).`);
  process.exit(1);
}
console.log("EN↔DE parity: all good.");
