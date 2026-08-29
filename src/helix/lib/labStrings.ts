/**
 * Exact-match EN→DE dictionary for Helix's interactive labs (canvas labels,
 * meter titles, control labels, in-lab buttons) — the same mechanism the other
 * courses use.
 *
 * The canvas is not React, so it cannot read the language context; instead the
 * LanguageProvider calls setLabDictionary() on every switch and the drawing
 * primitives translate through tl(). Keys must match the source strings
 * character-exactly. Dynamic strings (template literals with numbers) fall
 * through untranslated by design — they are mostly numbers and base letters.
 *
 * Prose drawn on the canvas is translated *before* being word-wrapped; a
 * per-line tl() could never match a key once a sentence has been chopped up.
 */

export const LAB_DE: Record<string, string> = {
  /* ---- shared control vocabulary ---- */
  Temperature: "Temperatur",
  Speed: "Geschwindigkeit",
  Reset: "Zurücksetzen",
  Start: "Start",
  Pause: "Pause",
  Step: "Schritt",
  Generation: "Generation",
  Rate: "Rate",
  Time: "Zeit",
  Population: "Population",

  /* ---- unit 0: the cell ---- */
  Organelle: "Organell",
  "Cell type": "Zelltyp",
  "Animal cell": "Tierzelle",
  "Plant cell": "Pflanzenzelle",
  "Bacterial cell": "Bakterienzelle",
  "click a part to identify it": "klicke ein Teil an, um es zu bestimmen",
  Nucleus: "Zellkern",
  Mitochondrion: "Mitochondrium",
  Ribosome: "Ribosom",
  Chloroplast: "Chloroplast",
  "Cell membrane": "Zellmembran",
  "Cell wall": "Zellwand",
  Vacuole: "Vakuole",
  Cytoplasm: "Zytoplasma",

  /* ---- unit 0.3: osmosis ---- */
  "Outside concentration": "Konzentration außen",
  hypotonic: "hypotonisch",
  isotonic: "isotonisch",
  hypertonic: "hypertonisch",
  "water in": "Wasser hinein",
  "water out": "Wasser hinaus",
  balanced: "im Gleichgewicht",
  "cell volume": "Zellvolumen",
  "net water flow": "Netto-Wasserfluss",
  "swells and may burst": "schwillt an und kann platzen",
  "shrinks and shrivels": "schrumpft und schrumpelt",
  "stays put": "bleibt konstant",

  /* ---- unit 1: energy ---- */
  Substrate: "Substrat",
  "Substrate concentration": "Substratkonzentration",
  pH: "pH",
  "reaction rate": "Reaktionsgeschwindigkeit",
  denatured: "denaturiert",
  "active site": "aktives Zentrum",
  "Light intensity": "Lichtintensität",
  "CO₂ level": "CO₂-Gehalt",
  "limiting factor": "begrenzender Faktor",
  light: "Licht",
  temperature: "Temperatur",
  "Oxygen available": "Sauerstoff verfügbar",
  aerobic: "aerob",
  anaerobic: "anaerob",
  "ATP per glucose": "ATP pro Glucose",

  /* ---- unit 2: DNA ---- */
  "Template strand": "Matrizenstrang",
  "mRNA codon": "mRNA-Codon",
  "amino acid": "Aminosäure",
  Protein: "Protein",
  "Mutation type": "Mutationstyp",
  none: "keine",
  substitution: "Substitution",
  insertion: "Insertion",
  deletion: "Deletion",
  silent: "stumm",
  missense: "Missense",
  nonsense: "Nonsense",
  frameshift: "Leserasterverschiebung",
  "reading frame": "Leseraster",

  /* ---- unit 3: genetics ---- */
  "Parent 1": "Elternteil 1",
  "Parent 2": "Elternteil 2",
  dominant: "dominant",
  recessive: "rezessiv",
  Genotype: "Genotyp",
  Phenotype: "Phänotyp",
  "offspring ratio": "Nachkommen-Verhältnis",

  /* ---- unit 4: evolution ---- */
  "Selection pressure": "Selektionsdruck",
  "Mutation rate": "Mutationsrate",
  "allele frequency": "Allelfrequenz",
  generations: "Generationen",
  "Predator vision": "Sicht der Räuber",

  /* ---- unit 5: ecology ---- */
  "Carrying capacity": "Kapazitätsgrenze",
  "Growth rate": "Wachstumsrate",
  producers: "Produzenten",
  "primary consumers": "Primärkonsumenten",
  "secondary consumers": "Sekundärkonsumenten",
  "energy passed on": "weitergegebene Energie",
};

let active: Record<string, string> | null = null;

export function setLabDictionary(dict: Record<string, string> | null) {
  active = dict;
}

/** Translate a lab string via the active dictionary; unknown strings pass through. */
export function tl(s: string): string {
  return active?.[s] ?? s;
}
