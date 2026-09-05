"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, PickSlider, Readout, Readouts, Slider } from "@/servo/components/controls";
import { clamp } from "@/servo/lib/sim/helpers";
import { tl as translate } from "@/servo/lib/labStrings";
import * as D from "@/servo/lib/sim/draw";

/* =====================================================================
 * Lab 0.1 — The bump bot: one rangefinder, one loop rate, one wall.
 * The whole sense–think–act idea, felt as a stopping distance.
 * ===================================================================== */

export function BumpBotLab() {
  const [speed, setSpeed] = useState(0.8);
  const [rate, setRate] = useState(10);
  const [stopDist, setStopDist] = useState(0.6);

  const WALL = 5; // m
  const BRAKE = 3; // m/s²

  // Precompute the whole run from the parameters (pure): the robot samples
  // its rangefinder every 1/rate seconds and brakes when a sample is close.
  const run = (() => {
    const dt = 0.002;
    const sample = 1 / rate;
    let x = 0;
    let v = speed;
    let sinceSample = sample; // sample immediately at t=0
    let braking = false;
    const path: number[] = [];
    let t = 0;
    while (t < 14 && (v > 0.001 || !braking) && x < WALL) {
      sinceSample += dt;
      if (!braking && sinceSample >= sample) {
        sinceSample = 0;
        if (WALL - x < stopDist) braking = true;
      }
      if (braking) v = Math.max(0, v - BRAKE * dt);
      x += v * dt;
      path.push(x);
      t += dt;
      if (braking && v <= 0.001) break;
    }
    const crashed = x >= WALL - 0.01;
    return { path, dt, final: x, crashed };
  })();

  const margin = WALL - run.final;
  // worst case: a full sample period of blind driving, plus physics braking
  const worstOvershoot = speed / rate + (speed * speed) / (2 * BRAKE);

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const ox = 40;
    const oy = 210;
    const scale = 150; // px per metre
    const loop = run.path.length * run.dt + 1.2;
    const tt = (t % loop) / run.dt;
    const x = run.path[Math.min(run.path.length - 1, Math.floor(tt))] ?? run.final;

    // corridor
    D.wire(ctx, [[ox, oy + 30], [ox + WALL * scale + 40, oy + 30]], "#33445e", 2);
    ctx.fillStyle = run.crashed ? D.COL.bad : "#3a4a63";
    ctx.fillRect(ox + WALL * scale, oy - 60, 12, 90);
    D.label(ctx, translate("the wall"), ox + WALL * scale + 6, oy - 74, { size: 10, color: D.COL.muted });

    // stop-distance marker
    ctx.setLineDash([4, 6]);
    D.wire(ctx, [[ox + (WALL - stopDist) * scale, oy - 50], [ox + (WALL - stopDist) * scale, oy + 30]], "rgba(246,178,107,0.6)", 1.5);
    ctx.setLineDash([]);
    D.label(ctx, translate("stop line"), ox + (WALL - stopDist) * scale, oy - 60, { size: 10, color: D.COL.amber });

    // robot
    const rx = ox + x * scale;
    ctx.fillStyle = D.COL.accent;
    ctx.beginPath();
    ctx.roundRect(rx - 26, oy - 14, 26, 24, 5);
    ctx.fill();
    D.dot(ctx, rx - 20, oy + 14, 6, "#0a1420");
    D.dot(ctx, rx - 6, oy + 14, 6, "#0a1420");
    // sensor beam, blinking at the loop rate
    const phase = Math.floor(t * rate) % 2 === 0;
    if (phase) {
      ctx.setLineDash([2, 5]);
      D.wire(ctx, [[rx, oy - 4], [ox + WALL * scale, oy - 4]], "rgba(74,222,128,0.5)", 1.5);
      ctx.setLineDash([]);
    }
    D.glow(ctx, rx + 2, oy - 4, 8, D.COL.good, phase ? 0.8 : 0.15);

    // verdict panel
    D.panel(ctx, 660, 40, 220, 120);
    D.label(ctx, translate("this run"), 770, 62, { size: 11, color: D.COL.muted });
    if (run.crashed) {
      D.label(ctx, translate("CRASH"), 770, 96, { size: 18, bold: true, color: D.COL.bad });
      D.label(ctx, translate("sensed too late to brake"), 770, 130, { size: 10, color: D.COL.muted });
    } else {
      D.label(ctx, `${(margin * 100).toFixed(0)} cm`, 770, 96, { size: 18, bold: true, mono: true, color: D.COL.good });
      D.label(ctx, translate("stopped short of the wall"), 770, 130, { size: 10, color: D.COL.muted });
    }

    D.meter(ctx, 20, 8, 180, "loop period", `${(1000 / rate).toFixed(0)} ms`, D.COL.accent);
    D.meter(ctx, 210, 8, 180, "blind distance / loop", `${((speed / rate) * 100).toFixed(1)} cm`, D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={280} draw={draw} label="A robot approaching a wall, braking when its sampled rangefinder crosses the stop line" />
      <Controls>
        <Slider label="Speed" min={0.2} max={2} step={0.1} value={speed} onChange={setSpeed} fmt={(v) => `${v.toFixed(1)} m/s`} />
        <Slider label="Loop rate" min={1} max={50} step={1} value={rate} onChange={setRate} fmt={(v) => `${v} Hz`} />
        <Slider label="Stop distance" min={0.1} max={1.5} step={0.05} value={stopDist} onChange={setStopDist} fmt={(v) => `${(v * 100).toFixed(0)} cm`} />
      </Controls>
      <Readouts>
        <Readout label="Stop margin" value={run.crashed ? translate("crashed") : `${(margin * 100).toFixed(0)} cm`} tone={run.crashed ? "warn" : "good"} />
        <Readout label="Worst-case overshoot" value={`${(worstOvershoot * 100).toFixed(0)} cm`} tone="amber" />
        <Readout label="Rule" value="a slow loop drives blind between samples" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 0.2 — The duty dial: one PWM channel driving a scope trace, an LED
 * and a motor. Duty is the message; frequency keeps the illusion.
 * ===================================================================== */

const PWM_FREQS = [10, 20, 50, 100, 200, 1000, 5000, 20000];

export function PwmLab() {
  const [duty, setDuty] = useState(40);
  const [fIdx, setFIdx] = useState(5);

  const freq = PWM_FREQS[fIdx];
  const vAvg = (duty / 100) * 6;

  // motor: first-order response to the switched voltage, simulated to steady
  // state (pure) — the ripple is what "the illusion breaking" looks like
  const motor = (() => {
    const tau = 0.15;
    const dt = Math.min(1 / (freq * 40), 0.001);
    let s = 0;
    let tMin = 1;
    let tMax = 0;
    const total = Math.max(1.5, 6 / freq);
    for (let t = 0; t < total; t += dt) {
      const on = (t * freq) % 1 < duty / 100;
      s += (((on ? 6 : 0) - s * 6) / tau) * dt * (1 / 6);
      if (t > total - 2 / freq) {
        tMin = Math.min(tMin, s);
        tMax = Math.max(tMax, s);
      }
    }
    return { mean: (tMin + tMax) / 2, ripple: (tMax - tMin) * 100 };
  })();

  const ledFlickers = freq < 60;
  const motorLumpy = motor.ripple > 8;

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    // scope: two cycles of the square wave
    const gx = 40;
    const gy = 40;
    const gw = 400;
    const gh = 150;
    D.panel(ctx, gx, gy, gw, gh, "#0a1420");
    const cycles = 2;
    ctx.strokeStyle = D.COL.accent;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 400; i++) {
      const ph = (i / 400) * cycles;
      const on = ph % 1 < duty / 100;
      const px = gx + i;
      const py = gy + (on ? 24 : gh - 24);
      if (i === 0) ctx.moveTo(px, py);
      else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();
    // average line
    ctx.setLineDash([5, 5]);
    const avgY = gy + gh - 24 - (duty / 100) * (gh - 48);
    D.wire(ctx, [[gx, avgY], [gx + gw, avgY]], "rgba(246,178,107,0.7)", 1.5);
    ctx.setLineDash([]);
    D.label(ctx, translate("average"), gx + gw - 34, avgY - 10, { size: 10, color: D.COL.amber });
    D.label(ctx, `${translate("one cycle")} = ${freq >= 1000 ? (1000 / freq).toFixed(2) + " ms" : (1000 / freq).toFixed(0) + " ms"}`, gx + gw / 2, gy + gh + 18, { size: 11, color: D.COL.muted });

    // the LED: literally on/off at the real frequency (visible below ~60 Hz)
    const ledOn = freq < 60 ? (t * freq) % 1 < duty / 100 : true;
    const ledLevel = freq < 60 ? (ledOn ? 1 : 0.05) : duty / 100;
    D.panel(ctx, 490, 40, 170, 150);
    D.glow(ctx, 575, 100, 40, D.COL.amber, ledLevel * 0.9);
    D.dot(ctx, 575, 100, 16, `rgba(246,178,107,${0.25 + ledLevel * 0.75})`);
    D.label(ctx, "LED", 575, 160, { size: 11, color: D.COL.muted });

    // the motor: spins at the (rippling) speed
    D.panel(ctx, 690, 40, 190, 150);
    const wob = motorLumpy ? motor.ripple * 0.006 * Math.sin(t * freq * 6.283) : 0;
    const spd = clamp(motor.mean + wob, 0, 1);
    const ang = t * spd * 9;
    D.ring(ctx, 785, 100, 34, "#3a4a63", 6);
    for (let s = 0; s < 3; s++) {
      const a = ang + (s * Math.PI * 2) / 3;
      D.wire(ctx, [[785, 100], [785 + Math.cos(a) * 30, 100 + Math.sin(a) * 30]], D.COL.accent, 4);
    }
    D.dot(ctx, 785, 100, 8, D.COL.accent);
    D.label(ctx, translate("motor"), 785, 160, { size: 11, color: D.COL.muted });

    D.meter(ctx, 20, 214, 180, "average voltage", `${vAvg.toFixed(2)} V`, D.COL.amber);
    D.meter(ctx, 210, 214, 180, "duty", `${duty} %`, D.COL.accent);
    D.meter(ctx, 400, 214, 200, "motor ripple", `${motor.ripple.toFixed(1)} %`, motorLumpy ? D.COL.bad : D.COL.good);
  };

  return (
    <>
      <SimCanvas width={900} height={270} draw={draw} label="A PWM square wave with its average line, driving an LED and a motor" />
      <Controls>
        <Slider label="Duty cycle" min={0} max={100} step={1} value={duty} onChange={setDuty} fmt={(v) => `${v} %`} />
        <PickSlider label="Frequency" values={PWM_FREQS} index={fIdx} onChange={setFIdx} fmt={(v) => (v >= 1000 ? `${v / 1000} kHz` : `${v} Hz`)} />
      </Controls>
      <Readouts>
        <Readout label="Average voltage" value={`${vAvg.toFixed(2)} V ${translate("of")} 6 V`} tone="amber" />
        <Readout label="LED" value={ledFlickers ? "strobing — eye can follow the pulses" : "steady to the eye"} tone={ledFlickers ? "warn" : "good"} />
        <Readout label="Motor" value={motorLumpy ? "lumpy — inertia can't smooth this" : "smooth — rides the average"} tone={motorLumpy ? "warn" : "good"} />
      </Readouts>
    </>
  );
}
