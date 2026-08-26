"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider } from "@/spark/components/controls";
import { fmtSI, Scope } from "@/spark/lib/sim/helpers";
import * as D from "@/spark/lib/sim/draw";

/* =====================================================================
 * Lab 7.1 — Logic gates playground
 * ===================================================================== */

type GateName = "AND" | "OR" | "NOT" | "NAND" | "NOR" | "XOR";

const GATE_FN: Record<GateName, (a: boolean, b: boolean) => boolean> = {
  AND: (a, b) => a && b,
  OR: (a, b) => a || b,
  NOT: (a) => !a,
  NAND: (a, b) => !(a && b),
  NOR: (a, b) => !(a || b),
  XOR: (a, b) => a !== b,
};

function drawSwitch(ctx: CanvasRenderingContext2D, x: number, y: number, on: boolean, name: string) {
  ctx.fillStyle = "#101825";
  ctx.strokeStyle = on ? D.COL.good : "#33445e";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(x - 34, y - 17, 68, 34, 17);
  ctx.fill();
  ctx.stroke();
  D.dot(ctx, on ? x + 15 : x - 15, y, 11, on ? D.COL.good : "#5a6b7d");
  D.label(ctx, name, x - 52, y, { color: D.COL.muted, size: 14, bold: true });
  D.label(ctx, on ? "1" : "0", x + 52, y, { color: on ? D.COL.good : D.COL.muted, size: 15, bold: true, mono: true });
}

function drawGateBody(ctx: CanvasRenderingContext2D, gate: GateName, x: number, y: number) {
  ctx.strokeStyle = D.COL.text;
  ctx.lineWidth = 2.5;
  const bubble = (bx: number) => {
    ctx.beginPath();
    ctx.arc(bx + 7, y, 7, 0, Math.PI * 2);
    ctx.stroke();
  };
  if (gate === "AND" || gate === "NAND") {
    ctx.beginPath();
    ctx.moveTo(x, y - 38);
    ctx.lineTo(x + 42, y - 38);
    ctx.arc(x + 42, y, 38, -Math.PI / 2, Math.PI / 2);
    ctx.lineTo(x, y + 38);
    ctx.closePath();
    ctx.stroke();
    if (gate === "NAND") bubble(x + 80);
  } else if (gate === "OR" || gate === "NOR" || gate === "XOR") {
    ctx.beginPath();
    ctx.moveTo(x, y - 38);
    ctx.quadraticCurveTo(x + 58, y - 34, x + 84, y);
    ctx.quadraticCurveTo(x + 58, y + 34, x, y + 38);
    ctx.quadraticCurveTo(x + 20, y, x, y - 38);
    ctx.stroke();
    if (gate === "XOR") {
      ctx.beginPath();
      ctx.moveTo(x - 10, y - 38);
      ctx.quadraticCurveTo(x + 10, y, x - 10, y + 38);
      ctx.stroke();
    }
    if (gate === "NOR") bubble(x + 84);
  } else {
    ctx.beginPath();
    ctx.moveTo(x, y - 32);
    ctx.lineTo(x, y + 32);
    ctx.lineTo(x + 52, y);
    ctx.closePath();
    ctx.stroke();
    bubble(x + 52);
  }
}

