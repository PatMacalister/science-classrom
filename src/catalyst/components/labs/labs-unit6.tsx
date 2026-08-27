"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Slider, Segmented, Select, useTl } from "@/catalyst/components/controls";
import { clamp } from "@/catalyst/lib/sim/helpers";
import * as D from "@/catalyst/lib/sim/draw";

/* =====================================================================
 * Lab 6.1 — redox in a beaker: zinc in copper sulfate (and the reverse)
 * ===================================================================== */

export function RedoxLab() {
  const tl = useTl();
  const [setup, setSetup] = useState<"zn-cu" | "cu-zn">("zn-cu");
  const [running, setRunning] = useState<"paused" | "running">("running");
  const progress = useRef(0);

  const reacts = setup === "zn-cu";

  const draw = (ctx: CanvasRenderingContext2D, dt: number, t: number) => {
    if (running === "running" && reacts) {
      progress.current = clamp(progress.current + dt * 0.06, 0, 1);
    }
    const p = reacts ? progress.current : 0;

    // beaker with solution: blue CuSO₄ fading as Cu²⁺ leaves (zn-cu), colorless ZnSO₄ otherwise
    const blue = reacts ? 0.55 * (1 - p) + 0.05 : setup === "cu-zn" ? 0.06 : 0.55;
    D.beaker(ctx, 180, 90, 280, 300, 0.8, `rgba(70, 130, 240, ${blue})`);
    D.label(ctx, reacts ? "CuSO₄ solution (blue = Cu²⁺)" : "ZnSO₄ solution (colorless)", 320, 410, { size: 12, color: D.COL.muted });

    // metal strip
    const stripX = 290;
    ctx.fillStyle = reacts ? "#b9c4cf" : "#d98c50";
    ctx.fillRect(stripX, 60, 60, 250);
    D.label(ctx, reacts ? "Zn strip" : "Cu strip", stripX + 30, 48, { size: 12, color: D.COL.text });
    // copper coating creeping up the zinc
    if (reacts && p > 0.02) {
      ctx.fillStyle = "#d98c50";
      const coatH = 190 * p;
      ctx.fillRect(stripX, 310 - coatH, 60, coatH);
      D.label(ctx, "Cu deposit", stripX + 30, 326, { size: 11, color: "#e8a56c" });
    }
    // strip thinning marker
    if (reacts && p > 0.3) {
      D.label(ctx, "Zn dissolving as Zn²⁺ →", 505, 200, { size: 12, color: D.COL.muted, align: "left" });
    }

    // drifting ions
    const cuIons = Math.round((1 - p) * 10);
    const znIons = reacts ? Math.round(p * 10) : 8;
    for (let i = 0; i < cuIons && reacts; i++) {
      const x = 210 + ((i * 47 + t * 13) % 220);
      const y = 180 + ((i * 71) % 180);
      D.dot(ctx, x, y, 5, "rgba(90, 140, 250, 0.9)");
      D.label(ctx, "Cu²⁺", x, y - 11, { size: 8.5, color: "rgba(120,160,250,0.8)" });
    }
    for (let i = 0; i < znIons; i++) {
      const x = 215 + ((i * 61 + t * 9) % 210);
      const y = 200 + ((i * 43) % 160);
      D.dot(ctx, x, y, 4, "rgba(200, 210, 220, 0.55)");
      D.label(ctx, "Zn²⁺", x, y - 10, { size: 8.5, color: "rgba(200,210,220,0.55)" });
    }

    // verdict panel
    D.panel(ctx, 560, 90, 310, 250, "#101825");
    if (reacts) {
      D.label(ctx, "Zn + Cu²⁺ → Zn²⁺ + Cu", 715, 122, { size: 15, mono: true, bold: true, color: D.COL.good });
      D.label(ctx, "Zn is oxidized (loses 2 e⁻)", 715, 156, { size: 12.5, color: D.COL.bad });
      D.label(ctx, "Cu²⁺ is reduced (gains 2 e⁻)", 715, 178, { size: 12.5, color: D.COL.accent });
      D.label(ctx, "zinc is the LESS noble metal:", 715, 218, { size: 12, color: D.COL.muted });
      D.label(ctx, "it gives electrons away first", 715, 236, { size: 12, color: D.COL.muted });
      D.label(ctx, `blue fading: ${(p * 100).toFixed(0)} % reacted`, 715, 276, { size: 12.5, mono: true, color: D.COL.amber });
    } else {
      D.label(ctx, "Cu + Zn²⁺ → no reaction", 715, 122, { size: 15, mono: true, bold: true, color: D.COL.bad });
      D.label(ctx, "copper is MORE noble than zinc —", 715, 160, { size: 12.5, color: D.COL.muted });
      D.label(ctx, "it will not hand electrons to Zn²⁺", 715, 178, { size: 12.5, color: D.COL.muted });
      D.label(ctx, "redox has a one-way hierarchy:", 715, 218, { size: 12, color: D.COL.muted });
      D.label(ctx, "the activity series", 715, 236, { size: 12, color: D.COL.amber });
    }
  };

  return (
    <>
      <SimCanvas width={900} height={440} draw={draw} />
      <Controls>
        <Segmented
          label="Experiment"
          options={[
            { value: "zn-cu", label: "Zn strip in CuSO₄" },
            { value: "cu-zn", label: "Cu strip in ZnSO₄" },
          ]}
          value={setup}
          onChange={(v) => {
            setSetup(v);
            progress.current = 0;
          }}
        />
        <Segmented
          label="Time"
          options={[
            { value: "running", label: "run" },
            { value: "paused", label: "pause" },
          ]}
          value={running}
          onChange={setRunning}
        />
        <div className="ctl-row">
          <label>{tl("Reset")}</label>
          <div className="seg">
            <button
              type="button"
              className="seg-btn"
              onClick={() => {
                progress.current = 0;
              }}
            >
              {tl("Fresh beaker")}
            </button>
          </div>
        </div>
      </Controls>
    </>
  );
}

