"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Slider } from "@/helix/components/controls";
import { tl as translate } from "@/helix/lib/labStrings";
import * as D from "@/helix/lib/sim/draw";

/* =====================================================================
 * Lab 3.1 — Digital twin of the strawberry extraction. Each step exists
 * for a reason, and the reasons are the three units you just did.
 * ===================================================================== */

interface Stage {
  name: string;
  what: string;
  why: string;
}

const STAGES: Stage[] = [
  {
    name: "Mash the strawberry",
    what: "Squash it in a bag for a minute — properly, until it is slurry.",
    why: "Mechanical work breaks cell walls apart. Strawberries are octoploid: eight copies of every chromosome, so there is far more DNA per gram than in most fruit.",
  },
  {
    name: "Add washing-up liquid",
    what: "A teaspoon of detergent, stirred in gently. No foam.",
    why: "Detergent dissolves lipid. It takes apart the cell membrane and the nuclear membrane in exactly the way it takes grease off a plate — the bilayer from Unit 0, undone.",
  },
  {
    name: "Add salt",
    what: "Half a teaspoon, dissolved.",
    why: "Sodium ions shield DNA's negatively charged phosphate backbone, so the strands stop repelling each other and can clump. Salt also helps strip away bound proteins.",
  },
  {
    name: "Filter",
    what: "Pour through a coffee filter or muslin into a clear glass.",
    why: "Removes cell walls, fibre and pulp. What passes through is a solution containing DNA, proteins and sugars.",
  },
  {
    name: "Layer on ice-cold spirit",
    what: "Tilt the glass and pour chilled vodka or surgical spirit gently down the side. Do not stir.",
    why: "DNA dissolves in water but not in alcohol. At the boundary it comes out of solution — and cold keeps it from breaking up. White threads appear at the interface within seconds.",
  },
  {
    name: "Spool it out",
    what: "Lift the strands out on a cocktail stick or glass rod.",
    why: "What is on the stick is millions of DNA molecules clumped together, from millions of cells. A single molecule would be invisible; this is a crowd.",
  },
];

export function StrawberryLab() {
  const [stage, setStage] = useState(0);

  const s = STAGES[Math.min(stage, STAGES.length - 1)];
  const done = stage >= STAGES.length - 1;

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    // --- the glass ---
    const gx = 150;
    const gy = 80;
    const gw = 150;
    const gh = 260;
    const liquidTop = gy + 90;

    // alcohol layer once we reach that stage
    if (stage >= 4) {
      ctx.fillStyle = "rgba(221,230,240,0.16)";
      ctx.fillRect(gx + 4, gy + 30, gw - 8, liquidTop - gy - 30);
      D.label(ctx, "cold spirit", gx + gw / 2, gy + 56, { color: "#dde6f0", size: 11 });
    }
    // the extract
    ctx.fillStyle = stage >= 3 ? "rgba(244,114,182,0.35)" : "rgba(190,60,90,0.5)";
    ctx.fillRect(gx + 4, liquidTop, gw - 8, gy + gh - liquidTop - 4);

    // DNA at the interface
    if (stage >= 4) {
      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.lineWidth = 2;
      for (let i = 0; i < 9; i++) {
        const x = gx + 14 + i * 15;
        ctx.beginPath();
        for (let k = 0; k <= 14; k++) {
          const yy = liquidTop - k * 3.2 - (stage >= 5 ? 26 : 0);
          const xx = x + Math.sin(k * 0.8 + i + t * 1.4) * 5;
          if (k === 0) ctx.moveTo(xx, yy);
          else ctx.lineTo(xx, yy);
        }
        ctx.stroke();
      }
      D.label(ctx, "DNA", gx + gw / 2, liquidTop - 66, { color: "#ffffff", size: 13, bold: true });
    }
    // the stick
    if (stage >= 5) {
      D.wire(ctx, [[gx + gw / 2, gy - 24], [gx + gw / 2, liquidTop - 40]], "#d6c39a", 4);
    }

    // glass outline
    ctx.strokeStyle = D.COL.glass;
    ctx.lineWidth = 3;
    ctx.strokeRect(gx, gy + 26, gw, gh - 30);

    // --- steps list ---
    const lx = 360;
    STAGES.forEach((st, i) => {
      const y = 78 + i * 34;
      const active = i === stage;
      const passed = i < stage;
      D.dot(ctx, lx, y, 9, passed ? D.COL.good : active ? D.COL.accent : "#2a3646");
      if (passed) D.label(ctx, "✓", lx, y + 1, { size: 11, color: "#07240f", bold: true });
      D.label(ctx, `${i + 1}. ${st.name}`, lx + 20, y, {
        align: "left",
        size: 13,
        bold: active,
        color: active ? D.COL.text : passed ? D.COL.muted : "#5a6b7d",
      });
    });

    // --- the why panel ---
    D.panel(ctx, 360, 292, 500, 118);
    D.label(ctx, s.what, 610, 316, { size: 12, color: D.COL.text });
    let line = "";
    let ly = 342;
    for (const w of translate(s.why).split(" ")) {
      if ((line + w).length > 68) {
        D.label(ctx, line.trim(), 610, ly, { color: D.COL.muted, size: 11 });
        ly += 17;
        line = "";
      }
      line += w + " ";
    }
    D.label(ctx, line.trim(), 610, ly, { color: D.COL.muted, size: 11 });

    D.meter(ctx, 20, 14, 200, "step", `${stage + 1} / ${STAGES.length}`, D.COL.accent);
    if (done) D.meter(ctx, 230, 14, 220, "result", "visible DNA", D.COL.good);
  };

  return (
    <>
      <SimCanvas width={900} height={430} draw={draw} label="The strawberry DNA extraction, step by step" />
      <Controls>
        <Slider
          label="Protocol step"
          min={0}
          max={STAGES.length - 1}
          step={1}
          value={stage}
          onChange={setStage}
          fmt={(v) => `${v + 1} / ${STAGES.length}`}
        />
      </Controls>
      <Readouts>
        <Readout label="Step" value={s.name} tone="amber" />
        <Readout label="Doing the work" value={stage === 1 ? "detergent" : stage === 2 ? "salt" : stage === 4 ? "alcohol" : "you"} />
        <Readout label="Visible DNA" value={stage >= 4 ? "yes" : "not yet"} tone={stage >= 4 ? "good" : undefined} />
      </Readouts>
    </>
  );
}
