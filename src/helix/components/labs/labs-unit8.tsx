"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider } from "@/helix/components/controls";
import { tl as translate } from "@/helix/lib/labStrings";
import * as D from "@/helix/lib/sim/draw";

/* =====================================================================
 * Lab 8.1 — The action potential: below threshold, a fading blip;
 * above it, a full spike of fixed size. Strength lives in the rate.
 * ===================================================================== */

const REST = -70;
const THRESHOLD = -55;
const PEAK = 40;
const REFRACTORY_MS = 4;

export function ActionPotentialLab() {
  const [strength, setStrength] = useState(10); // mV of depolarisation per stimulus
  const [rate, setRate] = useState(50); // stimuli per second

  // Deterministic trace over a 100 ms window, sampled every 0.25 ms.
  const trace = (() => {
    const dt = 0.25;
    const samples = 400;
    const interval = 1000 / rate;
    const out: number[] = [];
    const spikeTimes: number[] = [];
    let lastSpike = -Infinity;
    for (let p = 2; p < 100; p += interval) {
      if (strength >= THRESHOLD - REST && p - lastSpike >= REFRACTORY_MS) {
        spikeTimes.push(p);
        lastSpike = p;
      }
    }
    for (let i = 0; i < samples; i++) {
      const t = i * dt;
      let v = REST;
      // sub-threshold stimuli: a bump that decays away without travelling
      if (strength < THRESHOLD - REST) {
        for (let p = 2; p < 100; p += interval) {
          const dtp = t - p;
          if (dtp >= 0 && dtp < 8) v += strength * Math.exp(-dtp / 2.5);
        }
        v = Math.min(v, THRESHOLD - 0.5);
      }
      // spikes: a stereotyped waveform, identical every time
      for (const s of spikeTimes) {
        const dtp = t - s;
        if (dtp >= 0 && dtp < 1) v = REST + (PEAK - REST) * (dtp / 1);
        else if (dtp >= 1 && dtp < 3) v = PEAK - (PEAK + 80) * ((dtp - 1) / 2);
        else if (dtp >= 3 && dtp < 6) v = -80 + 10 * ((dtp - 3) / 3);
      }
      out.push(v);
    }
    return { out, spikes: spikeTimes.length };
  })();

  const spikesPerSecond = trace.spikes * 10; // 100 ms window → ×10
  const firing = strength >= THRESHOLD - REST;

  const draw = (ctx: CanvasRenderingContext2D) => {
    const gx = 70;
    const gy = 60;
    const gw = 640;
    const gh = 300;
    D.panel(ctx, gx, gy, gw, gh, "#0a1420");

    const mapY = (v: number) => gy + gh - ((v + 90) / 140) * gh;

    // reference lines
    const lines: Array<[number, string, string]> = [
      [REST, "resting −70 mV", D.COL.muted],
      [THRESHOLD, "threshold −55 mV", D.COL.amber],
      [PEAK, "peak +40 mV", D.COL.accent],
    ];
    for (const [v, text, color] of lines) {
      const y = mapY(v);
      ctx.setLineDash([6, 5]);
      D.wire(ctx, [[gx, y], [gx + gw, y]], color === D.COL.muted ? "rgba(139,151,167,0.4)" : color === D.COL.amber ? "rgba(246,178,107,0.5)" : "rgba(45,212,191,0.35)", 1.2);
      ctx.setLineDash([]);
      D.label(ctx, text, gx + gw - 10, y - 10, { align: "right", size: 10, color });
    }

    // the trace
    ctx.save();
    ctx.beginPath();
    ctx.rect(gx, gy, gw, gh);
    ctx.clip();
    ctx.strokeStyle = firing ? D.COL.accent : D.COL.amber;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    trace.out.forEach((v, i) => {
      const x = gx + (i / (trace.out.length - 1)) * gw;
      const y = mapY(v);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.restore();

    D.label(ctx, translate("Time") + " →  (100 ms)", gx + gw / 2, gy + gh + 22, { color: D.COL.muted, size: 11 });
    ctx.save();
    ctx.translate(gx - 28, gy + gh / 2);
    ctx.rotate(-Math.PI / 2);
    D.label(ctx, "membrane potential", 0, 0, { color: D.COL.muted, size: 11 });
    ctx.restore();

    if (!firing) {
      D.label(ctx, "below threshold — the bump fades, nothing travels", gx + gw / 2, gy + 24, { color: D.COL.amber, size: 12 });
    }

    // the rule, spelled out
    D.panel(ctx, 730, 60, 150, 300);
    D.label(ctx, "the rule", 805, 84, { color: D.COL.muted, size: 11 });
    D.label(ctx, "all", 805, 130, { size: 20, bold: true, color: D.COL.accent });
    D.label(ctx, "or", 805, 158, { size: 13, color: D.COL.muted });
    D.label(ctx, "nothing", 805, 186, { size: 20, bold: true, color: D.COL.bad });
    D.label(ctx, "spike height", 805, 250, { size: 10, color: D.COL.muted });
    D.label(ctx, "never varies", 805, 266, { size: 10, color: D.COL.muted });
    D.label(ctx, "rate does", 805, 296, { size: 12, bold: true, color: D.COL.amber });

    D.meter(ctx, 20, 8, 190, "Stimulus strength", `${strength} mV`, firing ? D.COL.accent : D.COL.amber);
    D.meter(ctx, 220, 8, 190, "spikes per second", String(firing ? spikesPerSecond : 0), D.COL.good);
  };

  return (
    <>
      <SimCanvas width={900} height={410} draw={draw} label="A neuron's membrane potential trace with stimuli and action potentials" />
      <Controls>
        <Slider label="Stimulus strength" min={2} max={30} step={1} value={strength} onChange={setStrength} fmt={(v) => `+${v} mV`} />
        <Slider label="Stimulus rate" min={10} max={400} step={10} value={rate} onChange={setRate} fmt={(v) => `${v}/s`} />
      </Controls>
      <Readouts>
        <Readout label="Reaches threshold" value={firing ? "yes" : "no"} tone={firing ? "good" : "warn"} />
        <Readout label="Spikes per second" value={firing ? spikesPerSecond : 0} tone="amber" />
        <Readout label="Spike height" value={firing ? "+40 mV, always" : "—"} />
        <Readout label="Rate ceiling (refractory)" value={`${Math.floor(1000 / REFRACTORY_MS)}/s`} />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 8.2 — The synapse as a voting machine: excitatory and inhibitory
 * inputs sum, and the threshold turns the tally into a decision.
 * ===================================================================== */

export function SynapseLab() {
  const [excite, setExcite] = useState(3);
  const [inhibit, setInhibit] = useState(1);
  const [drug, setDrug] = useState<"none" | "stimulant" | "sedative">("none");

  const EPSP = 4;
  const IPSP = 3;
  // a stimulant weakens inhibition; a sedative strengthens it (like GABA drugs)
  const inhibitFactor = drug === "stimulant" ? 0.5 : drug === "sedative" ? 2 : 1;
  const membrane = REST + excite * EPSP - inhibit * IPSP * inhibitFactor;
  const fires = membrane >= THRESHOLD;

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const sx = 300;
    const sy = 210;

    // dendrite inputs: green excitatory above, red inhibitory below
    for (let i = 0; i < 8; i++) {
      const angle = -0.9 + (i / 7) * 1.8;
      const on = i < excite;
      const x = sx - 150 + Math.cos(angle) * -70;
      const y = sy + Math.sin(angle) * 120;
      D.wire(ctx, [[x, y], [sx - 40, sy + Math.sin(angle) * 26]], on ? "rgba(71,194,107,0.8)" : "rgba(71,194,107,0.18)", on ? 2.5 : 1.5);
      D.dot(ctx, x, y, on ? 7 : 5, on ? D.COL.good : "rgba(71,194,107,0.25)");
      if (on) D.label(ctx, "+", x, y, { size: 11, bold: true, color: "#06220e" });
    }
    for (let i = 0; i < 8; i++) {
      const angle = -0.7 + (i / 7) * 1.4;
      const on = i < inhibit;
      const x = sx - 40 + Math.cos(angle) * -150;
      const y = sy + 170 + Math.sin(angle) * 40;
      D.wire(ctx, [[x, y], [sx - 20, sy + 40]], on ? "rgba(242,109,109,0.8)" : "rgba(242,109,109,0.18)", on ? 2.5 : 1.5);
      D.dot(ctx, x, y, on ? 7 : 5, on ? D.COL.bad : "rgba(242,109,109,0.25)");
      if (on) D.label(ctx, "−", x, y, { size: 11, bold: true, color: "#2b0808" });
    }

    // soma
    ctx.beginPath();
    ctx.arc(sx, sy, 46, 0, Math.PI * 2);
    ctx.fillStyle = fires ? "rgba(45,212,191,0.30)" : "rgba(45,212,191,0.10)";
    ctx.fill();
    ctx.strokeStyle = D.COL.accent;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    D.label(ctx, `${membrane.toFixed(0)} mV`, sx, sy, { size: 15, bold: true, mono: true, color: fires ? D.COL.accent : D.COL.text });

    // axon, pulsing when firing
    const ax: Array<[number, number]> = [[sx + 46, sy], [sx + 260, sy]];
    D.wire(ctx, ax, fires ? D.COL.accent : "rgba(139,151,167,0.4)", fires ? 3 : 2);
    if (fires) {
      const p = (t * 1.6) % 1;
      D.dot(ctx, sx + 46 + p * 214, sy, 6, D.COL.accent);
      D.label(ctx, "spike travelling", sx + 150, sy - 22, { size: 11, color: D.COL.accent });
    } else {
      D.label(ctx, "silent", sx + 150, sy - 22, { size: 11, color: D.COL.muted });
    }

    // tally panel with membrane gauge
    const px = 620;
    D.panel(ctx, px, 60, 260, 300);
    D.label(ctx, "the tally", px + 130, 84, { color: D.COL.muted, size: 11 });
    const rows: Array<[string, string, string]> = [
      ["excitatory", `${excite} × +${EPSP} mV`, D.COL.good],
      ["inhibitory", `${inhibit} × −${(IPSP * inhibitFactor).toFixed(1)} mV`, D.COL.bad],
      ["resting", `${REST} mV`, D.COL.muted],
      ["sum", `${membrane.toFixed(1)} mV`, fires ? D.COL.accent : D.COL.text],
    ];
    rows.forEach(([k, v, c], i) => {
      const y = 116 + i * 30;
      D.label(ctx, k, px + 24, y, { align: "left", size: 12, color: D.COL.muted });
      D.label(ctx, v, px + 236, y, { align: "right", size: 12, mono: true, color: c });
    });
    const frac = Math.max(0, Math.min(1, (membrane + 90) / 50));
    D.barGauge(ctx, px + 24, 250, 212, 18, frac, fires ? D.COL.accent : D.COL.amber, "");
    D.label(ctx, "−90", px + 24, 288, { align: "left", size: 10, color: D.COL.muted });
    D.label(ctx, "threshold −55", px + 130, 288, { size: 10, color: D.COL.amber });
    D.label(ctx, "−40", px + 236, 288, { align: "right", size: 10, color: D.COL.muted });
    D.label(ctx, fires ? "FIRES" : "does not fire", px + 130, 330, { size: 14, bold: true, color: fires ? D.COL.accent : D.COL.muted });

    D.meter(ctx, 20, 8, 190, "Membrane", `${membrane.toFixed(0)} mV`, fires ? D.COL.accent : D.COL.amber);
    D.meter(ctx, 220, 8, 160, "decision", fires ? "spike" : "silence", fires ? D.COL.good : D.COL.muted);
  };

  return (
    <>
      <SimCanvas width={900} height={410} draw={draw} label="A neuron summing excitatory and inhibitory synaptic inputs" />
      <Controls>
        <Slider label="Excitatory inputs" min={0} max={8} step={1} value={excite} onChange={setExcite} fmt={(v) => String(v)} />
        <Slider label="Inhibitory inputs" min={0} max={8} step={1} value={inhibit} onChange={setInhibit} fmt={(v) => String(v)} />
        <Segmented
          label="Drug at the synapse"
          options={[
            { value: "none", label: "none" },
            { value: "stimulant", label: "stimulant" },
            { value: "sedative", label: "sedative" },
          ]}
          value={drug}
          onChange={setDrug}
        />
      </Controls>
      <Readouts>
        <Readout label="Membrane potential" value={`${membrane.toFixed(1)} mV`} tone={fires ? "good" : "amber"} />
        <Readout label="Decision" value={fires ? "fires" : "stays silent"} tone={fires ? "good" : "warn"} />
        <Readout label="Drug effect" value={drug === "stimulant" ? "inhibition halved" : drug === "sedative" ? "inhibition doubled" : "—"} />
      </Readouts>
    </>
  );
}
