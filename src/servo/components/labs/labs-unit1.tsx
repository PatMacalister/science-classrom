"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, PickSlider, Readout, Readouts, Segmented, Slider, useTl } from "@/servo/components/controls";
import { tl as translate } from "@/servo/lib/labStrings";
import * as D from "@/servo/lib/sim/draw";

/* =====================================================================
 * Lab 1.1 — The motor bench: duty vs load, the speed–torque trade and the
 * stall that browns out the brain.
 * ===================================================================== */

export function MotorLab() {
  const [duty, setDuty] = useState(60);
  const [load, setLoad] = useState(20);
  const [dir, setDir] = useState<"fwd" | "rev">("fwd");

  // classic brushed-DC model, normalised: at full duty, free speed 3000 RPM
  // and stall torque 100 (arbitrary units); speed falls linearly with load
  const maxTorque = duty; // % of full-scale stall torque available at this duty
  const stalled = load >= maxTorque;
  const speed = stalled ? 0 : 3000 * (duty / 100) * (1 - load / maxTorque);
  // current tracks torque demand; a stalled motor draws its duty-limited max
  const current = stalled ? 0.2 + 2.3 * (duty / 100) : 0.2 + 2.3 * (load / 100);
  const vBatt = 6 - 0.9 * current;
  const brownout = vBatt < 4.6;

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    // motor with spinning shaft
    const mx = 130;
    const my = 150;
    D.panel(ctx, mx - 80, my - 70, 160, 150);
    D.ring(ctx, mx, my, 42, "#3a4a63", 8);
    const ang = (dir === "fwd" ? 1 : -1) * t * (speed / 3000) * 10;
    for (let s = 0; s < 3; s++) {
      const a = ang + (s * Math.PI * 2) / 3;
      D.wire(ctx, [[mx, my], [mx + Math.cos(a) * 36, my + Math.sin(a) * 36]], stalled ? D.COL.bad : D.COL.accent, 5);
    }
    D.dot(ctx, mx, my, 10, stalled ? D.COL.bad : D.COL.accent);
    if (stalled) {
      D.glow(ctx, mx, my, 60, D.COL.bad, 0.25 + 0.15 * Math.sin(t * 8));
      D.label(ctx, translate("STALL — all heat, no motion"), mx, my + 66, { size: 11, bold: true, color: D.COL.bad });
    } else {
      D.label(ctx, `${speed.toFixed(0)} RPM`, mx, my + 66, { size: 12, mono: true, color: D.COL.text });
    }

    // H-bridge diagram with the active diagonal lit
    const hx = 330;
    const hy = 90;
    D.panel(ctx, hx - 20, hy - 30, 220, 190);
    D.label(ctx, translate("H-bridge"), hx + 90, hy - 12, { size: 11, color: D.COL.muted });
    const sw = (x: number, y: number, on: boolean) => {
      D.ring(ctx, x, y, 13, on ? D.COL.good : "#3a4a63", on ? 3 : 2);
      if (on) D.dot(ctx, x, y, 5, D.COL.good);
    };
    const fw = dir === "fwd";
    sw(hx + 20, hy + 20, fw); // top-left
    sw(hx + 160, hy + 20, !fw); // top-right
    sw(hx + 20, hy + 120, !fw); // bottom-left
    sw(hx + 160, hy + 120, fw); // bottom-right
    // motor as crossbar
    ctx.fillStyle = "#233248";
    ctx.beginPath();
    ctx.roundRect(hx + 60, hy + 56, 60, 28, 6);
    ctx.fill();
    D.label(ctx, "M", hx + 90, hy + 70, { size: 13, bold: true, color: D.COL.accent });
    const flowColor = "rgba(74,222,128,0.7)";
    if (fw) {
      D.arrow(ctx, hx + 20, hy + 34, hx + 60, hy + 66, flowColor, 2, 6);
      D.arrow(ctx, hx + 120, hy + 74, hx + 160, hy + 106, flowColor, 2, 6);
    } else {
      D.arrow(ctx, hx + 160, hy + 34, hx + 120, hy + 66, flowColor, 2, 6);
      D.arrow(ctx, hx + 60, hy + 74, hx + 20, hy + 106, flowColor, 2, 6);
    }

    // battery + brain rail
    const bx = 640;
    D.panel(ctx, bx - 30, 60, 240, 190);
    D.label(ctx, translate("power rail"), bx + 90, 82, { size: 11, color: D.COL.muted });
    D.barGauge(ctx, bx, 100, 180, 18, vBatt / 6, brownout ? D.COL.bad : D.COL.good, `${vBatt.toFixed(2)} V`);
    D.label(ctx, translate("battery under load"), bx + 90, 134, { size: 10, color: D.COL.muted });
    // brain LED
    const brainOk = !brownout || Math.sin(t * 20) > 0.4; // flickers in brownout
    D.glow(ctx, bx + 40, 190, 22, brainOk ? D.COL.good : D.COL.bad, brownout ? 0.5 : 0.8);
    D.dot(ctx, bx + 40, 190, 9, brainOk ? D.COL.good : D.COL.bad);
    D.label(ctx, brownout ? translate("brain: brown-out!") : translate("brain: happy"), bx + 130, 190, {
      size: 12,
      bold: brownout,
      color: brownout ? D.COL.bad : D.COL.text,
    });

    D.meter(ctx, 20, 8, 170, "speed", `${speed.toFixed(0)} RPM`, D.COL.accent);
    D.meter(ctx, 200, 8, 170, "current", `${current.toFixed(2)} A`, current > 1.8 ? D.COL.bad : D.COL.amber);
    D.meter(ctx, 380, 8, 170, "torque demand", `${load} %`, D.COL.good);
  };

  return (
    <>
      <SimCanvas width={900} height={290} draw={draw} label="A DC motor with H-bridge direction control, battery sag and a brown-out indicator" />
      <Controls>
        <Slider label="PWM duty" min={0} max={100} step={1} value={duty} onChange={setDuty} fmt={(v) => `${v} %`} />
        <Slider label="Mechanical load" min={0} max={100} step={1} value={load} onChange={setLoad} fmt={(v) => `${v} %`} />
        <Segmented
          label="Direction"
          options={[
            { value: "fwd", label: "forward" },
            { value: "rev", label: "reverse" },
          ]}
          value={dir}
          onChange={setDir}
        />
      </Controls>
      <Readouts>
        <Readout label="State" value={stalled ? "stalled — current maxed, speed zero" : "running"} tone={stalled ? "warn" : "good"} />
        <Readout label="Battery sag" value={`${(6 - vBatt).toFixed(2)} V`} tone={brownout ? "warn" : undefined} />
        <Readout label="Rule" value="volts set speed, load sets current" tone="amber" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 1.2 — The position duel: servo (closed loop) vs stepper (counted
 * steps) under shoves and load. Deterministic: all state changes happen
 * in event handlers; the canvas only animates toward the truth.
 * ===================================================================== */

export function ServoStepperLab() {
  const tl = useTl();
  const [cmd, setCmd] = useState(90);
  const [load, setLoad] = useState(20);
  // the stepper's fiction: how many degrees its rotor is behind its counter
  const [skew, setSkew] = useState(0);

  // a heavily loaded stepper skips a fraction of every commanded move;
  // recorded at command time by the handler below (event-based, pure render)
  const [lastMove, setLastMove] = useState({ from: 90, to: 90, skipped: 0 });

  const command = (target: number) => {
    const dist = Math.abs(target - cmd);
    const skipFrac = load > 60 ? (load - 60) / 100 : 0;
    const skipped = dist * skipFrac;
    setLastMove({ from: cmd, to: target, skipped });
    setSkew((s) => s + skipped);
    setCmd(target);
  };

  const shove = () => {
    // the servo fights back; the stepper's rotor is pushed past detents —
    // 25° of shove at this load costs it whole steps it never reports
    const lost = load > 85 ? 0 : 25; // at extreme load it's already stalled in place
    setSkew((s) => s + lost);
  };

  const rehome = () => {
    setSkew(0);
    setLastMove({ from: cmd, to: cmd, skipped: 0 });
  };

  const servoTrue = cmd;
  const stepperDisplay = cmd;
  const stepperTrue = cmd - skew;

  const draw = (ctx: CanvasRenderingContext2D) => {
    const dial = (cx: number, cy: number, trueAng: number, dispAng: number | null, name: string, color: string) => {
      D.panel(ctx, cx - 110, cy - 110, 220, 230);
      D.label(ctx, translate(name), cx, cy - 90, { size: 12, bold: true, color: D.COL.text });
      D.ring(ctx, cx, cy, 62, "#3a4a63", 3);
      for (let a = 0; a <= 180; a += 30) {
        const r = ((180 - a) * Math.PI) / 180;
        D.label(ctx, `${a}`, cx + Math.cos(r) * 78, cy - Math.sin(r) * 78, { size: 9, color: D.COL.muted });
      }
      const ra = ((180 - trueAng) * Math.PI) / 180;
      D.wire(ctx, [[cx, cy], [cx + Math.cos(ra) * 58, cy - Math.sin(ra) * 58]], color, 5);
      D.dot(ctx, cx, cy, 9, color);
      if (dispAng !== null && Math.abs(dispAng - trueAng) > 0.5) {
        const da = ((180 - dispAng) * Math.PI) / 180;
        ctx.setLineDash([4, 5]);
        D.wire(ctx, [[cx, cy], [cx + Math.cos(da) * 58, cy - Math.sin(da) * 58]], "rgba(242,109,109,0.8)", 2.5);
        ctx.setLineDash([]);
        D.label(ctx, translate("its own belief"), cx + Math.cos(da) * 74, cy - Math.sin(da) * 74 - 10, { size: 9, color: D.COL.bad });
      }
      D.label(ctx, `${trueAng.toFixed(0)}°`, cx, cy + 88, { size: 14, mono: true, bold: true, color });
    };

    dial(230, 160, servoTrue, null, "servo", D.COL.good);
    dial(560, 160, stepperTrue, stepperDisplay, "stepper", D.COL.accent);

    D.panel(ctx, 720, 50, 160, 220);
    D.label(ctx, translate("the books"), 800, 72, { size: 11, color: D.COL.muted });
    D.label(ctx, translate("servo error"), 800, 104, { size: 10, color: D.COL.muted });
    D.label(ctx, "0.0°", 800, 122, { size: 14, mono: true, bold: true, color: D.COL.good });
    D.label(ctx, translate("stepper error"), 800, 164, { size: 10, color: D.COL.muted });
    D.label(ctx, `${skew.toFixed(1)}°`, 800, 182, { size: 14, mono: true, bold: true, color: skew > 1 ? D.COL.bad : D.COL.good });
    D.label(ctx, translate("and it doesn't know"), 800, 216, { size: 9, color: skew > 1 ? D.COL.bad : D.COL.muted });
  };

  return (
    <>
      <SimCanvas width={900} height={300} draw={draw} label="A servo and a stepper dial side by side, with the stepper's belief drifting from its true angle" />
      <Controls>
        <Slider label="Commanded angle" min={0} max={180} step={5} value={cmd} onChange={command} fmt={(v) => `${v}°`} />
        <Slider label="Load" min={0} max={100} step={5} value={load} onChange={setLoad} fmt={(v) => `${v} %`} />
        <div className="ctl-row">
          <label>{tl("Disturb")}</label>
          <button type="button" className="btn secondary small" onClick={shove}>
            {tl("💥 Shove both")}
          </button>
          <button type="button" className="btn secondary small" onClick={rehome}>
            {tl("🏠 Re-home stepper")}
          </button>
        </div>
      </Controls>
      <Readouts>
        <Readout label="Servo" value="fights back — its loop closes on the truth" tone="good" />
        <Readout
          label="Stepper belief vs reality"
          value={skew > 0.5 ? `${skew.toFixed(1)}° ${translate("off — and it doesn't know")}` : "honest (so far)"}
          tone={skew > 0.5 ? "warn" : "good"}
        />
        <Readout label="Last move skipped" value={`${lastMove.skipped.toFixed(1)}°`} tone={lastMove.skipped > 0 ? "warn" : undefined} />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 1.3 — The exchange booth: gear ratio vs torque, speed and backlash.
 * ===================================================================== */

const RATIOS = [1, 2, 5, 10, 20, 50];

export function GearLab() {
  const [rIdx, setRIdx] = useState(2);
  const [need, setNeed] = useState(0.6);
  const [lash, setLash] = useState(2);

  const ratio = RATIOS[rIdx];
  const stages = ratio > 10 ? 2 : 1;
  const efficiency = Math.pow(0.95, stages);
  const MOTOR_T = 0.05; // N·m
  const MOTOR_RPM = 3000;
  const outTorque = MOTOR_T * ratio * efficiency;
  const outSpeed = MOTOR_RPM / ratio;
  const lifts = outTorque >= need;

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    // the motor reverses every 4 s; the output waits out the backlash gap
    const cycle = t % 8;
    const fwd = cycle < 4;
    const inAng = (fwd ? 1 : -1) * t * 6;
    // output angle lags by the gap (in output degrees) after each reversal
    const sinceRev = cycle < 4 ? cycle : cycle - 4;
    const gapTime = (lash / 360) * 2; // seconds the gap takes to cross (visualised slow)
    const engaged = sinceRev > gapTime;

    const gx = 200;
    const gy = 160;
    // driver gear (small)
    D.ring(ctx, gx, gy, 34, D.COL.accent, 5);
    for (let s = 0; s < 8; s++) {
      const a = inAng + (s * Math.PI) / 4;
      D.wire(ctx, [[gx + Math.cos(a) * 30, gy + Math.sin(a) * 30], [gx + Math.cos(a) * 42, gy + Math.sin(a) * 42]], D.COL.accent, 4);
    }
    D.label(ctx, translate("motor gear"), gx, gy + 62, { size: 10, color: D.COL.muted });
    // driven gear (big, radius scales with ratio)
    const R = 34 + Math.min(90, ratio * 3.2);
    const dx = gx + 34 + R + 6;
    const outAng = engaged ? (-inAng / ratio) * 1 : -((fwd ? 1 : -1) * gapTime * 6) / ratio;
    D.ring(ctx, dx, gy, R, engaged ? D.COL.good : D.COL.amber, 5);
    const teeth = Math.min(28, 8 + ratio);
    for (let s = 0; s < teeth; s++) {
      const a = outAng + (s * Math.PI * 2) / teeth;
      D.wire(ctx, [[dx + Math.cos(a) * (R - 4), gy + Math.sin(a) * (R - 4)], [dx + Math.cos(a) * (R + 8), gy + Math.sin(a) * (R + 8)]], engaged ? D.COL.good : D.COL.amber, 3);
    }
    D.label(ctx, translate("output gear"), dx, gy + R + 22, { size: 10, color: D.COL.muted });
    if (!engaged) {
      D.label(ctx, translate("backlash: crossing the gap"), dx, gy - R - 14, { size: 11, bold: true, color: D.COL.amber });
    }

    // the load to lift
    const lx = 700;
    D.panel(ctx, lx - 60, 60, 220, 210);
    D.label(ctx, translate("the load"), lx + 50, 84, { size: 11, color: D.COL.muted });
    const lift = lifts ? Math.min(1, (outTorque / need - 1) * 0.5 + 0.3) : 0;
    const boxY = 220 - lift * 70 - 8 * Math.sin(lifts ? t * outSpeed * 0.02 : 0);
    ctx.fillStyle = lifts ? D.COL.good : D.COL.bad;
    ctx.beginPath();
    ctx.roundRect(lx + 10, boxY, 80, 44, 6);
    ctx.fill();
    D.label(ctx, `${need.toFixed(1)} N·m`, lx + 50, boxY + 24, { size: 12, bold: true, color: "#0a1420" });
    D.label(ctx, lifts ? translate("lifting") : translate("too heavy — stalled"), lx + 50, 252, {
      size: 11,
      bold: !lifts,
      color: lifts ? D.COL.good : D.COL.bad,
    });

    D.meter(ctx, 20, 8, 170, "output speed", `${outSpeed.toFixed(0)} RPM`, D.COL.accent);
    D.meter(ctx, 200, 8, 170, "output torque", `${outTorque.toFixed(2)} N·m`, D.COL.good);
    D.meter(ctx, 380, 8, 190, "friction fee", `${((1 - efficiency) * 100).toFixed(0)} %`, D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={300} draw={draw} label="Two meshed gears with adjustable ratio lifting a load, showing backlash at each reversal" />
      <Controls>
        <PickSlider label="Gear ratio" values={RATIOS} index={rIdx} onChange={setRIdx} fmt={(v) => `${v}:1`} />
        <Slider label="Load torque" min={0.1} max={2} step={0.1} value={need} onChange={setNeed} fmt={(v) => `${v.toFixed(1)} N·m`} />
        <Slider label="Backlash" min={0} max={5} step={0.5} value={lash} onChange={setLash} fmt={(v) => `${v.toFixed(1)}°`} />
      </Controls>
      <Readouts>
        <Readout label="Verdict" value={lifts ? "lifts it" : "stalls — gear down further"} tone={lifts ? "good" : "warn"} />
        <Readout label="Trade" value={`${translate("speed")} ÷ ${ratio}, ${translate("torque")} × ${ratio}`} tone="amber" />
        <Readout label="Dead zone on reversal" value={`${lash.toFixed(1)}°`} />
      </Readouts>
    </>
  );
}
