"use client";

import Link from "next/link";
import { LESSONS, UNITS, lessonsOfUnit } from "@/vector/lib/curriculum/registry";
import { localizeUnit } from "@/vector/lib/curriculum/localize";
import { useLang, useT } from "@/vector/lib/i18n";
import { useProgress } from "@/shared/progress";

/**
 * The progress dashboard: lessons per unit, quiz mastery, the review deck's
 * Leitner health and the final-exam record — everything progress already
 * tracks, in one glance.
 */

/** Review-map keys from the units-and-constants drill rather than lesson quizzes. */
const DRILL_PREFIXES = ["si:"];

export default function StatsPage() {
  const progress = useProgress();
  const { lang } = useLang();
  const t = useT();

  if (!progress.ready) return null;

  const doneCount = LESSONS.filter((l) => progress.isComplete(l.slug)).length;

  // eslint-disable-next-line react-hooks/purity -- due-now count is intentionally clock-based
  const now = Date.now();
  const review = Object.entries(progress.state.review);
  const active = review.filter(([, r]) => r.box < 3);
  const due = active.filter(([, r]) => r.due <= now);
  const graduated = review.length - active.length;
  const drill = active.filter(([k]) => DRILL_PREFIXES.some((p) => k.startsWith(p))).length;

  const exam = progress.state.exam;

  return (
    <div>
      <nav className="crumbs">
        <Link href="/vector">{t("allLessons")}</Link>
        <span className="chip">{t("statsChip")}</span>
      </nav>
      <h1>{t("statsTitle")}</h1>
      <p className="lead">{t("statsLead")}</p>

      <section className="stats-section">
        <div className="stats-row overall">
          <span className="sname">{t("statsOverall", { done: doneCount, total: LESSONS.length })}</span>
          <span className="sbar">
            <span style={{ width: `${(doneCount / LESSONS.length) * 100}%` }} />
          </span>
        </div>
      </section>

      <section className="stats-section">
        <h2>{t("statsByUnit")}</h2>
        {UNITS.map((unitRaw) => {
          const unit = localizeUnit(unitRaw, lang);
          const lessons = lessonsOfUnit(unit.id);
          const done = lessons.filter((l) => progress.isComplete(l.slug)).length;
          const taken = lessons
            .map((l) => progress.quizRecord(l.slug))
            .filter((r): r is NonNullable<typeof r> => !!r && r.total > 0);
          const avg = taken.length
            ? Math.round((taken.reduce((s, r) => s + r.score / r.total, 0) / taken.length) * 100)
            : null;
          return (
            <div className="stats-row" key={unit.id}>
              <span className="sname">
                {t("unitWord")} {unit.num} · {unit.title}
              </span>
              <span className="sbar">
                <span style={{ width: `${(done / lessons.length) * 100}%` }} />
              </span>
              <span className="sval">
                {done}/{lessons.length}
                {avg !== null ? ` · ${t("statsQuizAvg", { pct: avg })}` : ""}
              </span>
            </div>
          );
        })}
      </section>

      <section className="stats-section">
        <h2>{t("statsDeckHead")}</h2>
        {review.length === 0 ? (
          <p className="review-progress">{t("statsDeckEmpty")}</p>
        ) : (
          <div className="hero-stats">
            <span className="stat-chip">
              <b>{active.length}</b> {t("statsDeckActive")}
            </span>
            <span className="stat-chip">
              <b>{due.length}</b> {t("statsDeckDue")}
            </span>
            <span className="stat-chip">
              <b>{graduated}</b> {t("statsDeckDone")}
            </span>
            {drill > 0 ? (
              <span className="stat-chip">
                <b>{drill}</b> {t("statsDeckDrill")}
              </span>
            ) : null}
          </div>
        )}
        {due.length > 0 ? (
          <p>
            <Link className="btn secondary" href="/vector/review">
              {t("reviewDeck")}
            </Link>
          </p>
        ) : null}
      </section>

      <section className="stats-section">
        <h2>{t("statsExamHead")}</h2>
        {exam.best ? (
          <p className="review-progress">
            {t("statsExamBest", {
              score: exam.best.score,
              total: exam.best.total,
              pct: Math.round((exam.best.score / exam.best.total) * 100),
            })}{" "}
            · {t("statsExamAttempts", { n: exam.attempts })}
            {exam.best.passed ? <span className="exam-pass-badge"> {t("statsExamPassedBadge")}</span> : null}
          </p>
        ) : (
          <p className="review-progress">{t("statsExamNone")}</p>
        )}
        <p>
          <Link className="btn secondary" href="/vector/exam">
            {t("examLink")}
          </Link>
        </p>
      </section>
    </div>
  );
}
