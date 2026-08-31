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
      "From one cell to the code that runs it — membranes, energy, DNA, and the proteins it builds.",
  },
  {
    id: "advanced",
    name: "Advanced Course",
    tagline:
      "Heredity, evolution and ecology — how the code gets passed on, edited by selection, and spread through a living world.",
  },
];

export function tierIdOf(unit: Unit | undefined): string {
  return unit?.track ?? "core";
}
