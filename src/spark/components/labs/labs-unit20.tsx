"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider } from "@/spark/components/controls";
import { clamp } from "@/spark/lib/sim/helpers";
import * as D from "@/spark/lib/sim/draw";

/* =====================================================================
 * Lab 20.1 — The layer explorer: a PCB is a sandwich
 * ===================================================================== */

type LayerName = "silkTop" | "maskTop" | "copperTop" | "core" | "copperBot" | "drills";

const LAYER_INFO: Array<{ id: LayerName; label: string; blurb: string }> = [
  { id: "silkTop", label: "Silkscreen", blurb: "ink: labels & outlines — for humans only" },
  { id: "maskTop", label: "Soldermask", blurb: "the green(ish) lacquer — insulates copper, bares the pads" },
  { id: "copperTop", label: "Copper (top)", blurb: "the actual circuit: traces and pads" },
  { id: "core", label: "FR-4 core", blurb: "fibreglass board — the insulating skeleton" },
  { id: "copperBot", label: "Copper (bottom)", blurb: "second wiring floor, reached by holes" },
  { id: "drills", label: "Drills & vias", blurb: "holes: component legs and layer-to-layer elevators" },
];

// simplified 555 blinker board geometry (logical coords in a 640×300 board)
const PADS_TOP: Array<[number, number]> = [
  [180, 110], [180, 150], [180, 190], [180, 230], // 555 left column
  [280, 110], [280, 150], [280, 190], [280, 230], // 555 right column
  [420, 110], [500, 110], // R1
  [420, 190], [500, 190], // 470R
  [560, 150], [560, 230], // LED
  [100, 110], [100, 230], // power header
];
const TRACES_TOP: Array<Array<[number, number]>> = [
  [[100, 110], [180, 110]],
  [[280, 110], [420, 110]],
  [[500, 110], [500, 150], [560, 150]],
  [[280, 190], [420, 190]],
  [[500, 190], [560, 190], [560, 230]],
  [[100, 230], [180, 230]],
];
const TRACES_BOT: Array<Array<[number, number]>> = [
  [[180, 150], [120, 150], [120, 300]],
  [[280, 230], [340, 230], [340, 300]],
];

