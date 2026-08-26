"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, PickSlider, Readout, Readouts, Segmented, Slider } from "@/spark/components/controls";
import { clamp, drawWaves, e12Range, fmtSI, Scope } from "@/spark/lib/sim/helpers";
import * as D from "@/spark/lib/sim/draw";

/** Op-amp triangle symbol, inputs on the left (+ lower, − upper), output right. */
function opAmpSymbol(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.strokeStyle = D.COL.text;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y - 34);
  ctx.lineTo(x, y + 34);
  ctx.lineTo(x + 62, y);
  ctx.closePath();
  ctx.stroke();
  D.label(ctx, "−", x + 11, y - 16, { color: D.COL.accent, size: 15, bold: true });
  D.label(ctx, "+", x + 11, y + 16, { color: D.COL.bad, size: 15, bold: true });
}

/* =====================================================================
 * Lab 6.1 — The comparator (and why hysteresis exists)
 * ===================================================================== */

export function ComparatorLab() {
  const [vref, setVref] = useState(4.5);
  const [noisy, setNoisy] = useState<"clean" | "noisy">("clean");
  const [hyst, setHyst] = useState<"none" | "on">("none");
  const sim = useRef({
    t: 0,
    out: 0,
    scope: new Scope(
      [
        { label: "input signal", color: "#4cc9f0", min: 0, max: 10 },
        { label: "comparator output", color: "#f6b26b", min: -1, max: 21 },
      ],
      4
    ),
  });

  const H = 0.8; // hysteresis band

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    s.t += dt;
    const noise = noisy === "noisy" ? (Math.random() - 0.5) * 1.7 : 0;
    const vin = 4.5 + 3.4 * Math.sin(2 * Math.PI * 0.45 * s.t) + noise;

    const hi = hyst === "on" ? vref + H / 2 : vref;
    const lo = hyst === "on" ? vref - H / 2 : vref;
    if (s.out > 4.5) {
      if (vin < lo) s.out = 0;
    } else {
      if (vin > hi) s.out = 9;
    }
    s.scope.push(s.t, [vin, s.out]);

    const hlines = [{ trace: 0, value: vref, label: `Vref = ${vref.toFixed(1)} V` }];
    if (hyst === "on") {
      hlines.push(
        { trace: 0, value: vref + H / 2, label: "switch-up level" },
        { trace: 0, value: vref - H / 2, label: "switch-down level" }
      );
    }
    s.scope.draw(ctx, 250, 20, 630, 300, { timeLabel: "0.67 s/div", hlines });

    // schematic
    opAmpSymbol(ctx, 90, 150);
    D.wire(ctx, [[30, 166], [90, 166]]);
    D.label(ctx, "signal", 42, 148, { color: D.COL.accent, size: 11 });
    D.wire(ctx, [[30, 134], [90, 134]]);
    D.label(ctx, "Vref", 44, 116, { color: D.COL.amber, size: 11 });
    D.wire(ctx, [[152, 150], [200, 150]]);
    D.led(ctx, 200, 150, 200, 220, { on: s.out > 4.5 ? 1 : 0, color: "#f26d6d" });
    D.wire(ctx, [[200, 220], [200, 240]]);
    D.ground(ctx, 200, 242);

    D.meter(ctx, 30, 280, 180, "output state", s.out > 4.5 ? "HIGH (9 V)" : "LOW (0 V)", s.out > 4.5 ? D.COL.good : D.COL.muted);
    D.meter(ctx, 30, 335, 180, "rule", hyst === "on" ? "Schmitt trigger" : "plain comparator", D.COL.accent);
    if (noisy === "noisy" && hyst === "none") {
      D.label(ctx, "⚠ watch the output chatter as the noisy signal grazes Vref", 565, 340, {
        color: D.COL.bad,
        size: 12,
        bold: true,
      });
    }
  };

  return (
    <>
      <SimCanvas width={900} height={390} draw={draw} />
      <Controls>
        <Slider label="Threshold Vref" min={1} max={8} step={0.1} value={vref} onChange={setVref} fmt={(v) => `${v.toFixed(1)} V`} />
        <Segmented
          label="Input signal"
          value={noisy}
          onChange={setNoisy}
          options={[
            { value: "clean", label: "Clean sine" },
            { value: "noisy", label: "Noisy sine (realistic)" },
          ]}
        />
        <Segmented
          label="Hysteresis"
          value={hyst}
          onChange={setHyst}
          options={[
            { value: "none", label: "None" },
            { value: "on", label: "±0.4 V band (Schmitt)" },
          ]}
        />
      </Controls>
      <Readouts>
        <Readout label="The one rule" value="output slams HIGH if (+) is above (−), LOW otherwise — nothing in between" />
        <Readout
          label="Try this"
          value="Noisy signal + no hysteresis = chatter. Add the band and count the clean edges."
          tone="amber"
        />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 6.2 — Negative feedback amplifiers
 * ===================================================================== */

const FB_R_VALUES = e12Range(1000, 100000);

type AmpMode = "noninv" | "inv" | "buffer";

export function FeedbackAmpLab() {
  const [mode, setMode] = useState<AmpMode>("noninv");
  const [rfIdx, setRfIdx] = useState(FB_R_VALUES.indexOf(47000));
  const [rgIdx, setRgIdx] = useState(FB_R_VALUES.indexOf(10000));
  const [amp, setAmp] = useState(1);
  const sim = useRef({ phase: 0 });

  const RAIL = 8.5;
  const rf = FB_R_VALUES[rfIdx];
  const rg = FB_R_VALUES[rgIdx];
  const gain = mode === "noninv" ? 1 + rf / rg : mode === "inv" ? -rf / rg : 1;
  const peakOut = Math.abs(gain) * amp;
  const clipping = peakOut > RAIL;

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    s.phase += dt * 2 * Math.PI * 1.2;

    drawWaves(
      ctx,
      320,
      20,
      560,
      290,
      [
        { label: `input (±${amp.toFixed(1)} V)`, color: "#5a6b7d", fn: (t) => amp * Math.sin(2 * Math.PI * 1.5 * t - s.phase), width: 1.5 },
        {
          label: clipping ? "output — CLIPPING at the rails!" : `output (gain ${gain.toFixed(1)}×)`,
          color: clipping ? "#f26d6d" : "#f6b26b",
          fn: (t) => clamp(gain * amp * Math.sin(2 * Math.PI * 1.5 * t - s.phase), -RAIL, RAIL),
        },
      ],
      {
        tSpan: 2,
        vMin: -10,
        vMax: 10,
        timeLabel: "three cycles",
        hlines: [
          { value: RAIL, label: "+ rail", color: "rgba(242,109,109,0.5)" },
          { value: -RAIL, label: "− rail", color: "rgba(242,109,109,0.5)" },
        ],
      }
    );

    // schematic (left) per topology
    const ox = 90, oy = 150;
    opAmpSymbol(ctx, ox, oy);
    D.wire(ctx, [[ox + 62, oy], [ox + 110, oy]]);
    D.label(ctx, "out", ox + 122, oy, { color: D.COL.amber, size: 12 });
    if (mode === "noninv") {
      D.wire(ctx, [[20, oy + 16], [ox, oy + 16]]);
      D.label(ctx, "in →  +", 34, oy + 34, { color: D.COL.accent, size: 11 });
      // feedback: out → Rf → (−); (−) → Rg → gnd
      D.wire(ctx, [[ox + 92, oy], [ox + 92, oy - 70]]);
      D.resistor(ctx, ox + 92, oy - 70, ox - 40, oy - 70, { label: `Rf ${fmtSI(rf, "Ω")}` });
      D.wire(ctx, [[ox - 40, oy - 70], [ox - 40, oy - 16], [ox, oy - 16]]);
      D.resistor(ctx, ox - 40, oy - 16, ox - 40, oy + 70, { label: `Rg ${fmtSI(rg, "Ω")}` });
      D.ground(ctx, ox - 40, oy + 72);
    } else if (mode === "inv") {
      D.resistor(ctx, 10, oy - 16, ox, oy - 16, { label: `Rin ${fmtSI(rg, "Ω")}` });
      D.label(ctx, "in", 14, oy - 36, { color: D.COL.accent, size: 11 });
      D.wire(ctx, [[ox - 30, oy + 16], [ox, oy + 16]]);
      D.wire(ctx, [[ox - 30, oy + 16], [ox - 30, oy + 50]]);
      D.ground(ctx, ox - 30, oy + 52);
      D.wire(ctx, [[ox + 92, oy], [ox + 92, oy - 70]]);
      D.resistor(ctx, ox + 92, oy - 70, ox - 20, oy - 70, { label: `Rf ${fmtSI(rf, "Ω")}` });
      D.wire(ctx, [[ox - 20, oy - 70], [ox - 20, oy - 16]]);
      D.node(ctx, ox - 20, oy - 16);
    } else {
      D.wire(ctx, [[20, oy + 16], [ox, oy + 16]]);
      D.label(ctx, "in →  +", 34, oy + 34, { color: D.COL.accent, size: 11 });
      D.wire(ctx, [[ox + 92, oy], [ox + 92, oy - 60], [ox - 20, oy - 60], [ox - 20, oy - 16], [ox, oy - 16]]);
      D.label(ctx, "output wired straight back to −", ox + 40, oy - 78, { color: D.COL.muted, size: 11 });
    }

    D.meter(
      ctx,
      20,
      330,
      200,
      "gain",
      mode === "noninv" ? `1 + Rf/Rg = ${gain.toFixed(1)}×` : mode === "inv" ? `−Rf/Rin = ${gain.toFixed(1)}×` : "exactly 1× (buffer)",
      D.COL.amber
    );
    D.meter(ctx, 235, 330, 170, "output peak", `${Math.min(peakOut, RAIL).toFixed(1)} V`, clipping ? D.COL.bad : D.COL.good);
    D.meter(
      ctx,
      420,
      330,
      210,
      "headroom check",
      clipping ? "wants more than the rails have!" : "inside the rails ✓",
      clipping ? D.COL.bad : D.COL.good
    );
  };

  return (
    <>
      <SimCanvas width={900} height={390} draw={draw} />
      <Controls>
        <Segmented<AmpMode>
          label="Topology"
          value={mode}
          onChange={setMode}
          options={[
            { value: "noninv", label: "Non-inverting" },
            { value: "inv", label: "Inverting" },
            { value: "buffer", label: "Buffer (follower)" },
          ]}
        />
        {mode !== "buffer" ? (
          <>
            <PickSlider label="Feedback Rf" values={FB_R_VALUES} index={rfIdx} onChange={setRfIdx} fmt={(v) => fmtSI(v, "Ω")} />
            <PickSlider label={mode === "inv" ? "Input Rin" : "Ground leg Rg"} values={FB_R_VALUES} index={rgIdx} onChange={setRgIdx} fmt={(v) => fmtSI(v, "Ω")} />
          </>
        ) : null}
        <Slider label="Input amplitude" min={0.1} max={4} step={0.1} value={amp} onChange={setAmp} fmt={(v) => `±${v.toFixed(1)} V`} />
      </Controls>
      <Readouts>
        <Readout label="Two resistors set everything" value="the op-amp supplies brute gain; the feedback ratio decides how much survives" />
        <Readout
          label="Try this"
          value="Push the gain or input until the output flat-tops at the rails — that crunch is what a distorted guitar amp is doing"
          tone="amber"
        />
      </Readouts>
    </>
  );
}
