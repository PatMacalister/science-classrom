"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Slider, Segmented } from "@/catalyst/components/controls";
import { clamp, rng } from "@/catalyst/lib/sim/helpers";
import * as D from "@/catalyst/lib/sim/draw";

/* =====================================================================
 * Lab 5.1 — the energy landscape: ΔH, Ea and the catalyst tunnel
 * ===================================================================== */

export function EnergyLab() {
  const [dH, setDH] = useState(-60);
  const [ea, setEa] = useState(90);
  const [catalyst, setCatalyst] = useState<"off" | "on">("off");
  const [push, setPush] = useState(70);
  const ball = useRef({ s: 0, v: 0, running: false });

  const eaEff = catalyst === "on" ? ea * 0.55 : ea;

  const launch = () => {
    ball.current = { s: 0, v: 0.9 * Math.sqrt(push), running: true };
  };

  // energy profile: reactants at 0, peak at eaEff, products at dH  (kJ, drawn to scale)
  const profile = (s: number): number => {
    // s in [0,1]: smooth hump from 0 over eaEff down to dH
    const peakPos = 0.5;
    if (s < peakPos) {
      const t = s / peakPos;
      return eaEff * (3 * t * t - 2 * t * t * t);
    }
    const t = (s - peakPos) / (1 - peakPos);
    return eaEff + (dH - eaEff) * (3 * t * t - 2 * t * t * t);
  };

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const g = { x: 80, y: 40, w: 740, h: 320 };
    D.panel(ctx, g.x, g.y, g.w, g.h);
    const mapX = (s: number) => g.x + 50 + s * (g.w - 100);
    const mapY = (e: number) => g.y + g.h - 80 - ((e + 120) / 300) * (g.h - 90);

    // baseline energies
    ctx.setLineDash([4, 6]);
    D.wire(ctx, [[mapX(0) - 30, mapY(0)], [mapX(1) + 30, mapY(0)]], "rgba(148,163,179,0.4)", 1);
    D.wire(ctx, [[mapX(0.6), mapY(dH)], [mapX(1) + 30, mapY(dH)]], "rgba(148,163,179,0.4)", 1);
    ctx.setLineDash([]);

    // uncatalyzed ghost curve when catalyst is on
    if (catalyst === "on") {
      ctx.strokeStyle = "rgba(148,163,179,0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let s = 0; s <= 1; s += 0.01) {
        const peakPos = 0.5;
        const e =
          s < peakPos
            ? ea * (3 * (s / peakPos) ** 2 - 2 * (s / peakPos) ** 3)
            : ea + (dH - ea) * (3 * ((s - peakPos) / 0.5) ** 2 - 2 * ((s - peakPos) / 0.5) ** 3);
        const x = mapX(s);
        const y = mapY(e);
        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      D.label(ctx, "without catalyst", mapX(0.5), mapY(ea) - 14, { size: 11, color: "rgba(148,163,179,0.5)" });
    }

    // main curve
    ctx.strokeStyle = D.COL.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let s = 0; s <= 1; s += 0.01) {
      const x = mapX(s);
      const y = mapY(profile(s));
      if (s === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // annotations
    D.label(ctx, "reactants", mapX(0), mapY(0) + 20, { size: 12, color: D.COL.muted });
    D.label(ctx, "products", mapX(1), mapY(dH) + 20, { size: 12, color: D.COL.muted });
    D.arrow(ctx, mapX(0.5), mapY(0), mapX(0.5), mapY(eaEff) + 6, D.COL.amber, 2);
    D.label(ctx, `Ea = ${eaEff.toFixed(0)} kJ`, mapX(0.5) + 62, (mapY(0) + mapY(eaEff)) / 2, { size: 12, color: D.COL.amber });
    D.arrow(ctx, mapX(1) + 24, mapY(0), mapX(1) + 24, mapY(dH) + (dH < 0 ? -6 : 6), dH < 0 ? D.COL.good : D.COL.bad, 2);
    D.label(ctx, `ΔH = ${dH} kJ`, mapX(1) - 46, mapY(dH / 2), { size: 12, color: dH < 0 ? D.COL.good : D.COL.bad });

    // the rolling "reaction" ball
    const b = ball.current;
    if (b.running) {
      const slope = (profile(Math.min(1, b.s + 0.01)) - profile(b.s)) / 0.01;
      b.v -= slope * 0.016 * dt * 60 * 0.06;
      b.v *= 0.999;
      b.s += b.v * dt * 0.35;
      if (b.s <= 0) {
        b.s = 0;
        b.running = Math.abs(b.v) > 0.05;
        b.v = 0;
      }
      if (b.s >= 1) {
        b.s = 1;
        b.running = false;
      }
    }
    const bx = mapX(b.s);
    const by = mapY(profile(b.s)) - 10;
    D.glow(ctx, bx, by, 18, D.COL.violet, 0.5);
    D.dot(ctx, bx, by, 9, D.COL.violet);

    const made = b.s >= 1;
    const stuck = !b.running && b.s === 0;
    D.meter(ctx, 80, 380, 190, "reaction type", dH < 0 ? "exothermic (releases)" : dH > 0 ? "endothermic (absorbs)" : "thermoneutral", dH < 0 ? D.COL.good : D.COL.bad);
    D.meter(ctx, 285, 380, 190, "hill to climb", `${eaEff.toFixed(0)} kJ${catalyst === "on" ? " (catalyzed)" : ""}`, D.COL.amber);
    D.meter(ctx, 490, 380, 260, "last attempt", made ? "made it — products!" : stuck ? "rolled back — no reaction" : "…rolling…", made ? D.COL.good : stuck ? D.COL.bad : D.COL.muted);
  };

  return (
    <>
      <SimCanvas width={900} height={440} draw={draw} />
      <Controls>
        <Slider label="ΔH (products − reactants)" min={-100} max={100} step={5} value={dH} onChange={setDH} fmt={(v) => `${v} kJ`} />
        <Slider label="Activation energy Ea" min={30} max={150} step={5} value={ea} onChange={setEa} fmt={(v) => `${v} kJ`} />
        <Segmented
          label="Catalyst"
          options={[
            { value: "off", label: "none" },
            { value: "on", label: "add catalyst" },
          ]}
          value={catalyst}
          onChange={setCatalyst}
        />
        <Slider label="Collision energy" min={20} max={150} step={5} value={push} onChange={setPush} fmt={(v) => `${v} kJ`} />
        <div className="ctl-row">
          <label>Attempt</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={launch}>
              Launch the collision →
            </button>
          </div>
        </div>
      </Controls>
    </>
  );
}

