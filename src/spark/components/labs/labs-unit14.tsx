"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Slider } from "@/spark/components/controls";
import { clamp, Scope } from "@/spark/lib/sim/helpers";
import * as D from "@/spark/lib/sim/draw";

/*
 * Shared plant: a little heater block.
 *   T' = (Tamb + K·u − T) / τ, with a transport deadtime on u.
 * τ = 3 s, K = 0.8 (u in %, so full power reaches 20 + 80 = 100 °C).
 * The deadtime is what makes high gain oscillate — like real hardware.
 */
const TAU = 3;
const GAIN = 0.8;
const DEAD = 0.6;
const T_AMB = 20;

interface PlantState {
  temp: number;
  uDelay: Array<{ t: number; u: number }>;
  t: number;
  amb: number;
  ambUntil: number;
}

function stepPlant(s: PlantState, u: number, dt: number): number {
  s.uDelay.push({ t: s.t, u });
  while (s.uDelay.length > 2 && s.uDelay[0].t < s.t - DEAD) s.uDelay.shift();
  const uEff = s.uDelay[0].u;
  const amb = s.t < s.ambUntil ? s.amb : T_AMB;
  s.temp += ((amb + GAIN * uEff - s.temp) / TAU) * dt;
  s.t += dt;
  return uEff;
}

/* =====================================================================
 * Lab 14.1 — Proportional control: offset and the edge of stability
 * ===================================================================== */

