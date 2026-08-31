import type { ComponentType, ReactNode } from "react";
import type { Lang } from "@/helix/lib/i18n";
import type { ChecklistItem, Lesson, NumericProblem, QuizQuestion, Unit } from "./types";
import { unitMetaDe, lessonMetaDe } from "./de/meta";

/**
 * Per-lesson German content overrides. Anything omitted falls back to the
 * English original — so lessons can be translated one at a time. To translate
 * a unit, add a `de/unitN.tsx` exporting Record<slug, LessonContentDe> and
 * spread it into CONTENT_DE below. Quiz answer indices must match the
 * English originals; the review deck relies on it.
 *
 * Helix currently ships German unit and lesson metadata (de/meta.ts), a German
 * interface and German canvas labels; the lesson bodies are still English and
 * show the fallback notice. Spark and Catalyst are fully translated — this
 * course is the newest and its bodies are the remaining work.
 */
export interface LessonContentDe {
  Theory?: ComponentType;
  quiz?: QuizQuestion[];
  problems?: NumericProblem[];
  checklist?: ChecklistItem[];
  lab?: { title?: string; intro?: ReactNode };
  extraLab?: { title?: string; intro?: ReactNode };
}

const CONTENT_DE: Record<string, LessonContentDe> = {};

export function localizeUnit(unit: Unit, lang: Lang): Unit {
  if (lang !== "de") return unit;
  const meta = unitMetaDe[unit.id];
  return meta ? { ...unit, ...meta } : unit;
}

export function localizeLesson(lesson: Lesson, lang: Lang): Lesson {
  if (lang !== "de") return lesson;
  const meta = lessonMetaDe[lesson.slug];
  const content = CONTENT_DE[lesson.slug];
  if (!meta && !content) return lesson;
  return {
    ...lesson,
    ...(meta ?? {}),
    Theory: content?.Theory ?? lesson.Theory,
    quiz: content?.quiz ?? lesson.quiz,
    problems: content?.problems ?? lesson.problems,
    checklist: content?.checklist ?? lesson.checklist,
    lab: {
      ...lesson.lab,
      title: content?.lab?.title ?? lesson.lab.title,
      intro: content?.lab?.intro ?? lesson.lab.intro,
    },
    extraLab: lesson.extraLab && {
      ...lesson.extraLab,
      title: content?.extraLab?.title ?? lesson.extraLab.title,
      intro: content?.extraLab?.intro ?? lesson.extraLab.intro,
    },
  };
}

/** True when the lesson's full body (not just meta) exists in `lang`. */
export function isFullyTranslated(slug: string, lang: Lang): boolean {
  if (lang === "en") return true;
  return !!CONTENT_DE[slug]?.Theory;
}
