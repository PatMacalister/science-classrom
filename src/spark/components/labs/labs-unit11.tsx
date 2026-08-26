"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider } from "@/spark/components/controls";
import { clamp } from "@/spark/lib/sim/helpers";
import * as D from "@/spark/lib/sim/draw";

/* =====================================================================
 * Lab 11.1 — Step through the blink program like a CPU
 * ===================================================================== */

interface CodeLine {
  jsx: ReactNode;
  text: string;
}

const KW = ({ children }: { children: ReactNode }) => <span className="kw">{children}</span>;
const FN = ({ children }: { children: ReactNode }) => <span className="fn">{children}</span>;
const NUM = ({ children }: { children: ReactNode }) => <span className="num">{children}</span>;
const CMT = ({ children }: { children: ReactNode }) => <span className="comment">{children}</span>;

const LINES: CodeLine[] = [
  { text: "from machine import Pin", jsx: <><KW>from</KW> machine <KW>import</KW> Pin</> },
  { text: "from time import sleep", jsx: <><KW>from</KW> time <KW>import</KW> sleep</> },
  { text: "", jsx: <> </> },
  { text: "led = Pin(15, Pin.OUT)", jsx: <>led = <FN>Pin</FN>(<NUM>15</NUM>, Pin.OUT)  <CMT># GP15 drives the LED</CMT></> },
  { text: "", jsx: <> </> },
  { text: "while True:", jsx: <><KW>while</KW> <NUM>True</NUM>:</> },
  { text: "    led.on()", jsx: <>    led.<FN>on</FN>()</> },
  { text: "    sleep(0.5)", jsx: <>    <FN>sleep</FN>(<NUM>0.5</NUM>)</> },
  { text: "    led.off()", jsx: <>    led.<FN>off</FN>()</> },
  { text: "    sleep(0.5)", jsx: <>    <FN>sleep</FN>(<NUM>0.5</NUM>)</> },
];

/** Execution order: line index, effect on the LED, and whether it "sleeps". */
const STEPS: Array<{ line: number; led?: boolean; sleep?: boolean; loopTop?: boolean }> = [
  { line: 0 },
  { line: 1 },
  { line: 3 },
  { line: 5, loopTop: true },
  { line: 6, led: true },
  { line: 7, sleep: true },
  { line: 8, led: false },
  { line: 9, sleep: true },
];
const LOOP_BACK_TO = 3; // after the last step, jump to "while True:"

export function BlinkCodeLab() {
  const [stepIdx, setStepIdx] = useState(0);
  const [ledOn, setLedOn] = useState(false);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [loops, setLoops] = useState(0);

  const advance = () => {
    const step = STEPS[stepIdx];
    if (step.led !== undefined) setLedOn(step.led);
    const next = stepIdx + 1 < STEPS.length ? stepIdx + 1 : LOOP_BACK_TO;
    if (next === LOOP_BACK_TO && stepIdx + 1 >= STEPS.length) setLoops((n) => n + 1);
    setStepIdx(next);
  };

  useEffect(() => {
    if (!running) return;
    const step = STEPS[stepIdx];
    const ms = (step.sleep ? 500 : 140) / speed;
    const t = setTimeout(() => {
      if (step.led !== undefined) setLedOn(step.led);
      setStepIdx((i) => {
        const next = i + 1 < STEPS.length ? i + 1 : LOOP_BACK_TO;
        if (i + 1 >= STEPS.length) setLoops((n) => n + 1);
        return next;
      });
    }, ms);
    return () => clearTimeout(t);
  }, [running, stepIdx, speed]);

  const reset = () => {
    setRunning(false);
    setStepIdx(0);
    setLedOn(false);
    setLoops(0);
  };

  const activeLine = STEPS[stepIdx].line;

  return (
    <>
      <div className="code-sim">
        <pre>
          {LINES.map((ln, i) => (
            <span key={i} className={`code-line${i === activeLine ? " active" : ""}`}>
              {ln.jsx}
            </span>
          ))}
        </pre>
        <div className="sim-side">
          <div className={`led-dot${ledOn ? " on" : ""}`} />
          <div className="sim-note">the LED on GP15</div>
          <div className="sim-note">
            loop passes: <b style={{ color: "var(--amber)" }}>{loops}</b>
          </div>
          <div className="sim-note">
            {STEPS[stepIdx].sleep
              ? "…sleeping — the CPU just waits here…"
              : STEPS[stepIdx].loopTop
                ? "while True: — jump back, forever"
                : "executing this line"}
          </div>
        </div>
      </div>
      <Controls>
        <div className="ctl-row">
          <label>Execution</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={advance} disabled={running}>
              ⏭ Step one line
            </button>
            <button
              type="button"
              className={`seg-btn${running ? " active" : ""}`}
              onClick={() => setRunning((r) => !r)}
            >
              {running ? "⏸ Pause" : "▶ Run"}
            </button>
            <button type="button" className="seg-btn" onClick={reset}>
              ↺ Reset
            </button>
          </div>
        </div>
        <Slider label="CPU speed (for humans)" min={0.25} max={4} step={0.25} value={speed} onChange={setSpeed} fmt={(v) => `${v}×`} />
      </Controls>
      <Readouts>
        <Readout label="Déjà vu" value="the highlighted line is the program counter — the counter you built in Lesson 7.3, now with meaning" />
        <Readout label="The punchline" value="your 555 blinker, rewritten as five lines you can change in seconds" tone="amber" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 11.2 — The ADC: chopping the analog world into numbers
 * ===================================================================== */

const ADC_BITS = [2, 3, 4, 8];

export function AdcLab() {
  const [volts, setVolts] = useState(1.8);
  const [bitsIdx, setBitsIdx] = useState(1);
  const [lamp, setLamp] = useState(false);
  const thresholdV = 1.5;
  const HYST = 0.15;

  const bits = ADC_BITS[bitsIdx];
  const levels = Math.pow(2, bits);
  const stepV = 3.3 / levels;
  const code = clamp(Math.floor(volts / stepV), 0, levels - 1);
  const reconstructed = (code + 0.5) * stepV;

  // software Schmitt trigger (state adjusted during render, React's documented pattern)
  if (volts < thresholdV - HYST && !lamp) setLamp(true);
  else if (volts > thresholdV + HYST && lamp) setLamp(false);

  const draw = (ctx: CanvasRenderingContext2D) => {
    // transfer staircase
    const px = 60, py = 30, pw = 500, ph = 290;
    ctx.fillStyle = "#0b1119";
    ctx.fillRect(px, py, pw, ph);
    ctx.strokeStyle = "#33445e";
    ctx.strokeRect(px, py, pw, ph);
    D.label(ctx, `${bits}-bit ADC transfer curve — ${levels} levels`, px + pw / 2, py + 16, {
      color: D.COL.accent,
      size: 13,
      bold: true,
    });
    const vx = (v: number) => px + (v / 3.3) * pw;
    const cy = (c: number) => py + ph - 10 - (c / (levels - 1)) * (ph - 46);
    // ideal line
    ctx.setLineDash([4, 6]);
    D.wire(ctx, [[vx(0), cy(0)], [vx(3.3), cy(levels - 1)]], "rgba(148,163,179,0.3)", 1);
    ctx.setLineDash([]);
    // staircase
    ctx.strokeStyle = D.COL.accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let c = 0; c < levels; c++) {
      const x1 = vx(c * stepV);
      const x2 = vx(Math.min(3.3, (c + 1) * stepV));
      const y = cy(c);
      if (c === 0) ctx.moveTo(x1, y);
      else ctx.lineTo(x1, y);
      ctx.lineTo(x2, y);
    }
    ctx.stroke();
    // operating point
    D.glow(ctx, vx(volts), cy(code), 14, D.COL.amber, 0.7);
    D.dot(ctx, vx(volts), cy(code), 5, D.COL.amber);
    ctx.setLineDash([3, 5]);
    D.wire(ctx, [[vx(volts), py + ph], [vx(volts), cy(code)]], "rgba(246,178,107,0.5)", 1);
    ctx.setLineDash([]);
    D.label(ctx, "0 V", px, py + ph + 16, { color: D.COL.muted, size: 10 });
    D.label(ctx, "3.3 V", px + pw, py + ph + 16, { color: D.COL.muted, size: 10 });

    D.meter(ctx, 600, 40, 270, "digital code", `${code}  =  0b${code.toString(2).padStart(bits, "0")}`, D.COL.accent);
    D.meter(ctx, 600, 100, 270, "one step is worth", `${(stepV * 1000).toFixed(1)} mV`, D.COL.muted);
    D.meter(
      ctx,
      600,
      160,
      270,
      "quantisation error",
      `${((volts - reconstructed) * 1000).toFixed(0)} mV`,
      Math.abs(volts - reconstructed) > stepV / 2 ? D.COL.bad : D.COL.good
    );
    D.meter(
      ctx,
      600,
      220,
      270,
      "the Pico's real ADC",
      "12 bits → 4096 levels (0.8 mV)",
      D.COL.muted
    );
    D.label(ctx, "more bits → smaller steps → finer hearing", 735, 300, { color: D.COL.muted, size: 11 });
  };

  return (
    <>
      <SimCanvas width={900} height={360} draw={draw} />
      <Controls>
        <Slider label="Analog input" min={0} max={3.3} step={0.01} value={volts} onChange={setVolts} fmt={(v) => `${v.toFixed(2)} V`} />
        <Segmented
          label="Resolution"
          value={String(bitsIdx)}
          onChange={(v) => setBitsIdx(Number(v))}
          options={ADC_BITS.map((b, i) => ({ value: String(i), label: `${b} bits` }))}
        />
      </Controls>
      <div className="code-sim">
        <pre>
          <span className="code-line"><CMT># the night-light decision, in software (Lesson 6.1 in code!)</CMT></span>
          <span className="code-line">reading = adc.read_u16()          <CMT># voltage now: {volts.toFixed(2)} V</CMT></span>
          <span className={`code-line${lamp && volts < thresholdV - HYST ? " active" : ""}`}><KW>if</KW> reading &lt; DARK - HYST:  led.<FN>on</FN>()   <CMT># below {(thresholdV - HYST).toFixed(2)} V</CMT></span>
          <span className={`code-line${!lamp && volts > thresholdV + HYST ? " active" : ""}`}><KW>if</KW> reading &gt; DARK + HYST:  led.<FN>off</FN>()  <CMT># above {(thresholdV + HYST).toFixed(2)} V</CMT></span>
        </pre>
        <div className="sim-side">
          <div className={`led-dot${lamp ? " on" : ""}`} />
          <div className="sim-note">software Schmitt trigger — slide the input slowly through 1.5 V and note the two different switching points</div>
        </div>
      </div>
      <Readouts>
        <Readout label="What an ADC is" value="a ladder of comparators (6.1) reporting which rung your voltage sits on" />
        <Readout label="Where the voltage comes from" value="a divider (2.2): sensor on top, resistor below — the analog world's handshake" tone="amber" />
      </Readouts>
    </>
  );
}
