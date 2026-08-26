"use client";

import { useState } from "react";
import type { NumericProblem } from "@/spark/lib/curriculum/types";
import { useT } from "@/spark/lib/i18n";
import { useProgress } from "@/shared/progress";
import { fmtSI } from "@/spark/lib/sim/helpers";

/**
 * Parse "4.7k", "0.02", "20m", "3.3 µF", "1M5"? — no, keep it simple:
 * number followed by an optional SI prefix; trailing unit letters ignored.
 * µ and u both work. Returns NaN when nothing parses.
 */
export function parseSI(input: string): number {
  const m = input
    .trim()
    .replace(",", ".")
    .match(/^(-?\d+(?:\.\d+)?(?:e-?\d+)?)\s*([pnuµmkMG])?/);
  if (!m) return NaN;
  const base = Number.parseFloat(m[1]);
  const mult: Record<string, number> = {
    p: 1e-12,
    n: 1e-9,
    u: 1e-6,
    "µ": 1e-6,
    m: 1e-3,
    k: 1e3,
    M: 1e6,
    G: 1e9,
  };
  return base * (m[2] ? mult[m[2]] : 1);
}

type Verdict = "unsolved" | "wrong" | "solved";

function ProblemRow({
  lessonSlug,
  index,
  problem,
}: {
  lessonSlug: string;
  index: number;
  problem: NumericProblem;
}) {
  const progress = useProgress();
  const t = useT();
  const key = `prob:${lessonSlug}:${index}`;
  const solvedBefore = progress.getCheck(key);
  const [input, setInput] = useState("");
  const [verdict, setVerdict] = useState<Verdict>(solvedBefore ? "solved" : "unsolved");
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const check = () => {
    const v = parseSI(input);
    if (!Number.isFinite(v)) {
      setVerdict("wrong");
      return;
    }
    const tol = (problem.tolerancePct ?? 2) / 100;
    const ok = Math.abs(v - problem.answer) <= Math.abs(problem.answer) * tol + 1e-12;
    setAttempts((a) => a + 1);
    if (ok) {
      setVerdict("solved");
      progress.setCheck(key, true);
    } else {
      setVerdict("wrong");
    }
  };

  const solved = verdict === "solved";

  return (
    <div className={`prob-row${solved ? " solved" : ""}`}>
      <div className="prob-q">
        <span className="prob-num">{index + 1}.</span> {problem.prompt}
      </div>
      <div className="prob-answer">
        {solved ? (
          <span className="prob-solved">
            ✓ {fmtSI(problem.answer, problem.unit)} — {problem.explain}
          </span>
        ) : (
          <>
            <input
              className="prob-input"
              placeholder={
                problem.unit
                  ? t("probPlaceholder", { unit: problem.unit })
                  : t("probPlaceholderNoUnit")
              }
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (verdict === "wrong") setVerdict("unsolved");
              }}
              onKeyDown={(e) => e.key === "Enter" && check()}
            />
            <button type="button" className="btn secondary small" onClick={check} disabled={!input.trim()}>
              {t("probCheck")}
            </button>
            <button type="button" className="btn secondary small" onClick={() => setShowHint((h) => !h)}>
              {showHint ? t("probHideHint") : t("probHint")}
            </button>
          </>
        )}
      </div>
      {!solved && verdict === "wrong" ? (
        <p className="prob-feedback">
          {attempts >= 3
            ? t("probReveal", { answer: fmtSI(problem.answer, problem.unit), explain: problem.explain })
            : t("probWrong")}
        </p>
      ) : null}
      {!solved && showHint ? <p className="prob-hint">💡 {problem.hint}</p> : null}
    </div>
  );
}

export default function Problems({
  lessonSlug,
  problems,
}: {
  lessonSlug: string;
  problems: NumericProblem[];
}) {
  const progress = useProgress();
  const t = useT();
  const solved = problems.filter((_, i) => progress.getCheck(`prob:${lessonSlug}:${i}`)).length;

  return (
    <section className="quiz-section">
      <h2>{t("probHead", { solved, total: problems.length })}</h2>
      <p className="prob-intro">{t("probIntro", { tol: problems[0]?.tolerancePct ?? 2 })}</p>
      {problems.map((p, i) => (
        <ProblemRow key={i} lessonSlug={lessonSlug} index={i} problem={p} />
      ))}
    </section>
  );
}