/* =====================================================================
 * Lab 5.2 — collision theory: temperature, concentration, catalyst
 * ===================================================================== */

interface RateParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  kind: 0 | 1 | 2; // A, B, AB
}

const RBOX = { x: 60, y: 50, w: 540, h: 340 };

export function RateLab() {
  const [tempPct, setTempPct] = useState(40);
  const [conc, setConc] = useState(24);
  const [catalyst, setCatalyst] = useState<"off" | "on">("off");
  const world = useRef<{ parts: RateParticle[]; events: number[] }>({ parts: [], events: [] });

  const ensureParticles = () => {
    const w = world.current;
    const target = conc;
    const rand = rng(w.parts.length + 3);
    while (w.parts.length < target * 2) {
      w.parts.push({
        x: RBOX.x + 10 + rand() * (RBOX.w - 20),
        y: RBOX.y + 10 + rand() * (RBOX.h - 20),
        vx: rand() * 2 - 1,
        vy: rand() * 2 - 1,
        kind: (w.parts.length % 2) as 0 | 1,
      });
    }
    while (w.parts.length > target * 2) w.parts.pop();
  };

  const draw = (ctx: CanvasRenderingContext2D, dt: number, t: number) => {
    ensureParticles();
    const w = world.current;
    D.panel(ctx, RBOX.x, RBOX.y, RBOX.w, RBOX.h);

    const speed = 40 + (tempPct / 100) * 260;
    const threshold = catalyst === "on" ? 0.35 : 0.75; // fraction of max speed needed to react

    for (const p of w.parts) {
      p.x += p.vx * speed * dt;
      p.y += p.vy * speed * dt;
      if (p.x < RBOX.x + 8 || p.x > RBOX.x + RBOX.w - 8) p.vx *= -1;
      if (p.y < RBOX.y + 8 || p.y > RBOX.y + RBOX.h - 8) p.vy *= -1;
      p.x = clamp(p.x, RBOX.x + 8, RBOX.x + RBOX.w - 8);
      p.y = clamp(p.y, RBOX.y + 8, RBOX.y + RBOX.h - 8);
    }

    // A + B collisions
    for (let i = 0; i < w.parts.length; i++) {
      const a = w.parts[i];
      if (a.kind !== 0) continue;
      for (let j = 0; j < w.parts.length; j++) {
        const b = w.parts[j];
        if (b.kind !== 1) continue;
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 14) {
          const rel = Math.hypot(a.vx - b.vx, a.vy - b.vy); // 0..~2
          if (rel > threshold * 2) {
            a.kind = 2;
            b.kind = 2;
            w.events.push(t);
          } else {
            // bounce apart
            a.vx *= -1;
            b.vx *= -1;
          }
        }
      }
    }

    // decay AB back so the sim never runs dry (keeps a steady state)
    for (const p of w.parts) {
      if (p.kind === 2 && Math.random() < 0.15 * dt) p.kind = Math.random() < 0.5 ? 0 : 1;
    }

    w.events = w.events.filter((e) => t - e < 3);
    const rate = w.events.length / 3;

    for (const p of w.parts) {
      D.dot(ctx, p.x, p.y, p.kind === 2 ? 7 : 6, p.kind === 0 ? D.COL.bad : p.kind === 1 ? D.COL.accent : D.COL.good);
    }

    // rate meter panel
    D.panel(ctx, 640, 50, 230, 340, "#101825");
    D.label(ctx, "reaction rate", 755, 84, { size: 13, color: D.COL.muted });
    D.label(ctx, `${rate.toFixed(1)} / s`, 755, 116, { size: 26, mono: true, bold: true, color: rate > 2 ? D.COL.good : D.COL.text });
    D.barGauge(ctx, 665, 140, 180, 16, rate / 12, D.COL.good);
    D.label(ctx, "A = red · B = cyan", 755, 190, { size: 11, color: D.COL.muted });
    D.label(ctx, "AB product = green", 755, 208, { size: 11, color: D.COL.muted });
    D.label(ctx, `energy threshold: ${catalyst === "on" ? "LOWERED" : "full"}`, 755, 248, { size: 11.5, color: catalyst === "on" ? D.COL.good : D.COL.amber });
    D.label(ctx, "slow collisions bounce,", 755, 296, { size: 11, color: D.COL.muted });
    D.label(ctx, "fast ones react", 755, 312, { size: 11, color: D.COL.muted });
  };

  return (
    <>
      <SimCanvas width={900} height={440} draw={draw} />
      <Controls>
        <Slider label="Temperature" min={5} max={100} step={1} value={tempPct} onChange={setTempPct} fmt={(v) => `${v} %`} />
        <Slider label="Concentration (pairs)" min={6} max={50} step={2} value={conc} onChange={setConc} fmt={(v) => `${v}`} />
        <Segmented
          label="Catalyst"
          options={[
            { value: "off", label: "none" },
            { value: "on", label: "add catalyst" },
          ]}
          value={catalyst}
          onChange={setCatalyst}
        />
      </Controls>
    </>
  );
}

