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
    lessonsTotal: 25,
    unitsTotal: 7,
  },
  {
    id: "helix",
    name: "Helix Academy",
    emoji: "🧬",
    accent: "#a78bfa",
    field: { en: "Biology", de: "Biologie" },
    tagline: {
      en: "Biology from one cell up — membranes, enzymes, DNA, heredity, evolution and ecology, plus the genetic code with a memory hook for every amino acid.",
      de: "Biologie von einer Zelle aufwärts — Membranen, Enzyme, DNA, Vererbung, Evolution und Ökologie, plus der genetische Code mit einer Eselsbrücke für jede Aminosäure.",
    },
    capstone: {
      en: "Ends in your kitchen: real DNA pulled out of a strawberry on a stick, and a balloon inflated by living yeast to a volume you predicted.",
      de: "Endet in deiner Küche: echte DNA, am Stäbchen aus einer Erdbeere gezogen, und ein Ballon, den lebende Hefe auf ein von dir vorhergesagtes Volumen aufbläst.",
    },
    lessonsTotal: 23,
    unitsTotal: 10,
  },
  {
    id: "vector",
    name: "Vector Academy",
    emoji: "🪐",
    accent: "#38bdf8",
    field: { en: "Physics", de: "Physik" },
    tagline: {
      en: "Physics from the ground up — motion, forces, energy, waves, light and heat to the first quantum cracks, plus every SI unit, prefix and constant with a memory hook.",
      de: "Physik von Grund auf — Bewegung, Kräfte, Energie, Wellen, Licht und Wärme bis zu den ersten Quantenrissen, plus jede SI-Einheit, jedes Präfix und jede Konstante mit Eselsbrücke.",
    },
    capstone: {
      en: "Ends in your backyard: g measured with a string and a stopwatch to within a percent or two, and the speed of sound clapped against a wall.",
      de: "Endet im Hinterhof: g mit Schnur und Stoppuhr auf ein, zwei Prozent genau gemessen, und die Schallgeschwindigkeit an eine Wand geklatscht.",
    },
    lessonsTotal: 18,
    unitsTotal: 7,
  },
];

export function getCourse(id: string): CourseInfo | undefined {
  return COURSES.find((c) => c.id === id);
}

export function isCourseId(id: string): boolean {
  return COURSES.some((c) => c.id === id);
}
