"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, PickSlider, Readout, Readouts, Segmented, Slider } from "@/spark/components/controls";
import { clamp, e12Range, fmtSI, Scope } from "@/spark/lib/sim/helpers";
import * as D from "@/spark/lib/sim/draw";

/* =====================================================================
 * Lab 2.1 — Kirchhoff's two laws, side by side
 * ===================================================================== */

const KVL_VALUES = e12Range(100, 10000);

export function KirchhoffLab() {
  const [i1, setI1] = useState(0.8);
  const [i2, setI2] = useState(0.4);
  const [r1Idx, setR1Idx] = useState(KVL_VALUES.indexOf(1000));
  const [r2Idx, setR2Idx] = useState(KVL_VALUES.indexOf(2200));

  const V = 9;
  const r1 = KVL_VALUES[r1Idx];
  const r2 = KVL_VALUES[r2Idx];
  const loopI = V / (r1 + r2);
  const v1 = loopI * r1;
  const v2 = loopI * r2;

  const draw = (ctx: CanvasRenderingContext2D) => {
    /* ---- left: KCL junction ---- */
    D.label(ctx, "KCL — currents at a junction", 210, 30, { color: D.COL.accent, size: 14, bold: true });
    const jx = 250, jy = 210;
    const w1 = 2 + i1 * 7;
    const w2 = 2 + i2 * 7;
    const w3 = 2 + (i1 + i2) * 7;
    D.arrow(ctx, 70, 110, jx - 12, jy - 8, D.COL.amber, w1);
    D.arrow(ctx, 70, 310, jx - 12, jy + 8, D.COL.amber, w2);
    D.arrow(ctx, jx + 6, jy, 420, jy, D.COL.good, w3);
    D.node(ctx, jx, jy);
    D.label(ctx, `I₁ = ${fmtSI(i1, "A", 2)}`, 110, 90, { color: D.COL.amber, size: 13, mono: true });
    D.label(ctx, `I₂ = ${fmtSI(i2, "A", 2)}`, 110, 335, { color: D.COL.amber, size: 13, mono: true });
    D.label(ctx, `I₃ = ${fmtSI(i1 + i2, "A", 2)}`, 350, 185, { color: D.COL.good, size: 13, mono: true });
    D.meter(ctx, 120, 370, 240, "charge in = charge out", `${fmtSI(i1, "A", 2)} + ${fmtSI(i2, "A", 2)} = ${fmtSI(i1 + i2, "A", 2)}`, D.COL.good);

    /* ---- right: KVL loop ---- */
    D.label(ctx, "KVL — voltages around a loop", 660, 30, { color: D.COL.accent, size: 14, bold: true });
    D.wire(ctx, [[520, 160], [520, 90], [560, 90]]);
    D.wire(ctx, [[660, 90], [700, 90], [700, 130]]);
    D.wire(ctx, [[700, 230], [700, 330], [520, 330], [520, 280]]);
    D.battery(ctx, 520, 280, 520, 160, { label: "9 V" });
    D.resistor(ctx, 560, 90, 660, 90, { label: `R₁ ${fmtSI(r1, "Ω")}` });
    D.resistor(ctx, 700, 130, 700, 230, { label: `R₂ ${fmtSI(r2, "Ω")}` });
    D.label(ctx, `−${v1.toFixed(2)} V`, 610, 135, { color: D.COL.amber, size: 12, mono: true });
    D.label(ctx, `−${v2.toFixed(2)} V`, 762, 260, { color: D.COL.accent, size: 12, mono: true });

    // stacked voltage bar
    const bx = 820, by = 90, bh = 240, bw = 30;
    ctx.fillStyle = "#101825";
    ctx.strokeStyle = "#33445e";
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 5);
    ctx.fill();
    ctx.stroke();
    const h1 = (v1 / V) * (bh - 4);
    const h2 = (v2 / V) * (bh - 4);
    ctx.fillStyle = D.COL.amber;
    ctx.fillRect(bx + 2, by + 2, bw - 4, h1);
    ctx.fillStyle = D.COL.accent;
    ctx.fillRect(bx + 2, by + 2 + h1, bw - 4, h2);
    D.label(ctx, "V₁", bx + bw + 16, by + h1 / 2 + 2, { color: D.COL.amber, size: 12 });
    D.label(ctx, "V₂", bx + bw + 16, by + h1 + h2 / 2, { color: D.COL.accent, size: 12 });
    D.meter(ctx, 560, 370, 260, "around the loop", `${v1.toFixed(2)} + ${v2.toFixed(2)} = 9.00 V ✓`, D.COL.good);
  };

  return (
    <>
      <SimCanvas width={900} height={430} draw={draw} />
      <Controls>
        <Slider label="Branch current I₁" min={0} max={2} step={0.05} value={i1} onChange={setI1} fmt={(v) => fmtSI(v, "A", 2)} />
        <Slider label="Branch current I₂" min={0} max={2} step={0.05} value={i2} onChange={setI2} fmt={(v) => fmtSI(v, "A", 2)} />
        <PickSlider label="Loop resistor R₁" values={KVL_VALUES} index={r1Idx} onChange={setR1Idx} fmt={(v) => fmtSI(v, "Ω")} />
        <PickSlider label="Loop resistor R₂" values={KVL_VALUES} index={r2Idx} onChange={setR2Idx} fmt={(v) => fmtSI(v, "Ω")} />
      </Controls>
      <Readouts>
        <Readout label="KCL at the node" value={`I₃ = I₁ + I₂ = ${fmtSI(i1 + i2, "A", 2)}`} tone="good" />
        <Readout label="KVL: gains = drops" value={`9 V = ${v1.toFixed(2)} V + ${v2.toFixed(2)} V`} tone="good" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 2.2 — Voltage divider & potentiometer, with loading
 * ===================================================================== */

const DIV_VALUES = e12Range(1000, 100000);

export function DividerLab() {
  const [mode, setMode] = useState<"divider" | "pot">("divider");
  const [vin, setVin] = useState(9);
  const [r1Idx, setR1Idx] = useState(DIV_VALUES.indexOf(10000));
  const [r2Idx, setR2Idx] = useState(DIV_VALUES.indexOf(10000));
  const [wiper, setWiper] = useState(50);
  const [loaded, setLoaded] = useState<"none" | "loaded">("none");

  const RL = 10000;
  const potR = 10000;
  const r1 = mode === "divider" ? DIV_VALUES[r1Idx] : (1 - wiper / 100) * potR;
  const r2 = mode === "divider" ? DIV_VALUES[r2Idx] : (wiper / 100) * potR;
  const r2eff = loaded === "loaded" ? (r2 * RL) / (r2 + RL) : r2;
  const vout = (vin * r2eff) / (r1 + r2eff);
  const voutIdeal = (vin * r2) / (r1 + r2);

  const draw = (ctx: CanvasRenderingContext2D) => {
    D.wire(ctx, [[150, 120], [400, 120]]);
    D.wire(ctx, [[150, 300], [400, 300]]);
    D.battery(ctx, 150, 300, 150, 120, { label: `Vin ${vin.toFixed(1)} V` });
    D.resistor(ctx, 400, 120, 400, 205, { label: `R₁ ${fmtSI(r1, "Ω")}` });
    D.resistor(ctx, 400, 215, 400, 300, { label: `R₂ ${fmtSI(r2, "Ω")}` });
    D.node(ctx, 400, 210);
    D.wire(ctx, [[400, 210], [560, 210]]);
    D.ground(ctx, 400, 302);
    D.label(ctx, "Vout", 545, 190, { color: D.COL.good, size: 13, bold: true });

    if (loaded === "loaded") {
      D.wire(ctx, [[560, 210], [620, 210]]);
      D.resistor(ctx, 620, 210, 620, 310, { label: `load ${fmtSI(RL, "Ω")}` });
      D.ground(ctx, 620, 312);
    }

    // output gauge
    const gx = 730, gy = 80, gh = 250, gw = 34;
    ctx.fillStyle = "#101825";
    ctx.strokeStyle = "#33445e";
    ctx.beginPath();
    ctx.roundRect(gx, gy, gw, gh, 5);
    ctx.fill();
    ctx.stroke();
    const frac = clamp(vout / vin, 0, 1);
    ctx.fillStyle = D.COL.good;
    const fh = frac * (gh - 4);
    ctx.fillRect(gx + 2, gy + 2 + (gh - 4 - fh), gw - 4, fh);
    if (loaded === "loaded") {
      const iy = gy + 2 + (gh - 4) * (1 - clamp(voutIdeal / vin, 0, 1));
      ctx.setLineDash([4, 4]);
      D.wire(ctx, [[gx - 6, iy], [gx + gw + 6, iy]], D.COL.muted, 1.5);
      ctx.setLineDash([]);
      D.label(ctx, "unloaded", gx + gw + 46, iy, { color: D.COL.muted, size: 11 });
    }
    D.label(ctx, `${vout.toFixed(2)} V`, gx + gw / 2, gy + gh + 20, { color: D.COL.good, size: 14, bold: true, mono: true });
    D.label(ctx, `${vin.toFixed(0)} V`, gx + gw / 2, gy - 14, { color: D.COL.muted, size: 11 });

    D.meter(ctx, 480, 300, 190, "Vout = Vin·R₂/(R₁+R₂)", `${vout.toFixed(2)} V`, D.COL.good);
    if (mode === "pot") {
      D.label(ctx, `wiper at ${wiper}% — a potentiometer is just a divider you can turn`, 400, 375, {
        color: D.COL.muted,
        size: 12,
      });
    }
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} />
      <Controls>
        <Segmented
          label="Mode"
          value={mode}
          onChange={setMode}
          options={[
            { value: "divider", label: "Two resistors" },
            { value: "pot", label: "Potentiometer (10 kΩ)" },
          ]}
        />
        <Slider label="Input voltage Vin" min={1} max={12} step={0.1} value={vin} onChange={setVin} fmt={(v) => `${v.toFixed(1)} V`} />
        {mode === "divider" ? (
          <>
            <PickSlider label="R₁ (top)" values={DIV_VALUES} index={r1Idx} onChange={setR1Idx} fmt={(v) => fmtSI(v, "Ω")} />
            <PickSlider label="R₂ (bottom)" values={DIV_VALUES} index={r2Idx} onChange={setR2Idx} fmt={(v) => fmtSI(v, "Ω")} />
          </>
        ) : (
          <Slider label="Wiper position" min={0} max={100} step={1} value={wiper} onChange={setWiper} fmt={(v) => `${v}%`} />
        )}
        <Segmented
          label="Output load"
          value={loaded}
          onChange={setLoaded}
          options={[
            { value: "none", label: "Open (no load)" },
            { value: "loaded", label: "10 kΩ load attached" },
          ]}
        />
      </Controls>
      <Readouts>
        <Readout label="Vout" value={`${vout.toFixed(2)} V`} tone="good" />
        <Readout label="Division ratio" value={`${((r2 / (r1 + r2)) * 100).toFixed(1)}%`} />
        {loaded === "loaded" ? (
          <Readout
            label="Sag from loading"
            value={`−${(voutIdeal - vout).toFixed(2)} V`}
            tone={voutIdeal - vout > 0.5 ? "warn" : "amber"}
          />
        ) : null}
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 2.3 — RC charging / discharging on a live scope
 * ===================================================================== */

const RC_R_VALUES = e12Range(100, 100000);
const RC_C_VALUES = [1e-6, 2.2e-6, 4.7e-6, 10e-6, 22e-6, 47e-6, 100e-6, 220e-6, 470e-6, 1000e-6];

export function CapacitorLab() {
  const [rIdx, setRIdx] = useState(RC_R_VALUES.indexOf(1000));
  const [cIdx, setCIdx] = useState(RC_C_VALUES.indexOf(100e-6));
  const [mode, setMode] = useState<"charge" | "discharge">("charge");
  const sim = useRef({
    vc: 0,
    t: 0,
    scope: new Scope(
      [{ label: "V across capacitor", color: "#4cc9f0", min: 0, max: 10 }],
      0.6
    ),
  });

  const VS = 9;
  const r = RC_R_VALUES[rIdx];
  const c = RC_C_VALUES[cIdx];
  const tau = r * c;

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    s.scope.setWindow(6 * tau); // 6τ across the screen, replayed over ~6 real seconds

    const dtSim = dt * tau; // time-scaling: the curve shape is universal
    const target = mode === "charge" ? VS : 0;
    s.vc += ((target - s.vc) / tau) * dtSim;
    s.t += dtSim;
    s.scope.push(s.t, [s.vc]);

    // little schematic
    const batteryOn = mode === "charge";
    D.wire(ctx, [[60, 110], [90, 110]], batteryOn ? D.COL.wire : "#3a4757");
    D.wire(ctx, [[60, 110], [60, 160]], batteryOn ? D.COL.wire : "#3a4757");
    D.wire(ctx, [[60, 280], [60, 330], [280, 330], [280, 260]]);
    D.battery(ctx, 60, 280, 60, 160, { label: batteryOn ? "9 V" : "out of circuit" });
    D.switchSym(ctx, 90, 110, 160, 110, true);
    D.resistor(ctx, 160, 110, 250, 110, { label: `R ${fmtSI(r, "Ω")}` });
    D.wire(ctx, [[250, 110], [280, 110], [280, 190]]);
    D.capacitor(ctx, 280, 190, 280, 260, { label: `C ${fmtSI(c, "F")}` });
    if (!batteryOn) {
      D.wire(ctx, [[60, 110], [30, 110], [30, 330], [60, 330]], D.COL.amber, 2);
      D.label(ctx, "discharge path", 30, 90, { color: D.COL.amber, size: 11 });
    }
    // capacitor fill indicator
    const frac = clamp(s.vc / VS, 0, 1);
    ctx.fillStyle = "rgba(76,201,240,0.25)";
    ctx.fillRect(255, 260 - frac * 66, 50, frac * 66);

    // scope
    s.scope.draw(ctx, 340, 40, 540, 330, {
      timeLabel: `${fmtSI(tau, "s", 2)} / div  ·  window = 6τ`,
      hlines:
        mode === "charge"
          ? [{ trace: 0, value: VS * 0.632, label: "63% — reached at t = τ" }]
          : [{ trace: 0, value: VS * 0.368, label: "37% — reached at t = τ" }],
    });

    D.meter(ctx, 40, 370, 170, "time constant τ = R·C", fmtSI(tau, "s", 2), D.COL.amber);
    D.meter(ctx, 225, 370, 150, "capacitor voltage", `${s.vc.toFixed(2)} V`);
    D.meter(
      ctx,
      390,
      370,
      150,
      "current now",
      fmtSI(Math.abs(mode === "charge" ? (VS - s.vc) / r : s.vc / r), "A", 2),
      D.COL.good
    );
    D.meter(ctx, 555, 370, 170, "≈ fully settled after", `5τ = ${fmtSI(5 * tau, "s", 2)}`, D.COL.muted);
  };

  return (
    <>
      <SimCanvas width={900} height={430} draw={draw} />
      <Controls>
        <Segmented
          label="Switch"
          value={mode}
          onChange={setMode}
          options={[
            { value: "charge", label: "⚡ Charge (via battery)" },
            { value: "discharge", label: "⬇ Discharge (via R)" },
          ]}
        />
        <PickSlider label="Resistance R" values={RC_R_VALUES} index={rIdx} onChange={setRIdx} fmt={(v) => fmtSI(v, "Ω")} />
        <PickSlider label="Capacitance C" values={RC_C_VALUES} index={cIdx} onChange={setCIdx} fmt={(v) => fmtSI(v, "F")} />
      </Controls>
      <Readouts>
        <Readout label="τ = R × C" value={fmtSI(tau, "s", 2)} tone="amber" />
        <Readout label="The universal curve" value="change R or C: the labels change, the shape never does" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 2.4 — RL circuit: inductors fight change (and kick back)
 * ===================================================================== */

const RL_L_VALUES = [0.01, 0.022, 0.047, 0.1, 0.22, 0.47, 1];
const RL_R_VALUES = e12Range(10, 1000);

export function InductorLab() {
  const [lIdx, setLIdx] = useState(RL_L_VALUES.indexOf(0.1));
  const [rIdx, setRIdx] = useState(RL_R_VALUES.indexOf(100));
  const [closed, setClosed] = useState<"closed" | "open">("closed");
  const [diode, setDiode] = useState<"none" | "fitted">("none");
  const sim = useRef({
    i: 0,
    t: 0,
    peak: 0,
    scope: new Scope(
      [
        { label: "current I", color: "#f6b26b", min: 0, max: 0.12 },
        { label: "voltage across L", color: "#4cc9f0", min: -30, max: 15 },
      ],
      0.006
    ),
  });

  const VS = 9;
  const L = RL_L_VALUES[lIdx];
  const r = RL_R_VALUES[rIdx];
  const tau = L / r;
  const iMax = VS / r;

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    s.scope.setWindow(6 * tau);
    s.scope.traces[0].max = iMax * 1.25;
    const dtSim = dt * tau;

    let vl: number;
    if (closed === "closed") {
      vl = VS - s.i * r;
      s.i += (vl / L) * dtSim;
      s.peak = 0;
    } else if (diode === "fitted") {
      // freewheel diode directly across the coil: V_L clamps to one diode drop,
      // so the current ramps down linearly (L·dI/dt = −0.7 V)
      vl = s.i > 1e-6 ? -0.7 : 0;
      s.i += (vl / L) * dtSim;
      if (s.i < 0) s.i = 0;
    } else {
      // no diode: the switch arc interrupts the current ~50× faster → huge spike
      const tauOff = tau / 50;
      if (s.i > 1e-6) {
        vl = -(s.i * r * 50);
        s.peak = Math.max(s.peak, Math.abs(vl));
        s.i += -(s.i / tauOff) * dtSim;
        if (s.i < 1e-6) s.i = 0;
      } else {
        vl = 0;
      }
    }
    s.t += dtSim;
    s.scope.push(s.t, [s.i, vl]);

    // schematic
    D.wire(ctx, [[60, 110], [90, 110]]);
    D.wire(ctx, [[60, 110], [60, 160]]);
    D.wire(ctx, [[60, 280], [60, 330], [280, 330], [280, 270]]);
    D.battery(ctx, 60, 280, 60, 160, { label: "9 V" });
    D.switchSym(ctx, 90, 110, 160, 110, closed === "closed");
    D.resistor(ctx, 160, 110, 250, 110, { label: `R ${fmtSI(r, "Ω")}` });
    D.wire(ctx, [[250, 110], [280, 110], [280, 150]]);
    // inductor: coil bumps
    ctx.strokeStyle = D.COL.wire;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let k = 0; k < 4; k++) {
      ctx.arc(280, 165 + k * 26, 13, -Math.PI / 2, Math.PI / 2, false);
    }
    ctx.stroke();
    D.label(ctx, `L ${fmtSI(L, "H")}`, 237, 210, { color: D.COL.muted, size: 12 });
    if (diode === "fitted") {
      // directly in parallel with the coil, conducting bottom → top when the switch opens
      D.wire(ctx, [[280, 150], [350, 150]]);
      D.wire(ctx, [[280, 270], [350, 270]]);
      D.led(ctx, 350, 270, 350, 150, { isLED: false });
      D.label(ctx, "flyback diode", 350, 133, { color: D.COL.muted, size: 11 });
    }
    if (closed === "open" && diode === "none" && s.peak > 0) {
      D.glow(ctx, 125, 95, 40, D.COL.bad, 0.5);
      D.label(ctx, "⚡ arc!", 125, 60, { color: D.COL.bad, size: 13, bold: true });
    }

    s.scope.traces[1].label =
      closed === "open" && diode === "none" && s.peak > 30
        ? "voltage across L — spike off-scale!"
        : "voltage across L";
    s.scope.draw(ctx, 380, 40, 500, 330, {
      timeLabel: `${fmtSI(tau, "s", 2)} / div · window = 6τ`,
    });

    D.meter(ctx, 40, 370, 160, "time constant τ = L/R", fmtSI(tau, "s", 2), D.COL.amber);
    D.meter(ctx, 215, 370, 150, "current", fmtSI(s.i, "A", 2));
    D.meter(ctx, 380, 370, 160, "target I = V/R", fmtSI(iMax, "A", 2), D.COL.muted);
    D.meter(
      ctx,
      555,
      370,
      190,
      "inductive kick peak",
      s.peak > 0 ? `−${fmtSI(s.peak, "V", 2)} !` : diode === "fitted" ? "clamped ≈ −0.7 V" : "—",
      s.peak > 0 ? D.COL.bad : D.COL.good
    );
  };

  return (
    <>
      <SimCanvas width={900} height={430} draw={draw} />
      <Controls>
        <Segmented
          label="Switch"
          value={closed}
          onChange={setClosed}
          options={[
            { value: "closed", label: "Closed — current ramps up" },
            { value: "open", label: "Open — interrupt the current!" },
          ]}
        />
        <Segmented
          label="Flyback diode"
          value={diode}
          onChange={setDiode}
          options={[
            { value: "none", label: "None (ouch)" },
            { value: "fitted", label: "Fitted across L" },
          ]}
        />
        <PickSlider label="Inductance L" values={RL_L_VALUES} index={lIdx} onChange={setLIdx} fmt={(v) => fmtSI(v, "H")} />
        <PickSlider label="Resistance R" values={RL_R_VALUES} index={rIdx} onChange={setRIdx} fmt={(v) => fmtSI(v, "Ω")} />
      </Controls>
      <Readouts>
        <Readout label="τ = L / R" value={fmtSI(tau, "s", 2)} tone="amber" />
        <Readout
          label="Try this"
          value="Open the switch with and without the diode — compare the voltage trace"
        />
      </Readouts>
    </>
  );
}
