/**
 * Canvas drawing primitives for circuit schematics.
 *
 * Two-terminal components are drawn between arbitrary endpoints (any angle):
 * they render their leads plus a body centred on the midpoint, working in
 * world space via unit/perpendicular vectors so text never rotates.
 */

import { tl } from "@/spark/lib/labStrings";

export const COL = {
  wire: "#94a3b3",
  accent: "#4cc9f0",
  amber: "#f6b26b",
  good: "#47c26b",
  bad: "#f26d6d",
  muted: "#8fa0b3",
  text: "#dde6f0",
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

export function node(ctx: Ctx, x: number, y: number) {
  dot(ctx, x, y, 3.5, COL.wire);
}

export function wire(ctx: Ctx, pts: Array<[number, number]>, color = COL.wire, width = 2) {
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

/** Unit vector along (x1,y1)->(x2,y2) and its perpendicular. */
function frame(x1: number, y1: number, x2: number, y2: number) {
  const len = Math.hypot(x2 - x1, y2 - y1) || 1;
  const ux = (x2 - x1) / len;
  const uy = (y2 - y1) / len;
  return { len, ux, uy, px: -uy, py: ux, mx: (x1 + x2) / 2, my: (y1 + y2) / 2 };
}

export function resistor(
  ctx: Ctx,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  opts: { label?: string; color?: string } = {}
) {
  const f = frame(x1, y1, x2, y2);
  const bodyHalf = Math.min(24, f.len * 0.3);
  const amp = 7;
  const c = opts.color ?? COL.wire;
  wire(ctx, [[x1, y1], [f.mx - f.ux * bodyHalf, f.my - f.uy * bodyHalf]], c);
  wire(ctx, [[f.mx + f.ux * bodyHalf, f.my + f.uy * bodyHalf], [x2, y2]], c);
  const n = 6;
  const pts: Array<[number, number]> = [[f.mx - f.ux * bodyHalf, f.my - f.uy * bodyHalf]];
  for (let i = 1; i < n; i++) {
    const t = -bodyHalf + (2 * bodyHalf * i) / n;
    const a = i % 2 === 1 ? amp : -amp;
    pts.push([f.mx + f.ux * t + f.px * a, f.my + f.uy * t + f.py * a]);
  }
  pts.push([f.mx + f.ux * bodyHalf, f.my + f.uy * bodyHalf]);
  wire(ctx, pts, c);
  if (opts.label) {
    label(ctx, opts.label, f.mx + f.px * 20, f.my + f.py * 20, { color: COL.muted, size: 12 });
  }
}

/** Battery: long thin plate = + terminal (towards x2,y2). */
export function battery(
  ctx: Ctx,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  opts: { label?: string } = {}
) {
  const f = frame(x1, y1, x2, y2);
  const gap = 5;
  wire(ctx, [[x1, y1], [f.mx - f.ux * gap, f.my - f.uy * gap]]);
  wire(ctx, [[f.mx + f.ux * gap, f.my + f.uy * gap], [x2, y2]]);
  // negative plate (short, thick)
  ctx.lineCap = "round";
  wire(
    ctx,
    [
      [f.mx - f.ux * gap - f.px * 8, f.my - f.uy * gap - f.py * 8],
      [f.mx - f.ux * gap + f.px * 8, f.my - f.uy * gap + f.py * 8],
    ],
    COL.wire,
    5
  );
  // positive plate (long, thin)
  wire(
    ctx,
    [
      [f.mx + f.ux * gap - f.px * 16, f.my + f.uy * gap - f.py * 16],
      [f.mx + f.ux * gap + f.px * 16, f.my + f.uy * gap + f.py * 16],
    ],
    COL.wire,
    2
  );
  label(ctx, "+", f.mx + f.ux * 18 + f.px * 14, f.my + f.uy * 18 + f.py * 14, {
    color: COL.plus,
    size: 15,
    bold: true,
  });
  label(ctx, "−", f.mx - f.ux * 18 + f.px * 14, f.my - f.uy * 18 + f.py * 14, {
    color: COL.minus,
    size: 15,
    bold: true,
  });
  if (opts.label) {
    label(ctx, opts.label, f.mx - f.px * 24, f.my - f.py * 24, { color: COL.muted, size: 12 });
  }
}

export function capacitor(
  ctx: Ctx,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  opts: { label?: string; polarized?: boolean } = {}
) {
  const f = frame(x1, y1, x2, y2);
  const gap = 4;
  wire(ctx, [[x1, y1], [f.mx - f.ux * gap, f.my - f.uy * gap]]);
  wire(ctx, [[f.mx + f.ux * gap, f.my + f.uy * gap], [x2, y2]]);
  for (const s of [-1, 1]) {
    wire(
      ctx,
      [
        [f.mx + f.ux * gap * s - f.px * 13, f.my + f.uy * gap * s - f.py * 13],
        [f.mx + f.ux * gap * s + f.px * 13, f.my + f.uy * gap * s + f.py * 13],
      ],
      COL.wire,
      s === -1 && opts.polarized ? 5 : 2.5
    );
  }
  if (opts.polarized) {
    label(ctx, "+", f.mx + f.ux * 14 + f.px * 14, f.my + f.uy * 14 + f.py * 14, {
      color: COL.plus,
      size: 13,
      bold: true,
    });
  }
  if (opts.label) {
    label(ctx, opts.label, f.mx + f.px * 24, f.my + f.py * 24, { color: COL.muted, size: 12 });
  }
}

export function switchSym(
  ctx: Ctx,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  closed: boolean,
  opts: { label?: string } = {}
) {
  const f = frame(x1, y1, x2, y2);
  const half = 12;
  const pivot: [number, number] = [f.mx - f.ux * half, f.my - f.uy * half];
  const contact: [number, number] = [f.mx + f.ux * half, f.my + f.uy * half];
  wire(ctx, [[x1, y1], pivot]);
  wire(ctx, [contact, [x2, y2]]);
  dot(ctx, pivot[0], pivot[1], 3, COL.accent);
  dot(ctx, contact[0], contact[1], 3, COL.accent);
  if (closed) {
    wire(ctx, [pivot, contact], COL.accent, 2.5);
  } else {
    const a = Math.atan2(f.uy, f.ux) - 0.65;
    wire(
      ctx,
      [pivot, [pivot[0] + Math.cos(a) * 2 * half, pivot[1] + Math.sin(a) * 2 * half]],
      COL.accent,
      2.5
    );
  }
  if (opts.label) {
    label(ctx, opts.label, f.mx + f.px * 26, f.my + f.py * 26, { color: COL.muted, size: 12 });
  }
}

/** Diode / LED. Current flows x1 -> x2 (triangle points towards x2). */
export function led(
  ctx: Ctx,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  opts: { on?: number; color?: string; label?: string; isLED?: boolean } = {}
) {
  const f = frame(x1, y1, x2, y2);
  const half = 8;
  const c = opts.color ?? COL.bad;
  wire(ctx, [[x1, y1], [f.mx - f.ux * half, f.my - f.uy * half]]);
  wire(ctx, [[f.mx + f.ux * half, f.my + f.uy * half], [x2, y2]]);
  const on = opts.on ?? 0;
  if (on > 0) glow(ctx, f.mx, f.my, 34 + on * 18, c, 0.25 + on * 0.5);
  // triangle
  ctx.fillStyle = on > 0 ? c : "#5a6b7d";
  ctx.beginPath();
  ctx.moveTo(f.mx - f.ux * half + f.px * 9, f.my - f.uy * half + f.py * 9);
  ctx.lineTo(f.mx - f.ux * half - f.px * 9, f.my - f.uy * half - f.py * 9);
  ctx.lineTo(f.mx + f.ux * half, f.my + f.uy * half);
  ctx.closePath();
  ctx.fill();
  // cathode bar
  wire(
    ctx,
    [
      [f.mx + f.ux * half - f.px * 9, f.my + f.uy * half - f.py * 9],
      [f.mx + f.ux * half + f.px * 9, f.my + f.uy * half + f.py * 9],
    ],
    COL.wire,
    2.5
  );
  if (opts.isLED !== false) {
    // the two little "light emitted" arrows
    const ax = f.mx + f.px * 13;
    const ay = f.my + f.py * 13;
    const dir = Math.atan2(f.py, f.px);
    for (const off of [-0.35, 0.35]) {
      const a = dir + off;
      arrow(
        ctx,
        ax + Math.cos(a) * 2,
        ay + Math.sin(a) * 2,
        ax + Math.cos(a) * 12,
        ay + Math.sin(a) * 12,
        on > 0 ? c : "#5a6b7d",
        1.5,
        5
      );
    }
  }
  if (opts.label) {
    label(ctx, opts.label, f.mx - f.px * 24, f.my - f.py * 24, { color: COL.muted, size: 12 });
  }
}

export function lamp(ctx: Ctx, cx: number, cy: number, r: number, brightness: number) {
  if (brightness > 0) glow(ctx, cx, cy, r * 3.2, "#ffd98a", 0.15 + brightness * 0.75);
  ctx.strokeStyle = brightness > 0.02 ? "#ffd98a" : COL.wire;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  const d = r * 0.7;
  ctx.beginPath();
  ctx.moveTo(cx - d, cy - d);
  ctx.lineTo(cx + d, cy + d);
  ctx.moveTo(cx + d, cy - d);
  ctx.lineTo(cx - d, cy + d);
  ctx.stroke();
}

export function ground(ctx: Ctx, x: number, y: number) {
  wire(ctx, [[x, y], [x, y + 10]]);
  wire(ctx, [[x - 11, y + 10], [x + 11, y + 10]]);
  wire(ctx, [[x - 7, y + 15], [x + 7, y + 15]]);
  wire(ctx, [[x - 3, y + 20], [x + 3, y + 20]]);
}

export function icBox(ctx: Ctx, x: number, y: number, w: number, h: number, text: string) {
  ctx.fillStyle = "#1c2635";
  ctx.strokeStyle = "#3d4f6b";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 6);
  ctx.fill();
  ctx.stroke();
  label(ctx, text, x + w / 2, y + h / 2, { color: COL.text, size: 14, bold: true });
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
  // label() translates both title and value via tl()
  label(ctx, title, x + w / 2, y + 11, { color: COL.muted, size: 10 });
  label(ctx, value, x + w / 2, y + 27, { color, size: 14, bold: true, mono: true });
}