/* =====================================================================
 * Lab 5.3 — equilibrium: the two-way street that looks still
 * ===================================================================== */

const EQBOX = { x: 60, y: 50, w: 500, h: 300 };

export function EquilibriumLab() {
  const [tempPct, setTempPct] = useState(30);
  const world = useRef<{ states: Array<0 | 1>; xs: number[]; ys: number[] }>({
    states: Array.from({ length: 80 }, (_, i) => (i < 60 ? 0 : 1) as 0 | 1),
    xs: Array.from({ length: 80 }, (_, i) => EQBOX.x + 15 + ((i * 37) % (EQBOX.w - 30))),
    ys: Array.from({ length: 80 }, (_, i) => EQBOX.y + 15 + ((i * 53) % (EQBOX.h - 30))),
  });

  // A → B forward rate constant; B → A reverse. Forward is exothermic,
  // so heating boosts the REVERSE reaction more (Le Chatelier).
  const kf = 0.5;
  const kb = 0.15 + (tempPct / 100) * 0.9;

  const addParticles = (kind: 0 | 1, count: number) => {
    const w = world.current;
    for (let i = 0; i < count; i++) {
      w.states.push(kind);
      w.xs.push(EQBOX.x + 15 + Math.random() * (EQBOX.w - 30));
      w.ys.push(EQBOX.y + 15 + Math.random() * (EQBOX.h - 30));
    }
  };
  const removeB = (count: number) => {
    const w = world.current;
    let removed = 0;
    for (let i = w.states.length - 1; i >= 0 && removed < count; i--) {
      if (w.states[i] === 1) {
        w.states.splice(i, 1);
        w.xs.splice(i, 1);
        w.ys.splice(i, 1);
        removed++;
      }
    }
  };

  const draw = (ctx: CanvasRenderingContext2D, dt: number, t: number) => {
    const w = world.current;
    D.panel(ctx, EQBOX.x, EQBOX.y, EQBOX.w, EQBOX.h);

    let nA = 0;
    let nB = 0;
    w.states.forEach((s, i) => {
      // stochastic conversion
      if (s === 0 && Math.random() < kf * dt) w.states[i] = 1;
      else if (s === 1 && Math.random() < kb * dt) w.states[i] = 0;
      // gentle drift
      w.xs[i] += Math.sin(t * 1.7 + i) * 14 * dt;
      w.ys[i] += Math.cos(t * 1.3 + i * 2) * 14 * dt;
      w.xs[i] = clamp(w.xs[i], EQBOX.x + 10, EQBOX.x + EQBOX.w - 10);
      w.ys[i] = clamp(w.ys[i], EQBOX.y + 10, EQBOX.y + EQBOX.h - 10);
      if (w.states[i] === 0) nA++;
      else nB++;
      D.dot(ctx, w.xs[i], w.ys[i], 6, w.states[i] === 0 ? D.COL.bad : D.COL.accent);
    });

    const K = kf / kb;
    const Q = nA > 0 ? nB / nA : Infinity;

    // live bars
    D.panel(ctx, 610, 50, 260, 300, "#101825");
    D.label(ctx, "A ⇌ B  (forward exothermic)", 740, 78, { size: 12.5, color: D.COL.muted });
    const total = Math.max(1, nA + nB);
    D.label(ctx, `A: ${nA}`, 660, 112, { size: 13, mono: true, color: D.COL.bad });
    D.barGauge(ctx, 630, 124, 220, 16, nA / total, D.COL.bad);
    D.label(ctx, `B: ${nB}`, 660, 162, { size: 13, mono: true, color: D.COL.accent });
    D.barGauge(ctx, 630, 174, 220, 16, nB / total, D.COL.accent);
    D.label(ctx, `K = kf/kb = ${K.toFixed(2)}`, 740, 226, { size: 14, mono: true, color: D.COL.amber });
    D.label(ctx, `Q = [B]/[A] = ${Q === Infinity ? "∞" : Q.toFixed(2)}`, 740, 250, { size: 14, mono: true, color: D.COL.text });
    const settled = Math.abs(Q - K) / K < 0.25;
    D.label(
      ctx,
      settled ? "≈ at equilibrium (Q ≈ K)" : Q < K ? "shifting → (making more B)" : "shifting ← (making more A)",
      740,
      286,
      { size: 12.5, color: settled ? D.COL.good : D.COL.amber }
    );
    D.label(ctx, "individual particles never stop", 740, 322, { size: 11, color: D.COL.muted });

    D.meter(ctx, 60, 370, 220, "disturb the system", "use the buttons below", D.COL.muted);
    D.meter(ctx, 295, 370, 265, "watch it fight back", "Le Chatelier in action", D.COL.violet);
  };

  return (
    <>
      <SimCanvas width={900} height={430} draw={draw} />
      <Controls>
        <div className="ctl-row">
          <label>Stress the system</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={() => addParticles(0, 20)}>
              + add 20 A
            </button>
            <button type="button" className="seg-btn" onClick={() => addParticles(1, 20)}>
              + add 20 B
            </button>
            <button type="button" className="seg-btn" onClick={() => removeB(20)}>
              − remove 20 B
            </button>
          </div>
        </div>
        <Slider label="Temperature" min={0} max={100} step={1} value={tempPct} onChange={setTempPct} fmt={(v) => `${v} %`} />
      </Controls>
    </>
  );
}
