"use client";

import Link from "next/link";
import { useState } from "react";
import { LESSONS, getLesson } from "@/vector/lib/curriculum/registry";
import { localizeLesson } from "@/vector/lib/curriculum/localize";
import { useLang, useT } from "@/vector/lib/i18n";
import { PASS_THRESHOLD, useProgress } from "@/shared/progress";

/**
 * The final exam: EXAM_SIZE questions sampled from every quiz in the course,
 * answered one at a time with no feedback until the end — that is the whole
 * difference from lesson quizzes. Misses feed the review deck (same keys as
 * quiz misses), and the best result is stored in progress for /stats and sync.
 */

const EXAM_SIZE = 20;

interface ExamQ {
  slug: string;
  qi: number;
}

export default function ExamPage() {
  const progress = useProgress();
  const { lang } = useLang();
  const t = useT();
  const [exam, setExam] = useState<ExamQ[] | null>(null);
  const [pos, setPos] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [chosen, setChosen] = useState<number | null>(null);

  /* Sampling is impure (Math.random), so it only ever runs from the click. */
  const begin = () => {
    const all: ExamQ[] = LESSONS.flatMap((l) => (l.quiz ?? []).map((_, qi) => ({ slug: l.slug, qi })));
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    setExam(all.slice(0, Math.min(EXAM_SIZE, all.length)));
    setPos(0);
    setAnswers([]);
    setChosen(null);
  };

  const answerOf = (q: ExamQ) => getLesson(q.slug)!.quiz![q.qi].answer;

  const submit = () => {
    if (chosen === null || !exam) return;
    const nextAnswers = [...answers, chosen];
    setAnswers(nextAnswers);
    setChosen(null);
    if (nextAnswers.length === exam.length) {
      let score = 0;
      exam.forEach((q, i) => {
        if (nextAnswers[i] === answerOf(q)) score++;
        else progress.gradeReview(`${q.slug}:${q.qi}`, false);
      });
      progress.recordExam(score, exam.length);
    }
    setPos((p) => p + 1);
  };

  const crumbs = (
    <nav className="crumbs">
      <Link href="/vector">{t("allLessons")}</Link>
      <span className="chip">{t("examChip")}</span>
    </nav>
  );

  /* ---- intro ---- */
  if (!exam) {
    const best = progress.state.exam.best;
    const poolSize = LESSONS.reduce((n, l) => n + (l.quiz?.length ?? 0), 0);
    return (
      <div>
        {crumbs}
        <h1>{t("examTitle")}</h1>
        <p className="lead">
          {t("examLead", { n: Math.min(EXAM_SIZE, poolSize), pct: Math.round(PASS_THRESHOLD * 100) })}
        </p>
        {progress.ready && best ? (
          <p className="review-progress" suppressHydrationWarning>
            {t("examBestLine", { score: best.score, total: best.total, n: progress.state.exam.attempts })}
          </p>
        ) : null}
        <p>
          <button type="button" className="btn" onClick={begin}>
            {t("examStart")}
          </button>
        </p>
      </div>
    );
  }

  /* ---- one question at a time, no feedback ---- */
  if (pos < exam.length) {
    const q = exam[pos];
    const lesson = localizeLesson(getLesson(q.slug)!, lang);
    const question = lesson.quiz![q.qi];
    return (
      <div>
        {crumbs}
        <h1>{t("examTitle")}</h1>
        <p className="review-progress">{t("examQuestionOf", { i: pos + 1, n: exam.length })}</p>
        <span className="sbar exam-bar">
          <span style={{ width: `${(pos / exam.length) * 100}%` }} />
        </span>

        <div className="q-block">
          <h4>{question.q}</h4>
          {question.choices.map((choice, ci) => (
            <label key={ci} className="q-choice">
              <input
                type="radio"
                name={`exam-${pos}`}
                checked={chosen === ci}
                onChange={() => setChosen(ci)}
              />
              <span>{choice}</span>
            </label>
          ))}
        </div>

        <button type="button" className="btn" onClick={submit} disabled={chosen === null}>
          {pos + 1 < exam.length ? t("examNextQ") : t("examFinishBtn")}
        </button>
      </div>
    );
  }

  /* ---- results ---- */
  const results = exam.map((q, i) => ({ q, given: answers[i], answer: answerOf(q) }));
  const misses = results.filter((r) => r.given !== r.answer);
  const score = exam.length - misses.length;
  const pct = Math.round((score / exam.length) * 100);
  const passed = score / exam.length >= PASS_THRESHOLD;

  return (
    <div>
      {crumbs}
      <h1>{t("examTitle")}</h1>
      <p className={`exam-verdict ${passed ? "pass" : "fail"}`}>
        {passed
          ? t("examPassed", { score, total: exam.length, pct })
          : t("examFailed", { score, total: exam.length, pct, pct2: Math.round(PASS_THRESHOLD * 100) })}
      </p>

      {misses.length === 0 ? (
        <p className="lead">{t("examPerfect")}</p>
      ) : (
        <>
          <h2>{t("examMissedHead")}</h2>
          <p className="review-progress">{t("examMissedNote", { n: misses.length })}</p>
          {misses.map(({ q, given, answer }) => {
            const lesson = localizeLesson(getLesson(q.slug)!, lang);
            const question = lesson.quiz![q.qi];
            return (
              <div className="q-block wrong" key={`${q.slug}:${q.qi}`}>
                <h4>{question.q}</h4>
                <p className="exam-answers">
                  ✗ {t("examYour", { a: question.choices[given] })}
                  <br />✓ {t("examCorrect", { a: question.choices[answer] })}
                </p>
                <div className="q-explain">{question.explain}</div>
              </div>
            );
          })}
        </>
      )}

      <p>
        <button type="button" className="btn" onClick={begin}>
          {t("examRetake")}
        </button>{" "}
        {misses.length > 0 ? (
          <Link className="btn secondary" href="/vector/review">
            {t("examToReview")}
          </Link>
        ) : null}
      </p>
    </div>
  );
}
