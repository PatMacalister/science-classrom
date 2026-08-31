/**
 * Canvas drawing primitives for the chemistry labs: labels, meters, vessels
 * and atoms. Everything works in the SimCanvas logical coordinate space.
 * All text funnels through label(), which translates via the exact-match
 * lab dictionary (see labStrings.ts) — dynamic strings pass through.
 */

import { tl } from "@/helix/lib/labStrings";

export const COL = {
  accent: "#2dd4bf",
  amber: "#f6b26b",
  good: "#47c26b",
  bad: "#f26d6d",
  violet: "#c792ea",
  muted: "#8fa0b3",
  text: "#dde6f0",
  glass: "#7da2c1",
  plus: "#f26d6d",
  minus: "#4cc9f0",
};

type Ctx = CanvasRenderingContext2D;

const FONT = (size: number, bold = false) => `${bold ? "bold " : ""}${size}px 'Segoe UI', sans-serif`;

export function label(
  ctx: Ctx,
  text: string,
  x: number,
  y: number,
  opts: { color?: string; size?: number; bold?: boolean; align?: CanvasTextAlign; mono?: boolean } = {}
) {
  ctx.fillStyle = opts.color ?? COL.text;
  ctx.font = opts.mono
    ? `${opts.bold ? "bold " : ""}${opts.size ?? 13}px Consolas, monospace`
    : FONT(opts.size ?? 13, opts.bold);
  ctx.textAlign = opts.align ?? "center";
  ctx.textBaseline = "middle";
  ctx.fillText(tl(text), x, y);
}

export function dot(ctx: Ctx, x: number, y: number, r: number, color: string) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

export function ring(ctx: Ctx, x: number, y: number, r: number, color: string, width = 1.5) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
}

export function wire(ctx: Ctx, pts: Array<[number, number]>, color = COL.muted, width = 2) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineJoin = "round";
  ctx.beginPath();
  pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.stroke();
}

export function arrow(
  ctx: Ctx,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color = COL.accent,
  width = 2,
  head = 8
) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - head * Math.cos(ang - 0.45), y2 - head * Math.sin(ang - 0.45));
  ctx.lineTo(x2 - head * Math.cos(ang + 0.45), y2 - head * Math.sin(ang + 0.45));
  ctx.closePath();
  ctx.fill();
}

export function glow(ctx: Ctx, x: number, y: number, r: number, color: string, alpha: number) {
  if (alpha <= 0) return;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.save();
  ctx.globalAlpha = Math.min(1, alpha);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/** Small digital meter box drawn on the canvas. */
export function meter(
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  title: string,
  value: string,
  color = COL.accent
) {
  const h = 40;
  ctx.fillStyle = "#101825";
  ctx.strokeStyle = "#33445e";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 6);
  ctx.fill();
  ctx.stroke();
  label(ctx, title, x + w / 2, y + 11, { color: COL.muted, size: 10 });
  label(ctx, value, x + w / 2, y + 27, { color, size: 14, bold: true, mono: true });
}

/** Flat panel with border — background for sub-diagrams. */
export function panel(ctx: Ctx, x: number, y: number, w: number, h: number, fill = "#0b1119") {
  ctx.fillStyle = fill;
  ctx.strokeStyle = "#243144";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 8);
  ctx.fill();
  ctx.stroke();
}

/**
 * A beaker seen from the front: glass outline, liquid of the given color
 * filled to `level` (0..1 of the inner height). Returns the liquid surface y.
 */
export function beaker(
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number,
  level: number,
  liquid: string
): number {
  const surface = y + h - Math.max(0, Math.min(1, level)) * (h - 8);
  // liquid
  if (level > 0) {
    ctx.fillStyle = liquid;
    ctx.beginPath();
    ctx.moveTo(x + 3, surface);
    ctx.lineTo(x + w - 3, surface);
    ctx.lineTo(x + w - 3, y + h - 6);
    ctx.quadraticCurveTo(x + w - 3, y + h - 2, x + w - 9, y + h - 2);
    ctx.lineTo(x + 9, y + h - 2);
    ctx.quadraticCurveTo(x + 3, y + h - 2, x + 3, y + h - 6);
    ctx.closePath();
    ctx.fill();
    // surface sheen
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x + 4, surface);
    ctx.lineTo(x + w - 4, surface);
    ctx.stroke();
  }
  // glass
  ctx.strokeStyle = COL.glass;
  ctx.lineWidth = 2.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x - 6, y); // pouring lip
  ctx.lineTo(x, y + 4);
  ctx.lineTo(x, y + h - 8);
  ctx.quadraticCurveTo(x, y + h, x + 8, y + h);
  ctx.lineTo(x + w - 8, y + h);
  ctx.quadraticCurveTo(x + w, y + h, x + w, y + h - 8);
  ctx.lineTo(x + w, y + 4);
  ctx.lineTo(x + w + 6, y);
  ctx.stroke();
  return surface;
}

