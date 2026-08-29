"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider } from "@/helix/components/controls";
import { tl as translate } from "@/helix/lib/labStrings";
import * as D from "@/helix/lib/sim/draw";

/* =====================================================================
 * Lab 1.1 — Photosynthesis: three inputs, and only the scarcest one
 * decides the rate. The classic limiting-factor experiment.
 * ===================================================================== */

export function PhotosynthesisLab() {
  const [light, setLight] = useState(50);
  const [co2, setCo2] = useState(50);
  const [temp, setTemp] = useState(25);

  // each factor saturates on its own; the smallest ceiling wins
  const lightCap = light / (25 + light) / (100 / (25 + 100));
  const co2Cap = co2 / (20 + co2) / (100 / (20 + 100));
  const tempCap = temp > 40 ? Math.max(0, 1 - (temp - 40) / 8) : Math.exp(-(((temp - 30) / 14) ** 2));
  const caps: Array<[string, number]> = [
    ["light", lightCap],
    ["CO₂", co2Cap],
    ["temperature", tempCap],
  ];
  const limiting = caps.reduce((a, b) => (a[1] <= b[1] ? a : b));
  const rate = Math.min(...caps.map((c) => c[1])) * 100;

  const sim = useRef({ bubbles: [] as Array<{ x: number; y: number; r: number }> , acc: 0 });

  const draw = (ctx: CanvasRenderingContext2D, dt: number, t: number) => {
    const s = sim.current;

    // --- the pondweed in a beaker, bubbling oxygen ---
    const bx = 70;
    const by = 70;
    const bw = 260;
    const bh = 300;
    D.panel(ctx, bx, by, bw, bh, "#0a1a20");
    ctx.fillStyle = "rgba(45,212,191,0.10)";
    ctx.fillRect(bx + 4, by + 40, bw - 8, bh - 44);

    // the plant
    const stemX = bx + bw / 2;
    D.wire(ctx, [[stemX, by + bh - 10], [stemX, by + 80]], "#34d399", 4);
    for (let i = 0; i < 5; i++) {
      const ly = by + 110 + i * 42;
      const side = i % 2 === 0 ? 1 : -1;
      ctx.beginPath();
      ctx.ellipse(stemX + side * 34, ly, 30, 13, side * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = "#34d399";
      ctx.globalAlpha = 0.55 + tempCap * 0.4;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // oxygen bubbles, emitted at a rate proportional to photosynthesis
    s.acc += dt * (rate / 22);
    while (s.acc > 1) {
      s.acc -= 1;
      s.bubbles.push({ x: stemX + (Math.random() - 0.5) * 50, y: by + bh - 30, r: 2 + Math.random() * 3 });
    }
    s.bubbles = s.bubbles.filter((b) => b.y > by + 44);
    for (const b of s.bubbles) {
      b.y -= dt * 60;
      b.x += Math.sin(b.y / 20) * 0.3;
      D.ring(ctx, b.x, b.y, b.r, "rgba(167,243,208,0.9)", 1.5);
    }
    D.label(ctx, `O₂ ${rate.toFixed(0)}%`, stemX, by + 24, { color: "#a7f3d0", size: 13, bold: true });

    // sunlight streaks, brightness follows the light slider
    ctx.globalAlpha = 0.10 + (light / 100) * 0.4;
    for (let i = 0; i < 7; i++) {
      D.wire(
        ctx,
        [[bx - 30 + i * 44, by - 40], [bx + 10 + i * 44, by + 60]],
        "#fde68a",
        3
      );
    }
    ctx.globalAlpha = 1;

    // --- the equation ---
    D.label(ctx, "6 CO₂ + 6 H₂O + light → C₆H₁₂O₆ + 6 O₂", 610, 96, {
      size: 15,
      mono: true,
      color: D.COL.accent,
    });

    // --- limiting-factor bars ---
    const gx = 400;
    let gy = 140;
    for (const [name, cap] of caps) {
      const isLim = name === limiting[0];
      D.label(ctx, translate(name), gx + 60, gy + 9, { align: "right", size: 12, color: isLim ? D.COL.amber : D.COL.muted });
      D.barGauge(ctx, gx + 72, gy - 2, 300, 20, cap, isLim ? D.COL.amber : "rgba(45,212,191,0.55)",
        `${Math.round(cap * 100)}%`);
      if (isLim) {
        D.label(ctx, "← limiting", gx + 386, gy + 9, { align: "left", size: 11, color: D.COL.amber });
      }
      gy += 42;
    }
    D.label(
      ctx,
      "the rate is set by whichever input is scarcest — raising the others changes nothing",
      620,
      gy + 20,
      { color: D.COL.muted, size: 11 }
    );

    // big rate readout
    D.panel(ctx, 400, gy + 44, 460, 84);
    D.label(ctx, `${rate.toFixed(0)} %`, 630, gy + 76, { size: 30, bold: true, mono: true, color: D.COL.good });
    D.label(ctx, "of maximum photosynthetic rate", 630, gy + 104, { color: D.COL.muted, size: 11 });

    D.meter(ctx, 400, 14, 210, "limiting factor", limiting[0], D.COL.amber);
    D.meter(ctx, 620, 14, 180, "Temperature", `${temp} °C`, temp > 40 ? D.COL.bad : D.COL.accent);
    void t;
  };

  return (
    <>
      <SimCanvas width={900} height={430} draw={draw} label="Pondweed photosynthesising, with limiting-factor bars" />
      <Controls>
        <Slider label="Light intensity" min={0} max={100} step={1} value={light} onChange={setLight} fmt={(v) => `${v} %`} />
        <Slider label="CO₂ level" min={0} max={100} step={1} value={co2} onChange={setCo2} fmt={(v) => `${v} %`} />
        <Slider label="Temperature" min={0} max={50} step={1} value={temp} onChange={setTemp} fmt={(v) => `${v} °C`} />
      </Controls>
      <Readouts>
        <Readout label="Rate" value={`${rate.toFixed(0)} %`} tone={rate > 60 ? "good" : "amber"} />
        <Readout label="Limiting factor" value={limiting[0]} tone="amber" />
        <Readout label="O₂ released" value={rate > 5 ? "bubbling" : "almost none"} />
        <Readout label="Where" value="chloroplast" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 1.2 — Respiration: the same sugar, with or without oxygen, and a
 * ~15× difference in what the cell gets out of it.
 * ===================================================================== */

export function RespirationLab() {
  const [oxygen, setOxygen] = useState<"aerobic" | "anaerobic">("aerobic");
  const [organism, setOrganism] = useState<"human" | "yeast">("human");
  const [glucose, setGlucose] = useState(4);

  const aerobic = oxygen === "aerobic";
  const atpPerGlucose = aerobic ? 30 : 2;
  const totalAtp = glucose * atpPerGlucose;
  const waste = aerobic
    ? "CO₂ + H₂O"
    : organism === "human"
      ? "lactic acid"
      : "ethanol + CO₂";

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    // --- glucose in ---
    const gx = 110;
    const cy = 210;
    for (let i = 0; i < glucose; i++) {
      const a = t * 0.6 + i;
      D.dot(ctx, gx + Math.cos(a) * 26, cy - 60 + i * 26 + Math.sin(a) * 6, 13, "#fbbf24");
    }
    D.label(ctx, "glucose", gx, cy + 110, { color: "#fbbf24", size: 13, bold: true });
    D.label(ctx, `${glucose} molecules`, gx, cy + 130, { color: D.COL.muted, size: 11 });

    D.arrow(ctx, gx + 60, cy, gx + 130, cy, D.COL.muted, 3, 10);

    // --- the cell / mitochondrion ---
    const mx = 380;
    ctx.beginPath();
    ctx.ellipse(mx, cy, 110, 78, 0, 0, Math.PI * 2);
    ctx.fillStyle = aerobic ? "rgba(251,113,133,0.20)" : "rgba(143,160,179,0.14)";
    ctx.fill();
    ctx.strokeStyle = aerobic ? "#fb7185" : D.COL.muted;
    ctx.lineWidth = 3;
    ctx.stroke();
    if (aerobic) {
      // cristae
      ctx.strokeStyle = "rgba(251,113,133,0.75)";
      ctx.lineWidth = 2;
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.moveTo(mx - 80, cy + i * 26);
        ctx.bezierCurveTo(mx - 20, cy + i * 26 - 16, mx + 20, cy + i * 26 + 16, mx + 80, cy + i * 26);
        ctx.stroke();
      }
      D.label(ctx, "mitochondrion", mx, cy - 96, { color: "#fb7185", size: 13, bold: true });
      D.label(ctx, translate("aerobic"), mx, cy + 96, { color: D.COL.good, size: 13, bold: true });
    } else {
      D.label(ctx, "cytoplasm only", mx, cy - 96, { color: D.COL.muted, size: 13, bold: true });
      D.label(ctx, translate("anaerobic"), mx, cy + 96, { color: D.COL.amber, size: 13, bold: true });
      D.label(ctx, "glycolysis alone — no mitochondrion needed", mx, cy + 116, {
        color: D.COL.muted,
        size: 11,
      });
    }

    // oxygen going in
    if (aerobic) {
      for (let i = 0; i < 4; i++) {
        const p = ((t * 0.5 + i / 4) % 1);
        D.dot(ctx, mx - 40 + p * 20, cy - 130 + p * 50, 6, "#7dd3fc");
      }
      D.label(ctx, "O₂", mx - 40, cy - 140, { color: "#7dd3fc", size: 12, bold: true });
    }

    D.arrow(ctx, mx + 130, cy, mx + 200, cy, D.COL.muted, 3, 10);

    // --- ATP out ---
    const ax = 660;
    const cols = 10;
    const shown = Math.min(totalAtp, 60);
    for (let i = 0; i < shown; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      D.dot(ctx, ax + col * 20 - 90, cy - 60 + row * 20, 7, "#2dd4bf");
    }
    D.label(ctx, `${totalAtp} ATP`, ax, cy + 90, { size: 20, bold: true, color: "#2dd4bf" });
    if (totalAtp > 60) {
      D.label(ctx, "(showing 60)", ax, cy + 112, { color: D.COL.muted, size: 10 });
    }
    D.label(ctx, `waste: ${translate(waste)}`, ax, cy + 134, { color: D.COL.amber, size: 12 });

    D.meter(ctx, 20, 14, 190, "ATP per glucose", String(atpPerGlucose), aerobic ? D.COL.good : D.COL.amber);
    D.meter(ctx, 220, 14, 200, "Oxygen available", aerobic ? "yes" : "no", aerobic ? D.COL.good : D.COL.bad);
    D.meter(ctx, 430, 14, 230, "efficiency vs aerobic", aerobic ? "100 %" : "≈ 7 %", aerobic ? D.COL.good : D.COL.bad);
  };

  return (
    <>
      <SimCanvas width={900} height={420} draw={draw} label="Glucose entering a cell and ATP coming out" />
      <Controls>
        <Segmented
          label="Oxygen available"
          value={oxygen}
          onChange={setOxygen}
          options={[
            { value: "aerobic", label: "aerobic" },
            { value: "anaerobic", label: "anaerobic" },
          ]}
        />
        <Segmented
          label="Organism"
          value={organism}
          onChange={setOrganism}
          options={[
            { value: "human", label: "Human muscle" },
            { value: "yeast", label: "Yeast" },
          ]}
        />
        <Slider label="Glucose" min={1} max={6} step={1} value={glucose} onChange={setGlucose} fmt={(v) => `${v}`} />
      </Controls>
      <Readouts>
        <Readout label="ATP per glucose" value={atpPerGlucose} tone={aerobic ? "good" : "warn"} />
        <Readout label="Total ATP" value={totalAtp} tone="good" />
        <Readout label="Waste product" value={waste} tone="amber" />
        <Readout label="Where" value={aerobic ? "mitochondrion" : "cytoplasm"} />
      </Readouts>
    </>
  );
}
