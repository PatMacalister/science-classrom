/** Shared math / formatting / animation helpers for the interactive labs. */

import { tl } from "@/spark/lib/labStrings";

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const SI_PREFIXES: Array<[number, string]> = [
  [1e9, "G"],
  [1e6, "M"],
  [1e3, "k"],
  [1, ""],
  [1e-3, "m"],
  [1e-6, "µ"],
  [1e-9, "n"],
  [1e-12, "p"],
];

/** Format a value with an engineering SI prefix: 4700 -> "4.7 kΩ". */
export function fmtSI(value: number, unit = "", sig = 3): string {
  if (!isFinite(value)) return "∞ " + unit;
  if (value === 0) return "0 " + unit;
  const abs = Math.abs(value);
  let factor = 1e-12;
  let prefix = "p";
  for (const [f, p] of SI_PREFIXES) {
    if (abs >= f) {
      factor = f;
      prefix = p;
      break;
    }
  }
  let s = (value / factor).toPrecision(sig);
  if (s.includes("e")) s = Number(s).toString();
  if (s.includes(".")) s = s.replace(/\.?0+$/, "");
  return `${s} ${prefix}${unit}`;
}

/** Fixed decimals, e.g. fmtFixed(3.14159, 2) -> "3.14". */
export const fmtFixed = (v: number, digits = 2) => v.toFixed(digits);

const SUPERSCRIPTS: Record<string, string> = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
  "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻",
};

/** Scientific notation with unicode superscripts: 6.24e18 -> "6.2 × 10¹⁸". */
export function fmtSci(value: number, sig = 2): string {
  if (value === 0) return "0";
  const exp = Math.floor(Math.log10(Math.abs(value)));
  const mant = value / Math.pow(10, exp);
  const expStr = String(exp)
    .split("")
    .map((c) => SUPERSCRIPTS[c] ?? c)
    .join("");
  return `${mant.toPrecision(sig)} × 10${expStr}`;
}

/** E12 preferred resistor values spanning the given range (inclusive-ish). */
export function e12Range(min: number, max: number): number[] {
  const bases = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];
  const out: number[] = [];
  for (let decade = 1e-1; decade <= 1e9; decade *= 10) {
    for (const b of bases) {
      const v = Math.round(b * decade * 1e6) / 1e6;
      if (v >= min * 0.999 && v <= max * 1.001) out.push(v);
    }
  }
  return out;
}

export interface PathPoint {
  x: number;
  y: number;
  ang: number;
}

export interface PolyPath {
  length: number;
  points: Array<[number, number]>;
  at(s: number): PathPoint;
}

/** A polyline with arc-length parameterisation (wraps around, for loops). */
export function polyPath(pts: Array<[number, number]>): PolyPath {
  const segs: Array<{ x1: number; y1: number; x2: number; y2: number; len: number; start: number }> = [];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const len = Math.hypot(x2 - x1, y2 - y1);
    if (len === 0) continue;
    segs.push({ x1, y1, x2, y2, len, start: total });
    total += len;
  }
  return {
    length: total,
    points: pts,
    at(s: number): PathPoint {
      if (total === 0) return { x: pts[0][0], y: pts[0][1], ang: 0 };
      s = ((s % total) + total) % total;
      for (const g of segs) {
        if (s <= g.start + g.len) {
          const t = (s - g.start) / g.len;
          return {
            x: g.x1 + (g.x2 - g.x1) * t,
            y: g.y1 + (g.y2 - g.y1) * t,
            ang: Math.atan2(g.y2 - g.y1, g.x2 - g.x1),
          };
        }
      }
      const last = segs[segs.length - 1];
      return { x: last.x2, y: last.y2, ang: Math.atan2(last.y2 - last.y1, last.x2 - last.x1) };
    },
  };
}

/** Evenly spaced dots flowing along a path — the visual for current. */
export class Flow {
  private offset = 0;
  private spacing: number;
  constructor(
    public path: PolyPath,
    spacing = 26
  ) {
    const n = Math.max(1, Math.round(path.length / spacing));
    this.spacing = path.length / n;
  }
  /** Advance by speed (px/s); negative reverses direction. */
  step(dt: number, speed: number) {
    this.offset = (this.offset + speed * dt) % this.spacing;
    if (this.offset < 0) this.offset += this.spacing;
  }
  forEachDot(fn: (p: PathPoint) => void) {
    const n = Math.round(this.path.length / this.spacing);
    for (let i = 0; i < n; i++) fn(this.path.at(this.offset + i * this.spacing));
  }
}

export interface WaveTrace {
  label: string;
  color: string;
  /** Signal value at time t (seconds from the window's left edge). */
  fn: (t: number) => number;
  dash?: number[];
  width?: number;
}

/**
 * Draw analytically-defined waveforms into a scope-styled panel.
 * Unlike Scope (which accumulates pushed samples), this evaluates each trace
 * fresh every frame — ideal for steady-state AC signals.
 */
