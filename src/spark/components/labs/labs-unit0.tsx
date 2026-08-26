"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Slider } from "@/spark/components/controls";
import { clamp, fmtSI, fmtSci, polyPath, Flow } from "@/spark/lib/sim/helpers";
import * as D from "@/spark/lib/sim/draw";

const K_COULOMB = 8.99e9;
const E_CHARGE = 1.602e-19;

/* =====================================================================
 * Lab 0.1 — Coulomb's law playground: drag two charges, feel the force
 * ===================================================================== */

const PX_TO_M = 0.0005; // 1 px = 0.5 mm, so the 900 px scene is 45 cm wide

export function CoulombLab() {
  const [q1, setQ1] = useState(3);
  const [q2, setQ2] = useState(-3);
  const sim = useRef({
    p1: { x: 300, y: 230 },
    p2: { x: 600, y: 230 },
    drag: 0 as 0 | 1 | 2,
  });

  const chargeRadius = (q: number) => 14 + 2.2 * Math.abs(q);

  const draw = (ctx: CanvasRenderingContext2D) => {
    const { p1, p2 } = sim.current;
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const distPx = Math.max(1, Math.hypot(dx, dy));
    const rM = distPx * PX_TO_M;
    const force = (K_COULOMB * Math.abs(q1 * q2) * 1e-12) / (rM * rM);
    const repel = q1 * q2 > 0;
    const active = q1 !== 0 && q2 !== 0;

    // faint grid
    ctx.strokeStyle = "rgba(148,163,179,0.07)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 60; x < 900; x += 60) {
      ctx.moveTo(x, 70);
      ctx.lineTo(x, 420);
    }
    for (let y = 90; y < 420; y += 60) {
      ctx.moveTo(0, y);
      ctx.lineTo(900, y);
    }
    ctx.stroke();

    // separation line
    ctx.setLineDash([6, 6]);
    D.wire(ctx, [[p1.x, p1.y], [p2.x, p2.y]], "rgba(148,163,179,0.4)", 1.5);
    ctx.setLineDash([]);
    D.label(ctx, `r = ${(rM * 100).toFixed(1)} cm`, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2 - 14, {
      color: D.COL.muted,
      size: 12,
    });

    // force arrows
    if (active) {
      const ux = dx / distPx; // unit vector from charge 1 towards charge 2
      const uy = dy / distPx;
      const len = clamp(30 + 24 * Math.log10(force), 12, 130);
      const col = repel ? D.COL.bad : D.COL.accent;
      // force on charge 1: repel pushes it away from charge 2 (−u), attract pulls it towards (+u)
      const s1 = repel ? -1 : 1;
      const s2 = -s1; // charge 2 feels the equal and opposite force
      const r1 = chargeRadius(q1);
      const r2 = chargeRadius(q2);
      D.arrow(ctx, p1.x + ux * s1 * r1, p1.y + uy * s1 * r1, p1.x + ux * s1 * (r1 + len), p1.y + uy * s1 * (r1 + len), col, 3);
      D.arrow(ctx, p2.x + ux * s2 * r2, p2.y + uy * s2 * r2, p2.x + ux * s2 * (r2 + len), p2.y + uy * s2 * (r2 + len), col, 3);
    }

    // charges
    for (const [p, q, name] of [
      [p1, q1, "q₁"],
      [p2, q2, "q₂"],
    ] as const) {
      const r = chargeRadius(q);
      const col = q > 0 ? D.COL.bad : q < 0 ? D.COL.accent : "#5a6b7d";
      D.glow(ctx, p.x, p.y, r * 2.4, col, Math.abs(q) / 14);
      D.dot(ctx, p.x, p.y, r, col);
      D.label(ctx, q > 0 ? "+" : q < 0 ? "−" : "0", p.x, p.y + 1, {
        color: "#0b0f14",
        size: 18,
        bold: true,
      });
      D.label(ctx, `${name} = ${q} µC`, p.x, p.y + r + 16, { color: D.COL.muted, size: 12 });
    }

    // meters
    D.meter(ctx, 20, 14, 150, "distance r", `${(rM * 100).toFixed(1)} cm`);
    D.meter(ctx, 185, 14, 170, "force F", active ? fmtSI(force, "N") : "0 N", D.COL.amber);
    D.meter(
      ctx,
      370,
      14,
      170,
      "interaction",
      active ? (repel ? "REPEL ⟷" : "ATTRACT ⟶⟵") : "—",
      active ? (repel ? D.COL.bad : D.COL.accent) : D.COL.muted
    );
    D.label(ctx, "drag the charges around", 760, 34, { color: "rgba(148,163,179,0.5)", size: 12 });
  };

  const hit = (x: number, y: number) => {
    const { p1, p2 } = sim.current;
    if (Math.hypot(x - p1.x, y - p1.y) < chargeRadius(q1) + 14) return 1;
    if (Math.hypot(x - p2.x, y - p2.y) < chargeRadius(q2) + 14) return 2;
    return 0;
  };

  return (
    <>
      <SimCanvas
        width={900}
        height={440}
        draw={draw}
        onPointerDown={(p) => (sim.current.drag = hit(p.x, p.y))}
        onPointerMove={(p) => {
          const s = sim.current;
          if (!s.drag) return;
          const target = s.drag === 1 ? s.p1 : s.p2;
          target.x = clamp(p.x, 50, 850);
          target.y = clamp(p.y, 90, 390);
        }}
        onPointerUp={() => (sim.current.drag = 0)}
      />
      <Controls>
        <Slider label="Charge q₁" min={-5} max={5} step={0.5} value={q1} onChange={setQ1} fmt={(v) => `${v} µC`} />
        <Slider label="Charge q₂" min={-5} max={5} step={0.5} value={q2} onChange={setQ2} fmt={(v) => `${v} µC`} />
      </Controls>
    </>
  );
}

