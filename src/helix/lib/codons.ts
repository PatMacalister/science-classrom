/**
 * The genetic code — Helix Academy's signature reference, the counterpart to
 * Catalyst's periodic table.
 *
 * Two datasets:
 *  - AMINO_ACIDS: the 20 amino acids plus the stop signal, each with a memory
 *    hook tying the name to its one-letter code. That mapping is the real pain
 *    point: A/C/G are obvious, but W = tryptophan, K = lysine, Q = glutamine
 *    and R = arginine are arbitrary enough that everyone re-derives them badly.
 *    Same problem as Fe/Iron, same fix — `*stars*` mark the letters that matter.
 *  - CODONS: all 64 mRNA triplets. Read 5'→3'; U replaces T because this is RNA.
 *
 * The third base is mostly redundant ("wobble"): in eight of the sixteen
 * families all four codons mean the same amino acid, which is why many point
 * mutations are silent. That pattern is the single most useful thing to see in
 * the table, so the UI groups by first two bases.
 */

export type AminoClass =
  | "nonpolar"
  | "polar"
  | "acidic"
  | "basic"
  | "aromatic"
  | "stop";

export interface AminoAcid {
  /** One-letter code — the part worth a mnemonic. */
  code1: string;
  /** Three-letter code. */
  code3: string;
  name: string;
  nameDe: string;
  cls: AminoClass;
  /** English memory hook; `*stars*` mark the emphasised letters. */
  hook: string;
  /** German Eselsbrücke, same convention. */
  esel: string;
}

