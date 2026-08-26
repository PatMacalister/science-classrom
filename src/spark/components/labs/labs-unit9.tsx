"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, PickSlider, Readout, Readouts, Segmented, Slider } from "@/spark/components/controls";
import { clamp, drawWaves, fmtSI, Scope } from "@/spark/lib/sim/helpers";
import * as D from "@/spark/lib/sim/draw";

/* =====================================================================
 * Lab 9.1 — The LC tank: energy sloshing between coil and capacitor
 * ===================================================================== */

const LC_L_VALUES = [0.01, 0.047, 0.1, 0.47, 1];
const LC_C_VALUES = [10e-9, 47e-9, 100e-9, 400e-9, 1e-6, 10e-6];
const LC_R_VALUES = [1, 10, 47, 220];

export function LcRingLab() {
  const [lIdx, setLIdx] = useState(LC_L_VALUES.indexOf(0.1));
  const [cIdx, setCIdx] = useState(LC_C_VALUES.indexOf(1e-6));
  const [rIdx, setRIdx] = useState(LC_R_VALUES.indexOf(10));
  const sim = useRef({
    vc: 9,
    i: 0,
    t: 0,
    kicks: 0,
    scope: new Scope(
      [
        { label: "capacitor voltage", color: "#4cc9f0", min: -10, max: 10 },
        { label: "coil current", color: "#f6b26b", min: -1, max: 1 },
      ],
      0.02
    ),
  });

  const L = LC_L_VALUES[lIdx];
  const C = LC_C_VALUES[cIdx];
  const r = LC_R_VALUES[rIdx];
  const f0 = 1 / (2 * Math.PI * Math.sqrt(L * C));
  const t0 = 1 / f0;
  const z0 = Math.sqrt(L / C); // characteristic impedance: peak I = Vpk / z0
  const q = z0 / r;

  const kick = () => {
    sim.current.vc = 9;
    sim.current.i = 0;
    sim.current.kicks++;
  };

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    s.scope.setWindow(6 * t0); // 6 ring periods across the screen — one per grid division
    s.scope.traces[1].max = (9 / z0) * 1.2;
    s.scope.traces[1].min = -(9 / z0) * 1.2;

    const dtSim = dt * 2 * t0; // window scrolls past in ~4 real seconds
    const sub = 16;
    for (let k = 0; k < sub; k++) {
      const h = dtSim / sub;
      // series RLC, semi-implicit Euler: L·dI/dt = −Vc − I·R ; C·dVc/dt = I
      s.i += ((-s.vc - s.i * r) / L) * h;
      s.vc += (s.i / C) * h;
    }
    // dead? kick it again so there is always something to watch
    if (Math.abs(s.vc) < 0.12 && Math.abs(s.i * z0) < 0.12) kick();

    s.t += dtSim;
    s.scope.push(s.t, [s.vc, s.i]);

    // schematic: C || L (tank), R in the loop
    D.capacitor(ctx, 100, 120, 100, 240, { label: `C ${fmtSI(C, "F")}` });
    D.wire(ctx, [[100, 120], [100, 80], [230, 80], [230, 110]]);
    D.wire(ctx, [[100, 240], [100, 290], [125, 290]]);
    D.resistor(ctx, 125, 290, 205, 290, { label: `R ${r} Ω` });
    D.wire(ctx, [[205, 290], [230, 290], [230, 260]]);
    ctx.strokeStyle = D.COL.wire;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let k = 0; k < 4; k++) ctx.arc(230, 122 + k * 26, 13, -Math.PI / 2, Math.PI / 2, false);
    ctx.stroke();
    D.label(ctx, `L ${fmtSI(L, "H")}`, 278, 175, { color: D.COL.muted, size: 12 });

    // energy indicators
    const eC = 0.5 * C * s.vc * s.vc;
    const eL = 0.5 * L * s.i * s.i;
    const eTot = Math.max(1e-12, eC + eL);
    const barY = 345;
    ctx.fillStyle = "#101825";
    ctx.strokeStyle = "#33445e";
    ctx.beginPath();
    ctx.roundRect(60, barY, 240, 18, 5);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#4cc9f0";
    ctx.fillRect(62, barY + 2, (eC / eTot) * 236, 14);
    ctx.fillStyle = "#f6b26b";
    ctx.fillRect(62 + (eC / eTot) * 236, barY + 2, (eL / eTot) * 236, 14);
    D.label(ctx, "energy: E-field (C)  ⇄  B-field (L)", 180, barY + 32, { color: D.COL.muted, size: 11 });

    s.scope.draw(ctx, 350, 30, 530, 300, { timeLabel: `${fmtSI(t0, "s", 2)} / div — 6 ring cycles` });

    D.meter(ctx, 350, 350, 170, "resonant f₀ = 1/(2π√LC)", fmtSI(f0, "Hz", 2), D.COL.amber);
    D.meter(ctx, 535, 350, 140, "ring period", fmtSI(t0, "s", 2));
    D.meter(ctx, 690, 350, 150, "Q factor ≈ √(L/C)/R", q.toFixed(1), q > 10 ? D.COL.good : D.COL.bad);
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} />
      <Controls>
        <PickSlider label="Inductance L" values={LC_L_VALUES} index={lIdx} onChange={setLIdx} fmt={(v) => fmtSI(v, "H")} />
        <PickSlider label="Capacitance C" values={LC_C_VALUES} index={cIdx} onChange={setCIdx} fmt={(v) => fmtSI(v, "F")} />
        <PickSlider label="Loop loss R" values={LC_R_VALUES} index={rIdx} onChange={setRIdx} fmt={(v) => fmtSI(v, "Ω")} />
        <div className="ctl-row">
          <label>Excite</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={kick}>
              ⚡ Kick it (charge C to 9 V)
            </button>
          </div>
        </div>
      </Controls>
      <Readouts>
        <Readout label="What you're watching" value="charge sloshes C → L → C, like a pendulum — voltage and current 90° apart" />
        <Readout
          label="Try this"
          value="Raise R and watch the ring die young (low Q). Quadruple C: the pitch halves — f₀ ∝ 1/√(LC)"
          tone="amber"
        />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 9.2 — Tuning: an RLC band-pass picks one station from the air
 * ===================================================================== */

