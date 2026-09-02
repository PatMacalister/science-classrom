"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider } from "@/vector/components/controls";
import { clamp } from "@/vector/lib/sim/helpers";
import { tl as translate } from "@/vector/lib/labStrings";
import * as D from "@/vector/lib/sim/draw";

/* =====================================================================
 * Lab 0.1 — The motion grapher: set a velocity for each leg of the trip
 * and watch the position graph write itself. Slope is velocity, always.
 * ===================================================================== */

export function MotionGraphLab() {
  const [v1, setV1] = useState(2);
  const [v2, setV2] = useState(0);
  const [v3, setV3] = useState(-1);

  const SEG = 4; // seconds per leg
  const vAt = (t: number) => (t < SEG ? v1 : t < 2 * SEG ? v2 : v3);
  const xAt = (t: number) => {
    const t1 = Math.min(t, SEG);
    const t2 = clamp(t - SEG, 0, SEG);
    const t3 = clamp(t - 2 * SEG, 0, SEG);
    return v1 * t1 + v2 * t2 + v3 * t3;
  };
  const xEnd = xAt(3 * SEG);
  const xs = Array.from({ length: 121 }, (_, i) => xAt((i / 120) * 3 * SEG));
  const xMax = Math.max(2, ...xs.map(Math.abs));

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const gx = 70;
    const gy = 46;
    const gw = 560;
    const gh = 250;
    D.panel(ctx, gx, gy, gw, gh, "#0a1420");
    const mapX = (s: number) => gx + (s / (3 * SEG)) * gw;
    const mapY = (x: number) => gy + gh / 2 - (x / xMax) * (gh / 2 - 14);

    // zero line + leg boundaries
    D.wire(ctx, [[gx, mapY(0)], [gx + gw, mapY(0)]], "rgba(139,151,167,0.35)", 1);
    for (const s of [SEG, 2 * SEG]) {
      ctx.setLineDash([4, 6]);
      D.wire(ctx, [[mapX(s), gy], [mapX(s), gy + gh]], "rgba(139,151,167,0.3)", 1);
      ctx.setLineDash([]);
    }

    ctx.strokeStyle = D.COL.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    xs.forEach((x, i) => {
      const px = gx + (i / 120) * gw;
      const py = mapY(x);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();

    D.label(ctx, translate("Time") + " → (12 s)", gx + gw / 2, gy + gh + 20, { color: D.COL.muted, size: 11 });
    ctx.save();
    ctx.translate(gx - 34, gy + gh / 2);
    ctx.rotate(-Math.PI / 2);
    D.label(ctx, translate("Position"), 0, 0, { color: D.COL.muted, size: 11 });
    ctx.restore();

    // replaying cart, on a loop
    const tt = (t * 1.4) % (3 * SEG);
    const cartX = clamp(xAt(tt) / xMax, -1, 1);
    const trackY = 356;
    D.wire(ctx, [[gx, trackY], [gx + gw, trackY]], "#33445e", 2);
    D.label(ctx, "0", gx + gw / 2, trackY + 16, { size: 10, color: D.COL.muted });
    const cx = gx + gw / 2 + cartX * (gw / 2 - 30);
    ctx.fillStyle = D.COL.accent;
    ctx.fillRect(cx - 16, trackY - 18, 32, 14);
    D.dot(ctx, cx - 9, trackY - 3, 4, "#0a1420");
    D.dot(ctx, cx + 9, trackY - 3, 4, "#0a1420");
    D.dot(ctx, mapX(tt), mapY(xAt(tt)), 5, D.COL.amber);

    // slope callout for the current leg
    D.panel(ctx, 680, 46, 200, 250);
    D.label(ctx, "right now", 780, 70, { color: D.COL.muted, size: 11 });
    D.label(ctx, `v = ${vAt(tt).toFixed(1)} m/s`, 780, 110, { size: 15, mono: true, bold: true, color: D.COL.accent });
    D.label(ctx, vAt(tt) > 0 ? "slope: uphill" : vAt(tt) < 0 ? "slope: downhill" : "slope: flat", 780, 144, {
      size: 12,
      color: vAt(tt) === 0 ? D.COL.muted : D.COL.amber,
    });
    D.label(ctx, `x = ${xAt(tt).toFixed(1)} m`, 780, 190, { size: 14, mono: true, color: D.COL.text });
    D.label(ctx, "the graph's slope", 780, 240, { size: 10, color: D.COL.muted });
    D.label(ctx, "IS the velocity", 780, 256, { size: 11, bold: true, color: D.COL.good });

    D.meter(ctx, 20, 8, 200, "end position", `${xEnd.toFixed(1)} m`, D.COL.good);
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} label="A cart's position–time graph built from three velocity segments" />
      <Controls>
        <Slider label="Velocity, seconds 0–4" min={-3} max={3} step={0.5} value={v1} onChange={setV1} fmt={(v) => `${v.toFixed(1)} m/s`} />
        <Slider label="Velocity, seconds 4–8" min={-3} max={3} step={0.5} value={v2} onChange={setV2} fmt={(v) => `${v.toFixed(1)} m/s`} />
        <Slider label="Velocity, seconds 8–12" min={-3} max={3} step={0.5} value={v3} onChange={setV3} fmt={(v) => `${v.toFixed(1)} m/s`} />
      </Controls>
      <Readouts>
        <Readout label="Final position" value={`${xEnd.toFixed(1)} m`} tone="good" />
        <Readout label="Flat segments" value={[v1, v2, v3].filter((v) => v === 0).length} />
        <Readout label="Rule" value="slope of x(t) = velocity" tone="amber" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 0.2 — The drop tower: free fall with optional air, on any world.
 * ===================================================================== */

export function FreeFallLab() {
  const [world, setWorld] = useState<"moon" | "earth" | "jupiter">("earth");
  const [air, setAir] = useState<"off" | "on">("off");
  const [time, setTime] = useState(2);

  const g = world === "moon" ? 1.62 : world === "earth" ? 9.81 : 24.8;

  // Euler steps; the drag constant belongs to the ball and the air, so it is
  // fixed at the value giving 55 m/s terminal on Earth — on other worlds the
  // terminal velocity √(g/k) scales with the local gravity, as it should
  const K_DRAG = 9.81 / (55 * 55);
  const series = (() => {
    const dt = 0.02;
    const k = air === "on" ? K_DRAG : 0;
    let v = 0;
    let x = 0;
    const out: Array<{ v: number; x: number }> = [{ v: 0, x: 0 }];
    for (let t = dt; t <= 5.0001; t += dt) {
      v += (g - k * v * v) * dt;
      x += v * dt;
      out.push({ v, x });
    }
    return out;
  })();
  const at = series[Math.min(series.length - 1, Math.round((time / 5) * (series.length - 1)))];
  const terminal = air === "on" ? Math.sqrt(g / K_DRAG) : null;

  const draw = (ctx: CanvasRenderingContext2D) => {
    // falling ball column
    const colX = 120;
    const topY = 50;
    const colH = 300;
    const xMax = Math.max(20, series[series.length - 1].x);
    D.wire(ctx, [[colX - 40, topY], [colX - 40, topY + colH]], "#33445e", 2);
    for (let m = 0; m <= xMax; m += xMax > 100 ? 50 : 10) {
      const y = topY + (m / xMax) * colH;
      D.wire(ctx, [[colX - 46, y], [colX - 34, y]], "#33445e", 1.5);
      D.label(ctx, `${m}`, colX - 58, y, { size: 9, mono: true, color: D.COL.muted });
    }
    const bally = topY + (at.x / xMax) * colH;
    D.dot(ctx, colX, bally, 12, D.COL.accent);
    D.label(ctx, `${at.v.toFixed(1)} m/s`, colX + 44, bally, { align: "left", size: 12, mono: true, color: D.COL.amber });

    // v(t) graph
    const gx = 300;
    const gy = 50;
    const gw = 380;
    const gh = 300;
    D.panel(ctx, gx, gy, gw, gh, "#0a1420");
    const vMax = Math.max(20, ...series.map((s) => s.v)) * 1.1;
    ctx.strokeStyle = D.COL.accent;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    series.forEach((s, i) => {
      const px = gx + (i / (series.length - 1)) * gw;
      const py = gy + gh - (s.v / vMax) * (gh - 20);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
    if (terminal) {
      const ty = gy + gh - (terminal / vMax) * (gh - 20);
      ctx.setLineDash([6, 5]);
      D.wire(ctx, [[gx, ty], [gx + gw, ty]], "rgba(246,178,107,0.6)", 1.5);
      ctx.setLineDash([]);
      D.label(ctx, "terminal velocity", gx + gw - 12, ty - 10, { align: "right", size: 10, color: D.COL.amber });
    }
    const cx = gx + (time / 5) * gw;
    D.wire(ctx, [[cx, gy], [cx, gy + gh]], "rgba(255,255,255,0.25)", 1);
    D.label(ctx, translate("Time") + " → (5 s)", gx + gw / 2, gy + gh + 20, { color: D.COL.muted, size: 11 });
    D.label(ctx, "speed", gx + 34, gy + 16, { size: 10, color: D.COL.muted });

    // distance check panel
    D.panel(ctx, 710, 50, 170, 300);
    D.label(ctx, "the square law", 795, 74, { color: D.COL.muted, size: 11 });
    [1, 2, 3, 4].forEach((tt, i) => {
      const idx = Math.min(series.length - 1, Math.round((tt / 5) * (series.length - 1)));
      D.label(ctx, `t = ${tt} s`, 745, 112 + i * 56, { align: "left", size: 11, color: D.COL.muted });
      D.label(ctx, `${series[idx].x.toFixed(0)} m`, 860, 112 + i * 56, { align: "right", size: 13, mono: true, color: D.COL.text });
      if (air === "off" && i > 0) {
        D.label(ctx, `×${(series[idx].x / series[Math.round((1 / 5) * (series.length - 1))].x).toFixed(1)}`, 860, 130 + i * 56, {
          align: "right",
          size: 10,
          color: D.COL.good,
        });
      }
    });

    D.meter(ctx, 20, 8, 170, "gravity", `${g.toFixed(2)} m/s²`, D.COL.accent);
    D.meter(ctx, 200, 8, 170, "fallen", `${at.x.toFixed(1)} m`, D.COL.good);
    D.meter(ctx, 380, 8, 170, "speed now", `${at.v.toFixed(1)} m/s`, D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} label="A ball in free fall with velocity graph and distance table" />
      <Controls>
        <Segmented
          label="World"
          options={[
            { value: "moon", label: "Moon (1.6)" },
            { value: "earth", label: "Earth (9.8)" },
            { value: "jupiter", label: "Jupiter (24.8)" },
          ]}
          value={world}
          onChange={setWorld}
        />
        <Segmented
          label="Air resistance"
          options={[
            { value: "off", label: "vacuum" },
            { value: "on", label: "air" },
          ]}
          value={air}
          onChange={setAir}
        />
        <Slider label="Time" min={0} max={5} step={0.1} value={time} onChange={setTime} fmt={(v) => `${v.toFixed(1)} s`} />
      </Controls>
      <Readouts>
        <Readout label="Speed" value={`${at.v.toFixed(1)} m/s`} tone="amber" />
        <Readout label="Distance fallen" value={`${at.x.toFixed(1)} m`} tone="good" />
        <Readout label="Terminal velocity" value={terminal ? `≈ ${terminal.toFixed(0)} m/s` : "none (vacuum)"} />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 0.3 — The launcher: one parabola, two independent shadows.
 * ===================================================================== */

export function ProjectileLab() {
  const [speed, setSpeed] = useState(25);
  const [angle, setAngle] = useState(45);

  const g = 9.81;
  const rad = (angle * Math.PI) / 180;
  const vx = speed * Math.cos(rad);
  const vy = speed * Math.sin(rad);
  const flight = (2 * vy) / g;
  const range = vx * flight;
  const hMax = (vy * vy) / (2 * g);

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const ox = 60;
    const oy = 340;
    const scale = Math.min(760 / Math.max(range, 10), 260 / Math.max(hMax, 5));

    // ground
    D.wire(ctx, [[20, oy], [880, oy]], "#33445e", 2);

    // trajectory
    ctx.strokeStyle = "rgba(45,212,191,0.55)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 60; i++) {
      const tt = (i / 60) * flight;
      const px = ox + vx * tt * scale;
      const py = oy - (vy * tt - 0.5 * g * tt * tt) * scale;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // animated ball + its two shadows
    const tt = (t * 0.9) % flight;
    const bx = ox + vx * tt * scale;
    const by = oy - (vy * tt - 0.5 * g * tt * tt) * scale;
    D.dot(ctx, bx, by, 9, D.COL.accent);
    D.dot(ctx, bx, oy + 12, 5, D.COL.amber); // horizontal shadow: steady march
    D.dot(ctx, ox - 24, by, 5, D.COL.bad); // vertical shadow: pure free fall
    D.label(ctx, "steady march", bx, oy + 30, { size: 10, color: D.COL.amber });
    D.label(ctx, "free fall", ox - 24, Math.max(by - 16, 44), { size: 10, color: D.COL.bad });

    // launch vector
    D.wire(ctx, [[ox, oy], [ox + Math.cos(rad) * 52, oy - Math.sin(rad) * 52]], D.COL.good, 3);
    D.label(ctx, `${angle}°`, ox + 66, oy - 14, { size: 12, color: D.COL.good });

    // range marker
    ctx.setLineDash([5, 5]);
    D.wire(ctx, [[ox + range * scale, oy], [ox + range * scale, oy - 24]], "rgba(246,178,107,0.7)", 1.5);
    ctx.setLineDash([]);

    D.meter(ctx, 20, 8, 170, "range", `${range.toFixed(1)} m`, D.COL.amber);
    D.meter(ctx, 200, 8, 170, "hang time", `${flight.toFixed(2)} s`, D.COL.accent);
    D.meter(ctx, 380, 8, 170, "peak height", `${hMax.toFixed(1)} m`, D.COL.good);
  };

  return (
    <>
      <SimCanvas width={900} height={380} draw={draw} label="A projectile's parabola with its independent horizontal and vertical shadows" />
      <Controls>
        <Slider label="Launch speed" min={5} max={40} step={1} value={speed} onChange={setSpeed} fmt={(v) => `${v} m/s`} />
        <Slider label="Launch angle" min={5} max={85} step={1} value={angle} onChange={setAngle} fmt={(v) => `${v}°`} />
      </Controls>
      <Readouts>
        <Readout label="Range" value={`${range.toFixed(1)} m`} tone="amber" />
        <Readout label="Hang time" value={`${flight.toFixed(2)} s`} />
        <Readout label="Peak height" value={`${hMax.toFixed(1)} m`} />
        <Readout label="Try it" value={angle === 45 ? "45° — the flat-ground optimum" : `compare with ${90 - angle}°`} tone="good" />
      </Readouts>
    </>
  );
}
