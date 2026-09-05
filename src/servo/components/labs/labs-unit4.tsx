"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider } from "@/servo/components/controls";
import { clamp } from "@/servo/lib/sim/helpers";
import { tl as translate } from "@/servo/lib/labStrings";
import * as D from "@/servo/lib/sim/draw";

const L1 = 110;
const L2 = 90;

/* =====================================================================
 * Lab 4.1 — The two-link sandbox: forward kinematics and the workspace
 * ring the hand can never leave.
 * ===================================================================== */

export function ArmLab() {
  const [th1, setTh1] = useState(60);
  const [th2, setTh2] = useState(45);
  // the trace lives outside React state: appended per frame, never re-renders
  const trace = useRef<Array<[number, number]>>([]);

  const r1 = (th1 * Math.PI) / 180;
  const r2 = (th2 * Math.PI) / 180;
  const ex = L1 * Math.cos(r1) + L2 * Math.cos(r1 + r2);
  const ey = L1 * Math.sin(r1) + L2 * Math.sin(r1 + r2);

  const draw = (ctx: CanvasRenderingContext2D) => {
    const ox = 450;
    const oy = 300;

    // workspace annulus
    ctx.fillStyle = "rgba(56,189,248,0.07)";
    ctx.beginPath();
    ctx.arc(ox, oy, L1 + L2, 0, Math.PI * 2);
    ctx.arc(ox, oy, Math.abs(L1 - L2), 0, Math.PI * 2, true);
    ctx.fill();
    D.ring(ctx, ox, oy, L1 + L2, "rgba(56,189,248,0.35)", 1.5);
    D.ring(ctx, ox, oy, Math.abs(L1 - L2), "rgba(56,189,248,0.35)", 1.5);
    D.label(ctx, translate("outer edge: arm straight"), ox + L1 + L2 - 10, oy - 12, { size: 9, color: D.COL.muted, align: "right" });
    D.label(ctx, translate("inner edge: arm folded"), ox, oy - Math.abs(L1 - L2) - 10, { size: 9, color: D.COL.muted });

    // the trace of everywhere the hand has been
    const pts = trace.current;
    for (let i = 0; i < pts.length; i++) {
      const alpha = 0.05 + 0.4 * (i / pts.length);
      D.dot(ctx, ox + pts[i][0], oy - pts[i][1], 2, `rgba(246,178,107,${alpha})`);
    }
    if (pts.length === 0 || Math.hypot(pts[pts.length - 1][0] - ex, pts[pts.length - 1][1] - ey) > 3) {
      pts.push([ex, ey]);
      if (pts.length > 600) pts.shift();
    }

    // the arm (canvas y runs down; the model's y runs up)
    const jx = ox + L1 * Math.cos(r1);
    const jy = oy - L1 * Math.sin(r1);
    const hx = ox + ex;
    const hy = oy - ey;
    D.wire(ctx, [[ox, oy], [jx, jy]], D.COL.accent, 8);
    D.wire(ctx, [[jx, jy], [hx, hy]], D.COL.good, 6);
    D.dot(ctx, ox, oy, 11, D.COL.text);
    D.dot(ctx, jx, jy, 8, D.COL.accent);
    D.dot(ctx, hx, hy, 7, D.COL.amber);
    D.label(ctx, translate("shoulder"), ox, oy + 22, { size: 9, color: D.COL.muted });
    D.label(ctx, translate("elbow"), jx + 16, jy - 10, { size: 9, color: D.COL.muted, align: "left" });
    D.label(ctx, `(${ex.toFixed(0)}, ${ey.toFixed(0)})`, hx, hy - 18, { size: 11, mono: true, color: D.COL.amber });

    D.meter(ctx, 20, 8, 170, "hand x", `${ex.toFixed(0)} px`, D.COL.accent);
    D.meter(ctx, 200, 8, 170, "hand y", `${ey.toFixed(0)} px`, D.COL.accent);
    D.meter(ctx, 380, 8, 190, "reach", `${Math.hypot(ex, ey).toFixed(0)} / ${L1 + L2} px`, D.COL.good);
  };

  return (
    <>
      <SimCanvas width={900} height={520} draw={draw} label="A two-link arm with its workspace annulus and a trace of visited hand positions" />
      <Controls>
        <Slider label="Shoulder θ₁" min={0} max={180} step={1} value={th1} onChange={setTh1} fmt={(v) => `${v}°`} />
        <Slider label="Elbow θ₂" min={-150} max={150} step={1} value={th2} onChange={setTh2} fmt={(v) => `${v}°`} />
      </Controls>
      <Readouts>
        <Readout label="Forward kinematics" value={`x = ${ex.toFixed(0)}, y = ${ey.toFixed(0)}`} tone="good" />
        <Readout label="Formula" value="x = L₁cos θ₁ + L₂cos(θ₁+θ₂)" tone="amber" />
        <Readout label="Workspace" value={`${translate("ring from")} ${Math.abs(L1 - L2)} ${translate("to")} ${L1 + L2} px`} />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 4.2 — The target range: closed-form IK with elbow-up/down, the
 * unreachable rim, and a singularity meter.
 * ===================================================================== */

export function IkLab() {
  const [tx, setTx] = useState(120);
  const [ty, setTy] = useState(80);
  const [elbow, setElbow] = useState<"up" | "down">("up");

  const d2 = tx * tx + ty * ty;
  const d = Math.sqrt(d2);
  const c2 = (d2 - L1 * L1 - L2 * L2) / (2 * L1 * L2);
  const reachable = c2 >= -1 && c2 <= 1 && d > 1;
  const th2 = reachable ? (elbow === "up" ? 1 : -1) * Math.acos(clamp(c2, -1, 1)) : 0;
  const th1 = reachable ? Math.atan2(ty, tx) - Math.atan2(L2 * Math.sin(th2), L1 + L2 * Math.cos(th2)) : Math.atan2(ty, tx);
  // manipulability collapses as sin θ₂ → 0 (arm straight or folded)
  const manip = reachable ? Math.abs(Math.sin(th2)) : 0;
  const nearSingular = reachable && manip < 0.25;

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const ox = 450;
    const oy = 300;

    ctx.fillStyle = "rgba(56,189,248,0.07)";
    ctx.beginPath();
    ctx.arc(ox, oy, L1 + L2, 0, Math.PI * 2);
    ctx.arc(ox, oy, Math.abs(L1 - L2), 0, Math.PI * 2, true);
    ctx.fill();
    D.ring(ctx, ox, oy, L1 + L2, "rgba(56,189,248,0.35)", 1.5);
    D.ring(ctx, ox, oy, Math.abs(L1 - L2), "rgba(56,189,248,0.35)", 1.5);

    // the target
    const txp = ox + tx;
    const typ = oy - ty;
    D.ring(ctx, txp, typ, 10 + 2 * Math.sin(t * 4), reachable ? D.COL.good : D.COL.bad, 2);
    D.dot(ctx, txp, typ, 4, reachable ? D.COL.good : D.COL.bad);
    if (!reachable) D.label(ctx, translate("unreachable — cos θ₂ left [−1, 1]"), txp, typ - 22, { size: 10, bold: true, color: D.COL.bad });

    // the arm at the IK solution (or stretched toward a hopeless target)
    const a1 = th1;
    const a2 = th2;
    const jx = ox + L1 * Math.cos(a1);
    const jy = oy - L1 * Math.sin(a1);
    const hx = jx + L2 * Math.cos(a1 + a2);
    const hy = jy - L2 * Math.sin(a1 + a2);
    D.wire(ctx, [[ox, oy], [jx, jy]], nearSingular ? D.COL.amber : D.COL.accent, 8);
    D.wire(ctx, [[jx, jy], [hx, hy]], nearSingular ? D.COL.amber : D.COL.good, 6);
    D.dot(ctx, ox, oy, 11, D.COL.text);
    D.dot(ctx, jx, jy, 8, D.COL.accent);
    D.dot(ctx, hx, hy, 7, D.COL.amber);

    // ghost of the other elbow solution
    if (reachable && manip > 0.02) {
      const g2 = -th2;
      const g1 = Math.atan2(ty, tx) - Math.atan2(L2 * Math.sin(g2), L1 + L2 * Math.cos(g2));
      const gjx = ox + L1 * Math.cos(g1);
      const gjy = oy - L1 * Math.sin(g1);
      ctx.setLineDash([4, 6]);
      D.wire(ctx, [[ox, oy], [gjx, gjy]], "rgba(139,151,167,0.4)", 4);
      D.wire(ctx, [[gjx, gjy], [hx, hy]], "rgba(139,151,167,0.4)", 3);
      ctx.setLineDash([]);
      D.label(ctx, translate("the other answer"), gjx + 14, gjy + 14, { size: 9, color: D.COL.muted, align: "left" });
    }

    D.meter(ctx, 20, 8, 170, "θ₁", reachable ? `${((th1 * 180) / Math.PI).toFixed(1)}°` : "—", D.COL.accent);
    D.meter(ctx, 200, 8, 170, "θ₂", reachable ? `${((th2 * 180) / Math.PI).toFixed(1)}°` : "—", D.COL.accent);
    D.meter(ctx, 380, 8, 200, "target distance", `${d.toFixed(0)} / ${L1 + L2} px`, reachable ? D.COL.good : D.COL.bad);
    D.meter(ctx, 590, 8, 200, "manipulability", `${(manip * 100).toFixed(0)} %`, nearSingular ? D.COL.bad : D.COL.good);
    if (nearSingular) {
      D.label(ctx, translate("singularity: near-straight arm, joints must thrash"), ox, oy + L1 + L2 + 24, { size: 11, bold: true, color: D.COL.amber });
    }
  };

  return (
    <>
      <SimCanvas width={900} height={540} draw={draw} label="Inverse kinematics solving a draggable target, with the mirror solution ghosted" />
      <Controls>
        <Slider label="Target x" min={-200} max={200} step={2} value={tx} onChange={setTx} fmt={(v) => `${v} px`} />
        <Slider label="Target y" min={-200} max={200} step={2} value={ty} onChange={setTy} fmt={(v) => `${v} px`} />
        <Segmented
          label="Elbow"
          options={[
            { value: "up", label: "elbow-up" },
            { value: "down", label: "elbow-down" },
          ]}
          value={elbow}
          onChange={setElbow}
        />
      </Controls>
      <Readouts>
        <Readout label="IK verdict" value={reachable ? "solved — two ways" : "unreachable"} tone={reachable ? "good" : "warn"} />
        <Readout label="cos θ₂" value={c2.toFixed(2)} tone={reachable ? undefined : "warn"} />
        <Readout label="Singularity" value={nearSingular ? "close — route around this pose" : "comfortably away"} tone={nearSingular ? "warn" : "good"} />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 4.3 — The egg test: the grasp window between slipping and
 * crushing, and what compliance buys.
 * ===================================================================== */

const OBJECTS = {
  steel: { label: "steel cube", mass: 0.5, mu: 0.5, crush: 400, w: 54, color: "#8fa0b3" },
  apple: { label: "apple", mass: 0.2, mu: 0.6, crush: 30, w: 48, color: "#e05e5e" },
  egg: { label: "egg", mass: 0.06, mu: 0.4, crush: 5, w: 38, color: "#efe6d0" },
  cup: { label: "paper cup", mass: 0.012, mu: 0.5, crush: 1.5, w: 42, color: "#d8d2e8" },
} as const;

type ObjKey = keyof typeof OBJECTS;

export function GripLab() {
  const [objKey, setObjKey] = useState<ObjKey>("egg");
  const [force, setForce] = useState(1.5);
  const [soft, setSoft] = useState<"rigid" | "compliant">("rigid");
  const [wet, setWet] = useState<"dry" | "wet">("dry");

  const obj = OBJECTS[objKey];
  const mu = (wet === "wet" ? obj.mu * 0.5 : obj.mu) + (soft === "compliant" ? 0.15 : 0);
  const crush = obj.crush * (soft === "compliant" ? 1.5 : 1);
  const floor = (obj.mass * 9.81) / (2 * mu);
  const winWidth = crush - floor;
  const state = force < floor ? "slips" : force > crush ? "crushed" : "holds";

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const gx = 260;
    const gy = 130;

    // gripper: two fingers descending from a carriage
    ctx.fillStyle = "#233248";
    ctx.beginPath();
    ctx.roundRect(gx - 70, gy - 90, 140, 28, 6);
    ctx.fill();
    const gap = obj.w / 2 + (state === "crushed" ? -6 : 4);
    const fingerLen = 84;
    for (const s of [-1, 1]) {
      ctx.fillStyle = soft === "compliant" ? "#3f6b52" : "#3a4a63";
      ctx.beginPath();
      ctx.roundRect(gx + s * gap - (s > 0 ? 0 : 12), gy - 66, 12, fingerLen, 5);
      ctx.fill();
      if (soft === "compliant") {
        ctx.fillStyle = "rgba(74,222,128,0.35)";
        ctx.beginPath();
        ctx.roundRect(gx + s * gap - (s > 0 ? -1 : 8), gy - 30, 7, 44, 3);
        ctx.fill();
      }
    }

    // the object: held, sliding down, or flattened
    const slipDrop = state === "slips" ? ((t * 90) % 200) : 0;
    const oyy = gy + slipDrop;
    const squash = state === "crushed" ? 0.45 : 1;
    ctx.fillStyle = obj.color;
    ctx.beginPath();
    if (objKey === "egg") {
      ctx.ellipse(gx, oyy, (obj.w / 2) * (state === "crushed" ? 1.35 : 1), 26 * squash, 0, 0, Math.PI * 2);
    } else {
      ctx.roundRect(gx - obj.w / 2, oyy - 24 * squash, obj.w, 48 * squash, objKey === "cup" ? 8 : 4);
    }
    ctx.fill();
    if (state === "crushed") {
      D.label(ctx, "💥", gx, oyy - 40, { size: 20 });
      for (let i = 0; i < 5; i++) D.dot(ctx, gx - 30 + i * 15, oyy + 30 + (i % 2) * 8, 2.5, obj.color);
    }
    if (state === "slips") D.label(ctx, translate("slipping…"), gx + 60, oyy, { size: 11, color: D.COL.amber, align: "left" });
    // table
    D.wire(ctx, [[gx - 140, gy + 210], [gx + 140, gy + 210]], "#33445e", 3);

    // the grasp window, drawn to scale (log axis for the steel cube's sake)
    const wx = 520;
    const wy = 60;
    const ww = 330;
    D.panel(ctx, wx - 20, wy - 20, ww + 40, 220);
    D.label(ctx, translate("the grasp window"), wx + ww / 2, wy, { size: 12, bold: true, color: D.COL.text });
    const fMax = Math.max(crush * 1.3, 12);
    const xOf = (f: number) => wx + Math.sqrt(clamp(f / fMax, 0, 1)) * ww;
    // bands
    ctx.fillStyle = "rgba(242,109,109,0.18)";
    ctx.fillRect(wx, wy + 40, xOf(floor) - wx, 60);
    ctx.fillStyle = "rgba(74,222,128,0.2)";
    ctx.fillRect(xOf(floor), wy + 40, xOf(Math.min(crush, fMax)) - xOf(floor), 60);
    ctx.fillStyle = "rgba(242,109,109,0.18)";
    ctx.fillRect(xOf(Math.min(crush, fMax)), wy + 40, wx + ww - xOf(Math.min(crush, fMax)), 60);
    D.label(ctx, translate("slips"), (wx + xOf(floor)) / 2, wy + 70, { size: 10, color: D.COL.bad });
    D.label(ctx, translate("holds"), (xOf(floor) + xOf(Math.min(crush, fMax))) / 2, wy + 70, { size: 11, bold: true, color: D.COL.good });
    D.label(ctx, translate("crushes"), (xOf(Math.min(crush, fMax)) + wx + ww) / 2, wy + 70, { size: 10, color: D.COL.bad });
    // markers
    const mark = (f: number, name: string, color: string, up: boolean) => {
      const x = xOf(f);
      D.wire(ctx, [[x, wy + 34], [x, wy + 106]], color, 2);
      D.label(ctx, `${name} ${f.toFixed(2)} N`, x, up ? wy + 24 : wy + 120, { size: 9, color });
    };
    mark(floor, translate("floor"), D.COL.amber, true);
    if (crush <= fMax) mark(crush, translate("ceiling"), D.COL.bad, true);
    mark(force, translate("your grip"), D.COL.text, false);
    D.label(
      ctx,
      `${translate("window width")}: ${winWidth > 0 ? winWidth.toFixed(1) + " N" : translate("closed!")}`,
      wx + ww / 2,
      wy + 160,
      { size: 12, bold: true, color: winWidth > 2 ? D.COL.good : winWidth > 0 ? D.COL.amber : D.COL.bad }
    );
  };

  return (
    <>
      <SimCanvas width={900} height={370} draw={draw} label="A two-finger gripper squeezing an object, with the slip–hold–crush window drawn to scale" />
      <Controls>
        <Segmented
          label="Object"
          options={[
            { value: "steel", label: "steel cube" },
            { value: "apple", label: "apple" },
            { value: "egg", label: "egg" },
            { value: "cup", label: "paper cup" },
          ]}
          value={objKey}
          onChange={setObjKey}
        />
        <Slider label="Grip force" min={0} max={12} step={0.1} value={force} onChange={setForce} fmt={(v) => `${v.toFixed(1)} N`} />
        <Segmented
          label="Fingertips"
          options={[
            { value: "rigid", label: "rigid" },
            { value: "compliant", label: "compliant" },
          ]}
          value={soft}
          onChange={setSoft}
        />
        <Segmented
          label="Surface"
          options={[
            { value: "dry", label: "dry" },
            { value: "wet", label: "wet" },
          ]}
          value={wet}
          onChange={setWet}
        />
      </Controls>
      <Readouts>
        <Readout
          label="Outcome"
          value={state === "holds" ? "holds — inside the window" : state === "slips" ? "slips — below the friction floor" : "crushed — above the ceiling"}
          tone={state === "holds" ? "good" : "warn"}
        />
        <Readout label="Window" value={winWidth > 0 ? `${floor.toFixed(2)} – ${crush.toFixed(1)} N` : "closed — no safe grip exists"} tone={winWidth > 0 ? undefined : "warn"} />
        <Readout label="Rule" value="hold = µ · grip · 2 ≥ m·g" tone="amber" />
      </Readouts>
    </>
  );
}
