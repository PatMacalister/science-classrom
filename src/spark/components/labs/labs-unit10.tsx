"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, PickSlider, Readout, Readouts, Slider } from "@/spark/components/controls";
import { clamp, drawWaves, fmtSI } from "@/spark/lib/sim/helpers";
import * as D from "@/spark/lib/sim/draw";

/* =====================================================================
 * Lab 10.1 — The linear regulator: precise, simple, and hot
 * ===================================================================== */

export function LinearRegLab() {
  const [vin, setVin] = useState(9);
  const [amps, setAmps] = useState(0.3);

  const VOUT_SET = 5;
  const DROPOUT = 2;
  const regulating = vin >= VOUT_SET + DROPOUT;
  const vout = regulating ? VOUT_SET : Math.max(0, vin - DROPOUT);
  const pOut = vout * amps;
  const pWaste = (vin - vout) * amps;
  const eff = vin > 0 ? vout / vin : 0;

  const draw = (ctx: CanvasRenderingContext2D) => {
    // block diagram
    D.label(ctx, `Vin = ${vin.toFixed(1)} V`, 90, 120, { color: D.COL.bad, size: 14, bold: true });
    D.wire(ctx, [[90, 140], [90, 180], [180, 180]]);
    D.capacitor(ctx, 90, 180, 90, 250, {});
    D.ground(ctx, 90, 252);
    if (pWaste > 0.02) D.glow(ctx, 300, 180, 60 + pWaste * 25, D.COL.bad, clamp(pWaste / 4, 0.08, 0.85));
    D.icBox(ctx, 180, 145, 240, 70, "7805 linear regulator");
    D.label(ctx, "a transistor throttling the flow — a smart variable resistor", 300, 235, {
      color: D.COL.muted,
      size: 11,
    });
    D.wire(ctx, [[420, 180], [520, 180]]);
    D.capacitor(ctx, 520, 180, 520, 250, {});
    D.ground(ctx, 520, 252);
    D.wire(ctx, [[520, 180], [600, 180]]);
    D.resistor(ctx, 600, 180, 600, 260, { label: "load" });
    D.ground(ctx, 600, 262);
    D.label(ctx, `Vout = ${vout.toFixed(2)} V`, 560, 120, {
      color: regulating ? D.COL.good : D.COL.bad,
      size: 14,
      bold: true,
    });
    if (!regulating) {
      D.label(ctx, "⚠ below dropout — regulation lost, output just follows Vin − 2 V", 350, 90, {
        color: D.COL.bad,
        size: 13,
        bold: true,
      });
    }

    // power split bar
    const bx = 680, by = 60, bw = 44, bh = 250;
    const pIn = Math.max(1e-9, pOut + pWaste);
    ctx.fillStyle = "#101825";
    ctx.strokeStyle = "#33445e";
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 6);
    ctx.fill();
    ctx.stroke();
    const hOut = (pOut / pIn) * (bh - 4);
    ctx.fillStyle = D.COL.good;
    ctx.fillRect(bx + 2, by + 2 + (bh - 4 - hOut), bw - 4, hOut);
    ctx.fillStyle = D.COL.bad;
    ctx.fillRect(bx + 2, by + 2, bw - 4, bh - 4 - hOut);
    D.label(ctx, "heat", bx + bw + 26, by + (bh - 4 - hOut) / 2 + 6, { color: D.COL.bad, size: 12 });
    D.label(ctx, "load", bx + bw + 26, by + bh - hOut / 2, { color: D.COL.good, size: 12 });
    D.label(ctx, "where Vin's power goes", bx + 22, by + bh + 22, { color: D.COL.muted, size: 11 });

    D.meter(ctx, 60, 320, 150, "power to the load", fmtSI(pOut, "W", 2), D.COL.good);
    D.meter(ctx, 225, 320, 150, "power burned as heat", fmtSI(pWaste, "W", 2), pWaste > 1 ? D.COL.bad : D.COL.amber);
    D.meter(ctx, 390, 320, 150, "efficiency = Vout/Vin", `${Math.round(eff * 100)}%`, eff > 0.7 ? D.COL.good : D.COL.bad);
    D.meter(
      ctx,
      555,
      320,
      170,
      "thermal verdict",
      pWaste > 2 ? "needs a real heatsink!" : pWaste > 0.7 ? "warm — small heatsink" : "cool ✓",
      pWaste > 2 ? D.COL.bad : pWaste > 0.7 ? D.COL.amber : D.COL.good
    );
  };

  return (
    <>
      <SimCanvas width={900} height={380} draw={draw} />
      <Controls>
        <Slider label="Input voltage Vin" min={5} max={15} step={0.1} value={vin} onChange={setVin} fmt={(v) => `${v.toFixed(1)} V`} />
        <Slider label="Load current" min={0.02} max={1} step={0.01} value={amps} onChange={setAmps} fmt={(v) => fmtSI(v, "A")} />
      </Controls>
      <Readouts>
        <Readout label="The linear deal" value="clean, quiet, cheap 5 V — but every volt dropped × every amp passed becomes heat" />
        <Readout
          label="Try this"
          value="12 V in, 1 A out: 7 W of heat to deliver 5 W. Then slide Vin to 6 V — cooler, but mind the dropout."
          tone="amber"
        />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 10.2 — The buck converter: PWM + your LC = efficient DC
 * ===================================================================== */

const BUCK_L_VALUES = [10e-6, 47e-6, 220e-6, 1e-3];
const BUCK_C_VALUES = [22e-6, 100e-6, 470e-6];
const BUCK_F_VALUES = [20e3, 50e3, 100e3, 200e3];

export function BuckLab() {
  const [vin, setVin] = useState(12);
  const [duty, setDuty] = useState(42);
  const [fIdx, setFIdx] = useState(1);
  const [lIdx, setLIdx] = useState(BUCK_L_VALUES.indexOf(220e-6));
  const [cIdx, setCIdx] = useState(BUCK_C_VALUES.indexOf(100e-6));
  const sim = useRef({ phase: 0 });

  const d = duty / 100;
  const fsw = BUCK_F_VALUES[fIdx];
  const L = BUCK_L_VALUES[lIdx];
  const C = BUCK_C_VALUES[cIdx];
  const vout = d * vin;
  const dI = (vin * d * (1 - d)) / (L * fsw);
  const dV = dI / (8 * C * fsw);
  const effBuck = clamp(0.95 - fsw * 8e-8 - 0.02 * (1 - d), 0.85, 0.96);
  const effLin = vout / vin;
  const tsw = 1 / fsw;

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    s.phase += dt * 0.9;

    drawWaves(
      ctx,
      20,
      20,
      560,
      280,
      [
        {
          label: `switch node — Vin chopped at ${fmtSI(fsw, "Hz")}`,
          color: "#44536a",
          width: 1.4,
          fn: (t) => (((t / tsw + s.phase) % 1 + 1) % 1 < d ? vin : 0),
        },
        {
          label: `after the LC filter: Vout ≈ D × Vin = ${vout.toFixed(2)} V`,
          color: "#f6b26b",
          fn: (t) => {
            const p = (((t / tsw + s.phase) % 1) + 1) % 1;
            const tri = p < d ? (p / d) * 2 - 1 : 1 - ((p - d) / (1 - d)) * 2;
            return vout + (tri * dV) / 2;
          },
        },
      ],
      {
        tSpan: 4 * tsw,
        vMin: -1,
        vMax: 16,
        timeLabel: `${fmtSI(tsw, "s", 2)} per switching cycle`,
        hlines: [{ value: vout, label: `average = ${vout.toFixed(2)} V` }],
        samples: 800,
      }
    );

    // efficiency face-off
    const bars = [
      { name: "buck", eff: effBuck, color: D.COL.good },
      { name: "linear (same job)", eff: effLin, color: effLin < 0.6 ? D.COL.bad : D.COL.amber },
    ];
    bars.forEach((b, i) => {
      const bx = 640 + i * 120;
      const bh = 200, by = 50;
      ctx.fillStyle = "#101825";
      ctx.strokeStyle = "#33445e";
      ctx.beginPath();
      ctx.roundRect(bx, by, 60, bh, 6);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = b.color;
      const h = b.eff * (bh - 4);
      ctx.fillRect(bx + 2, by + bh - 2 - h, 56, h);
      D.label(ctx, `${Math.round(b.eff * 100)}%`, bx + 30, by - 14, { color: b.color, size: 14, bold: true, mono: true });
      D.label(ctx, b.name, bx + 30, by + bh + 18, { color: D.COL.muted, size: 11 });
    });
    D.label(ctx, "efficiency, this conversion", 760, 300, { color: D.COL.muted, size: 11 });

    D.meter(ctx, 20, 320, 140, "Vout = D · Vin", `${vout.toFixed(2)} V`, D.COL.amber);
    D.meter(ctx, 175, 320, 150, "output ripple", fmtSI(dV, "V", 2), dV > 0.2 ? D.COL.bad : D.COL.good);
    D.meter(ctx, 340, 320, 170, "inductor current swing", fmtSI(dI, "A", 2), D.COL.muted);
    D.meter(
      ctx,
      525,
      320,
      210,
      "heat saved vs linear @ 0.5 A",
      fmtSI(Math.max(0, (vin - vout) * 0.5 - vout * 0.5 * (1 / effBuck - 1)), "W", 2),
      D.COL.good
    );
  };

  return (
    <>
      <SimCanvas width={900} height={380} draw={draw} />
      <Controls>
        <Slider label="Input Vin" min={6} max={15} step={0.1} value={vin} onChange={setVin} fmt={(v) => `${v.toFixed(1)} V`} />
        <Slider label="PWM duty cycle D" min={10} max={90} step={1} value={duty} onChange={setDuty} fmt={(v) => `${v}%`} />
        <PickSlider label="Switching frequency" values={BUCK_F_VALUES} index={fIdx} onChange={setFIdx} fmt={(v) => fmtSI(v, "Hz")} />
        <PickSlider label="Inductor L" values={BUCK_L_VALUES} index={lIdx} onChange={setLIdx} fmt={(v) => fmtSI(v, "H")} />
        <PickSlider label="Capacitor C" values={BUCK_C_VALUES} index={cIdx} onChange={setCIdx} fmt={(v) => fmtSI(v, "F")} />
      </Controls>
      <Readouts>
        <Readout label="It's all reruns" value="PWM (Unit 8) chopped, then smoothed by L (2.4) and C (2.3) — the average survives, the chop doesn't" />
        <Readout
          label="Try this"
          value="Halve L: ripple doubles. Double fsw: ripple shrinks but efficiency dips — the designer's eternal trade."
          tone="amber"
        />
      </Readouts>
    </>
  );
}
