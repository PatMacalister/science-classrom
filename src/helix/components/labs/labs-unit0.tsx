"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider, useTl } from "@/helix/components/controls";
import { clamp, rng } from "@/helix/lib/sim/helpers";
import { tl as translate } from "@/helix/lib/labStrings";
import * as D from "@/helix/lib/sim/draw";

/** Draw prose wrapped to `width` characters; translated before wrapping. */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  y: number,
  width: number,
  opts: { color?: string; size?: number } = {}
): number {
  let line = "";
  let ly = y;
  for (const w of translate(text).split(" ")) {
    if ((line + w).length > width) {
      D.label(ctx, line.trim(), cx, ly, { color: opts.color ?? D.COL.muted, size: opts.size ?? 11 });
      ly += (opts.size ?? 11) + 6;
      line = "";
    }
    line += w + " ";
  }
  D.label(ctx, line.trim(), cx, ly, { color: opts.color ?? D.COL.muted, size: opts.size ?? 11 });
  return ly + (opts.size ?? 11) + 6;
}

/* =====================================================================
 * Lab 0.1 — The cell explorer: click a part, learn what it does. Three
 * cell types side by side make the eukaryote/prokaryote split concrete.
 * ===================================================================== */

type CellKind = "animal" | "plant" | "bacterial";

interface Part {
  id: string;
  name: string;
  job: string;
  /** ellipse in canvas coords */
  x: number;
  y: number;
  rx: number;
  ry: number;
  color: string;
  /** which cell types contain it */
  kinds: CellKind[];
}

const PARTS: Part[] = [
  { id: "membrane", name: "Cell membrane", x: 300, y: 220, rx: 210, ry: 150, color: "#7dd3fc",
    job: "The border. A double layer of fat that decides what enters and leaves — every cell has one.",
    kinds: ["animal", "plant", "bacterial"] },
  { id: "wall", name: "Cell wall", x: 300, y: 220, rx: 228, ry: 168, color: "#a3e635",
    job: "A rigid cellulose box outside the membrane. It stops a plant cell bursting when it fills with water, and it is why plants stand up.",
    kinds: ["plant", "bacterial"] },
  { id: "cytoplasm", name: "Cytoplasm", x: 300, y: 220, rx: 170, ry: 118, color: "#1e3a5f",
    job: "The crowded, watery jelly everything else sits in. Most of a cell's chemistry happens here.",
    kinds: ["animal", "plant", "bacterial"] },
  { id: "nucleus", name: "Nucleus", x: 250, y: 200, rx: 62, ry: 52, color: "#c084fc",
    job: "The archive. It holds the DNA behind its own membrane and lets only copies out — which is exactly what a prokaryote lacks.",
    kinds: ["animal", "plant"] },
  { id: "mito", name: "Mitochondrion", x: 400, y: 290, rx: 46, ry: 26, color: "#fb7185",
    job: "The power station: it burns glucose with oxygen to make ATP. It has its own DNA, because it was once a free-living bacterium.",
    kinds: ["animal", "plant"] },
  { id: "chloro", name: "Chloroplast", x: 175, y: 305, rx: 48, ry: 30, color: "#34d399",
    job: "Where photosynthesis happens. Green because chlorophyll absorbs red and blue light and reflects the rest.",
    kinds: ["plant"] },
  { id: "ribosome", name: "Ribosome", x: 390, y: 165, rx: 13, ry: 13, color: "#fbbf24",
    job: "The protein factory: it reads mRNA three bases at a time and links amino acids in that order. Every living thing has these.",
    kinds: ["animal", "plant", "bacterial"] },
  { id: "vacuole", name: "Vacuole", x: 330, y: 155, rx: 70, ry: 48, color: "#38bdf8",
    job: "A big water bag. Filled, it presses the cell against its wall and keeps the plant rigid; let it empty and the plant wilts.",
    kinds: ["plant"] },
  { id: "dna", name: "Nucleoid (free DNA)", x: 290, y: 215, rx: 60, ry: 34, color: "#c084fc",
    job: "A bacterium's DNA floats loose in the cytoplasm — no nuclear membrane at all. That single difference defines a prokaryote.",
    kinds: ["bacterial"] },
];

