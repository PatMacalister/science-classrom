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
  /**
   * What the simulation shows, for assistive technology. Canvas pixels are
   * invisible to a screen reader, so without this the lab is a blank hole in
   * the page. Labs whose state is numeric should also render <Readouts>, which
   * is a live region and announces changes.
   */
  label?: string;
}

/**
 * A fixed-logical-size, DPI-aware canvas running a requestAnimationFrame loop.
 * The draw callback is kept in a ref that is refreshed after every render, so
 * closures always see the latest React state without restarting the loop.
 *
 * Interaction is pointer-driven, but every pointer gesture is also reachable
 * from the keyboard: the canvas is focusable, arrow keys steer a virtual
 * pointer (Shift for fine steps), and Enter/Space press and release it. That
 * makes drag-based labs operable without a mouse.
 */
export default function SimCanvas({
  width = 900,
  height = 420,
  draw,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onClick,
  label,
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

    /* ---- keyboard: a virtual pointer, steered from the centre ---- */
    const vp = { x: width / 2, y: height / 2, held: false };
    const key = (ev: KeyboardEvent) => {
      const step = ev.shiftKey ? 2 : 16;
      let moved = false;
      switch (ev.key) {
        case "ArrowLeft":
          vp.x = Math.max(0, vp.x - step);
          moved = true;
          break;
        case "ArrowRight":
          vp.x = Math.min(width, vp.x + step);
          moved = true;
          break;
        case "ArrowUp":
          vp.y = Math.max(0, vp.y - step);
          moved = true;
          break;
        case "ArrowDown":
          vp.y = Math.min(height, vp.y + step);
          moved = true;
          break;
        case "Enter":
        case " ":
          ev.preventDefault();
          if (vp.held) {
            vp.held = false;
            handlers.current.onPointerUp?.({ x: vp.x, y: vp.y });
            handlers.current.onClick?.({ x: vp.x, y: vp.y });
          } else {
            vp.held = true;
            handlers.current.onPointerDown?.({ x: vp.x, y: vp.y });
          }
          return;
        case "Home":
          vp.x = width / 2;
          vp.y = height / 2;
          moved = true;
          break;
        default:
          return;
      }
      if (moved) {
        ev.preventDefault();
        handlers.current.onPointerMove?.({ x: vp.x, y: vp.y });
      }
    };
    const blur = () => {
      // never leave a drag stuck open when focus moves away
      if (vp.held) {
        vp.held = false;
        handlers.current.onPointerUp?.({ x: vp.x, y: vp.y });
      }
    };
    canvas.addEventListener("keydown", key);
    canvas.addEventListener("blur", blur);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("click", click);
      canvas.removeEventListener("keydown", key);
      canvas.removeEventListener("blur", blur);
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="sim-canvas"
      style={{ aspectRatio: `${width} / ${height}` }}
      tabIndex={0}
      role="application"
      aria-label={
        label
          ? `${label}. Arrow keys move the pointer, Enter grabs and releases.`
          : "Interactive simulation. Arrow keys move the pointer, Enter grabs and releases."
      }
    />
  );
}
