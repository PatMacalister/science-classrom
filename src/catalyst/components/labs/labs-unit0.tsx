"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider, Select } from "@/catalyst/components/controls";
import { clamp } from "@/catalyst/lib/sim/helpers";
import * as D from "@/catalyst/lib/sim/draw";
import { ELEMENTS } from "@/catalyst/lib/elements";
import { useLang } from "@/catalyst/lib/i18n";

/** Shell filling for Z ≤ 20 (exact up to calcium): 2, 8, 8, 2. */
function shellsFor(electrons: number): number[] {
  const caps = [2, 8, 8, 2];
  const out: number[] = [];
  let left = electrons;
  for (const cap of caps) {
    if (left <= 0) break;
    const take = Math.min(cap, left);
    out.push(take);
    left -= take;
  }
  return out.length ? out : [0];
}

/* =====================================================================
 * Lab 0.1 — Atom builder: protons pick the element, the rest is decoration
 * ===================================================================== */

export function AtomBuilderLab() {
  const { lang } = useLang();
  const [p, setP] = useState(6);
  const [n, setN] = useState(6);
  const [e, setE] = useState(6);

  const el = ELEMENTS[p - 1];
  const elName = lang === "de" ? el.nameDe : el.name;
  const charge = p - e;
  const chargeLabel = charge === 0 ? "neutral atom" : charge > 0 ? `${charge}+ ion (cation)` : `${-charge}− ion (anion)`;
  const commonN = Math.round(Number.parseFloat(el.mass.replace(/[()]/g, ""))) - p;
  const shells = shellsFor(e);

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const cx = 330;
    const cy = 225;

    // nucleus: cluster protons (red) and neutrons (gray) on a spiral
    const nucleons: Array<{ kind: "p" | "n" }> = [
      ...Array.from({ length: p }, () => ({ kind: "p" as const })),
      ...Array.from({ length: n }, () => ({ kind: "n" as const })),
    ];
    // interleave so the cluster looks mixed
    nucleons.sort((a, b) => (a.kind === b.kind ? 0 : a.kind === "p" ? -1 : 1));
    const mixed: typeof nucleons = [];
    let pi = 0;
    let ni = p;
    for (let i = 0; i < nucleons.length; i++) {
      if (i % 2 === 0 && pi < p) mixed.push(nucleons[pi++]);
      else if (ni < nucleons.length) mixed.push(nucleons[ni++]);
      else if (pi < p) mixed.push(nucleons[pi++]);
    }
    D.glow(ctx, cx, cy, 60, D.COL.amber, 0.15);
    mixed.forEach((nu, i) => {
      const a = i * 2.4; // golden-angle spiral packs the cluster evenly
      const r = 4.2 * Math.sqrt(i);
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      D.dot(ctx, x, y, 6, nu.kind === "p" ? D.COL.bad : "#8fa0b3");
      D.label(ctx, nu.kind === "p" ? "+" : "", x, y + 0.5, { color: "#0b0f14", size: 9, bold: true });
    });

    // electron shells
    shells.forEach((count, s) => {
      const sr = 62 + s * 34;
      D.ring(ctx, cx, cy, sr, "rgba(148,163,179,0.35)", 1);
      for (let i = 0; i < count; i++) {
        const a = t * (s % 2 === 0 ? 0.5 : -0.4) + (i / count) * Math.PI * 2;
        D.dot(ctx, cx + Math.cos(a) * sr, cy + Math.sin(a) * sr, 4, D.COL.accent);
      }
    });

    // identity panel
    D.panel(ctx, 620, 60, 250, 330);
    D.label(ctx, el.symbol, 745, 140, { size: 64, bold: true, color: D.COL.accent });
    D.label(ctx, elName, 745, 190, { size: 18, color: D.COL.text });
    D.label(ctx, `Z = ${p}`, 745, 220, { size: 14, color: D.COL.muted, mono: true });
    D.label(ctx, `A = ${p + n}`, 745, 242, { size: 14, color: D.COL.muted, mono: true });
    D.label(ctx, chargeLabel, 745, 282, {
      size: 14,
      color: charge === 0 ? D.COL.good : D.COL.amber,
      bold: true,
    });
    D.label(
      ctx,
      n === commonN ? "most common isotope" : `isotope ${el.symbol}-${p + n}`,
      745,
      310,
      { size: 13, color: n === commonN ? D.COL.good : D.COL.violet }
    );
    D.label(ctx, "protons +, neutrons gray,", 745, 350, { size: 11, color: D.COL.muted });
    D.label(ctx, "electrons cyan", 745, 366, { size: 11, color: D.COL.muted });

    D.meter(ctx, 20, 14, 170, "element (from protons)", elName, D.COL.accent);
    D.meter(ctx, 205, 14, 140, "mass number A", `${p + n}`, D.COL.amber);
    D.meter(ctx, 360, 14, 140, "net charge", charge > 0 ? `+${charge}` : `${charge}`, charge === 0 ? D.COL.good : D.COL.bad);
  };

  return (
    <>
      <SimCanvas width={900} height={440} draw={draw} />
      <Controls>
        <Slider label="Protons (Z)" min={1} max={20} step={1} value={p} onChange={(v) => setP(clamp(v, 1, 20))} fmt={(v) => `${v}`} />
        <Slider label="Neutrons" min={0} max={24} step={1} value={n} onChange={setN} fmt={(v) => `${v}`} />
        <Slider label="Electrons" min={0} max={22} step={1} value={e} onChange={setE} fmt={(v) => `${v}`} />
      </Controls>
    </>
  );
}

