"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider } from "@/vector/components/controls";
import { tl as translate } from "@/vector/lib/labStrings";
import * as D from "@/vector/lib/sim/draw";

/* =====================================================================
 * Lab 4.1 — The wave machine: v = f·λ with a bead that tells the truth
 * about what travels and what doesn't.
 * ===================================================================== */

const MEDIA = {
  rope: { v: 4, label: "slack rope (4 m/s)" },
  taut: { v: 12, label: "taut rope (12 m/s)" },
  spring: { v: 24, label: "steel spring (24 m/s)" },
} as const;

export function WaveLab() {
  const [freq, setFreq] = useState(1.0);
  const [medium, setMedium] = useState<keyof typeof MEDIA>("taut");

  const v = MEDIA[medium].v;
  const lambda = v / freq;

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const gx = 60;
    const gy = 90;
    const gw = 780;
    const midY = gy + 90;
    const amp = 52;
    const pxPerM = 26;

    D.panel(ctx, gx - 20, gy - 10, gw + 40, 200, "#0a1420");

    // the travelling wave
    ctx.strokeStyle = D.COL.accent;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let px = 0; px <= gw; px += 3) {
      const xm = px / pxPerM;
      const y = midY - amp * Math.sin(((2 * Math.PI) / lambda) * (xm - v * t));
      if (px === 0) ctx.moveTo(gx + px, y);
      else ctx.lineTo(gx + px, y);
    }
    ctx.stroke();

    // the honest bead: fixed x, only bobs
    const beadXm = gw / 2 / pxPerM;
    const beadY = midY - amp * Math.sin(((2 * Math.PI) / lambda) * (beadXm - v * t));
    D.dot(ctx, gx + gw / 2, beadY, 8, D.COL.bad);
    D.label(ctx, "this bead only bobs", gx + gw / 2, gy + 210, { size: 11, color: D.COL.bad });

    // wavelength bracket
    const lamPx = Math.min(lambda * pxPerM, gw - 40);
    D.wire(ctx, [[gx + 20, gy + 4], [gx + 20 + lamPx, gy + 4]], D.COL.amber, 2);
    D.label(ctx, `λ = ${lambda.toFixed(2)} m`, gx + 20 + lamPx / 2, gy - 8, { size: 11, color: D.COL.amber });

    D.meter(ctx, 20, 8, 170, "frequency", `${freq.toFixed(1)} Hz`, D.COL.accent);
    D.meter(ctx, 200, 8, 170, "medium speed", `${v} m/s`, D.COL.good);
    D.meter(ctx, 380, 8, 190, "wavelength v/f", `${lambda.toFixed(2)} m`, D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={330} draw={draw} label="A travelling wave with adjustable frequency and medium, and a bobbing bead" />
      <Controls>
        <Slider label="Frequency" min={0.3} max={4} step={0.1} value={freq} onChange={setFreq} fmt={(v2) => `${v2.toFixed(1)} Hz`} />
        <Segmented
          label="Medium"
          options={Object.entries(MEDIA).map(([k, m]) => ({ value: k as keyof typeof MEDIA, label: m.label }))}
          value={medium}
          onChange={setMedium}
        />
      </Controls>
      <Readouts>
        <Readout label="v = f · λ" value={`${freq.toFixed(1)} × ${lambda.toFixed(2)} = ${v} m/s`} tone="good" />
        <Readout label="Speed belongs to" value="the medium, not the source" tone="amber" />
        <Readout label="What travels" value="the pattern — the rope stays home" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 4.2 — The siren flyby: wavefronts crowd ahead of a moving source
 * and stretch behind it. The eeee-yooow, drawn honestly.
 * ===================================================================== */

export function DopplerLab() {
  const [speed, setSpeed] = useState(120); // km/h
  const V_SOUND = 343;

  const vms = speed / 3.6;
  const f0 = 700;
  const fApproach = f0 * (V_SOUND / (V_SOUND - Math.min(vms, V_SOUND - 1)));
  const fRecede = f0 * (V_SOUND / (V_SOUND + vms));

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const midY = 200;
    const px = 130 + ((t * 60) % 640);

    // road + listener
    D.wire(ctx, [[20, midY + 60], [880, midY + 60]], "#33445e", 2);
    D.label(ctx, "🧍", 780, midY + 44, { size: 18 });
    D.label(ctx, translate("listener"), 780, midY + 84, { size: 10, color: D.COL.muted });

    // wavefronts: circles emitted at regular intervals from past positions
    for (let k = 1; k <= 9; k++) {
      const dtEmit = k * 0.28;
      const emitX = px - vms * dtEmit * 0.63; // scaled source history
      const r = V_SOUND * dtEmit * 0.2;
      if (r > 400) continue;
      D.ring(ctx, emitX, midY, r, `rgba(45,212,191,${Math.max(0.08, 0.5 - k * 0.05)})`, 1.5);
    }

    // the vehicle
    D.label(ctx, "🚑", px, midY, { size: 22 });
    D.wire(ctx, [[px + 16, midY + 14], [px + 16 + vms * 0.5, midY + 14]], D.COL.amber, 3);

    D.label(ctx, "crests crowded ahead — higher pitch", px + 150, midY - 90, { size: 11, color: D.COL.good });
    D.label(ctx, "stretched behind — lower pitch", Math.max(px - 150, 110), midY + 110, { size: 11, color: D.COL.bad });

    if (vms > V_SOUND * 0.85) {
      D.label(ctx, "approaching the speed of sound — the crests pile into a wall", 450, 60, {
        size: 12,
        bold: true,
        color: D.COL.amber,
      });
    }

    D.meter(ctx, 20, 8, 190, "heard approaching", `${fApproach.toFixed(0)} Hz`, D.COL.good);
    D.meter(ctx, 220, 8, 190, "heard receding", `${fRecede.toFixed(0)} Hz`, D.COL.bad);
    D.meter(ctx, 420, 8, 170, "siren itself", `${f0} Hz`, D.COL.muted);
  };

  return (
    <>
      <SimCanvas width={900} height={340} draw={draw} label="A moving siren's wavefronts crowding ahead and stretching behind" />
      <Controls>
        <Slider label="Vehicle speed" min={0} max={1100} step={10} value={speed} onChange={setSpeed} fmt={(v) => `${v} km/h`} />
      </Controls>
      <Readouts>
        <Readout label="Approaching" value={`${fApproach.toFixed(0)} Hz`} tone="good" />
        <Readout label="Receding" value={`${fRecede.toFixed(0)} Hz`} tone="warn" />
        <Readout label="Pitch drop at the pass" value={`${(fApproach - fRecede).toFixed(0)} Hz`} tone="amber" />
        <Readout label="Works for" value="sound, radar, starlight — any wave" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 4.3 — The string's family: sweep the driver and watch chaos snap
 * into standing waves at the harmonics — and only there.
 * ===================================================================== */

export function StandingWaveLab() {
  const [freq, setFreq] = useState(2.0);
  const [lengthPct, setLengthPct] = useState(100);

  const L = (lengthPct / 100) * 1.0; // metres
  const f1 = 2.0 / L; // fundamental of the full string is 2 Hz
  const nExact = freq / f1;
  const nNear = Math.round(nExact);
  const resonant = nNear >= 1 && Math.abs(nExact - nNear) < 0.045;

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const gx = 90;
    const midY = 170;
    const gw = 620 * (lengthPct / 100) + 80;
    const amp = resonant ? 60 : 14;

    D.panel(ctx, 50, 60, 760, 220, "#0a1420");
    // fixed ends
    D.dot(ctx, gx, midY, 6, "#8b97a7");
    D.dot(ctx, gx + gw, midY, 6, "#8b97a7");

    ctx.strokeStyle = resonant ? D.COL.accent : "rgba(139,151,167,0.7)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let px = 0; px <= gw; px += 3) {
      const u = px / gw;
      let y: number;
      if (resonant) {
        // clean standing wave: sin(nπx/L)·cos(ωt)
        y = midY - amp * Math.sin(nNear * Math.PI * u) * Math.cos(2 * Math.PI * freq * t);
      } else {
        // off-resonance mess: two mismatched trains
        y =
          midY -
          amp *
            (Math.sin(2 * Math.PI * (u * 3 - freq * t)) +
              Math.sin(2 * Math.PI * (u * 3 + freq * t * 0.93)));
      }
      if (px === 0) ctx.moveTo(gx + px, y);
      else ctx.lineTo(gx + px, y);
    }
    ctx.stroke();

    if (resonant) {
      // mark the nodes
      for (let k = 0; k <= nNear; k++) {
        D.dot(ctx, gx + (k / nNear) * gw, midY, 4, D.COL.amber);
      }
      D.label(ctx, `harmonic n = ${nNear} — ${nNear + 1} nodes, ${nNear} antinodes`, 430, 90, {
        size: 13,
        bold: true,
        color: D.COL.accent,
      });
    } else {
      D.label(ctx, "off resonance — the reflections cancel themselves into a murmur", 430, 90, {
        size: 12,
        color: D.COL.muted,
      });
    }

    D.meter(ctx, 20, 8, 190, "driving frequency", `${freq.toFixed(2)} Hz`, resonant ? D.COL.accent : D.COL.muted);
    D.meter(ctx, 220, 8, 190, "fundamental", `${f1.toFixed(2)} Hz`, D.COL.amber);
    D.meter(ctx, 420, 8, 220, "resonances at", `n × ${f1.toFixed(2)} Hz`, D.COL.good);
  };

  return (
    <>
      <SimCanvas width={900} height={330} draw={draw} label="A driven string snapping into standing waves at its harmonic frequencies" />
      <Controls>
        <Slider label="Driving frequency" min={0.5} max={12} step={0.05} value={freq} onChange={setFreq} fmt={(v) => `${v.toFixed(2)} Hz`} />
        <Slider label="String length" min={50} max={100} step={5} value={lengthPct} onChange={setLengthPct} fmt={(v) => `${v}%`} />
      </Controls>
      <Readouts>
        <Readout label="Status" value={resonant ? `standing wave, n = ${nNear}` : "not in the family"} tone={resonant ? "good" : undefined} />
        <Readout label="This string's family" value={`${f1.toFixed(2)}, ${(2 * f1).toFixed(2)}, ${(3 * f1).toFixed(2)}… Hz`} tone="amber" />
        <Readout label="Shorten the string" value="the whole family shifts up — that's fretting" />
      </Readouts>
    </>
  );
}
