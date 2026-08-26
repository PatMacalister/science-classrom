"use client";

import { Timer555Lab } from "./labs-unit3";

/**
 * The capstone "digital twin": the same 555 astable simulation, but restricted
 * to exactly the parts in the build kit — predict the blink rate before you
 * plug anything in.
 */
export function CapstoneLab() {
  return (
    <Timer555Lab
      r1Options={[1000]}
      r2Options={[4700, 47000, 470000]}
      cOptions={[10e-6, 100e-6]}
      r1Init={1000}
      r2Init={47000}
      cInit={10e-6}
    />
  );
}