/** A closed test tube, upright, with liquid/gas fill from the bottom. */
export function tube(ctx: Ctx, x: number, y: number, w: number, h: number, level: number, liquid: string) {
  const r = w / 2;
  if (level > 0) {
    const surface = y + (1 - Math.min(1, level)) * (h - r);
    ctx.fillStyle = liquid;
    ctx.beginPath();
    ctx.moveTo(x, surface);
    ctx.lineTo(x + w, surface);
    ctx.lineTo(x + w, y + h - r);
    ctx.arc(x + r, y + h - r, r, 0, Math.PI);
    ctx.closePath();
    ctx.fill();
  }
  ctx.strokeStyle = COL.glass;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + h - r);
  ctx.arc(x + r, y + h - r, r, Math.PI, 0, true);
  ctx.lineTo(x + w, y);
  ctx.stroke();
}

export interface ShellSpec {
  /** Electrons per shell, innermost first, e.g. [2, 8, 1] for sodium. */
  shells: number[];
  symbol: string;
  color?: string;
}

/**
 * Bohr-style atom: nucleus + electron shells with dots. `spin` rotates the
 * electrons (pass a time value for gentle animation). Radius of the outermost
 * shell is `r`.
 */
export function atom(ctx: Ctx, cx: number, cy: number, r: number, spec: ShellSpec, spin = 0) {
  const n = spec.shells.length;
  const nucleusR = Math.max(9, r * 0.16);
  glow(ctx, cx, cy, nucleusR * 2.2, spec.color ?? COL.amber, 0.35);
  dot(ctx, cx, cy, nucleusR, spec.color ?? COL.amber);
  label(ctx, spec.symbol, cx, cy + 1, { color: "#0b0f14", size: Math.max(9, nucleusR * 0.9), bold: true });
  for (let s = 0; s < n; s++) {
    const sr = nucleusR + ((r - nucleusR) * (s + 1)) / n;
    ring(ctx, cx, cy, sr, "rgba(148,163,179,0.35)", 1);
    const count = spec.shells[s];
    for (let i = 0; i < count; i++) {
      const a = spin * (s % 2 === 0 ? 1 : -1) * 0.4 + (i / count) * Math.PI * 2;
      dot(ctx, cx + Math.cos(a) * sr, cy + Math.sin(a) * sr, 3.2, COL.accent);
    }
  }
}

/** Horizontal bar gauge with a label — for progress/amount readouts on canvas. */
export function barGauge(
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number,
  frac: number,
  color: string,
  text?: string
) {
  ctx.fillStyle = "#101825";
  ctx.strokeStyle = "#33445e";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 4);
  ctx.fill();
  ctx.stroke();
  const f = Math.max(0, Math.min(1, frac));
  if (f > 0) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(x + 1.5, y + 1.5, (w - 3) * f, h - 3, 3);
    ctx.fill();
  }
  if (text) label(ctx, text, x + w / 2, y + h / 2 + 1, { size: 11, color: COL.text, bold: true });
}

/** Flame under a vessel — intensity 0..1. */
export function flame(ctx: Ctx, cx: number, cy: number, intensity: number, t: number) {
  if (intensity <= 0.01) return;
  const flick = 1 + 0.08 * Math.sin(t * 13) + 0.05 * Math.sin(t * 29);
  const hgt = (14 + 30 * intensity) * flick;
  for (const [scale, color] of [
    [1, "rgba(246,178,107,0.85)"],
    [0.55, "rgba(255,232,160,0.95)"],
  ] as const) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cx - 10 * scale, cy);
    ctx.quadraticCurveTo(cx - 10 * scale, cy - hgt * scale * 0.55, cx, cy - hgt * scale);
    ctx.quadraticCurveTo(cx + 10 * scale, cy - hgt * scale * 0.55, cx + 10 * scale, cy);
    ctx.closePath();
    ctx.fill();
  }
}
