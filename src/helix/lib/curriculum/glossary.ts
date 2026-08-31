/**
 * Symbol glossary for formula tooltips.
 *
 * `annotateFormulas` scans every `.formula` block (excluding its `.note`) and
 * wraps recognised symbols in a <span class="fvar" data-tip="…"> that CSS turns
 * into a hover tooltip. One dictionary covers every equation in the course.
 * Tips must not contain double quotes (they land in an HTML attribute).
 */

import type { Lang } from "@/helix/lib/i18n";

interface GlossEntry {
  variants: string[];
  tip: string;
  de: string;
}

const ENTRIES: GlossEntry[] = [
  // --- multi-character first, so they match before single letters ---
  { variants: ["ATP"], tip: "adenosine triphosphate — the cell's rechargeable energy currency", de: "Adenosintriphosphat — die aufladbare Energiewährung der Zelle" },
  { variants: ["ADP"], tip: "adenosine diphosphate — spent ATP, waiting to be recharged", de: "Adenosindiphosphat — verbrauchtes ATP, das auf Aufladung wartet" },
  { variants: ["DNA"], tip: "deoxyribonucleic acid — the double-stranded archive copy", de: "Desoxyribonukleinsäure — die doppelsträngige Archivkopie" },
  { variants: ["mRNA"], tip: "messenger RNA — the single-stranded working copy sent to the ribosome", de: "Boten-RNA — die einsträngige Arbeitskopie für das Ribosom" },
  { variants: ["tRNA"], tip: "transfer RNA — the adaptor that carries one amino acid and reads one codon", de: "Transfer-RNA — der Adapter, der eine Aminosäure trägt und ein Codon liest" },
  { variants: ["RNA"], tip: "ribonucleic acid — like DNA but single-stranded, with U in place of T", de: "Ribonukleinsäure — wie DNA, aber einsträngig und mit U statt T" },
  { variants: ["CO₂"], tip: "carbon dioxide — waste of respiration, raw material of photosynthesis", de: "Kohlenstoffdioxid — Abfall der Atmung, Rohstoff der Fotosynthese" },
  { variants: ["O₂"], tip: "oxygen gas — waste of photosynthesis, fuel of respiration", de: "Sauerstoff — Abfall der Fotosynthese, Treibstoff der Atmung" },
  { variants: ["H₂O"], tip: "water", de: "Wasser" },
  { variants: ["C₆H₁₂O₆"], tip: "glucose — the sugar both photosynthesis and respiration are about", de: "Glucose — der Zucker, um den es bei Fotosynthese und Atmung geht" },
  { variants: ["K"], tip: "carrying capacity — the population size the environment can sustain", de: "Kapazitätsgrenze — die Populationsgröße, die die Umwelt tragen kann" },

  // --- single letters, boundary-guarded ---
  { variants: ["N"], tip: "population size — the number of individuals", de: "Populationsgröße — die Anzahl der Individuen" },
  { variants: ["r"], tip: "intrinsic growth rate — how fast a population grows when nothing limits it", de: "intrinsische Wachstumsrate — wie schnell eine Population ohne Grenzen wächst" },
  { variants: ["t"], tip: "time", de: "Zeit" },
  { variants: ["p"], tip: "frequency of the dominant allele", de: "Häufigkeit des dominanten Allels" },
  { variants: ["q"], tip: "frequency of the recessive allele", de: "Häufigkeit des rezessiven Allels" },
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
