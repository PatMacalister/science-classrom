"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider } from "@/spark/components/controls";
import { clamp, Scope } from "@/spark/lib/sim/helpers";
import * as D from "@/spark/lib/sim/draw";

/* =====================================================================
 * Lab 18.1 — The mixer: multiplication moves frequencies
 * ===================================================================== */

const MIX_STATIONS = [
  { f: 91.0, name: "91.0 “Kultur”", a: 0.85 },
  { f: 98.5, name: "98.5 “Rock”", a: 1.0 },
  { f: 104.3, name: "104.3 “Jazz”", a: 0.75 },
];
const IF_FREQ = 10.7;
const IF_BW = 0.25;

export function MixerLab() {
  const [lo, setLo] = useState(85.0);

  const products = MIX_STATIONS.flatMap((s) => [
    { f: Math.abs(s.f - lo), s, kind: "diff" as const },
    { f: s.f + lo, s, kind: "sum" as const },
  ]);
  const tuned = products.find((p) => p.kind === "diff" && Math.abs(p.f - IF_FREQ) < IF_BW);

  const draw = (ctx: CanvasRenderingContext2D) => {
    const px = 30, py = 40, pw = 840, ph = 240;
    const fMax = 220;
    const fx = (f: number) => px + (f / fMax) * pw;

    ctx.fillStyle = "#0b1119";
    ctx.fillRect(px, py, pw, ph);
    ctx.strokeStyle = "#33445e";
    ctx.strokeRect(px, py, pw, ph);
    D.label(ctx, "the spectrum, before and after the mixer", px + pw / 2, py - 14, { color: D.COL.accent, size: 13, bold: true });

    // IF filter window
    ctx.fillStyle = "rgba(71,194,107,0.12)";
    ctx.fillRect(fx(IF_FREQ - IF_BW), py, fx(IF_FREQ + IF_BW) - fx(IF_FREQ - IF_BW), ph);
    D.label(ctx, `IF filter @ ${IF_FREQ} MHz`, fx(IF_FREQ) + 4, py + 14, { color: D.COL.good, size: 10, align: "left" });

    // original stations
    for (const s of MIX_STATIONS) {
      D.wire(ctx, [[fx(s.f), py + ph], [fx(s.f), py + ph - s.a * 150]], "#44536a", 4);
      D.label(ctx, s.name.split(" ")[0], fx(s.f), py + ph - s.a * 150 - 12, { color: D.COL.muted, size: 10 });
    }
    // LO
    ctx.setLineDash([5, 4]);
    D.wire(ctx, [[fx(lo), py], [fx(lo), py + ph]], D.COL.amber, 2);
    ctx.setLineDash([]);
    D.label(ctx, `LO ${lo.toFixed(1)} MHz`, fx(lo), py + 26, { color: D.COL.amber, size: 11 });

    // mixer products
    for (const p of products) {
      if (p.f > fMax) continue;
      const inIF = p === tuned;
      D.wire(
        ctx,
        [[fx(p.f), py + ph], [fx(p.f), py + ph - p.s.a * 120]],
        inIF ? D.COL.good : "rgba(76,201,240,0.55)",
        inIF ? 5 : 2.5
      );
      if (inIF) D.glow(ctx, fx(p.f), py + ph - p.s.a * 120, 20, D.COL.good, 0.8);
    }
    D.label(ctx, "0", fx(0), py + ph + 14, { color: D.COL.muted, size: 10 });
    D.label(ctx, "100 MHz", fx(100), py + ph + 14, { color: D.COL.muted, size: 10 });
    D.label(ctx, "200 MHz", fx(200), py + ph + 14, { color: D.COL.muted, size: 10 });

    D.meter(
      ctx,
      50,
      310,
      360,
      "products (each station × LO)",
      `sum f+LO and difference |f−LO| — grey in, cyan out`,
      D.COL.accent
    );
    D.meter(
      ctx,
      430,
      310,
      420,
      "landing in the IF filter",
      tuned ? `${tuned.s.name} — shifted to ${tuned.f.toFixed(2)} MHz ♪` : "nothing — static. Slide the LO!",
      tuned ? D.COL.good : D.COL.muted
    );
  };

  return (
    <>
      <SimCanvas width={900} height={360} draw={draw} />
      <Controls>
        <Slider label="Local oscillator (LO)" min={75} max={100} step={0.1} value={lo} onChange={setLo} fmt={(v) => `${v.toFixed(1)} MHz`} />
      </Controls>
      <Readouts>
        <Readout label="The identity that runs radio" value="sin(a)·sin(b) = ½cos(a−b) − ½cos(a+b): multiplying two tones creates their sum and difference" tone="amber" />
        <Readout label="Try this" value="Tune each of the three stations into the fixed IF window. One knob, one filter, any station — the superheterodyne." />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 18.2 — I/Q: capturing amplitude AND phase
 * ===================================================================== */

type IqMode = "tone" | "am" | "fm";

export function IqLab() {
  const [mode, setMode] = useState<IqMode>("tone");
  const [dfreq, setDfreq] = useState(0.6);
  const [amp, setAmp] = useState(0.8);
  const sim = useRef({
    t: 0,
    phase: 0,
    trail: [] as Array<{ i: number; q: number }>,
    scope: new Scope(
      [
        { label: "I (in-phase)", color: "#4cc9f0", min: -1.4, max: 1.4 },
        { label: "Q (quadrature)", color: "#f6b26b", min: -1.4, max: 1.4 },
      ],
      6
    ),
  });

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    s.t += dt;
    const wobble = Math.sin(2 * Math.PI * 0.5 * s.t);
    const a = mode === "am" ? amp * (0.55 + 0.45 * wobble) : amp;
    const instFreq = mode === "fm" ? dfreq + 1.2 * wobble : dfreq;
    s.phase += 2 * Math.PI * instFreq * dt;
    const i = a * Math.cos(s.phase);
    const q = a * Math.sin(s.phase);
    s.trail.push({ i, q });
    if (s.trail.length > 90) s.trail.shift();
    s.scope.push(s.t, [i, q]);

    // phasor plane
    const cx = 170, cy = 175, r = 130;
    ctx.strokeStyle = "#243144";
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    D.wire(ctx, [[cx - r - 10, cy], [cx + r + 10, cy]], "#243144", 1);
    D.wire(ctx, [[cx, cy - r - 10], [cx, cy + r + 10]], "#243144", 1);
    D.label(ctx, "I", cx + r + 22, cy, { color: D.COL.accent, size: 13, bold: true });
    D.label(ctx, "Q", cx, cy - r - 20, { color: D.COL.amber, size: 13, bold: true });
    s.trail.forEach((p, k) => {
      const alpha = k / s.trail.length;
      D.dot(ctx, cx + p.i * r, cy - p.q * r, 2.5, `rgba(71,194,107,${alpha * 0.8})`);
    });
    D.arrow(ctx, cx, cy, cx + i * r, cy - q * r, D.COL.good, 2.5);
    D.label(ctx, "the signal as a rotating arrow", cx, cy + r + 26, { color: D.COL.muted, size: 11 });

    s.scope.draw(ctx, 360, 30, 520, 220, { timeLabel: "1 s/div — two ADCs, 90° apart" });

    const magnitude = Math.sqrt(i * i + q * q);
    D.meter(ctx, 360, 270, 240, "arrow length √(I²+Q²)", `${magnitude.toFixed(2)}  ← AM lives here`, mode === "am" ? D.COL.good : D.COL.muted);
    D.meter(
      ctx,
      620,
      270,
      260,
      "spin rate (dφ/dt ÷ 2π)",
      `${instFreq.toFixed(2)} Hz  ← FM lives here`,
      mode === "fm" ? D.COL.good : D.COL.muted
    );
    D.label(
      ctx,
      mode === "tone" ? "steady tone: fixed length, constant spin" : mode === "am" ? "AM: the arrow breathes — length carries the audio" : "FM: the arrow's spin speeds and slows — rotation carries the audio",
      450,
      340,
      { color: "rgba(148,163,179,0.7)", size: 12 }
    );
  };

  return (
    <>
      <SimCanvas width={900} height={360} draw={draw} />
      <Controls>
        <Segmented<IqMode>
          label="Signal"
          value={mode}
          onChange={setMode}
          options={[
            { value: "tone", label: "Steady tone" },
            { value: "am", label: "AM (breathing)" },
            { value: "fm", label: "FM (wobbling spin)" },
          ]}
        />
        <Slider label="Frequency offset Δf" min={-2} max={2} step={0.1} value={dfreq} onChange={setDfreq} fmt={(v) => `${v.toFixed(1)} Hz`} />
        <Slider label="Amplitude" min={0.2} max={1.2} step={0.05} value={amp} onChange={setAmp} fmt={(v) => v.toFixed(2)} />
      </Controls>
      <Readouts>
        <Readout label="Why two channels" value="one ADC sees only a shadow of the arrow; I and Q together capture length AND angle — the whole signal" tone="amber" />
        <Readout label="Demodulation, unmasked" value="AM = read the length (9.3's envelope!) · FM = read the spin rate. All SDR software starts exactly here." />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 18.3 — Digital modulation: bits into constellation points
 * ===================================================================== */

type ModName = "bpsk" | "qpsk" | "qam16";

const CONSTELLATIONS: Record<ModName, { name: string; bits: number; points: Array<[number, number]> }> = {
  bpsk: { name: "BPSK", bits: 1, points: [[-1, 0], [1, 0]] },
  qpsk: { name: "QPSK", bits: 2, points: [[-0.707, -0.707], [-0.707, 0.707], [0.707, -0.707], [0.707, 0.707]] },
  qam16: {
    name: "16-QAM",
    bits: 4,
    points: ([-3, -1, 1, 3] as number[]).flatMap((a) => ([-3, -1, 1, 3] as number[]).map((b) => [a / 3.16, b / 3.16] as [number, number])),
  },
};

function gauss() {
  return Math.sqrt(-2 * Math.log(Math.random() + 1e-12)) * Math.cos(2 * Math.PI * Math.random());
}

export function ConstellationLab() {
  const [mod, setMod] = useState<ModName>("qpsk");
  const [noise, setNoise] = useState(0.1);
  const sim = useRef({
    pts: [] as Array<{ x: number; y: number; err: boolean; age: number }>,
    sent: 0,
    errors: 0,
  });

  const resetStats = () => {
    sim.current.sent = 0;
    sim.current.errors = 0;
    sim.current.pts = [];
  };

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    const C = CONSTELLATIONS[mod];

    // transmit a few symbols per frame
    for (let k = 0; k < 3; k++) {
      const ideal = C.points[Math.floor(Math.random() * C.points.length)];
      const rx: [number, number] = [ideal[0] + gauss() * noise, ideal[1] + gauss() * noise];
      let best = 0, bestD = Infinity;
      C.points.forEach((p, i) => {
        const d = (p[0] - rx[0]) ** 2 + (p[1] - rx[1]) ** 2;
        if (d < bestD) { bestD = d; best = i; }
      });
      const err = C.points[best] !== ideal;
      s.sent++;
      if (err) s.errors++;
      s.pts.push({ x: rx[0], y: rx[1], err, age: 0 });
    }
    s.pts.forEach((p) => (p.age += dt));
    s.pts = s.pts.filter((p) => p.age < 2.2);

    // plot
    const cx = 220, cy = 185, r = 150;
    ctx.fillStyle = "#0b1119";
    ctx.fillRect(cx - r - 20, cy - r - 20, 2 * r + 40, 2 * r + 40);
    ctx.strokeStyle = "#33445e";
    ctx.strokeRect(cx - r - 20, cy - r - 20, 2 * r + 40, 2 * r + 40);
    D.wire(ctx, [[cx - r - 20, cy], [cx + r + 20, cy]], "#243144", 1);
    D.wire(ctx, [[cx, cy - r - 20], [cx, cy + r + 20]], "#243144", 1);
    for (const p of s.pts) {
      const alpha = clamp(1 - p.age / 2.2, 0, 1);
      D.dot(ctx, cx + p.x * r * 0.85, cy - p.y * r * 0.85, 3, p.err ? `rgba(242,109,109,${alpha})` : `rgba(71,194,107,${alpha * 0.75})`);
    }
    for (const p of C.points) {
      const x = cx + p[0] * r * 0.85, y = cy - p[1] * r * 0.85;
      D.wire(ctx, [[x - 6, y], [x + 6, y]], D.COL.accent, 2);
      D.wire(ctx, [[x, y - 6], [x, y + 6]], D.COL.accent, 2);
    }
    D.label(ctx, `${C.name} — ${C.points.length} symbols, ${C.bits} bit${C.bits > 1 ? "s" : ""} each`, cx, cy + r + 34, { color: D.COL.accent, size: 12, bold: true });

    const ser = s.sent ? s.errors / s.sent : 0;
    D.meter(ctx, 480, 60, 190, "bits per symbol", String(C.bits), D.COL.accent);
    D.meter(ctx, 690, 60, 180, "symbols received", String(s.sent), D.COL.muted);
    D.meter(ctx, 480, 130, 190, "symbol errors", `${s.errors}  (${(ser * 100).toFixed(2)} %)`, ser > 0.02 ? D.COL.bad : D.COL.good);
    D.meter(
      ctx,
      690,
      130,
      180,
      "good throughput",
      `${(C.bits * (1 - ser)).toFixed(2)} bits/sym`,
      D.COL.amber
    );
    D.meter(
      ctx,
      480,
      200,
      390,
      "the trade",
      mod === "qam16"
        ? "dense packing: fast in clean air, fragile in noise"
        : mod === "bpsk"
          ? "two far-apart symbols: slow but nearly unkillable"
          : "the balanced middle — Wi-Fi's workhorse family",
      D.COL.accent
    );
    D.label(ctx, "your Wi-Fi renegotiates this choice every moment, per link quality", 675, 290, { color: "rgba(148,163,179,0.6)", size: 11 });
  };

  return (
    <>
      <SimCanvas width={900} height={380} draw={draw} />
      <Controls>
        <Segmented<ModName>
          label="Modulation"
          value={mod}
          onChange={(m) => { setMod(m); resetStats(); }}
          options={(Object.keys(CONSTELLATIONS) as ModName[]).map((k) => ({ value: k, label: CONSTELLATIONS[k].name }))}
        />
        <Slider label="Channel noise" min={0} max={0.35} step={0.01} value={noise} onChange={setNoise} fmt={(v) => v.toFixed(2)} />
        <div className="ctl-row">
          <label>Statistics</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={resetStats}>↺ Reset counters</button>
          </div>
        </div>
      </Controls>
      <Readouts>
        <Readout label="A symbol is an I/Q point" value="the transmitter parks the phasor (18.2) at agreed positions; each position spells several bits" tone="amber" />
        <Readout label="Try this" value="Noise at 0.20: BPSK barely blinks, 16-QAM bleeds errors. Now you know why your Wi-Fi slows down far from the router." />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 18.4 — Capstone twin: the waterfall receiver
 * ===================================================================== */

const WF_STATIONS = [
  { f: 91.0, name: "FM 91.0 “Kultur”", width: 0.18, a: 0.75 },
  { f: 98.5, name: "FM 98.5 “Rock”", width: 0.18, a: 1.0 },
  { f: 104.3, name: "FM 104.3 “Jazz”", width: 0.18, a: 0.6 },
];
const MORSE_F = 95.2;
const BURST_F = 106.8;
// "SOS" keying: 1 = carrier on
const MORSE_PATTERN = "101010001110111011100010101000000000";

export function WaterfallLab() {
  const [tune, setTune] = useState(98.5);
  const sim = useRef<{ t: number; off: HTMLCanvasElement | null; burstUntil: number; morseText: string; lastSym: number }>({
    t: 0,
    off: null,
    burstUntil: -1,
    morseText: "",
    lastSym: -1,
  });

  const F_MIN = 88, F_MAX = 108;
  const BINS = 300;

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    s.t += dt;
    if (!s.off) {
      s.off = document.createElement("canvas");
      s.off.width = BINS;
      s.off.height = 170;
    }
    const off = s.off;
    const octx = off.getContext("2d")!;

    // random keyfob bursts
    if (s.t > s.burstUntil && Math.random() < 0.004) s.burstUntil = s.t + 0.5;
    const bursting = s.t < s.burstUntil;

    const morseIdx = Math.floor(s.t * 6) % MORSE_PATTERN.length;
    const morseOn = MORSE_PATTERN[morseIdx] === "1";

    // build one PSD row
    octx.drawImage(off, 0, 1);
    for (let b = 0; b < BINS; b++) {
      const f = F_MIN + (b / BINS) * (F_MAX - F_MIN);
      let p = Math.random() * 0.16; // noise floor
      for (const st of WF_STATIONS) {
        const fade = 0.75 + 0.25 * Math.sin(s.t * 0.4 + st.f);
        p += st.a * fade * Math.exp(-((f - st.f) ** 2) / (2 * st.width ** 2));
      }
      if (morseOn) p += 0.9 * Math.exp(-((f - MORSE_F) ** 2) / (2 * 0.03 ** 2));
      if (bursting) p += 0.8 * Math.exp(-((f - BURST_F) ** 2) / (2 * 0.12 ** 2));
      const v = clamp(p, 0, 1.2) / 1.2;
      const rC = Math.floor(clamp(v * 3 - 1.4, 0, 1) * 255);
      const gC = Math.floor(clamp(v * 2.2 - 0.35, 0, 1) * 255);
      const bC = Math.floor(clamp(v * 3, 0, 1) * 160 + 40);
      octx.fillStyle = `rgb(${rC},${gC},${bC})`;
      octx.fillRect(b, 0, 1, 1);
    }

    // paint waterfall scaled
    const wx = 30, wy = 96, ww = 840, wh = 220;
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(off, wx, wy, ww, wh);
    ctx.strokeStyle = "#33445e";
    ctx.strokeRect(wx, wy, ww, wh);
    D.label(ctx, "newest rows arrive at the TOP — the waterfall remembers the last ~3 s", wx + 170, wy + wh + 14, { color: D.COL.muted, size: 10 });

    // live spectrum trace on top
    ctx.strokeStyle = D.COL.accent;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let b = 0; b < BINS; b++) {
      const f = F_MIN + (b / BINS) * (F_MAX - F_MIN);
      let p = 0.05;
      for (const st of WF_STATIONS) p += st.a * Math.exp(-((f - st.f) ** 2) / (2 * st.width ** 2));
      if (morseOn) p += 0.9 * Math.exp(-((f - MORSE_F) ** 2) / (2 * 0.03 ** 2));
      if (bursting) p += 0.8 * Math.exp(-((f - BURST_F) ** 2) / (2 * 0.12 ** 2));
      const x = wx + (b / BINS) * ww;
      const y = 88 - clamp(p, 0, 1.1) * 55;
      if (b === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // tuning cursor
    const tx = wx + ((tune - F_MIN) / (F_MAX - F_MIN)) * ww;
    D.wire(ctx, [[tx, 26], [tx, wy + wh]], "rgba(246,178,107,0.8)", 1.5);
    D.label(ctx, `▼ ${tune.toFixed(1)} MHz`, tx, 18, { color: D.COL.amber, size: 11, bold: true });

    // receiver output
    const station = WF_STATIONS.find((st) => Math.abs(st.f - tune) < 0.25);
    let heard = "…static…";
    let tone = D.COL.muted;
    if (station) {
      heard = `♪ ${station.name} — demodulating FM`;
      tone = D.COL.good;
    } else if (Math.abs(tune - MORSE_F) < 0.15) {
      const sym = Math.floor(s.t * 6);
      if (sym !== s.lastSym) {
        s.lastSym = sym;
        s.morseText = (s.morseText + (morseOn ? "▮" : "·")).slice(-40);
      }
      heard = `beacon keying:  ${s.morseText}`;
      tone = D.COL.amber;
    } else if (Math.abs(tune - BURST_F) < 0.3) {
      heard = bursting ? "📡 digital burst — a keyfob just spoke!" : "quiet… press a car key (wait for a burst)";
      tone = bursting ? D.COL.accent : D.COL.muted;
    }
    D.meter(ctx, 30, 330, 620, "receiver output at the cursor", heard, tone);
    D.meter(ctx, 665, 330, 205, "band", "88–108 MHz (FM broadcast)", D.COL.muted);
  };

  return (
    <>
      <SimCanvas width={900} height={390} draw={draw} />
      <Controls>
        <Slider label="Tuning" min={F_MIN} max={F_MAX} step={0.1} value={tune} onChange={setTune} fmt={(v) => `${v.toFixed(1)} MHz`} />
      </Controls>
      <Readouts>
        <Readout label="Reading a waterfall" value="x = frequency, y = the recent past, brightness = energy — wide stripes are FM voices, dots-and-dashes are keying, sudden smears are digital bursts" tone="amber" />
        <Readout label="On the real dongle" value="this exact view, but every signal is real: your city's FM, aircraft, your own car key at 433 MHz" />
      </Readouts>
    </>
  );
}
