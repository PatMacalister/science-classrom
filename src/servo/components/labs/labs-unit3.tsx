"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Slider } from "@/servo/components/controls";
import { clamp } from "@/servo/lib/sim/helpers";
import { tl as translate } from "@/servo/lib/labStrings";
import * as D from "@/servo/lib/sim/draw";

/* Deterministic per-index noise (pure hash), shared by the control sims. */
function noiseAt(i: number, salt = 0): number {
  let h = (i * 374761393 + salt * 668265263) | 0;
  h = (h ^ (h >>> 13)) | 0;
  h = Math.imul(h, 1274126177);
  h = (h ^ (h >>> 16)) >>> 0;
  return (h / 4294967296) * 2 - 1;
}

/* =====================================================================
 * Lab 3.1 — The thermostat cart: bang-bang control, hysteresis and the
 * oscillation you cannot remove.
 * ===================================================================== */

export function BangBangLab() {
  const [hyst, setHyst] = useState(0.4);
  const [noise, setNoise] = useState(0.05);

  const TARGET = 2.5; // m, middle of a 5 m track
  const F = 1.6;
  const DRAG = 0.5;

  const sim = (() => {
    const dt = 0.01;
    let x = 0.4;
    let v = 0;
    let mode = 0; // -1, 0, +1 — the fan's three moods
    let switches = 0;
    const xs: number[] = [];
    const modes: number[] = [];
    for (let i = 0; i < 3000; i++) {
      const measured = x + noiseAt(i, 7) * noise;
      let next = mode;
      if (measured < TARGET - hyst / 2) next = 1;
      else if (measured > TARGET + hyst / 2) next = -1;
      else if (hyst === 0) next = measured < TARGET ? 1 : -1;
      else next = 0;
      if (next !== mode) switches++;
      mode = next;
      v += (mode * F - DRAG * v) * dt;
      x += v * dt;
      xs.push(x);
      modes.push(mode);
    }
    // oscillation amplitude over the settled second half
    const tail = xs.slice(1500);
    const amp = (Math.max(...tail) - Math.min(...tail)) / 2;
    return { xs, modes, switches: switches / 30, amp };
  })();

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const ox = 60;
    const oy = 220;
    const scale = 130;
    const loop = sim.xs.length * 0.01;
    const idx = Math.floor(((t % loop) / loop) * sim.xs.length);
    const x = sim.xs[idx];
    const mode = sim.modes[idx];

    // position trace
    const gx = 60;
    const gy = 30;
    const gw = 640;
    const gh = 140;
    D.panel(ctx, gx, gy, gw, gh, "#0a1420");
    const yOf = (p: number) => gy + gh - clamp(p / 5, 0, 1) * (gh - 16) - 8;
    D.wire(ctx, [[gx, yOf(TARGET)], [gx + gw, yOf(TARGET)]], "rgba(255,255,255,0.35)", 1.5);
    ctx.setLineDash([4, 5]);
    D.wire(ctx, [[gx, yOf(TARGET - hyst / 2)], [gx + gw, yOf(TARGET - hyst / 2)]], "rgba(246,178,107,0.5)", 1);
    D.wire(ctx, [[gx, yOf(TARGET + hyst / 2)], [gx + gw, yOf(TARGET + hyst / 2)]], "rgba(246,178,107,0.5)", 1);
    ctx.setLineDash([]);
    ctx.strokeStyle = D.COL.accent;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    sim.xs.forEach((p, i) => {
      const px = gx + (i / sim.xs.length) * gw;
      const py = yOf(p);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
    const cx = gx + (idx / sim.xs.length) * gw;
    D.wire(ctx, [[cx, gy], [cx, gy + gh]], "rgba(255,255,255,0.25)", 1);
    D.label(ctx, translate("hysteresis band"), gx + gw - 60, yOf(TARGET + hyst / 2) - 10, { size: 9, color: D.COL.amber });

    // the cart on its track
    D.wire(ctx, [[ox, oy + 24], [ox + 5 * scale, oy + 24]], "#33445e", 2);
    D.wire(ctx, [[ox + TARGET * scale, oy + 10], [ox + TARGET * scale, oy + 38]], "rgba(255,255,255,0.5)", 1.5);
    D.label(ctx, translate("target"), ox + TARGET * scale, oy + 50, { size: 10, color: D.COL.muted });
    const px = ox + clamp(x, 0, 5) * scale;
    ctx.fillStyle = D.COL.accent;
    ctx.beginPath();
    ctx.roundRect(px - 22, oy - 12, 44, 22, 5);
    ctx.fill();
    if (mode !== 0) {
      // fan blast
      const fx = px - mode * 30;
      D.flame(ctx, fx, oy + 8, 0.8, t);
      D.arrow(ctx, px - mode * 24, oy - 2, px + mode * 8, oy - 2, D.COL.amber, 2, 7);
    }

    D.meter(ctx, 730, 30, 150, "fan mood", mode > 0 ? "→" : mode < 0 ? "←" : translate("coasting"), mode === 0 ? D.COL.muted : D.COL.amber);
    D.meter(ctx, 730, 80, 150, "switches / s", sim.switches.toFixed(1), sim.switches > 8 ? D.COL.bad : D.COL.good);
    D.meter(ctx, 730, 130, 150, "wobble ±", `${(sim.amp * 100).toFixed(0)} cm`, D.COL.accent);
  };

  return (
    <>
      <SimCanvas width={900} height={290} draw={draw} label="A fan-driven cart under bang-bang control, its position sawing around the target" />
      <Controls>
        <Slider label="Hysteresis band" min={0} max={1.2} step={0.05} value={hyst} onChange={setHyst} fmt={(v) => `${(v * 100).toFixed(0)} cm`} />
        <Slider label="Sensor noise" min={0} max={0.15} step={0.01} value={noise} onChange={setNoise} fmt={(v) => `±${(v * 100).toFixed(0)} cm`} />
      </Controls>
      <Readouts>
        <Readout label="Switching" value={sim.switches > 8 ? "chattering — noise is flipping the decision" : "calm"} tone={sim.switches > 8 ? "warn" : "good"} />
        <Readout label="Oscillation" value={`±${(sim.amp * 100).toFixed(0)} cm — ${translate("never zero")}`} tone="amber" />
        <Readout label="Rule" value="two settings can bracket a target, never hold it" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 3.2 — The tuning bench: PID holding an arm against gravity, with
 * the step response plotted and scored.
 * ===================================================================== */

export function PidLab() {
  const [kp, setKp] = useState(2);
  const [ki, setKi] = useState(0);
  const [kd, setKd] = useState(0);

  const TARGET = 45;
  const GRAV = 40; // constant disturbance torque, in controller units

  const sim = (() => {
    const dt = 0.005;
    const T = 8;
    let th = 0;
    let w = 0;
    let ie = 0;
    let prevE = TARGET;
    const ys: number[] = [];
    for (let t = 0; t < T; t += dt) {
      const e = TARGET - th;
      ie += e * dt;
      const de = (e - prevE) / dt;
      prevE = e;
      const u = kp * e + ki * ie + kd * de;
      const acc = 3 * u - GRAV - 1.6 * w;
      w += acc * dt;
      th += w * dt;
      ys.push(th);
    }
    const peak = Math.max(...ys);
    const overshoot = Math.max(0, peak - TARGET);
    const tail = ys.slice(-Math.floor(1 / dt));
    const ssError = Math.abs(TARGET - tail.reduce((a, b) => a + b, 0) / tail.length);
    let settled = T;
    for (let i = ys.length - 1; i >= 0; i--) {
      if (Math.abs(ys[i] - TARGET) > 2) {
        settled = (i + 1) * dt;
        break;
      }
    }
    const oscillating = settled >= T - 0.1 && ssError > 3;
    return { ys, dt, overshoot, ssError, settled, oscillating };
  })();

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    // response plot
    const gx = 60;
    const gy = 30;
    const gw = 560;
    const gh = 240;
    D.panel(ctx, gx, gy, gw, gh, "#0a1420");
    const yOf = (a: number) => gy + gh - clamp((a + 20) / 110, 0, 1) * (gh - 16) - 8;
    D.wire(ctx, [[gx, yOf(TARGET)], [gx + gw, yOf(TARGET)]], "rgba(255,255,255,0.4)", 1.5);
    D.label(ctx, `${translate("target")} 45°`, gx + gw - 44, yOf(TARGET) - 10, { size: 9, color: D.COL.text });
    D.wire(ctx, [[gx, yOf(0)], [gx + gw, yOf(0)]], "rgba(139,151,167,0.25)", 1);
    ctx.strokeStyle = D.COL.accent;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    sim.ys.forEach((yv, i) => {
      const px = gx + (i / sim.ys.length) * gw;
      const py = yOf(yv);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
    D.label(ctx, translate("Time") + " → (8 s)", gx + gw / 2, gy + gh + 18, { size: 11, color: D.COL.muted });

    // animated arm replay
    const loop = sim.ys.length * sim.dt + 1;
    const idx = Math.min(sim.ys.length - 1, Math.floor(((t % loop) / sim.dt)));
    const th = sim.ys[idx] ?? sim.ys[sim.ys.length - 1];
    const ax = 760;
    const ay = 160;
    D.panel(ctx, ax - 100, 40, 220, 240);
    D.label(ctx, translate("the arm"), ax + 10, 62, { size: 11, color: D.COL.muted });
    // target ghost
    ctx.setLineDash([4, 5]);
    const tr = ((-TARGET) * Math.PI) / 180;
    D.wire(ctx, [[ax + 10, ay], [ax + 10 + Math.cos(tr) * 80, ay + Math.sin(tr) * 80]], "rgba(255,255,255,0.3)", 2);
    ctx.setLineDash([]);
    const rr = ((-th) * Math.PI) / 180;
    D.wire(ctx, [[ax + 10, ay], [ax + 10 + Math.cos(rr) * 80, ay + Math.sin(rr) * 80]], D.COL.accent, 6);
    D.dot(ctx, ax + 10 + Math.cos(rr) * 80, ay + Math.sin(rr) * 80, 10, D.COL.amber); // the weight
    D.dot(ctx, ax + 10, ay, 9, D.COL.text);
    D.arrow(ctx, ax + 10 + Math.cos(rr) * 80, ay + Math.sin(rr) * 80 + 14, ax + 10 + Math.cos(rr) * 80, ay + Math.sin(rr) * 80 + 34, D.COL.muted, 1.5, 6);
    D.label(ctx, translate("gravity"), ax + 10 + Math.cos(rr) * 80, ay + Math.sin(rr) * 80 + 46, { size: 9, color: D.COL.muted });
  };

  return (
    <>
      <SimCanvas width={900} height={310} draw={draw} label="A weighted arm's PID step response, plotted and replayed live" />
      <Controls>
        <Slider label="Kp" min={0} max={10} step={0.1} value={kp} onChange={setKp} fmt={(v) => v.toFixed(1)} />
        <Slider label="Ki" min={0} max={6} step={0.1} value={ki} onChange={setKi} fmt={(v) => v.toFixed(1)} />
        <Slider label="Kd" min={0} max={2} step={0.02} value={kd} onChange={setKd} fmt={(v) => v.toFixed(2)} />
      </Controls>
      <Readouts>
        <Readout
          label="Overshoot"
          value={sim.oscillating ? "oscillating!" : `${sim.overshoot.toFixed(1)}°`}
          tone={sim.oscillating || sim.overshoot > 10 ? "warn" : "good"}
        />
        <Readout label="Steady-state error" value={`${sim.ssError.toFixed(1)}°`} tone={sim.ssError > 2 ? "amber" : "good"} />
        <Readout label="Settling time" value={sim.settled >= 7.9 ? "> 8 s" : `${sim.settled.toFixed(1)} s`} />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 3.3 — The racing line: a PD line follower on a closed track. The
 * whole run is simulated from the sliders (pure), then replayed.
 * ===================================================================== */

// the track: a closed curve with sweepers and one tight section
const TRACK: Array<[number, number]> = (() => {
  const pts: Array<[number, number]> = [];
  const cx = 450;
  const cy = 195;
  for (let i = 0; i < 280; i++) {
    const a = (i / 280) * Math.PI * 2;
    const r1 = 300 + 45 * Math.sin(3 * a + 1.2);
    const r2 = 130 + 24 * Math.sin(2 * a);
    pts.push([cx + r1 * Math.cos(a) * 0.92, cy + r2 * Math.sin(a)]);
  }
  return pts;
})();

const LANE = 26; // px of grace either side of the line
// the sensor bar rides ahead of the axle — at low speed that lookahead is
// free damping (why slow P-only robots work); raising speed erodes it, and
// that erosion is exactly what the explicit Kd term must replace
const LOOKAHEAD = 22; // px

export function LineFollowerLab() {
  const [speed, setSpeed] = useState(90);
  const [kp, setKp] = useState(2.5);
  const [kd, setKd] = useState(0);

  const sim = (() => {
    const dt = 0.008;
    const n = TRACK.length;
    let ti = 0; // current nearest track index
    let [x, y] = TRACK[0];
    let th = Math.atan2(TRACK[1][1] - y, TRACK[1][0] - x);
    let prevE = 0;
    let progress = 0;
    let departures = 0;
    let outside = false;
    let maxE = 0;
    let absSum = 0;
    const frames: Array<[number, number, number]> = [];
    let lapTime: number | null = null;
    let steps = 0;
    for (let t = 0; t < 40 && lapTime === null; t += dt) {
      // nearest track point, searched in a window ahead of the last one
      let best = ti;
      let bestD = Infinity;
      for (let k = -2; k < 14; k++) {
        const j = (ti + k + n) % n;
        const d = Math.hypot(TRACK[j][0] - x, TRACK[j][1] - y);
        if (d < bestD) {
          bestD = d;
          best = j;
        }
      }
      const adv = (best - ti + n) % n;
      if (adv < n / 2) progress += adv;
      ti = best;
      const p = TRACK[ti];
      const q = TRACK[(ti + 1) % n];
      const tangent = Math.atan2(q[1] - p[1], q[0] - p[0]);
      // signed lateral error via the cross product, in lane units
      const crossZ = Math.cos(tangent) * (y - p[1]) - Math.sin(tangent) * (x - p[0]);
      const e = crossZ / LANE;
      const de = (e - prevE) / dt;
      prevE = e;
      maxE = Math.max(maxE, Math.abs(e));
      absSum += Math.abs(e);
      steps++;
      if (Math.abs(e) > 1 && !outside) {
        departures++;
        outside = true;
      } else if (Math.abs(e) < 0.7) {
        outside = false;
      }
      const eSense = e + (LOOKAHEAD / speed) * de;
      const omega = clamp(-(kp * eSense + kd * de), -8, 8);
      th += omega * dt;
      x += speed * Math.cos(th) * dt;
      y += speed * Math.sin(th) * dt;
      if (steps % 4 === 0) frames.push([x, y, th]);
      if (progress >= n - 2 && ti < 6) lapTime = t;
    }
    return { frames, departures, maxE, avgE: absSum / Math.max(1, steps), lapTime, dt: dt * 4 };
  })();

  const clean = sim.departures === 0 && sim.lapTime !== null;

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    // track ribbon
    ctx.strokeStyle = "#233248";
    ctx.lineWidth = LANE * 2;
    ctx.lineJoin = "round";
    ctx.beginPath();
    TRACK.forEach(([px, py], i) => (i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)));
    ctx.closePath();
    ctx.stroke();
    // the line itself
    ctx.strokeStyle = "#0b0f14";
    ctx.lineWidth = 5;
    ctx.beginPath();
    TRACK.forEach(([px, py], i) => (i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)));
    ctx.closePath();
    ctx.stroke();
    // start line
    D.wire(ctx, [[TRACK[0][0] - 4, TRACK[0][1] - 18], [TRACK[0][0] - 4, TRACK[0][1] + 18]], "#e8eef4", 3);

    // ghost trail + robot replay
    const total = sim.frames.length * sim.dt + 1.5;
    const idx = Math.min(sim.frames.length - 1, Math.floor((t % total) / sim.dt));
    ctx.strokeStyle = "rgba(245,158,11,0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= idx; i++) {
      const [fx, fy] = sim.frames[i];
      if (i === 0) ctx.moveTo(fx, fy);
      else ctx.lineTo(fx, fy);
    }
    ctx.stroke();
    const [rx, ry, rth] = sim.frames[idx] ?? [TRACK[0][0], TRACK[0][1], 0];
    ctx.save();
    ctx.translate(rx, ry);
    ctx.rotate(rth);
    ctx.fillStyle = D.COL.accent;
    ctx.beginPath();
    ctx.roundRect(-16, -11, 32, 22, 5);
    ctx.fill();
    ctx.fillStyle = "#0a1420";
    ctx.fillRect(8, -9, 6, 18); // the sensor bar at the nose
    ctx.restore();

    D.meter(ctx, 20, 8, 170, "lap", sim.lapTime !== null ? `${sim.lapTime.toFixed(1)} s` : translate("DNF"), sim.lapTime !== null ? D.COL.good : D.COL.bad);
    D.meter(ctx, 200, 8, 190, "departures", `${sim.departures}`, sim.departures > 0 ? D.COL.bad : D.COL.good);
    D.meter(ctx, 400, 8, 190, "worst error", `${(sim.maxE * 100).toFixed(0)} %`, sim.maxE > 0.8 ? D.COL.amber : D.COL.good);
  };

  return (
    <>
      <SimCanvas width={900} height={390} draw={draw} label="A line-following robot lapping a closed track, its trail showing oscillation" />
      <Controls>
        <Slider label="Speed" min={40} max={220} step={5} value={speed} onChange={setSpeed} fmt={(v) => `${v} px/s`} />
        <Slider label="Kp (steering)" min={0} max={8} step={0.1} value={kp} onChange={setKp} fmt={(v) => v.toFixed(1)} />
        <Slider label="Kd (damping)" min={0} max={1.5} step={0.05} value={kd} onChange={setKd} fmt={(v) => v.toFixed(2)} />
      </Controls>
      <Readouts>
        <Readout
          label="Verdict"
          value={clean ? `${translate("clean lap in")} ${sim.lapTime!.toFixed(1)} s` : sim.lapTime === null ? "lost the line for good" : `${translate("lap with")} ${sim.departures} ${translate("departure(s)")}`}
          tone={clean ? "good" : "warn"}
        />
        <Readout label="Ø error" value={`${(sim.avgE * 100).toFixed(0)} % ${translate("of the lane")}`} />
        <Readout label="Recipe" value="raise speed → wobble → add Kd → repeat" tone="amber" />
      </Readouts>
    </>
  );
}
