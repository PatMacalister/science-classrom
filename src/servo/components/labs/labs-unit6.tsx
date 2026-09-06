"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Slider, useTl } from "@/servo/components/controls";
import { clamp } from "@/servo/lib/sim/helpers";
import { tl as translate } from "@/servo/lib/labStrings";
import * as D from "@/servo/lib/sim/draw";

const L1 = 110;
const L2 = 90;

/* =====================================================================
 * Lab 6.1 — The teaching studio: record demonstrations, train nothing
 * fancier than nearest-neighbour blending, and measure the policy like
 * an engineer.
 * ===================================================================== */

interface Demo {
  tx: number;
  ty: number;
  a1: number;
  a2: number;
}

interface Trial {
  tx: number;
  ty: number;
  hx: number;
  hy: number;
  ok: boolean;
}

function ik(tx: number, ty: number): [number, number] | null {
  const d2 = tx * tx + ty * ty;
  const c2 = (d2 - L1 * L1 - L2 * L2) / (2 * L1 * L2);
  if (c2 < -1 || c2 > 1) return null;
  const a2 = Math.acos(c2);
  const a1 = Math.atan2(ty, tx) - Math.atan2(L2 * Math.sin(a2), L1 + L2 * Math.cos(a2));
  return [a1, a2];
}

function fk(a1: number, a2: number): [number, number] {
  return [L1 * Math.cos(a1) + L2 * Math.cos(a1 + a2), L1 * Math.sin(a1) + L2 * Math.sin(a1 + a2)];
}

/**
 * The policy: blend the joint angles of the three nearest demonstrations
 * (three points span the plane — two would only interpolate along a line),
 * weighted sharply so a demo right under the target dominates.
 */