/* =====================================================================
 * Lab 0.2 — Voltage: a charge between two plates
 * ===================================================================== */

const PLATE_L = 150;
const PLATE_R = 750;
const PLATE_TOP = 70;
const PLATE_BOT = 350;

export function VoltageLab() {
  const [volts, setVolts] = useState(6);
  const sim = useRef({
    x: 250,
    y: 210,
    vx: 0,
    vRel: 0, // potential at the release position — KE gained = q·(V_release − V_arrival)
    released: false,
    arrived: false,
    drag: false,
  });

  const reset = () => {
    const s = sim.current;
    s.x = 250;
    s.y = 210;
    s.vx = 0;
    s.released = false;
    s.arrived = false;
  };

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;

    // physics (purely visual scaling: a ∝ V)
    if (s.released) {
      s.vx += 40 * volts * dt;
      s.x += s.vx * dt;
      if (s.x >= PLATE_R - 28) {
        s.x = PLATE_R - 28;
        s.released = false;
        s.arrived = true;
      }
    }

    // field arrows
    const alpha = volts < 0.1 ? 0 : 0.12 + 0.55 * (volts / 12);
    if (alpha > 0) {
      for (let y = 105; y <= 330; y += 75) {
        for (let x = 215; x <= 650; x += 96) {
          D.arrow(ctx, x, y, x + 38, y, `rgba(246,178,107,${alpha})`, 1.5, 6);
        }
      }
    }

    // equipotential lines
    for (const f of [0.25, 0.5, 0.75]) {
      const x = PLATE_R - f * (PLATE_R - PLATE_L);
      ctx.setLineDash([4, 7]);
      D.wire(ctx, [[x, PLATE_TOP], [x, PLATE_BOT]], "rgba(76,201,240,0.3)", 1);
      ctx.setLineDash([]);
      D.label(ctx, `${(f * volts).toFixed(1)} V`, x, PLATE_BOT + 14, { color: "rgba(76,201,240,0.6)", size: 11 });
    }

    // plates
    ctx.fillStyle = D.COL.bad;
    ctx.fillRect(PLATE_L - 8, PLATE_TOP, 8, PLATE_BOT - PLATE_TOP);
    ctx.fillStyle = D.COL.accent;
    ctx.fillRect(PLATE_R, PLATE_TOP, 8, PLATE_BOT - PLATE_TOP);
    D.label(ctx, `+${volts.toFixed(1)} V`, PLATE_L - 4, PLATE_TOP - 16, { color: D.COL.bad, size: 14, bold: true });
    D.label(ctx, "0 V", PLATE_R + 4, PLATE_TOP - 16, { color: D.COL.accent, size: 14, bold: true });
    D.ground(ctx, PLATE_R + 4, PLATE_BOT + 4);

    // test charge
    const vx = (volts * (PLATE_R - s.x)) / (PLATE_R - PLATE_L);
    D.glow(ctx, s.x, s.y, 26, D.COL.bad, 0.3);
    D.dot(ctx, s.x, s.y, 11, D.COL.bad);
    D.label(ctx, "+", s.x, s.y + 1, { color: "#0b0f14", size: 15, bold: true });
    D.label(ctx, "test charge (+1 µC)", s.x, s.y + 28, { color: D.COL.muted, size: 11 });
    if (volts > 0.1) {
      const flen = 14 + volts * 5;
      D.arrow(ctx, s.x + 14, s.y, s.x + 14 + flen, s.y, D.COL.amber, 2.5);
      D.label(ctx, "F", s.x + 20 + flen, s.y - 10, { color: D.COL.amber, size: 12 });
    }

    // meters
    D.meter(ctx, 20, 380, 190, "potential at charge", `${vx.toFixed(2)} V`);
    D.meter(ctx, 225, 380, 220, "potential energy (+1 µC)", fmtSI(vx * 1e-6, "J", 2), D.COL.amber);
    D.meter(
      ctx,
      460,
      380,
      230,
      "energy for every 1 C moved",
      `${volts.toFixed(1)} J`,
      D.COL.good
    );
    if (s.arrived) {
      const gained = Math.max(0, (s.vRel - vx) * 1e-6);
      D.label(ctx, `⚡ Crossed the gap: it gained ${fmtSI(gained, "J", 2)} of kinetic energy (= q × ΔV from where you dropped it)`, 450, 50, {
        color: D.COL.good,
        size: 14,
        bold: true,
      });
    }
  };

  return (
    <>
      <SimCanvas
        width={900}
        height={440}
        draw={draw}
        onPointerDown={(p) => {
          const s = sim.current;
          if (Math.hypot(p.x - s.x, p.y - s.y) < 26) {
            s.drag = true;
            s.released = false;
            s.arrived = false;
            s.vx = 0;
          }
        }}
        onPointerMove={(p) => {
          const s = sim.current;
          if (!s.drag) return;
          s.x = clamp(p.x, PLATE_L + 28, PLATE_R - 28);
          s.y = clamp(p.y, 95, 325);
        }}
        onPointerUp={() => (sim.current.drag = false)}
      />
      <Controls>
        <Slider
          label="Plate voltage V"
          min={0}
          max={12}
          step={0.1}
          value={volts}
          onChange={setVolts}
          fmt={(v) => `${v.toFixed(1)} V`}
        />
        <div className="ctl-row">
          <label>Let it fly</label>
          <div className="seg">
            <button
              type="button"
              className="seg-btn"
              onClick={() => {
                const s = sim.current;
                s.vRel = (volts * (PLATE_R - s.x)) / (PLATE_R - PLATE_L);
                s.released = true;
                s.arrived = false;
                s.vx = 0;
              }}
            >
              ▶ Release charge
            </button>
            <button type="button" className="seg-btn" onClick={reset}>
              ↺ Reset
            </button>
          </div>
        </div>
      </Controls>
    </>
  );
}