/* =====================================================================
 * Lab 0.2 — Shell filler: watch the electron shells fill 2-8-8
 * ===================================================================== */

const SHELL_ELEMENTS = ELEMENTS.slice(0, 20);

export function ShellLab() {
  const { lang } = useLang();
  const [z, setZ] = useState(11);
  const [placed, setPlaced] = useState(11);

  const el = SHELL_ELEMENTS[z - 1];
  const target = z;
  const shown = Math.min(placed, target);
  const shells = shellsFor(shown);
  const fullShells = shellsFor(target);
  const valence = fullShells[fullShells.length - 1] ?? 0;
  const isNoble = [2, 10, 18].includes(z);

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const cx = 300;
    const cy = 225;
    D.atom(ctx, cx, cy, 150, { shells, symbol: el.symbol }, t);

    // shell occupancy bars
    const capNames = ["K (max 2)", "L (max 8)", "M (max 8)", "N (…)"];
    const caps = [2, 8, 8, 2];
    for (let s = 0; s < 4; s++) {
      const y = 90 + s * 66;
      const count = shells[s] ?? 0;
      D.label(ctx, `shell ${capNames[s]}`, 700, y - 14, { size: 12, color: D.COL.muted });
      D.barGauge(ctx, 590, y, 220, 20, count / caps[s], count === caps[s] ? D.COL.good : D.COL.accent, `${count} / ${caps[s]}`);
    }

    D.meter(ctx, 20, 14, 200, "electron configuration", shells.join(" · ") || "0", D.COL.accent);
    D.meter(ctx, 235, 14, 170, "outer (valence) electrons", shown === target ? `${valence}` : "…", D.COL.amber);
    if (shown === target) {
      D.meter(
        ctx,
        420,
        14,
        260,
        "verdict",
        isNoble ? "full shell — noble & lazy" : valence <= 3 ? `wants to LOSE ${valence}` : valence >= 6 && valence < 8 ? `wants to GAIN ${8 - valence}` : "shares instead",
        isNoble ? D.COL.violet : D.COL.good
      );
    }
  };

  return (
    <>
      <SimCanvas width={900} height={440} draw={draw} />
      <Controls>
        <Select
          label="Element"
          value={String(z)}
          onChange={(v) => {
            setZ(Number(v));
            setPlaced(0);
          }}
          options={SHELL_ELEMENTS.map((s) => ({ value: String(s.z), label: `${s.z} — ${lang === "de" ? s.nameDe : s.name} (${s.symbol})` }))}
        />
        <Slider label="Electrons placed" min={0} max={target} step={1} value={shown} onChange={setPlaced} fmt={(v) => `${v} / ${target}`} />
      </Controls>
    </>
  );
}

/* =====================================================================
 * Lab 0.3 — the periodic table itself (DOM component, see PeriodicTable)
 * ===================================================================== */

