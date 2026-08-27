"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Slider, Select, useTl } from "@/catalyst/components/controls";
import { clamp, fmtSci } from "@/catalyst/lib/sim/helpers";
import * as D from "@/catalyst/lib/sim/draw";

/** Universal-indicator-style color for a pH value. */
function phColor(ph: number): string {
  const stops: Array<[number, [number, number, number]]> = [
    [0, [220, 40, 50]],
    [3, [240, 110, 60]],
    [5, [245, 200, 70]],
    [7, [80, 190, 90]],
    [9, [60, 150, 200]],
    [11, [70, 80, 200]],
    [14, [120, 50, 160]],
  ];
  const p = clamp(ph, 0, 14);
  for (let i = 0; i < stops.length - 1; i++) {
    const [a, ca] = stops[i];
    const [b, cb] = stops[i + 1];
    if (p >= a && p <= b) {
      const t = (p - a) / (b - a);
      const mix = ca.map((v, k) => Math.round(v + (cb[k] - v) * t));
      return `rgb(${mix[0]}, ${mix[1]}, ${mix[2]})`;
    }
  }
  return "rgb(120,50,160)";
}

/* =====================================================================
 * Lab 4.1 — the pH scale: every step is a factor of ten
 * ===================================================================== */

interface PhSubstance {
  id: string;
  label: string;
  ph: number;
}

const PH_SUBSTANCES: PhSubstance[] = [
  { id: "gastric", label: "Gastric acid", ph: 1.5 },
  { id: "lemon", label: "Lemon juice", ph: 2.0 },
  { id: "cola", label: "Cola", ph: 2.5 },
  { id: "vinegar", label: "Vinegar", ph: 2.9 },
  { id: "coffee", label: "Coffee", ph: 5.0 },
  { id: "milk", label: "Milk", ph: 6.6 },
  { id: "water", label: "Pure water", ph: 7.0 },
  { id: "blood", label: "Blood", ph: 7.4 },
  { id: "soda", label: "Baking-soda water", ph: 8.5 },
  { id: "soap", label: "Soap water", ph: 10.0 },
  { id: "ammonia", label: "Ammonia cleaner", ph: 11.5 },
  { id: "drain", label: "Drain cleaner", ph: 13.5 },
];