/* =====================================================================
 * Lab 0.3 — Current: counting charge through a wire
 * ===================================================================== */

export function CurrentLab() {
  const [amps, setAmps] = useState(0.5);
  const sim = useRef({
    q: 0,
    flows: [
      new Flow(polyPath([[70, 196], [830, 196]]), 34),
      new Flow(polyPath([[70, 224], [830, 224]]), 34),
    ],
  });

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    s.q += amps * dt;
    const speed = amps > 0 ? 20 + amps * 180 : 0;

    // the wire
    ctx.fillStyle = "#4a3b2f";
    ctx.strokeStyle = "#7d6650";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(60, 178, 780, 64, 14);
    ctx.fill();
    ctx.stroke();
    D.label(ctx, "a piece of copper wire", 450, 262, { color: D.COL.muted, size: 12 });

    // electrons drifting left (conventional current points right)
    for (const f of s.flows) {
      f.step(dt, -speed);
      f.forEachDot((p) => {
        D.dot(ctx, p.x, p.y, 4.5, D.COL.accent);
        D.label(ctx, "−", p.x, p.y + 0.5, { color: "#0b0f14", size: 9, bold: true });
      });
    }

    // direction arrows
    D.arrow(ctx, 380, 120, 520, 120, D.COL.amber, 3);
    D.label(ctx, "conventional current  I", 450, 100, { color: D.COL.amber, size: 13, bold: true });
    D.arrow(ctx, 520, 300, 380, 300, D.COL.accent, 2);
    D.label(ctx, "actual electron drift", 450, 320, { color: D.COL.accent, size: 12 });
    D.label(ctx, "(real drift speed in copper: well under 1 mm/s!)", 450, 340, {
      color: "rgba(148,163,179,0.55)",
      size: 11,
    });

    // counting gate
    ctx.setLineDash([6, 6]);
    D.wire(ctx, [[450, 160], [450, 258]], D.COL.amber, 1.5);
    ctx.setLineDash([]);
    D.label(ctx, "counting cross-section", 450, 152, { color: D.COL.amber, size: 11 });

    // meters
    D.meter(ctx, 20, 14, 150, "current I", fmtSI(amps, "A"), D.COL.amber);
    D.meter(ctx, 185, 14, 190, "charge passed Q = I·t", fmtSI(s.q, "C"));
    D.meter(ctx, 390, 14, 210, "electrons passed", fmtSci(s.q / E_CHARGE), D.COL.accent);
    D.meter(ctx, 615, 14, 210, "electrons per second", fmtSci(amps / E_CHARGE), D.COL.good);
  };

  return (
    <>
      <SimCanvas width={900} height={360} draw={draw} />
      <Controls>
        <Slider
          label="Current I"
          min={0}
          max={2}
          step={0.01}
          value={amps}
          onChange={setAmps}
          fmt={(v) => fmtSI(v, "A")}
        />
        <div className="ctl-row">
          <label>Counter</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={() => (sim.current.q = 0)}>
              ↺ Reset counter
            </button>
          </div>
        </div>
      </Controls>
    </>
  );
}