export const AMINO_ACIDS: AminoAcid[] = [
  { code1: "A", code3: "Ala", name: "Alanine", nameDe: "Alanin", cls: "nonpolar",
    hook: "*A*lanine — the easy one: *A* for *A*lanine, first in the alphabet and simplest after glycine.",
    esel: "*A*lanin — die einfache: *A* wie *A*lanin, alphabetisch vorn und nach Glycin die simpelste." },
  { code1: "R", code3: "Arg", name: "Arginine", nameDe: "Arginin", cls: "basic",
    hook: "A*R*ginine — A is taken by alanine, so arginine grabs its *R*. Think a*R*R*R*ginine, the pirate's amino acid.",
    esel: "A*R*ginin — das A ist an Alanin vergeben, also nimmt Arginin sein *R*. Denk an A*rr*rginin, die Piraten-Aminosäure." },
  { code1: "N", code3: "Asn", name: "Asparagine", nameDe: "Asparagin", cls: "polar",
    hook: "Aspargi*N*e — the *N* is its amide *N*itrogen, and it was first found in asparagus.",
    esel: "Asparagi*n* — das *N* ist sein Amid-*N*-Stickstoff; zuerst im Spargel gefunden." },
  { code1: "D", code3: "Asp", name: "Aspartate", nameDe: "Aspartat", cls: "acidic",
    hook: "Aspar*D*ic acid — say it with a D and the code sticks. *D* is the shorter acid; E is its longer twin.",
    esel: "Aspar*d*insäure — sprich es mit D, dann sitzt der Code. *D* ist die kürzere Säure, E die längere." },
  { code1: "C", code3: "Cys", name: "Cysteine", nameDe: "Cystein", cls: "polar",
    hook: "*C*ysteine — *C* for *C*ysteine, and for the di*s*ulfide *C*lamps it forms that hold proteins folded.",
    esel: "*C*ystein — *C* wie *C*ystein, und wie die Disulfid-*C*lammern, die Proteine gefaltet halten." },
  { code1: "E", code3: "Glu", name: "Glutamate", nameDe: "Glutamat", cls: "acidic",
    hook: "Glu*E*tamate — E follows D in the alphabet just as glutamate is one CH₂ longer than aspartate.",
    esel: "Glu*e*tamat — E folgt auf D im Alphabet, so wie Glutamat eine CH₂-Gruppe länger ist als Aspartat." },
  { code1: "Q", code3: "Gln", name: "Glutamine", nameDe: "Glutamin", cls: "polar",
    hook: "*Q*-tamine — glutamine gets the odd letter *Q* because E and G were already gone. Q for the *qu*iet amide.",
    esel: "*Q*-tamin — Glutamin bekommt das seltsame *Q*, weil E und G schon weg waren. Q wie das *qu*ietschende Amid." },
  { code1: "G", code3: "Gly", name: "Glycine", nameDe: "Glycin", cls: "nonpolar",
    hook: "*G*lycine — *G* for *G*lycine, the smallest of all: just a hydrogen for a side chain.",
    esel: "*G*lycin — *G* wie *G*lycin, die kleinste von allen: nur ein Wasserstoff als Seitenkette." },
  { code1: "H", code3: "His", name: "Histidine", nameDe: "Histidin", cls: "basic",
    hook: "*H*istidine — *H* for *H*istidine, and for the *H*⁺ it grabs and releases near pH 7, which is why enzymes love it.",
    esel: "*H*istidin — *H* wie *H*istidin, und wie das *H*⁺, das es nahe pH 7 aufnimmt und abgibt — deshalb lieben Enzyme es." },
  { code1: "I", code3: "Ile", name: "Isoleucine", nameDe: "Isoleucin", cls: "nonpolar",
    hook: "*I*soleucine — *I* for *I*so. Leucine keeps L, its *iso*mer takes the I.",
    esel: "*I*soleucin — *I* wie *I*so. Leucin behält das L, sein *Iso*mer nimmt das I." },
  { code1: "L", code3: "Leu", name: "Leucine", nameDe: "Leucin", cls: "nonpolar",
    hook: "*L*eucine — *L* for *L*eucine, the *l*arge oily one that buries itself in a protein's core.",
    esel: "*L*eucin — *L* wie *L*eucin, die große ölige, die sich im Kern des Proteins vergräbt." },
  { code1: "K", code3: "Lys", name: "Lysine", nameDe: "Lysin", cls: "basic",
    hook: "Lysine takes *K* because L belongs to leucine — and K sits right before L in the alphabet. Think *K*-lysine.",
    esel: "Lysin nimmt das *K*, weil L zu Leucin gehört — und K steht direkt vor L im Alphabet. Denk *K*-Lysin." },
  { code1: "M", code3: "Met", name: "Methionine", nameDe: "Methionin", cls: "nonpolar",
    hook: "*M*ethionine — *M* for *M*ethionine and for the *M*-start: AUG is the *M*aster switch every protein begins with.",
    esel: "*M*ethionin — *M* wie *M*ethionin und wie *M*-Start: AUG ist der *M*asterschalter, mit dem jedes Protein beginnt." },
  { code1: "F", code3: "Phe", name: "Phenylalanine", nameDe: "Phenylalanin", cls: "aromatic",
    hook: "*F*enylalanine — spell it with an F and the code is obvious. *F* for the *f*lat phenyl ring.",
    esel: "*F*enylalanin — schreib es mit F, dann ist der Code klar. *F* wie der *f*lache Phenylring." },
  { code1: "P", code3: "Pro", name: "Proline", nameDe: "Prolin", cls: "nonpolar",
    hook: "*P*roline — *P* for *P*roline, the *P*roblem child: its ring kinks the backbone and breaks helices.",
    esel: "*P*rolin — *P* wie *P*rolin, das *P*roblemkind: Sein Ring knickt das Rückgrat und bricht Helices." },
  { code1: "S", code3: "Ser", name: "Serine", nameDe: "Serin", cls: "polar",
    hook: "*S*erine — *S* for *S*erine, and for the -OH it *s*ports, the handle kinases hang phosphates on.",
    esel: "*S*erin — *S* wie *S*erin, und wie die -OH-*S*chlaufe, an die Kinasen Phosphate hängen." },
  { code1: "T", code3: "Thr", name: "Threonine", nameDe: "Threonin", cls: "polar",
    hook: "*T*hreonine — *T* for *T*hreonine, the one that starts with *T*hree.",
    esel: "*T*hreonin — *T* wie *T*hreonin, die mit *T*hree (drei) beginnt." },
  { code1: "W", code3: "Trp", name: "Tryptophan", nameDe: "Tryptophan", cls: "aromatic",
    hook: "Tryptophan gets *W* because its indole is a *double* ring — and *W* is a *d*ouble V. The bulkiest of the twenty.",
    esel: "Tryptophan bekommt das *W*, weil sein Indol ein *Doppel*ring ist — und *W* ist ein doppeltes V. Die sperrigste der zwanzig." },
  { code1: "Y", code3: "Tyr", name: "Tyrosine", nameDe: "Tyrosin", cls: "aromatic",
    hook: "T*Y*rosine — the *Y* is in the name, and a *Y* is a ring on a stick, which is exactly its shape.",
    esel: "T*y*rosin — das *Y* steckt im Namen, und ein *Y* ist ein Ring auf einem Stiel — genau seine Form." },
  { code1: "V", code3: "Val", name: "Valine", nameDe: "Valin", cls: "nonpolar",
    hook: "*V*aline — *V* for *V*aline, whose branched side chain is a little *V*.",
    esel: "*V*alin — *V* wie *V*alin, dessen verzweigte Seitenkette ein kleines *V* ist." },
  { code1: "*", code3: "Stop", name: "Stop", nameDe: "Stopp", cls: "stop",
    hook: "Three stop codons, and the classic hook names them: *U A A* — *U* *A*re *A*way. *U A G* — *U* *A*re *G*one. *U G A* — *U* *G*o *A*way.",
    esel: "Drei Stoppcodons, und der Klassiker benennt sie: *U A A* — *U* *A*re *A*way. *U A G* — *U* *A*re *G*one. *U G A* — *U* *G*o *A*way." },
];

