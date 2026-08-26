"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Slider, Segmented } from "@/catalyst/components/controls";
import { clamp, rng } from "@/catalyst/lib/sim/helpers";
import * as D from "@/catalyst/lib/sim/draw";

/* =====================================================================
 * Lab 3.1 — States of matter: one substance, three dances
 * ===================================================================== */

interface StateSubstance {
  id: string;
  label: string;
  melt: number;
  boil: number;
  min: number;
  max: number;
  color: string;
}

const STATE_SUBSTANCES: StateSubstance[] = [
  { id: "water", label: "Water", melt: 0, boil: 100, min: -60, max: 160, color: D.COL.accent },
  { id: "nitrogen", label: "Nitrogen", melt: -210, boil: -196, min: -250, max: -150, color: D.COL.violet },
  { id: "iron", label: "Iron", melt: 1538, boil: 2862, min: 1300, max: 3100, color: D.COL.amber },
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  homeX: number;
  homeY: number;
}

const BOX = { x: 80, y: 60, w: 480, h: 330 };

function makeParticles(): Particle[] {
  const out: Particle[] = [];
  const rand = rng(7);
  for (let i = 0; i < 48; i++) {
    const col = i % 8;
    const row = Math.floor(i / 8);
    const homeX = BOX.x + 60 + col * 46;
    const homeY = BOX.y + BOX.h - 30 - row * 42;
    out.push({ x: homeX, y: homeY, vx: rand() - 0.5, vy: rand() - 0.5, homeX, homeY });
  }
  return out;
}

export function StatesLab() {
  const [subId, setSubId] = useState("water");
  const sub = STATE_SUBSTANCES.find((s) => s.id === subId)!;
  const [temp, setTemp] = useState(20);
  const parts = useRef<Particle[]>(makeParticles());

  const t = clamp(temp, sub.min, sub.max);
  const state = t < sub.melt ? "solid" : t < sub.boil ? "liquid" : "gas";

  const draw = (ctx: CanvasRenderingContext2D, dt: number, time: number) => {
    D.panel(ctx, BOX.x, BOX.y, BOX.w, BOX.h);

    const energy = clamp((t - sub.min) / (sub.max - sub.min), 0, 1);
    const ps = parts.current;

    for (const p of ps) {
      if (state === "solid") {
        // vibrate around lattice sites
        const jitter = 1.5 + energy * 4;
        p.x = p.homeX + Math.sin(time * 9 + p.homeX) * jitter;
        p.y = p.homeY + Math.cos(time * 11 + p.homeY) * jitter;
      } else {
        const speed = state === "liquid" ? 26 + energy * 40 : 120 + energy * 260;
        p.x += p.vx * speed * dt;
        p.y += p.vy * speed * dt;
        // liquids pool in the lower half; gases fill the box
        const top = state === "liquid" ? BOX.y + BOX.h * 0.45 : BOX.y + 8;
        if (p.x < BOX.x + 8 || p.x > BOX.x + BOX.w - 8) p.vx *= -1;
        if (p.y < top || p.y > BOX.y + BOX.h - 8) p.vy *= -1;
        p.x = clamp(p.x, BOX.x + 8, BOX.x + BOX.w - 8);
        p.y = clamp(p.y, top, BOX.y + BOX.h - 8);
        // liquids: gentle random drift so they slosh, not fly
        if (state === "liquid" && Math.random() < 0.02) {
          p.vx = Math.random() - 0.5;
          p.vy = Math.random() - 0.5;
        }
      }
      D.dot(ctx, p.x, p.y, 7, sub.color);
    }

    if (state === "liquid") {
      D.wire(ctx, [[BOX.x + 4, BOX.y + BOX.h * 0.45], [BOX.x + BOX.w - 4, BOX.y + BOX.h * 0.45]], "rgba(255,255,255,0.15)", 1);
    }

    // thermometer
    const thX = 660;
    const thTop = 80;
    const thH = 280;
    D.panel(ctx, thX - 22, thTop - 16, 130, thH + 60, "#101825");
    const frac = (t - sub.min) / (sub.max - sub.min);
    ctx.fillStyle = "#33445e";
    ctx.fillRect(thX, thTop, 14, thH);
    ctx.fillStyle = t < sub.melt ? D.COL.accent : t < sub.boil ? D.COL.good : D.COL.bad;
    ctx.fillRect(thX, thTop + thH * (1 - frac), 14, thH * frac);
    for (const [val, name] of [
      [sub.melt, `melts ${sub.melt}°`],
      [sub.boil, `boils ${sub.boil}°`],
    ] as const) {
      const y = thTop + thH * (1 - (val - sub.min) / (sub.max - sub.min));
      D.wire(ctx, [[thX - 8, y], [thX + 22, y]], D.COL.amber, 1.5);
      D.label(ctx, name, thX + 62, y, { size: 11, color: D.COL.amber, align: "center" });
    }
    D.label(ctx, `${t.toFixed(0)} °C`, thX + 40, thTop + thH + 26, { size: 16, mono: true, bold: true, color: D.COL.text });

    D.meter(ctx, 20, 12, 160, "state", state.toUpperCase(), state === "solid" ? D.COL.accent : state === "liquid" ? D.COL.good : D.COL.bad);
    D.meter(
      ctx,
      195,
      12,
      280,
      "particle behaviour",
      state === "solid" ? "vibrating in a lattice" : state === "liquid" ? "sliding, still touching" : "flying free",
      D.COL.muted
    );
  };

  return (
    <>
      <SimCanvas width={900} height={440} draw={draw} />
      <Controls>
        <Segmented
          label="Substance"
          options={STATE_SUBSTANCES.map((s) => ({ value: s.id, label: s.label }))}
          value={subId}
          onChange={(v) => {
            const next = STATE_SUBSTANCES.find((s) => s.id === v)!;
            setSubId(v);
            setTemp(clamp(temp, next.min, next.max));
          }}
        />
        <Slider label="Temperature" min={sub.min} max={sub.max} step={1} value={t} onChange={setTemp} fmt={(v) => `${v} °C`} />
      </Controls>
    </>
  );
}

