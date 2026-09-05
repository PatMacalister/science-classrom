"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider, useTl } from "@/servo/components/controls";
import { clamp } from "@/servo/lib/sim/helpers";
import { tl as translate } from "@/servo/lib/labStrings";
import * as D from "@/servo/lib/sim/draw";

function noiseAt(i: number, salt = 0): number {
  let h = (i * 374761393 + salt * 668265263) | 0;
  h = (h ^ (h >>> 13)) | 0;
  h = Math.imul(h, 1274126177);
  h = (h ^ (h >>> 16)) >>> 0;
  return (h / 4294967296) * 2 - 1;
}

/* =====================================================================
 * Lab 5.1 — The doubt circle: true pose vs odometry's belief on a square
 * course, with slip and miscalibration doing the corrupting.
 * ===================================================================== */

export function OdometryLab() {
  const [slip, setSlip] = useState(2);
  const [calib, setCalib] = useState(1);

  // the whole run is derived from the sliders: four sides of a 2 m square
  const sim = (() => {
    const dt = 0.02;
    const v = 0.5; // m/s
    const wTurn = Math.PI / 2; // rad/s while turning
    const plan: Array<["fwd" | "turn", number]> = [];
    for (let s = 0; s < 4; s++) {
      plan.push(["fwd", 2 / v]);
      plan.push(["turn", (Math.PI / 2) / wTurn]);
    }
    let tx = 0, ty = 0, tth = 0; // truth
    let ex = 0, ey = 0, eth = 0; // odometry's belief
    const truth: Array<[number, number]> = [[0, 0]];
    const belief: Array<[number, number]> = [[0, 0]];
    let i = 0;
    let dist = 0;
    for (const [kind, dur] of plan) {
      for (let t = 0; t < dur; t += dt) {
        i++;
        if (kind === "fwd") {
          // the wheels slip on the ground: encoders (belief) over-report
          const slipNow = (slip / 100) * (0.6 + 0.4 * noiseAt(i, 3));
          const trueStep = v * dt * (1 - slipNow);
          tx += trueStep * Math.cos(tth);
          ty += trueStep * Math.sin(tth);
          ex += v * dt * Math.cos(eth);
          ey += v * dt * Math.sin(eth);
          dist += v * dt;
        } else {
          // a mis-measured track width scales every estimated turn
          tth += wTurn * dt;
          eth += wTurn * dt * (1 + calib / 100);
        }
        if (i % 8 === 0) {
          truth.push([tx, ty]);
          belief.push([ex, ey]);
        }
      }
    }
    truth.push([tx, ty]);
    belief.push([ex, ey]);
    const posErr = Math.hypot(tx - ex, ty - ey);
    const headErr = Math.abs(((tth - eth) * 180) / Math.PI);
    return { truth, belief, posErr, headErr, dist };
  })();

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const ox = 260;
    const oy = 300;
    const scale = 100;
    const map = (p: [number, number]): [number, number] => [ox + p[0] * scale, oy - p[1] * scale];

    // the intended square
    ctx.setLineDash([5, 6]);
    ctx.strokeStyle = "rgba(139,151,167,0.35)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(ox, oy - 2 * scale, 2 * scale, 2 * scale);
    ctx.setLineDash([]);
    D.label(ctx, translate("the intended square"), ox + scale, oy + 22, { size: 10, color: D.COL.muted });

    const n = sim.truth.length;
    const upTo = Math.max(2, Math.floor(((t * 0.12) % 1.1) * n));
    const path = (pts: Array<[number, number]>, color: string, width: number) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath();
      for (let i = 0; i < Math.min(upTo, pts.length); i++) {
        const [px, py] = map(pts[i]);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    };
    path(sim.truth, "rgba(74,222,128,0.9)", 2.5);
    path(sim.belief, "rgba(76,201,240,0.8)", 2);

    const truthNow = sim.truth[Math.min(upTo, n) - 1];
    const beliefNow = sim.belief[Math.min(upTo, n) - 1];
    const [tpx, tpy] = map(truthNow);
    const [bpx, bpy] = map(beliefNow);
    D.dot(ctx, tpx, tpy, 8, D.COL.good);
    D.label(ctx, translate("really here"), tpx + 14, tpy, { size: 9, color: D.COL.good, align: "left" });
    // the ghost: where odometry believes the robot is, with its doubt circle
    const frac = Math.min(upTo, n) / n;
    D.ring(ctx, bpx, bpy, 6 + frac * sim.posErr * scale * 0.9 + 8, "rgba(76,201,240,0.4)", 1.5);
    D.dot(ctx, bpx, bpy, 6, "rgba(76,201,240,0.9)");
    D.label(ctx, translate("believes it's here"), bpx + 14, bpy + 14, { size: 9, color: D.COL.accent, align: "left" });

    D.meter(ctx, 640, 40, 220, "distance driven", `${sim.dist.toFixed(1)} m`, D.COL.text);
    D.meter(ctx, 640, 96, 220, "final position lie", `${(sim.posErr * 100).toFixed(0)} cm`, sim.posErr > 0.3 ? D.COL.bad : D.COL.amber);
    D.meter(ctx, 640, 152, 220, "final heading lie", `${sim.headErr.toFixed(1)}°`, sim.headErr > 5 ? D.COL.bad : D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={420} draw={draw} label="A robot driving a square while its odometry estimate drifts away, doubt circle growing" />
      <Controls>
        <Slider label="Wheel slip" min={0} max={8} step={0.5} value={slip} onChange={setSlip} fmt={(v) => `${v.toFixed(1)} %`} />
        <Slider label="Track miscalibration" min={0} max={6} step={0.5} value={calib} onChange={setCalib} fmt={(v) => `${v.toFixed(1)} %`} />
      </Controls>
      <Readouts>
        <Readout label="After one lap" value={`${(sim.posErr * 100).toFixed(0)} cm ${translate("and")} ${sim.headErr.toFixed(1)}° ${translate("of fiction")}`} tone={sim.posErr > 0.3 ? "warn" : "amber"} />
        <Readout label="Pattern" value="locally excellent, globally rotten" tone="amber" />
        <Readout label="Cure" value="calibrate first — then anchor to a map" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 5.2 — The developing map: teleop a lidar robot and stamp its rays
 * into an occupancy grid — from a pose that may be lying.
 * ===================================================================== */

const GW = 46;
const GH = 26;
const CELL = 14;
// the flat: outer walls, two room dividers and a pillar (in grid units)
const SEGS: Array<[number, number, number, number]> = [
  [0, 0, GW, 0], [GW, 0, GW, GH], [GW, GH, 0, GH], [0, GH, 0, 0],
  [16, 0, 16, 10], [16, 16, 16, GH], [30, 8, GW, 8],
  [34, 16, 38, 16], [38, 16, 38, 20], [38, 20, 34, 20], [34, 20, 34, 16],
];

function castRay(x: number, y: number, ang: number): number {
  const dx = Math.cos(ang);
  const dy = Math.sin(ang);
  let best = 14; // max range in cells
  for (const [x1, y1, x2, y2] of SEGS) {
    const ex = x2 - x1;
    const ey = y2 - y1;
    const den = dx * ey - dy * ex;
    if (Math.abs(den) < 1e-9) continue;
    const s = ((x1 - x) * ey - (y1 - y) * ex) / den;
    const u = Math.abs(ex) > Math.abs(ey) ? (x + s * dx - x1) / ex : (y + s * dy - y1) / ey;
    if (s > 0.02 && u >= 0 && u <= 1 && s < best) best = s;
  }
  return best;
}

export function MappingLab() {
  const tl = useTl();
  const [pose, setPose] = useState({ x: 6, y: 6, th: 0, sx: 6, sy: 6, sth: 0, steps: 0 });
  const [drift, setDrift] = useState(0);
  const [coverage, setCoverage] = useState(0);
  // the grid is working memory, not UI state: 0 unknown, 1..127 free, 128.. wall
  const grid = useRef<Float32Array>(new Float32Array(GW * GH));

  const stamp = (p: typeof pose) => {
    const g = grid.current;
    for (let r = 0; r < 36; r++) {
      const a = (r / 36) * Math.PI * 2;
      const dTrue = castRay(p.x, p.y, p.th + a);
      // the ray is stamped from the *believed* pose and heading
      const hit = dTrue < 13.9;
      for (let s = 0.4; s < dTrue - 0.3; s += 0.5) {
        const cx = Math.floor(p.sx + Math.cos(p.sth + a) * s);
        const cy = Math.floor(p.sy + Math.sin(p.sth + a) * s);
        if (cx >= 0 && cx < GW && cy >= 0 && cy < GH) g[cy * GW + cx] = clamp(g[cy * GW + cx] - 0.25, -3, 6);
      }
      if (hit) {
        const cx = Math.floor(p.sx + Math.cos(p.sth + a) * dTrue);
        const cy = Math.floor(p.sy + Math.sin(p.sth + a) * dTrue);
        if (cx >= 0 && cx < GW && cy >= 0 && cy < GH) g[cy * GW + cx] = clamp(g[cy * GW + cx] + 1, -3, 6);
      }
    }
    let known = 0;
    for (let i = 0; i < g.length; i++) if (Math.abs(g[i]) > 0.4) known++;
    setCoverage(Math.round((known / g.length) * 100));
  };

  const move = (kind: "fwd" | "left" | "right") => {
    const p = pose;
    const q = { ...p, steps: p.steps + 1 };
    if (kind === "fwd") {
      const free = castRay(p.x, p.y, p.th);
      const step = Math.min(1.2, Math.max(0, free - 0.8));
      q.x = p.x + Math.cos(p.th) * step;
      q.y = p.y + Math.sin(p.th) * step;
      q.sx = p.sx + Math.cos(p.sth) * 1.2; // the belief takes the full commanded step
      q.sy = p.sy + Math.sin(p.sth) * 1.2;
    } else {
      const d = kind === "left" ? -Math.PI / 8 : Math.PI / 8;
      q.th = p.th + d;
      q.sth = p.sth + d * (1 + drift / 40);
    }
    // per-step heading rot from the drift slider
    q.sth += (drift / 1200) * (kind === "fwd" ? 1 : 0.3);
    stamp(q);
    setPose(q);
  };

  const reset = () => {
    grid.current = new Float32Array(GW * GH);
    setPose({ x: 6, y: 6, th: 0, sx: 6, sy: 6, sth: 0, steps: 0 });
    setCoverage(0);
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    const ox = 90;
    const oy = 30;
    // the developing grid
    const g = grid.current;
    for (let cy = 0; cy < GH; cy++) {
      for (let cx = 0; cx < GW; cx++) {
        const v = g[cy * GW + cx];
        let fill = "#1a2434"; // unknown
        if (v > 0.4) fill = "#0b0f14";
        else if (v < -0.4) fill = "#2c3e57";
        ctx.fillStyle = fill;
        ctx.fillRect(ox + cx * CELL, oy + cy * CELL, CELL - 1, CELL - 1);
      }
    }
    // ground truth walls, faint, for comparison
    ctx.strokeStyle = "rgba(246,178,107,0.25)";
    ctx.lineWidth = 2;
    for (const [x1, y1, x2, y2] of SEGS) {
      ctx.beginPath();
      ctx.moveTo(ox + x1 * CELL, oy + y1 * CELL);
      ctx.lineTo(ox + x2 * CELL, oy + y2 * CELL);
      ctx.stroke();
    }
    // robot (truth) and its believed twin
    const rx = ox + pose.x * CELL;
    const ry = oy + pose.y * CELL;
    D.dot(ctx, rx, ry, 8, D.COL.good);
    D.wire(ctx, [[rx, ry], [rx + Math.cos(pose.th) * 16, ry + Math.sin(pose.th) * 16]], D.COL.good, 3);
    const bx = ox + pose.sx * CELL;
    const by = oy + pose.sy * CELL;
    if (Math.hypot(bx - rx, by - ry) > 4) {
      D.ring(ctx, bx, by, 7, "rgba(76,201,240,0.8)", 2);
      D.wire(ctx, [[bx, by], [bx + Math.cos(pose.sth) * 14, by + Math.sin(pose.sth) * 14]], "rgba(76,201,240,0.8)", 2);
      D.label(ctx, translate("belief"), bx + 12, by - 10, { size: 9, color: D.COL.accent, align: "left" });
    }

    D.meter(ctx, 740, 40, 140, "coverage", `${coverage} %`, D.COL.good);
    D.meter(ctx, 740, 96, 140, "steps", `${pose.steps}`, D.COL.text);
    D.label(ctx, translate("dark: wall evidence · light: cleared free · grey: unknown"), 450, oy + GH * CELL + 20, { size: 10, color: D.COL.muted });
  };

  return (
    <>
      <SimCanvas width={900} height={440} draw={draw} label="An occupancy grid developing from lidar rays as you drive, walls darkening and floors clearing" />
      <Controls>
        <div className="ctl-row">
          <label>{tl("Drive")}</label>
          <button type="button" className="btn secondary small" onClick={() => move("left")}>
            ⟲ {tl("turn")}
          </button>
          <button type="button" className="btn secondary small" onClick={() => move("fwd")}>
            ▲ {tl("forward")}
          </button>
          <button type="button" className="btn secondary small" onClick={() => move("right")}>
            ⟳ {tl("turn")}
          </button>
          <button type="button" className="btn secondary small" onClick={reset}>
            {tl("↺ wipe map")}
          </button>
        </div>
        <Slider label="Odometry drift" min={0} max={10} step={1} value={drift} onChange={setDrift} fmt={(v) => `${v}`} />
      </Controls>
      <Readouts>
        <Readout label="Coverage" value={`${coverage} % ${translate("of the flat mapped")}`} tone="good" />
        <Readout
          label="Pose honesty"
          value={drift === 0 ? "perfect — the map will be crisp" : "drifting — watch walls smear and double"}
          tone={drift === 0 ? "good" : "warn"}
        />
        <Readout label="Rule" value="a smeared map is a pose problem, not a lidar problem" tone="amber" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 5.3 — The route table: A* vs Dijkstra on a grid map, with obstacle
 * inflation closing doors.
 * ===================================================================== */

const PW = 26;
const PH = 15;

const MAPS: Record<string, string[]> = {
  hall: [
    "..........................",
    "..........................",
    "......##......##..........",
    "......##......##..........",
    "..........................",
    "..........................",
    "..............##..........",
    "....##........##..........",
    "....##....................",
    "..........................",
    "..........##..............",
    "..........##......##......",
    "..................##......",
    "..........................",
    "..........................",
  ],
  office: [
    "............#.............",
    "............#.............",
    "............#.............",
    "............#.............",
    "............#.............",
    "..........................",
    "..........................",
    "..........................",
    "..........................",
    "#####...#####.............",
    "............#....######...",
    "............#.............",
    "............#.............",
    "............#.............",
    "............#.............",
  ],
  maze: [
    "..........................",
    "..........................",
    "######################....",
    "..........................",
    "....######################",
    "..........................",
    "######################....",
    "..........................",
    "....######################",
    "..........................",
    "######################....",
    "..........................",
    "....######################",
    "..........................",
    "..........................",
  ],
};

export function PathLab() {
  const [mapKey, setMapKey] = useState<"hall" | "office" | "maze">("office");
  const [algo, setAlgo] = useState<"astar" | "dijkstra">("astar");
  const [inflate, setInflate] = useState(0);

  const result = (() => {
    const rows = MAPS[mapKey];
    const wall = (x: number, y: number) => rows[y]?.[x] === "#";
    const blocked = (x: number, y: number) => {
      if (x < 0 || y < 0 || x >= PW || y >= PH) return true;
      for (let dy = -inflate; dy <= inflate; dy++)
        for (let dx = -inflate; dx <= inflate; dx++)
          if (wall(x + dx, y + dy)) return true;
      return false;
    };
    const start: [number, number] = [1, 13];
    const goal: [number, number] = [24, 1];
    const key = (x: number, y: number) => y * PW + x;
    const g = new Map<number, number>();
    const parent = new Map<number, number>();
    const open: Array<[number, number, number]> = [[...start, 0]]; // x, y, f
    g.set(key(...start), 0);
    const order: number[] = [];
    const seen = new Set<number>();
    let found = false;
    while (open.length) {
      let bi = 0;
      for (let i = 1; i < open.length; i++) if (open[i][2] < open[bi][2]) bi = i;
      const [x, y] = open.splice(bi, 1)[0];
      const k = key(x, y);
      if (seen.has(k)) continue;
      seen.add(k);
      order.push(k);
      if (x === goal[0] && y === goal[1]) {
        found = true;
        break;
      }
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
        const nx = x + dx;
        const ny = y + dy;
        if (blocked(nx, ny) || seen.has(key(nx, ny))) continue;
        const ng = g.get(k)! + 1;
        if (ng < (g.get(key(nx, ny)) ?? Infinity)) {
          g.set(key(nx, ny), ng);
          parent.set(key(nx, ny), k);
          const h = algo === "astar" ? Math.abs(goal[0] - nx) + Math.abs(goal[1] - ny) : 0;
          open.push([nx, ny, ng + h]);
        }
      }
    }
    const path: number[] = [];
    if (found) {
      let k = key(...goal);
      while (k !== key(...start)) {
        path.push(k);
        k = parent.get(k)!;
      }
      path.push(key(...start));
      path.reverse();
    }
    return { order, path, found, explored: order.length, start, goal };
  })();

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const ox = 100;
    const oy = 34;
    const C = 26;
    const rows = MAPS[mapKey];
    const shown = Math.floor(((t * 0.35) % 1.4) * result.order.length);
    const shownSet = new Set(result.order.slice(0, shown));

    for (let y = 0; y < PH; y++) {
      for (let x = 0; x < PW; x++) {
        const isWall = rows[y][x] === "#";
        let fill = "#101a29";
        if (isWall) fill = "#3a4a63";
        else if (shownSet.has(y * PW + x)) fill = "rgba(56,189,248,0.22)";
        ctx.fillStyle = fill;
        ctx.fillRect(ox + x * C, oy + y * C, C - 1, C - 1);
        // inflation shadow
        if (!isWall && inflate > 0) {
          let near = false;
          for (let dy = -inflate; dy <= inflate && !near; dy++)
            for (let dx = -inflate; dx <= inflate && !near; dx++)
              if (rows[y + dy]?.[x + dx] === "#") near = true;
          if (near) {
            ctx.fillStyle = "rgba(242,109,109,0.16)";
            ctx.fillRect(ox + x * C, oy + y * C, C - 1, C - 1);
          }
        }
      }
    }
    // the path, once the animation has explored that far
    if (result.found && shown > result.order.length - 2) {
      ctx.strokeStyle = D.COL.good;
      ctx.lineWidth = 4;
      ctx.beginPath();
      result.path.forEach((k, i) => {
        const px = ox + (k % PW) * C + C / 2;
        const py = oy + Math.floor(k / PW) * C + C / 2;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
    }
    D.dot(ctx, ox + result.start[0] * C + C / 2, oy + result.start[1] * C + C / 2, 8, D.COL.amber);
    D.label(ctx, "S", ox + result.start[0] * C + C / 2, oy + result.start[1] * C + C / 2 + 1, { size: 10, bold: true, color: "#0a1420" });
    D.dot(ctx, ox + result.goal[0] * C + C / 2, oy + result.goal[1] * C + C / 2, 8, D.COL.good);
    D.label(ctx, "G", ox + result.goal[0] * C + C / 2, oy + result.goal[1] * C + C / 2 + 1, { size: 10, bold: true, color: "#0a1420" });

    D.meter(ctx, 20, 436, 190, "cells explored", `${result.explored}`, D.COL.accent);
    D.meter(ctx, 220, 436, 190, "path length", result.found ? `${result.path.length}` : translate("no path!"), result.found ? D.COL.good : D.COL.bad);
  };

  return (
    <>
      <SimCanvas width={900} height={490} draw={draw} label="A* rippling across a grid map toward the goal, with inflated walls tinted red" />
      <Controls>
        <Segmented
          label="Map"
          options={[
            { value: "hall", label: "hall" },
            { value: "office", label: "office" },
            { value: "maze", label: "maze" },
          ]}
          value={mapKey}
          onChange={setMapKey}
        />
        <Segmented
          label="Algorithm"
          options={[
            { value: "astar", label: "A*" },
            { value: "dijkstra", label: "Dijkstra" },
          ]}
          value={algo}
          onChange={setAlgo}
        />
        <Slider label="Inflation radius" min={0} max={3} step={1} value={inflate} onChange={setInflate} fmt={(v) => `${v} ${v === 1 ? "cell" : "cells"}`} />
      </Controls>
      <Readouts>
        <Readout label="Search effort" value={`${result.explored} ${translate("cells expanded")}`} tone="amber" />
        <Readout
          label="Route"
          value={result.found ? `${result.path.length} ${translate("cells long")}` : "none — inflation closed the last door"}
          tone={result.found ? "good" : "warn"}
        />
        <Readout label="Try" value="same map, both algorithms — compare the ripples" />
      </Readouts>
    </>
  );
}