/* =====================================================================
 * Lab 6.2 — the galvanic cell: pick two metals, read the voltage
 * ===================================================================== */

interface Electrode {
  sym: string;
  name: string;
  e0: number;
  color: string;
}

const ELECTRODES: Electrode[] = [
  { sym: "Mg", name: "Magnesium", e0: -2.37, color: "#c9d4de" },
  { sym: "Zn", name: "Zinc", e0: -0.76, color: "#b9c4cf" },
  { sym: "Fe", name: "Iron", e0: -0.44, color: "#8f9aa5" },
  { sym: "Ni", name: "Nickel", e0: -0.26, color: "#a8b2ba" },
  { sym: "Cu", name: "Copper", e0: 0.34, color: "#d98c50" },
  { sym: "Ag", name: "Silver", e0: 0.8, color: "#e8eef4" },
];

export function GalvanicLab() {
  const tl = useTl();
  const [anodeSym, setAnodeSym] = useState("Zn");
  const [cathodeSym, setCathodeSym] = useState("Cu");

  const A = ELECTRODES.find((e) => e.sym === anodeSym)!;
  const C = ELECTRODES.find((e) => e.sym === cathodeSym)!;
  const voltage = C.e0 - A.e0;
  const flows = voltage > 0.01;

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    // two half-cells
    D.beaker(ctx, 120, 170, 200, 210, 0.75, "rgba(120,160,220,0.18)");
    D.beaker(ctx, 560, 170, 200, 210, 0.75, "rgba(120,160,220,0.18)");
    // electrodes
    ctx.fillStyle = A.color;
    ctx.fillRect(200, 120, 40, 210);
    ctx.fillStyle = C.color;
    ctx.fillRect(640, 120, 40, 210);
    D.label(ctx, `${A.sym} (anode −)`, 220, 108, { size: 12.5, color: D.COL.text });
    D.label(ctx, `${C.sym} (cathode +)`, 660, 108, { size: 12.5, color: D.COL.text });
    D.label(ctx, `E° = ${A.e0.toFixed(2)} V`, 220, 396, { size: 11.5, mono: true, color: D.COL.muted });
    D.label(ctx, `E° = ${C.e0.toFixed(2)} V`, 660, 396, { size: 11.5, mono: true, color: D.COL.muted });

    // salt bridge
    ctx.strokeStyle = "#7da2c1";
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(300, 230);
    ctx.quadraticCurveTo(440, 150, 580, 230);
    ctx.stroke();
    ctx.strokeStyle = "rgba(200,220,240,0.3)";
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(300, 230);
    ctx.quadraticCurveTo(440, 150, 580, 230);
    ctx.stroke();
    D.label(ctx, "salt bridge", 440, 160, { size: 11, color: D.COL.muted });

    // external wire with bulb
    D.wire(ctx, [[220, 120], [220, 50], [420, 50]], D.COL.muted, 2.5);
    D.wire(ctx, [[460, 50], [660, 50], [660, 120]], D.COL.muted, 2.5);
    const bright = flows ? clamp(voltage / 2.5, 0.1, 1) : 0;
    if (bright > 0) D.glow(ctx, 440, 50, 42, "#ffd98a", 0.2 + bright * 0.7);
    ctx.strokeStyle = bright > 0 ? "#ffd98a" : D.COL.muted;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(440, 50, 18, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(430, 40);
    ctx.lineTo(450, 60);
    ctx.moveTo(450, 40);
    ctx.lineTo(430, 60);
    ctx.stroke();

    // electrons marching along the wire (anode → cathode)
    if (flows) {
      // wire path: down-up-across-down, total length 60 + 440 + 60
      const total = 60 + 440 + 60;
      const speed = 60 + voltage * 60;
      for (let i = 0; i < 10; i++) {
        const s = (t * speed + i * (total / 10)) % total;
        let x = 0;
        let y = 0;
        if (s < 60) {
          x = 220;
          y = 110 - s;
        } else if (s < 500) {
          x = 220 + (s - 60);
          y = 50;
        } else {
          x = 660;
          y = 50 + (s - 500);
        }
        D.dot(ctx, x, y, 3.5, D.COL.accent);
      }
      D.label(ctx, "e⁻ →", 340, 34, { size: 12, bold: true, color: D.COL.accent });
    }

    D.meter(ctx, 320, 400, 240, "cell voltage E°(cell)", `${voltage.toFixed(2)} V`, flows ? D.COL.good : D.COL.bad);
    if (!flows) {
      D.label(ctx, voltage < 0 ? "negative voltage — swap the electrodes: electrons only flow downhill" : "same metal twice — no difference, no push", 440, 445, {
        size: 12.5,
        color: D.COL.bad,
      });
    } else {
      D.label(ctx, `${A.sym} → ${C.sym}: ${tl("electrons take the wire — chemistry become current")}`, 440, 445, {
        size: 12.5,
        color: D.COL.muted,
      });
    }
  };

  return (
    <>
      <SimCanvas width={900} height={470} draw={draw} />
      <Controls>
        <Select
          label="Anode metal (−)"
          value={anodeSym}
          onChange={setAnodeSym}
          options={ELECTRODES.map((e) => ({ value: e.sym, label: `${tl(e.name)} (E° = ${e.e0.toFixed(2)} V)` }))}
        />
        <Select
          label="Cathode metal (+)"
          value={cathodeSym}
          onChange={setCathodeSym}
          options={ELECTRODES.map((e) => ({ value: e.sym, label: `${tl(e.name)} (E° = ${e.e0.toFixed(2)} V)` }))}
        />
      </Controls>
    </>
  );
}

