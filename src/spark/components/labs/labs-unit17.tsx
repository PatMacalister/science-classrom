"use client";

import { useEffect, useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider } from "@/spark/components/controls";
import { clamp } from "@/spark/lib/sim/helpers";
import * as D from "@/spark/lib/sim/draw";

/* =====================================================================
 * Lab 17.1 — The ALU: arithmetic with an attitude (and flags)
 * ===================================================================== */

type AluOp = "ADD" | "SUB" | "AND" | "OR";

export function AluLab() {
  const [aBits, setABits] = useState([1, 0, 1, 0]); // LSB first = 5
  const [bBits, setBBits] = useState([1, 1, 0, 0]); // 3
  const [op, setOp] = useState<AluOp>("ADD");

  const toDec = (bits: number[]) => bits.reduce((acc, b, i) => acc + b * (1 << i), 0);
  const a = toDec(aBits);
  const b = toDec(bBits);

  let raw: number;
  if (op === "ADD") raw = a + b;
  else if (op === "SUB") raw = a + ((~b & 0xf) + 1); // two's complement: A + (−B)
  else if (op === "AND") raw = a & b;
  else raw = a | b;
  const result = raw & 0xf;
  // for SUB we show the BORROW (inverted adder carry) so C=1 means "we went below zero"
  const carry = op === "ADD" ? (raw >> 4) & 1 : op === "SUB" ? ((raw >> 4) & 1) ^ 1 : 0;
  const zero = result === 0 ? 1 : 0;
  const negative = (result >> 3) & 1;
  const signed = (v: number) => (v > 7 ? v - 16 : v);

  const colX = (i: number) => 560 - i * 90;

  const bitCell = (ctx: CanvasRenderingContext2D, x: number, y: number, v: number, clickable: boolean, color = D.COL.accent) => {
    ctx.fillStyle = "#101825";
    ctx.strokeStyle = v ? color : "#33445e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x - 22, y - 22, 44, 44, 8);
    ctx.fill();
    ctx.stroke();
    D.label(ctx, String(v), x, y + 1, { color: v ? color : D.COL.muted, size: 20, bold: true, mono: true });
    if (clickable) D.label(ctx, "▲▼", x, y + 33, { color: "rgba(148,163,179,0.35)", size: 8 });
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    D.label(ctx, "A", 220, 60, { color: D.COL.accent, size: 15, bold: true });
    D.label(ctx, "B", 220, 140, { color: D.COL.accent, size: 15, bold: true });
    D.label(ctx, op, 216, 225, { color: D.COL.amber, size: 16, bold: true });
    for (let i = 0; i < 4; i++) {
      bitCell(ctx, colX(i), 60, aBits[i], true);
      bitCell(ctx, colX(i), 140, bBits[i], true);
      bitCell(ctx, colX(i), 225, (result >> i) & 1, false, D.COL.amber);
    }
    D.meter(ctx, 640, 38, 230, "A (unsigned / signed)", `${a}  /  ${signed(a)}`, D.COL.accent);
    D.meter(ctx, 640, 118, 230, "B (unsigned / signed)", `${b}  /  ${signed(b)}`, D.COL.accent);
    D.meter(ctx, 640, 203, 230, "result (unsigned / signed)", `${result}  /  ${signed(result)}`, D.COL.amber);

    // flags
    const flags = [
      { name: "Z (zero)", v: zero, on: D.COL.good },
      { name: "C (carry/borrow)", v: carry, on: D.COL.amber },
      { name: "N (bit 3 = sign)", v: negative, on: D.COL.bad },
    ];
    flags.forEach((f, i) => {
      const x = 150 + i * 220;
      D.glow(ctx, x, 300, 22, f.on, f.v ? 0.7 : 0);
      D.dot(ctx, x, 300, 11, f.v ? f.on : "#2a3646");
      D.label(ctx, f.name, x + 78, 300, { color: f.v ? f.on : D.COL.muted, size: 12 });
    });
    D.label(ctx, "flags: one-bit gossip about the result — the CPU's JZ instruction reads Z", 450, 340, {
      color: "rgba(148,163,179,0.6)",
      size: 11,
    });
  };

  return (
    <>
      <SimCanvas
        width={900}
        height={360}
        draw={draw}
        onClick={(p) => {
          for (let i = 0; i < 4; i++) {
            if (Math.abs(p.x - colX(i)) < 24) {
              if (Math.abs(p.y - 60) < 24) setABits((bits) => bits.map((v, k) => (k === i ? 1 - v : v)));
              if (Math.abs(p.y - 140) < 24) setBBits((bits) => bits.map((v, k) => (k === i ? 1 - v : v)));
            }
          }
        }}
      />
      <Controls>
        <Segmented<AluOp>
          label="Operation"
          value={op}
          onChange={setOp}
          options={(["ADD", "SUB", "AND", "OR"] as AluOp[]).map((o) => ({ value: o, label: o }))}
        />
      </Controls>
      <Readouts>
        <Readout label="Subtraction's secret" value="SUB is just ADD with B negated in two's complement: flip every bit, add 1 — no new hardware" tone="amber" />
        <Readout label="Try this" value="Compute 5 − 5 and watch Z light. Compute 3 − 5: the answer reads 14 unsigned but −2 signed — same bits!" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 17.2 — Memory and the bus
 * ===================================================================== */

export function MemoryBusLab() {
  const [addr, setAddr] = useState(3);
  const [value, setValue] = useState(42);
  const memRef = useRef<number[]>([7, 12, 0, 99, 0, 0, 21, 0, 0, 0, 5, 0, 0, 0, 3, 4]);
  const [lastOp, setLastOp] = useState<{ kind: "read" | "write"; addr: number; data: number; t: number } | null>(null);
  const [readValue, setReadValue] = useState<number | null>(null);

  const doRead = () => {
    const d = memRef.current[addr];
    setReadValue(d);
    setLastOp({ kind: "read", addr, data: d, t: performance.now() });
  };
  const doWrite = () => {
    memRef.current[addr] = value;
    setLastOp({ kind: "write", addr, data: value, t: performance.now() });
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    const pulse = lastOp ? clamp(1 - (performance.now() - lastOp.t) / 900, 0, 1) : 0;

    // CPU box
    D.icBox(ctx, 60, 120, 180, 130, "CPU");
    D.label(ctx, readValue !== null ? `last read: ${readValue}` : "…", 150, 225, { color: D.COL.amber, size: 12, mono: true });

    // RAM column
    const ramX = 560;
    D.label(ctx, "RAM — 16 numbered pigeonholes", ramX + 120, 24, { color: D.COL.accent, size: 13, bold: true });
    for (let i = 0; i < 16; i++) {
      const y = 40 + i * 20;
      const active = i === addr;
      ctx.fillStyle = active ? "rgba(76,201,240,0.14)" : "#101825";
      ctx.strokeStyle = active ? D.COL.accent : "#2a3646";
      ctx.lineWidth = active ? 2 : 1;
      ctx.beginPath();
      ctx.roundRect(ramX, y, 240, 18, 4);
      ctx.fill();
      ctx.stroke();
      D.label(ctx, String(i).padStart(2, "0"), ramX + 20, y + 10, { color: active ? D.COL.accent : D.COL.muted, size: 10, mono: true });
      D.label(ctx, `${memRef.current[i]}`.padStart(3, " "), ramX + 120, y + 10, { color: D.COL.text, size: 11, mono: true });
      D.label(ctx, memRef.current[i].toString(2).padStart(8, "0"), ramX + 200, y + 10, { color: "rgba(148,163,179,0.5)", size: 9, mono: true });
    }

    // buses
    const busY1 = 150, busY2 = 210;
    const addrGlow = pulse > 0 ? `rgba(246,178,107,${0.35 + 0.6 * pulse})` : "rgba(246,178,107,0.35)";
    const dataGlow =
      pulse > 0
        ? lastOp?.kind === "write"
          ? `rgba(76,201,240,${0.35 + 0.6 * pulse})`
          : `rgba(71,194,107,${0.35 + 0.6 * pulse})`
        : "rgba(76,201,240,0.35)";
    D.arrow(ctx, 240, busY1, ramX - 10, busY1, addrGlow, 3 + pulse * 3);
    D.label(ctx, `address bus — “pigeonhole ${addr}!”`, 400, busY1 - 16, { color: D.COL.amber, size: 12 });
    if (lastOp?.kind === "read") {
      D.arrow(ctx, ramX - 10, busY2, 240, busY2, dataGlow, 3 + pulse * 3);
    } else {
      D.arrow(ctx, 240, busY2, ramX - 10, busY2, dataGlow, 3 + pulse * 3);
    }
    D.label(
      ctx,
      lastOp?.kind === "read" ? `data bus ← value ${lastOp.data} comes back` : `data bus → value ${lastOp ? lastOp.data : value} goes in`,
      400,
      busY2 + 18,
      { color: lastOp?.kind === "read" ? D.COL.good : D.COL.accent, size: 12 }
    );

    D.label(ctx, "one address bus, one data bus — every read and write in every computer is this handshake", 450, 360, {
      color: "rgba(148,163,179,0.6)",
      size: 11,
    });
  };

  return (
    <>
      <SimCanvas width={900} height={380} draw={draw} />
      <Controls>
        <Slider label="Address (0–15)" min={0} max={15} step={1} value={addr} onChange={setAddr} fmt={(v) => `cell ${v}`} />
        <Slider label="Value to write (0–255)" min={0} max={255} step={1} value={value} onChange={setValue} fmt={(v) => String(v)} />
        <div className="ctl-row">
          <label>Bus operation</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={doRead}>
              📖 Read from cell
            </button>
            <button type="button" className="seg-btn" onClick={doWrite}>
              ✏ Write to cell
            </button>
          </div>
        </div>
      </Controls>
      <Readouts>
        <Readout label="RAM is just registers with a phone book" value="each cell is a row of flip-flops (7.3); the address bus picks which row talks to the data bus" tone="amber" />
        <Readout label="Try this" value="Write your favourite number into cell 9, read cells 14 and 15 — the CPU capstone keeps its data there" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 17.3 — Fetch, decode, execute: one instruction, frame by frame
 * ===================================================================== */

const FD_PROGRAM = [
  { code: 0x1e, dis: "LDA 14", explain: "copy RAM cell 14 into register A" },
  { code: 0x2f, dis: "ADD 15", explain: "add RAM cell 15 to A" },
  { code: 0xe0, dis: "OUT", explain: "show A on the output display" },
  { code: 0xf0, dis: "HLT", explain: "stop the clock" },
];
const FD_DATA: Record<number, number> = { 14: 3, 15: 4 };

type Phase = "fetch" | "decode" | "execute";

export function FetchDecodeLab() {
  const [pc, setPc] = useState(0);
  const [cur, setCur] = useState(0); // the instruction currently in flight
  const [phase, setPhase] = useState<Phase>("fetch");
  const [acc, setAcc] = useState(0);
  const [ir, setIr] = useState<number | null>(null);
  const [out, setOut] = useState<number | null>(null);
  const [halted, setHalted] = useState(false);

  const step = () => {
    if (halted) return;
    if (phase === "fetch") {
      // fetch: instruction into IR, and the PC advances immediately —
      // during decode/execute it already points at the NEXT instruction
      setIr(FD_PROGRAM[pc].code);
      setCur(pc);
      setPc((p) => p + 1);
      setPhase("decode");
    } else if (phase === "decode") {
      setPhase("execute");
    } else {
      const instr = FD_PROGRAM[cur];
      const opc = instr.code >> 4;
      const arg = instr.code & 0xf;
      if (opc === 1) setAcc(FD_DATA[arg] ?? 0);
      if (opc === 2) setAcc((a) => (a + (FD_DATA[arg] ?? 0)) & 0xff);
      if (opc === 0xe) setOut(acc);
      if (opc === 0xf) setHalted(true);
      setPhase("fetch");
      setIr(null);
    }
  };

  const reset = () => {
    setPc(0);
    setCur(0);
    setPhase("fetch");
    setAcc(0);
    setIr(null);
    setOut(null);
    setHalted(false);
  };

  const narration = halted
    ? "HLT reached — the clock stops. 3 + 4 computed, one heartbeat at a time."
    : phase === "fetch"
      ? `FETCH: PC says ${pc} → address bus → the instruction returns into IR while PC steps forward`
      : phase === "decode"
        ? `DECODE: IR holds ${FD_PROGRAM[cur].dis} — top 4 bits pick the operation, bottom 4 the address (note: PC already points at ${pc})`
        : `EXECUTE: ${FD_PROGRAM[cur].explain}`;

  const draw = (ctx: CanvasRenderingContext2D) => {
    const box = (x: number, y: number, w: number, name: string, val: string, hot: boolean, color = D.COL.accent) => {
      ctx.fillStyle = hot ? "rgba(76,201,240,0.12)" : "#101825";
      ctx.strokeStyle = hot ? color : "#33445e";
      ctx.lineWidth = hot ? 2.5 : 1;
      ctx.beginPath();
      ctx.roundRect(x, y, w, 52, 8);
      ctx.fill();
      ctx.stroke();
      D.label(ctx, name, x + w / 2, y + 14, { color: D.COL.muted, size: 10 });
      D.label(ctx, val, x + w / 2, y + 36, { color: hot ? color : D.COL.text, size: 15, bold: true, mono: true });
    };

    box(60, 60, 150, "PC (program counter)", String(pc), phase === "fetch" && !halted, D.COL.amber);
    box(60, 140, 150, "IR (instruction reg.)", ir !== null ? FD_PROGRAM[cur].dis : "—", phase === "decode", D.COL.accent);
    box(60, 220, 150, "A (accumulator)", String(acc), phase === "execute", D.COL.good);
    box(60, 300, 150, "OUT", out !== null ? String(out) : "—", out !== null && phase === "fetch", D.COL.bad);

    // program memory
    D.label(ctx, "program memory", 500, 48, { color: D.COL.accent, size: 12, bold: true });
    const hotIdx = phase === "fetch" ? pc : cur;
    FD_PROGRAM.forEach((row, i) => {
      const hot = i === hotIdx && !halted;
      ctx.fillStyle = hot ? "rgba(246,178,107,0.12)" : "#101825";
      ctx.strokeStyle = hot ? D.COL.amber : "#2a3646";
      ctx.lineWidth = hot ? 2 : 1;
      ctx.beginPath();
      ctx.roundRect(380, 60 + i * 34, 240, 28, 5);
      ctx.fill();
      ctx.stroke();
      D.label(ctx, `${i}:  ${row.dis}`, 410, 74 + i * 34, { color: hot ? D.COL.amber : D.COL.text, size: 12, mono: true, align: "left" });
      D.label(ctx, row.code.toString(2).padStart(8, "0"), 578, 74 + i * 34, { color: "rgba(148,163,179,0.5)", size: 10, mono: true });
    });
    D.label(ctx, "data:  cell 14 = 3   cell 15 = 4", 500, 210, { color: D.COL.muted, size: 11, mono: true });

    // phase dial
    (["fetch", "decode", "execute"] as Phase[]).forEach((ph, i) => {
      const on = ph === phase && !halted;
      const x = 700 + 0 * i, y = 80 + i * 60;
      D.glow(ctx, x, y, 24, D.COL.accent, on ? 0.7 : 0);
      D.dot(ctx, x, y, 12, on ? D.COL.accent : "#2a3646");
      D.label(ctx, ph.toUpperCase(), x + 70, y, { color: on ? D.COL.accent : D.COL.muted, size: 12, bold: on });
    });
    D.label(ctx, "the eternal three-step", 760, 260, { color: "rgba(148,163,179,0.5)", size: 10 });

    D.meter(ctx, 320, 300, 560, "what is happening", narration, halted ? D.COL.bad : D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={380} draw={draw} />
      <Controls>
        <div className="ctl-row">
          <label>Clock</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={step} disabled={halted}>
              🫀 One heartbeat
            </button>
            <button type="button" className="seg-btn" onClick={reset}>
              ↺ Reset
            </button>
          </div>
        </div>
      </Controls>
      <Readouts>
        <Readout label="This is all a CPU does" value="fetch an instruction, decode its bits, execute, repeat — billions of times per second, nothing more" tone="amber" />
        <Readout label="Full circle" value="the PC is Lesson 7.3's counter; the buses are 17.2; the ADD is 17.1's ALU. You know every part." />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 17.4 — Capstone: your CPU, running programs
 * ===================================================================== */

const OPS: Record<number, string> = {
  0: "NOP", 1: "LDA", 2: "ADD", 3: "SUB", 4: "STA", 5: "LDI", 6: "JMP", 7: "JZ", 14: "OUT", 15: "HLT",
};
const enc = (op: number, arg = 0) => op * 16 + arg;

const PROGRAMS: Record<string, { name: string; mem: number[]; note: string }> = {
  add: {
    name: "Add two numbers",
    mem: [enc(1, 14), enc(2, 15), enc(14), enc(15), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4],
    note: "LDA 14 · ADD 15 · OUT · HLT — set the data cells below, run, read the OUT display",
  },
  countdown: {
    name: "Countdown to zero",
    mem: [enc(1, 14), enc(14), enc(3, 15), enc(7, 6), enc(6, 1), 0, enc(14), enc(15), 0, 0, 0, 0, 0, 0, 5, 1],
    note: "uses JZ — the Z flag from your ALU decides when to stop",
  },
  fib: {
    name: "Fibonacci forever",
    mem: [enc(5, 0), enc(4, 14), enc(5, 1), enc(4, 15), enc(1, 14), enc(14), enc(2, 15), enc(4, 13), enc(1, 15), enc(4, 14), enc(1, 13), enc(4, 15), enc(6, 4), 0, 0, 0],
    note: "0 1 1 2 3 5 8 13 21… — watch it wrap past 255 (overflow, Lesson 7.2, in the wild)",
  },
};

interface CpuState {
  pc: number;
  a: number;
  out: number | null;
  halted: boolean;
  mem: number[];
  steps: number;
}

const freshCpu = (mem: number[]): CpuState => ({ pc: 0, a: 0, out: null, halted: false, mem: [...mem], steps: 0 });

function cpuStep(s: CpuState): CpuState {
  if (s.halted) return s;
  const n: CpuState = { ...s, mem: [...s.mem], steps: s.steps + 1 };
  const instr = n.mem[n.pc & 0xf];
  const op = instr >> 4;
  const arg = instr & 0xf;
  n.pc = (n.pc + 1) & 0xf;
  switch (op) {
    case 1: n.a = n.mem[arg]; break;
    case 2: n.a = (n.a + n.mem[arg]) & 0xff; break;
    case 3: n.a = (n.a - n.mem[arg] + 256) & 0xff; break;
    case 4: n.mem[arg] = n.a; break;
    case 5: n.a = arg; break;
    case 6: n.pc = arg; break;
    case 7: if (n.a === 0) n.pc = arg; break;
    case 14: n.out = n.a; break;
    case 15: n.halted = true; break;
  }
  return n;
}

export function CpuLab() {
  const [progKey, setProgKey] = useState<keyof typeof PROGRAMS>("add");
  const [cpu, setCpu] = useState<CpuState>(() => freshCpu(PROGRAMS.add.mem));
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(4);
  const [d14, setD14] = useState(3);
  const [d15, setD15] = useState(4);

  const loadProgram = (key: keyof typeof PROGRAMS, v14 = d14, v15 = d15) => {
    const mem = [...PROGRAMS[key].mem];
    if (key !== "fib") {
      mem[14] = v14;
      mem[15] = key === "countdown" ? 1 : v15;
    }
    setCpu(freshCpu(mem));
    setRunning(false);
  };

  useEffect(() => {
    if (!running || cpu.halted) return;
    const t = setTimeout(() => setCpu((s) => cpuStep(s)), 1000 / speed);
    return () => clearTimeout(t);
  }, [running, cpu, speed]);

  const dis = (v: number, i: number) => {
    if (i >= 13) return `data ${v}`; // cells 13-15 are data by convention
    if (v === 0) return "NOP";
    const op = v >> 4;
    const arg = v & 0xf;
    if (OPS[op]) return `${OPS[op]}${op >= 1 && op <= 7 ? " " + arg : ""}`;
    return `${v}`;
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    // memory
    D.label(ctx, "memory (16 cells)", 160, 24, { color: D.COL.accent, size: 12, bold: true });
    for (let i = 0; i < 16; i++) {
      const hot = i === cpu.pc && !cpu.halted;
      ctx.fillStyle = hot ? "rgba(246,178,107,0.13)" : "#101825";
      ctx.strokeStyle = hot ? D.COL.amber : "#2a3646";
      ctx.lineWidth = hot ? 2 : 1;
      ctx.beginPath();
      ctx.roundRect(40, 36 + i * 21, 250, 19, 4);
      ctx.fill();
      ctx.stroke();
      D.label(ctx, String(i).padStart(2, "0"), 60, 46 + i * 21, { color: hot ? D.COL.amber : D.COL.muted, size: 10, mono: true });
      D.label(ctx, dis(cpu.mem[i], i), 130, 46 + i * 21, { color: hot ? D.COL.amber : D.COL.text, size: 11, mono: true });
      D.label(ctx, cpu.mem[i].toString(2).padStart(8, "0"), 245, 46 + i * 21, { color: "rgba(148,163,179,0.45)", size: 9, mono: true });
    }

    // registers
    const reg = (y: number, name: string, val: string, color: string) => {
      D.meter(ctx, 360, y, 210, name, val, color);
    };
    reg(60, "PC — program counter", String(cpu.pc), D.COL.amber);
    reg(125, "A — accumulator", `${cpu.a}  (0b${cpu.a.toString(2).padStart(8, "0")})`, D.COL.accent);
    reg(190, "Z flag", cpu.a === 0 ? "1 — zero!" : "0", cpu.a === 0 ? D.COL.good : D.COL.muted);
    reg(255, "state", cpu.halted ? "HALTED" : running ? "RUNNING" : "paused", cpu.halted ? D.COL.bad : running ? D.COL.good : D.COL.muted);
    reg(320, "instructions executed", String(cpu.steps), D.COL.muted);

    // OUT display — big seven-segment vibe
    ctx.fillStyle = "#0b1119";
    ctx.strokeStyle = "#33445e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(620, 60, 250, 150, 12);
    ctx.fill();
    ctx.stroke();
    D.label(ctx, "OUT register — your CPU's display", 745, 84, { color: D.COL.muted, size: 11 });
    D.glow(ctx, 745, 145, 70, D.COL.bad, cpu.out !== null ? 0.25 : 0);
    D.label(ctx, cpu.out !== null ? String(cpu.out) : "—", 745, 150, { color: cpu.out !== null ? "#ff8888" : "#33445e", size: 52, bold: true, mono: true });
    D.label(ctx, PROGRAMS[progKey].note, 620, 250, { color: "rgba(148,163,179,0.65)", size: 11, align: "left" });
  };

  return (
    <>
      <SimCanvas width={900} height={390} draw={draw} />
      <Controls>
        <Segmented
          label="Program"
          value={progKey}
          onChange={(k) => {
            setProgKey(k as keyof typeof PROGRAMS);
            loadProgram(k as keyof typeof PROGRAMS);
          }}
          options={Object.entries(PROGRAMS).map(([k, p]) => ({ value: k, label: p.name }))}
        />
        <div className="ctl-row">
          <label>Clock</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={() => setCpu((s) => cpuStep(s))} disabled={running || cpu.halted}>
              ⏭ Step
            </button>
            <button type="button" className={`seg-btn${running ? " active" : ""}`} onClick={() => setRunning((r) => !r)} disabled={cpu.halted}>
              {running ? "⏸ Pause" : "▶ Run"}
            </button>
            <button type="button" className="seg-btn" onClick={() => loadProgram(progKey)}>
              ↺ Reset
            </button>
          </div>
        </div>
        <Slider label="Clock speed" min={1} max={30} step={1} value={speed} onChange={setSpeed} fmt={(v) => `${v} Hz`} />
        {progKey !== "fib" ? (
          <>
            <Slider label="Data cell 14" min={0} max={99} step={1} value={d14} onChange={(v) => { setD14(v); loadProgram(progKey, v, d15); }} fmt={(v) => String(v)} />
            {progKey === "add" ? (
              <Slider label="Data cell 15" min={0} max={99} step={1} value={d15} onChange={(v) => { setD15(v); loadProgram(progKey, d14, v); }} fmt={(v) => String(v)} />
            ) : null}
          </>
        ) : null}
      </Controls>
      <Readouts>
        <Readout label="What you are looking at" value="a complete, working computer: your counter as PC, your ALU, your RAM, ten opcodes — nothing else" tone="amber" />
        <Readout label="Perspective" value="your laptop's CPU is this, with 64-bit cells, billions of them, at 5 GHz — the idea does not change" />
      </Readouts>
    </>
  );
}
