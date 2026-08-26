import type { Lesson, Unit, UnitModule } from "./types";
import { unit0 } from "./unit0";
import { unit1 } from "./unit1";
import { unit2 } from "./unit2";
import { unit3 } from "./unit3";
import { unit4 } from "./unit4";
import { unit5 } from "./unit5";
import { unit6 } from "./unit6";
import { unit7 } from "./unit7";
import { unit8 } from "./unit8";
import { unit9 } from "./unit9";
import { unit10 } from "./unit10";
import { unit11 } from "./unit11";
import { unit12 } from "./unit12";
import { unit13 } from "./unit13";
import { unit14 } from "./unit14";
import { unit15 } from "./unit15";
import { unit16 } from "./unit16";
import { unit17 } from "./unit17";
import { unit18 } from "./unit18";
import { unit19 } from "./unit19";
import { unit20 } from "./unit20";

/**
 * The curriculum, in teaching order. Units 0–4 are the core course,
 * units 5–8 the advanced course, units 9–12 the expert course,
 * units 13–16 the master course, and units 17+ are parallel
 * specialization branches (tier presentation lives in tiers.ts).
 * To extend, create a unit file exporting a UnitModule and append it
 * here — routing, navigation, numbering and progress all pick it up
 * automatically.
 */
const MODULES: UnitModule[] = [
  unit0, unit1, unit2, unit3, unit4,
  unit5, unit6, unit7, unit8,
  unit9, unit10, unit11, unit12,
  unit13, unit14, unit15, unit16,
  unit17, unit18, unit19, unit20,
];

export const UNITS: Unit[] = MODULES.map((m) => m.unit);
export const LESSONS: Lesson[] = MODULES.flatMap((m) => m.lessons);

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function getUnit(id: string): Unit | undefined {
  return UNITS.find((u) => u.id === id);
}

export function lessonsOfUnit(unitId: string): Lesson[] {
  return LESSONS.filter((l) => l.unitId === unitId);
}

/** "2.3"-style number: unit number + position within the unit (1-based). */
export function lessonNumber(lesson: Lesson): string {
  const unit = getUnit(lesson.unitId);
  const idx = lessonsOfUnit(lesson.unitId).findIndex((l) => l.slug === lesson.slug);
  return `${unit?.num ?? "?"}.${idx + 1}`;
}

export function prevNext(slug: string): { prev?: Lesson; next?: Lesson } {
  const i = LESSONS.findIndex((l) => l.slug === slug);
  if (i === -1) return {};
  return {
    prev: i > 0 ? LESSONS[i - 1] : undefined,
    next: i < LESSONS.length - 1 ? LESSONS[i + 1] : undefined,
  };
}
