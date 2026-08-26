"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, PickSlider, Readout, Readouts, Segmented } from "@/spark/components/controls";
import { clamp, fmtSI } from "@/spark/lib/sim/helpers";
import * as D from "@/spark/lib/sim/draw";
import LiveScope from "./LiveScope";

/*
 * The master-capstone digital twin: a Pico ADC "oscilloscope" pointed at the
 * signals of the course's three earlier builds. True signal in grey; what your
 * samples reconstruct in amber. Under-sample the fast ones and Unit 13's
 * aliasing appears exactly where it will in real life.
 */

type Source = "rc" | "sawtooth" | "pwm" | "dusk";

const SOURCES: Record<
  Source,
  { name: string; span: number; peak: number; fn: (t: number) => number; expect: string }
> = {
  rc: {
    name: "RC charge (Lesson 2.3, for real)",
    span: 6,
    peak: 9,
    fn: (t) => {
      const x = t % 6;
      return x < 5 ? 9 * (1 - Math.exp(-x / 1)) : 9 * Math.exp(-(x - 5) / 0.08);
    },
    expect: "63% (5.7 V) at t = τ = 1 s — measure it yourself this time",
  },
  sawtooth: {
    name: "Blinker capacitor (555 pins 2+6)",
    span: 2,
    peak: 9,
    fn: (t) => {
      const T = 0.66;
      const x = ((t % T) + T) % T;
      const th = 0.336; // charge fraction of the period
      return x < th ? 3 + 3 * (1 - Math.exp((-x / th) * 1.1)) * 1.45 : 6 * Math.exp((-(x - th) / (T - th)) * 0.72);
    },
    expect: "the sawtooth between ⅓ and ⅔ of 9 V at ~1.5 Hz — the exact trace the simulator promised",
  },
  pwm: {
    name: "PWM dimmer output (pin 3)",
    span: 0.05,
    peak: 9,
    fn: (t) => {
      const T = 1 / 1400;
      return ((t % T) + T) % T < T * 0.3 ? 9 : 0;
    },
    expect: "a 1.4 kHz square at 30% duty — needs your fastest sample rate (Nyquist!)",
  },
  dusk: {
    name: "Night-light divider at dusk (GP26)",
    span: 20,
    peak: 3.3,
    fn: (t) => {
      const x = t % 20;
      const s = 1 / (1 + Math.exp((x - 10) / 1.6));
      return 0.3 + 2.6 * s + Math.sin(t * 13.7) * 0.06;
    },
    expect: "a slow, slightly noisy slide from bright to dark — your ADC lesson's staircase will chew it happily",
  },
};

const RATES = [50, 200, 1000, 5000, 20000];

