/** Shared math / formatting helpers for the interactive labs. */

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const SI_PREFIXES: Array<[number, string]> = [
  [1e9, "G"],
  [1e6, "M"],
  [1e3, "k"],
  [1, ""],
  [1e-3, "m"],
  [1e-6, "µ"],
  [1e-9, "n"],
  [1e-12, "p"],
];

/** Format a value with an engineering SI prefix: 2500 -> "2.5 kJ". */
export function fmtSI(value: number, unit = "", sig = 3): string {
  if (!isFinite(value)) return "∞ " + unit;
  if (value === 0) return "0 " + unit;
  const abs = Math.abs(value);
  let factor = 1e-12;
  let prefix = "p";
  for (const [f, p] of SI_PREFIXES) {
    if (abs >= f) {
      factor = f;
      prefix = p;
      break;
    }
  }
  let s = (value / factor).toPrecision(sig);
  if (s.includes("e")) s = Number(s).toString();
  if (s.includes(".")) s = s.replace(/\.?0+$/, "");
  return `${s} ${prefix}${unit}`;
}

/** Fixed decimals, e.g. fmtFixed(3.14159, 2) -> "3.14". */
export const fmtFixed = (v: number, digits = 2) => v.toFixed(digits);

const SUPERSCRIPTS: Record<string, string> = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
  "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻",
};

/** Scientific notation with unicode superscripts: 6.02e23 -> "6.0 × 10²³". */
export function fmtSci(value: number, sig = 2): string {
  if (value === 0) return "0";
  const exp = Math.floor(Math.log10(Math.abs(value)));
  const mant = value / Math.pow(10, exp);
  const expStr = String(exp)
    .split("")
    .map((c) => SUPERSCRIPTS[c] ?? c)
    .join("");
  return `${mant.toPrecision(sig)} × 10${expStr}`;
}

/** Mulberry32 — deterministic PRNG so particle sims are stable across frames. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