export function CellLab() {
  const tl = useTl();
  const [kind, setKind] = useState<CellKind>("animal");
  const [picked, setPicked] = useState<string>("membrane");

  const visible = PARTS.filter((p) => p.kinds.includes(kind));
  const sel = visible.find((p) => p.id === picked) ?? visible[0];

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    // outer shapes first, so smaller organelles land on top
    const order = ["wall", "membrane", "cytoplasm", "vacuole", "nucleus", "dna", "chloro", "mito", "ribosome"];
    const sorted = [...visible].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

    for (const p of sorted) {
      const on = sel?.id === p.id;
      const wob = p.id === "ribosome" ? Math.sin(t * 2 + p.x) * 2 : 0;
      ctx.save();
      ctx.globalAlpha = p.id === "cytoplasm" ? 0.85 : 1;
      ctx.beginPath();
      ctx.ellipse(p.x, p.y + wob, p.rx, p.ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.id === "membrane" || p.id === "wall" ? "transparent" : p.color + (on ? "" : "cc");
      if (p.id !== "membrane" && p.id !== "wall") ctx.fill();
      ctx.strokeStyle = on ? "#ffffff" : p.color;
      ctx.lineWidth = on ? 3.5 : p.id === "wall" ? 5 : 2.5;
      ctx.stroke();
      ctx.restore();

      // a few extra ribosomes for texture (not clickable, same colour)
      if (p.id === "ribosome") {
        const rand = rng(11);
        for (let i = 0; i < 14; i++) {
          const a = rand() * Math.PI * 2;
          const rr = 60 + rand() * 110;
          D.dot(ctx, 300 + Math.cos(a) * rr * 1.4, 220 + Math.sin(a) * rr * 0.8, 3.5, "#fbbf2488");
        }
      }
    }

    // label the selected part in place
    if (sel) {
      D.label(ctx, tl(sel.name), sel.x, sel.y - sel.ry - 12, {
        color: "#ffffff",
        size: 13,
        bold: true,
      });
    }

    D.label(ctx, translate("click a part to identify it"), 300, 400, {
      color: D.COL.muted,
      size: 12,
    });

    // info panel
    const bx = 570;
    D.panel(ctx, bx, 60, 310, 320);
    D.label(ctx, sel ? tl(sel.name) : "", bx + 155, 92, { size: 18, bold: true, color: D.COL.accent });
    if (sel) {
      wrapText(ctx, sel.job, bx + 155, 128, 34, { size: 12, color: D.COL.text });
      const inAll = sel.kinds.length === 3;
      D.label(
        ctx,
        inAll ? "in every cell — animal, plant and bacterial" : `only in: ${sel.kinds.join(", ")}`,
        bx + 155,
        330,
        { color: inAll ? D.COL.good : D.COL.amber, size: 11 }
      );
    }
    D.meter(ctx, 20, 14, 200, "Cell type", kind === "animal" ? "Animal cell" : kind === "plant" ? "Plant cell" : "Bacterial cell", D.COL.accent);
    D.meter(ctx, 230, 14, 180, "parts shown", String(visible.length), D.COL.amber);
  };

  const pick = (x: number, y: number) => {
    // smallest hit wins, so a ribosome inside the cytoplasm is still clickable
    const hits = visible.filter(
      (p) => ((x - p.x) / p.rx) ** 2 + ((y - p.y) / p.ry) ** 2 <= 1
    );
    if (hits.length === 0) return;
    hits.sort((a, b) => a.rx * a.ry - b.rx * b.ry);
    setPicked(hits[0].id);
  };

  return (
    <>
      <SimCanvas
        width={900}
        height={420}
        draw={draw}
        label="A cell in cross-section with its organelles"
        onClick={(p) => pick(p.x, p.y)}
      />
      <Controls>
        <Segmented
          label="Cell type"
          value={kind}
          onChange={(v) => {
            setKind(v);
            setPicked("membrane");
          }}
          options={[
            { value: "animal", label: "Animal cell" },
            { value: "plant", label: "Plant cell" },
            { value: "bacterial", label: "Bacterial cell" },
          ]}
        />
      </Controls>
      <Readouts>
        <Readout label="Organelle" value={sel ? sel.name : "—"} tone="amber" />
        <Readout label="Parts shown" value={visible.length} />
        <Readout
          label="Has a nucleus"
          value={kind === "bacterial" ? "no — prokaryote" : "yes — eukaryote"}
          tone={kind === "bacterial" ? "warn" : "good"}
        />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 0.2 — Osmosis: water moves to where the solute is, and a cell
 * either bursts, shrivels or (if it has a wall) just gets firm.
 * ===================================================================== */

export function OsmosisLab() {
  const [outside, setOutside] = useState(0.3);
  const [walled, setWalled] = useState<"animal" | "plant">("animal");
  const sim = useRef({ vol: 1 });

  const inside = 0.3; // the cell's own solute concentration, held fixed
  const diff = outside - inside;
  const tonicity = Math.abs(diff) < 0.02 ? "isotonic" : diff < 0 ? "hypotonic" : "hypertonic";
  // a walled cell cannot expand past turgor; an animal cell can burst
  const targetVol = clamp(1 - diff * 1.6, walled === "plant" ? 0.55 : 0.35, walled === "plant" ? 1.15 : 1.6);
  const burst = walled === "animal" && targetVol > 1.5;
  const plasmolysed = walled === "plant" && targetVol < 0.7;

  const draw = (ctx: CanvasRenderingContext2D, dt: number, t: number) => {
    const s = sim.current;
    s.vol += (targetVol - s.vol) * clamp(dt * 2.2, 0, 1);
    const v = s.vol;

    const cx = 300;
    const cy = 215;
    const base = 118;
    const r = base * Math.sqrt(v);

    // the beaker of solution
    D.panel(ctx, 60, 60, 480, 320, "#0a1420");
    const density = clamp(outside * 90, 4, 90);
    const rand = rng(5);
    for (let i = 0; i < density; i++) {
      const x = 70 + rand() * 460;
      const y = 70 + rand() * 300;
      D.dot(ctx, x, y, 2.6, "rgba(246,178,107,0.75)");
    }

    // the cell
    if (walled === "plant") {
      ctx.strokeStyle = "#a3e635";
      ctx.lineWidth = 5;
      ctx.strokeRect(cx - 132, cy - 108, 264, 216);
      D.label(ctx, "cell wall", cx, cy - 122, { color: "#a3e635", size: 11 });
    }
    ctx.beginPath();
    ctx.ellipse(cx, cy, r * 1.1, r * 0.92, 0, 0, Math.PI * 2);
    ctx.fillStyle = burst ? "rgba(242,109,109,0.35)" : "rgba(45,212,191,0.28)";
    ctx.fill();
    ctx.strokeStyle = burst ? D.COL.bad : "#7dd3fc";
    ctx.lineWidth = 3;
    if (burst) ctx.setLineDash([9, 7]);
    ctx.stroke();
    ctx.setLineDash([]);

    // water-flow arrows
    if (Math.abs(diff) > 0.02) {
      const inward = diff < 0;
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + t * 0.4;
        const r1 = r * 1.35;
        const r2 = r * 0.72;
        const [fx, fy] = inward ? [r1, r2] : [r2, r1];
        D.arrow(
          ctx,
          cx + Math.cos(a) * fx * 1.05,
          cy + Math.sin(a) * fy * 0.9,
          cx + Math.cos(a) * (inward ? r2 : r1) * 1.05,
          cy + Math.sin(a) * (inward ? r2 : r1) * 0.9,
          inward ? "#7dd3fc" : "#f6b26b",
          2.5,
          8
        );
      }
    }

    D.label(
      ctx,
      burst ? "LYSIS — the cell has burst" : plasmolysed ? "PLASMOLYSIS — membrane pulls off the wall" : "",
      cx,
      cy + 150,
      { color: burst ? D.COL.bad : D.COL.amber, size: 14, bold: true }
    );

    // panel
    const bx = 570;
    D.panel(ctx, bx, 60, 310, 320);
    D.label(ctx, translate(tonicity), bx + 155, 96, {
      size: 22,
      bold: true,
      color: tonicity === "isotonic" ? D.COL.good : tonicity === "hypotonic" ? "#7dd3fc" : D.COL.amber,
    });
    D.label(
      ctx,
      diff < -0.02 ? "outside is more dilute" : diff > 0.02 ? "outside is saltier" : "same on both sides",
      bx + 155,
      120,
      { color: D.COL.muted, size: 12 }
    );
    D.barGauge(ctx, bx + 30, 150, 250, 18, v / 1.6, burst ? D.COL.bad : D.COL.accent,
      `${Math.round(v * 100)}% volume`);
    D.label(ctx, translate("net water flow"), bx + 155, 200, { color: D.COL.muted, size: 11 });
    D.label(
      ctx,
      diff < -0.02 ? translate("water in") : diff > 0.02 ? translate("water out") : translate("balanced"),
      bx + 155,
      222,
      { size: 15, bold: true, color: D.COL.text }
    );
    wrapText(
      ctx,
      walled === "plant"
        ? "The wall takes the strain: a plant cell in pure water goes turgid and firm instead of bursting. That pressure is what holds a stem up."
        : "An animal cell has no wall. In pure water it swells until the membrane fails; in strong salt it shrivels.",
      bx + 155,
      258,
      34,
      { size: 12 }
    );

    D.meter(ctx, 20, 14, 200, "Outside concentration", `${outside.toFixed(2)} M`, D.COL.amber);
    D.meter(ctx, 230, 14, 180, "cell volume", `${Math.round(v * 100)} %`, burst ? D.COL.bad : D.COL.accent);
  };

  return (
    <>
      <SimCanvas width={900} height={420} draw={draw} label="A cell in a solution, gaining or losing water" />
      <Controls>
        <Segmented
          label="Cell type"
          value={walled}
          onChange={setWalled}
          options={[
            { value: "animal", label: "Animal cell" },
            { value: "plant", label: "Plant cell" },
          ]}
        />
        <Slider
          label="Outside concentration"
          min={0}
          max={0.9}
          step={0.01}
          value={outside}
          onChange={setOutside}
          fmt={(v) => `${v.toFixed(2)} M`}
        />
      </Controls>
      <Readouts>
        <Readout label="Tonicity" value={tonicity} tone={tonicity === "isotonic" ? "good" : "amber"} />
        <Readout
          label="Net water flow"
          value={diff < -0.02 ? "into the cell" : diff > 0.02 ? "out of the cell" : "balanced"}
        />
        <Readout label="Inside" value={`${inside.toFixed(2)} M`} />
        <Readout
          label="Outcome"
          value={burst ? "bursts" : plasmolysed ? "plasmolysed" : "stable"}
          tone={burst ? "warn" : plasmolysed ? "amber" : "good"}
        />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 0.3 — Enzymes: rate climbs with substrate until every active site
 * is busy, and collapses past the optimum because the protein unfolds.
 * ===================================================================== */

export function EnzymeLab() {
  const [temp, setTemp] = useState(37);
  const [ph, setPh] = useState(7);
  const [substrate, setSubstrate] = useState(50);

  // bell curve on temperature, sharp cliff after denaturation
  const denatured = temp > 55;
  const tempFactor = denatured
    ? Math.max(0, 1 - (temp - 55) / 8)
    : Math.exp(-(((temp - 37) / 17) ** 2));
  const phFactor = Math.exp(-(((ph - 7) / 2.2) ** 2));
  // Michaelis–Menten: saturating in substrate
  const km = 25;
  const satFactor = substrate / (km + substrate);
  const rate = tempFactor * phFactor * satFactor * 100;
  const saturated = satFactor > 0.8;

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    // ---- the enzyme itself ----
    const cx = 230;
    const cy = 180;
    const wob = denatured ? Math.sin(t * 9) * 7 : Math.sin(t * 1.5) * 2;
    ctx.beginPath();
    if (denatured) {
      // an unfolded blob: the active site is gone
      ctx.moveTo(cx - 70, cy);
      for (let i = 0; i <= 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        const rr = 58 + Math.sin(a * 3 + t * 6) * 22;
        ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.8);
      }
    } else {
      ctx.ellipse(cx, cy, 68, 54, 0, 0, Math.PI * 2);
    }
    ctx.closePath();
    ctx.fillStyle = denatured ? "rgba(242,109,109,0.3)" : "rgba(45,212,191,0.28)";
    ctx.fill();
    ctx.strokeStyle = denatured ? D.COL.bad : D.COL.accent;
    ctx.lineWidth = 3;
    ctx.stroke();

    if (!denatured) {
      // the notch: the active site
      ctx.beginPath();
      ctx.arc(cx + 40 + wob, cy - 22, 20, 0, Math.PI * 2);
      ctx.fillStyle = "#0a1420";
      ctx.fill();
      ctx.strokeStyle = D.COL.accent;
      ctx.lineWidth = 2;
      ctx.stroke();
      D.label(ctx, translate("active site"), cx + 40, cy - 58, { color: D.COL.accent, size: 11 });
      // substrate docking, at a speed set by the rate
      const phase = (t * (0.4 + rate / 60)) % 1;
      const sx = cx + 150 - phase * 110;
      D.dot(ctx, sx, cy - 22, 12, "#fbbf24");
      D.label(ctx, "S", sx, cy - 22, { size: 12, bold: true, color: "#3b2f0b" });
    } else {
      D.label(ctx, translate("denatured"), cx, cy + 88, { color: D.COL.bad, size: 15, bold: true });
      D.label(ctx, "the shape is gone, and the shape was the function", cx, cy + 110, {
        color: D.COL.muted,
        size: 11,
      });
    }

    // ---- rate vs substrate curve ----
    const gx = 470;
    const gy = 90;
    const gw = 390;
    const gh = 210;
    D.panel(ctx, gx, gy, gw, gh, "#0a1420");
    ctx.strokeStyle = "#2dd4bf";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const sub = (i / 100) * 100;
      const y = gy + gh - (sub / (km + sub)) * tempFactor * phFactor * gh * 0.92;
      const x = gx + (i / 100) * gw;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    // where we are on it
    const px = gx + (substrate / 100) * gw;
    const py = gy + gh - (satFactor * tempFactor * phFactor * gh * 0.92);
    D.glow(ctx, px, py, 22, "#fbbf24", 0.8);
    D.dot(ctx, px, py, 6, "#fbbf24");
    D.label(ctx, "Substrate concentration →", gx + gw / 2, gy + gh + 18, { color: D.COL.muted, size: 11 });
    ctx.save();
    ctx.translate(gx - 14, gy + gh / 2);
    ctx.rotate(-Math.PI / 2);
    D.label(ctx, "reaction rate", 0, 0, { color: D.COL.muted, size: 11 });
    ctx.restore();
    if (saturated) {
      D.label(ctx, "saturated — every active site is busy", gx + gw / 2, gy + 20, {
        color: D.COL.amber,
        size: 12,
        bold: true,
      });
    }

    D.meter(ctx, 20, 14, 170, "Temperature", `${temp} °C`, denatured ? D.COL.bad : D.COL.accent);
    D.meter(ctx, 200, 14, 130, "pH", ph.toFixed(1), D.COL.accent);
    D.meter(ctx, 340, 14, 180, "reaction rate", `${rate.toFixed(0)} %`, rate > 60 ? D.COL.good : D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={420} draw={draw} label="An enzyme with its active site, and a rate-versus-substrate curve" />
      <Controls>
        <Slider label="Temperature" min={0} max={80} step={1} value={temp} onChange={setTemp} fmt={(v) => `${v} °C`} />
        <Slider label="pH" min={1} max={13} step={0.5} value={ph} onChange={setPh} fmt={(v) => v.toFixed(1)} />
        <Slider
          label="Substrate concentration"
          min={0}
          max={100}
          step={1}
          value={substrate}
          onChange={setSubstrate}
          fmt={(v) => `${v} %`}
        />
      </Controls>
      <Readouts>
        <Readout label="Rate" value={`${rate.toFixed(0)} %`} tone={rate > 60 ? "good" : "amber"} />
        <Readout label="State" value={denatured ? "denatured" : "folded"} tone={denatured ? "warn" : "good"} />
        <Readout label="Active sites" value={saturated ? "saturated" : "free capacity"} />
        <Readout label="Optimum" value="37 °C, pH 7" />
      </Readouts>
    </>
  );
}