/* =====================================================================
 * Lab 3.2 — The gas piston: PV = nRT made squeezable
 * ===================================================================== */

export function GasLab() {
  const [n, setN] = useState(1);
  const [tempK, setTempK] = useState(300);
  const [vol, setVol] = useState(25);
  const parts = useRef(
    Array.from({ length: 40 }, (_, i) => {
      const rand = rng(i + 1);
      return { x: 150 + rand() * 300, y: 100 + rand() * 280, vx: rand() * 2 - 1, vy: rand() * 2 - 1 };
    })
  );

  const R = 8.314;
  const pressure = (n * R * tempK) / vol; // kPa (n in mol, V in L, T in K)

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    // cylinder: fixed left wall, piston position from volume
    const cyl = { x: 110, y: 80, wMax: 560, h: 300 };
    const w = cyl.wMax * (vol / 50);
    D.panel(ctx, cyl.x, cyl.y, cyl.wMax + 30, cyl.h, "#0b1119");
    // piston
    ctx.fillStyle = "#3d4f6b";
    ctx.fillRect(cyl.x + w, cyl.y, 18, cyl.h);
    ctx.fillStyle = "#33445e";
    ctx.fillRect(cyl.x + w + 18, cyl.y + cyl.h / 2 - 7, 120, 14);

    const count = Math.round(n * 20);
    const speed = 30 + (tempK / 600) * 260;
    parts.current.forEach((p, i) => {
      if (i >= count) return;
      p.x += p.vx * speed * dt;
      p.y += p.vy * speed * dt;
      if (p.x < cyl.x + 8) {
        p.x = cyl.x + 8;
        p.vx = Math.abs(p.vx);
      }
      if (p.x > cyl.x + w - 8) {
        p.x = cyl.x + w - 8;
        p.vx = -Math.abs(p.vx);
      }
      if (p.y < cyl.y + 8) {
        p.y = cyl.y + 8;
        p.vy = Math.abs(p.vy);
      }
      if (p.y > cyl.y + cyl.h - 8) {
        p.y = cyl.y + cyl.h - 8;
        p.vy = -Math.abs(p.vy);
      }
      const heat = clamp((tempK - 100) / 500, 0, 1);
      D.dot(ctx, p.x, p.y, 5, `rgb(${Math.round(120 + heat * 130)}, ${Math.round(180 - heat * 60)}, ${Math.round(240 - heat * 140)})`);
    });

    // pressure gauge
    const gx = 790;
    const gy = 170;
    D.ring(ctx, gx, gy, 52, "#33445e", 3);
    const maxP = 600;
    const ang = Math.PI * 0.75 + (clamp(pressure, 0, maxP) / maxP) * Math.PI * 1.5;
    D.wire(ctx, [[gx, gy], [gx + Math.cos(ang) * 40, gy + Math.sin(ang) * 40]], pressure > 400 ? D.COL.bad : D.COL.accent, 3);
    D.dot(ctx, gx, gy, 5, D.COL.muted);
    D.label(ctx, "P", gx, gy + 30, { size: 12, color: D.COL.muted });
    D.label(ctx, `${pressure.toFixed(0)} kPa`, gx, gy + 78, { size: 15, mono: true, bold: true, color: pressure > 400 ? D.COL.bad : D.COL.accent });
    D.label(ctx, "≈ 101 kPa = 1 atm", gx, gy + 100, { size: 10, color: D.COL.muted });

    D.meter(ctx, 20, 12, 170, "P = nRT / V", `${pressure.toFixed(0)} kPa`, pressure > 400 ? D.COL.bad : D.COL.accent);
    D.meter(ctx, 205, 12, 150, "particles shown", `${count}`, D.COL.muted);
    D.label(ctx, "watch the wall-drumming: pressure IS the sum of particle impacts", 380, 415, { size: 12.5, color: D.COL.muted });
  };

  return (
    <>
      <SimCanvas width={900} height={440} draw={draw} />
      <Controls>
        <Slider label="Amount n" min={0.5} max={2} step={0.1} value={n} onChange={setN} fmt={(v) => `${v.toFixed(1)} mol`} />
        <Slider label="Temperature T" min={100} max={600} step={5} value={tempK} onChange={setTempK} fmt={(v) => `${v} K`} />
        <Slider label="Volume V (piston)" min={5} max={50} step={1} value={vol} onChange={setVol} fmt={(v) => `${v} L`} />
      </Controls>
    </>
  );
}

