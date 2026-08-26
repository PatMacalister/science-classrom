import type { ComponentType, ReactNode } from "react";
import type { Lang } from "@/spark/lib/i18n";
import type { ChecklistItem, Lesson, NumericProblem, QuizQuestion, Unit } from "./types";
import { unitMetaDe, lessonMetaDe } from "./de/meta";
import { unit0De } from "./de/unit0";
import { unit1De } from "./de/unit1";
import { unit2De } from "./de/unit2";
import { unit3De } from "./de/unit3";
import { unit4De } from "./de/unit4";
import { unit5De } from "./de/unit5";
import { unit6De } from "./de/unit6";
import { unit7De } from "./de/unit7";
import { unit8De } from "./de/unit8";
import { unit9De } from "./de/unit9";
import { unit10De } from "./de/unit10";
import { unit11De } from "./de/unit11";
import { unit12De } from "./de/unit12";
import { unit13De } from "./de/unit13";
import { unit14De } from "./de/unit14";
import { unit15De } from "./de/unit15";
import { unit16De } from "./de/unit16";
import { unit17De } from "./de/unit17";
import { unit18De } from "./de/unit18";
import { unit19De } from "./de/unit19";
import { unit20De } from "./de/unit20";

/**
 * Per-lesson German content overrides. Anything omitted falls back to the
 * English original — so lessons can be translated one at a time. To translate
 * a unit, add a `de/unitN.tsx` exporting Record<slug, LessonContentDe> and
 * spread it into CONTENT_DE below.
 */
export interface LessonContentDe {
  Theory?: ComponentType;
  quiz?: QuizQuestion[];
  problems?: NumericProblem[];
  checklist?: ChecklistItem[];
  lab?: { title?: string; intro?: ReactNode };
}

const CONTENT_DE: Record<string, LessonContentDe> = {
  ...unit0De,
  ...unit1De,
  ...unit2De,
  ...unit3De,
  ...unit4De,
  ...unit5De,
  ...unit6De,
  ...unit7De,
  ...unit8De,
  ...unit9De,
  ...unit10De,
  ...unit11De,
  ...unit12De,
  ...unit13De,
  ...unit14De,
  ...unit15De,
  ...unit16De,
  ...unit17De,
  ...unit18De,
  ...unit19De,
  ...unit20De,
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
  };
}

/** True when the lesson's full body (not just meta) exists in `lang`. */
export function isFullyTranslated(slug: string, lang: Lang): boolean {
  if (lang === "en") return true;
  return !!CONTENT_DE[slug]?.Theory;
}
