/**
 * Symbol glossary for formula tooltips.
 *
 * `annotateFormulas` scans every `.formula` block (excluding its `.note`) and
 * wraps recognised symbols in a <span class="fvar" data-tip="…"> that CSS turns
 * into a hover tooltip. One dictionary covers every equation in the course.
 * Tips must not contain double quotes (they land in an HTML attribute).
 */

import type { Lang } from "@/vector/lib/i18n";

interface GlossEntry {
  variants: string[];
  tip: string;
  de: string;
}

const ENTRIES: GlossEntry[] = [
  // --- multi-character first, so they match before single letters ---
  { variants: ["Δx"], tip: "change in position", de: "Änderung der Position" },
  { variants: ["Δv"], tip: "change in velocity", de: "Änderung der Geschwindigkeit" },
  { variants: ["Δt"], tip: "time interval", de: "Zeitspanne" },
  { variants: ["Δp"], tip: "change in momentum", de: "Änderung des Impulses" },
  { variants: ["ΔT"], tip: "temperature change, in kelvins or °C steps", de: "Temperaturänderung, in Kelvin oder °C-Schritten" },
  { variants: ["KE"], tip: "kinetic energy — the energy of motion, in joules", de: "kinetische Energie — Bewegungsenergie, in Joule" },
  { variants: ["PE"], tip: "potential energy — stored in position, in joules", de: "potenzielle Energie — in der Lage gespeichert, in Joule" },
  { variants: ["T½"], tip: "half-life — the time in which half of any large sample decays", de: "Halbwertszeit — die Zeit, in der die Hälfte einer großen Probe zerfällt" },
  { variants: ["N₀"], tip: "the starting count of nuclei", de: "die Anfangszahl der Kerne" },
  { variants: ["N(t)"], tip: "how many nuclei remain at time t", de: "wie viele Kerne zur Zeit t übrig sind" },
  { variants: ["d₀"], tip: "object distance — from the object to the lens", de: "Gegenstandsweite — vom Objekt zur Linse" },
  { variants: ["dᵢ"], tip: "image distance — from the lens to where the image forms", de: "Bildweite — von der Linse zum Ort des Bildes" },
  { variants: ["vₓ"], tip: "the horizontal share of the velocity", de: "der horizontale Anteil der Geschwindigkeit" },
  { variants: ["v_y"], tip: "the vertical share of the velocity", de: "der vertikale Anteil der Geschwindigkeit" },
  { variants: ["m₁", "m₂"], tip: "the two masses involved", de: "die beiden beteiligten Massen" },
  { variants: ["n₁", "n₂"], tip: "refractive index on each side of the boundary", de: "Brechungsindex auf jeder Seite der Grenze" },
  { variants: ["θ₁", "θ₂"], tip: "angle on each side, measured from the normal", de: "Winkel auf jeder Seite, gemessen zur Normalen" },
  { variants: ["λₙ"], tip: "wavelength of the n-th harmonic", de: "Wellenlänge der n-ten Harmonischen" },
  { variants: ["fₙ"], tip: "frequency of the n-th harmonic", de: "Frequenz der n-ten Harmonischen" },
  { variants: ["f₁"], tip: "the fundamental — the string's lowest resonant frequency", de: "der Grundton — die tiefste Resonanzfrequenz der Saite" },

  // --- single letters, boundary-guarded ---
  { variants: ["v"], tip: "velocity (or wave speed), in metres per second", de: "Geschwindigkeit (oder Wellengeschwindigkeit), in Metern pro Sekunde" },
  { variants: ["a"], tip: "acceleration — how fast velocity changes, in m/s²", de: "Beschleunigung — wie schnell sich die Geschwindigkeit ändert, in m/s²" },
  { variants: ["t"], tip: "time", de: "Zeit" },
  { variants: ["x"], tip: "position or distance", de: "Position oder Strecke" },
  { variants: ["F"], tip: "force, in newtons", de: "Kraft, in Newton" },
  { variants: ["m"], tip: "mass, in kilograms", de: "Masse, in Kilogramm" },
  { variants: ["g"], tip: "gravitational acceleration — 9.81 m/s² at Earth's surface", de: "Fallbeschleunigung — 9,81 m/s² an der Erdoberfläche" },
  { variants: ["G"], tip: "the universal gravitational constant, 6.67 × 10⁻¹¹", de: "die universelle Gravitationskonstante, 6,67 × 10⁻¹¹" },
  { variants: ["p"], tip: "momentum — mass times velocity", de: "Impuls — Masse mal Geschwindigkeit" },
  { variants: ["L"], tip: "length — of the pendulum string or the vibrating string", de: "Länge — der Pendelschnur oder der schwingenden Saite" },
  { variants: ["T"], tip: "period — the time for one full swing or cycle", de: "Periode — die Zeit für eine volle Schwingung" },
  { variants: ["f"], tip: "frequency in hertz — or, in optics, a lens's focal length", de: "Frequenz in Hertz — oder, in der Optik, die Brennweite einer Linse" },
  { variants: ["λ"], tip: "wavelength — crest-to-crest distance, in metres", de: "Wellenlänge — Abstand von Kamm zu Kamm, in Metern" },
  { variants: ["n"], tip: "a whole number (harmonics) — or a medium's refractive index", de: "eine ganze Zahl (Harmonische) — oder der Brechungsindex eines Mediums" },
  { variants: ["N"], tip: "the normal force — how hard two surfaces press together", de: "die Normalkraft — wie stark zwei Flächen aufeinanderdrücken" },
  { variants: ["µ"], tip: "the coefficient of friction — the surface pair's roughness number", de: "der Reibungskoeffizient — die Rauigkeitszahl des Flächenpaars" },
  { variants: ["θ"], tip: "an angle", de: "ein Winkel" },
  { variants: ["E"], tip: "energy, in joules", de: "Energie, in Joule" },
  { variants: ["h"], tip: "height — or, with E = hf, the Planck constant", de: "Höhe — oder, bei E = hf, die Planck-Konstante" },
  { variants: ["Q"], tip: "heat — energy transferred by a temperature difference", de: "Wärme — durch Temperaturunterschied übertragene Energie" },
  { variants: ["c"], tip: "specific heat capacity — or, alone, the speed of light", de: "spezifische Wärmekapazität — oder, allein, die Lichtgeschwindigkeit" },
  { variants: ["r"], tip: "distance between the two centres", de: "Abstand zwischen den beiden Mittelpunkten" },
  { variants: ["d"], tip: "distance", de: "Entfernung" },
];

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

