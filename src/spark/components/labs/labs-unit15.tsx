"use client";

import { useEffect, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented } from "@/spark/components/controls";
import { clamp } from "@/spark/lib/sim/helpers";
import * as D from "@/spark/lib/sim/draw";

/* =====================================================================
 * Lab 15.1 — Tolerance Monte Carlo: build 800 dividers, measure them all
 * ===================================================================== */

const TOLS = [0.01, 0.05, 0.1];
const N_BUILD = 800;
const SPEC_LO = 4.365; // 4.5 V ± 3%
const SPEC_HI = 4.635;

function buildBatch(tol: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < N_BUILD; i++) {
    const r1 = 10000 * (1 + (Math.random() * 2 - 1) * tol);
    const r2 = 10000 * (1 + (Math.random() * 2 - 1) * tol);
    out.push((9 * r2) / (r1 + r2));
  }
  return out;
}

export function MonteCarloLab() {
  const [tolIdx, setTolIdx] = useState(1);
  const [batch, setBatch] = useState<number[]>([]);

  useEffect(() => {
    setBatch(buildBatch(TOLS[tolIdx]));
  }, [tolIdx]);

  const mean = batch.length ? batch.reduce((a, b) => a + b, 0) / batch.length : 0;
  const lo = batch.length ? Math.min(...batch) : 0;
  const hi = batch.length ? Math.max(...batch) : 0;
  const pass = batch.filter((v) => v >= SPEC_LO && v <= SPEC_HI).length;
  const yieldPct = batch.length ? (pass / batch.length) * 100 : 0;

  const draw = (ctx: CanvasRenderingContext2D) => {
    const px = 40, py = 30, pw = 820, ph = 250;
    const vMin = 3.9, vMax = 5.1;
    const bins = 60;
    const counts = new Array(bins).fill(0);
    for (const v of batch) {
      const b = clamp(Math.floor(((v - vMin) / (vMax - vMin)) * bins), 0, bins - 1);
      counts[b]++;
    }
    const peak = Math.max(1, ...counts);

    ctx.fillStyle = "#0b1119";
    ctx.fillRect(px, py, pw, ph);
    ctx.strokeStyle = "#33445e";
    ctx.strokeRect(px, py, pw, ph);
    D.label(ctx, `${N_BUILD} dividers built with ±${TOLS[tolIdx] * 100}% resistors — the spread of “4.5 V”`, px + pw / 2, py + 16, {
      color: D.COL.accent,
      size: 13,
      bold: true,
    });

    const vx = (v: number) => px + ((v - vMin) / (vMax - vMin)) * pw;
    for (let b = 0; b < bins; b++) {
      const v = vMin + ((b + 0.5) / bins) * (vMax - vMin);
      const inSpec = v >= SPEC_LO && v <= SPEC_HI;
      const h = (counts[b] / peak) * (ph - 50);
      ctx.fillStyle = inSpec ? D.COL.good : D.COL.bad;
      ctx.fillRect(px + (b / bins) * pw + 1, py + ph - 8 - h, pw / bins - 2, h);
    }
    for (const [v, name] of [[SPEC_LO, "spec min"], [SPEC_HI, "spec max"]] as const) {
      ctx.setLineDash([5, 5]);
      D.wire(ctx, [[vx(v), py + 24], [vx(v), py + ph - 6]], "rgba(246,178,107,0.7)", 1.5);
      ctx.setLineDash([]);
      D.label(ctx, `${name} ${v.toFixed(2)} V`, vx(v), py + ph + 14, { color: D.COL.amber, size: 10 });
    }
    D.label(ctx, "3.9 V", px + 20, py + ph + 14, { color: D.COL.muted, size: 10 });
    D.label(ctx, "5.1 V", px + pw - 20, py + ph + 14, { color: D.COL.muted, size: 10 });

    D.meter(ctx, 40, 310, 150, "mean of the batch", `${mean.toFixed(3)} V`, D.COL.accent);
    D.meter(ctx, 205, 310, 170, "worst units", `${lo.toFixed(2)} … ${hi.toFixed(2)} V`, D.COL.muted);
    D.meter(
      ctx,
      390,
      310,
      170,
      "yield vs ±3% spec",
      `${yieldPct.toFixed(1)} %`,
      yieldPct > 99 ? D.COL.good : yieldPct > 85 ? D.COL.amber : D.COL.bad
    );
    D.meter(
      ctx,
      575,
      310,
      290,
      "cost of failure",
      `${(batch.length - pass)} of ${N_BUILD} boards rejected`,
      pass === batch.length ? D.COL.good : D.COL.bad
    );
  };

  return (
    <>
      <SimCanvas width={900} height={370} draw={draw} />
      <Controls>
        <Segmented
          label="Resistor tolerance"
          value={String(tolIdx)}
          onChange={(v) => setTolIdx(Number(v))}
          options={TOLS.map((t, i) => ({ value: String(i), label: `±${t * 100}%${t === 0.05 ? " (gold band)" : t === 0.1 ? " (silver)" : " (brown)"}` }))}
        />
        <div className="ctl-row">
          <label>Production line</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={() => setBatch(buildBatch(TOLS[tolIdx]))}>
              🏭 Build another {N_BUILD} units
            </button>
          </div>
        </div>
      </Controls>
      <Readouts>
        <Readout
          label="The engineering lesson"
          value="one prototype working proves nothing — designs must work across the whole tolerance cloud"
          tone="amber"
        />
        <Readout label="Try this" value="At ±10%, what fraction of production would you scrap? Now you know why precision parts cost more." />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 15.2 — The fault finder: probe a broken blinker, name the culprit
 * ===================================================================== */

interface ProbeNode {
  id: string;
  label: string;
  x: number;
  y: number;
}
const NODES: ProbeNode[] = [
  { id: "rail+", label: "battery +", x: 70, y: 50 },
  { id: "pin8", label: "555 pin 8 (VCC)", x: 330, y: 95 },
  { id: "pin4", label: "555 pin 4 (RESET)", x: 415, y: 95 },
  { id: "pin7", label: "R1/R2 junction (pin 7)", x: 150, y: 145 },
  { id: "pin26", label: "cap node (pins 2+6)", x: 150, y: 225 },
  { id: "pin3", label: "555 pin 3 (OUT)", x: 500, y: 175 },
  { id: "ledA", label: "LED anode", x: 645, y: 175 },
  { id: "rail-", label: "− rail", x: 70, y: 320 },
];

type LedMode = "blink" | "fastblink" | "on" | "off";

interface Fault {
  name: string;
  symptom: string;
  led: LedMode;
  readings: Record<string, string>;
  explain: string;
}

const NORMAL: Record<string, string> = {
  "rail+": "9.0 V steady",
  pin8: "9.0 V steady",
  pin4: "9.0 V steady",
  pin7: "pulsing (follows the cap)",
  pin26: "sawtooth 3 → 6 V, ~1.5 Hz",
  pin3: "square 0 ↔ 9 V, ~1.5 Hz",
  ledA: "pulsing 0 ↔ 1.9 V",
  "rail-": "0.0 V",
};

const FAULTS: Fault[] = [
  {
    name: "Dead battery",
    symptom: "LED completely dark",
    led: "off",
    readings: { ...NORMAL, "rail+": "0.4 V and sagging", pin8: "0.4 V", pin4: "0.4 V", pin7: "0.3 V", pin26: "0.2 V", pin3: "0.0 V", ledA: "0.0 V" },
    explain: "Everything is dead because nothing is fed: the + rail itself reads near zero. Always check power first!",
  },
  {
    name: "LED inserted backwards",
    symptom: "LED completely dark",
    led: "off",
    readings: { ...NORMAL, ledA: "square 0 ↔ 9 V — the FULL swing" },
    explain:
      "The oscillator is fine — but with no current flowing, the reversed LED never clamps its anode to ~1.9 V, so the node swings the full 9 V. A dark LED with a healthy, full-swing anode is the fingerprint of reversal.",
  },
  {
    name: "Wrong R2: 470 Ω instead of 47 kΩ",
    symptom: "LED looks dimly ON all the time",
    led: "fastblink",
    readings: { ...NORMAL, pin26: "sawtooth 3 → 6 V but ~74 Hz — far too fast", pin3: "square, ~74 Hz", ledA: "pulsing 0 ↔ 1.9 V, ~74 Hz" },
    explain:
      "Yellow·violet·brown is 470 Ω, not 47 kΩ (yellow·violet·orange)! The timing resistance R1+2R2 shrank ~50×, so it blinks at ~74 Hz — beyond flicker fusion, which your eye reads as 'dimly on'.",
  },
  {
    name: "Timing capacitor shorted",
    symptom: "LED stuck fully ON",
    led: "on",
    readings: { ...NORMAL, pin26: "0.0 V, dead flat", pin7: "≈8.8 V steady (R1/R2 divider into the shorted node)", pin3: "9.0 V steady", ledA: "1.9 V steady" },
    explain:
      "The cap node is nailed to 0 V — below ⅓ Vcc forever, so TRIG holds the output high, the discharge transistor stays off, and pin 7 just sits at the R1/R2 divider. A flat 0 V where a sawtooth should be means the cap (or its wiring) is shorted.",
  },
  {
    name: "Pin 4 (RESET) wired to the − rail",
    symptom: "LED completely dark",
    led: "off",
    readings: { ...NORMAL, pin4: "0.0 V — aha!", pin3: "0.0 V steady", pin26: "0.1 V (discharge held on)", pin7: "0.1 V", ledA: "0.0 V" },
    explain:
      "RESET active (low) freezes the whole chip: output low, capacitor drained. One probe on pin 4 cracks the case — 0 V where 9 V belongs.",
  },
  {
    name: "Pin 6 → pin 2 jumper missing",
    symptom: "LED stuck fully ON",
    led: "on",
    readings: { ...NORMAL, pin26: "8.9 V steady — charged to the top", pin7: "8.9 V", pin3: "9.0 V steady", ledA: "1.9 V steady" },
    explain:
      "With the threshold pin never seeing the capacitor, nothing tells the output to flip low. C charges right past ⅔ Vcc to the rail and everything freezes high. Compare with the shorted cap: same symptom, opposite voltage!",
  },
  {
    name: "LED series resistor broken (open)",
    symptom: "LED completely dark",
    led: "off",
    readings: { ...NORMAL, ledA: "0.0 V — nothing arrives" },
    explain:
      "The oscillator hums along (pin 3 swings), but the LED branch is severed: its anode floats at 0. Healthy source + dead branch = break in between.",
  },
];

export function FaultFinderLab() {
  const [faultIdx, setFaultIdx] = useState(0);
  const [lastProbe, setLastProbe] = useState<ProbeNode | null>(null);
  const [probeCount, setProbeCount] = useState(0);
  const [solved, setSolved] = useState(false);
  const [wrong, setWrong] = useState(0);
  const [score, setScore] = useState({ solved: 0, probes: 0 });

  useEffect(() => {
    setFaultIdx(Math.floor(Math.random() * FAULTS.length));
  }, []);

  const fault = FAULTS[faultIdx];

  const newFault = () => {
    let next = Math.floor(Math.random() * FAULTS.length);
    if (next === faultIdx) next = (next + 1) % FAULTS.length;
    setFaultIdx(next);
    setLastProbe(null);
    setProbeCount(0);
    setWrong(0);
    setSolved(false);
  };

  const guess = (i: number) => {
    if (solved) return;
    if (i === faultIdx) {
      setSolved(true);
      setScore((s) => ({ solved: s.solved + 1, probes: s.probes + probeCount }));
    } else {
      setWrong((w) => w + 1);
    }
  };

  const draw = (ctx: CanvasRenderingContext2D, dt: number, t: number) => {
    // simplified blinker schematic
    D.label(ctx, "+9 V", 70, 30, { color: D.COL.bad, size: 13, bold: true });
    D.wire(ctx, [[70, 40], [70, 60], [150, 60], [150, 70]]);
    D.resistor(ctx, 150, 70, 150, 140, { label: "R1 1 k" });
    D.node(ctx, 150, 145);
    D.resistor(ctx, 150, 150, 150, 220, { label: "R2 47 k" });
    D.node(ctx, 150, 225);
    D.capacitor(ctx, 150, 225, 150, 295, { polarized: true, label: "C 10 µF" });
    D.wire(ctx, [[150, 295], [150, 320], [70, 320]]);
    D.ground(ctx, 70, 322);
    D.icBox(ctx, 300, 110, 150, 130, "555");
    D.wire(ctx, [[150, 145], [230, 145], [230, 160], [300, 160]]);
    D.wire(ctx, [[150, 225], [230, 225], [230, 200], [300, 200]]);
    D.wire(ctx, [[330, 60], [330, 110]]);
    D.wire(ctx, [[70, 60], [415, 60], [415, 110]]);
    D.wire(ctx, [[450, 175], [530, 175]]);
    D.resistor(ctx, 530, 175, 630, 175, { label: "470 Ω" });

    // LED with behaviour from the active fault
    const blinkOn =
      fault.led === "on" ? 1 :
      fault.led === "off" ? 0 :
      fault.led === "blink" ? (Math.sin(t * 2 * Math.PI * 1.5) > 0 ? 1 : 0) :
      0.35; // fastblink: looks dim
    D.led(ctx, 660, 175, 730, 175, { on: blinkOn, color: "#f26d6d" });
    D.wire(ctx, [[730, 175], [760, 175]]);
    D.ground(ctx, 760, 177);

    // probe points
    for (const n of NODES) {
      const active = lastProbe?.id === n.id;
      D.glow(ctx, n.x, n.y, 14, D.COL.accent, active ? 0.8 : 0.25);
      D.dot(ctx, n.x, n.y, 6, active ? D.COL.accent : "#2e5b73");
    }
    D.label(ctx, "click any glowing node to probe it", 620, 320, { color: "rgba(148,163,179,0.6)", size: 12 });

    // multimeter
    D.meter(
      ctx,
      520,
      40,
      350,
      lastProbe ? `probe: ${lastProbe.label}` : "multimeter — no probe attached",
      lastProbe ? fault.readings[lastProbe.id] : "—",
      lastProbe ? D.COL.amber : D.COL.muted
    );
    D.meter(ctx, 520, 250, 350, "what you observe", fault.symptom, D.COL.accent);
  };

  return (
    <>
      <SimCanvas
        width={900}
        height={350}
        draw={draw}
        onClick={(p) => {
          for (const n of NODES) {
            if (Math.hypot(p.x - n.x, p.y - n.y) < 20) {
              setLastProbe(n);
              if (!solved) setProbeCount((c) => c + 1);
            }
          }
        }}
      />
      <Controls>
        <div className="ctl-row">
          <label>Your diagnosis</label>
          <div className="seg">
            {FAULTS.map((f, i) => (
              <button
                key={f.name}
                type="button"
                className={`seg-btn${solved && i === faultIdx ? " active" : ""}`}
                onClick={() => guess(i)}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
        <div className="ctl-row">
          <label>Case file</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={newFault}>
              🔧 New broken board
            </button>
          </div>
        </div>
      </Controls>
      <Readouts>
        {solved ? (
          <Readout label={`✓ Solved in ${probeCount} probes${wrong ? ` (${wrong} wrong guesses)` : ""}`} value={fault.explain} tone="good" />
        ) : (
          <Readout
            label={`Investigating — ${probeCount} probes so far${wrong ? `, ${wrong} wrong guesses` : ""}`}
            value="strategy: symptom first, then power rails, then split the circuit in half with each probe"
            tone="amber"
          />
        )}
        <Readout label="Career score" value={`${score.solved} boards fixed · ${score.solved ? (score.probes / score.solved).toFixed(1) : "—"} probes per fix (masters average under 3)`} />
      </Readouts>
    </>
  );
}
