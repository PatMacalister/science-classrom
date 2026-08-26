"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, PickSlider, Readout, Readouts, Segmented, Slider } from "@/spark/components/controls";
import { clamp, drawWaves, e12Range, fmtSI } from "@/spark/lib/sim/helpers";
import * as D from "@/spark/lib/sim/draw";

/* =====================================================================
 * Lab 5.1 — AC waveforms: peak, RMS, frequency
 * ===================================================================== */

export function AcWaveformsLab() {
  const [vp, setVp] = useState(9);
  const [freq, setFreq] = useState(50);
  const [showRms, setShowRms] = useState<"show" | "hide">("show");
  const sim = useRef({ phase: 0 });

  const vrms = vp / Math.SQRT2;

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    s.phase += dt * 2 * Math.PI * 2; // scroll two cycles per second visually

    const hlines = [
      { value: vp, label: `+Vpeak = ${vp.toFixed(1)} V`, color: "rgba(242,109,109,0.6)" },
      { value: -vp, label: `−Vpeak`, color: "rgba(242,109,109,0.6)" },
    ];
    if (showRms === "show") {
      hlines.push({
        value: vrms,
        label: `Vrms = ${vrms.toFixed(2)} V — the “equivalent DC”`,
        color: "rgba(71,194,107,0.8)",
      });
    }

    drawWaves(
      ctx,
      20,
      20,
      860,
      300,
      [
        {
          label: `v(t) = ${vp.toFixed(1)} V · sin(2π·${freq} Hz·t)`,
          color: "#4cc9f0",
          fn: (t) => vp * Math.sin(2 * Math.PI * freq * t - s.phase),
        },
      ],
      {
        tSpan: 0.1,
        vMin: -13.5,
        vMax: 13.5,
        timeLabel: "window = 100 ms · ~16.7 ms/div",
        hlines,
      }
    );

    D.meter(ctx, 20, 340, 150, "peak Vp", `${vp.toFixed(1)} V`, D.COL.bad);
    D.meter(ctx, 185, 340, 160, "peak-to-peak Vpp", `${(2 * vp).toFixed(1)} V`);
    D.meter(ctx, 360, 340, 170, "RMS = Vp/√2", `${vrms.toFixed(2)} V`, D.COL.good);
    D.meter(ctx, 545, 340, 150, "frequency", `${freq} Hz`, D.COL.amber);
    D.meter(ctx, 710, 340, 170, "period T = 1/f", fmtSI(1 / freq, "s", 3));
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} />
      <Controls>
        <Slider label="Peak voltage Vp" min={1} max={12} step={0.5} value={vp} onChange={setVp} fmt={(v) => `${v.toFixed(1)} V`} />
        <Slider label="Frequency f" min={10} max={200} step={5} value={freq} onChange={setFreq} fmt={(v) => `${v} Hz`} />
        <Segmented
          label="RMS line"
          value={showRms}
          onChange={setShowRms}
          options={[
            { value: "show", label: "Show equivalent DC" },
            { value: "hide", label: "Hide" },
          ]}
        />
      </Controls>
      <Readouts>
        <Readout label="Why RMS matters" value={`${vp.toFixed(1)} V AC heats a resistor exactly like ${vrms.toFixed(2)} V DC`} tone="good" />
        <Readout label="Mains reference" value="“230 V / 120 V mains” are RMS values — the peaks are ×1.41 higher" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 5.2 — Rectifiers: turning AC into DC
 * ===================================================================== */

const RECT_C_VALUES = [10e-6, 47e-6, 100e-6, 470e-6, 1000e-6];
const RECT_R_VALUES = e12Range(100, 10000);

type RectMode = "half" | "bridge" | "smooth";

