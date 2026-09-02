import type { Unit } from "./types";

/**
 * Presentation metadata for the course tiers. Units map to a tier via their
 * `track` field (no track = core). The home page renders one collapsible
 * block per tier, in this order. Display strings live in i18n.tsx; these are
 * the English fallback.
 */
export interface TierInfo {
  id: string;
  name: string;
  tagline: string;
}

export const TIERS: TierInfo[] = [
  {
    id: "core",
    name: "Core Course",
    tagline:
      "Mechanics from the ground up — motion, forces, energy and momentum, ending with g measured by hand in your backyard.",
  },
  {
    id: "advanced",
    name: "Advanced Course",
    tagline:
      "Waves, sound, light and heat — and the first cracks in the classical picture, where energy turns grainy and chance keeps perfect time.",
  },
];

export function tierIdOf(unit: Unit | undefined): string {
  return unit?.track ?? "core";
}
