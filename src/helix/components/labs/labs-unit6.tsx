"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Slider } from "@/helix/components/controls";
import { clamp } from "@/helix/lib/sim/helpers";
import { tl as translate } from "@/helix/lib/labStrings";
import * as D from "@/helix/lib/sim/draw";

/* =====================================================================
 * Lab 6.1 — The energy pyramid: about a tenth survives each step, which
 * is why food chains are short and top predators are rare.
 * ===================================================================== */

export function EnergyPyramidLab() {
  const [efficiency, setEfficiency] = useState(10);
  const [input, setInput] = useState(100000);

  const levels = [
    { name: "producers", emoji: "🌿" },
    { name: "primary consumers", emoji: "🐛" },
    { name: "secondary consumers", emoji: "🐦" },
    { name: "tertiary consumers", emoji: "🦅" },
  ];
  const energies = levels.map((_, i) => input * Math.pow(efficiency / 100, i));

  const draw = (ctx: CanvasRenderingContext2D) => {
    const cx = 330;
    const top = 80;
    const levelH = 68;
    const maxW = 420;

    levels.forEach((lvl, i) => {
      const y = top + (levels.length - 1 - i) * levelH;
      const frac = Math.max(0.06, Math.pow(efficiency / 100, i) ** 0.42);
      const w = maxW * frac;
      ctx.fillStyle = `rgba(45,212,191,${0.18 + i * 0.16})`;
      ctx.fillRect(cx - w / 2, y, w, levelH - 8);
      ctx.strokeStyle = "#33445e";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(cx - w / 2, y, w, levelH - 8);
      D.label(ctx, `${lvl.emoji} ${translate(lvl.name)}`, cx, y + 22, { size: 13, bold: true });
      D.label(ctx, `${Math.round(energies[i]).toLocaleString("en-GB")} kJ`, cx, y + 44, {
        size: 12,
        mono: true,
        color: D.COL.amber,
      });

      // what was lost getting here
      if (i > 0) {
        const lost = energies[i - 1] - energies[i];
        D.label(
          ctx,
          `↓ ${Math.round((1 - efficiency / 100) * 100)}% lost — ${Math.round(lost).toLocaleString("en-GB")} kJ`,
          cx + maxW / 2 + 40,
          y + levelH - 4,
          { align: "left", size: 11, color: D.COL.bad }
        );
      }
    });

    D.label(ctx, "☀ sunlight", cx, top + levels.length * levelH + 10, {
      color: "#fde68a",
      size: 12,
    });

    // where the energy goes
    D.panel(ctx, 620, 300, 260, 108);
    D.label(ctx, "where the rest goes", 750, 324, { color: D.COL.muted, size: 11 });
    const losses = ["respiration (heat)", "undigested waste", "parts never eaten"];
    losses.forEach((l, i) => {
      D.label(ctx, `• ${l}`, 646, 348 + i * 20, { align: "left", size: 12, color: D.COL.text });
    });

    D.meter(ctx, 20, 14, 200, "Transfer efficiency", `${efficiency} %`, D.COL.accent);
    D.meter(ctx, 230, 14, 250, "top level gets", `${Math.round(energies[3]).toLocaleString("en-GB")} kJ`, D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={430} draw={draw} label="An energy pyramid across four trophic levels" />
      <Controls>
        <Slider
          label="Transfer efficiency"
          min={2}
          max={25}
          step={1}
          value={efficiency}
          onChange={setEfficiency}
          fmt={(v) => `${v} %`}
        />
        <Slider
          label="Sunlight captured"
          min={10000}
          max={200000}
          step={10000}
          value={input}
          onChange={setInput}
          fmt={(v) => `${(v / 1000).toFixed(0)}k kJ`}
        />
      </Controls>
      <Readouts>
        <Readout label="Producers" value={`${Math.round(energies[0]).toLocaleString("en-GB")} kJ`} />
        <Readout label="Top predators" value={`${Math.round(energies[3]).toLocaleString("en-GB")} kJ`} tone="warn" />
        <Readout label="Reaching level 4" value={`${((energies[3] / energies[0]) * 100).toFixed(2)} %`} tone="amber" />
        <Readout label="Why chains are short" value="too little energy left" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 6.2 — Population growth: exponential until the environment says
 * no, then a slow approach to carrying capacity.
 * ===================================================================== */

export function PopulationLab() {
  const [rate, setRate] = useState(0.5);
  const [capacity, setCapacity] = useState(600);
  const [mode, setMode] = useState<"logistic" | "exponential">("logistic");

  const series = (() => {
    const out: number[] = [10];
    for (let t = 1; t <= 60; t++) {
      const n = out[t - 1];
      const growth = mode === "logistic" ? rate * n * (1 - n / capacity) : rate * n;
      out.push(clamp(n + growth, 0, 5000));
    }
    return out;
  })();
  const final = series[series.length - 1];

  const draw = (ctx: CanvasRenderingContext2D) => {
    const gx = 80;
    const gy = 70;
    const gw = 620;
    const gh = 280;
    D.panel(ctx, gx, gy, gw, gh, "#0a1420");

    const yMax = mode === "logistic" ? capacity * 1.25 : 1200;
    const mapY = (v: number) => gy + gh - (v / yMax) * gh;

    // carrying capacity line
    if (mode === "logistic") {
      const ky = mapY(capacity);
      ctx.setLineDash([7, 5]);
      D.wire(ctx, [[gx, ky], [gx + gw, ky]], "rgba(246,178,107,0.8)", 2);
      ctx.setLineDash([]);
      D.label(ctx, `K = ${capacity}`, gx + gw - 8, ky - 12, {
        align: "right",
        color: D.COL.amber,
        size: 12,
      });
      D.label(ctx, translate("Carrying capacity"), gx + gw - 8, ky + 16, {
        align: "right",
        color: D.COL.muted,
        size: 11,
      });
    }

    ctx.strokeStyle = D.COL.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    series.forEach((v, i) => {
      const x = gx + (i / (series.length - 1)) * gw;
      const y = mapY(v);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    D.label(ctx, translate("Time") + " →", gx + gw / 2, gy + gh + 22, { color: D.COL.muted, size: 11 });
    ctx.save();
    ctx.translate(gx - 20, gy + gh / 2);
    ctx.rotate(-Math.PI / 2);
    D.label(ctx, translate("Population"), 0, 0, { color: D.COL.muted, size: 11 });
    ctx.restore();

    if (mode === "exponential") {
      D.label(ctx, "no environment is unlimited — this curve is a fiction after a while", gx + gw / 2, gy + 26, {
        color: D.COL.bad,
        size: 12,
      });
    }

    // phases
    D.panel(ctx, 730, 70, 150, 280);
    const phases = [
      ["lag", "slow start, few breeders"],
      ["exponential", "resources plentiful"],
      ["slowing", "competition bites"],
      ["plateau", "births ≈ deaths"],
    ];
    D.label(ctx, "phases", 805, 94, { color: D.COL.muted, size: 11 });
    phases.forEach(([name, note], i) => {
      D.label(ctx, name, 805, 126 + i * 56, { size: 13, bold: true, color: D.COL.accent });
      D.label(ctx, note, 805, 146 + i * 56, { size: 10, color: D.COL.muted });
    });

    D.meter(ctx, 20, 14, 190, "Growth rate", rate.toFixed(2), D.COL.accent);
    D.meter(ctx, 220, 14, 200, "final population", String(Math.round(final)), D.COL.good);
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} label="A population growth curve approaching carrying capacity" />
      <Controls>
        <div className="ctl-row">
          <label>Model</label>
          <div className="seg">
            {(["logistic", "exponential"] as const).map((m) => (
              <button
                key={m}
                type="button"
                className={`seg-btn${mode === m ? " active" : ""}`}
                onClick={() => setMode(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <Slider label="Growth rate" min={0.05} max={1} step={0.05} value={rate} onChange={setRate} fmt={(v) => v.toFixed(2)} />
        <Slider
          label="Carrying capacity"
          min={100}
          max={1000}
          step={50}
          value={capacity}
          onChange={setCapacity}
          fmt={(v) => String(v)}
        />
      </Controls>
      <Readouts>
        <Readout label="Model" value={mode} tone="amber" />
        <Readout label="Final population" value={Math.round(final)} tone="good" />
        <Readout label="Carrying capacity" value={mode === "logistic" ? capacity : "none — unbounded"} />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 6.3 — Digital twin of the yeast balloon: sugar in, CO₂ out, and a
 * balloon whose size you can predict before you run it.
 * ===================================================================== */

export function FermentationLab() {
  const [sugar, setSugar] = useState(10);
  const [temp, setTemp] = useState(35);
  const [minutes, setMinutes] = useState(30);

  // C6H12O6 -> 2 C2H5OH + 2 CO2 : 1 mol glucose (180 g) gives 2 mol CO2
  const molGlucose = sugar / 180.16;
  const molCo2 = molGlucose * 2;
  const maxVolume = molCo2 * 24.0; // litres at room temperature
  // temperature response: yeast dies above ~50 C, sluggish when cold
  const tempFactor = temp > 45 ? Math.max(0, 1 - (temp - 45) / 10) : Math.exp(-(((temp - 35) / 16) ** 2));
  const progress = 1 - Math.exp((-minutes / 45) * tempFactor * 2.2);
  const volume = maxVolume * progress;
  const balloonR = clamp(Math.cbrt(volume) * 46, 8, 120);

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const bx = 220;
    const by = 250;

    // the bottle
    ctx.strokeStyle = D.COL.glass;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(bx - 55, by + 110);
    ctx.lineTo(bx - 55, by);
    ctx.lineTo(bx - 16, by - 46);
    ctx.lineTo(bx - 16, by - 74);
    ctx.moveTo(bx + 55, by + 110);
    ctx.lineTo(bx + 55, by);
    ctx.lineTo(bx + 16, by - 46);
    ctx.lineTo(bx + 16, by - 74);
    ctx.moveTo(bx - 55, by + 110);
    ctx.lineTo(bx + 55, by + 110);
    ctx.stroke();

    // the sugary water
    ctx.fillStyle = "rgba(246,178,107,0.30)";
    ctx.fillRect(bx - 52, by + 20, 104, 88);
    // bubbles rising, faster when the reaction is going
    const bubbles = Math.round(tempFactor * 14);
    for (let i = 0; i < bubbles; i++) {
      const p = ((t * 0.7 + i * 0.21) % 1);
      D.ring(ctx, bx - 40 + ((i * 29) % 80), by + 108 - p * 88, 2 + p * 2.5, "rgba(255,255,255,0.7)", 1.4);
    }

    // the balloon
    ctx.beginPath();
    ctx.ellipse(bx, by - 74 - balloonR * 0.85, balloonR * 0.85, balloonR, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(242,109,109,0.35)";
    ctx.fill();
    ctx.strokeStyle = "#f26d6d";
    ctx.lineWidth = 2.5;
    ctx.stroke();
    D.label(ctx, "CO₂", bx, by - 74 - balloonR * 0.85, { size: 14, bold: true, color: "#ffd9d9" });

    if (temp > 45) {
      D.label(ctx, "too hot — the yeast is dying", bx, by + 150, { color: D.COL.bad, size: 13, bold: true });
    } else if (temp < 15) {
      D.label(ctx, "too cold — the yeast is barely working", bx, by + 150, {
        color: D.COL.amber,
        size: 13,
      });
    }

    // the stoichiometry panel
    const px = 460;
    D.panel(ctx, px, 70, 420, 300);
    D.label(ctx, "C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂", px + 210, 100, {
      size: 15,
      mono: true,
      color: D.COL.accent,
    });
    const rows: Array<[string, string]> = [
      ["sugar", `${sugar.toFixed(1)} g`],
      ["moles of glucose", `${molGlucose.toFixed(4)} mol`],
      ["moles of CO₂ (×2)", `${molCo2.toFixed(4)} mol`],
      ["maximum volume", `${maxVolume.toFixed(2)} L`],
      ["reached so far", `${volume.toFixed(2)} L`],
    ];
    rows.forEach(([k, v], i) => {
      const y = 140 + i * 34;
      D.label(ctx, k, px + 30, y, { align: "left", size: 12, color: D.COL.muted });
      D.label(ctx, v, px + 390, y, { align: "right", size: 13, mono: true, color: i === 4 ? D.COL.good : D.COL.text });
    });
    D.barGauge(ctx, px + 30, 318, 360, 20, progress, D.COL.good, `${Math.round(progress * 100)}% of the way`);

    D.meter(ctx, 20, 14, 180, "Temperature", `${temp} °C`, temp > 45 ? D.COL.bad : D.COL.accent);
    D.meter(ctx, 210, 14, 180, "balloon", `${volume.toFixed(2)} L`, D.COL.good);
  };

  return (
    <>
      <SimCanvas width={900} height={430} draw={draw} label="A bottle of yeast and sugar inflating a balloon with carbon dioxide" />
      <Controls>
        <Slider label="Sugar" min={2} max={40} step={1} value={sugar} onChange={setSugar} fmt={(v) => `${v} g`} />
        <Slider label="Temperature" min={5} max={60} step={1} value={temp} onChange={setTemp} fmt={(v) => `${v} °C`} />
        <Slider label="Time" min={0} max={120} step={5} value={minutes} onChange={setMinutes} fmt={(v) => `${v} min`} />
      </Controls>
      <Readouts>
        <Readout label="Max CO₂" value={`${maxVolume.toFixed(2)} L`} tone="amber" />
        <Readout label="Balloon now" value={`${volume.toFixed(2)} L`} tone="good" />
        <Readout label="Yeast" value={temp > 45 ? "dying" : temp < 15 ? "sluggish" : "happy"} tone={temp > 45 ? "warn" : "good"} />
        <Readout label="Also produced" value="ethanol" />
      </Readouts>
    </>
  );
}