/* =====================================================================
 * Lab 3.3 — Dissolving: saturation and the temperature lever
 * ===================================================================== */

interface Solute {
  id: string;
  label: string;
  /** solubility in g per 100 mL water at temperature T (°C) */
  solubility: (t: number) => number;
  color: string;
}

const SOLUTES: Solute[] = [
  { id: "nacl", label: "Table salt (NaCl)", solubility: (t) => 35.7 + 0.035 * t, color: "rgba(221,230,240,0.8)" },
  { id: "kno3", label: "Saltpetre (KNO₃)", solubility: (t) => 13.3 + 0.74 * t + 0.016 * t * t, color: "rgba(199,146,234,0.8)" },
];

export function DissolveLab() {
  const [solId, setSolId] = useState("nacl");
  const [added, setAdded] = useState(20);
  const [temp, setTemp] = useState(20);

  const sol = SOLUTES.find((s) => s.id === solId)!;
  const limit = sol.solubility(temp);
  const dissolved = Math.min(added, limit);
  const undissolved = Math.max(0, added - limit);
  const saturated = added >= limit;

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, time: number) => {
    // beaker with 100 mL water
    const conc = dissolved / limit;
    D.beaker(ctx, 110, 80, 220, 300, 0.75, `rgba(120, 180, 220, ${0.2 + conc * 0.35})`);
    D.label(ctx, "100 mL water", 220, 400, { size: 12, color: D.COL.muted });

    // dissolved ions drifting
    const ionCount = Math.round((dissolved / 60) * 30);
    for (let i = 0; i < ionCount; i++) {
      const px = 130 + ((i * 61) % 180);
      const py = 175 + ((i * 41 + time * 9) % 185);
      D.dot(ctx, px, py, 2.6, sol.color);
    }
    // undissolved pile at the bottom
    if (undissolved > 0) {
      const pileW = clamp(undissolved * 2.2, 10, 170);
      const pileH = clamp(undissolved * 0.55, 5, 42);
      ctx.fillStyle = sol.color;
      ctx.beginPath();
      ctx.moveTo(220 - pileW / 2, 373);
      ctx.quadraticCurveTo(220, 373 - pileH * 2, 220 + pileW / 2, 373);
      ctx.closePath();
      ctx.fill();
      D.label(ctx, "undissolved crystals", 220, 355 - pileH, { size: 11, color: D.COL.muted });
    }

    // solubility curve
    const g = { x: 430, y: 70, w: 420, h: 300 };
    D.panel(ctx, g.x, g.y, g.w, g.h);
    const maxY = 260;
    const mapX = (tc: number) => g.x + 30 + (tc / 100) * (g.w - 60);
    const mapY = (grams: number) => g.y + g.h - 30 - (clamp(grams, 0, maxY) / maxY) * (g.h - 60);
    for (const s of SOLUTES) {
      ctx.strokeStyle = s.id === solId ? (s.id === "nacl" ? "#dde6f0" : D.COL.violet) : "rgba(148,163,179,0.25)";
      ctx.lineWidth = s.id === solId ? 2.5 : 1.5;
      ctx.beginPath();
      for (let tc = 0; tc <= 100; tc += 2) {
        const x = mapX(tc);
        const y = mapY(s.solubility(tc));
        if (tc === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      D.label(ctx, s.label.split(" ")[1] ?? s.label, mapX(88), mapY(s.solubility(88)) - 14, {
        size: 11,
        color: s.id === solId ? D.COL.text : "rgba(148,163,179,0.4)",
      });
    }
    // current point
    D.glow(ctx, mapX(temp), mapY(limit), 16, D.COL.amber, 0.6);
    D.dot(ctx, mapX(temp), mapY(limit), 5, D.COL.amber);
    // your added amount as a horizontal line
    ctx.setLineDash([5, 5]);
    D.wire(ctx, [[mapX(0), mapY(added)], [mapX(100), mapY(added)]], saturated ? D.COL.bad : D.COL.good, 1.5);
    ctx.setLineDash([]);
    D.label(ctx, `you added ${added} g`, mapX(18), mapY(added) - 10, { size: 11, color: saturated ? D.COL.bad : D.COL.good });
    D.label(ctx, "temperature →", g.x + g.w / 2, g.y + g.h - 12, { size: 11, color: D.COL.muted });
    D.label(ctx, "solubility (g / 100 mL)", g.x + 14, g.y + 16, { size: 11, color: D.COL.muted, align: "left" });

    D.meter(ctx, 20, 12, 170, "dissolved", `${dissolved.toFixed(1)} g`, D.COL.good);
    D.meter(ctx, 205, 12, 170, "on the bottom", `${undissolved.toFixed(1)} g`, undissolved > 0 ? D.COL.bad : D.COL.muted);
    D.meter(ctx, 390, 12, 200, "solution is", saturated ? "SATURATED" : "unsaturated", saturated ? D.COL.amber : D.COL.good);
  };

  return (
    <>
      <SimCanvas width={900} height={440} draw={draw} />
      <Controls>
        <Segmented label="Solute" options={SOLUTES.map((s) => ({ value: s.id, label: s.label }))} value={solId} onChange={setSolId} />
        <Slider label="Amount added" min={0} max={200} step={5} value={added} onChange={setAdded} fmt={(v) => `${v} g`} />
        <Slider label="Water temperature" min={0} max={100} step={1} value={temp} onChange={setTemp} fmt={(v) => `${v} °C`} />
      </Controls>
    </>
  );
}