export const AMINO_BY_CODE: Record<string, AminoAcid> = Object.fromEntries(
  AMINO_ACIDS.map((a) => [a.code1, a])
);

/** The standard genetic code: 64 mRNA codons → one-letter amino-acid code. */
export const CODON_TABLE: Record<string, string> = {
  UUU: "F", UUC: "F", UUA: "L", UUG: "L",
  CUU: "L", CUC: "L", CUA: "L", CUG: "L",
  AUU: "I", AUC: "I", AUA: "I", AUG: "M",
  GUU: "V", GUC: "V", GUA: "V", GUG: "V",

  UCU: "S", UCC: "S", UCA: "S", UCG: "S",
  CCU: "P", CCC: "P", CCA: "P", CCG: "P",
  ACU: "T", ACC: "T", ACA: "T", ACG: "T",
  GCU: "A", GCC: "A", GCA: "A", GCG: "A",

  UAU: "Y", UAC: "Y", UAA: "*", UAG: "*",
  CAU: "H", CAC: "H", CAA: "Q", CAG: "Q",
  AAU: "N", AAC: "N", AAA: "K", AAG: "K",
  GAU: "D", GAC: "D", GAA: "E", GAG: "E",

  UGU: "C", UGC: "C", UGA: "*", UGG: "W",
  CGU: "R", CGC: "R", CGA: "R", CGG: "R",
  AGU: "S", AGC: "S", AGA: "R", AGG: "R",
  GGU: "G", GGC: "G", GGA: "G", GGG: "G",
};

export const BASES = ["U", "C", "A", "G"] as const;
export type Base = (typeof BASES)[number];

/** AUG is both methionine and the universal start signal. */
export const START_CODON = "AUG";
export const STOP_CODONS = ["UAA", "UAG", "UGA"];

/** Translate an mRNA string into one-letter codes, stopping at the first stop. */
export function translate(mrna: string): { protein: string; codons: string[]; stopped: boolean } {
  const clean = mrna.toUpperCase().replace(/T/g, "U").replace(/[^UCAG]/g, "");
  const codons: string[] = [];
  let protein = "";
  let stopped = false;
  for (let i = 0; i + 3 <= clean.length; i += 3) {
    const codon = clean.slice(i, i + 3);
    codons.push(codon);
    const aa = CODON_TABLE[codon];
    if (aa === "*") {
      stopped = true;
      break;
    }
    protein += aa ?? "?";
  }
  return { protein, codons, stopped };
}

/** DNA template strand → mRNA (A→U, T→A, C→G, G→C). */
export function transcribe(dnaTemplate: string): string {
  const map: Record<string, string> = { A: "U", T: "A", C: "G", G: "C" };
  return dnaTemplate
    .toUpperCase()
    .replace(/[^ATCG]/g, "")
    .split("")
    .map((b) => map[b])
    .join("");
}

/** Complementary DNA base (for the double helix and replication labs). */
export function complement(base: string): string {
  return { A: "T", T: "A", C: "G", G: "C" }[base.toUpperCase()] ?? "?";
}

export const CLASS_VAR: Record<AminoClass, string> = {
  nonpolar: "--aa-nonpolar",
  polar: "--aa-polar",
  acidic: "--aa-acidic",
  basic: "--aa-basic",
  aromatic: "--aa-aromatic",
  stop: "--aa-stop",
};

export function classVar(cls: AminoClass): string {
  return `var(${CLASS_VAR[cls]})`;
}

/**
 * How many codons in THIS codon's four-member family (same first two bases)
 * code for the same outcome as this codon — the wobble, counted per codon.
 * 4 means the third base is entirely redundant; 1 means this codon is the
 * only route to its amino acid within the family (AUG, UGG).
 */
export function synonymsInFamily(codon: string): number {
  const aa = CODON_TABLE[codon];
  return BASES.filter((b) => CODON_TABLE[codon.slice(0, 2) + b] === aa).length;
}
