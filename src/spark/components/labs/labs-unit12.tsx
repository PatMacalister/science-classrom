"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider } from "@/spark/components/controls";
import { clamp, fmtSI } from "@/spark/lib/sim/helpers";
import * as D from "@/spark/lib/sim/draw";

/**
 * The expert-capstone digital twin: the whole night-light signal chain,
 * LDR → divider → ADC → hysteresis decision → PWM → LED, with live values.
 */
export function NightLightLab() {
  const [light, setLight] = useState(70);
  const [knob, setKnob] = useState(50);
  const [mode, setMode] = useState<"switch" | "fade">("fade");
  const sim = useRef({ lampOn: false });

  const HYST = 3000;

  // LDR: ~2 kΩ in bright light … ~200 kΩ in darkness (log-ish, like a real GL5528)
  const rLdr = 2000 * Math.pow(10, 2 * (1 - light / 100));
  const vNode = (3.3 * 10000) / (10000 + rLdr);
  const code = Math.round((vNode / 3.3) * 65535);
  const thCode = Math.round(5000 + (knob / 100) * 55000);

  const draw = (ctx: CanvasRenderingContext2D) => {
    const s = sim.current;
    // hysteresis decision (dark = LOW code, because the LDR is the divider's top leg)
    if (code < thCode - HYST) s.lampOn = true;
    if (code > thCode + HYST) s.lampOn = false;
    const darkness = clamp((thCode - code) / 20000, 0, 1);
    const duty = mode === "fade" ? (s.lampOn ? 0.3 + 0.7 * darkness : 0) : s.lampOn ? 1 : 0;

    // the signal chain, block by block
    const blocks: Array<{ title: string; value: string; color?: string }> = [
      { title: "room light", value: `${light} %  ${light > 60 ? "☀" : light > 25 ? "⛅" : "🌙"}` },
      { title: "LDR resistance", value: fmtSI(rLdr, "Ω", 2), color: D.COL.accent },
      { title: "divider voltage → GP26", value: `${vNode.toFixed(2)} V`, color: D.COL.accent },
      { title: "adc.read_u16()", value: String(code), color: D.COL.amber },
      {
        title: `vs threshold ${thCode} (±${HYST})`,
        value: s.lampOn ? "DARK → lamp on" : "BRIGHT → lamp off",
        color: s.lampOn ? D.COL.good : D.COL.muted,
      },
      { title: "PWM duty on GP15", value: `${Math.round(duty * 100)} %`, color: D.COL.good },
    ];
    blocks.forEach((b, i) => {
      const bx = 25 + (i % 3) * 260;
      const by = 40 + Math.floor(i / 3) * 110;
      D.meter(ctx, bx, by, 230, b.title, b.value, b.color ?? D.COL.text);
      if (i < blocks.length - 1) {
        const nx = 25 + ((i + 1) % 3) * 260;
        const ny = 40 + Math.floor((i + 1) / 3) * 110;
        if (Math.floor(i / 3) === Math.floor((i + 1) / 3)) {
          D.arrow(ctx, bx + 235, by + 20, nx - 8, ny + 20, D.COL.muted, 1.5, 6);
        } else {
          D.arrow(ctx, bx + 115, by + 45, nx + 115, ny - 6, D.COL.muted, 1.5, 6);
        }
      }
    });

    // the LED itself
    D.glow(ctx, 820, 105, 55, "#ffd98a", duty * 0.9);
    ctx.fillStyle = `rgba(255,217,138,${0.12 + duty * 0.85})`;
    ctx.beginPath();
    ctx.arc(820, 105, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#5a6b7d";
    ctx.lineWidth = 2;
    ctx.stroke();
    D.label(ctx, "your night-light", 820, 152, { color: D.COL.muted, size: 11 });

    D.label(
      ctx,
      mode === "fade"
        ? "fade mode: duty follows how far below threshold the light has fallen"
        : "switch mode: plain on/off with the hysteresis band",
      450,
      272,
      { color: D.COL.muted, size: 12 }
    );
  };

  return (
    <>
      <SimCanvas width={900} height={295} draw={draw} />
      <Controls>
        <Slider label="Room light (walk to the window…)" min={0} max={100} step={1} value={light} onChange={setLight} fmt={(v) => `${v}%`} />
        <Slider label="Threshold knob (the pot on GP27)" min={0} max={100} step={1} value={knob} onChange={setKnob} fmt={(v) => `${v}%`} />
        <Segmented
          label="Firmware mode"
          value={mode}
          onChange={setMode}
          options={[
            { value: "switch", label: "Simple on/off" },
            { value: "fade", label: "Fade with darkness (PWM)" },
          ]}
        />
      </Controls>
      <Readouts>
        <Readout
          label="Dusk test"
          value="sweep room light down slowly: one clean turn-on. Sweep back up: it turns off at a *different* level — hysteresis at work"
          tone="amber"
        />
        <Readout label="Every lesson at once" value="divider (2.2) → ADC (11.2) → Schmitt (6.1) → PWM (8) — now in two dozen lines of code" />
      </Readouts>
    </>
  );
}
