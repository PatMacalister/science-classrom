"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, PickSlider, Readout, Readouts, Segmented, Select, Slider } from "@/spark/components/controls";
import { clamp, e12Range, fmtSI, Scope } from "@/spark/lib/sim/helpers";
import * as D from "@/spark/lib/sim/draw";

/* =====================================================================
 * Lab 3.1 — LED + resistor: the rite of passage (destructible!)
 * ===================================================================== */

const LED_COLORS: Record<string, { vf: number; hex: string; name: string }> = {
  red: { vf: 1.8, hex: "#f26d6d", name: "Red (Vf ≈ 1.8 V)" },
  yellow: { vf: 2.0, hex: "#e8cf3a", name: "Yellow (Vf ≈ 2.0 V)" },
  green: { vf: 2.2, hex: "#47c26b", name: "Green (Vf ≈ 2.2 V)" },
  blue: { vf: 3.0, hex: "#5b8def", name: "Blue (Vf ≈ 3.0 V)" },
  white: { vf: 3.2, hex: "#e8eef5", name: "White (Vf ≈ 3.2 V)" },
};
const LED_R_VALUES = e12Range(47, 10000);

export function DiodeLab() {
  const [vs, setVs] = useState(9);
  const [color, setColor] = useState("red");
  const [rIdx, setRIdx] = useState(LED_R_VALUES.indexOf(470));
  const [dir, setDir] = useState<"forward" | "reversed">("forward");
  const [dead, setDead] = useState(false);

  const led = LED_COLORS[color];
  const r = LED_R_VALUES[rIdx];
  const conducting = dir === "forward" && vs > led.vf && !dead;
  const amps = conducting ? (vs - led.vf) / r : 0;

  if (amps > 0.03 && !dead) {
    // 30 mA+ kills a typical 20 mA LED
    setDead(true);
  }

  const draw = (ctx: CanvasRenderingContext2D) => {
    // circuit
    D.wire(ctx, [[140, 130], [140, 90], [300, 90]]);
    D.wire(ctx, [[440, 90], [540, 90], [540, 140]]);
    D.wire(ctx, [[540, 240], [540, 310], [140, 310], [140, 250]]);
    D.battery(ctx, 140, 250, 140, 130, { label: `${vs.toFixed(1)} V` });
    D.resistor(ctx, 300, 90, 440, 90, { label: `R ${fmtSI(r, "Ω")}` });
    const bright = dead ? 0 : clamp(amps / 0.02, 0, 1);
    if (dir === "forward") {
      D.led(ctx, 540, 140, 540, 240, { on: bright, color: led.hex, label: dead ? "LED ✗" : "LED" });
    } else {
      D.led(ctx, 540, 240, 540, 140, { on: 0, color: led.hex, label: "LED (reversed)" });
    }
    if (dead) {
      D.label(ctx, "💀", 540, 190, { size: 26 });
      // smoke
      for (let i = 0; i < 3; i++) {
        const wob = Math.sin(performance.now() / 400 + i * 2) * 6;
        D.dot(ctx, 552 + wob, 120 - i * 24, 7 + i * 3, `rgba(148,163,179,${0.25 - i * 0.06})`);
      }
      D.label(ctx, "over 30 mA — the bond wire melted. Press Replace LED.", 420, 350, {
        color: D.COL.bad,
        size: 13,
        bold: true,
      });
    }

    // I–V curve inset
    const px = 640, py = 60, pw = 230, ph = 220;
    ctx.fillStyle = "#0b1119";
    ctx.strokeStyle = "#33445e";
    ctx.fillRect(px, py, pw, ph);
    ctx.strokeRect(px, py, pw, ph);
    D.label(ctx, "LED I–V curve", px + pw / 2, py - 12, { color: D.COL.accent, size: 12, bold: true });
    ctx.strokeStyle = led.hex;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const v = (i / 100) * 4;
      const iMa = 25 * Math.log(1 + Math.exp((v - led.vf) / 0.06));
      const x = px + (v / 4) * pw;
      const y = py + ph - clamp(iMa / 40, 0, 1) * ph;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    if (conducting) {
      const opx = px + (led.vf / 4) * pw;
      const opy = py + ph - clamp((amps * 1000) / 40, 0, 1) * ph;
      D.glow(ctx, opx, opy, 14, D.COL.amber, 0.7);
      D.dot(ctx, opx, opy, 5, D.COL.amber);
      D.label(ctx, "operating point", opx, opy - 16, { color: D.COL.amber, size: 11 });
    }
    D.label(ctx, "0", px - 8, py + ph, { color: D.COL.muted, size: 10 });
    D.label(ctx, "4 V", px + pw, py + ph + 14, { color: D.COL.muted, size: 10 });
    D.label(ctx, "40 mA", px - 4, py + 8, { color: D.COL.muted, size: 10, align: "right" });

    // meters
    D.meter(ctx, 200, 150, 150, "current I = (Vs−Vf)/R", fmtSI(amps, "A", 2), amps > 0.025 ? D.COL.bad : D.COL.amber);
    D.meter(ctx, 200, 205, 150, "drop across LED", conducting ? `≈ ${led.vf.toFixed(1)} V` : "—");
    D.meter(
      ctx,
      365,
      150,
      150,
      "verdict",
      dead ? "DESTROYED" : !conducting ? (dir === "reversed" ? "blocking (reversed)" : "below Vf — dark") : amps > 0.025 ? "DANGER" : amps > 0.015 ? "bright ✓" : amps > 0.004 ? "dim" : "barely visible",
      dead || amps > 0.025 ? D.COL.bad : conducting && amps > 0.004 ? D.COL.good : D.COL.muted
    );
  };

  return (
    <>
      <SimCanvas width={900} height={380} draw={draw} />
      <Controls>
        <Slider label="Supply Vs" min={0} max={9} step={0.1} value={vs} onChange={setVs} fmt={(v) => `${v.toFixed(1)} V`} />
        <Select
          label="LED colour"
          options={Object.entries(LED_COLORS).map(([k, v]) => ({ value: k, label: v.name }))}
          value={color}
          onChange={(v) => { setColor(v); setDead(false); }}
        />
        <PickSlider label="Series resistor R" values={LED_R_VALUES} index={rIdx} onChange={setRIdx} fmt={(v) => fmtSI(v, "Ω")} />
        <Segmented
          label="LED orientation"
          value={dir}
          onChange={setDir}
          options={[
            { value: "forward", label: "Forward (correct)" },
            { value: "reversed", label: "Reversed" },
          ]}
        />
        <div className="ctl-row">
          <label>Casualties</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={() => setDead(false)} disabled={!dead}>
              🔧 Replace LED
            </button>
          </div>
        </div>
      </Controls>
      <Readouts>
        <Readout label="Target current" value="10–20 mA for full brightness" />
        <Readout
          label="Resistor recipe"
          value={`R = (Vs − Vf) / I = (${vs.toFixed(1)} − ${led.vf.toFixed(1)}) / 15 mA ≈ ${fmtSI(Math.max(0, (vs - led.vf) / 0.015), "Ω", 2)}`}
          tone="amber"
        />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 3.2 — The NPN transistor as a switch/amplifier
 * ===================================================================== */

const RB_VALUES = e12Range(1000, 1000000);

export function TransistorLab() {
  const [vin, setVin] = useState(0);
  const [rbIdx, setRbIdx] = useState(RB_VALUES.indexOf(10000));

  const VCC = 9;
  const RC = 330;
  const BETA = 100;
  const VBE = 0.7;
  const VCE_SAT = 0.2;
  const VF_LED = 2.0;

  const rb = RB_VALUES[rbIdx];
  const ib = Math.max(0, (vin - VBE) / rb);
  const icSat = (VCC - VF_LED - VCE_SAT) / RC;
  const ic = Math.min(BETA * ib, icSat);
  const region = vin < VBE ? "cutoff" : BETA * ib >= icSat ? "saturation" : "active";

  const draw = (ctx: CanvasRenderingContext2D) => {
    // Vcc rail → LED → Rc → collector
    D.wire(ctx, [[560, 40], [560, 60]]);
    D.label(ctx, "+9 V", 560, 26, { color: D.COL.bad, size: 13, bold: true });
    D.led(ctx, 560, 60, 560, 130, { on: clamp(ic / 0.018, 0, 1), color: "#f26d6d", label: "LED" });
    D.resistor(ctx, 560, 130, 560, 210, { label: `Rc 330 Ω` });
    D.wire(ctx, [[560, 210], [560, 235]]);

    // NPN symbol: base bar + diagonal collector/emitter leads
    D.wire(ctx, [[535, 235], [535, 285]], D.COL.text, 4);
    // collector lead
    D.wire(ctx, [[560, 235], [535, 252]], D.COL.wire, 2.5);
    // emitter lead with arrow
    D.arrow(ctx, 535, 268, 562, 288, D.COL.wire, 2.5, 9);
    D.wire(ctx, [[562, 288], [562, 320]]);
    D.ground(ctx, 562, 322);
    D.label(ctx, "NPN", 596, 260, { color: D.COL.muted, size: 12 });
    D.label(ctx, "C", 578, 228, { color: D.COL.muted, size: 11 });
    D.label(ctx, "B", 522, 260, { color: D.COL.muted, size: 11 });
    D.label(ctx, "E", 580, 300, { color: D.COL.muted, size: 11 });

    // base drive
    D.label(ctx, `signal ${vin.toFixed(1)} V`, 160, 232, { color: D.COL.accent, size: 12 });
    D.dot(ctx, 160, 260, 5, D.COL.accent);
    D.wire(ctx, [[160, 260], [220, 260]]);
    D.resistor(ctx, 220, 260, 380, 260, { label: `Rb ${fmtSI(rb, "Ω")}` });
    D.wire(ctx, [[380, 260], [535, 260]]);

    // current bars: Ib (µA) vs Ic (mA)
    const bx = 690, by = 70, bh = 220;
    const bars = [
      { name: "Ib", val: ib, max: 500e-6, color: D.COL.accent, text: fmtSI(ib, "A", 2) },
      { name: "Ic", val: ic, max: 25e-3, color: D.COL.amber, text: fmtSI(ic, "A", 2) },
    ];
    bars.forEach((b, i) => {
      const x = bx + i * 90;
      ctx.fillStyle = "#101825";
      ctx.strokeStyle = "#33445e";
      ctx.beginPath();
      ctx.roundRect(x, by, 40, bh, 5);
      ctx.fill();
      ctx.stroke();
      const h = clamp(b.val / b.max, 0, 1) * (bh - 4);
      ctx.fillStyle = b.color;
      ctx.fillRect(x + 2, by + bh - 2 - h, 36, h);
      D.label(ctx, b.name, x + 20, by - 14, { color: b.color, size: 13, bold: true });
      D.label(ctx, b.text, x + 20, by + bh + 16, { color: D.COL.muted, size: 11, mono: true });
    });
    D.label(ctx, "note the scales: µA in, mA out", 775, by + bh + 40, { color: D.COL.muted, size: 11 });

    D.meter(ctx, 60, 60, 170, "base current Ib", fmtSI(ib, "A", 2), D.COL.accent);
    D.meter(ctx, 60, 115, 170, "collector current Ic", fmtSI(ic, "A", 2), D.COL.amber);
    D.meter(
      ctx,
      60,
      170,
      170,
      "operating region",
      region.toUpperCase(),
      region === "cutoff" ? D.COL.muted : region === "active" ? D.COL.amber : D.COL.good
    );
  };

  return (
    <>
      <SimCanvas width={900} height={380} draw={draw} />
      <Controls>
        <Slider label="Input signal Vin" min={0} max={5} step={0.05} value={vin} onChange={setVin} fmt={(v) => `${v.toFixed(2)} V`} />
        <PickSlider label="Base resistor Rb" values={RB_VALUES} index={rbIdx} onChange={setRbIdx} fmt={(v) => fmtSI(v, "Ω")} />
      </Controls>
      <Readouts>
        <Readout label="Current gain β" value="≈ 100 — every µA into the base allows 100 µA through the collector" />
        <Readout
          label="Effective gain now"
          value={ib > 0 ? `Ic / Ib = ${(ic / ib).toFixed(0)}× ${region === "saturation" ? "(capped: saturated)" : ""}` : "—"}
          tone={region === "saturation" ? "good" : "amber"}
        />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 3.3 — The 555 timer in astable mode
 * ===================================================================== */

const T555_R1_VALUES = [470, 1000, 4700, 10000];
const T555_R2_VALUES = e12Range(1000, 1000000);
const T555_C_VALUES = [1e-6, 4.7e-6, 10e-6, 47e-6, 100e-6];

export function Timer555Lab({
  r1Options = T555_R1_VALUES,
  r2Options = T555_R2_VALUES,
  cOptions = T555_C_VALUES,
  r1Init = 1000,
  r2Init = 47000,
  cInit = 10e-6,
}: {
  r1Options?: number[];
  r2Options?: number[];
  cOptions?: number[];
  r1Init?: number;
  r2Init?: number;
  cInit?: number;
}) {
  const [r1Idx, setR1Idx] = useState(Math.max(0, r1Options.indexOf(r1Init)));
  const [r2Idx, setR2Idx] = useState(Math.max(0, r2Options.indexOf(r2Init)));
  const [cIdx, setCIdx] = useState(Math.max(0, cOptions.indexOf(cInit)));
  const sim = useRef({
    vc: 3.001,
    phase: "high" as "high" | "low",
    t: 0,
    scope: new Scope(
      [
        { label: "capacitor voltage", color: "#4cc9f0", min: 0, max: 10 },
        { label: "OUT (pin 3)", color: "#f6b26b", min: -0.2, max: 45 },
      ],
      2
    ),
  });

  const VCC = 9;
  const r1 = r1Options[r1Idx];
  const r2 = r2Options[r2Idx];
  const c = cOptions[cIdx];
  const tHigh = 0.693 * (r1 + r2) * c;
  const tLow = 0.693 * r2 * c;
  const period = tHigh + tLow;
  const freq = 1 / period;
  const duty = tHigh / period;

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    s.scope.setWindow(3 * period);
    // keep the displayed period between ~0.8 s and 5 s of real time
    const displayT = clamp(period, 0.8, 5);
    const rate = period / displayT;
    const dtSim = dt * rate;

    if (s.phase === "high") {
      s.vc += ((VCC - s.vc) / ((r1 + r2) * c)) * dtSim;
      if (s.vc >= (2 / 3) * VCC) s.phase = "low";
    } else {
      s.vc += ((0 - s.vc) / (r2 * c)) * dtSim;
      if (s.vc <= (1 / 3) * VCC) s.phase = "high";
    }
    s.t += dtSim;
    const out = s.phase === "high" ? 9 : 0;
    s.scope.push(s.t, [s.vc, out]);

    // schematic: Vcc → R1 → (pin7) → R2 → (pin6/2) → C → GND, IC box, LED on pin 3
    D.label(ctx, "+9 V", 90, 30, { color: D.COL.bad, size: 13, bold: true });
    D.wire(ctx, [[90, 40], [90, 55]]);
    D.resistor(ctx, 90, 55, 90, 125, { label: `R1 ${fmtSI(r1, "Ω")}` });
    D.node(ctx, 90, 132);
    D.wire(ctx, [[90, 132], [150, 132]]);
    D.label(ctx, "pin 7", 172, 132, { color: D.COL.muted, size: 10 });
    D.resistor(ctx, 90, 132, 90, 210, { label: `R2 ${fmtSI(r2, "Ω")}` });
    D.node(ctx, 90, 217);
    D.wire(ctx, [[90, 217], [150, 217]]);
    D.label(ctx, "pins 6+2", 178, 217, { color: D.COL.muted, size: 10 });
    D.capacitor(ctx, 90, 217, 90, 290, { label: `C ${fmtSI(c, "F")}`, polarized: true });
    D.ground(ctx, 90, 292);
    // fill level in C
    const frac = clamp(s.vc / VCC, 0, 1);
    ctx.fillStyle = "rgba(76,201,240,0.3)";
    ctx.fillRect(60, 288 - frac * 60, 24, frac * 60);

    D.icBox(ctx, 150, 100, 110, 150, "555");
    D.wire(ctx, [[260, 175], [300, 175]]);
    D.label(ctx, "OUT pin 3", 280, 158, { color: D.COL.muted, size: 10 });
    const ledOn = s.phase === "high" ? 1 : 0;
    D.resistor(ctx, 300, 175, 360, 175, {});
    D.led(ctx, 360, 175, 420, 175, { on: ledOn, color: "#f26d6d" });
    D.wire(ctx, [[420, 175], [440, 175]]);
    D.ground(ctx, 440, 177);

    // scope
    s.scope.draw(ctx, 470, 40, 410, 290, {
      timeLabel: `${fmtSI(period / 2, "s", 2)} / div${rate !== 1 ? `  ·  ${rate < 1 ? "slowed" : "sped up"} ${rate < 1 ? (1 / rate).toFixed(1) : rate.toFixed(1)}×` : ""}`,
      hlines: [
        { trace: 0, value: 6, label: "⅔ Vcc — flip!" },
        { trace: 0, value: 3, label: "⅓ Vcc — flip!" },
      ],
    });

    D.meter(ctx, 60, 340, 150, "frequency", fmtSI(freq, "Hz", 2), D.COL.amber);
    D.meter(ctx, 225, 340, 150, "period T", fmtSI(period, "s", 2));
    D.meter(ctx, 390, 340, 140, "duty cycle", `${(duty * 100).toFixed(0)}% high`);
    D.meter(ctx, 545, 340, 160, "t high = 0.693(R1+R2)C", fmtSI(tHigh, "s", 2), D.COL.muted);
    D.meter(ctx, 720, 340, 160, "t low = 0.693·R2·C", fmtSI(tLow, "s", 2), D.COL.muted);
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} />
      <Controls>
        <PickSlider label="R1 (Vcc → pin 7)" values={r1Options} index={r1Idx} onChange={setR1Idx} fmt={(v) => fmtSI(v, "Ω")} />
        <PickSlider label="R2 (pin 7 → pin 6)" values={r2Options} index={r2Idx} onChange={setR2Idx} fmt={(v) => fmtSI(v, "Ω")} />
        <PickSlider label="C (pin 2 → ground)" values={cOptions} index={cIdx} onChange={setCIdx} fmt={(v) => fmtSI(v, "F")} />
      </Controls>
      <Readouts>
        <Readout label="f = 1.44 / ((R1 + 2·R2) · C)" value={fmtSI(1.44 / ((r1 + 2 * r2) * c), "Hz", 2)} tone="amber" />
        <Readout label="Why duty > 50%" value="C charges through R1+R2 but discharges through R2 only" />
      </Readouts>
    </>
  );
}
