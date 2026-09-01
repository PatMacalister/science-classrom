/**
 * Shared AST helpers for scripts that read the curriculum files as source
 * text (debias-quiz-answers.mjs, check-quiz-parity.mjs). Works on exact
 * character ranges so callers can rewrite files without disturbing
 * formatting, comments or line endings.
 *
 * English lessons are object literals carrying a `slug` property plus at
 * least one content section; German files export a Record keyed by slug.
 * Both shapes are collected into the same {slug, quiz, problems, checklist}
 * structure.
 */
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

export function parseSource(file) {
  const text = fs.readFileSync(file, "utf8");
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  return { file, text, sf };
}

/** unitN.tsx files in a directory, sorted numerically (unit2 before unit10). */
export function unitFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter((f) => /^unit\d+\.tsx$/.test(f))
    .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]))
    .map((f) => path.join(dir, f));
}

function propOf(obj, name) {
  return obj.properties.find(
    (p) =>
      ts.isPropertyAssignment(p) &&
      p.name &&
      p.name.getText().replace(/^["']|["']$/g, "") === name
  );
}

function rangeOf(node, src) {
  const start = node.getStart(src.sf);
  return { start, end: node.end, text: src.text.slice(start, node.end) };
}

function quizInfo(quizProp, src) {
  if (!ts.isArrayLiteralExpression(quizProp.initializer)) return null;
  return quizProp.initializer.elements.filter(ts.isObjectLiteralExpression).map((qObj) => {
    const choicesProp = propOf(qObj, "choices");
    const answerProp = propOf(qObj, "answer");
    const qProp = propOf(qObj, "q");
    const explainProp = propOf(qObj, "explain");
    if (!choicesProp || !answerProp || !ts.isArrayLiteralExpression(choicesProp.initializer)) {
      return null;
    }
    const choices = choicesProp.initializer.elements.map((el) => rangeOf(el, src));
    const answer = rangeOf(answerProp.initializer, src);
    return {
      q: qProp ? rangeOf(qProp.initializer, src).text : "",
      explain: explainProp ? rangeOf(explainProp.initializer, src).text : "",
      choices,
      answer: Number(answer.text),
      answerRange: answer,
    };
  });
}

function problemsInfo(problemsProp, src) {
  if (!ts.isArrayLiteralExpression(problemsProp.initializer)) return null;
  return problemsProp.initializer.elements.filter(ts.isObjectLiteralExpression).map((pObj) => {
    const grab = (name) => {
      const p = propOf(pObj, name);
      return p ? rangeOf(p.initializer, src).text : null;
    };
    return { answer: grab("answer"), unit: grab("unit"), tolerancePct: grab("tolerancePct") };
  });
}

function checklistInfo(checklistProp) {
  if (!ts.isArrayLiteralExpression(checklistProp.initializer)) return null;
  return checklistProp.initializer.elements.filter(ts.isObjectLiteralExpression).map((cObj) => {
    const idProp = propOf(cObj, "id");
    return idProp && ts.isStringLiteralLike(idProp.initializer) ? idProp.initializer.text : null;
  });
}

function sectionsOf(obj, src) {
  const quizProp = propOf(obj, "quiz");
  const problemsProp = propOf(obj, "problems");
  const checklistProp = propOf(obj, "checklist");
  if (!quizProp && !problemsProp && !checklistProp) return null;
  return {
    quiz: quizProp ? quizInfo(quizProp, src) : null,
    problems: problemsProp ? problemsInfo(problemsProp, src) : null,
    checklist: checklistProp ? checklistInfo(checklistProp) : null,
  };
}

/** English lesson objects: `{ slug: "...", ..., quiz/problems/checklist }`. */
export function collectEnLessons(src) {
  const lessons = [];
  const visit = (node) => {
    if (ts.isObjectLiteralExpression(node)) {
      const slugProp = propOf(node, "slug");
      if (slugProp && ts.isStringLiteral(slugProp.initializer)) {
        const sections = sectionsOf(node, src);
        if (sections) lessons.push({ slug: slugProp.initializer.text, ...sections, src });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(src.sf);
  return lessons;
}

/** German record entries: `"slug": { quiz/problems/checklist/... }`. */
export function collectDeEntries(src) {
  const entries = [];
  const visit = (node) => {
    if (ts.isPropertyAssignment(node) && ts.isObjectLiteralExpression(node.initializer)) {
      const sections = sectionsOf(node.initializer, src);
      if (sections) {
        const slug = node.name.getText().replace(/^["']|["']$/g, "");
        entries.push({ slug, ...sections, src });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(src.sf);
  return entries;
}

/** Apply {start,end,text} edits to a file's source text, latest-first. */
export function applyEdits(text, edits) {
  const sorted = [...edits].sort((a, b) => b.start - a.start);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].end > sorted[i - 1].start) {
      throw new Error(`overlapping edits at ${sorted[i].start}..${sorted[i].end}`);
    }
  }
  let out = text;
  for (const e of sorted) out = out.slice(0, e.start) + e.text + out.slice(e.end);
  return out;
}