function policy(demos: Demo[], tx: number, ty: number): [number, number] | null {
  if (demos.length === 0) return null;
  const scored = demos
    .map((d) => ({ d, dist: Math.hypot(d.tx - tx, d.ty - ty) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 3);
  let wSum = 0;
  let a1 = 0;
  let a2 = 0;
  for (const { d, dist } of scored) {
    const w = 1 / (dist * dist + 40);
    wSum += w;
    a1 += d.a1 * w;
    a2 += d.a2 * w;
  }
  return [a1 / wSum, a2 / wSum];
}

/* the spawn zone: a reachable band in front of the arm */
const SPAWN = { rMin: 95, rMax: 185, aMin: (20 * Math.PI) / 180, aMax: (160 * Math.PI) / 180 };
const TOLERANCE = 16;

export function TeachLab() {
  const tl = useTl();
  const [tx, setTx] = useState(-110);
  const [ty, setTy] = useState(110);
  const [slop, setSlop] = useState(0.15);
  const [demos, setDemos] = useState<Demo[]>([]);
  const [trials, setTrials] = useState<Trial[]>([]);
  const [tally, setTally] = useState({ ok: 0, n: 0 });

  const record = () => {
    const sol = ik(tx, ty);
    if (!sol) return;
    // sloppy teaching: the recorded angles are off by up to ±slop·25°
    const noisy: Demo = {
      tx,
      ty,
      a1: sol[0] + (Math.random() * 2 - 1) * slop * 0.44,
      a2: sol[1] + (Math.random() * 2 - 1) * slop * 0.44,
    };
    setDemos((d) => [...d, noisy]);
  };

  const test = () => {
    const fresh: Trial[] = [];
    let ok = 0;
    for (let i = 0; i < 10; i++) {
      const r = SPAWN.rMin + Math.random() * (SPAWN.rMax - SPAWN.rMin);
      const a = SPAWN.aMin + Math.random() * (SPAWN.aMax - SPAWN.aMin);
      const px = r * Math.cos(a);
      const py = r * Math.sin(a);
      const act = policy(demos, px, py);
      if (!act) continue;
      const [hx, hy] = fk(act[0], act[1]);
      const hit = Math.hypot(hx - px, hy - py) < TOLERANCE;
      if (hit) ok++;
      fresh.push({ tx: px, ty: py, hx, hy, ok: hit });
    }
    setTrials(fresh);
    setTally((s) => ({ ok: s.ok + ok, n: s.n + fresh.length }));
  };

  const forget = () => {
    setDemos([]);
    setTrials([]);
    setTally({ ok: 0, n: 0 });
  };

  const rate = tally.n > 0 ? Math.round((100 * tally.ok) / tally.n) : null;

  const draw = (ctx: CanvasRenderingContext2D) => {
    const ox = 450;
    const oy = 330;

    // spawn zone
    ctx.fillStyle = "rgba(56,189,248,0.08)";
    ctx.beginPath();
    ctx.arc(ox, oy, SPAWN.rMax, -SPAWN.aMax, -SPAWN.aMin);
    ctx.arc(ox, oy, SPAWN.rMin, -SPAWN.aMin, -SPAWN.aMax, true);
    ctx.closePath();
    ctx.fill();
    D.label(ctx, translate("spawn zone"), ox, oy - SPAWN.rMax - 12, { size: 10, color: D.COL.muted });

    // demos
    for (const d of demos) {
      D.dot(ctx, ox + d.tx, oy - d.ty, 5, D.COL.amber);
    }
    // trials: where the target was, where the hand went
    for (const trial of trials) {
      const c = trial.ok ? D.COL.good : D.COL.bad;
      D.ring(ctx, ox + trial.tx, oy - trial.ty, 7, c, 2);
      if (!trial.ok) {
        ctx.setLineDash([3, 4]);
        D.wire(ctx, [[ox + trial.tx, oy - trial.ty], [ox + trial.hx, oy - trial.hy]], "rgba(242,109,109,0.5)", 1.5);
        ctx.setLineDash([]);
        D.dot(ctx, ox + trial.hx, oy - trial.hy, 3.5, c);
      }
    }

    // the arm at the current teaching pose (exact IK, before noise)
    const sol = ik(tx, ty);
    if (sol) {
      const jx = ox + L1 * Math.cos(sol[0]);
      const jy = oy - L1 * Math.sin(sol[0]);
      const [hx, hy] = fk(sol[0], sol[1]);
      D.wire(ctx, [[ox, oy], [jx, jy]], "rgba(56,189,248,0.75)", 7);
      D.wire(ctx, [[jx, jy], [ox + hx, oy - hy]], "rgba(74,222,128,0.75)", 5);
      D.dot(ctx, ox, oy, 10, D.COL.text);
      D.dot(ctx, jx, jy, 7, D.COL.accent);
      D.dot(ctx, ox + hx, oy - hy, 6, D.COL.amber);
    }
    D.ring(ctx, ox + tx, oy - ty, 9, sol ? D.COL.text : D.COL.bad, 1.5);

    D.meter(ctx, 20, 8, 170, "demos", `${demos.length}`, D.COL.amber);
    D.meter(ctx, 200, 8, 210, "success rate", rate !== null ? `${rate} %` : "—", rate === null ? D.COL.muted : rate >= 80 ? D.COL.good : rate >= 50 ? D.COL.amber : D.COL.bad);
    D.meter(ctx, 420, 8, 190, "trials", `${tally.n}`, D.COL.text);
    D.label(ctx, translate("amber dots: demos · rings: fresh tests · dashes: where the policy actually reached"), 450, 585, { size: 10, color: D.COL.muted });
  };

  return (
    <>
      <SimCanvas width={900} height={600} draw={draw} label="A robot arm's demonstration map and test results, success and failure rings across the spawn zone" />
      <Controls>
        <Slider label="Teach target x" min={-200} max={200} step={5} value={tx} onChange={setTx} fmt={(v) => `${v}`} />
        <Slider label="Teach target y" min={40} max={200} step={5} value={ty} onChange={setTy} fmt={(v) => `${v}`} />
        <Slider label="Sloppiness" min={0} max={1} step={0.05} value={slop} onChange={setSlop} fmt={(v) => `${(v * 100).toFixed(0)} %`} />
        <div className="ctl-row">
          <label>{tl("Studio")}</label>
          <button type="button" className="btn secondary small" onClick={record}>
            {tl("🎬 Record demo here")}
          </button>
          <button type="button" className="btn secondary small" onClick={test} disabled={demos.length === 0}>
            {tl("🧪 Test 10 fresh targets")}
          </button>
          <button type="button" className="btn secondary small" onClick={forget}>
            {tl("🗑 Forget everything")}
          </button>
        </div>
      </Controls>
      <Readouts>
        <Readout label="Success rate" value={rate !== null ? `${rate} % ${translate("over")} ${tally.n} ${translate("fresh targets")}` : "untested"} tone={rate !== null && rate >= 80 ? "good" : "amber"} />
        <Readout label="Dataset" value={`${demos.length} ${translate("demos — coverage is the program")}`} />
        <Readout label="Rule" value="failures cluster where demos are missing" tone="amber" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 6.2 — The reality check: tune in simulation, deploy to a world
 * with different physics, and let randomization buy robustness.
 * ===================================================================== */

function response(kp: number, kd: number, gain: number, fric: number, tau: number): { xs: number[]; score: number } {
  const dt = 0.005;
  let x = 0;
  let v = 0;
  let m = 0; // the motor lags its command — the detail simulators get wrong
  const xs: number[] = [];
  for (let t = 0; t < 6; t += dt) {
    const u = kp * (1 - x) - kd * v;
    m += ((u - m) / tau) * dt;
    v += (gain * 4 * m - fric * 6 * v) * dt;
    x += v * dt;
    xs.push(x);
  }
  const peak = Math.max(...xs);
  const overshoot = Math.max(0, peak - 1);
  let settle = 6;
  for (let i = xs.length - 1; i >= 0; i--) {
    if (Math.abs(xs[i] - 1) > 0.05) {
      settle = (i + 1) * dt;
      break;
    }
  }
  const sse = Math.abs(1 - xs[xs.length - 1]);
  const score = clamp(100 - overshoot * 200 - settle * 9 - sse * 320, 0, 100);
  return { xs, score };
}

/* the training worlds fan out one-sided from the idealised sim toward
 * plausible hardware — widening the range is what the slider buys */
const OFFSETS = [0, 0.25, 0.5, 0.75, 1];

export function SimGapLab() {
  const tl = useTl();
  const [kp, setKp] = useState(3);
  const [kd, setKd] = useState(0.5);
  const [rand, setRand] = useState(0);
  const [deployed, setDeployed] = useState<{ score: number; kp: number; kd: number; fric: number; gain: number; tau: number } | null>(null);

  const worlds = OFFSETS.map((o) => ({ gain: 1 - o * rand, fric: 0.5 + o * rand * 1.8, tau: 0.05 + o * rand * 0.85 }));
  const runs = worlds.map((w) => response(kp, kd, w.gain, w.fric, w.tau));
  const simScore = runs.reduce((s, r) => s + r.score, 0) / runs.length;

  const deploy = () => {
    // reality: heavier friction, weaker and laggier motor — fresh roll each press
    const fric = 1.3;
    const gain = 0.55 + Math.random() * 0.2;
    const tau = 0.3 + Math.random() * 0.12;
    const { score } = response(kp, kd, gain, fric, tau);
    setDeployed({ score, kp, kd, fric, gain, tau });
  };

  const stale = deployed && (deployed.kp !== kp || deployed.kd !== kd);

  const draw = (ctx: CanvasRenderingContext2D) => {
    const plot = (gx: number, title: string, series: number[][], scores: number[] | null, accent: string) => {
      const gy = 40;
      const gw = 380;
      const gh = 210;
      D.panel(ctx, gx, gy, gw, gh, "#0a1420");
      D.label(ctx, translate(title), gx + gw / 2, gy - 12, { size: 11, bold: true, color: D.COL.muted });
      const yOf = (v: number) => gy + gh - clamp(v / 1.6, 0, 1) * (gh - 16) - 8;
      D.wire(ctx, [[gx, yOf(1)], [gx + gw, yOf(1)]], "rgba(255,255,255,0.35)", 1.2);
      D.label(ctx, translate("target"), gx + gw - 30, yOf(1) - 9, { size: 9, color: D.COL.text });
      series.forEach((xs, si) => {
        ctx.strokeStyle = accent;
        ctx.globalAlpha = series.length > 1 ? 0.45 + 0.1 * si : 1;
        ctx.lineWidth = series.length > 1 ? 1.4 : 2.4;
        ctx.beginPath();
        xs.forEach((v, i) => {
          if (i % 3 !== 0) return;
          const px = gx + (i / xs.length) * gw;
          const py = yOf(v);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();
        ctx.globalAlpha = 1;
      });
      if (scores) {
        D.label(ctx, `${scores[0].toFixed(0)} / 100`, gx + gw / 2, gy + gh + 20, { size: 14, mono: true, bold: true, color: accent });
      }
    };

    plot(40, "SIMULATION (training worlds)", runs.map((r) => r.xs), [simScore], "#38bdf8");
    if (deployed) {
      const real = response(deployed.kp, deployed.kd, deployed.gain, deployed.fric, deployed.tau);
      plot(480, "REALITY (deployed)", [real.xs], [deployed.score], deployed.score > 70 ? "#4ade80" : deployed.score > 40 ? "#f6b26b" : "#f26d6d");
      if (stale) {
        D.label(ctx, translate("gains changed since deploy — deploy again"), 670, 300, { size: 11, color: D.COL.amber });
      }
    } else {
      D.panel(ctx, 480, 40, 380, 210, "#0a0d13");
      D.label(ctx, translate("REALITY"), 670, 28, { size: 11, bold: true, color: D.COL.muted });
      D.label(ctx, translate("not deployed yet"), 670, 145, { size: 13, color: D.COL.muted });
    }
  };

  return (
    <>
      <SimCanvas width={900} height={330} draw={draw} label="Step responses in the training simulation next to the deployed reality run and its score" />
      <Controls>
        <Slider label="Kp" min={0.5} max={9} step={0.1} value={kp} onChange={setKp} fmt={(v) => v.toFixed(1)} />
        <Slider label="Kd" min={0} max={3} step={0.05} value={kd} onChange={setKd} fmt={(v) => v.toFixed(2)} />
        <Slider label="Randomization" min={0} max={0.4} step={0.02} value={rand} onChange={setRand} fmt={(v) => `±${(v * 100).toFixed(0)} %`} />
        <div className="ctl-row">
          <label>{tl("Ship it")}</label>
          <button type="button" className="btn secondary small" onClick={deploy}>
            {tl("🚀 DEPLOY")}
          </button>
        </div>
      </Controls>
      <Readouts>
        <Readout label="Sim score" value={`${simScore.toFixed(0)} / 100 ${rand > 0 ? `${translate("across")} ${OFFSETS.length} ${translate("worlds")}` : ""}`} tone="amber" />
        <Readout
          label="Deployed score"
          value={deployed ? `${deployed.score.toFixed(0)} / 100${stale ? " " + translate("(stale)") : ""}` : "press DEPLOY"}
          tone={deployed && deployed.score > 70 ? "good" : deployed ? "warn" : undefined}
        />
        <Readout label="Rule" value="train across many wrong worlds → survive the real one" tone="amber" />
      </Readouts>
    </>
  );
}