export function GatesLab() {
  const [gate, setGate] = useState<GateName>("AND");
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);

  const twoInputs = gate !== "NOT";
  const out = GATE_FN[gate](a, b);

  const draw = (ctx: CanvasRenderingContext2D) => {
    const gx = 400, gy = 150;
    // input wires
    if (twoInputs) {
      D.wire(ctx, [[218, 100], [320, 100], [320, gy - 16], [gx + (gate === "AND" || gate === "NAND" ? 0 : 8), gy - 16]], a ? D.COL.good : "#3a4757", a ? 3 : 2);
      D.wire(ctx, [[218, 200], [320, 200], [320, gy + 16], [gx + (gate === "AND" || gate === "NAND" ? 0 : 8), gy + 16]], b ? D.COL.good : "#3a4757", b ? 3 : 2);
    } else {
      D.wire(ctx, [[218, 100], [320, 100], [320, gy], [gx, gy]], a ? D.COL.good : "#3a4757", a ? 3 : 2);
    }
    drawSwitch(ctx, 170, 100, a, "A");
    if (twoInputs) drawSwitch(ctx, 170, 200, b, "B");

    drawGateBody(ctx, gate, gx, gy);
    D.label(ctx, gate, gx + 38, gy + 62, { color: D.COL.accent, size: 14, bold: true });

    // output
    const outStart = gx + (gate === "NOT" ? 66 : gate === "AND" ? 80 : gate === "NAND" ? 94 : gate === "NOR" ? 98 : 84) + 2;
    D.wire(ctx, [[outStart, gy], [660, gy]], out ? D.COL.good : "#3a4757", out ? 3 : 2);
    D.glow(ctx, 700, gy, 40, D.COL.good, out ? 0.8 : 0);
    D.dot(ctx, 700, gy, 17, out ? D.COL.good : "#2a3646");
    D.label(ctx, out ? "1" : "0", 700, gy + 1, { color: out ? "#0b0f14" : D.COL.muted, size: 15, bold: true, mono: true });
    D.label(ctx, "output", 700, gy + 40, { color: D.COL.muted, size: 12 });
    D.label(ctx, "click the switches!", 170, 260, { color: "rgba(148,163,179,0.6)", size: 12 });
  };

  const combos: Array<[boolean, boolean]> = twoInputs
    ? [
        [false, false],
        [false, true],
        [true, false],
        [true, true],
      ]
    : [
        [false, false],
        [true, false],
      ];

  return (
    <>
      <SimCanvas
        width={900}
        height={290}
        draw={draw}
        onClick={(p) => {
          if (Math.hypot(p.x - 170, p.y - 100) < 45) setA((v) => !v);
          else if (twoInputs && Math.hypot(p.x - 170, p.y - 200) < 45) setB((v) => !v);
        }}
      />
      <Controls>
        <Segmented<GateName>
          label="Gate"
          value={gate}
          onChange={setGate}
          options={(["AND", "OR", "NOT", "NAND", "NOR", "XOR"] as GateName[]).map((g) => ({ value: g, label: g }))}
        />
      </Controls>
      <table>
        <thead>
          <tr>
            <th>A</th>
            {twoInputs ? <th>B</th> : null}
            <th>{gate} output</th>
          </tr>
        </thead>
        <tbody>
          {combos.map(([ca, cb], i) => {
            const active = ca === a && (!twoInputs || cb === b);
            return (
              <tr key={i} style={active ? { outline: "2px solid var(--accent)" } : undefined}>
                <td>{ca ? 1 : 0}</td>
                {twoInputs ? <td>{cb ? 1 : 0}</td> : null}
                <td style={{ color: GATE_FN[gate](ca, cb) ? "var(--good)" : "var(--muted)", fontWeight: 600 }}>
                  {GATE_FN[gate](ca, cb) ? 1 : 0}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

/* =====================================================================
 * Lab 7.2 — A 4-bit ripple-carry adder
 * ===================================================================== */

export function AdderLab() {
  // bit arrays, index 0 = LSB
  const [aBits, setABits] = useState([1, 0, 1, 0]); // 5
  const [bBits, setBBits] = useState([1, 1, 0, 0]); // 3

  const toDec = (bits: number[]) => bits.reduce((acc, bit, i) => acc + bit * (1 << i), 0);
  const aDec = toDec(aBits);
  const bDec = toDec(bBits);

  // ripple-carry
  const sum: number[] = [];
  const carries: number[] = [0];
  let carry = 0;
  for (let i = 0; i < 4; i++) {
    const s = aBits[i] ^ bBits[i] ^ carry;
    carry = (aBits[i] & bBits[i]) | (carry & (aBits[i] ^ bBits[i]));
    sum.push(s);
    carries.push(carry);
  }

  const colX = (i: number) => 640 - i * 100; // LSB on the right, like written arithmetic

  const bitCell = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    v: number,
    clickable: boolean,
    color = D.COL.accent
  ) => {
    ctx.fillStyle = "#101825";
    ctx.strokeStyle = v ? color : "#33445e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x - 24, y - 24, 48, 48, 9);
    ctx.fill();
    ctx.stroke();
    if (v) {
      ctx.fillStyle = "rgba(76,201,240,0.12)";
      ctx.fill();
    }
    D.label(ctx, String(v), x, y + 1, { color: v ? color : D.COL.muted, size: 22, bold: true, mono: true });
    if (clickable) D.label(ctx, "▲▼", x, y + 36, { color: "rgba(148,163,179,0.35)", size: 9 });
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    D.label(ctx, "A", 240, 70, { color: D.COL.accent, size: 16, bold: true });
    D.label(ctx, "+  B", 232, 160, { color: D.COL.accent, size: 16, bold: true });
    D.label(ctx, "=", 175, 265, { color: D.COL.amber, size: 20, bold: true });
    for (let i = 0; i < 4; i++) {
      // carry INTO the next column, shown between rows
      if (carries[i + 1]) {
        D.label(ctx, "carry 1 ↖", colX(i) - 52, 112, { color: D.COL.amber, size: 11 });
      }
      bitCell(ctx, colX(i), 70, aBits[i], true);
      bitCell(ctx, colX(i), 160, bBits[i], true);
      bitCell(ctx, colX(i), 265, sum[i], false, D.COL.amber);
      D.label(ctx, `${1 << i}s`, colX(i), 20, { color: D.COL.muted, size: 11 });
    }
    // carry-out cell
    bitCell(ctx, colX(4), 265, carries[4], false, carries[4] ? D.COL.bad : D.COL.amber);
    D.label(ctx, "carry out (16s)", colX(4), 310, { color: carries[4] ? D.COL.bad : D.COL.muted, size: 11 });

    D.meter(ctx, 720, 46, 160, "A in decimal", String(aDec), D.COL.accent);
    D.meter(ctx, 720, 136, 160, "B in decimal", String(bDec), D.COL.accent);
    D.meter(ctx, 720, 241, 160, "sum", `${aDec} + ${bDec} = ${aDec + bDec}`, D.COL.amber);
  };

  return (
    <>
      <SimCanvas
        width={900}
        height={330}
        draw={draw}
        onClick={(p) => {
          for (let i = 0; i < 4; i++) {
            if (Math.abs(p.x - colX(i)) < 26) {
              if (Math.abs(p.y - 70) < 26) setABits((bits) => bits.map((v, k) => (k === i ? 1 - v : v)));
              if (Math.abs(p.y - 160) < 26) setBBits((bits) => bits.map((v, k) => (k === i ? 1 - v : v)));
            }
          }
        }}
      />
      <Readouts>
        <Readout label="What you're looking at" value="each column is one full adder: XOR makes the sum bit, AND/OR make the carry" />
        <Readout
          label="Try this"
          value="Set 15 + 1. Watch the carry ripple through every column and land in the 16s — that's overflow."
          tone="amber"
        />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 7.3 — Flip-flops as a counter / frequency divider
 * ===================================================================== */

export function CounterLab() {
  const [freq, setFreq] = useState(2);
  const [running, setRunning] = useState<"run" | "pause">("run");
  const sim = useRef({
    t: 0,
    phase: 0,
    count: 0,
    scope: new Scope(
      [
        { label: "clock", color: "#f6b26b", min: 1.2 - 6, max: 1.2 },
        { label: "Q0 (÷2)", color: "#4cc9f0", min: 2.7 - 6, max: 2.7 },
        { label: "Q1 (÷4)", color: "#47c26b", min: 4.2 - 6, max: 4.2 },
        { label: "Q2 (÷8)", color: "#f26d6d", min: 5.7 - 6, max: 5.7 },
      ],
      6
    ),
  });

  const pulse = () => {
    sim.current.count = (sim.current.count + 1) & 7;
  };

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    if (running === "run") {
      s.phase += freq * dt;
      while (s.phase >= 1) {
        s.phase -= 1;
        s.count = (s.count + 1) & 7;
      }
      s.t += dt;
      // clock drawn so the wrap (where the counter advances) is a FALLING edge,
      // matching the ripple-counter convention taught in the lesson
      const clk = s.phase < 0.5 ? 0 : 1;
      s.scope.push(s.t, [clk, s.count & 1, (s.count >> 1) & 1, (s.count >> 2) & 1]);
    }

    s.scope.draw(ctx, 330, 20, 550, 330, { timeLabel: "1 s/div" });

    // the three Q LEDs, MSB left
    D.label(ctx, "3-bit counter state", 165, 40, { color: D.COL.accent, size: 14, bold: true });
    [2, 1, 0].forEach((bit, k) => {
      const on = (s.count >> bit) & 1;
      const x = 80 + k * 85;
      D.glow(ctx, x, 110, 40, D.COL.good, on ? 0.8 : 0);
      D.dot(ctx, x, 110, 20, on ? D.COL.good : "#2a3646");
      D.label(ctx, `Q${bit}`, x, 152, { color: D.COL.muted, size: 12 });
      D.label(ctx, `f/${1 << (bit + 1)} = ${fmtSI(freq / (1 << (bit + 1)), "Hz", 2)}`, x, 172, { color: "rgba(148,163,179,0.6)", size: 10 });
    });

    D.meter(ctx, 55, 210, 100, "binary", `${(s.count >> 2) & 1}${(s.count >> 1) & 1}${s.count & 1}`, D.COL.accent);
    D.meter(ctx, 170, 210, 100, "decimal", String(s.count), D.COL.amber);
    D.meter(ctx, 55, 270, 215, "clock", running === "run" ? `${freq.toFixed(1)} Hz` : "paused — use Pulse", running === "run" ? D.COL.amber : D.COL.muted);
    D.label(ctx, "each stage toggles when the one before it falls: divide-by-two, chained", 165, 335, {
      color: "rgba(148,163,179,0.6)",
      size: 11,
    });
  };

  return (
    <>
      <SimCanvas width={900} height={370} draw={draw} />
      <Controls>
        <Slider label="Clock frequency" min={0.5} max={8} step={0.5} value={freq} onChange={setFreq} fmt={(v) => `${v.toFixed(1)} Hz`} />
        <Segmented
          label="Clock"
          value={running}
          onChange={setRunning}
          options={[
            { value: "run", label: "▶ Running" },
            { value: "pause", label: "⏸ Paused" },
          ]}
        />
        <div className="ctl-row">
          <label>Manual clock</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={pulse}>
              ⏫ Pulse once
            </button>
          </div>
        </div>
      </Controls>
      <Readouts>
        <Readout label="Frequency division" value="Q0 runs at half the clock, Q1 at a quarter, Q2 at an eighth — read it off the scope" />
        <Readout
          label="Where you've seen this clock"
          value="a 555 astable makes a perfect clock source — your blinker circuit can drive this counter"
          tone="amber"
        />
      </Readouts>
    </>
  );
}
