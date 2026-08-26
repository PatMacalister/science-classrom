/**
 * Canvas/lab string translation.
 *
 * Labs draw text through the canvas primitives (draw.ts label/meter, the
 * Scope/drawWaves helpers) and the shared control components (controls.tsx).
 * Instead of editing ~26 lab files, those shared layers pass every string
 * through `tl()`, which looks it up in an exact-match EN→DE dictionary.
 * Static strings translate; dynamically templated strings fall through
 * unchanged (numbers and units are universal anyway).
 *
 * The active dictionary is a module-level global so the non-React canvas
 * code can reach it; LanguageProvider keeps it in sync with the language.
 * React components (controls.tsx) additionally subscribe to the language
 * context, so they re-render on switch; canvases repaint every frame.
 */

import { LABS_DE_A } from "./i18n/labsDeA";
import { LABS_DE_B } from "./i18n/labsDeB";

export const LAB_DE: Record<string, string> = { ...LABS_DE_A, ...LABS_DE_B };

let active: Record<string, string> | null = null;

export function setLabDictionary(dict: Record<string, string> | null) {
  active = dict;
}

/** Translate a lab string if the active dictionary knows it; else pass through. */
export function tl(s: string): string {
  if (!active) return s;
  return active[s] ?? s;
}
