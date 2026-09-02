"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented } from "@/spark/components/controls";
import { clamp, fmtSI } from "@/spark/lib/sim/helpers";
import { useSerialNumbers } from "@/spark/lib/serial";
import * as D from "@/spark/lib/sim/draw";

const WINDOWS: Array<{ label: string; ms: number }> = [
  { label: "2 s", ms: 2000 },
  { label: "10 s", ms: 10000 },
  { label: "30 s", ms: 30000 },
];

/**
 * The real thing: plot voltages streamed by the Pico over Web Serial.
 * Expects the Unit 16 live firmware (one number per line, already ×3.128).
 */
export default function LiveScope() {
  const serial = useSerialNumbers();
  const [winIdx, setWinIdx] = useState(1);
  const [demo, setDemo] = useState(false);
  const demoRef = useRef({ t: 0 });

  const windowMs = WINDOWS[winIdx].ms;

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    // synthetic stream so the display can be explored before hardware arrives
    if (demo) {
      const d = demoRef.current;
      d.t += dt * 1000;
      const period = 660;
      const ph = (d.t % period) / period;
      const v = ph < 0.51 ? 3 + 3.4 * (1 - Math.exp(-ph / 0.25)) : 6 * Math.exp(-((ph - 0.51) / 0.35));
      serial.samplesRef.current.push({ t: d.t, v: clamp(v + (Math.random() - 0.5) * 0.06, 0, 9.9) });
      if (serial.samplesRef.current.length > 4000) serial.samplesRef.current.shift();
    }

    const samples = serial.samplesRef.current;
    const now = samples.length ? samples[samples.length - 1].t : 0;
    const tStart = now - windowMs;
    const view = samples.filter((s) => s.t >= tStart);

    const px = 20, py = 20, pw = 860, ph = 290;
    ctx.fillStyle = "#0b1119";
    ctx.fillRect(px, py, pw, ph);
    ctx.strokeStyle = "#243144";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 1; i < 6; i++) {
      ctx.moveTo(px + (pw * i) / 6, py);
      ctx.lineTo(px + (pw * i) / 6, py + ph);
    }
    for (let i = 1; i < 4; i++) {
      ctx.moveTo(px, py + (ph * i) / 4);
      ctx.lineTo(px + pw, py + (ph * i) / 4);
    }
    ctx.stroke();
    ctx.strokeStyle = "#33445e";
    ctx.strokeRect(px, py, pw, ph);

    const vMax = 10;
    const mapX = (t: number) => px + ((t - tStart) / windowMs) * pw;
    const mapY = (v: number) => py + ph - 8 - (clamp(v, 0, vMax) / vMax) * (ph - 24);

    // volt gridline labels
    for (const v of [0, 3.3, 5, 9]) {
      ctx.setLineDash([3, 6]);
      D.wire(ctx, [[px, mapY(v)], [px + pw, mapY(v)]], "rgba(148,163,179,0.18)", 1);
      ctx.setLineDash([]);
      D.label(ctx, `${v} V`, px + pw - 22, mapY(v) - 7, { color: "rgba(148,163,179,0.55)", size: 10 });
    }

    if (view.length > 1) {
      ctx.strokeStyle = demo ? "#8fa0b3" : "#f6b26b";
      ctx.lineWidth = 2;
      ctx.beginPath();
      view.forEach((s, i) => {
        const x = mapX(s.t);
        const y = mapY(s.v);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    } else {
      D.label(
        ctx,
        serial.status === "open"
          ? "connected — waiting for numbers (is the live firmware running?)"
          : serial.status === "unsupported"
            ? "Web Serial needs Chrome or Edge on desktop"
            : "connect your Pico, or use the demo stream to explore the display",
        px + pw / 2,
        py + ph / 2,
        { color: D.COL.muted, size: 14 }
      );
    }
    D.label(ctx, `${fmtSI(windowMs / 1000 / 6, "s", 2)}/div`, px + 48, py + ph - 10, { color: D.COL.muted, size: 11 });

    const last = view.length ? view[view.length - 1].v : null;
    D.meter(
      ctx,
      20,
      330,
      170,
      "status",
      demo ? "demo stream" : serial.status === "open" ? "● live" : serial.status,
      demo ? D.COL.muted : serial.status === "open" ? D.COL.good : serial.status === "error" ? D.COL.bad : D.COL.muted
    );
    D.meter(ctx, 205, 330, 150, "latest sample", last !== null ? `${last.toFixed(2)} V` : "—", D.COL.amber);
    D.meter(
      ctx,
      370,
      330,
      170,
      "incoming rate",
      demo ? "~60 S/s (demo)" : serial.sampleRate > 0 ? `${serial.sampleRate.toFixed(0)} S/s` : "—",
      D.COL.accent
    );
    D.meter(
      ctx,
      555,
      330,
      325,
      "device says",
      serial.error ?? serial.lastText ?? "—",
      serial.error ? D.COL.bad : D.COL.muted
    );
  };

  return (
    <>
      <SimCanvas width={900} height={390} draw={draw} />
      <Controls>
        <div className="ctl-row">
          <label>Connection</label>
          <div className="seg">
            {serial.status === "open" ? (
              <button type="button" className="seg-btn active" onClick={() => serial.disconnect()}>
                ⏏ Disconnect
              </button>
            ) : (
              <button
                type="button"
                className="seg-btn"
                onClick={() => {
                  setDemo(false);
                  serial.connect();
                }}
                disabled={serial.status === "unsupported" || serial.status === "connecting"}
              >
                🔌 {serial.status === "connecting" ? "Choosing port…" : "Connect Pico (Chrome)"}
              </button>
            )}
            <button
              type="button"
              className={`seg-btn${demo ? " active" : ""}`}
              onClick={() => {
                if (!demo) serial.clearSamples();
                setDemo(!demo);
              }}
            >
              {demo ? "⏸ Stop demo stream" : "▶ Demo stream (no hardware)"}
            </button>
          </div>
        </div>
        <Segmented
          label="Time window"
          value={String(winIdx)}
          onChange={(v) => setWinIdx(Number(v))}
          options={WINDOWS.map((w, i) => ({ value: String(i), label: w.label }))}
        />
      </Controls>
      <Readouts>
        <Readout
          label="How to go live"
          value="flash the Unit 16 live firmware, close Thonny (one program owns the port), then Connect and pick the Pico"
        />
        <Readout
          label="What you're seeing"
          value="every point is a real ADC reading from your breadboard — the demo stream fakes the blinker sawtooth for practice"
          tone="amber"
        />
      </Readouts>
    </>
  );
}