export function PHLab() {
  const tl = useTl();
  const [subId, setSubId] = useState("lemon");
  const [dilution, setDilution] = useState(0);

  const sub = PH_SUBSTANCES.find((s) => s.id === subId)!;
  // each ×10 dilution moves pH one step toward neutral 7 (strong acid/base approximation)
  const ph =
    sub.ph < 7 ? Math.min(7, sub.ph + dilution) : sub.ph > 7 ? Math.max(7, sub.ph - dilution) : 7;
  const hConc = Math.pow(10, -ph);

  const draw = (ctx: CanvasRenderingContext2D) => {
    // glass with the (possibly diluted) liquid
    D.beaker(ctx, 90, 100, 180, 260, 0.7, phColor(ph));
    D.label(ctx, sub.label, 180, 390, { size: 13, color: D.COL.text });
    if (dilution > 0) {
      D.label(ctx, `diluted ×10${dilution > 1 ? `^${dilution}` : ""}`, 180, 410, { size: 11, color: D.COL.muted });
    }

    // pH scale bar
    const bar = { x: 340, y: 120, w: 520, h: 46 };
    for (let i = 0; i < 140; i++) {
      const p = (i / 140) * 14;
      ctx.fillStyle = phColor(p);
      ctx.fillRect(bar.x + (i / 140) * bar.w, bar.y, bar.w / 140 + 1, bar.h);
    }
    ctx.strokeStyle = "#33445e";
    ctx.strokeRect(bar.x, bar.y, bar.w, bar.h);
    for (let p = 0; p <= 14; p += 1) {
      const x = bar.x + (p / 14) * bar.w;
      D.label(ctx, `${p}`, x, bar.y + bar.h + 14, { size: 10, color: D.COL.muted, mono: true });
    }
    D.label(ctx, "acidic ←", bar.x + 60, bar.y - 14, { size: 12, color: D.COL.bad });
    D.label(ctx, "neutral", bar.x + bar.w / 2, bar.y - 14, { size: 12, color: D.COL.good });
    D.label(ctx, "→ basic", bar.x + bar.w - 60, bar.y - 14, { size: 12, color: D.COL.accent });

    // pointer
    const px = bar.x + (ph / 14) * bar.w;
    D.arrow(ctx, px, bar.y + bar.h + 42, px, bar.y + bar.h + 6, D.COL.text, 2.5);
    D.label(ctx, `pH ${ph.toFixed(1)}`, px, bar.y + bar.h + 56, { size: 14, bold: true, color: D.COL.text, mono: true });

    // the ×10 staircase
    D.panel(ctx, 340, 250, 520, 120);
    D.label(ctx, "every pH step = ×10 in H⁺ concentration", 600, 274, { size: 13, color: D.COL.muted });
    D.label(ctx, `[H⁺] = 10^−pH = ${fmtSci(hConc, 2)} mol/L`, 600, 306, { size: 17, mono: true, color: D.COL.amber });
    const steps = Math.round(Math.abs(7 - ph));
    D.label(
      ctx,
      ph === 7 ? "exactly neutral" : `${fmtSci(Math.pow(10, steps), 1).replace(" × 10⁰", "")}× ${ph < 7 ? "more" : "less"} H⁺ than pure water`,
      600,
      340,
      { size: 13, color: ph === 7 ? D.COL.good : D.COL.text }
    );

    D.meter(ctx, 20, 12, 130, "pH", ph.toFixed(1), ph < 6.5 ? D.COL.bad : ph > 7.5 ? D.COL.accent : D.COL.good);
    D.meter(ctx, 165, 12, 190, "character", ph < 6.5 ? "acid" : ph > 7.5 ? "base" : "neutral", ph < 6.5 ? D.COL.bad : ph > 7.5 ? D.COL.accent : D.COL.good);
  };

  return (
    <>
      <SimCanvas width={900} height={440} draw={draw} />
      <Controls>
        <Select
          label="Substance"
          value={subId}
          onChange={(v) => {
            setSubId(v);
            setDilution(0);
          }}
          options={PH_SUBSTANCES.map((s) => ({ value: s.id, label: `${tl(s.label)} (pH ${s.ph.toFixed(1)})` }))}
        />
        <Slider label="Dilute with water" min={0} max={6} step={1} value={dilution} onChange={setDilution} fmt={(v) => (v === 0 ? tl("undiluted") : `×10${v > 1 ? `^${v}` : ""}`)} />
      </Controls>
    </>
  );
}

/* =====================================================================
 * Lab 4.2 — Titration: counting acid with a burette of base
 * ===================================================================== */