export function drawWaves(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  traces: WaveTrace[],
  opts: {
    tSpan: number;
    vMin: number;
    vMax: number;
    timeLabel?: string;
    hlines?: Array<{ value: number; label: string; color?: string }>;
    samples?: number;
  }
) {
  ctx.save();
  ctx.fillStyle = "#0b1119";
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = "#243144";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 1; i < 6; i++) {
    ctx.moveTo(x + (w * i) / 6, y);
    ctx.lineTo(x + (w * i) / 6, y + h);
  }
  for (let i = 1; i < 4; i++) {
    ctx.moveTo(x, y + (h * i) / 4);
    ctx.lineTo(x + w, y + (h * i) / 4);
  }
  ctx.stroke();

  const mapY = (v: number) =>
    y + h - ((clamp(v, opts.vMin, opts.vMax) - opts.vMin) / (opts.vMax - opts.vMin)) * h;

  // zero axis
  if (opts.vMin < 0 && opts.vMax > 0) {
    ctx.strokeStyle = "#33445e";
    ctx.beginPath();
    ctx.moveTo(x, mapY(0));
    ctx.lineTo(x + w, mapY(0));
    ctx.stroke();
  }

  for (const hl of opts.hlines ?? []) {
    const yy = mapY(hl.value);
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = hl.color ?? "rgba(246, 178, 107, 0.5)";
    ctx.beginPath();
    ctx.moveTo(x, yy);
    ctx.lineTo(x + w, yy);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = hl.color ?? "rgba(246, 178, 107, 0.9)";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(tl(hl.label), x + w - 6, yy - 5);
  }

  const n = opts.samples ?? 300;
  traces.forEach((tr, ti) => {
    ctx.strokeStyle = tr.color;
    ctx.lineWidth = tr.width ?? 2;
    ctx.setLineDash(tr.dash ?? []);
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const t = (i / n) * opts.tSpan;
      const py = mapY(tr.fn(t));
      const px = x + (i / n) * w;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = tr.color;
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(tl(tr.label), x + 8, y + 16 + ti * 16);
  });

  ctx.strokeStyle = "#33445e";
  ctx.strokeRect(x, y, w, h);
  if (opts.timeLabel) {
    ctx.fillStyle = "#8fa0b3";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(tl(opts.timeLabel), x + w - 6, y + h - 6);
  }
  ctx.restore();
}

export interface ScopeTrace {
  label: string;
  color: string;
  min: number;
  max: number;
}

interface ScopeSample {
  t: number;
  vals: number[];
}

/**
 * A scrolling strip-chart (oscilloscope-style). Push samples in *circuit time*;
 * the window is `seconds` of circuit time wide.
 */
export class Scope {
  private buf: ScopeSample[] = [];
  constructor(
    public traces: ScopeTrace[],
    public seconds: number
  ) {}

  setWindow(seconds: number) {
    if (seconds !== this.seconds) {
      this.seconds = seconds;
      this.clear();
    }
  }

  push(t: number, vals: number[]) {
    this.buf.push({ t, vals });
    const cutoff = t - this.seconds;
    while (this.buf.length && this.buf[0].t < cutoff) this.buf.shift();
  }

  clear() {
    this.buf = [];
  }

  get lastTime(): number {
    return this.buf.length ? this.buf[this.buf.length - 1].t : 0;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    opts: {
      timeLabel?: string;
      hlines?: Array<{ trace: number; value: number; label: string }>;
    } = {}
  ) {
    ctx.save();
    ctx.fillStyle = "#0b1119";
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "#243144";
    ctx.lineWidth = 1;
    const cols = 6;
    const rows = 4;
    ctx.beginPath();
    for (let i = 1; i < cols; i++) {
      ctx.moveTo(x + (w * i) / cols, y);
      ctx.lineTo(x + (w * i) / cols, y + h);
    }
    for (let i = 1; i < rows; i++) {
      ctx.moveTo(x, y + (h * i) / rows);
      ctx.lineTo(x + w, y + (h * i) / rows);
    }
    ctx.stroke();
    ctx.strokeStyle = "#33445e";
    ctx.strokeRect(x, y, w, h);

    const tEnd = this.lastTime;
    const tStart = tEnd - this.seconds;
    const mapX = (t: number) => x + ((t - tStart) / this.seconds) * w;

    for (const hl of opts.hlines ?? []) {
      const tr = this.traces[hl.trace];
      const yy = y + h - ((hl.value - tr.min) / (tr.max - tr.min)) * h;
      if (yy < y || yy > y + h) continue;
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = "rgba(246, 178, 107, 0.5)";
      ctx.beginPath();
      ctx.moveTo(x, yy);
      ctx.lineTo(x + w, yy);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(246, 178, 107, 0.9)";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(tl(hl.label), x + w - 6, yy - 5);
    }

    this.traces.forEach((tr, ti) => {
      ctx.strokeStyle = tr.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      let started = false;
      for (const s of this.buf) {
        const px = mapX(s.t);
        if (px < x - 2) continue;
        const v = clamp(s.vals[ti], tr.min, tr.max);
        const py = y + h - ((v - tr.min) / (tr.max - tr.min)) * h;
        if (!started) {
          ctx.moveTo(px, py);
          started = true;
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();
      ctx.fillStyle = tr.color;
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(tl(tr.label), x + 8, y + 16 + ti * 16);
    });

    if (opts.timeLabel) {
      ctx.fillStyle = "#8fa0b3";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(tl(opts.timeLabel), x + w - 6, y + h - 6);
    }
    ctx.restore();
  }
}
