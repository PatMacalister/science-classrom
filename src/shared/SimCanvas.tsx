"use client";

import { useEffect, useRef } from "react";

export interface PointerInfo {
  x: number;
  y: number;
}

interface SimCanvasProps {
  width?: number;
  height?: number;
  /** Called every animation frame with logical (width x height) coordinates. */
  draw: (ctx: CanvasRenderingContext2D, dt: number, t: number) => void;
  onPointerDown?: (p: PointerInfo) => void;
  onPointerMove?: (p: PointerInfo) => void;
  onPointerUp?: (p: PointerInfo) => void;
  onClick?: (p: PointerInfo) => void;
}

/**
 * A fixed-logical-size, DPI-aware canvas running a requestAnimationFrame loop.
 * The draw callback is kept in a ref that is refreshed after every render, so
 * closures always see the latest React state without restarting the loop.
 */
export default function SimCanvas({
  width = 900,
  height = 420,
  draw,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onClick,
}: SimCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handlers = useRef({ draw, onPointerDown, onPointerMove, onPointerUp, onClick });

  useEffect(() => {
    handlers.current = { draw, onPointerDown, onPointerMove, onPointerUp, onClick };
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let running = true;
    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, width, height);
      handlers.current.draw(ctx, dt, now / 1000);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const toLogical = (ev: PointerEvent | MouseEvent): PointerInfo => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: ((ev.clientX - rect.left) / rect.width) * width,
        y: ((ev.clientY - rect.top) / rect.height) * height,
      };
    };
    const down = (ev: PointerEvent) => {
      try {
        canvas.setPointerCapture(ev.pointerId);
      } catch {
        /* synthetic events have no capturable pointer — fine */
      }
      handlers.current.onPointerDown?.(toLogical(ev));
    };
    const move = (ev: PointerEvent) => handlers.current.onPointerMove?.(toLogical(ev));
    const up = (ev: PointerEvent) => handlers.current.onPointerUp?.(toLogical(ev));
    const click = (ev: MouseEvent) => handlers.current.onClick?.(toLogical(ev));
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("click", click);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("click", click);
    };
  }, [width, height]);

  return <canvas ref={canvasRef} className="sim-canvas" style={{ aspectRatio: `${width} / ${height}` }} />;
}
