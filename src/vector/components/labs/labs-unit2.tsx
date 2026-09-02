"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Slider } from "@/vector/components/controls";
import { clamp } from "@/vector/lib/sim/helpers";
import * as D from "@/vector/lib/sim/draw";

/* =====================================================================
 * Lab 2.1 — The energy ramp: a skater trading PE for KE and back, with
 * live bars keeping the books. Friction diverts joules into heat.
 * ===================================================================== */

export function RampEnergyLab() {
  const [height, setHeight] = useState(5);
  const [frictionPct, setFrictionPct] = useState(0);

  const g = 9.81;
  const m = 60;
  const total = m * g * height;
  const vBottomIdeal = Math.sqrt(2 * g * height);

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const rampX = 60;
    const rampY = 320;
    const rw = 520;
    const rh = height * 22;

    // U-ramp
    ctx.strokeStyle = "#8b97a7";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(rampX, rampY - rh);
    ctx.quadraticCurveTo(rampX + rw * 0.25, rampY + 8, rampX + rw / 2, rampY);
    ctx.quadraticCurveTo(rampX + rw * 0.75, rampY + 8, rampX + rw, rampY - rh);
    ctx.stroke();

    // skater position: oscillates, losing amplitude to friction
    const damp = Math.exp(-frictionPct * 0.004 * (t % 40));
    const phase = Math.cos(t * 1.2);
    const u = 0.5 + 0.5 * phase * damp; // 0..1 across the ramp
    const sx = rampX + u * rw;
    // height along the U (parabolic approximation)
    const hNow = height * Math.pow(2 * (u - 0.5), 2) * damp * damp;
    const sy = rampY - hNow * 22 - 14;
    D.dot(ctx, sx, sy, 11, D.COL.accent);
    D.label(ctx, "🛹", sx, sy - 20, { size: 13 });

    // energy bars
    const pe = clamp(hNow / height, 0, 1) * damp * damp;
    const heat = 1 - damp * damp;
    const ke = clamp(1 - pe - heat, 0, 1);
    const bx = 660;
    D.panel(ctx, bx, 60, 220, 250);
    D.label(ctx, "the books", bx + 110, 84, { color: D.COL.muted, size: 11 });
    const bar = (label: string, frac: number, color: string, row: number) => {
      D.label(ctx, label, bx + 24, 116 + row * 56, { align: "left", size: 11, color });
      D.barGauge(ctx, bx + 24, 126 + row * 56, 172, 16, clamp(frac, 0, 1), color, "");
    };
    bar("potential (height)", pe, D.COL.amber, 0);
    bar("kinetic (speed)", ke, D.COL.accent, 1);
    bar("heat (friction)", heat, D.COL.bad, 2);
    D.label(ctx, "total: never changes", bx + 110, 296, { size: 11, bold: true, color: D.COL.good });

    D.meter(ctx, 20, 8, 190, "total energy", `${(total / 1000).toFixed(1)} kJ`, D.COL.good);
    D.meter(ctx, 220, 8, 230, "ideal bottom speed", `${vBottomIdeal.toFixed(1)} m/s`, D.COL.accent);
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} label="A skater on a ramp with potential, kinetic and heat energy bars" />
      <Controls>
        <Slider label="Drop height" min={1} max={10} step={0.5} value={height} onChange={setHeight} fmt={(v) => `${v.toFixed(1)} m`} />
        <Slider label="Friction" min={0} max={100} step={5} value={frictionPct} onChange={setFrictionPct} fmt={(v) => (v === 0 ? "none" : `${v}%`)} />
      </Controls>
      <Readouts>
        <Readout label="Total energy" value={`${(total / 1000).toFixed(1)} kJ`} tone="good" />
        <Readout label="Bottom speed (no friction)" value={`√(2gh) = ${vBottomIdeal.toFixed(1)} m/s`} tone="amber" />
        <Readout label="With friction" value={frictionPct > 0 ? "same books, heat account filling" : "—"} />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 2.2 — The collision bench: momentum always survives; kinetic
 * energy only survives when the bounciness dial says so.
 * ===================================================================== */

