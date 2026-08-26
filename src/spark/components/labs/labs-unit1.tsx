"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, PickSlider, Readout, Readouts, Segmented, Select, Slider } from "@/spark/components/controls";
import { clamp, e12Range, fmtSI, polyPath, Flow } from "@/spark/lib/sim/helpers";
import * as D from "@/spark/lib/sim/draw";

/* =====================================================================
 * Lab 1.1 — Your first circuit: a loop you can break (or abuse)
 * ===================================================================== */

type CircuitMode = "normal" | "open" | "short";

const LOOP_NORMAL: Array<[number, number]> = [
  [180, 150], [180, 80], [760, 80], [760, 340], [180, 340], [180, 270], [180, 150],
];
const LOOP_SHORT: Array<[number, number]> = [
  [180, 150], [180, 80], [620, 80], [620, 340], [180, 340], [180, 270], [180, 150],
];

export function FirstCircuitLab() {
  const [mode, setMode] = useState<CircuitMode>("normal");
  const sim = useRef({
    flowNormal: new Flow(polyPath(LOOP_NORMAL), 30),
    flowShort: new Flow(polyPath(LOOP_SHORT), 24),
  });

  const V = 9;
  const current = mode === "normal" ? V / 90 : mode === "short" ? V / 0.5 : 0;

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;

    // wires of the main loop
    D.wire(ctx, [[180, 150], [180, 80], [400, 80]]);
    D.wire(ctx, [[500, 80], [760, 80], [760, 186]]);
    D.wire(ctx, [[760, 234], [760, 340], [180, 340], [180, 270]]);

    // battery (left, + at top)
    D.battery(ctx, 180, 270, 180, 150, { label: "9 V" });
    if (mode === "short") {
      D.glow(ctx, 180, 210, 70, D.COL.bad, 0.35 + 0.25 * Math.sin(performance.now() / 120));
      D.label(ctx, "⚠ battery overheating!", 180, 320, { color: D.COL.bad, size: 13, bold: true });
    }

    // switch (top) — click to toggle
    D.switchSym(ctx, 400, 80, 500, 80, mode !== "open", { label: "switch (click it!)" });

    // lamp (right)
    const brightness = mode === "normal" ? 1 : 0;
    D.lamp(ctx, 760, 210, 24, brightness);
    D.label(ctx, "lamp (90 Ω)", 810, 250, { color: D.COL.muted, size: 12 });

    // short-circuit wire
    if (mode === "short") {
      D.wire(ctx, [[620, 80], [620, 340]], D.COL.bad, 3);
      D.label(ctx, "short!", 645, 210, { color: D.COL.bad, size: 13, bold: true });
    }

    // current dots
    if (current > 0) {
      const flow = mode === "short" ? s.flowShort : s.flowNormal;
      const speed = mode === "short" ? 420 : 70;
      flow.step(dt, speed);
      flow.forEachDot((p) => D.dot(ctx, p.x, p.y, 4, mode === "short" ? D.COL.bad : D.COL.amber));
    }

    // meters
    D.meter(ctx, 320, 150, 130, "battery voltage", "9.0 V");
    D.meter(
      ctx,
      320,
      205,
      130,
      "current",
      current === 0 ? "0 A" : fmtSI(current, "A"),
      mode === "short" ? D.COL.bad : mode === "normal" ? D.COL.amber : D.COL.muted
    );
    D.meter(
      ctx,
      320,
      260,
      130,
      "lamp power",
      mode === "normal" ? "0.9 W" : "0 W",
      mode === "normal" ? D.COL.good : D.COL.muted
    );
  };

  return (
    <>
      <SimCanvas
        width={900}
        height={400}
        draw={draw}
        onClick={(p) => {
          if (Math.abs(p.x - 450) < 60 && Math.abs(p.y - 80) < 45) {
            setMode((m) => (m === "open" ? "normal" : "open"));
          }
        }}
      />
      <Controls>
        <Segmented<CircuitMode>
          label="Circuit state"
          value={mode}
          onChange={setMode}
          options={[
            { value: "normal", label: "Normal" },
            { value: "open", label: "Open switch" },
            { value: "short", label: "Short circuit ⚠" },
          ]}
        />
      </Controls>
      <Readouts>
        <Readout
          label="What's happening"
          value={
            mode === "normal"
              ? "Closed loop — charge circulates, lamp glows"
              : mode === "open"
                ? "Loop broken — current stops everywhere at once"
                : "Load bypassed — only the battery's tiny internal resistance limits the current"
          }
          tone={mode === "short" ? "warn" : mode === "normal" ? "good" : undefined}
        />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 1.2 — Ohm's law: V, I, R live on one loop
 * ===================================================================== */

const OHM_R_VALUES = e12Range(10, 10000);

export function OhmsLawLab() {
  const [volts, setVolts] = useState(9);
  const [rIdx, setRIdx] = useState(OHM_R_VALUES.indexOf(470));
  const sim = useRef({
    flow: new Flow(
      polyPath([
        [180, 150], [180, 80], [760, 80], [760, 340], [180, 340], [180, 270], [180, 150],
      ]),
      30
    ),
  });

  const ohms = OHM_R_VALUES[rIdx];
  const amps = volts / ohms;

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    D.wire(ctx, [[180, 150], [180, 80], [380, 80]]);
    D.wire(ctx, [[560, 80], [760, 80], [760, 340], [180, 340], [180, 270]]);
    D.battery(ctx, 180, 270, 180, 150, { label: `${volts.toFixed(1)} V` });
    D.resistor(ctx, 380, 80, 560, 80, { label: `R = ${fmtSI(ohms, "Ω")}` });

    if (amps > 0) {
      const speed = clamp(20 + 40 * Math.log10(amps / 0.001), 6, 260);
      sim.current.flow.step(dt, speed);
      sim.current.flow.forEachDot((p) => D.dot(ctx, p.x, p.y, 4, D.COL.amber));
    }

    // live bar meters
    const bars: Array<[string, number, number, string, string]> = [
      ["V", volts / 12, 12, `${volts.toFixed(1)} V`, D.COL.bad],
      ["I", clamp(amps / 1.2, 0, 1), 1.2, fmtSI(amps, "A"), D.COL.amber],
      ["R", Math.log10(ohms / 10) / 3, 10000, fmtSI(ohms, "Ω"), D.COL.accent],
    ];
    bars.forEach(([name, frac, , text, color], i) => {
      const x = 330 + i * 110;
      const h = 140;
      const y0 = 260;
      ctx.fillStyle = "#101825";
      ctx.strokeStyle = "#33445e";
      ctx.beginPath();
      ctx.roundRect(x, y0 - h, 34, h, 5);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = color as string;
      const bh = clamp(frac as number, 0.02, 1) * (h - 6);
      ctx.beginPath();
      ctx.roundRect(x + 3, y0 - 3 - bh, 28, bh, 3);
      ctx.fill();
      D.label(ctx, name as string, x + 17, y0 - h - 16, { color: color as string, size: 15, bold: true });
      D.label(ctx, text as string, x + 17, y0 + 18, { color: D.COL.muted, size: 12, mono: true });
    });
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} />
      <Controls>
        <Slider label="Voltage V" min={0} max={12} step={0.1} value={volts} onChange={setVolts} fmt={(v) => `${v.toFixed(1)} V`} />
        <PickSlider label="Resistance R" values={OHM_R_VALUES} index={rIdx} onChange={setRIdx} fmt={(v) => fmtSI(v, "Ω")} />
      </Controls>
      <Readouts>
        <Readout label="Current  I = V / R" value={fmtSI(amps, "A")} tone="amber" />
        <Readout
          label="Ohm's law, live"
          value={`${volts.toFixed(1)} V = ${fmtSI(amps, "A")} × ${fmtSI(ohms, "Ω")}`}
        />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 1.3 — Resistor colour-code decoder
 * ===================================================================== */

const DIGIT_COLORS: Array<{ name: string; hex: string }> = [
  { name: "Black", hex: "#1c1c1c" },
  { name: "Brown", hex: "#7a4a21" },
  { name: "Red", hex: "#d94040" },
  { name: "Orange", hex: "#ef8420" },
  { name: "Yellow", hex: "#e8cf3a" },
  { name: "Green", hex: "#3fae4c" },
  { name: "Blue", hex: "#3f6fdb" },
  { name: "Violet", hex: "#8e4ae0" },
  { name: "Grey", hex: "#999999" },
  { name: "White", hex: "#f2f2f2" },
];
const TOLERANCES = [
  { name: "Gold (±5%)", hex: "#cfa53a", pct: 5 },
  { name: "Silver (±10%)", hex: "#c0c0c0", pct: 10 },
  { name: "Brown (±1%)", hex: "#7a4a21", pct: 1 },
];

export function ResistorCodeLab() {
  const [b1, setB1] = useState(4); // yellow
  const [b2, setB2] = useState(7); // violet
  const [b3, setB3] = useState(2); // red multiplier => 4.7k
  const [tol, setTol] = useState(0);
  const [hidden, setHidden] = useState(false);

  const value = (b1 * 10 + b2) * Math.pow(10, b3);

  const draw = (ctx: CanvasRenderingContext2D) => {
    // leads
    D.wire(ctx, [[100, 140], [280, 140]], D.COL.wire, 4);
    D.wire(ctx, [[620, 140], [800, 140]], D.COL.wire, 4);
    // body
    ctx.fillStyle = "#c9a876";
    ctx.strokeStyle = "#8a7350";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(280, 96, 340, 88, 40);
    ctx.fill();
    ctx.stroke();
    // bands
    const bands = [
      { x: 320, hex: DIGIT_COLORS[b1].hex },
      { x: 385, hex: DIGIT_COLORS[b2].hex },
      { x: 450, hex: DIGIT_COLORS[b3].hex },
      { x: 560, hex: TOLERANCES[tol].hex },
    ];
    for (const b of bands) {
      ctx.fillStyle = b.hex;
      ctx.fillRect(b.x, 96, 26, 88);
    }
    ctx.strokeStyle = "#8a7350";
    ctx.beginPath();
    ctx.roundRect(280, 96, 340, 88, 40);
    ctx.stroke();

    D.label(ctx, "1st digit", 333, 220, { color: D.COL.muted, size: 11 });
    D.label(ctx, "2nd digit", 398, 220, { color: D.COL.muted, size: 11 });
    D.label(ctx, "multiplier", 463, 220, { color: D.COL.muted, size: 11 });
    D.label(ctx, "tolerance", 573, 220, { color: D.COL.muted, size: 11 });

    D.meter(
      ctx,
      330,
      20,
      240,
      "resistor value",
      hidden ? "??? — decode me!" : `${fmtSI(value, "Ω")}  ±${TOLERANCES[tol].pct}%`,
      hidden ? D.COL.muted : D.COL.amber
    );
  };

  const randomize = () => {
    setB1(1 + Math.floor(Math.random() * 9));
    setB2(Math.floor(Math.random() * 10));
    setB3(Math.floor(Math.random() * 6));
    setTol(Math.floor(Math.random() * TOLERANCES.length));
    setHidden(true);
  };

  const digitOptions = DIGIT_COLORS.map((c, i) => ({ value: String(i), label: `${c.name} (${i})` }));

  return (
    <>
      <SimCanvas width={900} height={250} draw={draw} />
      <Controls>
        <Select label="Band 1 (1st digit)" options={digitOptions} value={String(b1)} onChange={(v) => { setB1(Number(v)); setHidden(false); }} />
        <Select label="Band 2 (2nd digit)" options={digitOptions} value={String(b2)} onChange={(v) => { setB2(Number(v)); setHidden(false); }} />
        <Select
          label="Band 3 (multiplier)"
          options={DIGIT_COLORS.map((c, i) => ({ value: String(i), label: `${c.name} (×10${["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"][i]})` }))}
          value={String(b3)}
          onChange={(v) => { setB3(Number(v)); setHidden(false); }}
        />
        <Select
          label="Band 4 (tolerance)"
          options={TOLERANCES.map((t, i) => ({ value: String(i), label: t.name }))}
          value={String(tol)}
          onChange={(v) => { setTol(Number(v)); setHidden(false); }}
        />
        <div className="ctl-row">
          <label>Practice</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={randomize}>
              🎲 Random resistor
            </button>
            <button type="button" className="seg-btn" onClick={() => setHidden(false)} disabled={!hidden}>
              👁 Reveal value
            </button>
          </div>
        </div>
      </Controls>
    </>
  );
}

/* =====================================================================
 * Lab 1.4 — Power: brightness, heat and your electricity bill
 * ===================================================================== */

const HEAT_R_VALUES = e12Range(47, 10000);

export function PowerLab() {
  const [volts, setVolts] = useState(6);
  const [amps, setAmps] = useState(0.5);
  const [rIdx, setRIdx] = useState(HEAT_R_VALUES.indexOf(330));
  const [hours, setHours] = useState(4);
  const [price, setPrice] = useState(0.3);

  const watts = volts * amps;
  const ohms = HEAT_R_VALUES[rIdx];
  const rWatts = (volts * volts) / ohms;
  const rating = 0.25;
  const monthly = ((watts * hours * 30) / 1000) * price;

  const draw = (ctx: CanvasRenderingContext2D) => {
    // left: bulb brightness = P
    D.lamp(ctx, 220, 150, 40, clamp(watts / 24, 0, 1));
    D.label(ctx, "P = V × I", 220, 235, { color: D.COL.muted, size: 13 });
    D.meter(ctx, 140, 260, 160, "power", fmtSI(watts, "W"), D.COL.amber);

    // right: resistor heat check at voltage V
    const frac = rWatts / rating;
    const heat = clamp(frac, 0, 1.6);
    const heatColor = frac < 0.5 ? D.COL.good : frac < 1 ? D.COL.amber : D.COL.bad;
    if (heat > 0.05) D.glow(ctx, 640, 150, 60 + heat * 30, heatColor, clamp(heat * 0.5, 0, 0.85));
    D.resistor(ctx, 520, 150, 760, 150, { label: `${fmtSI(ohms, "Ω")} across ${volts.toFixed(1)} V` });
    if (frac > 1) {
      D.label(ctx, "🔥 over its ¼ W rating!", 640, 100, { color: D.COL.bad, size: 14, bold: true });
    }
    D.meter(ctx, 480, 260, 160, "resistor power V²/R", fmtSI(rWatts, "W"), heatColor);
    // rating bar
    const bx = 660, bw = 180;
    ctx.fillStyle = "#101825";
    ctx.strokeStyle = "#33445e";
    ctx.beginPath();
    ctx.roundRect(bx, 268, bw, 22, 5);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = heatColor;
    ctx.beginPath();
    ctx.roundRect(bx + 2, 270, clamp(frac, 0.01, 1) * (bw - 4), 18, 4);
    ctx.fill();
    D.label(ctx, `¼ W rating: ${Math.round(frac * 100)}% used`, bx + bw / 2, 304, { color: D.COL.muted, size: 11 });
  };

  return (
    <>
      <SimCanvas width={900} height={320} draw={draw} />
      <Controls>
        <Slider label="Voltage V" min={0} max={12} step={0.1} value={volts} onChange={setVolts} fmt={(v) => `${v.toFixed(1)} V`} />
        <Slider label="Current I (bulb)" min={0} max={2} step={0.01} value={amps} onChange={setAmps} fmt={(v) => fmtSI(v, "A")} />
        <PickSlider label="Heat-check resistor" values={HEAT_R_VALUES} index={rIdx} onChange={setRIdx} fmt={(v) => fmtSI(v, "Ω")} />
        <Slider label="Bulb on per day" min={1} max={24} step={1} value={hours} onChange={setHours} fmt={(v) => `${v} h`} />
        <Slider label="Electricity price" min={0.1} max={0.6} step={0.01} value={price} onChange={setPrice} fmt={(v) => `$${v.toFixed(2)}/kWh`} />
      </Controls>
      <Readouts>
        <Readout label="Power P = V × I" value={fmtSI(watts, "W")} tone="amber" />
        <Readout label="Energy per day" value={fmtSI(watts * hours * 3600, "J") + ` (${((watts * hours) / 1000).toFixed(3)} kWh)`} />
        <Readout label="Cost per month" value={`$${monthly.toFixed(2)}`} tone={monthly > 5 ? "warn" : "good"} />
        <Readout
          label="Resistor verdict"
          value={rWatts > rating ? "TOO HOT — use a bigger R or higher rating" : rWatts > rating * 0.5 ? "warm — fine, but close" : "cool — plenty of margin"}
          tone={rWatts > rating ? "warn" : rWatts > rating * 0.5 ? "amber" : "good"}
        />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 1.5 — Series vs parallel
 * ===================================================================== */

const SP_VALUES = e12Range(100, 4700);
const BRANCH_X = [380, 560, 740];

export function SeriesParallelLab() {
  const [mode, setMode] = useState<"series" | "parallel">("series");
  const [idx, setIdx] = useState<[number, number, number]>([
    SP_VALUES.indexOf(100),
    SP_VALUES.indexOf(220),
    SP_VALUES.indexOf(470),
  ]);
  const sim = useRef({
    seriesFlow: new Flow(
      polyPath([
        [180, 150], [180, 80], [820, 80], [820, 340], [180, 340], [180, 270], [180, 150],
      ]),
      30
    ),
    branchFlows: BRANCH_X.map(
      (x) =>
        new Flow(
          polyPath([
            [180, 150], [180, 80], [x, 80], [x, 340], [180, 340], [180, 270], [180, 150],
          ]),
          30
        )
    ),
  });

  const V = 9;
  const r = [SP_VALUES[idx[0]], SP_VALUES[idx[1]], SP_VALUES[idx[2]]];
  const rEq = mode === "series" ? r[0] + r[1] + r[2] : 1 / (1 / r[0] + 1 / r[1] + 1 / r[2]);
  const iTot = V / rEq;
  const branchI = r.map((ri) => (mode === "series" ? iTot : V / ri));
  const branchV = r.map((ri, i) => (mode === "series" ? iTot * ri : V));

  const speedFor = (i: number) => clamp(2500 * i, 8, 300);

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    D.battery(ctx, 180, 270, 180, 150, { label: "9 V" });

    if (mode === "series") {
      D.wire(ctx, [[180, 150], [180, 80], [240, 80]]);
      D.wire(ctx, [[360, 80], [420, 80]]);
      D.wire(ctx, [[540, 80], [600, 80]]);
      D.wire(ctx, [[720, 80], [820, 80], [820, 340], [180, 340], [180, 270]]);
      D.resistor(ctx, 240, 80, 360, 80, { label: `R₁ ${fmtSI(r[0], "Ω")}` });
      D.resistor(ctx, 420, 80, 540, 80, { label: `R₂ ${fmtSI(r[1], "Ω")}` });
      D.resistor(ctx, 600, 80, 720, 80, { label: `R₃ ${fmtSI(r[2], "Ω")}` });
      [300, 480, 660].forEach((x, i) => {
        D.label(ctx, `${fmtSI(branchV[i], "V", 2)}`, x, 132, { color: D.COL.amber, size: 12, mono: true });
      });
      s.seriesFlow.step(dt, speedFor(iTot));
      s.seriesFlow.forEachDot((p) => D.dot(ctx, p.x, p.y, 4, D.COL.amber));
      D.label(ctx, "same current everywhere — voltages share the 9 V", 500, 380, { color: D.COL.muted, size: 12 });
    } else {
      D.wire(ctx, [[180, 150], [180, 80], [740, 80]]);
      D.wire(ctx, [[740, 340], [180, 340], [180, 270]]);
      BRANCH_X.forEach((x, i) => {
        D.wire(ctx, [[x, 80], [x, 140]]);
        D.wire(ctx, [[x, 280], [x, 340]]);
        D.resistor(ctx, x, 140, x, 280, { label: `R${["₁", "₂", "₃"][i]} ${fmtSI(r[i], "Ω")}` });
        if (x !== 740) {
          D.node(ctx, x, 80);
          D.node(ctx, x, 340);
        }
        D.wire(ctx, [[BRANCH_X[0], 340], [740, 340]]);
        D.label(ctx, fmtSI(branchI[i], "A", 2), x + 34, 315, { color: D.COL.amber, size: 11, mono: true });
      });
      s.branchFlows.forEach((f, i) => {
        f.step(dt, speedFor(branchI[i]));
        f.forEachDot((p) => D.dot(ctx, p.x, p.y, 3.6, D.COL.amber));
      });
      D.label(ctx, "same 9 V across every branch — currents add up", 500, 380, { color: D.COL.muted, size: 12 });
    }

    D.meter(ctx, 205, 125, 125, "equivalent Rₑq", fmtSI(rEq, "Ω"), D.COL.accent);
    D.meter(ctx, 205, 180, 125, "total current", fmtSI(iTot, "A"), D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} />
      <Controls>
        <Segmented
          label="Topology"
          value={mode}
          onChange={setMode}
          options={[
            { value: "series", label: "Series (one path)" },
            { value: "parallel", label: "Parallel (three paths)" },
          ]}
        />
        {[0, 1, 2].map((i) => (
          <PickSlider
            key={i}
            label={`Resistor R${i + 1}`}
            values={SP_VALUES}
            index={idx[i]}
            onChange={(ni) =>
              setIdx((old) => {
                const next = [...old] as [number, number, number];
                next[i] = ni;
                return next;
              })
            }
            fmt={(v) => fmtSI(v, "Ω")}
          />
        ))}
      </Controls>
      <div className="lab-body" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>R₁</th>
              <th>R₂</th>
              <th>R₃</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Voltage across</td>
              {branchV.map((v, i) => (
                <td key={i}>{fmtSI(v, "V", 2)}</td>
              ))}
              <td>{V} V</td>
            </tr>
            <tr>
              <td>Current through</td>
              {branchI.map((iv, i) => (
                <td key={i}>{fmtSI(iv, "A", 2)}</td>
              ))}
              <td>{fmtSI(iTot, "A", 2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
