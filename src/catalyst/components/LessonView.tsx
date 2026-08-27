"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { Lesson } from "@/catalyst/lib/curriculum/types";
import { getLesson, getUnit, lessonNumber, lessonsOfUnit, prevNext } from "@/catalyst/lib/curriculum/registry";
import { annotateFormulas } from "@/catalyst/lib/curriculum/glossary";
import { isFullyTranslated, localizeLesson, localizeUnit } from "@/catalyst/lib/curriculum/localize";
import { useLang, useT, type UIKey } from "@/catalyst/lib/i18n";
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
  const untranslated = lang === "de" && !isFullyTranslated(lessonRaw.slug, lang);

  useEffect(() => {
    window.scrollTo(0, 0);
    annotateFormulas(document, lang);
  }, [lessonRaw.slug, lang]);

  return (
    <article>
      <nav className="crumbs">
        <Link href="/catalyst">{t("allLessons")}</Link>
        <span className="chip">{t("unitWord")} {unit?.num} · {unit?.title}</span>
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
            href={`/catalyst/lesson/${l.slug}`}
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
              <Link key={slug} href={`/catalyst/lesson/${slug}`}>
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
          <h2>⚗️ {t("labWord")} — {lesson.lab.title}</h2>
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
        {prev ? (
          <Link className="nav-card" href={`/catalyst/lesson/${prev.slug}`}>
            <div className="dir">{t("previous")}</div>
            <div className="nav-title">{lessonNumber(prev)} {localizeLesson(prev, lang).title}</div>
          </Link>
        ) : (
          <span className="nav-card hidden-slot" />
        )}
        {next ? (
          <Link className="nav-card next" href={`/catalyst/lesson/${next.slug}`}>
            <div className="dir">{t("next")}</div>
            <div className="nav-title">{lessonNumber(next)} {localizeLesson(next, lang).title}</div>
          </Link>
        ) : (
          <Link className="nav-card next" href="/catalyst">
            <div className="dir">{t("courseComplete")}</div>
            <div className="nav-title">{t("backToOverview")}</div>
          </Link>
        )}
      </nav>
    </article>
  );
}
