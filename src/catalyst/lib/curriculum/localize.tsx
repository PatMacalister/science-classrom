import type { ComponentType, ReactNode } from "react";
import type { Lang } from "@/catalyst/lib/i18n";
import type { ChecklistItem, Lesson, NumericProblem, QuizQuestion, Unit } from "./types";
import { unitMetaDe, lessonMetaDe } from "./de/meta";
import { unit0De } from "./de/unit0";
import { unit1De } from "./de/unit1";
import { unit2De } from "./de/unit2";
import { unit3De } from "./de/unit3";
import { unit4De } from "./de/unit4";
import { unit5De } from "./de/unit5";
import { unit6De } from "./de/unit6";

/**
 * Per-lesson German content overrides. Anything omitted falls back to the
 * English original — so lessons can be translated one at a time. To translate
 * a unit, add a `de/unitN.tsx` exporting Record<slug, LessonContentDe> and
 * spread it into CONTENT_DE below. Quiz answer indices must match the
 * English originals; the review deck relies on it.
 */
export interface LessonContentDe {
  Theory?: ComponentType;
  quiz?: QuizQuestion[];
  problems?: NumericProblem[];
  checklist?: ChecklistItem[];
  lab?: { title?: string; intro?: ReactNode };
  extraLab?: { title?: string; intro?: ReactNode };
}

const CONTENT_DE: Record<string, LessonContentDe> = {
  ...unit0De,
  ...unit1De,
  ...unit2De,
  ...unit3De,
  ...unit4De,
  ...unit5De,
  ...unit6De,
};

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