/* =====================================================================
 * Lab 6.3 — electrolysis of water: current forces the reverse reaction
 * ===================================================================== */

export function ElectrolysisLab() {
  const tl = useTl();
  const [volts, setVolts] = useState(0);
  const gas = useRef({ h2: 0, o2: 0 });

  const threshold = 1.8; // 1.23 V theoretical + overpotential
  const rate = Math.max(0, volts - threshold) * 0.05;

  const draw = (ctx: CanvasRenderingContext2D, dt: number, t: number) => {
    gas.current.h2 = clamp(gas.current.h2 + rate * 2 * dt, 0, 1);
    gas.current.o2 = clamp(gas.current.o2 + rate * dt, 0, 1);

    // trough of water
    D.beaker(ctx, 150, 180, 460, 200, 0.85, "rgba(100, 160, 220, 0.25)");
    D.label(ctx, "water + a pinch of salt (to conduct)", 380, 400, { size: 11.5, color: D.COL.muted });

    // two inverted test tubes collecting gas
    D.tube(ctx, 250, 120, 60, 200, 1 - gas.current.h2, "rgba(100,160,220,0.35)");
    D.tube(ctx, 450, 120, 60, 200, 1 - gas.current.o2, "rgba(100,160,220,0.35)");
    D.label(ctx, "H₂", 280, 104, { size: 14, bold: true, color: D.COL.accent });
    D.label(ctx, "O₂", 480, 104, { size: 14, bold: true, color: D.COL.bad });
    // gas volume markers
    D.label(ctx, `${(gas.current.h2 * 20).toFixed(1)} mL`, 280, 340, { size: 11, mono: true, color: D.COL.accent });
    D.label(ctx, `${(gas.current.o2 * 20).toFixed(1)} mL`, 480, 340, { size: 11, mono: true, color: D.COL.bad });

    // electrodes + bubbles
    for (const [x, col, r] of [
      [280, D.COL.minus, rate * 2],
      [480, D.COL.plus, rate],
    ] as const) {
      ctx.fillStyle = "#5a6b7d";
      ctx.fillRect(x - 5, 240, 10, 130);
      if (r > 0) {
        for (let i = 0; i < 8; i++) {
          const phase = (t * (0.4 + r * 5) + i / 8) % 1;
          const by = 360 - phase * 105;
          const bx = x + Math.sin(t * 6 + i * 2.4) * 8;
          D.ring(ctx, bx, by, 2 + phase * 2.5, col === D.COL.minus ? "rgba(76,201,240,0.7)" : "rgba(242,109,109,0.7)", 1);
        }
      }
    }
    D.label(ctx, "cathode −", 280, 384, { size: 11, color: D.COL.minus });
    D.label(ctx, "anode +", 480, 384, { size: 11, color: D.COL.plus });

    // power supply
    D.panel(ctx, 660, 130, 200, 180, "#101825");
    D.label(ctx, "power supply", 760, 158, { size: 12, color: D.COL.muted });
    D.label(ctx, `${volts.toFixed(1)} V`, 760, 196, { size: 28, mono: true, bold: true, color: volts >= threshold ? D.COL.good : D.COL.muted });
    D.label(ctx, volts < threshold ? `below ${threshold.toFixed(1)} V: nothing happens` : "splitting water!", 760, 236, {
      size: 12,
      color: volts < threshold ? D.COL.muted : D.COL.good,
    });
    D.label(ctx, "2 H₂O → 2 H₂ + O₂", 760, 272, { size: 13, mono: true, color: volts >= threshold ? D.COL.amber : "rgba(148,163,179,0.4)" });
    D.wire(ctx, [[660, 200], [285, 200], [285, 240]], D.COL.minus, 2);
    D.wire(ctx, [[660, 250], [610, 250], [610, 210], [475, 210], [475, 240]], D.COL.plus, 2);

    const ratio = gas.current.o2 > 0.01 ? gas.current.h2 / gas.current.o2 : 0;
    D.meter(ctx, 150, 20, 210, "gas ratio H₂ : O₂", ratio > 0 ? `${ratio.toFixed(2)} : 1` : "—", Math.abs(ratio - 2) < 0.15 && ratio > 0 ? D.COL.good : D.COL.muted);
    D.meter(ctx, 375, 20, 235, "why 2 : 1?", "H₂O has 2 H per O", D.COL.violet);
  };

  return (
    <>
      <SimCanvas width={900} height={430} draw={draw} />
      <Controls>
        <Slider label="Voltage" min={0} max={5} step={0.1} value={volts} onChange={setVolts} fmt={(v) => `${v.toFixed(1)} V`} />
        <div className="ctl-row">
          <label>{tl("Tubes")}</label>
          <div className="seg">
            <button
              type="button"
              className="seg-btn"
              onClick={() => {
                gas.current = { h2: 0, o2: 0 };
              }}
            >
              {tl("Empty the tubes")}
            </button>
          </div>
        </div>
      </Controls>
    </>
  );
}

