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
      "The loop from the ground up — signals, motors, sensors and control, ending with a line follower you tune from lurching to lapping.",
  },
  {
    id: "advanced",
    name: "Advanced Course",
    tagline:
      "Arms that aim, robots that navigate, machines that learn — kinematics, mapping and the honest frontier of teaching by demonstration.",
  },
];

export function tierIdOf(unit: Unit | undefined): string {
  return unit?.track ?? "core";
}
