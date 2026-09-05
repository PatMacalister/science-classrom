/**
 * Symbol glossary for formula tooltips.
 *
 * `annotateFormulas` scans every `.formula` block (excluding its `.note`) and
 * wraps recognised symbols in a <span class="fvar" data-tip="…"> that CSS turns
 * into a hover tooltip. One dictionary covers every equation in the course.
 * Tips must not contain double quotes (they land in an HTML attribute).
 */

import type { Lang } from "@/servo/lib/i18n";

interface GlossEntry {
  variants: string[];
  tip: string;
  de: string;
}

const ENTRIES: GlossEntry[] = [
  // --- multi-character first, so they match before single letters ---
  { variants: ["V_avg"], tip: "the average voltage the load feels", de: "die mittlere Spannung, die die Last spürt" },
  { variants: ["V_supply"], tip: "the full supply voltage being switched", de: "die volle Versorgungsspannung, die geschaltet wird" },
  { variants: ["F_grip"], tip: "the squeeze force of one finger, in newtons", de: "die Druckkraft eines Fingers, in Newton" },
  { variants: ["d_L", "d_R"], tip: "distance covered by the left / right wheel", de: "vom linken / rechten Rad zurückgelegte Strecke" },
  { variants: ["L₁", "L₂"], tip: "the lengths of the two arm links", de: "die Längen der beiden Armglieder" },
  { variants: ["θ₁"], tip: "the shoulder joint's angle", de: "der Winkel des Schultergelenks" },
  { variants: ["θ₂"], tip: "the elbow joint's angle, relative to the upper arm", de: "der Winkel des Ellbogengelenks, relativ zum Oberarm" },
  { variants: ["Kp"], tip: "proportional gain — push per unit of error", de: "Proportionalverstärkung — Schub pro Einheit Fehler" },
  { variants: ["Ki"], tip: "integral gain — weight of the accumulated error", de: "Integralverstärkung — Gewicht des aufgelaufenen Fehlers" },
  { variants: ["Kd"], tip: "derivative gain — braking against fast error change", de: "Differenzialverstärkung — Bremse gegen schnelle Fehleränderung" },
  { variants: ["de/dt"], tip: "how fast the error is changing right now", de: "wie schnell sich der Fehler gerade ändert" },
  { variants: ["∫e"], tip: "the error summed up over time — the grudge account", de: "der über die Zeit aufsummierte Fehler — das Groll-Konto" },
  { variants: ["dt"], tip: "one loop tick of time", de: "ein Schleifentakt Zeit" },
  { variants: ["gyro"], tip: "the gyro's measured rotation rate", de: "die vom Gyro gemessene Drehrate" },
  { variants: ["accel_angle"], tip: "the tilt angle the accelerometer reports from gravity", de: "der Neigungswinkel, den der Beschleunigungssensor aus der Schwerkraft meldet" },
  { variants: ["track"], tip: "the distance between the two driven wheels", de: "der Abstand zwischen den beiden Antriebsrädern" },
  { variants: ["steps"], tip: "how many step pulses were sent", de: "wie viele Schrittimpulse gesendet wurden" },

  // --- single letters, boundary-guarded ---
  { variants: ["D"], tip: "duty cycle — the on-fraction of each PWM cycle, 0 to 1", de: "Tastgrad — der An-Anteil jedes PWM-Zyklus, 0 bis 1" },
  { variants: ["e"], tip: "the error: setpoint minus measured", de: "der Fehler: Sollwert minus Messwert" },
  { variants: ["u"], tip: "the controller's output — the effort it commands", de: "der Ausgang des Reglers — die befohlene Stellgröße" },
  { variants: ["v"], tip: "speed — of sound, light or the robot, in m/s", de: "Geschwindigkeit — von Schall, Licht oder Roboter, in m/s" },
  { variants: ["t"], tip: "time", de: "Zeit" },
  { variants: ["d"], tip: "distance", de: "Entfernung" },
  { variants: ["x"], tip: "position — of the hand or the robot", de: "Position — der Hand oder des Roboters" },
  { variants: ["y"], tip: "position, second coordinate", de: "Position, zweite Koordinate" },
  { variants: ["α"], tip: "the complementary filter's trust dial, near 0.98", de: "der Vertrauensregler des Komplementärfilters, nahe 0,98" },
  { variants: ["µ"], tip: "the coefficient of friction at the fingertips", de: "der Reibungskoeffizient an den Fingerspitzen" },
  { variants: ["m"], tip: "mass, in kilograms", de: "Masse, in Kilogramm" },
  { variants: ["g"], tip: "gravity, 9.81 m/s² — or, in A*, the cost from the start", de: "Schwerkraft, 9,81 m/s² — oder, bei A*, die Kosten seit dem Start" },
  { variants: ["h"], tip: "A*'s optimistic straight-line guess to the goal", de: "A*s optimistische Luftlinien-Schätzung zum Ziel" },
  { variants: ["f"], tip: "frequency — or, in A*, the cell's rank g + h", de: "Frequenz — oder, bei A*, der Zellenrang g + h" },
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
