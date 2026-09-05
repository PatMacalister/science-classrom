"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider } from "@/vector/components/controls";
import { clamp } from "@/vector/lib/sim/helpers";
import * as D from "@/vector/lib/sim/draw";

/* =====================================================================
 * Lab 5.1 — The light bender: Snell's law at a boundary, both ways,
 * including the angle where the exit closes.
 * ===================================================================== */

export function RefractionLab() {
  const [angle, setAngle] = useState(35);
  const [direction, setDirection] = useState<"in" | "out">("in");

  const N_GLASS = 1.5;
  const n1 = direction === "in" ? 1.0 : N_GLASS;
  const n2 = direction === "in" ? N_GLASS : 1.0;
  const sinOut = (n1 * Math.sin((angle * Math.PI) / 180)) / n2;
  const tir = sinOut > 1;
  const outAngle = tir ? null : (Math.asin(sinOut) * 180) / Math.PI;
  const critical = direction === "out" ? (Math.asin(n2 / n1) * 180) / Math.PI : null;

  const draw = (ctx: CanvasRenderingContext2D) => {
    const cx = 450;
    const cy = 200;

    // media
    ctx.fillStyle = "rgba(45,110,165,0.18)";
    ctx.fillRect(50, cy, 800, 170);
    D.label(ctx, direction === "in" ? "glass (n = 1.5)" : "air (n = 1.0)", 130, cy + 150, { size: 11, color: D.COL.muted });
    D.label(ctx, direction === "in" ? "air (n = 1.0)" : "glass (n = 1.5)", 130, 50, { size: 11, color: D.COL.muted });
    D.wire(ctx, [[50, cy], [850, cy]], "#8b97a7", 2);

    // normal
    ctx.setLineDash([5, 6]);
    D.wire(ctx, [[cx, 40], [cx, 370]], "rgba(139,151,167,0.5)", 1.5);
    ctx.setLineDash([]);
    D.label(ctx, "normal", cx + 34, 52, { size: 10, color: D.COL.muted });

    const inRad = (angle * Math.PI) / 180;
    // incoming ray (from upper left)
    D.wire(ctx, [[cx - Math.sin(inRad) * 170, cy - Math.cos(inRad) * 170], [cx, cy]], D.COL.amber, 3);
    D.label(ctx, `${angle}°`, cx - Math.sin(inRad) * 60 - 24, cy - Math.cos(inRad) * 60, { size: 12, color: D.COL.amber });

    if (tir) {
      // total internal reflection: bounce back into the lower medium's side
      D.wire(ctx, [[cx, cy], [cx + Math.sin(inRad) * 170, cy - Math.cos(inRad) * 170]], D.COL.bad, 3);
      D.label(ctx, "no exit — total internal reflection", cx + 130, cy - 130, { size: 12, bold: true, color: D.COL.bad });
    } else {
      const outRad = ((outAngle ?? 0) * Math.PI) / 180;
      D.wire(ctx, [[cx, cy], [cx + Math.sin(outRad) * 170, cy + Math.cos(outRad) * 170]], D.COL.accent, 3);
      D.label(ctx, `${outAngle!.toFixed(1)}°`, cx + Math.sin(outRad) * 80 + 30, cy + Math.cos(outRad) * 80, { size: 12, color: D.COL.accent });
      // faint partial reflection
      D.wire(ctx, [[cx, cy], [cx + Math.sin(inRad) * 110, cy - Math.cos(inRad) * 110]], "rgba(246,178,107,0.25)", 2);
    }

    D.panel(ctx, 640, 250, 240, 110);
    D.label(ctx, "Snell's law", 760, 274, { color: D.COL.muted, size: 11 });
    D.label(ctx, `${n1.toFixed(1)}·sin ${angle}° = ${n2.toFixed(1)}·sin θ₂`, 760, 304, { size: 12, mono: true, color: D.COL.text });
    D.label(ctx, tir ? "sin θ₂ would exceed 1" : `θ₂ = ${outAngle!.toFixed(1)}°`, 760, 334, {
      size: 13,
      mono: true,
      bold: true,
      color: tir ? D.COL.bad : D.COL.accent,
    });

    D.meter(ctx, 20, 8, 200, "bending", direction === "in" ? "toward the normal" : tir ? "trapped" : "away from the normal", tir ? D.COL.bad : D.COL.accent);
    if (critical) D.meter(ctx, 230, 8, 200, "critical angle", `${critical.toFixed(1)}°`, D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={390} draw={draw} label="A light ray refracting at a glass boundary with Snell's law readout" />
      <Controls>
        <Slider label="Incoming angle" min={0} max={85} step={1} value={angle} onChange={setAngle} fmt={(v) => `${v}°`} />
        <Segmented
          label="Direction"
          options={[
            { value: "in", label: "air → glass" },
            { value: "out", label: "glass → air" },
          ]}
          value={direction}
          onChange={setDirection}
        />
      </Controls>
      <Readouts>
        <Readout label="Exit angle" value={tir ? "none — reflected" : `${outAngle!.toFixed(1)}°`} tone={tir ? "warn" : "good"} />
        <Readout label="Critical angle (glass→air)" value="41.8°" tone="amber" />
        <Readout label="Past it" value="the boundary becomes a perfect mirror — fibre optics" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 5.2 — The optical bench: object, lens, image — the lens equation
 * made draggable.
 * ===================================================================== */

export function LensLab() {
  const [objDist, setObjDist] = useState(30);
  const [focal, setFocal] = useState(10);

  const virtual = objDist <= focal;
  const imgDist = virtual ? null : 1 / (1 / focal - 1 / objDist);
  const magnification = imgDist ? imgDist / objDist : focal / (focal - objDist);

  const draw = (ctx: CanvasRenderingContext2D) => {
    const lx = 450;
    const axisY = 210;
    const scale = 7;

    // axis + lens
    D.wire(ctx, [[30, axisY], [870, axisY]], "#33445e", 1.5);
    ctx.strokeStyle = D.COL.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(lx, axisY, 10, 90, 0, 0, Math.PI * 2);
    ctx.stroke();

    // foci
    for (const s of [-1, 1]) {
      D.dot(ctx, lx + s * focal * scale, axisY, 4, D.COL.amber);
      D.label(ctx, "F", lx + s * focal * scale, axisY + 18, { size: 11, color: D.COL.amber });
    }

    // object (arrow up)
    const ox = lx - objDist * scale;
    const objH = 55;
    D.wire(ctx, [[ox, axisY], [ox, axisY - objH]], D.COL.good, 4);
    D.label(ctx, "object", ox, axisY - objH - 14, { size: 11, color: D.COL.good });

    if (imgDist) {
      const ix = lx + imgDist * scale;
      const imgH = objH * magnification;
      // principal rays
      D.wire(ctx, [[ox, axisY - objH], [lx, axisY - objH]], "rgba(255,255,255,0.35)", 1.5);
      D.wire(ctx, [[lx, axisY - objH], [ix, axisY + imgH]], "rgba(255,255,255,0.35)", 1.5);
      D.wire(ctx, [[ox, axisY - objH], [ix, axisY + imgH]], "rgba(255,255,255,0.35)", 1.5);
      // image (inverted)
      if (ix < 870) {
        D.wire(ctx, [[ix, axisY], [ix, axisY + imgH]], D.COL.bad, 4);
        D.label(ctx, "real image (inverted)", ix, axisY + imgH + 18, { size: 11, color: D.COL.bad });
      } else {
        D.label(ctx, "image beyond the bench →", 800, axisY - 60, { size: 11, color: D.COL.muted });
      }
    } else {
      // virtual image: back-projected, upright, enlarged
      const ix = lx - (focal * objDist) / (focal - objDist) * scale;
      const imgH = objH * Math.abs(magnification);
      D.wire(ctx, [[ix, axisY], [ix, axisY - imgH]], "rgba(242,109,109,0.5)", 4);
      D.label(ctx, "virtual image — a magnifying glass", ix, axisY - imgH - 14, { size: 11, color: D.COL.bad });
      D.wire(ctx, [[ox, axisY - objH], [lx, axisY - objH]], "rgba(255,255,255,0.35)", 1.5);
      ctx.setLineDash([4, 6]);
      D.wire(ctx, [[lx, axisY - objH], [ix, axisY - imgH]], "rgba(242,109,109,0.4)", 1.5);
      ctx.setLineDash([]);
    }

    D.meter(ctx, 20, 8, 180, "object distance", `${objDist} cm`, D.COL.good);
    D.meter(ctx, 210, 8, 180, "focal length", `${focal} cm`, D.COL.amber);
    D.meter(ctx, 400, 8, 200, "image distance", imgDist ? `${imgDist.toFixed(1)} cm` : "virtual", imgDist ? D.COL.bad : D.COL.muted);
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} label="An optical bench with object, converging lens and image" />
      <Controls>
        <Slider label="Object distance" min={5} max={55} step={1} value={objDist} onChange={setObjDist} fmt={(v) => `${v} cm`} />
        <Slider label="Focal length" min={5} max={25} step={1} value={focal} onChange={setFocal} fmt={(v) => `${v} cm`} />
      </Controls>
      <Readouts>
        <Readout label="1/f = 1/d₀ + 1/dᵢ" value={imgDist ? `dᵢ = ${imgDist.toFixed(1)} cm` : "no real image"} tone="amber" />
        <Readout label="Image" value={virtual ? "virtual, upright, enlarged" : "real, inverted"} tone={virtual ? "warn" : "good"} />
        <Readout label="Magnification" value={`${Math.abs(magnification).toFixed(2)}×`} />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 5.3 — The prism bench: dispersion fans white light out, and a
 * wavelength slider walks the whole electromagnetic keyboard.
 * ===================================================================== */

const BANDS: Array<{ from: number; label: string }> = [
  { from: 1e-1, label: "radio" },
  { from: 1e-3, label: "microwave" },
  { from: 7e-7, label: "infrared" },
  { from: 4e-7, label: "visible" },
  { from: 1e-8, label: "ultraviolet" },
  { from: 1e-11, label: "X-ray" },
  { from: 0, label: "gamma" },
];

export function SpectrumLab() {
  const [logLambda, setLogLambda] = useState(-6.3); // log10 of wavelength in metres

  const lambda = Math.pow(10, logLambda);
  const band = BANDS.find((b) => lambda >= b.from) ?? BANDS[BANDS.length - 1];
  const freq = 3e8 / lambda;
  const visible = lambda >= 4e-7 && lambda <= 7e-7;
  const scatterRel = Math.pow(5.5e-7 / lambda, 4); // vs green light

  const draw = (ctx: CanvasRenderingContext2D) => {
    // prism + fan
    const pxc = 220;
    const pyc = 150;
    ctx.strokeStyle = "#8b97a7";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pxc - 50, pyc + 55);
    ctx.lineTo(pxc, pyc - 55);
    ctx.lineTo(pxc + 50, pyc + 55);
    ctx.closePath();
    ctx.stroke();
    D.wire(ctx, [[60, pyc - 10], [pxc - 26, pyc - 10]], "#ffffff", 3);
    const colors = ["#ff4d4d", "#ff9a3d", "#ffe14d", "#59d96b", "#4dc3ff", "#4d6bff", "#a44dff"];
    colors.forEach((c, i) => {
      const spread = (i - 3) * 9;
      D.wire(ctx, [[pxc + 8, pyc], [pxc + 250, pyc + 34 + spread]], c, 3);
    });
    D.label(ctx, "violet bends hardest", pxc + 190, pyc + 96, { size: 10, color: "#a44dff" });
    D.label(ctx, "dispersion: n depends slightly on λ", pxc + 60, pyc - 80, { size: 11, color: D.COL.muted });

    // the EM keyboard
    const kx = 60;
    const ky = 290;
    const kw = 780;
    D.panel(ctx, kx - 10, ky - 26, kw + 20, 86, "#0a1420");
    // log scale from 1e3 (radio) down to 1e-13 (gamma): logLambda 3 .. -13
    const mapX = (ll: number) => kx + ((3 - ll) / 16) * kw;
    const bandEdges: Array<[number, string]> = [
      [-1, "radio"],
      [-3, "µwave"],
      [Math.log10(7e-7), "IR"],
      [Math.log10(4e-7), "UV"],
      [-8, "X-ray"],
      [-11, "gamma"],
    ];
    bandEdges.forEach(([ll]) => {
      D.wire(ctx, [[mapX(ll), ky - 12], [mapX(ll), ky + 30]], "rgba(139,151,167,0.4)", 1);
    });
    const names: Array<[number, string]> = [
      [1, "radio"],
      [-2, "microwave"],
      [-4.6, "IR"],
      [-7.5, "UV"],
      [-9.5, "X-ray"],
      [-12, "gamma"],
    ];
    names.forEach(([ll, name]) => {
      if (name) D.label(ctx, name, mapX(ll), ky + 44, { size: 10, color: D.COL.muted });
    });
    // visible sliver, coloured
    const vx1 = mapX(Math.log10(7e-7));
    const vx2 = mapX(Math.log10(4e-7));
    const grad = ctx.createLinearGradient(vx1, 0, vx2, 0);
    ["#ff4d4d", "#ffe14d", "#59d96b", "#4dc3ff", "#a44dff"].forEach((c, i, arr) => grad.addColorStop(i / (arr.length - 1), c));
    ctx.fillStyle = grad;
    ctx.fillRect(vx1, ky - 12, vx2 - vx1, 42);

    // marker
    const mx = clamp(mapX(logLambda), kx, kx + kw);
    D.wire(ctx, [[mx, ky - 22], [mx, ky + 34]], "#ffffff", 2);
    D.label(ctx, "▼", mx, ky - 30, { size: 11, color: "#ffffff" });

    D.meter(ctx, 620, 40, 250, "wavelength", lambda >= 1 ? `${lambda.toFixed(0)} m` : lambda >= 1e-3 ? `${(lambda * 1000).toFixed(1)} mm` : lambda >= 1e-6 ? `${(lambda * 1e6).toFixed(2)} µm` : `${(lambda * 1e9).toFixed(0)} nm`, D.COL.accent);
    D.meter(ctx, 620, 90, 250, "frequency", `${freq.toExponential(1).replace("e+", " × 10^")} Hz`, D.COL.amber);
    D.meter(ctx, 620, 140, 250, "band", band.label, visible ? D.COL.good : D.COL.muted);
    D.meter(ctx, 620, 190, 250, "sky-scattering vs green", `${scatterRel >= 100 ? "≫" : "×"}${Math.min(scatterRel, 999).toFixed(1)}`, D.COL.accent);
  };

  return (
    <>
      <SimCanvas width={900} height={370} draw={draw} label="A prism dispersing white light above the full electromagnetic spectrum" />
      <Controls>
        <Slider label="Wavelength (log scale)" min={-12.5} max={2.5} step={0.05} value={logLambda} onChange={setLogLambda} fmt={(v) => `10^${v.toFixed(1)} m`} />
      </Controls>
      <Readouts>
        <Readout label="Band" value={band.label} tone={visible ? "good" : undefined} />
        <Readout label="Visible?" value={visible ? "yes — one octave of the keyboard" : "invisible to eyes, real all the same"} tone={visible ? "good" : "amber"} />
        <Readout label="Same wave, same c" value="radio to gamma" />
      </Readouts>
    </>
  );
}