export { default as PeriodicTableLab } from "@/catalyst/components/PeriodicTable";

/* =====================================================================
 * Lab 0.3b — Periodic trends: the table is a map, and the map has slopes.
 * Twenty elements, three properties, one lesson.
 * ===================================================================== */

interface TrendRow {
  z: number;
  /** Pauling electronegativity; null for noble gases without an accepted value. */
  en: number | null;
  /** Calculated atomic radius, pm. */
  radius: number;
  /** First ionization energy, kJ/mol. */
  ie: number;
}

const TRENDS: TrendRow[] = [
  { z: 1, en: 2.2, radius: 53, ie: 1312 },
  { z: 2, en: null, radius: 31, ie: 2372 },
  { z: 3, en: 0.98, radius: 167, ie: 520 },
  { z: 4, en: 1.57, radius: 112, ie: 899 },
  { z: 5, en: 2.04, radius: 87, ie: 801 },
  { z: 6, en: 2.55, radius: 67, ie: 1086 },
  { z: 7, en: 3.04, radius: 56, ie: 1402 },
  { z: 8, en: 3.44, radius: 48, ie: 1314 },
  { z: 9, en: 3.98, radius: 42, ie: 1681 },
  { z: 10, en: null, radius: 38, ie: 2081 },
  { z: 11, en: 0.93, radius: 190, ie: 496 },
  { z: 12, en: 1.31, radius: 145, ie: 738 },
  { z: 13, en: 1.61, radius: 118, ie: 578 },
  { z: 14, en: 1.9, radius: 111, ie: 787 },
  { z: 15, en: 2.19, radius: 98, ie: 1012 },
  { z: 16, en: 2.58, radius: 88, ie: 1000 },
  { z: 17, en: 3.16, radius: 79, ie: 1251 },
  { z: 18, en: null, radius: 71, ie: 1521 },
  { z: 19, en: 0.82, radius: 243, ie: 419 },
  { z: 20, en: 1.0, radius: 194, ie: 590 },
];

type TrendKey = "radius" | "en" | "ie";

const TREND_META: Record<TrendKey, { title: string; unit: string; note: string }> = {
  radius: {
    title: "Atomic radius",
    unit: "pm",
    note: "shrinks left to right (more pull, same shell), grows down a group (a whole new shell)",
  },
  en: {
    title: "Electronegativity",
    unit: "",
    note: "grows left to right, shrinks down a group - fluorine is the greediest atom there is",
  },
  ie: {
    title: "First ionization energy",
    unit: "kJ/mol",
    note: "grows left to right, shrinks down a group - the price of stealing one electron",
  },
};

/** Squeeze the p-block next to the s-block so 20 elements fit in 8 columns. */
function trendCell(z: number): { col: number; period: number } {
  const el = ELEMENTS[z - 1];
  const g = el.group ?? 1;
  return { col: g <= 2 ? g : g - 10, period: el.period };
}