export function PControlLab() {
  const [kp, setKp] = useState(2);
  const [setpoint, setSetpoint] = useState(60);
  const sim = useRef<{ plant: PlantState; scope: Scope }>({
    plant: { temp: T_AMB, uDelay: [], t: 0, amb: T_AMB, ambUntil: -1 },
    scope: new Scope(
      [
        { label: "temperature", color: "#f6b26b", min: 0, max: 110 },
        { label: "heater drive %", color: "#4cc9f0", min: -5, max: 420 },
      ],
      20
    ),
  });

  const ssError = (setpoint - T_AMB) / (1 + GAIN * kp); // theoretical P-only offset

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    const step = Math.min(dt, 0.05);
    const err = setpoint - s.plant.temp;
    const u = clamp(kp * err, 0, 100);
    stepPlant(s.plant, u, step * 2); // 2× time so behaviour shows quickly
    s.scope.push(s.plant.t, [s.plant.temp, u]);

    s.scope.draw(ctx, 20, 20, 860, 290, {
      timeLabel: "3.3 s/div (sim runs 2× real time)",
      hlines: [{ trace: 0, value: setpoint, label: `setpoint ${setpoint} °C` }],
    });

    D.meter(ctx, 30, 330, 160, "temperature", `${s.plant.temp.toFixed(1)} °C`, D.COL.amber);
    D.meter(ctx, 205, 330, 150, "heater drive", `${u.toFixed(0)} %`, D.COL.accent);
    D.meter(
      ctx,
      370,
      330,
      230,
      "error right now",
      `${(setpoint - s.plant.temp).toFixed(1)} °C`,
      Math.abs(setpoint - s.plant.temp) < 3 ? D.COL.good : D.COL.bad
    );
    D.meter(
      ctx,
      615,
      330,
      255,
      "P-only offset (theory)",
      `stuck ≈ ${ssError.toFixed(1)} °C short`,
      D.COL.muted
    );
  };

  return (
    <>
      <SimCanvas width={900} height={390} draw={draw} />
      <Controls>
        <Slider label="Setpoint" min={30} max={90} step={1} value={setpoint} onChange={setSetpoint} fmt={(v) => `${v} °C`} />
        <Slider label="Gain Kp" min={0.2} max={20} step={0.2} value={kp} onChange={setKp} fmt={(v) => v.toFixed(1)} />
        <div className="ctl-row">
          <label>Disturbance</label>
          <div className="seg">
            <button
              type="button"
              className="seg-btn"
              onClick={() => {
                sim.current.plant.amb = 0;
                sim.current.plant.ambUntil = sim.current.plant.t + 6;
              }}
            >
              🌬 Open a window (6 s)
            </button>
          </div>
        </div>
      </Controls>
      <Readouts>
        <Readout label="The two failures of P" value="low Kp: permanently short of the setpoint · high Kp: the deadtime turns eagerness into oscillation" tone="amber" />
        <Readout label="Try this" value="Kp = 1: note the offset matches the theory meter. Then Kp = 15: watch it ring like your LC tank" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 14.2 — PID: the industry's favourite three-term fix
 * ===================================================================== */

export function PidLab() {
  const [kp, setKp] = useState(3);
  const [ki, setKi] = useState(0.5);
  const [kd, setKd] = useState(1.5);
  const [setpoint, setSetpoint] = useState(60);
  const sim = useRef<{
    plant: PlantState;
    integ: number;
    prevErr: number;
    overshoot: number;
    scope: Scope;
  }>({
    plant: { temp: T_AMB, uDelay: [], t: 0, amb: T_AMB, ambUntil: -1 },
    integ: 0,
    prevErr: 0,
    overshoot: 0,
    scope: new Scope(
      [
        { label: "temperature", color: "#f6b26b", min: 0, max: 110 },
        { label: "heater drive %", color: "#4cc9f0", min: -5, max: 420 },
      ],
      20
    ),
  });

  const restart = () => {
    const s = sim.current;
    s.plant.temp = T_AMB;
    s.plant.uDelay = [];
    s.integ = 0;
    s.prevErr = 0;
    s.overshoot = 0;
    s.scope.clear();
  };

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    const step = Math.min(dt, 0.05) * 2;
    const err = setpoint - s.plant.temp;
    // anti-windup: never let the I-term store more push than the actuator can deliver
    const iLimit = 100 / Math.max(ki, 0.01);
    s.integ = clamp(s.integ + err * step, -iLimit, iLimit);
    const deriv = (err - s.prevErr) / Math.max(step, 1e-6);
    s.prevErr = err;
    const u = clamp(kp * err + ki * s.integ + kd * deriv, 0, 100);
    stepPlant(s.plant, u, step);
    if (s.plant.temp - setpoint > s.overshoot) s.overshoot = s.plant.temp - setpoint;
    s.scope.push(s.plant.t, [s.plant.temp, u]);

    s.scope.draw(ctx, 20, 20, 860, 290, {
      timeLabel: "3.3 s/div (sim runs 2× real time)",
      hlines: [{ trace: 0, value: setpoint, label: `setpoint ${setpoint} °C` }],
    });

    D.meter(ctx, 30, 330, 150, "temperature", `${s.plant.temp.toFixed(1)} °C`, D.COL.amber);
    D.meter(
      ctx,
      195,
      330,
      170,
      "error",
      `${err.toFixed(2)} °C`,
      Math.abs(err) < 1 ? D.COL.good : D.COL.muted
    );
    D.meter(
      ctx,
      380,
      330,
      190,
      "worst overshoot so far",
      `${s.overshoot.toFixed(1)} °C`,
      s.overshoot > 8 ? D.COL.bad : s.overshoot > 2 ? D.COL.amber : D.COL.good
    );
    D.meter(
      ctx,
      585,
      330,
      285,
      "the three terms now",
      `P ${(kp * err).toFixed(0)} · I ${(ki * s.integ).toFixed(0)} · D ${clamp(kd * deriv, -99, 99).toFixed(0)}`,
      D.COL.accent
    );
  };

  return (
    <>
      <SimCanvas width={900} height={390} draw={draw} />
      <Controls>
        <Slider label="Setpoint" min={30} max={90} step={1} value={setpoint} onChange={setSetpoint} fmt={(v) => `${v} °C`} />
        <Slider label="Kp (proportional)" min={0} max={15} step={0.1} value={kp} onChange={setKp} fmt={(v) => v.toFixed(1)} />
        <Slider label="Ki (integral)" min={0} max={3} step={0.05} value={ki} onChange={setKi} fmt={(v) => v.toFixed(2)} />
        <Slider label="Kd (derivative)" min={0} max={8} step={0.1} value={kd} onChange={setKd} fmt={(v) => v.toFixed(1)} />
        <div className="ctl-row">
          <label>Experiment</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={restart}>
              ↺ Restart from cold
            </button>
            <button
              type="button"
              className="seg-btn"
              onClick={() => {
                sim.current.plant.amb = 0;
                sim.current.plant.ambUntil = sim.current.plant.t + 6;
              }}
            >
              🌬 Open a window (6 s)
            </button>
          </div>
        </div>
      </Controls>
      <Readouts>
        <Readout label="Tuning challenge" value="from cold: reach 60 °C with under 2 °C overshoot and zero final error. Then survive the window." tone="amber" />
        <Readout label="What each term is" value="P reacts to the present, I remembers the past (kills offset), D predicts the future (damps the ring)" />
      </Readouts>
    </>
  );
}