export function ScopeTwinLab() {
  const [view, setView] = useState<"twin" | "live">("twin");
  const [source, setSource] = useState<Source>("sawtooth");
  const [rateIdx, setRateIdx] = useState(2);
  const [probe, setProbe] = useState<"direct" | "divider">("divider");
  const sim = useRef({ phase: 0 });

  const src = SOURCES[source];
  const fs = RATES[rateIdx];
  const samplesInWindow = Math.floor(src.span * fs);
  const needsDivider = src.peak > 3.3;

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    s.phase += dt * src.span * 0.03;

    const px = 20, py = 20, pw = 860, ph = 280;
    const vMax = 10;
    const seen = (v: number) => {
      const scaled = probe === "divider" ? v / 3 : v;
      return clamp(scaled, 0, 3.3) * (probe === "divider" ? 3 : 1);
    };

    ctx.fillStyle = "#0b1119";
    ctx.fillRect(px, py, pw, ph);
    ctx.strokeStyle = "#33445e";
    ctx.strokeRect(px, py, pw, ph);
    const mapX = (t: number) => px + (t / src.span) * pw;
    const mapY = (v: number) => py + ph - 10 - (v / vMax) * (ph - 30);

    // true signal
    ctx.strokeStyle = "#44536a";
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    for (let i = 0; i <= 900; i++) {
      const t = (i / 900) * src.span;
      const y = mapY(src.fn(t + s.phase));
      if (i === 0) ctx.moveTo(mapX(t), y);
      else ctx.lineTo(mapX(t), y);
    }
    ctx.stroke();

    // what the Pico records — decimated (never truncated) so the whole window is covered
    const total = samplesInWindow;
    const stride = Math.max(1, Math.ceil(total / 2000));
    ctx.strokeStyle = D.COL.amber;
    ctx.lineWidth = 2;
    ctx.beginPath();
    let clipped = false;
    let first = true;
    for (let i = 0; i <= total; i += stride) {
      const t = i / fs;
      if (t > src.span) break;
      const raw = src.fn(t + s.phase);
      const v = seen(raw);
      if (probe === "direct" && raw > 3.3) clipped = true;
      const y = mapY(v);
      if (first) {
        ctx.moveTo(mapX(t), y);
        first = false;
      } else {
        ctx.lineTo(mapX(t), y);
      }
      if (total <= 260) D.dot(ctx, mapX(t), y, 3, D.COL.amber);
    }
    ctx.stroke();
    D.label(ctx, "true signal", px + 60, py + 16, { color: "#5a6b7d", size: 12, bold: true });
    D.label(ctx, "your Pico's reconstruction", px + 130, py + 34, { color: D.COL.amber, size: 12, bold: true });
    D.label(ctx, `${fmtSI(src.span / 6, "s", 2)}/div`, px + pw - 50, py + ph - 8, { color: D.COL.muted, size: 11 });

    if (clipped) {
      D.label(ctx, "⚠ CLIPPED at 3.3 V — and above ~3.6 V you'd damage the pin. Use the divider probe!", px + pw / 2, py + ph + 16, {
        color: D.COL.bad,
        size: 13,
        bold: true,
      });
    }

    const nyquistBad = source === "pwm" && fs < 2800;
    D.meter(ctx, 20, 330, 200, "sample rate", `${fmtSI(fs, "Hz")} · ${samplesInWindow > 4000 ? ">4k" : samplesInWindow} samples`, D.COL.amber);
    D.meter(
      ctx,
      235,
      330,
      200,
      "probe",
      probe === "divider" ? "3:1 divider (safe)" : "direct (3.3 V max!)",
      probe === "divider" ? D.COL.good : needsDivider ? D.COL.bad : D.COL.muted
    );
    D.meter(
      ctx,
      450,
      330,
      420,
      "verdict",
      nyquistBad
        ? "undersampled! the 1.4 kHz PWM aliases into a slow phantom (Lesson 13.1)"
        : clipped
          ? "voltage out of range — fix the probe before trusting anything"
          : "faithful capture ✓ — compare against what the course predicted",
      nyquistBad || clipped ? D.COL.bad : D.COL.good
    );
  };

  const modeToggle = (
    <Controls>
      <Segmented
        label="Mode"
        value={view}
        onChange={(v) => setView(v as "twin" | "live")}
        options={[
          { value: "twin", label: "Digital twin (simulation)" },
          { value: "live", label: "🔴 LIVE — your real Pico (Web Serial)" },
        ]}
      />
    </Controls>
  );

  if (view === "live") {
    return (
      <>
        {modeToggle}
        <LiveScope />
      </>
    );
  }

  return (
    <>
      {modeToggle}
      <SimCanvas width={900} height={390} draw={draw} />
      <Controls>
        <Segmented<Source>
          label="Probe target"
          value={source}
          onChange={setSource}
          options={(Object.keys(SOURCES) as Source[]).map((k) => ({ value: k, label: SOURCES[k].name }))}
        />
        <PickSlider label="Sample rate" values={RATES} index={rateIdx} onChange={setRateIdx} fmt={(v) => fmtSI(v, "Hz")} />
        <Segmented
          label="Probe wiring"
          value={probe}
          onChange={setProbe}
          options={[
            { value: "divider", label: "3:1 divider probe (safe)" },
            { value: "direct", label: "Direct wire" },
          ]}
        />
      </Controls>
      <Readouts>
        <Readout label="What to expect on the real thing" value={src.expect || "a 1.4 kHz square — needs your fastest sampling"} tone="amber" />
        <Readout label="Full circle" value="33 lessons of simulated scopes — this one you will hold in your hand" />
      </Readouts>
    </>
  );
}