export function TrendsLab() {
  const [trend, setTrend] = useState<TrendKey>("radius");
  const [hover, setHover] = useState<number | null>(null);
  const { lang } = useLang();

  const meta = TREND_META[trend];
  const values = TRENDS.map((r) => (trend === "en" ? r.en : trend === "radius" ? r.radius : r.ie));
  const known = values.filter((v): v is number => v !== null);
  const vMin = Math.min(...known);
  const vMax = Math.max(...known);

  const cellW = 62;
  const cellH = 58;
  const left = 120;
  const top = 80;

  const draw = (ctx: CanvasRenderingContext2D) => {
    D.label(ctx, meta.title, 450, 26, { size: 16, bold: true, color: D.COL.accent });
    D.label(ctx, meta.note, 450, 48, { size: 12, color: D.COL.muted });

    TRENDS.forEach((row, i) => {
      const el = ELEMENTS[row.z - 1];
      const { col, period } = trendCell(row.z);
      const x = left + (col - 1) * cellW;
      const y = top + (period - 1) * cellH;
      const v = values[i];
      const frac = v === null ? 0 : (v - vMin) / (vMax - vMin);
      ctx.fillStyle = v === null ? "rgba(120,130,145,0.18)" : `rgba(45, 212, 191, ${0.12 + frac * 0.72})`;
      ctx.strokeStyle = hover === row.z ? D.COL.amber : "#243144";
      ctx.lineWidth = hover === row.z ? 2 : 1;
      ctx.beginPath();
      ctx.roundRect(x, y, cellW - 5, cellH - 5, 6);
      ctx.fill();
      ctx.stroke();
      D.label(ctx, el.symbol, x + (cellW - 5) / 2, y + 20, {
        size: 15, bold: true, color: v === null ? D.COL.muted : "#08312c",
      });
      D.label(ctx, v === null ? "\u2014" : String(v), x + (cellW - 5) / 2, y + 39, {
        size: 11, mono: true, color: v === null ? D.COL.muted : "#0b3a34",
      });
    });

    // direction hints
    D.arrow(ctx, left, top - 14, left + cellW * 7.4, top - 14, "rgba(246,178,107,0.75)", 2, 7);
    D.label(ctx, "across a period", left + cellW * 3.7, top - 26, { color: D.COL.amber, size: 11 });
    D.arrow(ctx, left - 18, top, left - 18, top + cellH * 3.6, "rgba(199,146,234,0.75)", 2, 7);
    ctx.save();
    ctx.translate(left - 34, top + cellH * 1.8);
    ctx.rotate(-Math.PI / 2);
    D.label(ctx, "down a group", 0, 0, { color: D.COL.violet, size: 11 });
    ctx.restore();

    // colour scale
    const sx = 620;
    D.panel(ctx, sx, top, 250, 232);
    D.label(ctx, "scale", sx + 125, top + 20, { color: D.COL.muted, size: 11 });
    for (let i = 0; i <= 5; i++) {
      const f = i / 5;
      const v = vMin + (vMax - vMin) * (1 - f);
      const y = top + 40 + f * 150;
      ctx.fillStyle = `rgba(45, 212, 191, ${0.12 + (1 - f) * 0.72})`;
      ctx.fillRect(sx + 26, y, 42, 24);
      const shown = trend === "en" ? v.toFixed(2) : String(Math.round(v));
      D.label(ctx, `${shown} ${meta.unit}`, sx + 82, y + 12, {
        color: D.COL.muted, size: 11, align: "left", mono: true,
      });
    }
    D.label(ctx, "grey = no accepted value", sx + 125, top + 210, { color: D.COL.muted, size: 10 });

    if (hover) {
      const el = ELEMENTS[hover - 1];
      const row = TRENDS[hover - 1];
      const v = trend === "en" ? row.en : trend === "radius" ? row.radius : row.ie;
      D.panel(ctx, 620, top + 244, 250, 76, "#101825");
      D.label(ctx, `${el.symbol} \u2014 ${lang === "de" ? el.nameDe : el.name}`, 745, top + 268, {
        size: 14, bold: true,
      });
      D.label(ctx, v === null ? "no accepted value" : `${v} ${meta.unit}`, 745, top + 294, {
        size: 16, mono: true, color: D.COL.amber,
      });
    }
  };

  const pick = (x: number, y: number) => {
    for (const row of TRENDS) {
      const { col, period } = trendCell(row.z);
      const cx = left + (col - 1) * cellW;
      const cy = top + (period - 1) * cellH;
      if (x >= cx && x <= cx + cellW - 5 && y >= cy && y <= cy + cellH - 5) return row.z;
    }
    return null;
  };

  return (
    <>
      <SimCanvas
        width={900}
        height={420}
        draw={draw}
        onPointerMove={(pt) => setHover(pick(pt.x, pt.y))}
      />
      <Controls>
        <Segmented
          label="Property"
          value={trend}
          onChange={setTrend}
          options={[
            { value: "radius", label: "Atomic radius" },
            { value: "en", label: "Electronegativity" },
            { value: "ie", label: "Ionization energy" },
          ]}
        />
      </Controls>
      <Readouts>
        <Readout label="Showing" value={meta.title} />
        <Readout label="Smallest" value={`${vMin} ${meta.unit}`} />
        <Readout label="Largest" value={`${vMax} ${meta.unit}`} tone="amber" />
      </Readouts>
    </>
  );
}
