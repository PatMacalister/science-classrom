"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Slider } from "@/spark/components/controls";
import { clamp, drawWaves, fmtSI } from "@/spark/lib/sim/helpers";
import * as D from "@/spark/lib/sim/draw";

/**
 * The advanced-capstone digital twin: a 555 astable with steering diodes so a
 * potentiometer sets duty cycle while frequency stays (nearly) constant.
 * Pot = 100 kΩ, C = 10 nF → f ≈ 1.4 kHz, far above flicker fusion.
 */
export function PwmDimmerLab() {
  const [pos, setPos] = useState(50); // pot wiper %
  const sim = useRef({ phase: 0 });

  const POT = 100e3;
  const C = 10e-9;
  const ra = (clamp(pos, 5, 95) / 100) * POT;
  const rb = POT - ra;
  const tHigh = 0.693 * ra * C;
  const tLow = 0.693 * rb * C;
  const period = tHigh + tLow;
  const freq = 1 / period;
  const duty = tHigh / period;

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    s.phase += dt * 1.2; // slow visual scroll (real signal is ~1.4 kHz)

    drawWaves(
      ctx,
      20,
      20,
      600,
      270,
      [
        {
          label: `OUT (pin 3) — ${(duty * 100).toFixed(0)}% duty at ${fmtSI(freq, "Hz", 2)}`,
          color: "#f6b26b",
          fn: (t) => {
            const ph = (t / period + s.phase) % 1;
            return ph < duty ? 9 : 0;
          },
        },
      ],
      {
        tSpan: period * 3,
        vMin: -1,
        vMax: 10.5,
        timeLabel: `${fmtSI(period / 2, "s", 2)}/div — shown in slow motion`,
        samples: 900,
      }
    );

    // LED and "what the eye sees"
    D.label(ctx, "the LED itself", 750, 40, { color: D.COL.muted, size: 12 });
    const strobe = (performance.now() / 1000 / 0.4) % 1 < duty; // slowed strobe for effect
    D.glow(ctx, 750, 95, 46, "#f26d6d", strobe ? 0.85 : 0.05);
    D.dot(ctx, 750, 95, 19, strobe ? "#f26d6d" : "#3a2530");
    D.label(ctx, "(slowed ~500×: really ~1.4 kHz)", 750, 145, { color: "rgba(148,163,179,0.55)", size: 10 });

    D.label(ctx, "what your eye sees", 750, 185, { color: D.COL.muted, size: 12 });
    D.glow(ctx, 750, 240, 46, "#f26d6d", duty * 0.9);
    ctx.fillStyle = `rgba(242,109,109,${0.15 + duty * 0.85})`;
    ctx.beginPath();
    ctx.arc(750, 240, 19, 0, Math.PI * 2);
    ctx.fill();
    D.label(ctx, `${(duty * 100).toFixed(0)}% brightness`, 750, 282, { color: D.COL.amber, size: 12, bold: true });

    D.meter(ctx, 20, 310, 150, "duty cycle", `${(duty * 100).toFixed(0)}% high`, D.COL.amber);
    D.meter(ctx, 185, 310, 160, "frequency (≈ constant)", fmtSI(freq, "Hz", 2));
    D.meter(ctx, 360, 310, 160, "t high = 0.693·Ra·C", fmtSI(tHigh, "s", 2), D.COL.muted);
    D.meter(ctx, 535, 310, 160, "t low = 0.693·Rb·C", fmtSI(tLow, "s", 2), D.COL.muted);
    D.meter(ctx, 710, 310, 170, "average LED power", `${(duty * 100).toFixed(0)}% of max`, D.COL.good);
  };

  return (
    <>
      <SimCanvas width={900} height={370} draw={draw} />
      <Controls>
        <Slider
          label="Potentiometer knob"
          min={5}
          max={95}
          step={1}
          value={pos}
          onChange={setPos}
          fmt={(v) => `${v}% ↑`}
        />
      </Controls>
      <Readouts>
        <Readout
          label="Why frequency barely moves"
          value="Ra + Rb is always the whole pot: turning the knob trades high-time for low-time"
          tone="amber"
        />
        <Readout
          label="Predict before you build"
          value="knob at 25% → LED near quarter brightness; sweep it and the change is smooth (a bipolar NE555 skews the numbers slightly — see the note above)"
        />
      </Readouts>
    </>
  );
}
