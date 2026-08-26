/**
 * Symbol glossary for formula tooltips.
 *
 * `annotateFormulas` scans every `.formula` block (excluding its `.note`) and
 * wraps recognised variables in a <span class="fvar" data-tip="…"> that CSS
 * turns into a hover tooltip. One central dictionary → every equation in the
 * course (including future ones) gets tooltips with no per-lesson markup.
 * Tooltips are bilingual: pass the active language; switching languages
 * un-wraps and re-annotates already-processed formulas.
 *
 * Tips must not contain double quotes (they land in an HTML attribute).
 */

import type { Lang } from "@/spark/lib/i18n";

interface GlossEntry {
  /** Literal variants as they appear in formula innerHTML (may contain <sub>). */
  variants: string[];
  tip: string;
  de: string;
}

const ENTRIES: GlossEntry[] = [
  // --- subscripted / multi-character symbols (matched before single letters) ---
  { variants: ["V<sub>rms</sub>", "V_rms", "Vrms"], tip: "RMS voltage — the DC-equivalent value: Vp/√2 for sines", de: "Effektivwert der Spannung — der DC-äquivalente Wert: Vp/√2 bei Sinus" },
  { variants: ["V<sub>p</sub>", "V_p", "Vpeak"], tip: "peak voltage — the sine's highest instantaneous value", de: "Scheitelspannung — der höchste Augenblickswert des Sinus" },
  { variants: ["V<sub>in</sub>", "V_in"], tip: "input voltage", de: "Eingangsspannung" },
  { variants: ["V<sub>out</sub>", "V_out"], tip: "output voltage", de: "Ausgangsspannung" },
  { variants: ["V_s", "V<sub>s</sub>"], tip: "supply (source) voltage", de: "Versorgungs-/Quellenspannung" },
  { variants: ["V_f", "V<sub>f</sub>"], tip: "forward voltage — the diode/LED turn-on threshold", de: "Durchlassspannung — die Einschaltschwelle der Diode/LED" },
  { variants: ["Vcc", "V_cc"], tip: "the positive supply voltage", de: "die positive Versorgungsspannung" },
  { variants: ["V₊"], tip: "the op-amp's non-inverting (+) input", de: "der nichtinvertierende (+) Eingang des Op-Amps" },
  { variants: ["V₋"], tip: "the op-amp's inverting (−) input", de: "der invertierende (−) Eingang des Op-Amps" },
  { variants: ["V_rises"], tip: "voltage gains around the loop (through sources)", de: "Spannungsgewinne in der Masche (durch Quellen)" },
  { variants: ["V_drops"], tip: "voltage drops around the loop (across loads)", de: "Spannungsabfälle in der Masche (über Verbrauchern)" },
  { variants: ["X<sub>C</sub>", "X_C", "Xc"], tip: "capacitive reactance — the capacitor's frequency-dependent opposition, in ohms", de: "kapazitiver Blindwiderstand — der frequenzabhängige Widerstand des Kondensators, in Ohm" },
  { variants: ["R_series"], tip: "total resistance of the series chain", de: "Gesamtwiderstand der Reihenschaltung" },
  { variants: ["R_parallel"], tip: "combined resistance of the parallel group", de: "Ersatzwiderstand der Parallelschaltung" },
  { variants: ["R<sub>f</sub>", "R_f"], tip: "feedback resistor — from output to the inverting input", de: "Rückkopplungswiderstand — vom Ausgang zum invertierenden Eingang" },
  { variants: ["R<sub>g</sub>", "R_g"], tip: "the divider leg from the inverting input to ground", de: "das Teilerbein vom invertierenden Eingang nach Masse" },
  { variants: ["R_a"], tip: "upper pot section — the charge path", de: "obere Poti-Hälfte — der Ladepfad" },
  { variants: ["R_b"], tip: "lower pot section — the discharge path", de: "untere Poti-Hälfte — der Entladepfad" },
  { variants: ["R₁", "R1"], tip: "resistor 1 (in the 555: Vcc → pin 7)", de: "Widerstand 1 (beim 555: Vcc → Pin 7)" },
  { variants: ["R₂", "R2"], tip: "resistor 2 (in the 555: pin 7 → pins 6+2)", de: "Widerstand 2 (beim 555: Pin 7 → Pins 6+2)" },
  { variants: ["R₃", "R3"], tip: "resistor 3", de: "Widerstand 3" },
  { variants: ["I_C"], tip: "collector current — the big, controlled flow", de: "Kollektorstrom — der große, gesteuerte Fluss" },
  { variants: ["I_B"], tip: "base current — the small, controlling flow", de: "Basisstrom — der kleine, steuernde Fluss" },
  { variants: ["I_in"], tip: "currents flowing into the node", de: "in den Knoten hineinfließende Ströme" },
  { variants: ["I_out"], tip: "currents flowing out of the node", de: "aus dem Knoten herausfließende Ströme" },
  { variants: ["C<sub>in</sub>", "C_in"], tip: "carry-in — the bit carried from the previous column", de: "Carry-in — das aus der vorigen Spalte übertragene Bit" },
  { variants: ["f₀"], tip: "resonant frequency — the LC tank's natural note", de: "Resonanzfrequenz — der Eigenton des LC-Schwingkreises" },
  { variants: ["f<sub>c</sub>", "f_c"], tip: "cutoff frequency (filters) — or carrier frequency (radio)", de: "Grenzfrequenz (Filter) — oder Trägerfrequenz (Funk)" },
  { variants: ["f_s", "f<sub>s</sub>"], tip: "sample rate — snapshots per second", de: "Abtastrate — Schnappschüsse pro Sekunde" },
  { variants: ["f_a"], tip: "audio (modulating) frequency", de: "Audio-(Modulations-)Frequenz" },
  { variants: ["f_sw"], tip: "switching frequency of the converter", de: "Schaltfrequenz des Wandlers" },
  { variants: ["f_max"], tip: "the highest frequency component present", de: "die höchste vorhandene Frequenzkomponente" },
  { variants: ["f_apparent"], tip: "the frequency the samples appear to trace after folding", de: "die Frequenz, die die Abtastwerte nach der Spiegelung scheinbar zeichnen" },
  { variants: ["f_carrier"], tip: "the carrier frequency", de: "die Trägerfrequenz" },
  { variants: ["f_audio"], tip: "the audio (modulating) frequency", de: "die Audio-(Modulations-)Frequenz" },
  { variants: ["f₁"], tip: "first input tone to the mixer", de: "erster Eingangston des Mischers" },
  { variants: ["f₂"], tip: "second input tone (the local oscillator)", de: "zweiter Eingangston (der Lokaloszillator)" },
  { variants: ["t_high"], tip: "time the output spends HIGH each cycle", de: "Zeit, die der Ausgang pro Zyklus HIGH ist" },
  { variants: ["t_low"], tip: "time the output spends LOW each cycle", de: "Zeit, die der Ausgang pro Zyklus LOW ist" },
  { variants: ["Kp"], tip: "proportional gain — reacts to the present error", de: "Proportionalverstärkung — reagiert auf die gegenwärtige Abweichung" },
  { variants: ["Ki"], tip: "integral gain — accumulates past error, kills offset", de: "Integralverstärkung — summiert vergangene Abweichung, tilgt den Versatz" },
  { variants: ["Kd"], tip: "derivative gain — reacts to the error's trend, damps overshoot", de: "Differentialverstärkung — reagiert auf den Trend der Abweichung, dämpft Überschwingen" },
  { variants: ["q₁"], tip: "first charge, in coulombs", de: "erste Ladung, in Coulomb" },
  { variants: ["q₂"], tip: "second charge, in coulombs", de: "zweite Ladung, in Coulomb" },
  { variants: ["a₁"], tip: "amplitude of the fundamental (1st harmonic)", de: "Amplitude der Grundschwingung (1. Harmonische)" },
  { variants: ["a₂"], tip: "amplitude of the 2nd harmonic", de: "Amplitude der 2. Harmonischen" },
  { variants: ["a₃"], tip: "amplitude of the 3rd harmonic", de: "Amplitude der 3. Harmonischen" },
  { variants: ["RC"], tip: "resistance × capacitance — the time constant τ, in seconds", de: "Widerstand × Kapazität — die Zeitkonstante τ, in Sekunden" },
  { variants: ["LC"], tip: "inductance × capacitance — sets the resonant frequency", de: "Induktivität × Kapazität — bestimmt die Resonanzfrequenz" },
  { variants: ["2ⁿ"], tip: "2 multiplied by itself n times — how binary counts explode", de: "2 hoch n — wie binäres Zählen explodiert" },
  { variants: ["dI/dt"], tip: "how fast the current is changing", de: "wie schnell sich der Strom ändert" },
  { variants: ["de/dt"], tip: "how fast the error is changing", de: "wie schnell sich die Abweichung ändert" },
  { variants: ["dφ/dt"], tip: "how fast the phase angle is changing — the instantaneous frequency", de: "wie schnell sich der Phasenwinkel ändert — die Momentanfrequenz" },

  // --- single letters (boundary-guarded) ---
  { variants: ["V"], tip: "voltage — energy per unit charge, in volts", de: "Spannung — Energie pro Ladungseinheit, in Volt" },
  { variants: ["I"], tip: "current — charge flow per second, in amperes", de: "Strom — Ladungsfluss pro Sekunde, in Ampere" },
  { variants: ["R"], tip: "resistance, in ohms", de: "Widerstand, in Ohm" },
  { variants: ["C"], tip: "capacitance, in farads", de: "Kapazität, in Farad" },
  { variants: ["L"], tip: "inductance, in henries", de: "Induktivität, in Henry" },
  { variants: ["Q"], tip: "electric charge in coulombs — in resonance: the Q (quality) factor", de: "elektrische Ladung in Coulomb — bei Resonanz: die Güte Q" },
  { variants: ["P"], tip: "power — energy per second, in watts", de: "Leistung — Energie pro Sekunde, in Watt" },
  { variants: ["W"], tip: "energy (work), in joules", de: "Energie (Arbeit), in Joule" },
  { variants: ["F"], tip: "force, in newtons", de: "Kraft, in Newton" },
  { variants: ["T"], tip: "period — the duration of one full cycle (= 1/f)", de: "Periode — die Dauer eines vollen Zyklus (= 1/f)" },
  { variants: ["f"], tip: "frequency — cycles per second, in hertz", de: "Frequenz — Zyklen pro Sekunde, in Hertz" },
  { variants: ["t"], tip: "time, in seconds", de: "Zeit, in Sekunden" },
  { variants: ["r"], tip: "distance between the charges, in metres", de: "Abstand zwischen den Ladungen, in Metern" },
  { variants: ["q"], tip: "charge, in coulombs", de: "Ladung, in Coulomb" },
  { variants: ["k"], tip: "Coulomb's constant ≈ 8.99 × 10⁹ — in spectra: the harmonic number", de: "Coulomb-Konstante ≈ 8,99 × 10⁹ — in Spektren: die Nummer der Harmonischen" },
  { variants: ["e"], tip: "Euler's number ≈ 2.718 (exponential decay) — in control laws: the error, setpoint − measurement", de: "Eulersche Zahl ≈ 2,718 (exponentielles Abklingen) — in Regelgesetzen: die Abweichung, Sollwert − Messwert" },
  { variants: ["m"], tip: "modulation depth, 0 to 1", de: "Modulationsgrad, 0 bis 1" },
  { variants: ["D"], tip: "duty cycle — the fraction of each period spent HIGH", de: "Tastgrad — der HIGH-Anteil jeder Periode" },
  { variants: ["A"], tip: "in op-amps: the huge open-loop gain — in the CPU: register A, the accumulator", de: "beim Op-Amp: die riesige Leerlaufverstärkung — in der CPU: Register A, der Akkumulator" },
  { variants: ["B"], tip: "the second operand or channel", de: "der zweite Operand oder Kanal" },
  { variants: ["n"], tip: "a whole-number count — bits, address lines or stages", de: "eine ganzzahlige Anzahl — Bits, Adressleitungen oder Stufen" },
  { variants: ["x"], tip: "the newest raw sample", de: "der neueste rohe Abtastwert" },
  { variants: ["y"], tip: "the filter's running output value", de: "der laufende Ausgangswert des Filters" },
  { variants: ["τ"], tip: "the time constant — seconds to cover 63% of the remaining distance", de: "die Zeitkonstante — Sekunden für 63 % der verbleibenden Strecke" },
  { variants: ["β"], tip: "the transistor's current gain, typically ≈ 100", de: "die Stromverstärkung des Transistors, typisch ≈ 100" },
  { variants: ["α"], tip: "the smoothing factor, 0 to 1 — small α = heavy filtering", de: "der Glättungsfaktor, 0 bis 1 — kleines α = starke Filterung" },
  { variants: ["π"], tip: "the circle constant ≈ 3.14159", de: "die Kreiszahl ≈ 3,14159" },
  { variants: ["Σ"], tip: "the sum of…", de: "die Summe von…" },
  { variants: ["∫"], tip: "the integral — accumulate over time", de: "das Integral — über die Zeit aufsummieren" },
  { variants: ["⊕"], tip: "XOR — outputs 1 when the inputs differ", de: "XOR — liefert 1, wenn die Eingänge sich unterscheiden" },
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
    ...single.map((c) => `(?<![\\wπτβα<&/₀-₉⁰-⁹])${esc(c)}(?![\\w>₀-₉⁰-⁹])`),
  ];
  compiled = { regex: new RegExp(parts.join("|"), "g"), lookup };
  return compiled;
}

const UNWRAP = /<span class="fvar" data-tip="[^"]*">([\s\S]*?)<\/span>/g;

/**
 * Wrap known symbols in every `.formula` under `root` with tooltip spans in
 * the given language. Formulas already annotated in another language are
 * unwrapped and redone; same-language formulas are skipped.
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
