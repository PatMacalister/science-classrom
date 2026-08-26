import type { Unit } from "./types";

/**
 * Presentation metadata for the course tiers. Units map to a tier via their
 * `track` field (no track = core). The home page renders one collapsible
 * block per tier, in this order. (Display names/taglines live in i18n.tsx;
 * the strings here are the English fallback.)
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
    tagline: "From a lone proton to titration curves — atoms, bonds, reactions, moles, acids and bases.",
  },
  {
    id: "advanced",
    name: "Advanced Course",
    tagline: "Energy, rates and equilibrium, then electrochemistry — closing the loop from chemistry to electricity.",
  },
];

export function tierIdOf(unit: Unit | undefined): string {
  return unit?.track ?? "core";
}