/* =====================================================================
 * Lab 6.4 — the lemon battery: cells in series light an LED
 * ===================================================================== */

export function LemonLab() {
  const [cells, setCells] = useState(1);

  const vCell = 0.9; // Zn/Cu in citric acid
  const rCellK = 10; // internal resistance per lemon, kΩ
  const vLed = 1.9; // red LED forward voltage
  const vTotal = cells * vCell;
  const currentMa = Math.max(0, (vTotal - vLed) / (cells * rCellK)); // mA (V / kΩ)
  const lit = currentMa > 0.001;
  const brightness = clamp(currentMa / 0.15, 0, 1);

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const y = 250;
    const spacing = Math.min(150, 680 / cells);
    const x0 = 450 - ((cells - 1) * spacing) / 2;

    // wire through everything
    D.wire(ctx, [[x0 - 70, y], [x0 - 70, 100], [370, 100]], D.COL.muted, 2);
    D.wire(ctx, [[530, 100], [x0 + (cells - 1) * spacing + 70, 100], [x0 + (cells - 1) * spacing + 70, y]], D.COL.muted, 2);

    for (let i = 0; i < cells; i++) {
      const x = x0 + i * spacing;
      // lemon
      ctx.fillStyle = "#e8c93e";
      ctx.beginPath();
      ctx.ellipse(x, y, 62, 42, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.beginPath();
      ctx.ellipse(x - 18, y - 12, 16, 9, -0.5, 0, Math.PI * 2);
      ctx.fill();
      // electrodes: zinc screw (−) and copper coin (+)
      ctx.fillStyle = "#b9c4cf";
      ctx.fillRect(x - 34, y - 58, 9, 42);
      D.label(ctx, "Zn", x - 30, y - 66, { size: 10, color: "#b9c4cf" });
      ctx.fillStyle = "#d98c50";
      ctx.fillRect(x + 24, y - 58, 9, 42);
      D.label(ctx, "Cu", x + 28, y - 66, { size: 10, color: "#d98c50" });
      // series links
      if (i > 0) D.wire(ctx, [[x - spacing + 28, y - 45], [x - 30, y - 45]], D.COL.muted, 2);
    }
    // connect first Zn and last Cu into the loop
    D.wire(ctx, [[x0 - 70, y], [x0 - 30, y - 40]], D.COL.muted, 2);
    D.wire(ctx, [[x0 + (cells - 1) * spacing + 28, y - 45], [x0 + (cells - 1) * spacing + 70, y]], D.COL.muted, 2);

    // LED
    if (lit) D.glow(ctx, 450, 100, 40 + brightness * 40, D.COL.bad, 0.25 + brightness * 0.65);
    ctx.fillStyle = lit ? D.COL.bad : "#5a3a3a";
    ctx.beginPath();
    ctx.arc(450, 100, 16, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(434, 100, 32, 10);
    D.wire(ctx, [[370, 100], [434, 100]], D.COL.muted, 2);
    D.wire(ctx, [[466, 100], [530, 100]], D.COL.muted, 2);
    D.label(ctx, "red LED (needs ≈ 1.9 V)", 450, 140, { size: 11.5, color: D.COL.muted });

    // marching electrons when lit
    if (lit) {
      for (let i = 0; i < 8; i++) {
        const s = ((t * 80 + i * 50) % 380) - 190;
        D.dot(ctx, 450 + s, 100 - 14, 3, D.COL.accent);
      }
    }

    D.meter(ctx, 20, 14, 180, "total voltage", `${vTotal.toFixed(1)} V`, vTotal >= vLed ? D.COL.good : D.COL.bad);
    D.meter(ctx, 215, 14, 170, "current", `${(currentMa * 1000).toFixed(0)} µA`, lit ? D.COL.good : D.COL.muted);
    D.meter(
      ctx,
      400,
      14,
      280,
      "verdict",
      !lit ? `dark — ${cells} lemon${cells > 1 ? "s give" : " gives"} only ${vTotal.toFixed(1)} V` : brightness > 0.5 ? "glowing nicely!" : "a dim but honest glow",
      lit ? D.COL.good : D.COL.bad
    );
    D.label(ctx, "each lemon ≈ 0.9 V but with huge internal resistance — series stacking adds voltage, not muscle", 450, 350, {
      size: 12,
      color: D.COL.muted,
    });
  };

  return (
    <>
      <SimCanvas width={900} height={380} draw={draw} />
      <Controls>
        <Slider label="Lemons in series" min={1} max={6} step={1} value={cells} onChange={setCells} fmt={(v) => `${v} 🍋`} />
      </Controls>
    </>
  );
}
