"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider } from "@/helix/components/controls";
import { clamp, rng } from "@/helix/lib/sim/helpers";
import { tl as translate } from "@/helix/lib/labStrings";
import * as D from "@/helix/lib/sim/draw";

/* =====================================================================
 * Lab 5.1 — Natural selection, running live. Beetles on a background;
 * the ones that stand out get eaten. Nothing chooses to change colour.
 * ===================================================================== */

interface Bug {
  x: number;
  y: number;
  shade: number; // 0 = pale, 1 = dark
  alive: boolean;
}

export function SelectionLab() {
  const [background, setBackground] = useState(0.75);
  const [pressure, setPressure] = useState(0.6);
  const [gen, setGen] = useState(0);

  /*
   * The population lives in state, not a ref: it only changes when you step a
   * generation, and reading it during render is exactly what the chart needs.
   * `rng` is a seeded PRNG, so building the starting population is pure and
   * safe as a lazy initializer.
   */
  const initialBugs = (): Bug[] => {
    const rand = rng(42);
    return Array.from({ length: 60 }, () => ({
      x: 60 + rand() * 420,
      y: 90 + rand() * 250,
      shade: rand(),
      alive: true,
    }));
  };
  const [bugs, setBugs] = useState<Bug[]>(initialBugs);
  const [history, setHistory] = useState<number[]>([]);

  const meanShade = bugs.reduce((s, b) => s + b.shade, 0) / Math.max(1, bugs.length);

  const step = () => {
    const rand = rng(1000 + gen);
    // survival: the closer your shade is to the background, the safer you are
    const survivors = bugs.filter((b) => rand() > Math.abs(b.shade - background) * pressure);
    const parents = survivors.length ? survivors : bugs;
    // repopulate to 60; offspring resemble a parent, with small variation
    const next: Bug[] = [];
    while (next.length < 60) {
      const p = parents[Math.floor(rand() * parents.length)];
      next.push({
        x: 60 + rand() * 420,
        y: 90 + rand() * 250,
        shade: clamp(p.shade + (rand() - 0.5) * 0.14, 0, 1),
        alive: true,
      });
    }
    setHistory((h) => [...h, meanShade].slice(-40));
    setBugs(next);
    setGen((g) => g + 1);
  };

  const reset = () => {
    setBugs(initialBugs());
    setHistory([]);
    setGen(0);
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
        // the background the beetles are hiding on
    const g = Math.round(40 + background * 150);
    ctx.fillStyle = `rgb(${g},${g - 6},${g - 14})`;
    ctx.fillRect(50, 70, 440, 290);
    ctx.strokeStyle = "#33445e";
    ctx.strokeRect(50, 70, 440, 290);

    for (const b of bugs) {
      const v = Math.round(30 + b.shade * 190);
      ctx.fillStyle = `rgb(${v},${v - 8},${v - 16})`;
      ctx.beginPath();
      ctx.ellipse(b.x, b.y, 8, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.35)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    D.label(ctx, "a population of beetles on a background", 270, 378, {
      color: D.COL.muted,
      size: 12,
    });

    // ---- mean shade over generations ----
    const gx = 530;
    const gy = 90;
    const gw = 330;
    const gh = 200;
    D.panel(ctx, gx, gy, gw, gh, "#0a1420");
    // the background level, as a target line
    const bgY = gy + gh - background * gh;
    ctx.setLineDash([6, 5]);
    D.wire(ctx, [[gx, bgY], [gx + gw, bgY]], "rgba(246,178,107,0.7)", 2);
    ctx.setLineDash([]);
    D.label(ctx, "background shade", gx + gw - 6, bgY - 10, {
      align: "right",
      color: D.COL.amber,
      size: 11,
    });

    const hist = [...history, meanShade];
    if (hist.length > 1) {
      ctx.strokeStyle = D.COL.accent;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      hist.forEach((v, i) => {
        const x = gx + (i / Math.max(1, hist.length - 1)) * gw;
        const y = gy + gh - v * gh;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }
    D.label(ctx, "mean shade of the population", gx + gw / 2, gy + gh + 20, {
      color: D.COL.muted,
      size: 11,
    });
    D.label(ctx, "generations →", gx + gw / 2, gy + gh + 38, { color: D.COL.muted, size: 10 });

    D.meter(ctx, 20, 14, 180, "Generation", String(gen), D.COL.accent);
    D.meter(ctx, 210, 14, 200, "mean shade", meanShade.toFixed(2), D.COL.good);
    D.meter(ctx, 420, 14, 200, "background", background.toFixed(2), D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} label="Beetles on a background, with mean shade plotted over generations" />
      <Controls>
        <Slider
          label="Background shade"
          min={0}
          max={1}
          step={0.01}
          value={background}
          onChange={setBackground}
          fmt={(v) => v.toFixed(2)}
        />
        <Slider
          label="Selection pressure"
          min={0}
          max={1}
          step={0.05}
          value={pressure}
          onChange={setPressure}
          fmt={(v) => `${Math.round(v * 100)} %`}
        />
        <div className="ctl-row">
          <label>{translate("Generation")}</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={step}>
              next generation →
            </button>
            <button
              type="button"
              className="seg-btn"
              onClick={reset}
            >
              {translate("Reset")}
            </button>
          </div>
        </div>
      </Controls>
      <Readouts>
        <Readout label="Generation" value={gen} />
        <Readout label="Mean shade" value={meanShade.toFixed(2)} tone="good" />
        <Readout label="Background" value={background.toFixed(2)} tone="amber" />
        <Readout
          label="Matching"
          value={Math.abs(meanShade - background) < 0.1 ? "well camouflaged" : "still conspicuous"}
          tone={Math.abs(meanShade - background) < 0.1 ? "good" : "warn"}
        />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 5.2 — Evidence: the same gene, compared across species. The more
 * differences, the longer since the lineages split.
 * ===================================================================== */

interface Species {
  name: string;
  emoji: string;
  /** Percent difference in cytochrome c amino-acid sequence from humans. */
  diff: number;
  /** Approximate divergence time, millions of years ago. */
  mya: number;
}

const SPECIES: Species[] = [
  { name: "Human", emoji: "🧑", diff: 0, mya: 0 },
  { name: "Chimpanzee", emoji: "🐒", diff: 0, mya: 7 },
  { name: "Rhesus monkey", emoji: "🐵", diff: 1, mya: 25 },
  { name: "Horse", emoji: "🐴", diff: 12, mya: 95 },
  { name: "Chicken", emoji: "🐔", diff: 13, mya: 320 },
  { name: "Rattlesnake", emoji: "🐍", diff: 14, mya: 320 },
  { name: "Tuna", emoji: "🐟", diff: 21, mya: 430 },
  { name: "Yeast", emoji: "🍞", diff: 45, mya: 1200 },
];

export function PhylogenyLab() {
  const [picked, setPicked] = useState("Horse");
  const s = SPECIES.find((x) => x.name === picked)!;

  const draw = (ctx: CanvasRenderingContext2D) => {
    // ---- the tree, drawn as branch points by divergence time ----
    const x0 = 90;
    const xEnd = 560;
    const scale = (mya: number) => xEnd - (mya / 1200) * (xEnd - x0);

    SPECIES.forEach((sp, i) => {
      const y = 80 + i * 38;
      const bx = scale(sp.mya);
      const on = sp.name === picked;
      D.wire(ctx, [[bx, y], [xEnd, y]], on ? D.COL.accent : "rgba(148,163,179,0.45)", on ? 3 : 1.5);
      if (sp.mya > 0) {
        D.wire(ctx, [[bx, y], [bx, 80]], on ? "rgba(45,212,191,0.5)" : "rgba(148,163,179,0.2)", on ? 2 : 1);
        D.dot(ctx, bx, y, 4, on ? D.COL.accent : D.COL.muted);
      }
      D.label(ctx, `${sp.emoji} ${sp.name}`, xEnd + 12, y, {
        align: "left",
        size: 12,
        bold: on,
        color: on ? D.COL.text : D.COL.muted,
      });
      if (on && sp.mya > 0) {
        D.label(ctx, `${sp.mya} Mya`, bx, y - 14, { size: 10, color: D.COL.amber });
      }
    });
    D.label(ctx, "← further back in time", 200, 400, { color: D.COL.muted, size: 11 });

    // ---- the comparison panel ----
    const px = 640;
    D.panel(ctx, px, 200, 240, 180);
    D.label(ctx, "cytochrome c", px + 120, 226, { color: D.COL.muted, size: 11 });
    D.label(ctx, `${s.emoji} ${s.name}`, px + 120, 252, { size: 15, bold: true });
    D.label(ctx, `${s.diff} %`, px + 120, 292, { size: 30, bold: true, mono: true, color: D.COL.accent });
    D.label(ctx, "different from human", px + 120, 316, { color: D.COL.muted, size: 11 });
    D.barGauge(ctx, px + 25, 336, 190, 18, s.diff / 50, D.COL.amber, `${s.mya} Mya apart`);

    D.meter(ctx, 20, 14, 260, "same protein, all species", "cytochrome c", D.COL.good);
    D.meter(ctx, 290, 14, 250, "more difference means", "longer since they split", D.COL.accent);
  };

  return (
    <>
      <SimCanvas width={900} height={420} draw={draw} label="A phylogenetic tree with molecular differences from humans" />
      <Controls>
        <Segmented
          label="Compare with"
          value={picked}
          onChange={setPicked}
          options={SPECIES.filter((x) => x.mya > 0).map((x) => ({ value: x.name, label: `${x.emoji} ${x.name}` }))}
        />
      </Controls>
      <Readouts>
        <Readout label="Species" value={`${s.emoji} ${s.name}`} />
        <Readout label="Sequence difference" value={`${s.diff} %`} tone="amber" />
        <Readout label="Lineages split" value={`≈ ${s.mya} million years ago`} />
        <Readout label="Pattern" value="difference tracks time" tone="good" />
      </Readouts>
    </>
  );
}
