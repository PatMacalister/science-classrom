"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider } from "@/spark/components/controls";
import { clamp, drawWaves, fmtSI, Scope } from "@/spark/lib/sim/helpers";
import * as D from "@/spark/lib/sim/draw";

/* =====================================================================
 * Lab 13.1 — Sampling & aliasing: the wagon-wheel effect
 * ===================================================================== */

export function SamplingLab() {
  const [sigF, setSigF] = useState(200);
  const [fs, setFs] = useState(1000);
  const sim = useRef({ phase: 0 });

  // signed fold: the frequency (with sign) that the samples actually trace
  const foldedSigned = sigF - Math.round(sigF / fs) * fs;
  const folded = Math.abs(foldedSigned);
  const nyquistOk = fs >= 2 * sigF;

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    s.phase += dt * 0.25;
    const tSpan = 0.02; // 20 ms window
    const ph = s.phase % 1;
    const phi0 = 2 * Math.PI * sigF * ph * 0.01;

    const sig = (t: number) => 3.5 * Math.sin(2 * Math.PI * sigF * t + phi0);
    // the sine the samples trace: same phase, folded (signed) frequency —
    // passes exactly through every sample point for any f, fs and animation phase
    const alias = (t: number) => 3.5 * Math.sin(2 * Math.PI * foldedSigned * t + phi0);

    drawWaves(
      ctx,
      20,
      20,
      860,
      280,
      [
        { label: `the real signal — ${fmtSI(sigF, "Hz")}`, color: "#44536a", width: 1.5, fn: sig },
        {
          label: nyquistOk
            ? `what the samples reconstruct — ${fmtSI(folded, "Hz")} ✓`
            : `⚠ ALIAS — the samples swear it's ${fmtSI(folded, "Hz")}`,
          color: nyquistOk ? "#47c26b" : "#f26d6d",
          dash: nyquistOk ? undefined : [6, 4],
          fn: alias,
        },
      ],
      { tSpan, vMin: -5, vMax: 5, timeLabel: "3.3 ms/div", samples: 900 }
    );

    // sample points on top
    const n = Math.floor(tSpan * fs);
    for (let i = 0; i <= n; i++) {
      const t = i / fs;
      const x = 20 + (t / tSpan) * 860;
      const y = 160 - (sig(t) / 5) * 140;
      if (x < 880) {
        D.dot(ctx, x, y, 4.5, D.COL.amber);
        D.wire(ctx, [[x, 160], [x, y]], "rgba(246,178,107,0.25)", 1);
      }
    }

    D.meter(ctx, 30, 320, 170, "sample rate fs", fmtSI(fs, "Hz"), D.COL.amber);
    D.meter(ctx, 215, 320, 190, "Nyquist limit fs/2", fmtSI(fs / 2, "Hz"), D.COL.muted);
    D.meter(
      ctx,
      420,
      320,
      210,
      "apparent frequency",
      fmtSI(folded, "Hz", 3),
      nyquistOk ? D.COL.good : D.COL.bad
    );
    D.meter(
      ctx,
      645,
      320,
      225,
      "verdict",
      nyquistOk ? "faithful — fs ≥ 2f ✓" : "aliased — fs < 2f!",
      nyquistOk ? D.COL.good : D.COL.bad
    );
  };

  return (
    <>
      <SimCanvas width={900} height={380} draw={draw} />
      <Controls>
        <Slider label="Signal frequency f" min={50} max={1500} step={10} value={sigF} onChange={setSigF} fmt={(v) => fmtSI(v, "Hz")} />
        <Slider label="Sample rate fs" min={100} max={3000} step={20} value={fs} onChange={setFs} fmt={(v) => fmtSI(v, "Hz")} />
      </Controls>
      <Readouts>
        <Readout label="The law" value="capture at least two samples per cycle (fs ≥ 2f) or the signal lies to you" tone="amber" />
        <Readout label="Try this" value="Set f = 900 Hz, fs = 1000 Hz: the samples trace a stately 100 Hz wave that does not exist" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 13.2 — Fourier synthesis: building waves from sines
 * ===================================================================== */

type WaveShape = "square" | "triangle" | "sawtooth";

export function FourierLab() {
  const [shape, setShape] = useState<WaveShape>("square");
  const [nHarm, setNHarm] = useState(3);
  const sim = useRef({ phase: 0 });

  const F0 = 100;
  // harmonic amplitude rules for each classic shape
  const harmonics = (k: number): number => {
    if (shape === "square") return k % 2 === 1 ? 4 / (Math.PI * k) : 0;
    if (shape === "triangle") return k % 2 === 1 ? (8 / (Math.PI * Math.PI * k * k)) * (k % 4 === 1 ? 1 : -1) : 0;
    return (2 / (Math.PI * k)) * (k % 2 === 1 ? 1 : -1); // sawtooth
  };
  const ideal = (t: number): number => {
    const x = ((t * F0) % 1 + 1) % 1;
    if (shape === "square") return x < 0.5 ? 1 : -1;
    if (shape === "triangle") return x < 0.25 ? 4 * x : x < 0.75 ? 2 - 4 * x : 4 * x - 4;
    return x < 0.5 ? 2 * x : 2 * x - 2;
  };

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    s.phase += dt * 0.15;
    const off = (s.phase % 1) / F0;

    drawWaves(
      ctx,
      20,
      20,
      560,
      280,
      [
        { label: "the target shape", color: "#44536a", width: 1.4, dash: [5, 4], fn: (t) => 3.2 * ideal(t + off) },
        {
          label: `sum of ${nHarm} harmonic${nHarm > 1 ? "s" : ""}`,
          color: "#f6b26b",
          fn: (t) => {
            let v = 0;
            for (let k = 1; k <= nHarm; k++) v += harmonics(k) * Math.sin(2 * Math.PI * k * F0 * (t + off));
            return 3.2 * v;
          },
        },
      ],
      { tSpan: 2 / F0, vMin: -4.5, vMax: 4.5, timeLabel: "two cycles", samples: 800 }
    );

    // spectrum bars
    const px = 610, py = 20, pw = 270, ph = 280;
    ctx.fillStyle = "#0b1119";
    ctx.fillRect(px, py, pw, ph);
    ctx.strokeStyle = "#33445e";
    ctx.strokeRect(px, py, pw, ph);
    D.label(ctx, "the recipe (spectrum)", px + pw / 2, py + 14, { color: D.COL.accent, size: 12, bold: true });
    const maxShow = 15;
    for (let k = 1; k <= maxShow; k++) {
      const a = Math.abs(harmonics(k));
      const on = k <= nHarm && a > 0.0001;
      const bx = px + 12 + (k - 1) * ((pw - 24) / maxShow);
      const bh = clamp(a / (4 / Math.PI), 0, 1) * (ph - 70);
      ctx.fillStyle = on ? D.COL.amber : "#2a3646";
      ctx.fillRect(bx, py + ph - 30 - bh, (pw - 24) / maxShow - 4, bh);
      if (k === 1 || k % 2 === 1 || shape === "sawtooth") {
        D.label(ctx, String(k), bx + ((pw - 24) / maxShow - 4) / 2, py + ph - 16, { color: on ? D.COL.muted : "#3a4757", size: 9 });
      }
    }
    D.label(ctx, "harmonic number (× 100 Hz)", px + pw / 2, py + ph + 14, { color: D.COL.muted, size: 10 });

    D.meter(ctx, 30, 320, 190, "highest harmonic in sum", `${nHarm} × 100 Hz = ${fmtSI(nHarm * F0, "Hz")}`, D.COL.amber);
    D.meter(
      ctx,
      235,
      320,
      280,
      "the lesson",
      shape === "square" ? "square = odd harmonics, 1/k" : shape === "triangle" ? "triangle = odd harmonics, 1/k²" : "sawtooth = ALL harmonics, 1/k",
      D.COL.accent
    );
  };

  return (
    <>
      <SimCanvas width={900} height={380} draw={draw} />
      <Controls>
        <Segmented<WaveShape>
          label="Target shape"
          value={shape}
          onChange={setShape}
          options={[
            { value: "square", label: "Square" },
            { value: "triangle", label: "Triangle" },
            { value: "sawtooth", label: "Sawtooth" },
          ]}
        />
        <Slider label="Harmonics in the sum" min={1} max={25} step={1} value={nHarm} onChange={setNHarm} fmt={(v) => String(v)} />
      </Controls>
      <Readouts>
        <Readout label="Fourier's claim" value="any repeating wave = a fundamental sine plus harmonics at integer multiples — no exceptions" tone="amber" />
        <Readout label="Why filters care" value="a 100 Hz square wave has energy at 300, 500, 700 Hz… — a low-pass that eats the harmonics rounds it into a sine" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 13.3 — Digital filters: the RC filter, reborn as arithmetic
 * ===================================================================== */

type DFMode = "none" | "avg" | "ema";

export function DigitalFilterLab() {
  const [mode, setMode] = useState<DFMode>("ema");
  const [avgN, setAvgN] = useState(8);
  const [alpha, setAlpha] = useState(0.15);
  const sim = useRef({
    t: 0,
    ema: 0,
    buf: [] as number[],
    stepAt: -10,
    dtAvg: 0.016,
    scope: new Scope(
      [
        { label: "raw sensor (noisy)", color: "#44536a", min: -1, max: 11 },
        { label: "filtered, in software", color: "#f6b26b", min: -1, max: 11 },
      ],
      8
    ),
  });

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    s.t += dt;
    s.dtAvg += (dt - s.dtAvg) * 0.05; // measured sample period (display-rate dependent)
    // signal: slow sine + noise + an occasional step disturbance
    const stepV = s.t - s.stepAt < 2.5 ? 3 : 0;
    const raw = 4 + 1.6 * Math.sin(2 * Math.PI * 0.25 * s.t) + (Math.random() - 0.5) * 2.4 + stepV;

    s.buf.push(raw);
    if (s.buf.length > 64) s.buf.shift();
    let filtered = raw;
    if (mode === "avg") {
      const window = s.buf.slice(-avgN);
      filtered = window.reduce((a, b) => a + b, 0) / window.length;
    } else if (mode === "ema") {
      s.ema += alpha * (raw - s.ema); // literally the RC charging equation, discretised
      filtered = s.ema;
    }
    s.scope.push(s.t, [raw, filtered]);

    s.scope.draw(ctx, 20, 20, 860, 300, { timeLabel: "1.3 s/div" });

    D.meter(
      ctx,
      30,
      340,
      250,
      "the filter",
      mode === "none" ? "bypassed — raw chaos" : mode === "avg" ? `mean of the last ${avgN} samples` : `y += ${alpha.toFixed(2)} · (x − y)`,
      D.COL.amber
    );
    D.meter(
      ctx,
      295,
      340,
      280,
      "equivalent time constant",
      mode === "ema" ? `≈ ${(s.dtAvg / alpha).toFixed(2)} s — an RC made of arithmetic` : mode === "avg" ? `≈ ${((avgN * s.dtAvg) / 2).toFixed(2)} s of lag` : "—",
      D.COL.accent
    );
    D.meter(
      ctx,
      590,
      340,
      280,
      "the price of smoothness",
      mode === "none" ? "none — and no smoothing either" : "watch how late the orange trace reacts to the step",
      D.COL.muted
    );
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} />
      <Controls>
        <Segmented<DFMode>
          label="Filter"
          value={mode}
          onChange={setMode}
          options={[
            { value: "none", label: "None (raw)" },
            { value: "avg", label: "Moving average" },
            { value: "ema", label: "Exponential (EMA)" },
          ]}
        />
        {mode === "avg" ? (
          <Slider label="Window size N" min={2} max={48} step={1} value={avgN} onChange={setAvgN} fmt={(v) => `${v} samples`} />
        ) : null}
        {mode === "ema" ? (
          <Slider label="Smoothing α" min={0.02} max={0.8} step={0.01} value={alpha} onChange={setAlpha} fmt={(v) => v.toFixed(2)} />
        ) : null}
        <div className="ctl-row">
          <label>Disturbance</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={() => (sim.current.stepAt = sim.current.t)}>
              ⚡ Inject a step
            </button>
          </div>
        </div>
      </Controls>
      <Readouts>
        <Readout
          label="The punchline"
          value="y += α(x − y) is the capacitor equation from Lesson 2.3 with the physics replaced by a multiply"
          tone="amber"
        />
        <Readout label="The eternal trade" value="smaller α (or bigger N) = smoother but slower — exactly the detector RC dilemma from 9.3" />
      </Readouts>
    </>
  );
}