let compiled: { regex: RegExp; lookup: Map<string, GlossEntry> } | null = null;

function compile() {
  if (compiled) return compiled;
  const lookup = new Map<string, GlossEntry>();
  const multi: string[] = [];
  const single: string[] = [];
  for (const entry of ENTRIES) {
    for (const v of entry.variants) {
      lookup.set(v, entry);
      if (v.length === 1) single.push(v);
      else multi.push(v);
    }
  }
  multi.sort((a, b) => b.length - a.length);
  const parts = [
    ...multi.map(esc),
    ...single.map((c) => `(?<![\\w<&/₀-₉⁰-⁹])${esc(c)}(?![\\w>₀-₉⁰-⁹])`),
  ];
  compiled = { regex: new RegExp(parts.join("|"), "g"), lookup };
  return compiled;
}

const UNWRAP = /<span class="fvar" data-tip="[^"]*">([\s\S]*?)<\/span>/g;

/**
 * Wrap known symbols in every `.formula` under `root` with tooltip spans in the
 * given language. Formulas annotated in another language are unwrapped and
 * redone; same-language formulas are skipped.
 */
export function annotateFormulas(root: ParentNode, lang: Lang = "en") {
  const { regex, lookup } = compile();
  root.querySelectorAll<HTMLElement>(".formula").forEach((el) => {
    if (el.dataset.gloss === lang) return;
    if (el.dataset.gloss) {
      el.innerHTML = el.innerHTML.replace(UNWRAP, "$1");
    }
    el.dataset.gloss = lang;
    const html = el.innerHTML;
    const noteAt = html.indexOf('<span class="note"');
    const head = noteAt === -1 ? html : html.slice(0, noteAt);
    const tail = noteAt === -1 ? "" : html.slice(noteAt);
    el.innerHTML =
      head.replace(regex, (m) => {
        const entry = lookup.get(m);
        if (!entry) return m;
        const tip = lang === "de" ? entry.de : entry.tip;
        return `<span class="fvar" data-tip="${tip}">${m}</span>`;
      }) + tail;
  });
}
