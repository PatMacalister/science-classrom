"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Slider, Select } from "@/catalyst/components/controls";
import { clamp } from "@/catalyst/lib/sim/helpers";
import * as D from "@/catalyst/lib/sim/draw";
import { ELEMENTS } from "@/catalyst/lib/elements";

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
  const [p, setP] = useState(6);
  const [n, setN] = useState(6);
  const [e, setE] = useState(6);

  const el = ELEMENTS[p - 1];
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
    D.label(ctx, el.name, 745, 190, { size: 18, color: D.COL.text });
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

    D.meter(ctx, 20, 14, 170, "element (from protons)", `${el.name}`, D.COL.accent);
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
          options={SHELL_ELEMENTS.map((s) => ({ value: String(s.z), label: `${s.z} — ${s.name} (${s.symbol})` }))}
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
