"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider } from "@/vector/components/controls";
import { clamp } from "@/vector/lib/sim/helpers";
import * as D from "@/vector/lib/sim/draw";

/* =====================================================================
 * Lab 1.1 — Force vs. cart: F = ma with a friction dial. Net force is
 * the only thing the cart ever feels.
 * ===================================================================== */

export function ForceCartLab() {
  const [force, setForce] = useState(40);
  const [mass, setMass] = useState(20);
  const [friction, setFriction] = useState(10);

  const net = force - friction;
  const a = net / mass;
  // velocity after 3 s of this net force, from rest — a concrete number to read
  const v3 = Math.max(0, a * 3);

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const trackY = 250;
    D.wire(ctx, [[30, trackY], [870, trackY]], "#33445e", 3);

    // cart, drifting at a speed suggestive of the acceleration
    const cx = 180 + ((t * clamp(a, 0, 6) * 30) % 540);
    const w = 60 + mass;
    ctx.fillStyle = D.COL.accent;
    ctx.fillRect(cx - w / 2, trackY - 44, w, 36);
    D.dot(ctx, cx - w / 4, trackY - 6, 8, "#101825");
    D.dot(ctx, cx + w / 4, trackY - 6, 8, "#101825");
    D.label(ctx, `${mass} kg`, cx, trackY - 26, { size: 12, bold: true, color: "#06231f" });

    // force arrows
    const fScale = 1.1;
    if (force > 0) {
      D.wire(ctx, [[cx + w / 2, trackY - 26], [cx + w / 2 + force * fScale, trackY - 26]], D.COL.good, 4);
      D.label(ctx, `push ${force} N`, cx + w / 2 + force * fScale + 8, trackY - 26, { align: "left", size: 11, color: D.COL.good });
    }
    if (friction > 0) {
      D.wire(ctx, [[cx - w / 2, trackY - 12], [cx - w / 2 - friction * fScale, trackY - 12]], D.COL.bad, 4);
      D.label(ctx, `friction ${friction} N`, cx - w / 2 - friction * fScale - 8, trackY - 12, { align: "right", size: 11, color: D.COL.bad });
    }

    // the ledger
    D.panel(ctx, 300, 300, 300, 80);
    D.label(ctx, `net = ${force} − ${friction} = ${net} N`, 450, 328, { size: 13, mono: true, color: net === 0 ? D.COL.muted : D.COL.accent });
    D.label(ctx, `a = net / m = ${a.toFixed(2)} m/s²`, 450, 358, { size: 13, mono: true, bold: true, color: net === 0 ? D.COL.muted : D.COL.amber });

    if (net < 0) {
      D.label(ctx, "friction exceeds the push — a real cart would sit still", 450, 90, { size: 12, color: D.COL.bad });
    } else if (net === 0) {
      D.label(ctx, "net zero: whatever velocity it has, it keeps", 450, 90, { size: 12, bold: true, color: D.COL.good });
    }

    D.meter(ctx, 20, 8, 180, "net force", `${net} N`, net === 0 ? D.COL.muted : D.COL.accent);
    D.meter(ctx, 210, 8, 200, "acceleration", `${a.toFixed(2)} m/s²`, D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} label="A cart with push and friction force arrows and the resulting acceleration" />
      <Controls>
        <Slider label="Push force" min={0} max={100} step={5} value={force} onChange={setForce} fmt={(v) => `${v} N`} />
        <Slider label="Mass" min={5} max={80} step={5} value={mass} onChange={setMass} fmt={(v) => `${v} kg`} />
        <Slider label="Friction" min={0} max={60} step={5} value={friction} onChange={setFriction} fmt={(v) => `${v} N`} />
      </Controls>
      <Readouts>
        <Readout label="Net force" value={`${net} N`} tone={net === 0 ? undefined : "amber"} />
        <Readout label="Acceleration" value={`${a.toFixed(2)} m/s²`} tone="good" />
        <Readout label="Speed after 3 s (from rest)" value={net > 0 ? `${v3.toFixed(1)} m/s` : "0 — it never budged"} />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 1.2 — The tilt test: raise the board until static friction gives
 * up. The slip angle hands you µ on a protractor.
 * ===================================================================== */

const SURFACES = {
  rubber: { mu: 0.8, label: "rubber on wood" },
  wood: { mu: 0.45, label: "wood on wood" },
  ice: { mu: 0.08, label: "steel on ice" },
} as const;

export function InclineLab() {
  const [angle, setAngle] = useState(10);
  const [surface, setSurface] = useState<keyof typeof SURFACES>("wood");

  const mu = SURFACES[surface].mu;
  const slipAngle = (Math.atan(mu) * 180) / Math.PI;
  const slipping = angle > slipAngle;
  const rad = (angle * Math.PI) / 180;
  // per kilogram, g = 9.81: slope pull vs friction ceiling
  const pull = 9.81 * Math.sin(rad);
  const frictionMax = mu * 9.81 * Math.cos(rad);

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const px = 120;
    const py = 330;
    const len = 520;

    // board
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(-rad);
    D.wire(ctx, [[0, 0], [len, 0]], "#8b97a7", 4);
    // block: slides off when slipping
    const slide = slipping ? (t * 90) % (len - 80) : 0;
    const bx = len - 90 - slide;
    ctx.fillStyle = slipping ? D.COL.bad : D.COL.accent;
    ctx.fillRect(bx, -34, 64, 30);
    ctx.restore();

    // base + angle arc
    D.wire(ctx, [[px, py], [px + len, py]], "#33445e", 2);
    ctx.strokeStyle = D.COL.amber;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(px, py, 70, -rad, 0);
    ctx.stroke();
    D.label(ctx, `${angle.toFixed(0)}°`, px + 95, py - 18, { size: 14, bold: true, color: D.COL.amber });

    // the two competing forces (per kg)
    D.panel(ctx, 660, 60, 220, 190);
    D.label(ctx, "per kilogram", 770, 84, { color: D.COL.muted, size: 11 });
    D.label(ctx, "slope pull", 770, 116, { size: 11, color: D.COL.bad });
    D.barGauge(ctx, 684, 128, 172, 14, clamp(pull / 9.81, 0, 1), D.COL.bad, "");
    D.label(ctx, `${pull.toFixed(2)} N`, 770, 160, { size: 12, mono: true, color: D.COL.bad });
    D.label(ctx, "friction ceiling", 770, 188, { size: 11, color: D.COL.good });
    D.barGauge(ctx, 684, 200, 172, 14, clamp(frictionMax / 9.81, 0, 1), D.COL.good, "");
    D.label(ctx, `${frictionMax.toFixed(2)} N`, 770, 232, { size: 12, mono: true, color: D.COL.good });

    D.label(
      ctx,
      slipping ? "friction lost — it slides" : "static friction holds, matching the pull exactly",
      420,
      60,
      { size: 13, bold: true, color: slipping ? D.COL.bad : D.COL.good }
    );

    D.meter(ctx, 20, 8, 200, "slip angle", `${slipAngle.toFixed(1)}°`, D.COL.amber);
    D.meter(ctx, 230, 8, 200, "µ = tan(slip angle)", mu.toFixed(2), D.COL.accent);
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} label="A block on a tilting board with slope pull versus friction ceiling" />
      <Controls>
        <Slider label="Board angle" min={0} max={60} step={0.5} value={angle} onChange={setAngle} fmt={(v) => `${v.toFixed(1)}°`} />
        <Segmented
          label="Surfaces"
          options={Object.entries(SURFACES).map(([k, s]) => ({ value: k as keyof typeof SURFACES, label: s.label }))}
          value={surface}
          onChange={setSurface}
        />
      </Controls>
      <Readouts>
        <Readout label="Status" value={slipping ? "sliding" : "holding"} tone={slipping ? "warn" : "good"} />
        <Readout label="Slip angle" value={`${slipAngle.toFixed(1)}°`} tone="amber" />
        <Readout label="µ from the protractor" value={`tan ${slipAngle.toFixed(1)}° = ${mu.toFixed(2)}`} />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 1.3 — Newton's cannonball: launch sideways from a mountain and
 * find every fate — thud, circle, ellipse, escape.
 * ===================================================================== */

export function OrbitLab() {
  const [speed, setSpeed] = useState(6.0); // km/s

  // scaled two-body integration: planet radius 90 px, GM chosen so that
  // circular speed at the mountain top (r = 100) is 7.9 "km/s"
  const R = 90;
  const r0 = 100;
  const GM = 7.9 * 7.9 * r0; // v_circ² · r
  const vEsc = Math.sqrt((2 * GM) / r0);

  const path = (() => {
    const pts: Array<[number, number]> = [];
    let x = 0;
    let y = -r0;
    let vx = speed;
    let vy = 0;
    const dt = 0.02;
    let crashed = false;
    for (let i = 0; i < 4200; i++) {
      const r = Math.hypot(x, y);
      if (r < R) {
        crashed = true;
        break;
      }
      if (r > 1200) break;
      const acc = -GM / (r * r);
      vx += ((acc * x) / r) * dt;
      vy += ((acc * y) / r) * dt;
      x += vx * dt;
      y += vy * dt;
      if (i % 4 === 0) pts.push([x, y]);
    }
    return { pts, crashed };
  })();

  const fate = path.crashed
    ? "crashes"
    : speed >= vEsc
      ? "escapes"
      : Math.abs(speed - 7.9) < 0.15
        ? "circular orbit"
        : "elliptical orbit";

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const cx = 450;
    const cy = 210;
    const scale = 0.9;

    // planet + mountain
    ctx.fillStyle = "#14304a";
    ctx.beginPath();
    ctx.arc(cx, cy, R * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#3b6ea5";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#3b6ea5";
    ctx.beginPath();
    ctx.moveTo(cx - 8, cy - R * scale + 2);
    ctx.lineTo(cx, cy - r0 * scale);
    ctx.lineTo(cx + 8, cy - R * scale + 2);
    ctx.fill();

    // path
    ctx.strokeStyle = fate === "crashes" ? D.COL.bad : fate === "escapes" ? D.COL.amber : D.COL.accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    path.pts.forEach(([x, y], i) => {
      const px = cx + x * scale;
      const py = cy + y * scale;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();

    // cannonball riding the path
    if (path.pts.length > 1) {
      const idx = Math.floor((t * 30) % path.pts.length);
      const [bx, by] = path.pts[idx];
      D.dot(ctx, cx + bx * scale, cy + by * scale, 6, "#ffffff");
    }

    D.label(ctx, fate, cx, 46, {
      size: 15,
      bold: true,
      color: fate === "crashes" ? D.COL.bad : fate === "escapes" ? D.COL.amber : D.COL.good,
    });

    D.panel(ctx, 690, 250, 190, 130);
    D.label(ctx, "the speeds", 785, 274, { color: D.COL.muted, size: 11 });
    D.label(ctx, "circular: 7.9", 785, 306, { size: 12, mono: true, color: D.COL.accent });
    D.label(ctx, `escape: ${vEsc.toFixed(1)}`, 785, 332, { size: 12, mono: true, color: D.COL.amber });
    D.label(ctx, "(km/s)", 785, 358, { size: 10, color: D.COL.muted });

    D.meter(ctx, 20, 8, 200, "launch speed", `${speed.toFixed(1)} km/s`, D.COL.accent);
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} label="Newton's cannonball fired from a mountain at adjustable speed" />
      <Controls>
        <Slider label="Launch speed" min={2} max={12} step={0.1} value={speed} onChange={setSpeed} fmt={(v) => `${v.toFixed(1)} km/s`} />
      </Controls>
      <Readouts>
        <Readout label="Fate" value={fate} tone={fate === "crashes" ? "warn" : fate === "escapes" ? "amber" : "good"} />
        <Readout label="Circular speed" value="7.9 km/s" />
        <Readout label="Escape speed" value={`${vEsc.toFixed(1)} km/s`} tone="amber" />
        <Readout label="An orbit is" value="falling, aimed to keep missing" />
      </Readouts>
    </>
  );
}