export function LayerExplorerLab() {
  const [visible, setVisible] = useState<Record<LayerName, boolean>>({
    silkTop: true,
    maskTop: true,
    copperTop: true,
    core: true,
    copperBot: true,
    drills: true,
  });
  const [explode, setExplode] = useState(0);

  const draw = (ctx: CanvasRenderingContext2D) => {
    const bx = 130, by = 40, bw = 640, bh = 300;
    // exploded view: each layer drifts vertically apart
    const off = (idx: number) => (idx - 2.5) * explode * 26;

    const layerOrder: LayerName[] = ["copperBot", "core", "copperTop", "maskTop", "silkTop"];
    const idxOf: Record<string, number> = { copperBot: 0, core: 1, copperTop: 2, maskTop: 3, silkTop: 4 };

    for (const layer of layerOrder) {
      if (!visible[layer]) continue;
      const dy = off(idxOf[layer]);
      ctx.save();
      ctx.translate(0, dy);

      if (layer === "core") {
        ctx.fillStyle = "#8a7a3f";
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, 10);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      if (layer === "copperBot") {
        ctx.strokeStyle = "#7c5f35";
        ctx.lineWidth = 7;
        ctx.lineCap = "round";
        for (const t of TRACES_BOT) {
          ctx.beginPath();
          t.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(bx + x, by + y) : ctx.lineTo(bx + x, by + y)));
          ctx.stroke();
        }
      }
      if (layer === "copperTop") {
        ctx.strokeStyle = "#c8963c";
        ctx.lineWidth = 7;
        ctx.lineCap = "round";
        for (const t of TRACES_TOP) {
          ctx.beginPath();
          t.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(bx + x, by + y) : ctx.lineTo(bx + x, by + y)));
          ctx.stroke();
        }
        for (const [x, y] of PADS_TOP) D.dot(ctx, bx + x, by + y, 10, "#c8963c");
      }
      if (layer === "maskTop") {
        ctx.fillStyle = "rgba(20, 92, 56, 0.55)";
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, 10);
        ctx.fill();
        // mask openings over pads
        if (visible.copperTop) {
          ctx.globalCompositeOperation = "destination-out";
          for (const [x, y] of PADS_TOP) {
            ctx.beginPath();
            ctx.arc(bx + x, by + y, 12, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.globalCompositeOperation = "source-over";
        }
      }
      if (layer === "silkTop") {
        ctx.strokeStyle = "#e8eef5";
        ctx.lineWidth = 2;
        ctx.strokeRect(bx + 160, by + 90, 140, 160);
        D.label(ctx, "U1  555", bx + 230, by + 76, { color: "#e8eef5", size: 12, bold: true });
        D.label(ctx, "R1", bx + 460, by + 90, { color: "#e8eef5", size: 11 });
        D.label(ctx, "R2", bx + 460, by + 170, { color: "#e8eef5", size: 11 });
        D.label(ctx, "D1", bx + 590, by + 190, { color: "#e8eef5", size: 11 });
        D.label(ctx, "⚡ SPARK-1  rev A", bx + 320, by + 280, { color: "#e8eef5", size: 10 });
      }
      if (layer === "drills") {
        for (const [x, y] of PADS_TOP) {
          ctx.fillStyle = "#0a0e14";
          ctx.beginPath();
          ctx.arc(bx + x, by + y, 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
        // vias where top traces meet bottom traces
        for (const [x, y] of [[180, 150], [280, 230]] as Array<[number, number]>) {
          ctx.strokeStyle = "#9db2c7";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(bx + x, by + y, 6.5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      ctx.restore();
    }
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} />
      <Controls>
        {LAYER_INFO.map((l) => (
          <div className="ctl-row" key={l.id}>
            <label>{l.label}</label>
            <div className="seg">
              <button
                type="button"
                className={`seg-btn${visible[l.id] ? " active" : ""}`}
                onClick={() => setVisible((v) => ({ ...v, [l.id]: !v[l.id] }))}
              >
                {visible[l.id] ? "visible" : "hidden"}
              </button>
            </div>
            <span className="read" style={{ flex: 1, textAlign: "left", color: "var(--muted)" }}>
              {l.blurb}
            </span>
          </div>
        ))}
        <Slider label="Explode the sandwich" min={0} max={1} step={0.01} value={explode} onChange={setExplode} fmt={(v) => `${Math.round(v * 100)}%`} />
      </Controls>
      <Readouts>
        <Readout label="This is your blinker" value="the same 555 circuit, drawn as copper instead of jumper wires — toggle layers until each one's job is obvious" tone="amber" />
        <Readout label="Try this" value="Hide the soldermask and see how much copper it protects. Explode the stack and find the two vias diving to the bottom floor." />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 20.2 — The routing puzzle: two layers, no crossings
 * ===================================================================== */

const GRID_W = 16;
const GRID_H = 9;
const CELL = 52;
const GX = 34, GY = 30;

interface Net {
  name: string;
  color: string;
  a: [number, number];
  b: [number, number];
}
const NETS: Net[] = [
  { name: "VCC", color: "#f26d6d", a: [1, 1], b: [14, 1] },
  { name: "OUT", color: "#f6b26b", a: [4, 4], b: [11, 7] },
  { name: "GND", color: "#4cc9f0", a: [1, 7], b: [14, 7] },
  { name: "TRIG", color: "#47c26b", a: [4, 7], b: [11, 1] },
];
// the chip body blocks a rectangle in the middle
const BLOCKED = new Set<string>();
for (let x = 6; x <= 9; x++) for (let y = 3; y <= 5; y++) BLOCKED.add(`${x},${y}`);

type Cell = { x: number; y: number; layer: 0 | 1 };

export function RoutePuzzleLab() {
  const [paths, setPaths] = useState<Record<string, Cell[]>>({});
  const [activeNet, setActiveNet] = useState(0);
  const [layer, setLayer] = useState<0 | 1>(0);
  const drawing = useRef(false);

  const key = (x: number, y: number) => `${x},${y}`;
  const cellAt = (px: number, py: number): [number, number] | null => {
    const x = Math.floor((px - GX) / CELL);
    const y = Math.floor((py - GY) / CELL);
    return x >= 0 && x < GRID_W && y >= 0 && y < GRID_H ? [x, y] : null;
  };

  /** occupancy per layer, excluding a given net */
  const occupied = (exceptNet: string): Set<string>[] => {
    const occ = [new Set<string>(), new Set<string>()];
    for (const [name, cells] of Object.entries(paths)) {
      if (name === exceptNet) continue;
      for (const c of cells) occ[c.layer].add(key(c.x, c.y));
    }
    // pads of other nets block BOTH layers (a leg goes through the board)
    for (const n of NETS) {
      if (n.name === exceptNet) continue;
      for (const p of [n.a, n.b]) {
        occ[0].add(key(p[0], p[1]));
        occ[1].add(key(p[0], p[1]));
      }
    }
    return occ;
  };

  const tryExtend = (px: number, py: number) => {
    const net = NETS[activeNet];
    const cell = cellAt(px, py);
    if (!cell) return;
    const [tx, ty] = cell;
    setPaths((old) => {
      let path = old[net.name] ?? [];
      if (path.length === 0) {
        // must start at one of the net's pads
        if ((tx === net.a[0] && ty === net.a[1]) || (tx === net.b[0] && ty === net.b[1])) {
          if (BLOCKED.has(key(tx, ty)) && layer === 0) return old;
          return { ...old, [net.name]: [{ x: tx, y: ty, layer }] };
        }
        return old;
      }
      const occ = occupied(net.name);
      // fast pointers jump many cells per event — walk toward the target one
      // legal manhattan step at a time, validating each cell like a slow drag
      let guard = 64;
      let changed = false;
      while (guard-- > 0) {
        const head = path[path.length - 1];
        if (head.x === tx && head.y === ty) {
          // on the target cell: a layer switch here is a via
          if (head.layer !== layer) {
            path = [...path, { x: tx, y: ty, layer }];
            changed = true;
          }
          break;
        }
        if (head.layer !== layer) break; // place the via first, then keep dragging
        const dx = Math.sign(tx - head.x);
        const dy = Math.sign(ty - head.y);
        // prefer the axis with the larger remaining distance
        const candidates: Array<[number, number]> =
          Math.abs(tx - head.x) >= Math.abs(ty - head.y)
            ? [[head.x + dx, head.y], [head.x, head.y + dy]]
            : [[head.x, head.y + dy], [head.x + dx, head.y]];
        let stepped = false;
        for (const [nx, ny] of candidates) {
          if (nx === head.x && ny === head.y) continue;
          const prev = path[path.length - 2];
          if (prev && prev.x === nx && prev.y === ny && prev.layer === layer) {
            path = path.slice(0, -1); // backtrack
            stepped = true;
            changed = true;
            break;
          }
          if (BLOCKED.has(key(nx, ny)) && layer === 0) continue;
          if (occ[layer].has(key(nx, ny))) continue;
          path = [...path, { x: nx, y: ny, layer }];
          stepped = true;
          changed = true;
          break;
        }
        if (!stepped) break;
      }
      return changed ? { ...old, [net.name]: path } : old;
    });
  };

  const netDone = (net: Net): boolean => {
    const path = paths[net.name] ?? [];
    if (path.length < 2) return false;
    const ends = [path[0], path[path.length - 1]];
    const hasA = ends.some((c) => c.x === net.a[0] && c.y === net.a[1]);
    const hasB = ends.some((c) => c.x === net.b[0] && c.y === net.b[1]);
    return hasA && hasB;
  };

  const allDone = NETS.every(netDone);
  const viaCount = Object.values(paths).reduce((acc, path) => {
    let v = 0;
    for (let i = 1; i < path.length; i++) if (path[i].layer !== path[i - 1].layer) v++;
    return acc + v;
  }, 0);

  const draw = (ctx: CanvasRenderingContext2D) => {
    // board + grid
    ctx.fillStyle = "#14340f";
    ctx.beginPath();
    ctx.roundRect(GX - 10, GY - 10, GRID_W * CELL + 20, GRID_H * CELL + 20, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= GRID_W; x++) {
      ctx.beginPath();
      ctx.moveTo(GX + x * CELL, GY);
      ctx.lineTo(GX + x * CELL, GY + GRID_H * CELL);
      ctx.stroke();
    }
    for (let y = 0; y <= GRID_H; y++) {
      ctx.beginPath();
      ctx.moveTo(GX, GY + y * CELL);
      ctx.lineTo(GX + GRID_W * CELL, GY + y * CELL);
      ctx.stroke();
    }
    // chip body
    ctx.fillStyle = "#1c2635";
    ctx.strokeStyle = "#3d4f6b";
    ctx.beginPath();
    ctx.roundRect(GX + 6 * CELL + 4, GY + 3 * CELL + 4, 4 * CELL - 8, 3 * CELL - 8, 6);
    ctx.fill();
    ctx.stroke();
    D.label(ctx, "555 (top blocked — route under it!)", GX + 8 * CELL, GY + 4.5 * CELL, { color: D.COL.muted, size: 11 });

    const center = (x: number, y: number): [number, number] => [GX + x * CELL + CELL / 2, GY + y * CELL + CELL / 2];

    // ratsnest for unrouted nets
    for (const net of NETS) {
      if (netDone(net) || (paths[net.name]?.length ?? 0) > 0) continue;
      const [ax, ay] = center(net.a[0], net.a[1]);
      const [bx2, by2] = center(net.b[0], net.b[1]);
      ctx.setLineDash([4, 8]);
      D.wire(ctx, [[ax, ay], [bx2, by2]], `${net.color}55`, 1.5);
      ctx.setLineDash([]);
    }

    // paths: bottom layer first (darker, dashed feel), then top
    for (const pass of [1, 0] as const) {
      for (const net of NETS) {
        const path = paths[net.name] ?? [];
        ctx.lineWidth = pass === 0 ? 9 : 7;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 1; i < path.length; i++) {
          if (path[i].layer !== pass || path[i - 1].layer !== pass) continue;
          const [x1, y1] = center(path[i - 1].x, path[i - 1].y);
          const [x2, y2] = center(path[i].x, path[i].y);
          ctx.strokeStyle = pass === 0 ? net.color : `${net.color}88`;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
        // vias
        for (let i = 1; i < path.length; i++) {
          if (path[i].layer !== path[i - 1].layer) {
            const [vx, vy] = center(path[i].x, path[i].y);
            ctx.fillStyle = "#dde6f0";
            ctx.beginPath();
            ctx.arc(vx, vy, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#0a0e14";
            ctx.beginPath();
            ctx.arc(vx, vy, 3.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }

    // pads
    for (const net of NETS) {
      for (const p of [net.a, net.b]) {
        const [px2, py2] = center(p[0], p[1]);
        D.glow(ctx, px2, py2, 16, net.color, netDone(net) ? 0.5 : 0.2);
        D.dot(ctx, px2, py2, 11, net.color);
        ctx.fillStyle = "#0a0e14";
        ctx.beginPath();
        ctx.arc(px2, py2, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      const [lx, ly] = center(net.a[0], net.a[1]);
      D.label(ctx, net.name, lx, ly - 20, { color: net.color, size: 10, bold: true });
    }
  };

  return (
    <>
      <SimCanvas
        width={900}
        height={510}
        draw={draw}
        onPointerDown={(p) => {
          drawing.current = true;
          tryExtend(p.x, p.y);
        }}
        onPointerMove={(p) => {
          if (drawing.current) tryExtend(p.x, p.y);
        }}
        onPointerUp={() => (drawing.current = false)}
      />
      <Controls>
        <Segmented
          label="Routing net"
          value={String(activeNet)}
          onChange={(v) => setActiveNet(Number(v))}
          options={NETS.map((n, i) => ({ value: String(i), label: `${netDone(n) ? "✓ " : ""}${n.name}` }))}
        />
        <Segmented
          label="Layer"
          value={String(layer)}
          onChange={(v) => setLayer(Number(v) as 0 | 1)}
          options={[
            { value: "0", label: "Top copper (bright)" },
            { value: "1", label: "Bottom copper (dim)" },
          ]}
        />
        <div className="ctl-row">
          <label>Tools</label>
          <div className="seg">
            <button
              type="button"
              className="seg-btn"
              onClick={() => setPaths((old) => ({ ...old, [NETS[activeNet].name]: [] }))}
            >
              ✂ Rip up this net
            </button>
            <button type="button" className="seg-btn" onClick={() => setPaths({})}>
              ↺ Clear board
            </button>
          </div>
        </div>
      </Controls>
      <Readouts>
        <Readout
          label={allDone ? "🎉 Board routed!" : "Progress"}
          value={
            allDone
              ? `all four nets connected with ${viaCount} via${viaCount === 1 ? "" : "s"} — a real autorouter would be proud`
              : `${NETS.filter(netDone).length} / 4 nets routed · ${viaCount} vias used`
          }
          tone={allDone ? "good" : "amber"}
        />
        <Readout
          label="How to route"
          value="drag from a pad, cell by cell. To dive layers: stop, switch layer, then drag again from the same cell — that's a via. TRIG must cross the others: no way without one!"
        />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 20.3 — Spot the layout mistakes + trace-width calculator
 * ===================================================================== */

interface Mistake {
  id: string;
  x: number;
  y: number;
  r: number;
  label: string;
  explain: string;
}

interface LogEntry {
  label: string;
  detail: string;
  miss?: boolean;
}

const MISTAKES: Mistake[] = [
  {
    id: "far-cap",
    x: 700,
    y: 90,
    r: 46,
    label: "Decoupling capacitor exiled",
    explain:
      "C3 is the 555's decoupling cap — parked 5 cm from the chip it protects. The trace inductance between them defeats its whole purpose (15.1). It belongs millimetres from the VCC pin.",
  },
  {
    id: "thin-power",
    x: 320,
    y: 66,
    r: 40,
    label: "Power trace on a diet",
    explain:
      "The main VCC feed is drawn at signal width. Use the calculator below: a hairline trace carrying real current heats up and drops voltage — power arteries should be wide.",
  },
  {
    id: "short",
    x: 448,
    y: 190,
    r: 36,
    label: "Two traces touching",
    explain:
      "OUT brushes against GND — a solid short. DRC (design rule check) exists precisely to catch this before the fab does. Never ship a board without a clean DRC.",
  },
  {
    id: "silk-pad",
    x: 219,
    y: 260,
    r: 36,
    label: "Silkscreen over a pad",
    explain:
      "R2's label is printed across its own solder pad. Ink where solder must wet means bad joints. Keep silkscreen off every pad — most tools warn about this.",
  },
  {
    id: "island",
    x: 600,
    y: 280,
    r: 42,
    label: "Marooned copper island",
    explain:
      "A patch of ground pour connected to nothing. Floating copper acts as an antenna and can even charge up. Stitch it with vias to the real ground, or remove it.",
  },
  {
    id: "edge-pad",
    x: 828,
    y: 154,
    r: 34,
    label: "Pad kissing the board edge",
    explain:
      "The LED pad sits at the routed outline. Fab tolerance can shave into it, and mechanical stress cracks edge joints. Keep pads a healthy margin inside the outline.",
  },
];

export function LayoutMistakesLab() {
  const [found, setFound] = useState<Set<string>>(new Set());
  const [lastMsg, setLastMsg] = useState<LogEntry | null>(null);
  const [amps, setAmps] = useState(1);
  const [rise, setRise] = useState(10);

  // IPC-2221 external layer approximation, 1 oz copper
  const areaMil2 = Math.pow(amps / (0.048 * Math.pow(rise, 0.44)), 1 / 0.725);
  const widthMil = areaMil2 / 1.378;
  const widthMm = widthMil * 0.0254;

  const draw = (ctx: CanvasRenderingContext2D) => {
    // board
    ctx.fillStyle = "#14340f";
    ctx.beginPath();
    ctx.roundRect(60, 30, 800, 300, 10);
    ctx.fill();

    // legit copper
    ctx.strokeStyle = "#c8963c";
    ctx.lineCap = "round";
    ctx.lineWidth = 10;
    D.wire(ctx, [[100, 66], [250, 66]], "#c8963c", 10); // healthy power start
    ctx.lineWidth = 2.5;
    D.wire(ctx, [[250, 66], [430, 66], [430, 90]], "#c8963c", 2.5); // ...continuing thin = mistake
    D.wire(ctx, [[430, 150], [430, 185], [500, 185]], "#c8963c", 5); // OUT
    D.wire(ctx, [[430, 196], [500, 196]], "#c8963c", 5); // GND running parallel — touching at ~448
    D.wire(ctx, [[448, 185], [448, 196]], "#c8963c", 6); // the short bridge
    D.wire(ctx, [[500, 185], [640, 185], [640, 120]], "#c8963c", 5);
    D.wire(ctx, [[500, 196], [700, 196], [700, 250]], "#c8963c", 5);

    // 555
    D.icBox(ctx, 380, 90, 100, 60, "555");
    // exiled cap
    ctx.fillStyle = "#324055";
    ctx.beginPath();
    ctx.roundRect(680, 70, 42, 26, 5);
    ctx.fill();
    D.label(ctx, "C3 100n", 700, 112, { color: "#e8eef5", size: 10 });
    D.wire(ctx, [[480, 100], [560, 100], [560, 82], [680, 82]], "#c8963c", 2.5);

    // R2 with silk over pad
    D.dot(ctx, 200, 260, 9, "#c8963c");
    D.dot(ctx, 250, 260, 9, "#c8963c");
    ctx.strokeStyle = "#c8963c";
    D.wire(ctx, [[209, 260], [241, 260]], "#c8963c", 6);
    D.label(ctx, "R2  47k", 214, 261, { color: "#e8eef5", size: 12, bold: true });

    // marooned island
    ctx.fillStyle = "rgba(200, 150, 60, 0.5)";
    ctx.beginPath();
    ctx.roundRect(565, 255, 70, 50, 6);
    ctx.fill();

    // edge pad
    D.dot(ctx, 843, 154, 10, "#c8963c");
    D.label(ctx, "LED", 820, 132, { color: "#e8eef5", size: 10 });

    // found markers
    for (const m of MISTAKES) {
      if (found.has(m.id)) {
        ctx.strokeStyle = D.COL.good;
        ctx.lineWidth = 2.5;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        D.label(ctx, "✓", m.x, m.y - m.r - 10, { color: D.COL.good, size: 14, bold: true });
      }
    }

    D.meter(ctx, 60, 344, 200, "mistakes found", `${found.size} / ${MISTAKES.length}`, found.size === MISTAKES.length ? D.COL.good : D.COL.amber);
    D.meter(
      ctx,
      280,
      344,
      580,
      "inspector's log",
      lastMsg ? (lastMsg.miss ? "nothing wrong there" : `found: ${lastMsg.label} — details below`) : "click anywhere on the board that looks wrong to you",
      lastMsg?.miss ? D.COL.muted : D.COL.accent
    );
  };

  return (
    <>
      <SimCanvas
        width={900}
        height={400}
        draw={draw}
        onClick={(p) => {
          for (const m of MISTAKES) {
            if (Math.hypot(p.x - m.x, p.y - m.y) <= m.r) {
              setFound((f) => new Set(f).add(m.id));
              setLastMsg({ label: m.label, detail: m.explain });
              return;
            }
          }
          setLastMsg({ label: "—", detail: "Nothing wrong there — that part of the layout is honest work.", miss: true });
        }}
      />
      {lastMsg && !lastMsg.miss ? (
        <Readouts>
          <Readout label={lastMsg.label} value={lastMsg.detail} tone="amber" />
        </Readouts>
      ) : null}
      {found.size === MISTAKES.length ? (
        <Readouts>
          <Readout label="🎉 Clean sweep" value="six for six — you just performed your first design review. DRC would catch some of these; the rest need exactly the eye you just used." tone="good" />
        </Readouts>
      ) : null}
      <Controls>
        <Slider label="Trace current" min={0.1} max={5} step={0.1} value={amps} onChange={setAmps} fmt={(v) => `${v.toFixed(1)} A`} />
        <Slider label="Allowed temp rise" min={5} max={40} step={1} value={rise} onChange={setRise} fmt={(v) => `${v} °C`} />
      </Controls>
      <Readouts>
        <Readout
          label="Required width (1 oz copper, outer layer)"
          value={`${widthMm.toFixed(2)} mm  (${widthMil.toFixed(0)} mil)`}
          tone="amber"
        />
        <Readout
          label="IPC-2221 rule of thumb"
          value="signals: 0.25 mm is plenty · your blinker's power: ~0.5 mm · motor drivers: consult this calculator, then add margin"
        />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 20.4 — Capstone twin: assembly order trainer
 * ===================================================================== */

interface Part {
  id: string;
  name: string;
  height: number; // soldering order = lowest profile first
  x: number;
  y: number;
  w: number;
  h: number;
  note: string;
}

const PARTS: Part[] = [
  { id: "r1", name: "R1 1 kΩ", height: 1, x: 420, y: 96, w: 90, h: 26, note: "flattest first — the board lies stable upside-down" },
  { id: "r2", name: "R2 47 kΩ", height: 1, x: 420, y: 176, w: 90, h: 26, note: "all same-height parts in one soldering session" },
  { id: "r3", name: "470 Ω", height: 1, x: 420, y: 256, w: 90, h: 26, note: "three resistors down, iron still hot" },
  { id: "socket", name: "IC socket", height: 2, x: 170, y: 100, w: 120, h: 170, note: "socket, not the chip! The 555 never feels the iron" },
  { id: "led", name: "LED", height: 3, x: 570, y: 140, w: 46, h: 60, note: "mind the flat side — silkscreen shows the cathode" },
  { id: "cap", name: "C1 10 µF", height: 4, x: 570, y: 240, w: 50, h: 56, note: "stripe to the − marking; taller than the LED" },
  { id: "header", name: "Power header", height: 5, x: 80, y: 130, w: 40, h: 110, note: "tallest last — nothing left to obstruct" },
  { id: "chip", name: "insert the 555", height: 6, x: 186, y: 120, w: 88, h: 130, note: "into the socket, notch matching the silkscreen — no solder involved" },
];

export function AssemblyOrderLab() {
  const [placed, setPlaced] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState<string | null>(null);
  const [slips, setSlips] = useState(0);

  const nextHeight = Math.min(...PARTS.filter((p) => !placed.has(p.id)).map((p) => p.height));

  const clickPart = (part: Part) => {
    if (placed.has(part.id)) return;
    if (part.height === nextHeight) {
      setPlaced((s) => new Set(s).add(part.id));
      setMessage(`✓ ${part.name} — ${part.note}`);
    } else {
      setSlips((n) => n + 1);
      const shouldDo = PARTS.filter((p) => !placed.has(p.id) && p.height === nextHeight)
        .map((p) => p.name)
        .join(", ");
      setMessage(`✗ Not yet — ${part.name} is taller than what's left. Lowest profile first: ${shouldDo}.`);
    }
  };

  const done = placed.size === PARTS.length;

  const draw = (ctx: CanvasRenderingContext2D) => {
    // board
    ctx.fillStyle = "#14340f";
    ctx.beginPath();
    ctx.roundRect(50, 40, 620, 300, 10);
    ctx.fill();
    D.label(ctx, "⚡ SPARK-1 rev A — your blinker, as a real PCB", 360, 62, { color: "#e8eef5", size: 11 });

    for (const part of PARTS) {
      const isPlaced = placed.has(part.id);
      const isNext = !isPlaced && part.height === nextHeight;
      ctx.fillStyle = isPlaced ? "rgba(71,194,107,0.25)" : "#0f2410";
      ctx.strokeStyle = isPlaced ? D.COL.good : isNext ? D.COL.amber : "#3a5a33";
      ctx.lineWidth = isNext ? 2.5 : 1.5;
      if (isNext) ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.roundRect(part.x, part.y, part.w, part.h, 6);
      ctx.fill();
      ctx.stroke();
      ctx.setLineDash([]);
      D.label(ctx, part.name, part.x + part.w / 2, part.y + part.h / 2, {
        color: isPlaced ? D.COL.good : "#cdd8e2",
        size: 10,
        bold: isPlaced,
      });
    }

    // height ladder
    D.label(ctx, "solder lowest → tallest", 795, 60, { color: D.COL.muted, size: 11 });
    const heights = [...new Set(PARTS.map((p) => p.height))].sort((a, b) => a - b);
    heights.forEach((h, i) => {
      const parts = PARTS.filter((p) => p.height === h);
      const allIn = parts.every((p) => placed.has(p.id));
      const y = 90 + i * 40;
      D.dot(ctx, 720, y, 8, allIn ? D.COL.good : h === nextHeight ? D.COL.amber : "#2a3646");
      D.label(ctx, parts.map((p) => p.name).join(" · "), 740, y, { color: allIn ? D.COL.good : D.COL.muted, size: 10, align: "left" });
    });

    D.meter(ctx, 50, 354, 200, "progress", done ? "board populated! 🎉" : `${placed.size} / ${PARTS.length} placed · ${slips} slip${slips === 1 ? "" : "s"}`, done ? D.COL.good : D.COL.amber);
    D.meter(ctx, 270, 354, 610, "bench notes", message ?? "click the part you would solder next", D.COL.accent);
  };

  return (
    <>
      <SimCanvas
        width={900}
        height={410}
        draw={draw}
        onClick={(p) => {
          for (const part of PARTS) {
            if (p.x >= part.x && p.x <= part.x + part.w && p.y >= part.y && p.y <= part.y + part.h) {
              clickPart(part);
              return;
            }
          }
        }}
      />
      <Controls>
        <div className="ctl-row">
          <label>Bench</label>
          <div className="seg">
            <button
              type="button"
              className="seg-btn"
              onClick={() => {
                setPlaced(new Set());
                setMessage(null);
                setSlips(0);
              }}
            >
              ↺ Empty board
            </button>
          </div>
        </div>
      </Controls>
      <Readouts>
        <Readout
          label="Why this order"
          value="flip the board to solder; low parts let it lie flat. Resistors → socket → LED → cap → header, and the chip goes in last, iron-free"
          tone="amber"
        />
        <Readout label="At the real bench" value="same order, plus: heat pad and leg together ~2 s, feed a little solder, let it flow into a shiny cone, move on" />
      </Readouts>
    </>
  );
}
