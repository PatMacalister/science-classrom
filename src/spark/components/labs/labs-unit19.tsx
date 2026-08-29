"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Slider } from "@/spark/components/controls";
import { clamp, Scope } from "@/spark/lib/sim/helpers";
import * as D from "@/spark/lib/sim/draw";

/* =====================================================================
 * Lab 19.1 — The H-bridge: four switches, full authority
 * ===================================================================== */

export function HBridgeLab() {
  const [sw, setSw] = useState([false, false, false, false]); // Q1 top-left, Q2 bottom-left, Q3 top-right, Q4 bottom-right
  const [duty, setDuty] = useState(80);
  const [blown, setBlown] = useState(false);
  const sim = useRef({ angle: 0, speed: 0 });

  const shootThrough = (sw[0] && sw[1]) || (sw[2] && sw[3]);
  const forward = sw[0] && sw[3] && !sw[1] && !sw[2];
  const reverse = sw[1] && sw[2] && !sw[0] && !sw[3];
  const braking = (sw[1] && sw[3] && !sw[0] && !sw[2]) || (sw[0] && sw[2] && !sw[1] && !sw[3]);

  if (shootThrough && !blown) setBlown(true);

  const preset = (name: "fwd" | "rev" | "coast" | "brake") => {
    if (name === "fwd") setSw([true, false, false, true]);
    else if (name === "rev") setSw([false, true, true, false]);
    else if (name === "brake") setSw([false, true, false, true]);
    else setSw([false, false, false, false]);
  };

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    const target = blown ? 0 : forward ? (duty / 100) * 6 : reverse ? -(duty / 100) * 6 : 0;
    const decel = braking ? 6 : 0.8; // braking shorts the coil: fast stop
    if (target !== 0) s.speed += (target - s.speed) * dt * 2.5;
    else s.speed -= s.speed * decel * dt;
    s.angle += s.speed * dt;

    // rails
    D.label(ctx, blown ? "+9 V (fuse blown!)" : "+9 V", 450, 30, { color: blown ? D.COL.muted : D.COL.bad, size: 13, bold: true });
    D.wire(ctx, [[250, 45], [650, 45]], blown ? "#3a4757" : D.COL.wire, 2);
    D.wire(ctx, [[250, 315], [650, 315]], D.COL.wire, 2);
    D.ground(ctx, 450, 317);

    // switch drawing helper
    const drawQ = (x: number, y: number, on: boolean, label: string) => {
      ctx.fillStyle = on ? "rgba(71,194,107,0.15)" : "#101825";
      ctx.strokeStyle = on ? D.COL.good : "#33445e";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(x - 32, y - 26, 64, 52, 9);
      ctx.fill();
      ctx.stroke();
      D.label(ctx, label, x, y - 8, { color: on ? D.COL.good : D.COL.muted, size: 12, bold: true });
      D.label(ctx, on ? "ON" : "off", x, y + 12, { color: on ? D.COL.good : "#3a4757", size: 11, mono: true });
    };
    D.wire(ctx, [[250, 45], [250, 315]], "#33445e", 1.5);
    D.wire(ctx, [[650, 45], [650, 315]], "#33445e", 1.5);
    drawQ(250, 110, sw[0], "Q1");
    drawQ(250, 250, sw[1], "Q2");
    drawQ(650, 110, sw[2], "Q3");
    drawQ(650, 250, sw[3], "Q4");

    // motor between the half-bridges
    D.wire(ctx, [[250, 180], [370, 180]], forward && !blown ? D.COL.amber : reverse && !blown ? D.COL.accent : "#33445e", forward || reverse ? 3.5 : 2);
    D.wire(ctx, [[530, 180], [650, 180]], forward && !blown ? D.COL.amber : reverse && !blown ? D.COL.accent : "#33445e", forward || reverse ? 3.5 : 2);
    ctx.strokeStyle = D.COL.text;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(450, 180, 62, 0, Math.PI * 2);
    ctx.stroke();
    // rotor
    for (let k = 0; k < 3; k++) {
      const a = s.angle + (k * 2 * Math.PI) / 3;
      D.wire(ctx, [[450, 180], [450 + Math.cos(a) * 48, 180 + Math.sin(a) * 48]], D.COL.accent, 3);
    }
    D.dot(ctx, 450, 180, 8, D.COL.text);
    D.label(ctx, "M", 450, 262, { color: D.COL.muted, size: 13, bold: true });

    if (shootThrough) {
      D.glow(ctx, sw[0] && sw[1] ? 250 : 650, 180, 70, D.COL.bad, 0.8);
      D.label(ctx, "💥 SHOOT-THROUGH: both switches of one side ON = battery short!", 450, 350, { color: D.COL.bad, size: 14, bold: true });
    }

    D.meter(ctx, 40, 60, 170, "state", blown ? "fuse blown — reset!" : forward ? `forward ${duty}%` : reverse ? `reverse ${duty}%` : braking ? "braking (coil shorted)" : "coasting", blown ? D.COL.bad : forward || reverse ? D.COL.good : D.COL.muted);
    D.meter(ctx, 40, 125, 170, "motor speed", `${Math.abs(s.speed * 9.55).toFixed(0)} rpm ${s.speed > 0.05 ? "→" : s.speed < -0.05 ? "←" : ""}`, D.COL.amber);
    D.meter(ctx, 40, 190, 170, "current path", forward ? "Q1 → M → Q4" : reverse ? "Q3 → M → Q2" : braking ? "M → M (loop)" : "none", D.COL.accent);
  };

  return (
    <>
      <SimCanvas
        width={900}
        height={380}
        draw={draw}
        onClick={(p) => {
          const hits: Array<[number, number, number]> = [[250, 110, 0], [250, 250, 1], [650, 110, 2], [650, 250, 3]];
          for (const [x, y, i] of hits) {
            if (Math.abs(p.x - x) < 36 && Math.abs(p.y - y) < 30) {
              setSw((old) => old.map((v, k) => (k === i ? !v : v)));
            }
          }
        }}
      />
      <Controls>
        <div className="ctl-row">
          <label>Presets</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={() => preset("fwd")}>▶ Forward</button>
            <button type="button" className="seg-btn" onClick={() => preset("rev")}>◀ Reverse</button>
            <button type="button" className="seg-btn" onClick={() => preset("coast")}>〰 Coast</button>
            <button type="button" className="seg-btn" onClick={() => preset("brake")}>■ Brake</button>
            <button type="button" className="seg-btn" onClick={() => { setBlown(false); preset("coast"); }}>🔧 Replace fuse</button>
          </div>
        </div>
        <Slider label="PWM duty (speed)" min={10} max={100} step={1} value={duty} onChange={setDuty} fmt={(v) => `${v}%`} />
      </Controls>
      <Readouts>
        <Readout label="The four verbs" value="diagonal pairs drive each direction · shorting the motor brakes it · all-off coasts" tone="amber" />
        <Readout label="Click the switches yourself" value="and discover why driver chips add hardware interlocks against shoot-through — one wrong click is a dead battery" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 19.2 — Servos & steppers: motion you can command
 * ===================================================================== */

export function ServoStepperLab() {
  const [pulseMs, setPulseMs] = useState(1.5);
  const [autoStep, setAutoStep] = useState(0);
  const sim = useRef({ servoAngle: 0, stepIdx: 0, stepAngle: 0, stepAcc: 0 });

  const stepOnce = (dir: 1 | -1) => {
    sim.current.stepIdx = (sim.current.stepIdx + dir + 4) % 4;
    sim.current.stepAngle += dir * (Math.PI / 2 / 12.5); // 50 steps/rev feel
  };

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;

    /* --- servo panel --- */
    const target = ((pulseMs - 1.5) / 0.5) * (Math.PI / 2); // 1.0–2.0 ms → ±90°
    s.servoAngle += (target - s.servoAngle) * clamp(6 * dt, 0, 1); // internal P-loop
    const scx = 230, scy = 170;
    ctx.fillStyle = "#101825";
    ctx.strokeStyle = "#33445e";
    ctx.beginPath();
    ctx.roundRect(scx - 80, scy - 45, 160, 95, 10);
    ctx.fill();
    ctx.stroke();
    D.label(ctx, "hobby servo", scx, scy + 70, { color: D.COL.muted, size: 12 });
    // horn
    const ha = -Math.PI / 2 + s.servoAngle;
    D.wire(ctx, [[scx, scy], [scx + Math.cos(ha) * 95, scy + Math.sin(ha) * 95]], D.COL.amber, 6);
    D.dot(ctx, scx, scy, 10, D.COL.text);
    D.label(ctx, `${((s.servoAngle * 180) / Math.PI).toFixed(0)}°`, scx, scy - 60, { color: D.COL.amber, size: 14, bold: true, mono: true });
    // pulse train
    const py = 300;
    D.label(ctx, `command: ${pulseMs.toFixed(2)} ms pulse, every 20 ms`, 230, py - 24, { color: D.COL.accent, size: 11 });
    ctx.strokeStyle = D.COL.accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    let x = 60;
    for (let k = 0; k < 3; k++) {
      const hi = pulseMs * 14;
      ctx.moveTo(x, py + 20);
      ctx.lineTo(x, py);
      ctx.lineTo(x + hi, py);
      ctx.lineTo(x + hi, py + 20);
      ctx.lineTo(x + 20 * 14 * 0.4, py + 20);
      x += 115;
    }
    ctx.stroke();
    D.label(ctx, "inside: a pot on the shaft + a P-controller (Lesson 14.1 in a $3 can)", 230, py + 44, { color: "rgba(148,163,179,0.6)", size: 10 });

    /* --- stepper panel --- */
    if (autoStep !== 0) {
      s.stepAcc += Math.abs(autoStep) * dt;
      while (s.stepAcc >= 1) {
        s.stepAcc -= 1;
        stepOnce(autoStep > 0 ? 1 : -1);
      }
    }
    const tcx = 650, tcy = 170;
    ctx.strokeStyle = "#33445e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(tcx, tcy, 78, 0, Math.PI * 2);
    ctx.stroke();
    const coilNames = ["A", "B", "A'", "B'"];
    for (let k = 0; k < 4; k++) {
      const a = -Math.PI / 2 + (k * Math.PI) / 2;
      const on = s.stepIdx === k;
      const cx2 = tcx + Math.cos(a) * 100, cy2 = tcy + Math.sin(a) * 100;
      D.glow(ctx, cx2, cy2, 26, D.COL.amber, on ? 0.75 : 0);
      D.dot(ctx, cx2, cy2, 14, on ? D.COL.amber : "#2a3646");
      D.label(ctx, coilNames[k], cx2, cy2 + 1, { color: on ? "#0b0f14" : D.COL.muted, size: 11, bold: true });
    }
    // rotor arrow
    const ra = -Math.PI / 2 + s.stepAngle;
    D.arrow(ctx, tcx - Math.cos(ra) * 48, tcy - Math.sin(ra) * 48, tcx + Math.cos(ra) * 52, tcy + Math.sin(ra) * 52, D.COL.accent, 5, 12);
    D.label(ctx, "stepper — the rotor snaps to whichever coil is energised", 650, 290, { color: D.COL.muted, size: 11 });
    D.label(ctx, `coil sequence position: ${s.stepIdx + 1}/4 · digital motion, no sensor needed`, 650, 312, { color: "rgba(148,163,179,0.6)", size: 10 });
  };

  return (
    <>
      <SimCanvas width={900} height={370} draw={draw} />
      <Controls>
        <Slider label="Servo pulse width" min={1.0} max={2.0} step={0.01} value={pulseMs} onChange={setPulseMs} fmt={(v) => `${v.toFixed(2)} ms`} />
        <div className="ctl-row">
          <label>Stepper</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={() => stepOnce(-1)}>⟲ step</button>
            <button type="button" className="seg-btn" onClick={() => stepOnce(1)}>step ⟳</button>
          </div>
        </div>
        <Slider label="Stepper auto-run" min={-30} max={30} step={1} value={autoStep} onChange={setAutoStep} fmt={(v) => (v === 0 ? "stopped" : `${v} steps/s`)} />
      </Controls>
      <Readouts>
        <Readout label="Two philosophies" value="servo: analog feedback loop chasing a commanded angle · stepper: open-loop digital clicks you can count" tone="amber" />
        <Readout label="Where each lives" value="servos steer RC cars and robot arms; steppers move 3D printers — position by counting, no encoder (usually…)" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 19.3 — Quadrature encoders: how machines know where they are
 * ===================================================================== */

export function EncoderLab() {
  const [speed, setSpeed] = useState(1.2);
  const sim = useRef({
    angle: 0,
    lastA: false,
    count: 0,
    t: 0,
    scope: new Scope(
      [
        { label: "channel A", color: "#4cc9f0", min: 1.2 - 4, max: 1.2 },
        { label: "channel B", color: "#f6b26b", min: 2.7 - 4, max: 2.7 },
      ],
      4
    ),
  });

  const SLOTS = 8;

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    s.t += dt;
    s.angle += speed * dt;

    const phase = s.angle * SLOTS;
    const a = Math.sin(phase * Math.PI) > 0;
    const b = Math.sin(phase * Math.PI - Math.PI / 2) > 0;
    // count on A's rising edge, direction from B
    if (a && !s.lastA) s.count += b ? -1 : 1;
    s.lastA = a;
    s.scope.push(s.t, [a ? 1 : 0, b ? 1 : 0]);

    // the slotted disc
    const cx = 170, cy = 165, r = 105;
    ctx.strokeStyle = "#33445e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    for (let k = 0; k < SLOTS; k++) {
      const a0 = s.angle + (k * 2 * Math.PI) / SLOTS;
      ctx.fillStyle = "#2a3646";
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a0) * 55, cy + Math.sin(a0) * 55);
      ctx.arc(cx, cy, r - 6, a0, a0 + Math.PI / SLOTS);
      ctx.closePath();
      ctx.fill();
    }
    D.dot(ctx, cx, cy, 12, D.COL.text);
    // two sensors, offset quarter-slot
    D.dot(ctx, cx + r - 18, cy - 12, 7, a ? D.COL.accent : "#22303f");
    D.dot(ctx, cx + r - 18, cy + 12, 7, b ? D.COL.amber : "#3a2f22");
    D.label(ctx, "A", cx + r + 4, cy - 12, { color: D.COL.accent, size: 11, bold: true });
    D.label(ctx, "B", cx + r + 4, cy + 12, { color: D.COL.amber, size: 11, bold: true });
    D.label(ctx, "two sensors, offset a quarter slot", cx, cy + r + 26, { color: D.COL.muted, size: 11 });

    s.scope.draw(ctx, 350, 30, 530, 210, { timeLabel: "0.67 s/div — quadrature: 90° apart" });

    D.meter(ctx, 350, 260, 160, "position count", String(s.count), D.COL.accent);
    D.meter(ctx, 525, 260, 170, "direction", speed > 0.02 ? "→ A leads B" : speed < -0.02 ? "← B leads A" : "stopped", speed > 0.02 ? D.COL.good : speed < -0.02 ? D.COL.amber : D.COL.muted);
    D.meter(ctx, 710, 260, 165, "the rule", "count on A's edge, read B for sign", D.COL.muted);
    D.label(ctx, "reverse the wheel and watch which channel leads — that quarter-slot offset is the whole trick", 615, 330, {
      color: "rgba(148,163,179,0.6)",
      size: 11,
    });
  };

  return (
    <>
      <SimCanvas width={900} height={350} draw={draw} />
      <Controls>
        <Slider label="Wheel speed" min={-4} max={4} step={0.05} value={speed} onChange={setSpeed} fmt={(v) => `${v.toFixed(2)} rev/s`} />
      </Controls>
      <Readouts>
        <Readout label="Digital odometry" value="each slot edge is a click of distance; which channel leads is the direction — flip-flop logic (7.3) decodes it" tone="amber" />
        <Readout label="Where it lives" value="mouse wheels, printer carriages, robot wheels, factory arms — anything that must know where it is" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 19.4 — Capstone twin: the line follower, tunable and crashable
 * ===================================================================== */

const TRACK: Array<[number, number]> = [];
for (let i = 0; i <= 260; i++) {
  const t = (i / 260) * Math.PI * 2;
  TRACK.push([
    450 + 300 * Math.cos(t) + 60 * Math.cos(3 * t),
    195 + 120 * Math.sin(t) + 24 * Math.sin(2 * t),
  ]);
}

function lineIntensity(x: number, y: number): number {
  let best = 1e9;
  for (let i = 0; i < TRACK.length; i += 2) {
    const dx = x - TRACK[i][0];
    const dy = y - TRACK[i][1];
    const d = dx * dx + dy * dy;
    if (d < best) best = d;
  }
  return Math.exp(-best / (2 * 10 * 10)); // 1 on the line, →0 off it
}

export function LineFollowerLab() {
  const [base, setBase] = useState(90);
  const [kp, setKp] = useState(60);
  const [kd, setKd] = useState(25);
  const sim = useRef({ x: TRACK[0][0], y: TRACK[0][1], heading: Math.PI / 2, lastErr: 0, lost: 0, laps: 0, prog: 0 });

  const reset = () => {
    const s = sim.current;
    s.x = TRACK[0][0];
    s.y = TRACK[0][1];
    s.heading = Math.PI / 2;
    s.lastErr = 0;
    s.lost = 0;
  };

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;

    // track
    ctx.strokeStyle = "#0e1420";
    ctx.lineWidth = 22;
    ctx.lineJoin = "round";
    ctx.beginPath();
    TRACK.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = "#1f2c3f";
    ctx.lineWidth = 18;
    ctx.stroke();

    // sensors ahead-left and ahead-right of the nose
    const sensorAt = (side: number) => {
      const sx = s.x + Math.cos(s.heading) * 26 + Math.cos(s.heading + Math.PI / 2) * side * 13;
      const sy = s.y + Math.sin(s.heading) * 26 + Math.sin(s.heading + Math.PI / 2) * side * 13;
      return { sx, sy, v: lineIntensity(sx, sy) };
    };
    const L = sensorAt(-1);
    const R = sensorAt(1);

    const err = R.v - L.v; // positive: line is to the right
    const derr = (err - s.lastErr) / Math.max(dt, 1e-3);
    s.lastErr = err;
    const seeing = Math.max(L.v, R.v) > 0.08;
    if (!seeing) s.lost += dt;
    else s.lost = 0;

    const steer = (kp * err + (kd / 10) * derr * 0.1) * (seeing ? 1 : 1.6);
    // line to the right (err > 0) → left wheel faster → robot turns right, toward it
    const vL = base + steer;
    const vR = base - steer;
    const v = (vL + vR) / 2;
    // differential drive turns toward the SLOWER wheel; +omega = clockwise on screen
    const omega = (vL - vR) / 28;
    s.heading += omega * dt;
    s.x += Math.cos(s.heading) * v * dt;
    s.y += Math.sin(s.heading) * v * dt;

    if (s.lost > 2.5 || s.x < 10 || s.x > 890 || s.y < 10 || s.y > 380) reset();

    // robot
    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.rotate(s.heading);
    ctx.fillStyle = "#22405a";
    ctx.strokeStyle = D.COL.accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-20, -15, 40, 30, 6);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#0b0f14";
    ctx.fillRect(-14, -19, 16, 5);
    ctx.fillRect(-14, 14, 16, 5);
    ctx.restore();
    D.dot(ctx, L.sx, L.sy, 5, L.v > 0.35 ? D.COL.good : "#2a3646");
    D.dot(ctx, R.sx, R.sy, 5, R.v > 0.35 ? D.COL.good : "#2a3646");

    D.meter(ctx, 20, 20, 170, "sensors L / R", `${L.v.toFixed(2)} / ${R.v.toFixed(2)}`, D.COL.accent);
    D.meter(ctx, 20, 80, 170, "steering (PD)", steer.toFixed(1), D.COL.amber);
    D.meter(ctx, 20, 140, 170, "wheel speeds", `${vL.toFixed(0)} | ${vR.toFixed(0)}`, D.COL.muted);
    D.meter(
      ctx,
      20,
      200,
      170,
      "status",
      !seeing ? `line lost ${s.lost.toFixed(1)}s…` : "tracking ✓",
      !seeing ? D.COL.bad : D.COL.good
    );
  };

  return (
    <>
      <SimCanvas width={900} height={390} draw={draw} />
      <Controls>
        <Slider label="Base speed" min={30} max={220} step={5} value={base} onChange={setBase} fmt={(v) => String(v)} />
        <Slider label="Steering Kp" min={0} max={200} step={5} value={kp} onChange={setKp} fmt={(v) => String(v)} />
        <Slider label="Damping Kd" min={0} max={100} step={5} value={kd} onChange={setKd} fmt={(v) => String(v)} />
        <div className="ctl-row">
          <label>Robot</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={reset}>↺ Back to start</button>
          </div>
        </div>
      </Controls>
      <Readouts>
        <Readout label="This is Lesson 14.2 on wheels" value="error = right sensor − left sensor · steering = Kp·e + Kd·de/dt · left wheel = base + steering, right = base − steering" tone="amber" />
        <Readout label="The game" value="crank base speed and retune: too little Kp corners wide, too much snakes, Kd calms the snake. Find your fastest clean lap." />
      </Readouts>
    </>
  );
}
