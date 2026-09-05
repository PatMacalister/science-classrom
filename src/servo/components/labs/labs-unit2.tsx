"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider } from "@/servo/components/controls";
import { clamp } from "@/servo/lib/sim/helpers";
import { tl as translate } from "@/servo/lib/labStrings";
import * as D from "@/servo/lib/sim/draw";

/* Deterministic per-index noise: pure hash of the sample counter, so traces
 * are stable across renders and the React compiler stays happy. */
function noiseAt(i: number, salt = 0): number {
  let h = (i * 374761393 + salt * 668265263) | 0;
  h = (h ^ (h >>> 13)) | 0;
  h = Math.imul(h, 1274126177);
  h = (h ^ (h >>> 16)) >>> 0;
  return (h / 4294967296) * 2 - 1;
}

/* =====================================================================
 * Lab 2.1 — The echo chamber: ultrasonic cone vs laser line, and the
 * materials that blind each of them.
 * ===================================================================== */

export function EchoLab() {
  const [dist, setDist] = useState(2);
  const [side, setSide] = useState<"none" | "in">("none");
  const [mat, setMat] = useState<"plywood" | "curtain" | "glass">("plywood");

  const SIDE_AT = 1.2;
  const MAX_RANGE = 4;

  // ultrasonic: wide cone, nearest echo wins; curtains swallow the chirp
  const usCandidates: number[] = [];
  if (mat !== "curtain") usCandidates.push(dist);
  if (side === "in") usCandidates.push(SIDE_AT);
  const usReading = usCandidates.length ? Math.min(...usCandidates) : null;
  // laser: pencil-thin, only sees the target; glass reflects the beam away
  const laserReading = mat === "glass" ? null : dist;

  const usMs = usReading !== null ? ((2 * usReading) / 343) * 1000 : null;
  const laserNs = laserReading !== null ? ((2 * laserReading) / 3e8) * 1e9 : null;

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const ox = 70;
    const oy = 170;
    const scale = 170;

    // sensor head
    ctx.fillStyle = "#233248";
    ctx.beginPath();
    ctx.roundRect(ox - 46, oy - 40, 46, 80, 6);
    ctx.fill();
    D.label(ctx, translate("ultrasonic"), ox - 23, oy - 26, { size: 9, color: D.COL.amber });
    D.label(ctx, translate("laser"), ox - 23, oy + 28, { size: 9, color: D.COL.bad });

    // cone (±15°)
    const coneEnd = ox + MAX_RANGE * scale;
    ctx.fillStyle = "rgba(246,178,107,0.08)";
    ctx.beginPath();
    ctx.moveTo(ox, oy - 12);
    ctx.lineTo(coneEnd, oy - 12 - MAX_RANGE * scale * 0.27);
    ctx.lineTo(coneEnd, oy - 12 + MAX_RANGE * scale * 0.27);
    ctx.closePath();
    ctx.fill();
    // animated chirp arc
    const chirpD = ((t * 0.8) % 1.2) * MAX_RANGE;
    if (usReading === null || chirpD < usReading) {
      ctx.strokeStyle = "rgba(246,178,107,0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ox, oy - 12, chirpD * scale, -0.28, 0.28);
      ctx.stroke();
    }
    // laser line + blinking dot
    if (laserReading !== null) {
      D.wire(ctx, [[ox, oy + 12], [ox + dist * scale, oy + 12]], "rgba(242,109,109,0.8)", 1.5);
      D.glow(ctx, ox + dist * scale, oy + 12, 8, D.COL.bad, 0.5 + 0.4 * Math.sin(t * 10));
    } else {
      // beam glances off the glass and leaves
      D.wire(ctx, [[ox, oy + 12], [ox + dist * scale, oy + 12]], "rgba(242,109,109,0.5)", 1.5);
      D.arrow(ctx, ox + dist * scale, oy + 12, ox + dist * scale + 40, oy - 60, "rgba(242,109,109,0.4)", 1.5, 6);
      D.label(ctx, translate("reflected away"), ox + dist * scale + 50, oy - 72, { size: 9, color: D.COL.bad });
    }

    // target
    const tx = ox + dist * scale;
    const matColor = mat === "plywood" ? "#b08a5a" : mat === "curtain" ? "#7a6a8a" : "rgba(160,200,230,0.5)";
    ctx.fillStyle = matColor;
    ctx.fillRect(tx, oy - 90, mat === "curtain" ? 6 : 10, 180);
    D.label(ctx, translate(mat), tx + 4, oy - 104, { size: 10, color: D.COL.muted });

    // side obstacle (chair leg) inside the cone
    if (side === "in") {
      const sx = ox + SIDE_AT * scale;
      const sy = oy - 12 - SIDE_AT * scale * 0.18;
      D.dot(ctx, sx, sy, 8, "#8a7a5a");
      D.label(ctx, translate("chair leg (in the cone)"), sx, sy - 18, { size: 9, color: D.COL.amber });
    }

    // readings
    D.meter(ctx, 20, 8, 205, "ultrasonic reads", usReading !== null ? `${usReading.toFixed(2)} m` : translate("no echo"), usReading !== null && side === "in" && usReading < dist ? D.COL.bad : D.COL.amber);
    D.meter(ctx, 235, 8, 205, "laser reads", laserReading !== null ? `${laserReading.toFixed(2)} m` : translate("no return"), laserReading !== null ? D.COL.good : D.COL.bad);
    D.meter(ctx, 465, 8, 195, "echo round trip", usMs !== null ? `${usMs.toFixed(1)} ms` : "—", D.COL.text);
    D.meter(ctx, 675, 8, 205, "light round trip", laserNs !== null ? `${laserNs.toFixed(1)} ns` : "—", D.COL.text);
  };

  return (
    <>
      <SimCanvas width={900} height={290} draw={draw} label="An ultrasonic cone and a laser line measuring the same corridor, with a movable target" />
      <Controls>
        <Slider label="Target distance" min={0.3} max={3.8} step={0.05} value={dist} onChange={setDist} fmt={(v) => `${v.toFixed(2)} m`} />
        <Segmented
          label="Side obstacle"
          options={[
            { value: "none", label: "none" },
            { value: "in", label: "chair leg at 1.2 m" },
          ]}
          value={side}
          onChange={setSide}
        />
        <Segmented
          label="Target material"
          options={[
            { value: "plywood", label: "plywood" },
            { value: "curtain", label: "curtain" },
            { value: "glass", label: "glass" },
          ]}
          value={mat}
          onChange={setMat}
        />
      </Controls>
      <Readouts>
        <Readout
          label="Ultrasonic verdict"
          value={
            usReading === null
              ? "blind — the curtain swallowed the chirp"
              : side === "in" && usReading < dist
                ? "fooled — nearest echo in the cone wins"
                : "honest"
          }
          tone={usReading === null || (side === "in" && usReading !== null && usReading < dist) ? "warn" : "good"}
        />
        <Readout label="Laser verdict" value={laserReading === null ? "blind — glass reflected the beam away" : "honest — thin beam, no cone"} tone={laserReading === null ? "warn" : "good"} />
        <Readout label="Rule" value="d = v · t / 2" tone="amber" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 2.2 — The drift bench: accelerometer (noisy, honest) vs gyro
 * (smooth, drifting), reporting the same tilting board.
 * ===================================================================== */

const WINDOW = 12; // seconds of trace shown
const SAMPLE_HZ = 50;
const GYRO_EPOCH = 45; // the gyro re-zeroes on this cycle so drift stays visible

function drawTraces(
  ctx: CanvasRenderingContext2D,
  t: number,
  tilt: number,
  vib: number,
  bias: number,
  alpha: number | null
) {
  const gx = 60;
  const gy = 40;
  const gw = 560;
  const gh = 240;
  D.panel(ctx, gx, gy, gw, gh, "#0a1420");
  const yOf = (a: number) => gy + gh / 2 - clamp(a, -40, 40) * (gh / 2 - 16) * 0.025;

  // zero + truth line
  D.wire(ctx, [[gx, yOf(0)], [gx + gw, yOf(0)]], "rgba(139,151,167,0.25)", 1);
  D.wire(ctx, [[gx, yOf(tilt)], [gx + gw, yOf(tilt)]], "rgba(255,255,255,0.35)", 1.5);
  D.label(ctx, translate("true angle"), gx + gw - 40, yOf(tilt) - 10, { size: 9, color: D.COL.text });

  const n = WINDOW * SAMPLE_HZ;
  const i0 = Math.floor((t - WINDOW) * SAMPLE_HZ);

  // accelerometer: truth + noise, fresh each sample
  ctx.strokeStyle = "rgba(246,178,107,0.85)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let k = 0; k <= n; k++) {
    const i = i0 + k;
    const a = tilt + noiseAt(i, 1) * vib * 6;
    const px = gx + (k / n) * gw;
    const py = yOf(a);
    if (k === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // gyro: truth + bias·(time since its last re-zero)
  ctx.strokeStyle = "rgba(76,201,240,0.9)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let k = 0; k <= n; k++) {
    const i = i0 + k;
    const ti = i / SAMPLE_HZ;
    const g = tilt + bias * (ti % GYRO_EPOCH);
    const px = gx + (k / n) * gw;
    const py = yOf(g);
    if (k === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // fused estimate (complementary filter), run over the same samples
  if (alpha !== null) {
    const dt = 1 / SAMPLE_HZ;
    // warm up from twice the window back so the display shows converged state
    const warm = i0 - n;
    let est = tilt + bias * (((warm < 0 ? 0 : warm) / SAMPLE_HZ) % GYRO_EPOCH);
    ctx.strokeStyle = "rgba(74,222,128,1)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = warm; i <= i0 + n; i++) {
      const accel = tilt + noiseAt(i, 1) * vib * 6;
      const rate = bias; // the true angle holds still; only the bias lies
      est = alpha * (est + rate * dt) + (1 - alpha) * accel;
      if (i >= i0) {
        const k = i - i0;
        const px = gx + (k / n) * gw;
        const py = yOf(est);
        if (i === i0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
    }
    ctx.stroke();
  }

  // legend
  const leg = (x: number, color: string, label: string) => {
    D.wire(ctx, [[x, gy + gh + 18], [x + 22, gy + gh + 18]], color, 3);
    D.label(ctx, translate(label), x + 30, gy + gh + 18, { size: 10, color: D.COL.muted, align: "left" });
  };
  leg(gx, "rgba(246,178,107,0.9)", "accelerometer");
  leg(gx + 170, "rgba(76,201,240,0.9)", "gyro (integrated)");
  if (alpha !== null) leg(gx + 370, "rgba(74,222,128,1)", "fused estimate");
}

export function DriftLab() {
  const [tilt, setTilt] = useState(10);
  const [vib, setVib] = useState(0.3);
  const [bias, setBias] = useState(0.4);

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    drawTraces(ctx, t, tilt, vib, bias, null);

    // the tilting board
    const bx = 760;
    const by = 160;
    D.panel(ctx, bx - 90, 50, 200, 220);
    D.label(ctx, translate("the board"), bx + 10, 72, { size: 11, color: D.COL.muted });
    ctx.save();
    ctx.translate(bx + 10, by);
    ctx.rotate((-tilt * Math.PI) / 180);
    ctx.fillStyle = D.COL.accent;
    ctx.fillRect(-70, -6, 140, 12);
    ctx.fillStyle = "#233248";
    ctx.fillRect(-12, -22, 24, 16);
    ctx.restore();
    D.label(ctx, `${tilt.toFixed(0)}°`, bx + 10, by + 60, { size: 14, mono: true, bold: true, color: D.COL.accent });

    D.meter(ctx, 640, 8, 240, "gyro drift after 60 s", `${(bias * 60).toFixed(0)}°`, D.COL.bad);
  };

  return (
    <>
      <SimCanvas width={900} height={330} draw={draw} label="Accelerometer and gyro traces reporting one tilting board: noise versus drift" />
      <Controls>
        <Slider label="Board tilt" min={-30} max={30} step={1} value={tilt} onChange={setTilt} fmt={(v) => `${v}°`} />
        <Slider label="Vibration" min={0} max={1} step={0.05} value={vib} onChange={setVib} fmt={(v) => `${(v * 100).toFixed(0)} %`} />
        <Slider label="Gyro bias" min={0} max={1} step={0.05} value={bias} onChange={setBias} fmt={(v) => `${v.toFixed(2)} °/s`} />
      </Controls>
      <Readouts>
        <Readout label="Accelerometer" value="noisy now, honest on average" tone="amber" />
        <Readout label="Gyro" value={`${translate("smooth now, drifting")} ${(bias * 60).toFixed(0)}°/min`} tone="warn" />
        <Readout label="Note" value="the gyro trace re-zeroes every 45 s — real drift never does" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 2.3 — The fusion desk: the complementary filter, with alpha under
 * your thumb.
 * ===================================================================== */

export function FilterLab() {
  const [tilt, setTilt] = useState(10);
  const [vib, setVib] = useState(0.3);
  const [bias, setBias] = useState(0.4);
  const [alpha, setAlpha] = useState(0.98);

  const settle = alpha < 1 ? (1 / SAMPLE_HZ) / (1 - alpha) : Infinity;

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    drawTraces(ctx, t, tilt, vib, bias, alpha);
    D.panel(ctx, 660, 50, 220, 220);
    D.label(ctx, translate("the blend"), 770, 72, { size: 11, color: D.COL.muted });
    D.label(ctx, `α = ${alpha.toFixed(3)}`, 770, 104, { size: 16, mono: true, bold: true, color: D.COL.good });
    D.barGauge(ctx, 700, 126, 140, 14, alpha, "rgba(76,201,240,0.9)");
    D.label(ctx, translate("trust in the gyro"), 770, 156, { size: 10, color: D.COL.muted });
    D.label(
      ctx,
      alpha >= 1 ? translate("gravity unplugged!") : `${translate("pull-home time")} ≈ ${settle.toFixed(1)} s`,
      770,
      196,
      { size: 11, color: alpha >= 1 ? D.COL.bad : D.COL.amber }
    );
  };

  return (
    <>
      <SimCanvas width={900} height={330} draw={draw} label="The complementary filter's fused estimate over the accelerometer and gyro traces" />
      <Controls>
        <Slider label="Board tilt" min={-30} max={30} step={1} value={tilt} onChange={setTilt} fmt={(v) => `${v}°`} />
        <Slider label="Vibration" min={0} max={1} step={0.05} value={vib} onChange={setVib} fmt={(v) => `${(v * 100).toFixed(0)} %`} />
        <Slider label="Gyro bias" min={0} max={1} step={0.05} value={bias} onChange={setBias} fmt={(v) => `${v.toFixed(2)} °/s`} />
        <Slider label="Alpha" min={0.5} max={1} step={0.005} value={alpha} onChange={setAlpha} fmt={(v) => v.toFixed(3)} />
      </Controls>
      <Readouts>
        <Readout
          label="Fused estimate"
          value={alpha >= 1 ? "pure gyro — drift is back" : alpha < 0.9 ? "vibration leaking through" : "steady and drift-free"}
          tone={alpha >= 1 ? "warn" : alpha < 0.9 ? "amber" : "good"}
        />
        <Readout label="Formula" value="angle = α·(angle + gyro·dt) + (1−α)·accel" tone="amber" />
        <Readout label="Pull-home time" value={alpha >= 1 ? "never" : `≈ ${settle.toFixed(1)} s`} />
      </Readouts>
    </>
  );
}
