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

import type { Lang } from "@/catalyst/lib/i18n";

interface GlossEntry {
  /** Literal variants as they appear in formula innerHTML (may contain <sub>). */
  variants: string[];
  tip: string;
  de: string;
}

const ENTRIES: GlossEntry[] = [
  // --- subscripted / multi-character symbols (matched before single letters) ---
  { variants: ["N<sub>A</sub>", "N_A"], tip: "Avogadro's number ≈ 6.022 × 10²³ particles per mole", de: "Avogadro-Zahl ≈ 6,022 × 10²³ Teilchen pro Mol" },
  { variants: ["E<sub>a</sub>", "E_a"], tip: "activation energy — the hill reactants must climb before they can react", de: "Aktivierungsenergie — der Hügel, den Reaktanten vor der Reaktion erklimmen müssen" },
  { variants: ["E°<sub>cell</sub>", "E°_cell"], tip: "cell voltage — the difference of the two electrodes' standard potentials", de: "Zellspannung — die Differenz der Standardpotenziale beider Elektroden" },
  { variants: ["E°"], tip: "standard electrode potential, in volts — how hungrily a metal ion grabs electrons", de: "Standardelektrodenpotenzial, in Volt — wie gierig ein Metallion Elektronen greift" },
  { variants: ["K<sub>c</sub>", "K_c"], tip: "equilibrium constant — products over reactants once the tug-of-war settles", de: "Gleichgewichtskonstante — Produkte durch Edukte, wenn das Tauziehen ruht" },
  { variants: ["ΔH"], tip: "enthalpy change — heat released (negative) or absorbed (positive) by the reaction", de: "Enthalpieänderung — von der Reaktion abgegebene (negativ) oder aufgenommene (positiv) Wärme" },
  { variants: ["Δχ"], tip: "electronegativity difference between the two bonded atoms", de: "Elektronegativitätsdifferenz der beiden gebundenen Atome" },
  { variants: ["[H⁺]", "[H<sub>3</sub>O⁺]"], tip: "hydrogen-ion concentration, in mol/L", de: "Wasserstoffionen-Konzentration, in mol/L" },
  { variants: ["[OH⁻]"], tip: "hydroxide-ion concentration, in mol/L", de: "Hydroxidionen-Konzentration, in mol/L" },
  { variants: ["pH"], tip: "the acidity scale: −log₁₀ of the H⁺ concentration — each step is 10×", de: "die Säureskala: −log₁₀ der H⁺-Konzentration — jede Stufe ist ein Faktor 10" },
  { variants: ["pOH"], tip: "−log₁₀ of the OH⁻ concentration; pH + pOH = 14 at 25 °C", de: "−log₁₀ der OH⁻-Konzentration; pH + pOH = 14 bei 25 °C" },
  { variants: ["e⁻"], tip: "an electron", de: "ein Elektron" },

  // --- single letters (boundary-guarded) ---
  { variants: ["n"], tip: "amount of substance, in moles", de: "Stoffmenge, in Mol" },
  { variants: ["m"], tip: "mass, in grams", de: "Masse, in Gramm" },
  { variants: ["M"], tip: "molar mass, in g/mol — read it off the periodic table", de: "molare Masse, in g/mol — ablesbar aus dem Periodensystem" },
  { variants: ["N"], tip: "number of particles (atoms, molecules, ions)", de: "Teilchenzahl (Atome, Moleküle, Ionen)" },
  { variants: ["c"], tip: "concentration (molarity), in mol/L", de: "Konzentration (Molarität), in mol/L" },
  { variants: ["V"], tip: "volume, in litres — in electrochemistry: volts", de: "Volumen, in Litern — in der Elektrochemie: Volt" },
  { variants: ["P"], tip: "pressure, in pascals (or kPa/bar as noted)", de: "Druck, in Pascal (oder kPa/bar wie angegeben)" },
  { variants: ["T"], tip: "absolute temperature, in kelvin (K = °C + 273.15)", de: "absolute Temperatur, in Kelvin (K = °C + 273,15)" },
  { variants: ["R"], tip: "the gas constant ≈ 8.314 J/(mol·K)", de: "die Gaskonstante ≈ 8,314 J/(mol·K)" },
  { variants: ["Q"], tip: "reaction quotient — same formula as K, but at this moment, not at equilibrium", de: "Reaktionsquotient — dieselbe Formel wie K, aber jetzt, nicht im Gleichgewicht" },
  { variants: ["Z"], tip: "atomic number — the proton count that defines the element", de: "Ordnungszahl — die Protonenzahl, die das Element festlegt" },
  { variants: ["A"], tip: "mass number — protons + neutrons", de: "Massenzahl — Protonen + Neutronen" },
  { variants: ["k"], tip: "rate constant — how fast the reaction runs at a given temperature", de: "Geschwindigkeitskonstante — wie schnell die Reaktion bei gegebener Temperatur läuft" },
  { variants: ["t"], tip: "time, in seconds", de: "Zeit, in Sekunden" },
  { variants: ["χ"], tip: "electronegativity — an atom's pull on shared electrons (Pauling scale)", de: "Elektronegativität — die Zugkraft eines Atoms auf Bindungselektronen (Pauling-Skala)" },
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
    ...single.map((c) => `(?<![\\wχΔ°⁺⁻<&/₀-₉⁰-⁹\\[])${esc(c)}(?![\\w>°₀-₉⁰-⁹\\]])`),
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