export function TitrationLab() {
  const [added, setAdded] = useState(0); // mL of 0.1 M NaOH

  const cAcid = 0.1;
  const vAcid = 0.025; // 25 mL
  const cBase = 0.1;
  const nAcid = cAcid * vAcid;

  const phAt = (mL: number): number => {
    const vB = mL / 1000;
    const nBase = cBase * vB;
    const vTot = vAcid + vB;
    if (nBase < nAcid - 1e-12) return -Math.log10((nAcid - nBase) / vTot);
    if (Math.abs(nBase - nAcid) <= 1e-12) return 7;
    return 14 + Math.log10((nBase - nAcid) / vTot);
  };
  const ph = phAt(added);
  const pink = ph >= 8.2;

  const draw = (ctx: CanvasRenderingContext2D) => {
    // burette
    ctx.fillStyle = "rgba(76,201,240,0.25)";
    const bLevel = 1 - added / 50;
    ctx.fillRect(120, 60 + (1 - bLevel) * 150, 26, bLevel * 150);
    ctx.strokeStyle = D.COL.glass;
    ctx.lineWidth = 2;
    ctx.strokeRect(120, 60, 26, 150);
    D.wire(ctx, [[133, 210], [133, 240]], D.COL.glass, 2);
    D.label(ctx, "0.1 M NaOH", 133, 44, { size: 11, color: D.COL.muted });
    // falling drop
    if (added > 0 && added < 50) D.dot(ctx, 133, 250, 3, "rgba(76,201,240,0.8)");

    // flask
    const flaskColor = pink ? "rgba(240, 100, 180, 0.55)" : "rgba(220, 220, 230, 0.18)";
    D.beaker(ctx, 70, 270, 130, 110, 0.55 + (added / 50) * 0.35, flaskColor);
    D.label(ctx, "25 mL 0.1 M HCl + phenolphthalein", 135, 400, { size: 10.5, color: D.COL.muted });

    // titration curve
    const g = { x: 300, y: 60, w: 560, h: 320 };
    D.panel(ctx, g.x, g.y, g.w, g.h);
    const mapX = (mL: number) => g.x + 40 + (mL / 50) * (g.w - 70);
    const mapY = (p: number) => g.y + g.h - 30 - (clamp(p, 0, 14) / 14) * (g.h - 60);
    // axes labels
    for (let p = 0; p <= 14; p += 2) {
      D.label(ctx, `${p}`, g.x + 22, mapY(p), { size: 10, color: D.COL.muted, mono: true });
      D.wire(ctx, [[g.x + 34, mapY(p)], [g.x + g.w - 20, mapY(p)]], "rgba(36,49,68,0.6)", 1);
    }
    for (let mL = 0; mL <= 50; mL += 10) {
      D.label(ctx, `${mL}`, mapX(mL), g.y + g.h - 14, { size: 10, color: D.COL.muted, mono: true });
    }
    D.label(ctx, "mL NaOH added →", g.x + g.w / 2, g.y + g.h + 0, { size: 11, color: D.COL.muted });
    D.label(ctx, "pH", g.x + 22, g.y + 14, { size: 11, color: D.COL.muted });

    // equivalence marker
    ctx.setLineDash([5, 5]);
    D.wire(ctx, [[mapX(25), mapY(0)], [mapX(25), mapY(14)]], "rgba(246,178,107,0.5)", 1.5);
    ctx.setLineDash([]);
    D.label(ctx, "equivalence: 25 mL", mapX(25), g.y + 24, { size: 11, color: D.COL.amber });

    // curve up to current point
    ctx.strokeStyle = D.COL.accent;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let mL = 0; mL <= added; mL += 0.1) {
      const x = mapX(mL);
      const y = mapY(phAt(mL));
      if (mL === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    D.glow(ctx, mapX(added), mapY(ph), 14, D.COL.accent, 0.6);
    D.dot(ctx, mapX(added), mapY(ph), 4.5, D.COL.accent);

    D.meter(ctx, 300, 396, 130, "pH now", ph.toFixed(2), ph < 6.5 ? D.COL.bad : ph > 7.5 ? D.COL.accent : D.COL.good);
    D.meter(ctx, 445, 396, 150, "NaOH added", `${added.toFixed(1)} mL`, D.COL.muted);
    D.meter(ctx, 610, 396, 250, "indicator", pink ? "PINK — endpoint passed" : "colorless", pink ? "#f064b4" : D.COL.muted);
  };

  return (
    <>
      <SimCanvas width={900} height={460} draw={draw} />
      <Controls>
        <Slider label="Open the burette" min={0} max={50} step={0.1} value={added} onChange={setAdded} fmt={(v) => `${v.toFixed(1)} mL`} />
      </Controls>
    </>
  );
}

/* =====================================================================
 * Lab 4.3 — Red-cabbage indicator: the kitchen's pH meter (digital twin)
 * ===================================================================== */

/** Red-cabbage (anthocyanin) color for a pH value. */
function cabbageColor(ph: number): string {
  const stops: Array<[number, [number, number, number]]> = [
    [1, [235, 60, 75]],
    [4, [225, 90, 160]],
    [7, [130, 90, 200]],
    [8.5, [70, 110, 210]],
    [10, [60, 170, 140]],
    [12, [140, 190, 80]],
    [14, [225, 205, 90]],
  ];
  const p = clamp(ph, 1, 14);
  for (let i = 0; i < stops.length - 1; i++) {
    const [a, ca] = stops[i];
    const [b, cb] = stops[i + 1];
    if (p >= a && p <= b) {
      const t = (p - a) / (b - a);
      const mix = ca.map((v, k) => Math.round(v + (cb[k] - v) * t));
      return `rgb(${mix[0]}, ${mix[1]}, ${mix[2]})`;
    }
  }
  return "rgb(225,205,90)";
}

const KITCHEN: Array<{ label: string; ph: number }> = [
  { label: "lemon juice", ph: 2 },
  { label: "vinegar", ph: 2.9 },
  { label: "sparkling water", ph: 5 },
  { label: "tap water", ph: 7 },
  { label: "baking soda", ph: 8.5 },
  { label: "soap water", ph: 10 },
  { label: "washing soda", ph: 11.5 },
];

export function CabbageLab() {
  const [mysteryPh, setMysteryPh] = useState(7);

  const draw = (ctx: CanvasRenderingContext2D) => {
    D.label(ctx, "seven kitchen liquids + red-cabbage juice", 450, 30, { size: 14, color: D.COL.muted });

    KITCHEN.forEach((k, i) => {
      const x = 70 + i * 115;
      D.beaker(ctx, x, 70, 74, 130, 0.65, cabbageColor(k.ph));
      D.label(ctx, k.label, x + 37, 226, { size: 10.5, color: D.COL.text });
      D.label(ctx, `pH ${k.ph}`, x + 37, 242, { size: 10, color: D.COL.muted, mono: true });
    });

    // your mystery glass
    D.label(ctx, "your own mix:", 250, 300, { size: 13, color: D.COL.muted, align: "right" });
    D.beaker(ctx, 290, 270, 90, 130, 0.7, cabbageColor(mysteryPh));
    D.label(ctx, `pH ${mysteryPh.toFixed(1)}`, 335, 420, { size: 12, mono: true, color: D.COL.text });

    // color-to-pH legend strip
    const bar = { x: 470, y: 300, w: 380, h: 30 };
    for (let i = 0; i < 130; i++) {
      const p = 1 + (i / 130) * 13;
      ctx.fillStyle = cabbageColor(p);
      ctx.fillRect(bar.x + (i / 130) * bar.w, bar.y, bar.w / 130 + 1, bar.h);
    }
    ctx.strokeStyle = "#33445e";
    ctx.strokeRect(bar.x, bar.y, bar.w, bar.h);
    for (const p of [1, 4, 7, 10, 14]) {
      D.label(ctx, `${p}`, bar.x + ((p - 1) / 13) * bar.w, bar.y + bar.h + 14, { size: 10, mono: true, color: D.COL.muted });
    }
    D.label(ctx, "red = acid · purple = neutral · green/yellow = base", bar.x + bar.w / 2, bar.y - 14, { size: 11.5, color: D.COL.muted });
    const px = bar.x + ((clamp(mysteryPh, 1, 14) - 1) / 13) * bar.w;
    D.arrow(ctx, px, bar.y + bar.h + 40, px, bar.y + bar.h + 20, D.COL.text, 2);
  };

  return (
    <>
      <SimCanvas width={900} height={460} draw={draw} />
      <Controls>
        <Slider label="pH of your own mix" min={1} max={14} step={0.1} value={mysteryPh} onChange={setMysteryPh} fmt={(v) => `pH ${v.toFixed(1)}`} />
      </Controls>
    </>
  );
}