const STATIONS = [
  { f: 540e3, a: 1.0, name: "540 kHz “News”" },
  { f: 760e3, a: 0.85, name: "760 kHz “Jazz”" },
  { f: 1000e3, a: 0.95, name: "1000 kHz “Rock”" },
];
const TUNER_Q_VALUES = [8, 25, 80];
const TUNER_L = 240e-6;

export function TunerLab() {
  const [cPf, setCPf] = useState(150);
  const [qIdx, setQIdx] = useState(1);
  const sim = useRef({ phase: 0 });

  const c = cPf * 1e-12;
  const f0 = 1 / (2 * Math.PI * Math.sqrt(TUNER_L * c));
  const q = TUNER_Q_VALUES[qIdx];
  const gainAt = (f: number) => 1 / Math.sqrt(1 + q * q * Math.pow(f / f0 - f0 / f, 2));
  const heard = STATIONS.map((st) => ({ ...st, g: gainAt(st.f) * st.a }));
  const best = heard.reduce((a, b) => (b.g > a.g ? b : a));

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    s.phase += dt * 3e-6; // slow drift in this microsecond-scale window

    drawWaves(
      ctx,
      20,
      20,
      520,
      270,
      [
        {
          label: "antenna: all stations at once",
          color: "#5a6b7d",
          width: 1.2,
          fn: (t) => STATIONS.reduce((acc, st) => acc + st.a * Math.sin(2 * Math.PI * st.f * (t + s.phase)), 0),
        },
        {
          label: "after your tuned circuit",
          color: "#f6b26b",
          fn: (t) =>
            heard.reduce((acc, st) => acc + st.g * Math.sin(2 * Math.PI * st.f * (t + s.phase)), 0),
        },
      ],
      { tSpan: 8e-6, vMin: -3, vMax: 3, timeLabel: "1.3 µs/div — RF timescale", samples: 700 }
    );

    // response curve + station markers
    const px = 570, py = 20, pw = 310, ph = 270;
    ctx.fillStyle = "#0b1119";
    ctx.fillRect(px, py, pw, ph);
    ctx.strokeStyle = "#33445e";
    ctx.strokeRect(px, py, pw, ph);
    D.label(ctx, "tank response across the AM band", px + pw / 2, py + 14, { color: D.COL.accent, size: 12, bold: true });
    const fMin = 400e3, fMax = 1200e3;
    const fx = (f: number) => px + ((f - fMin) / (fMax - fMin)) * pw;
    const gy = (g: number) => py + ph - 10 - g * (ph - 40);
    ctx.strokeStyle = D.COL.accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 160; i++) {
      const f = fMin + (i / 160) * (fMax - fMin);
      const g = gainAt(f);
      if (i === 0) ctx.moveTo(fx(f), gy(g));
      else ctx.lineTo(fx(f), gy(g));
    }
    ctx.stroke();
    for (const st of heard) {
      ctx.setLineDash([3, 5]);
      D.wire(ctx, [[fx(st.f), py + 24], [fx(st.f), py + ph - 8]], "rgba(148,163,179,0.35)", 1);
      ctx.setLineDash([]);
      D.dot(ctx, fx(st.f), gy(gainAt(st.f)), 5, st === best && best.g > 0.25 ? D.COL.good : D.COL.muted);
      D.label(ctx, `${Math.round(st.f / 1000)}`, fx(st.f), py + ph - 16, { color: D.COL.muted, size: 10 });
    }
    if (f0 > fMin && f0 < fMax) {
      D.label(ctx, "▲ tuned here", fx(f0), py + ph + 12 - 26, { color: D.COL.amber, size: 10 });
    }

    // station volume bars
    heard.forEach((st, i) => {
      const bx = 30 + i * 290;
      ctx.fillStyle = "#101825";
      ctx.strokeStyle = "#33445e";
      ctx.beginPath();
      ctx.roundRect(bx, 320, 260, 20, 5);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = st === best && best.g > 0.25 ? D.COL.good : "#3d4f6b";
      ctx.fillRect(bx + 2, 322, clamp(st.g, 0.01, 1) * 256, 16);
      D.label(ctx, st.name, bx + 130, 308, { color: st === best && best.g > 0.25 ? D.COL.good : D.COL.muted, size: 11 });
    });

    D.meter(
      ctx,
      300,
      360,
      300,
      "now playing",
      best.g > 0.25 ? best.name : "…static…",
      best.g > 0.25 ? D.COL.good : D.COL.muted
    );
  };

  return (
    <>
      <SimCanvas width={900} height={410} draw={draw} />
      <Controls>
        <Slider
          label="Tuning capacitor"
          min={40}
          max={400}
          step={2}
          value={cPf}
          onChange={setCPf}
          fmt={(v) => `${v} pF → ${fmtSI(1 / (2 * Math.PI * Math.sqrt(TUNER_L * v * 1e-12)), "Hz", 3)}`}
        />
        <Segmented
          label="Selectivity (Q)"
          value={String(qIdx)}
          onChange={(v) => setQIdx(Number(v))}
          options={TUNER_Q_VALUES.map((qv, i) => ({ value: String(i), label: `Q = ${qv}` }))}
        />
      </Controls>
      <Readouts>
        <Readout label="Tuned to" value={fmtSI(f0, "Hz", 3)} tone="amber" />
        <Readout
          label="Try this"
          value="At Q = 8, park between Jazz and Rock — you hear both (bad!). Switch to Q = 80 and pick them apart."
        />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 9.3 — AM and the envelope detector (a diode + RC, again!)
 * ===================================================================== */

const AM_RC_VALUES = [0.05e-3, 0.2e-3, 0.8e-3, 3e-3, 12e-3];

export function AmDetectorLab() {
  const [depth, setDepth] = useState(0.6);
  const [rcIdx, setRcIdx] = useState(AM_RC_VALUES.indexOf(0.8e-3));
  const sim = useRef({ t0: 0 });

  const FC = 8000; // carrier — slow enough to see individual cycles
  const FA = 250; // "music"
  const rc = AM_RC_VALUES[rcIdx];

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    s.t0 += dt * 0.0012;

    const tSpan = 2 / FA;
    const warm = 2e-3;
    const N = 1400;
    const step = (tSpan + warm) / N;
    const am: number[] = [];
    const env: number[] = [];
    let v = 0;
    for (let i = 0; i < N; i++) {
      const t = i * step - warm;
      const audio = 1 + depth * Math.sin(2 * Math.PI * FA * (t + s.t0));
      const vam = 2.5 * audio * Math.sin(2 * Math.PI * FC * (t + s.t0));
      const rect = vam - 0.3; // diode drop
      if (rect > v) v = rect;
      else v *= Math.exp(-step / rc);
      if (t >= 0) {
        am.push(vam);
        env.push(v);
      }
    }
    const M = am.length;
    const at = (arr: number[]) => (t: number) => arr[clamp(Math.round((t / tSpan) * (M - 1)), 0, M - 1)];

    drawWaves(
      ctx,
      20,
      20,
      860,
      280,
      [
        { label: `AM signal — ${fmtSI(FC, "Hz")} carrier`, color: "#44536a", width: 1, fn: at(am) },
        {
          label: "ideal envelope (the audio!)",
          color: "#47c26b",
          dash: [5, 5],
          width: 1.5,
          fn: (t) => 2.5 * (1 + depth * Math.sin(2 * Math.PI * FA * (t + s.t0))) - 0.3,
        },
        { label: `detector output (diode + RC = ${fmtSI(rc, "s")})`, color: "#f6b26b", fn: at(env) },
      ],
      { tSpan, vMin: -5, vMax: 5, timeLabel: `${fmtSI(tSpan / 6, "s", 2)}/div — two audio cycles`, samples: 860 }
    );

    const tooFast = rc < 2.5 / FC;
    // diagonal-clipping bound relaxes at low modulation depth: RC ≤ √(1−m²)/(2π·fa·m)
    const slowLimit =
      (Math.sqrt(Math.max(1e-4, 1 - depth * depth)) / Math.max(depth, 0.05)) / (2 * Math.PI * FA);
    const tooSlow = rc > slowLimit;
    D.meter(
      ctx,
      280,
      320,
      340,
      "detector verdict",
      tooFast ? "RC too small — carrier ripple leaks through" : tooSlow ? "RC too big — can't follow the audio down" : "just right — smooth and faithful ✓",
      tooFast || tooSlow ? D.COL.bad : D.COL.good
    );
  };

  return (
    <>
      <SimCanvas width={900} height={380} draw={draw} />
      <Controls>
        <Slider label="Modulation depth" min={0} max={1} step={0.05} value={depth} onChange={setDepth} fmt={(v) => `${Math.round(v * 100)}%`} />
        <PickSlider label="Detector RC" values={AM_RC_VALUES} index={rcIdx} onChange={setRcIdx} fmt={(v) => fmtSI(v, "s")} />
      </Controls>
      <Readouts>
        <Readout label="The Goldilocks rule" value="RC must outlive a carrier cycle but react faster than the audio: 1/f_c ≪ RC ≪ 1/f_a" tone="amber" />
        <Readout label="Old friends" value="a diode (3.1) and an RC (2.3) — the same parts, now decoding radio" />
      </Readouts>
    </>
  );
}
