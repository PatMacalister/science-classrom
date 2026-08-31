"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented } from "@/helix/components/controls";
import { tl as translate } from "@/helix/lib/labStrings";
import * as D from "@/helix/lib/sim/draw";

/* =====================================================================
 * Lab 4.1 — The Punnett square: pick two parents, get the offspring
 * ratios. The 3:1 and 9:3:3:1 patterns fall straight out of the grid.
 * ===================================================================== */

type Allele = "A" | "a";
type Geno = "AA" | "Aa" | "aa";

const GENOS: Geno[] = ["AA", "Aa", "aa"];

export function PunnettLab() {
  const [p1, setP1] = useState<Geno>("Aa");
  const [p2, setP2] = useState<Geno>("Aa");

  const gametes = (g: Geno): Allele[] => [g[0] as Allele, g[1] as Allele];
  const g1 = gametes(p1);
  const g2 = gametes(p2);

  // sort() puts uppercase before lowercase, so A/a always comes out as "Aa"
  const cells: Geno[] = [];
  for (const a of g1) for (const b of g2) {
    cells.push([a, b].sort().join("") as Geno);
  }
  const counts: Record<string, number> = {};
  for (const c of cells) counts[c] = (counts[c] ?? 0) + 1;
  const dominant = cells.filter((c) => c.includes("A")).length;
  const recessive = 4 - dominant;

  const draw = (ctx: CanvasRenderingContext2D) => {
    const gx = 250;
    const gy = 110;
    const cell = 92;

    // parent gametes along the edges
    D.label(ctx, `${translate("Parent 1")}: ${p1}`, gx + cell, gy - 58, { size: 14, bold: true, color: D.COL.accent });
    D.label(ctx, `${translate("Parent 2")}: ${p2}`, gx - 78, gy + cell, { size: 14, bold: true, color: "#fb7185" });

    g1.forEach((a, i) => {
      D.label(ctx, a, gx + cell / 2 + i * cell, gy - 22, { size: 20, bold: true, color: D.COL.accent });
    });
    g2.forEach((b, i) => {
      D.label(ctx, b, gx - 26, gy + cell / 2 + i * cell, { size: 20, bold: true, color: "#fb7185" });
    });

    // the grid
    cells.forEach((geno, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = gx + col * cell;
      const y = gy + row * cell;
      const isDom = geno.includes("A");
      ctx.fillStyle = isDom ? "rgba(45,212,191,0.20)" : "rgba(246,178,107,0.22)";
      ctx.fillRect(x, y, cell - 4, cell - 4);
      ctx.strokeStyle = "#33445e";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, cell - 4, cell - 4);
      D.label(ctx, geno, x + cell / 2 - 2, y + cell / 2 - 12, { size: 24, bold: true });
      D.label(ctx, isDom ? "dominant" : "recessive", x + cell / 2 - 2, y + cell / 2 + 16, {
        size: 11,
        color: isDom ? D.COL.accent : D.COL.amber,
      });
    });

    // ratios
    const bx = 500;
    D.panel(ctx, bx, 110, 370, 190);
    D.label(ctx, translate("Genotype"), bx + 185, 136, { color: D.COL.muted, size: 11 });
    let y = 162;
    for (const g of GENOS) {
      const n = counts[g] ?? 0;
      D.label(ctx, g, bx + 60, y, { size: 15, bold: true, align: "right" });
      D.barGauge(ctx, bx + 76, y - 11, 200, 22, n / 4, n ? D.COL.accent : "#2a3646", `${n} / 4`);
      y += 32;
    }
    D.label(ctx, translate("Phenotype"), bx + 185, 262, { color: D.COL.muted, size: 11 });
    D.label(ctx, `${dominant} dominant : ${recessive} recessive`, bx + 185, 284, {
      size: 16,
      bold: true,
      color: D.COL.good,
    });

    D.meter(ctx, 20, 14, 200, "cross", `${p1} × ${p2}`, D.COL.accent);
    D.meter(ctx, 230, 14, 240, "offspring ratio", `${dominant} : ${recessive}`, D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={330} draw={draw} label="A Punnett square with offspring genotypes" />
      <Controls>
        <Segmented
          label="Parent 1"
          value={p1}
          onChange={setP1}
          options={GENOS.map((g) => ({ value: g, label: g }))}
        />
        <Segmented
          label="Parent 2"
          value={p2}
          onChange={setP2}
          options={GENOS.map((g) => ({ value: g, label: g }))}
        />
      </Controls>
      <Readouts>
        <Readout label="Genotypes" value={GENOS.map((g) => `${counts[g] ?? 0} ${g}`).join(" · ")} />
        <Readout label="Phenotype ratio" value={`${dominant} : ${recessive}`} tone="amber" />
        <Readout
          label="Recessive shows"
          value={recessive > 0 ? `${(recessive / 4) * 100}% of offspring` : "not at all"}
          tone={recessive > 0 ? "warn" : "good"}
        />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 4.2 — Meiosis: two divisions, four cells, and the two events that
 * make every gamete unique.
 * ===================================================================== */

export function MeiosisLab() {
  const [stage, setStage] = useState(0);
  const [crossing, setCrossing] = useState<"on" | "off">("on");

  const STAGES = [
    "Parent cell — 2 pairs of chromosomes",
    "Crossing over — homologues swap segments",
    "Independent assortment — pairs line up at random",
    "First division — homologues separate",
    "Second division — chromatids separate",
    "Four gametes, each genetically unique",
  ];

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const cx = 450;
    const cy = 200;

    const drawChrom = (x: number, y: number, h: number, col: string, swapped: boolean) => {
      ctx.strokeStyle = col;
      ctx.lineWidth = 9;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x, y - h / 2);
      ctx.lineTo(x, y + h / 2);
      ctx.stroke();
      if (swapped) {
        ctx.strokeStyle = col === "#4cc9f0" ? "#fb7185" : "#4cc9f0";
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.moveTo(x, y + h / 6);
        ctx.lineTo(x, y + h / 2);
        ctx.stroke();
      }
    };

    if (stage <= 2) {
      // one cell, chromosomes paired up
      ctx.strokeStyle = D.COL.glass;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 190, 130, 0, 0, Math.PI * 2);
      ctx.stroke();
      const swap = stage >= 1 && crossing === "on";
      const jitter = stage === 2 ? Math.sin(t * 2) * 8 : 0;
      drawChrom(cx - 80, cy + jitter, 110, "#4cc9f0", swap);
      drawChrom(cx - 52, cy + jitter, 110, "#fb7185", swap);
      drawChrom(cx + 52, cy - jitter, 80, "#4cc9f0", swap);
      drawChrom(cx + 80, cy - jitter, 80, "#fb7185", swap);
      if (stage === 1 && crossing === "on") {
        D.label(ctx, "✂ segments exchanged", cx, cy + 100, { color: D.COL.amber, size: 13, bold: true });
      }
      if (stage === 2) {
        D.label(ctx, "which side each pair faces is random", cx, cy + 100, {
          color: D.COL.amber,
          size: 12,
        });
      }
    } else if (stage === 3) {
      for (const side of [-1, 1]) {
        ctx.strokeStyle = D.COL.glass;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(cx + side * 150, cy, 120, 100, 0, 0, Math.PI * 2);
        ctx.stroke();
        drawChrom(cx + side * 150 - 22, cy, 100, side < 0 ? "#4cc9f0" : "#fb7185", crossing === "on");
        drawChrom(cx + side * 150 + 22, cy, 74, side < 0 ? "#fb7185" : "#4cc9f0", crossing === "on");
      }
      D.label(ctx, "haploid already — one of each pair per cell", cx, cy + 130, {
        color: D.COL.muted,
        size: 12,
      });
    } else {
      const xs = [-240, -80, 80, 240];
      xs.forEach((dx, i) => {
        ctx.strokeStyle = D.COL.glass;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.ellipse(cx + dx, cy, 68, 60, 0, 0, Math.PI * 2);
        ctx.stroke();
        drawChrom(cx + dx - 14, cy, 70, i % 2 === 0 ? "#4cc9f0" : "#fb7185", crossing === "on" && i % 3 === 0);
        drawChrom(cx + dx + 14, cy, 52, i < 2 ? "#fb7185" : "#4cc9f0", crossing === "on" && i % 2 === 1);
      });
      D.label(ctx, "four gametes — no two alike", cx, cy + 110, {
        color: D.COL.good,
        size: 14,
        bold: true,
      });
    }

    // stage strip
    STAGES.forEach((s, i) => {
      const y = 350 + 0;
      const x = 80 + i * 130;
      D.dot(ctx, x, y, 8, i <= stage ? D.COL.accent : "#2a3646");
      if (i === stage) D.label(ctx, s, 450, y + 30, { size: 13, color: D.COL.text });
    });

    D.meter(ctx, 20, 14, 210, "stage", `${stage + 1} / ${STAGES.length}`, D.COL.accent);
    D.meter(ctx, 240, 14, 240, "possible gametes (23 pairs)", "8.4 million", D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} label="Meiosis, from one parent cell to four gametes" />
      <Controls>
        <div className="ctl-row">
          <label>{translate("Step")}</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={() => setStage((s) => Math.max(0, s - 1))}>
              ← back
            </button>
            <button type="button" className="seg-btn" onClick={() => setStage((s) => Math.min(5, s + 1))}>
              next →
            </button>
            <button type="button" className="seg-btn" onClick={() => setStage(0)}>
              {translate("Reset")}
            </button>
          </div>
        </div>
        <Segmented
          label="Crossing over"
          value={crossing}
          onChange={setCrossing}
          options={[
            { value: "on", label: "On" },
            { value: "off", label: "Off" },
          ]}
        />
      </Controls>
      <Readouts>
        <Readout label="Stage" value={STAGES[stage]} />
        <Readout label="Cells" value={stage <= 2 ? 1 : stage === 3 ? 2 : 4} />
        <Readout label="Chromosome number" value={stage <= 2 ? "diploid (2n)" : "haploid (n)"} tone="amber" />
        <Readout label="Sources of variety" value={crossing === "on" ? "crossing over + assortment" : "assortment only"} />
      </Readouts>
    </>
  );
}
