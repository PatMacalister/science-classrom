"use client";

import { useEffect, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider } from "@/vector/components/controls";
import * as D from "@/vector/lib/sim/draw";

/* =====================================================================
 * Lab 3.1 — Digital twin of the pendulum experiment: time 20 swings
 * with the built-in stopwatch, compute g, then go do it for real.
 * ===================================================================== */

export function PendulumLab() {
  const [length, setLength] = useState(1.0);
  const [world, setWorld] = useState<"earth" | "moon">("earth");
  const [amplitude, setAmplitude] = useState(10);
  const [startAt, setStartAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);

  // Tick the stopwatch display while it runs; the timestamps themselves are
  // taken in the event handlers, so the render stays pure.
  useEffect(() => {
    if (startAt === null) return;
    const id = setInterval(() => setElapsed((performance.now() - startAt) / 1000), 100);
    return () => clearInterval(id);
  }, [startAt]);

  const toggle = () => {
    if (startAt === null) {
      setElapsed(0);
      setStartAt(performance.now());
    } else {
      setElapsed((performance.now() - startAt) / 1000);
      setStartAt(null);
    }
  };

  const g = world === "earth" ? 9.81 : 1.62;
  const T = 2 * Math.PI * Math.sqrt(length / g);
  // large-amplitude correction (first order): T grows ~ (1 + θ²/16)
  const rad = (amplitude * Math.PI) / 180;
  const tTrue = T * (1 + (rad * rad) / 16);
  const t20 = 20 * tTrue;
  const done = startAt === null && elapsed > 5;
  const gFromTimer = done ? (4 * Math.PI * Math.PI * length) / Math.pow(elapsed / 20, 2) : null;

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const px = 300;
    const py = 60;
    const L = length * 160 + 60;
    const theta = rad * Math.cos(((2 * Math.PI) / tTrue) * t);

    // pivot + string + bob
    D.dot(ctx, px, py, 5, "#8b97a7");
    const bx = px + Math.sin(theta) * L;
    const by = py + Math.cos(theta) * L;
    D.wire(ctx, [[px, py], [bx, by]], "#8b97a7", 2);
    D.dot(ctx, bx, by, 14, D.COL.accent);

    // amplitude arc
    ctx.strokeStyle = "rgba(246,178,107,0.4)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.arc(px, py, L, Math.PI / 2 - rad, Math.PI / 2 + rad);
    ctx.stroke();
    ctx.setLineDash([]);

    if (amplitude > 25) {
      D.label(ctx, "wide swing — the small-angle formula starts to lie", px, 380, { size: 12, color: D.COL.amber });
    }

    // the arithmetic panel
    D.panel(ctx, 600, 60, 280, 220);
    D.label(ctx, "the formula", 740, 84, { color: D.COL.muted, size: 11 });
    D.label(ctx, "T = 2π√(L/g)", 740, 116, { size: 15, mono: true, color: D.COL.accent });
    const rows: Array<[string, string]> = [
      ["true period", `${tTrue.toFixed(3)} s`],
      ["20 swings", `${t20.toFixed(1)} s`],
      ["g on this world", `${g.toFixed(2)} m/s²`],
    ];
    rows.forEach(([k, v], i) => {
      const y = 152 + i * 30;
      D.label(ctx, k, 624, y, { align: "left", size: 12, color: D.COL.muted });
      D.label(ctx, v, 856, y, { align: "right", size: 13, mono: true, color: D.COL.text });
    });
    D.label(ctx, "time 20 swings, then press stop", 740, 262, { size: 10, color: D.COL.muted });

    D.meter(ctx, 20, 8, 190, "stopwatch", `${elapsed.toFixed(2)} s`, startAt !== null ? D.COL.amber : D.COL.muted);
    if (gFromTimer) {
      D.meter(ctx, 220, 8, 250, "your g = 4π²L/T²", `${gFromTimer.toFixed(2)} m/s²`, Math.abs(gFromTimer - g) < 0.3 ? D.COL.good : D.COL.bad);
    }
  };

  return (
    <>
      <SimCanvas width={900} height={410} draw={draw} label="A pendulum with period formula and a stopwatch for timing twenty swings" />
      <Controls>
        <Slider label="String length" min={0.3} max={2} step={0.05} value={length} onChange={setLength} fmt={(v) => `${v.toFixed(2)} m`} />
        <Slider label="Amplitude" min={3} max={45} step={1} value={amplitude} onChange={setAmplitude} fmt={(v) => `${v}°`} />
        <Segmented
          label="World"
          options={[
            { value: "earth", label: "Earth" },
            { value: "moon", label: "Moon" },
          ]}
          value={world}
          onChange={setWorld}
        />
        <div className="ctl-row">
          <label>Stopwatch</label>
          <div className="seg">
            <button type="button" className={`seg-btn${startAt !== null ? " active" : ""}`} onClick={toggle}>
              {startAt !== null ? "■ Stop" : "▶ Start timing"}
            </button>
          </div>
        </div>
      </Controls>
      <Readouts>
        <Readout label="True period" value={`${tTrue.toFixed(3)} s`} tone="amber" />
        <Readout label="20 swings take" value={`${t20.toFixed(1)} s`} />
        <Readout
          label="Your measured g"
          value={gFromTimer ? `${gFromTimer.toFixed(2)} m/s²` : "time 20 swings, then stop"}
          tone={gFromTimer ? (Math.abs(gFromTimer - g) < 0.3 ? "good" : "warn") : undefined}
        />
        <Readout label="Mass" value="not in the formula — on purpose" />
      </Readouts>
    </>
  );
}
