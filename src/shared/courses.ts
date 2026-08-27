/**
 * The course manifest — the single registration point for every course on
 * science.patrickhasse.de. The landing page, the theme system and the sync
 * API all read this list.
 *
 * Adding a new field (physics, biology, math…):
 *   1. Build the course under src/<id>/ (components + lib) and src/app/<id>/
 *      (layout wrapping everything in `.theme-<id>` + pages) — copy the shape
 *      of spark/ or catalyst/.
 *   2. Add a `.theme-<id> { --accent: …; --accent-dim: …; --btn-fg: …; }`
 *      block in globals.css.
 *   3. Append one entry here. Landing card, sync namespace and progress
 *      storage (`<id>-academy-progress-v1`) all follow automatically.
 *
 * Keep this file lightweight: it is imported by the landing page and API
 * routes — never import curriculum modules (they pull in every lesson).
 */

export interface CourseInfo {
  /** URL segment, theme suffix and storage/sync namespace. */
  id: string;
  name: string;
  emoji: string;
  /** Landing-card accent (mirrors the .theme-<id> --accent in globals.css). */
  accent: string;
  /** The scientific field, shown as the card's kicker line. */
  field: { en: string; de: string };
  tagline: { en: string; de: string };
  capstone: { en: string; de: string };
  /** Total lessons, shown on the landing card and used for the progress bar.
   *  Update when the curriculum grows (kept here so the landing page doesn't
   *  have to import the whole curriculum bundle). */
  lessonsTotal: number;
  unitsTotal: number;
}

export const COURSES: CourseInfo[] = [
  {
    id: "spark",
    name: "Spark Academy",
    emoji: "⚡",
    accent: "#4cc9f0",
    field: { en: "Electrical Engineering", de: "Elektrotechnik" },
    tagline: {
      en: "Electrical engineering from the electron up — circuits, signals, semiconductors, control and computation, with a lab in every lesson.",
      de: "Elektrotechnik vom Elektron aufwärts — Schaltungen, Signale, Halbleiter, Regelung und Computer, mit Labor in jeder Lektion.",
    },
    capstone: {
      en: "Ends in real hardware: a 555 blinker, a PWM dimmer, firmware on a Pico — and an oscilloscope you build yourself.",
      de: "Endet in echter Hardware: 555-Blinker, PWM-Dimmer, Firmware auf dem Pico — und ein selbstgebautes Oszilloskop.",
    },
    lessonsTotal: 57,
    unitsTotal: 21,
  },
  {
    id: "catalyst",
    name: "Catalyst Academy",
    emoji: "⚗️",
    accent: "#2dd4bf",
    field: { en: "Chemistry", de: "Chemie" },
    tagline: {
      en: "Chemistry from the atom up — bonds, reactions, moles, acids and electrochemistry, plus a memory hook for each of the 118 elements.",
      de: "Chemie vom Atom aufwärts — Bindungen, Reaktionen, Mol, Säuren und Elektrochemie, plus alle 118 Elemente mit je einer Eselsbrücke.",
    },
    capstone: {
      en: "Ends at your kitchen table: a red-cabbage pH rainbow, a stoichiometric CO₂ balloon — and a lemon battery lighting a real LED.",
      de: "Endet am Küchentisch: Rotkohl-pH-Regenbogen, stöchiometrischer CO₂-Ballon — und eine Zitronenbatterie, die eine echte LED leuchten lässt.",
    },
    lessonsTotal: 22,
    unitsTotal: 7,
  },
];

export function getCourse(id: string): CourseInfo | undefined {
  return COURSES.find((c) => c.id === id);
}

export function isCourseId(id: string): boolean {
  return COURSES.some((c) => c.id === id);
}
