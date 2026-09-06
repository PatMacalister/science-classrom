import type { Lesson, Unit, UnitModule } from "./types";
import { unit0 } from "./unit0";
import { unit1 } from "./unit1";
import { unit2 } from "./unit2";
import { unit3 } from "./unit3";
import { unit4 } from "./unit4";
import { unit5 } from "./unit5";
import { unit6 } from "./unit6";

/**
 * The curriculum, in teaching order. Units 0–3 are the core course —
 * mechanics, ending with g measured by hand — and units 4–6 the advanced
 * course: waves, light, heat and the first quantum cracks. Tier
 * presentation lives in tiers.ts. To extend, create a unit file exporting
 * a UnitModule and append it here — routing, navigation, numbering and
 * progress all pick it up automatically.
 */
const MODULES: UnitModule[] = [unit0, unit1, unit2, unit3, unit4, unit5, unit6];

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