export function CollisionLab() {
  const [m1, setM1] = useState(2);
  const [m2, setM2] = useState(2);
  const [v1, setV1] = useState(4);
  const [elasticity, setElasticity] = useState(100);

  const v2 = 0; // target starts at rest
  const e = elasticity / 100;
  // 1-D collision with restitution e
  const u1 = (m1 * v1 + m2 * v2 + m2 * e * (v2 - v1)) / (m1 + m2);
  const u2 = (m1 * v1 + m2 * v2 + m1 * e * (v1 - v2)) / (m1 + m2);
  const pBefore = m1 * v1 + m2 * v2;
  const pAfter = m1 * u1 + m2 * u2;
  const keBefore = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2;
  const keAfter = 0.5 * m1 * u1 * u1 + 0.5 * m2 * u2 * u2;
  const keLost = keBefore - keAfter;

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const trackY = 210;
    D.wire(ctx, [[30, trackY], [870, trackY]], "#33445e", 3);

    // animate: approach for 2 s, then post-collision motion, loop at 5 s
    const cycle = (t * 1.1) % 5;
    const impactX = 450;
    let x1: number;
    let x2: number;
    if (cycle < 2) {
      x1 = 140 + (cycle / 2) * (impactX - 40 - 140);
      x2 = impactX + 40;
    } else {
      const dt2 = cycle - 2;
      x1 = impactX - 40 + u1 * dt2 * 26;
      x2 = impactX + 40 + u2 * dt2 * 26;
    }
    const w1 = 30 + m1 * 8;
    const w2 = 30 + m2 * 8;
    ctx.fillStyle = D.COL.accent;
    ctx.fillRect(x1 - w1 / 2, trackY - 40, w1, 34);
    D.label(ctx, `${m1} kg`, x1, trackY - 23, { size: 11, bold: true, color: "#06231f" });
    ctx.fillStyle = D.COL.amber;
    ctx.fillRect(x2 - w2 / 2, trackY - 40, w2, 34);
    D.label(ctx, `${m2} kg`, x2, trackY - 23, { size: 11, bold: true, color: "#2b1d04" });

    // before/after table
    D.panel(ctx, 90, 260, 720, 120);
    const rows: Array<[string, string, string, string]> = [
      ["", "momentum (kg·m/s)", "kinetic energy (J)", ""],
      ["before", pBefore.toFixed(1), keBefore.toFixed(1), ""],
      ["after", pAfter.toFixed(1), keAfter.toFixed(1), keLost > 0.05 ? `${keLost.toFixed(1)} J → heat & dents` : "all survived"],
    ];
    rows.forEach(([a, b, c, d], i) => {
      const y = 286 + i * 30;
      D.label(ctx, a, 150, y, { size: 12, color: D.COL.muted });
      D.label(ctx, b, 370, y, { size: 12, mono: i > 0, color: i === 0 ? D.COL.muted : D.COL.good, bold: i > 0 });
      D.label(ctx, c, 570, y, { size: 12, mono: i > 0, color: i === 0 ? D.COL.muted : keLost > 0.05 && i === 2 ? D.COL.bad : D.COL.accent, bold: i > 0 });
      if (d) D.label(ctx, d, 745, y, { size: 10, color: keLost > 0.05 ? D.COL.bad : D.COL.good });
    });

    D.meter(ctx, 20, 8, 210, "after: cart 1", `${u1.toFixed(2)} m/s`, D.COL.accent);
    D.meter(ctx, 240, 8, 210, "after: cart 2", `${u2.toFixed(2)} m/s`, D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} label="Two carts colliding with a momentum and energy ledger" />
      <Controls>
        <Slider label="Mass of cart 1" min={1} max={8} step={1} value={m1} onChange={setM1} fmt={(v) => `${v} kg`} />
        <Slider label="Mass of cart 2" min={1} max={8} step={1} value={m2} onChange={setM2} fmt={(v) => `${v} kg`} />
        <Slider label="Speed of cart 1" min={1} max={8} step={0.5} value={v1} onChange={setV1} fmt={(v) => `${v.toFixed(1)} m/s`} />
        <Slider label="Bounciness" min={0} max={100} step={10} value={elasticity} onChange={setElasticity} fmt={(v) => (v === 100 ? "elastic" : v === 0 ? "sticky" : `${v}%`)} />
      </Controls>
      <Readouts>
        <Readout label="Momentum" value="conserved, always" tone="good" />
        <Readout label="Kinetic energy kept" value={`${((keAfter / keBefore) * 100).toFixed(0)}%`} tone={keLost > 0.05 ? "warn" : "good"} />
        <Readout
          label="Watch for"
          value={m1 === m2 && elasticity === 100 ? "equal masses swap velocities!" : elasticity === 0 ? "they stick and share" : "—"}
          tone="amber"
        />
      </Readouts>
    </>
  );
}
