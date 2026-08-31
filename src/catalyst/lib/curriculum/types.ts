import type { ComponentType, ReactNode } from "react";

/** One multiple-choice quiz question. `answer` is the index into `choices`. */
export interface QuizQuestion {
  q: string;
  choices: string[];
  answer: number;
  explain: string;
}

/** A hands-on experiment step for capstone lessons (persisted per-user). */
export interface ChecklistItem {
  id: string;
  text: string;
}

/**
 * A free-answer calculation problem. Answers accept SI suffixes
 * ("2.5k", "20m", "0.02") and count as correct within `tolerancePct`
 * (default 2%, in addition to any rounding slack in `answer` itself).
 */
export interface NumericProblem {
  prompt: string;
  /** The exact numeric answer, in base units (grams, moles, litres, pH…). */
  answer: number;
  unit: string;
  tolerancePct?: number;
  hint: string;
  explain: string;
}

/** The interactive lab attached to a lesson. */
export interface LabSpec {
  title: string;
  /** Short "what to try" intro rendered above the lab. */
  intro: ReactNode;
  /** Client component implementing the simulation. */
  Component: ComponentType;
}

/**
 * A pointer into another course. The label is carried here rather than looked
 * up, because a course must never import another course's curriculum — that
 * would drag every lesson of the other field into this route's bundle.
 */
export interface CrossRef {
  /** Course id from shared/courses.ts — "spark", "helix", … */
  course: string;
  slug: string;
  label: { en: string; de: string };
}

export interface Lesson {
  /** URL slug, stable identifier — progress is keyed on this. */
  slug: string;
  unitId: string;
  title: string;
  subtitle: string;
  /** Slugs of lessons this one builds on (rendered as back-links). */
  buildsOn?: string[];
  /** Lessons in *other* courses that cover the same ground from their side. */
  seeAlso?: CrossRef[];
  /** Theory section as a React component (plain JSX, may embed SVG diagrams). */
  Theory: ComponentType;
  lab: LabSpec;
  /**
   * A second simulation for lessons that carry two distinct ideas — rendered
   * below the first. Use sparingly: if a lesson needs two labs to explain two
   * unrelated things, it usually wants to be two lessons.
   */
  extraLab?: LabSpec;
  /** Standard lessons: pass the quiz (>= 75%) to complete. */
  quiz?: QuizQuestion[];
  /** Optional extra practice: solve-by-hand problems (not completion-gating). */
  problems?: NumericProblem[];
  /** Capstone lessons: tick every step to complete. */
  checklist?: ChecklistItem[];
}

export interface Unit {
  id: string;
  num: number;
  title: string;
  blurb: string;
  /**
   * Course tier beyond the core curriculum (badged in the UI).
   * "specialization" units are parallel elective branches — grouped
   * separately on the home page, in no prescribed order.
   */
  track?: "advanced" | "expert" | "master" | "specialization";
}

/**
 * A unit module contributes its unit plus its lessons in teaching order.
 * To extend the curriculum, export one of these from a new file and add it
 * to the list in registry.ts.
 */
export interface UnitModule {
  unit: Unit;
  lessons: Lesson[];
}
