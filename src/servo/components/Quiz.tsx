"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/servo/lib/curriculum/types";
import { useT } from "@/servo/lib/i18n";
import { useProgress, PASS_THRESHOLD } from "@/shared/progress";

export default function Quiz({
  lessonSlug,
  questions,
}: {
  lessonSlug: string;
  questions: QuizQuestion[];
}) {
  const progress = useProgress();
  const t = useT();
  const [answers, setAnswers] = useState<Array<number | null>>(() =>
    questions.map(() => null)
  );
  const [checked, setChecked] = useState(false);

  const record = progress.quizRecord(lessonSlug);
  const score = questions.reduce(
    (acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0),
    0
  );
  const passed = score / questions.length >= PASS_THRESHOLD;

  const check = () => {
    setChecked(true);
    const missed = questions
      .map((q, i) => (answers[i] === q.answer ? -1 : i))
      .filter((i) => i >= 0);
    progress.recordQuiz(lessonSlug, score, questions.length, missed);
  };

  const retry = () => {
    setAnswers(questions.map(() => null));
    setChecked(false);
  };

  return (
    <section className="quiz-section">
      <h2>{t("quizHead")}</h2>
      {record?.passed && !checked ? (
        <div className="quiz-passed-banner">
          {t("quizPassedBanner", { score: record.score, total: record.total })}
        </div>
      ) : null}
      {questions.map((q, qi) => {
        const chosen = answers[qi];
        const cls = checked ? (chosen === q.answer ? " correct" : " wrong") : "";
        return (
          <div key={qi} className={`q-block${cls}`}>
            <h4>
              {qi + 1}. {q.q}
            </h4>
            {q.choices.map((choice, ci) => (
              <label key={ci} className="q-choice">
                <input
                  type="radio"
                  name={`${lessonSlug}-q${qi}`}
                  checked={chosen === ci}
                  disabled={checked}
                  onChange={() =>
                    setAnswers((a) => a.map((v, i) => (i === qi ? ci : v)))
                  }
                />
                <span>{choice}</span>
              </label>
            ))}
            {checked ? (
              <div className="q-explain">
                {chosen === q.answer
                  ? t("quizCorrect")
                  : t("quizWrongIs", { answer: q.choices[q.answer] })}
                {q.explain}
              </div>
            ) : null}
          </div>
        );
      })}
      {checked ? (
        <>
          <div className={`quiz-result ${passed ? "pass" : "fail"}`}>
            {passed
              ? t("quizPassed", { score, total: questions.length })
              : t("quizFailed", {
                  score,
                  total: questions.length,
                  need: Math.ceil(questions.length * PASS_THRESHOLD),
                })}
          </div>
          <button type="button" className="btn secondary" onClick={retry}>
            {t("quizTryAgain")}
          </button>
        </>
      ) : (
        <button
          type="button"
          className="btn"
          onClick={check}
          disabled={answers.some((a) => a === null)}
        >
          {answers.some((a) => a === null) ? t("quizAnswerAll") : t("quizCheck")}
        </button>
      )}
    </section>
  );
}
