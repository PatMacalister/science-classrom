"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { Lesson } from "@/spark/lib/curriculum/types";
import { getLesson, getUnit, lessonNumber, lessonsOfUnit, prevNext } from "@/spark/lib/curriculum/registry";
import { annotateFormulas } from "@/spark/lib/curriculum/glossary";
import { isFullyTranslated, localizeLesson, localizeUnit } from "@/spark/lib/curriculum/localize";
import { useLang, useT, type UIKey } from "@/spark/lib/i18n";
import { useProgress } from "@/shared/progress";
import Quiz from "./Quiz";
import Checklist from "./Checklist";
import Problems from "./Problems";

const BADGE_KEYS: Record<string, UIKey> = {
  advanced: "badgeAdvanced",
  expert: "badgeExpert",
  master: "badgeMaster",
  specialization: "badgeSpecialization",
};

/** True when moving between two different specialization branches (or into one). */
function crossesBranch(a: Lesson | undefined, b: Lesson | undefined): boolean {
  if (!a || !b || a.unitId === b.unitId) return false;
  const ua = getUnit(a.unitId);
  const ub = getUnit(b.unitId);
  return ua?.track === "specialization" || ub?.track === "specialization";
}

export default function LessonView({ lesson: lessonRaw }: { lesson: Lesson }) {
  const progress = useProgress();
  const { lang } = useLang();
  const t = useT();
  const lesson = localizeLesson(lessonRaw, lang);
  const unit = localizeUnit(getUnit(lessonRaw.unitId)!, lang);
  const unitLessons = lessonsOfUnit(lessonRaw.unitId);
  const { prev, next } = prevNext(lessonRaw.slug);
  const Theory = lesson.Theory;
  const Lab = lesson.lab.Component;

  const hidePrev = crossesBranch(prev, lessonRaw);
  const nextIsCrossing = crossesBranch(lessonRaw, next);
  const untranslated = lang === "de" && !isFullyTranslated(lessonRaw.slug, lang);

  useEffect(() => {
    window.scrollTo(0, 0);
    annotateFormulas(document, lang);
  }, [lessonRaw.slug, lang]);

  return (
    <article>
      <nav className="crumbs">
        <Link href="/spark">{t("allLessons")}</Link>
        <span className="chip">{t("unitWord")} {unit?.num} · {unit?.title.replace(/^Specialization: /, "")}</span>
        {unit?.track ? <span className={`adv-badge ${unit.track}`}>{t(BADGE_KEYS[unit.track])}</span> : null}
        <span className="chip">{t("lessonWord")} {lessonNumber(lessonRaw)}</span>
      </nav>

      <header className="lesson-head">
        <h1>{lesson.title}</h1>
        <p className="subtitle">{lesson.subtitle}</p>
      </header>

      <div className="unit-dots">
        {unitLessons.map((l) => (
          <Link
            key={l.slug}
            href={`/spark/lesson/${l.slug}`}
            title={`${lessonNumber(l)} ${localizeLesson(l, lang).title}`}
            className={`${l.slug === lessonRaw.slug ? "current" : ""}${progress.isComplete(l.slug) ? " done" : ""}`}
          />
        ))}
        <span className="dots-label">
          {t("lessonPosition", {
            i: unitLessons.findIndex((l) => l.slug === lessonRaw.slug) + 1,
            n: unitLessons.length,
          })}
        </span>
      </div>

      {untranslated ? <p className="translation-notice">{t("notTranslated")}</p> : null}

      {lesson.buildsOn?.length ? (
        <p className="builds-on">
          {t("buildsOn")}{" "}
          {lesson.buildsOn.map((slug) => {
            const l = getLesson(slug);
            return l ? (
              <Link key={slug} href={`/spark/lesson/${slug}`}>
                {lessonNumber(l)} {localizeLesson(l, lang).title}
              </Link>
            ) : null;
          })}
        </p>
      ) : null}

      <section className="theory">
        <Theory />
      </section>

      <section className="interactive">
        <div className="lab-head">
          <h2>⚡ {t("labWord")} — {lesson.lab.title}</h2>
        </div>
        <div className="lab-desc">{lesson.lab.intro}</div>
        <div className="lab-body">
          <Lab />
        </div>
      </section>

      {lesson.problems ? <Problems lessonSlug={lessonRaw.slug} problems={lesson.problems} /> : null}
      {lesson.quiz ? <Quiz lessonSlug={lessonRaw.slug} questions={lesson.quiz} /> : null}
      {lesson.checklist ? <Checklist lessonSlug={lessonRaw.slug} items={lesson.checklist} /> : null}

      <nav className="lesson-nav">
        {prev && !hidePrev ? (
          <Link className="nav-card" href={`/spark/lesson/${prev.slug}`}>
            <div className="dir">{t("previous")}</div>
            <div className="nav-title">{lessonNumber(prev)} {localizeLesson(prev, lang).title}</div>
          </Link>
        ) : (
          <span className="nav-card hidden-slot" />
        )}
        {next && !nextIsCrossing ? (
          <Link className="nav-card next" href={`/spark/lesson/${next.slug}`}>
            <div className="dir">{t("next")}</div>
            <div className="nav-title">{lessonNumber(next)} {localizeLesson(next, lang).title}</div>
          </Link>
        ) : (
          <Link className="nav-card next" href="/spark">
            <div className="dir">
              {unit?.track === "specialization" ? t("branchComplete") : t("courseComplete")}
            </div>
            <div className="nav-title">
              {unit?.track === "specialization" ? t("chooseNextSpec") : t("backToOverview")}
            </div>
          </Link>
        )}
      </nav>
    </article>
  );
}
