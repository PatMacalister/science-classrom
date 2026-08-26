import type { Unit } from "./types";

/**
 * Presentation metadata for the course tiers. Units map to a tier via their
 * `track` field (no track = core). The home page renders one collapsible
 * block per tier, in this order.
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
    tagline: "From the physics of charge to a blinking circuit you built — the foundation everything else stands on.",
  },
  {
    id: "advanced",
    name: "Advanced Course",
    tagline: "AC and signals, op-amps and feedback, digital logic — capped by a PWM dimmer with a real knob.",
  },
  {
    id: "expert",
    name: "Expert Course",
    tagline: "Resonance and radio, power conversion, microcontrollers — and your first firmware ships.",
  },
  {
    id: "master",
    name: "Master Course",
    tagline: "Sampling, control theory, the art of real circuits — ending with an oscilloscope of your own making.",
  },
  {
    id: "specialization",
    name: "Specializations",
    tagline: "The ladder ends after the master course. From here, three parallel paths — take any, in any order: build a CPU, tune the radio spectrum, or put your circuits on wheels.",
  },
];

export function tierIdOf(unit: Unit | undefined): string {
  return unit?.track ?? "core";
}