export function RectifierLab() {
  const [mode, setMode] = useState<RectMode>("half");
  const [cIdx, setCIdx] = useState(RECT_C_VALUES.indexOf(100e-6));
  const [rIdx, setRIdx] = useState(RECT_R_VALUES.indexOf(1000));
  const sim = useRef({ t0: 0 });

  const VP = 9;
  const F = 50;
  const c = RECT_C_VALUES[cIdx];
  const r = RECT_R_VALUES[rIdx];

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    s.t0 += dt * 0.02; // slow drift for a live feel

    // simulate over warmup + window so the smoothing cap reaches steady state
    const tSpan = 0.06; // 3 cycles
    const warm = 0.08;
    const N = 720;
    const step = (tSpan + warm) / N;
    const src: number[] = [];
    const out: number[] = [];
    let vC = 0;
    for (let i = 0; i < N; i++) {
      const t = i * step - warm;
      const vs = VP * Math.sin(2 * Math.PI * F * (t + s.t0));
      const vrect = mode === "half" ? Math.max(0, vs - 0.7) : Math.max(0, Math.abs(vs) - 1.4);
      if (mode === "smooth") {
        vC = vrect > vC ? vrect : vC * Math.exp(-step / (r * c));
      }
      if (t >= 0) {
        src.push(vs);
        out.push(mode === "smooth" ? vC : vrect);
      }
    }
    const M = src.length;
    const at = (arr: number[]) => (t: number) => arr[clamp(Math.round((t / tSpan) * (M - 1)), 0, M - 1)];

    drawWaves(
      ctx,
      20,
      20,
      860,
      290,
      [
        { label: "AC input (9 V peak, 50 Hz)", color: "#5a6b7d", fn: at(src), width: 1.5 },
        {
          label:
            mode === "half"
              ? "output — half-wave (1 diode)"
              : mode === "bridge"
                ? "output — full-wave bridge (4 diodes)"
                : `output — bridge + ${fmtSI(c, "F")} capacitor`,
          color: "#f6b26b",
          fn: at(out),
        },
      ],
      { tSpan, vMin: -10.5, vMax: 10.5, timeLabel: "10 ms/div — 3 mains cycles", samples: 600 }
    );

    const dc = out.reduce((a, b) => a + b, 0) / M;
    const ripple = Math.max(...out) - Math.min(...out);
    D.meter(ctx, 20, 330, 170, "average (DC) output", `${dc.toFixed(2)} V`, D.COL.good);
    D.meter(
      ctx,
      205,
      330,
      170,
      "ripple (peak-to-peak)",
      `${ripple.toFixed(2)} V`,
      mode === "smooth" && ripple < 1 ? D.COL.good : D.COL.amber
    );
    D.meter(
      ctx,
      390,
      330,
      190,
      "diode drops en route",
      mode === "half" ? "1 × 0.7 V" : "2 × 0.7 V (bridge path)",
      D.COL.muted
    );
    if (mode === "smooth") {
      D.meter(ctx, 595, 330, 190, "τ = R·C vs cycle", `${fmtSI(r * c, "s", 2)} vs 20 ms`, D.COL.accent);
    }
  };

  return (
    <>
      <SimCanvas width={900} height={390} draw={draw} />
      <Controls>
        <Segmented<RectMode>
          label="Rectifier"
          value={mode}
          onChange={setMode}
          options={[
            { value: "half", label: "Half-wave" },
            { value: "bridge", label: "Full-wave bridge" },
            { value: "smooth", label: "Bridge + capacitor" },
          ]}
        />
        <PickSlider label="Smoothing capacitor C" values={RECT_C_VALUES} index={cIdx} onChange={setCIdx} fmt={(v) => fmtSI(v, "F")} />
        <PickSlider label="Load resistance R" values={RECT_R_VALUES} index={rIdx} onChange={setRIdx} fmt={(v) => fmtSI(v, "Ω")} />
      </Controls>
      <Readouts>
        <Readout label="The recipe inside every adapter" value="transform down → rectify → smooth → (regulate)" />
        <Readout
          label="Try this"
          value="In smoothing mode, lower R (heavier load) — the ripple grows. Why? τ = RC shrinks between refills."
          tone="amber"
        />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 5.3 — RC filters: frequency-dependent dividers
 * ===================================================================== */

const FILT_R_VALUES = e12Range(100, 100000);
const FILT_C_VALUES = [1e-9, 10e-9, 100e-9, 1e-6];
const FILT_F_VALUES = [20, 50, 100, 200, 500, 1000, 1600, 2000, 5000, 10000, 20000];

export function FilterLab() {
  const [mode, setMode] = useState<"lp" | "hp">("lp");
  const [rIdx, setRIdx] = useState(FILT_R_VALUES.indexOf(1000));
  const [cIdx, setCIdx] = useState(FILT_C_VALUES.indexOf(100e-9));
  const [fIdx, setFIdx] = useState(FILT_F_VALUES.indexOf(500));
  const sim = useRef({ phase: 0 });

  const r = FILT_R_VALUES[rIdx];
  const c = FILT_C_VALUES[cIdx];
  const f = FILT_F_VALUES[fIdx];
  const fc = 1 / (2 * Math.PI * r * c);
  const ratio = f / fc;
  const gain = mode === "lp" ? 1 / Math.sqrt(1 + ratio * ratio) : ratio / Math.sqrt(1 + ratio * ratio);
  const phase = mode === "lp" ? -Math.atan(ratio) : Math.atan(1 / ratio);
  const xc = 1 / (2 * Math.PI * f * c);

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    s.phase += dt * 2 * Math.PI * 1.5;
    const A = 4;
    const tSpan = 3 / f;

    drawWaves(
      ctx,
      20,
      20,
      560,
      290,
      [
        { label: `input — ${fmtSI(f, "Hz")} sine`, color: "#5a6b7d", fn: (t) => A * Math.sin(2 * Math.PI * f * t - s.phase), width: 1.5 },
        { label: `output — ×${gain.toFixed(2)}`, color: "#f6b26b", fn: (t) => A * gain * Math.sin(2 * Math.PI * f * t - s.phase + phase) },
      ],
      { tSpan, vMin: -5, vMax: 5, timeLabel: `${fmtSI(tSpan / 6, "s", 2)}/div — 3 cycles` }
    );

    // frequency-response inset (gain vs log f)
    const px = 610, py = 20, pw = 270, ph = 290;
    ctx.fillStyle = "#0b1119";
    ctx.fillRect(px, py, pw, ph);
    ctx.strokeStyle = "#33445e";
    ctx.strokeRect(px, py, pw, ph);
    D.label(ctx, "frequency response", px + pw / 2, py + 14, { color: D.COL.accent, size: 12, bold: true });
    const fMin = 10, fMax = 40000;
    const fx = (fq: number) => px + ((Math.log10(fq) - Math.log10(fMin)) / (Math.log10(fMax) - Math.log10(fMin))) * pw;
    const gy = (g: number) => py + ph - 12 - g * (ph - 40);
    ctx.strokeStyle = D.COL.accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 120; i++) {
      const fq = Math.pow(10, Math.log10(fMin) + (i / 120) * (Math.log10(fMax) - Math.log10(fMin)));
      const rt = fq / fc;
      const g = mode === "lp" ? 1 / Math.sqrt(1 + rt * rt) : rt / Math.sqrt(1 + rt * rt);
      if (i === 0) ctx.moveTo(fx(fq), gy(g));
      else ctx.lineTo(fx(fq), gy(g));
    }
    ctx.stroke();
    // cutoff marker
    if (fc > fMin && fc < fMax) {
      ctx.setLineDash([4, 5]);
      D.wire(ctx, [[fx(fc), py + 20], [fx(fc), py + ph - 8]], "rgba(246,178,107,0.6)", 1);
      ctx.setLineDash([]);
      D.label(ctx, `fc = ${fmtSI(fc, "Hz", 2)}`, fx(fc), py + ph - 20, { color: D.COL.amber, size: 11 });
    }
    // operating point
    D.glow(ctx, fx(clamp(f, fMin, fMax)), gy(gain), 12, D.COL.amber, 0.7);
    D.dot(ctx, fx(clamp(f, fMin, fMax)), gy(gain), 4.5, D.COL.amber);
    D.label(ctx, "10 Hz", px + 18, py + ph - 8, { color: D.COL.muted, size: 10 });
    D.label(ctx, "40 kHz", px + pw - 24, py + ph - 8, { color: D.COL.muted, size: 10 });

    D.meter(ctx, 20, 330, 160, "cutoff fc = 1/(2πRC)", fmtSI(fc, "Hz", 2), D.COL.amber);
    D.meter(ctx, 195, 330, 170, "capacitor's Xc at f", fmtSI(xc, "Ω", 2), D.COL.accent);
    D.meter(ctx, 380, 330, 150, "gain", `×${gain.toFixed(2)}  (${(20 * Math.log10(Math.max(gain, 1e-4))).toFixed(1)} dB)`);
    D.meter(ctx, 545, 330, 150, "phase shift", `${((phase * 180) / Math.PI).toFixed(0)}°`, D.COL.muted);
    D.meter(
      ctx,
      710,
      330,
      170,
      "signal is",
      ratio < 0.5 ? (mode === "lp" ? "passed ✓" : "blocked ✗") : ratio > 2 ? (mode === "lp" ? "blocked ✗" : "passed ✓") : "near cutoff",
      gain > 0.7 ? D.COL.good : gain < 0.3 ? D.COL.bad : D.COL.amber
    );
  };

  return (
    <>
      <SimCanvas width={900} height={390} draw={draw} />
      <Controls>
        <Segmented
          label="Topology"
          value={mode}
          onChange={setMode}
          options={[
            { value: "lp", label: "Low-pass (R then C)" },
            { value: "hp", label: "High-pass (C then R)" },
          ]}
        />
        <PickSlider label="R" values={FILT_R_VALUES} index={rIdx} onChange={setRIdx} fmt={(v) => fmtSI(v, "Ω")} />
        <PickSlider label="C" values={FILT_C_VALUES} index={cIdx} onChange={setCIdx} fmt={(v) => fmtSI(v, "F")} />
        <PickSlider label="Input frequency" values={FILT_F_VALUES} index={fIdx} onChange={setFIdx} fmt={(v) => fmtSI(v, "Hz")} />
      </Controls>
      <Readouts>
        <Readout label="It's just a divider" value="R and Xc share the input like R₁ and R₂ — but Xc changes with frequency" />
        <Readout
          label="Try this"
          value="Park f at fc: gain is 0.71 (−3 dB) and the phase shift is exactly 45° — the filter's signature"
          tone="amber"
        />
      </Readouts>
    </>
  );
}
