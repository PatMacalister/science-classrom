"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Slider } from "@/helix/components/controls";
import { tl as translate } from "@/helix/lib/labStrings";
import * as D from "@/helix/lib/sim/draw";

/* =====================================================================
 * Lab 9.1 — The thermal cycler: three temperatures, repeated, and one
 * molecule becomes a billion. The exponential is the whole machine.
 * ===================================================================== */

export function PcrLab() {
  const [cycles, setCycles] = useState(20);
  const [start, setStart] = useState(1);
  const [efficiency, setEfficiency] = useState(100);

  const copiesAt = (c: number) => start * Math.pow(1 + efficiency / 100, c);
  const copies = copiesAt(cycles);
  const detectable = copies >= 1e6;
  const fmtCopies = (v: number) =>
    v >= 1e6 ? v.toExponential(1).replace("e+", " × 10^") : Math.round(v).toLocaleString("en-GB");

  const draw = (ctx: CanvasRenderingContext2D) => {
    /* temperature program, two and a half cycles of it */
    const tx = 50;
    const ty = 66;
    const tw = 380;
    const th = 130;
    D.panel(ctx, tx, ty, tw, th, "#0a1420");
    const tempY = (deg: number) => ty + th - ((deg - 40) / 62) * (th - 26) - 13;
    const phases: Array<[number, string]> = [
      [95, "denature"],
      [55, "anneal"],
      [72, "extend"],
    ];
    const segW = tw / 7.5;
    let px0 = tx + 8;
    ctx.strokeStyle = D.COL.amber;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let rep = 0; rep < 3 && px0 < tx + tw - 10; rep++) {
      for (const [deg] of phases) {
        const y = tempY(deg);
        ctx.lineTo(Math.min(px0, tx + tw - 8), y);
        px0 += segW * 0.35;
        ctx.lineTo(Math.min(px0, tx + tw - 8), y);
        px0 += segW * 0.65;
      }
    }
    ctx.stroke();
    phases.forEach(([deg, name], i) => {
      D.label(ctx, `${deg}° ${translate(name)}`, tx + 66 + i * 118, tempY(deg) - 12, { size: 10, color: D.COL.muted });
    });
    D.label(ctx, "one cycle ≈ 90 seconds", tx + tw / 2, ty + th + 18, { size: 10, color: D.COL.muted });

    /* copies vs cycle number, log scale */
    const gx = 50;
    const gy = 240;
    const gw = 380;
    const gh = 150;
    D.panel(ctx, gx, gy, gw, gh, "#0a1420");
    const maxLog = Math.log10(copiesAt(35));
    for (let c = 0; c <= 35; c += 5) {
      const v = copiesAt(c);
      const frac = Math.max(0.02, Math.log10(Math.max(v, 1)) / Math.max(maxLog, 1));
      const bw = 34;
      const x = gx + 16 + (c / 5) * (bw + 14);
      const h = frac * (gh - 40);
      ctx.fillStyle = c <= cycles ? "rgba(45,212,191,0.7)" : "rgba(45,212,191,0.15)";
      ctx.fillRect(x, gy + gh - 20 - h, bw, h);
      D.label(ctx, String(c), x + bw / 2, gy + gh - 9, { size: 9, color: D.COL.muted });
    }
    D.label(ctx, "copies by cycle (log scale)", gx + gw / 2, gy + 16, { size: 10, color: D.COL.muted });

    /* the gel lane: visible only past the detection threshold */
    const lx = 490;
    D.panel(ctx, lx, 66, 390, 324);
    D.label(ctx, "the numbers", lx + 195, 90, { color: D.COL.muted, size: 11 });
    const rows: Array<[string, string]> = [
      ["starting molecules", String(start)],
      ["cycles", String(cycles)],
      ["per-cycle growth", `× ${(1 + efficiency / 100).toFixed(2)}`],
      ["copies now", fmtCopies(copies)],
    ];
    rows.forEach(([k, v], i) => {
      const y = 122 + i * 30;
      D.label(ctx, k, lx + 26, y, { align: "left", size: 12, color: D.COL.muted });
      D.label(ctx, v, lx + 364, y, { align: "right", size: 13, mono: true, color: i === 3 ? D.COL.good : D.COL.text });
    });

    // gel electrophoresis vignette
    D.label(ctx, "gel lane", lx + 90, 252, { size: 10, color: D.COL.muted });
    ctx.fillStyle = "#141b28";
    ctx.fillRect(lx + 40, 262, 100, 110);
    ctx.strokeStyle = "#33445e";
    ctx.strokeRect(lx + 40, 262, 100, 110);
    const bandAlpha = Math.max(0, Math.min(1, (Math.log10(Math.max(copies, 1)) - 5) / 3));
    ctx.fillStyle = `rgba(246,178,107,${bandAlpha})`;
    ctx.fillRect(lx + 52, 305, 76, 12);
    D.label(ctx, bandAlpha > 0.05 ? "band visible" : "nothing to see", lx + 90, 392, {
      size: 11,
      color: bandAlpha > 0.05 ? D.COL.amber : D.COL.muted,
    });

    D.label(ctx, detectable ? "detectable ✓" : "below detection", lx + 260, 300, {
      size: 14,
      bold: true,
      color: detectable ? D.COL.good : D.COL.bad,
    });
    D.label(ctx, "needs ~10⁶ copies", lx + 260, 324, { size: 10, color: D.COL.muted });

    D.meter(ctx, 20, 8, 180, "Cycles", String(cycles), D.COL.accent);
    D.meter(ctx, 210, 8, 230, "copies", fmtCopies(copies), detectable ? D.COL.good : D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={410} draw={draw} label="A PCR thermal cycler doubling DNA copies each cycle" />
      <Controls>
        <Slider label="Cycles" min={0} max={35} step={1} value={cycles} onChange={setCycles} fmt={(v) => String(v)} />
        <Slider label="Starting molecules" min={1} max={100} step={1} value={start} onChange={setStart} fmt={(v) => String(v)} />
        <Slider label="Efficiency" min={70} max={100} step={5} value={efficiency} onChange={setEfficiency} fmt={(v) => `${v} %`} />
      </Controls>
      <Readouts>
        <Readout label="Copies" value={fmtCopies(copies)} tone="good" />
        <Readout label="Detectable" value={detectable ? "yes" : "not yet"} tone={detectable ? "good" : "warn"} />
        <Readout label="Doublings missed" value={efficiency < 100 ? "efficiency compounds" : "none"} />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 9.2 — Guide RNA targeting: slide a 10-letter guide along the
 * genome. Only a perfect match with a PAM next door gets cut — and a
 * 9-of-10 match with a PAM is exactly what "off-target" means.
 * ===================================================================== */

const GENOME = "ACGGTCAATCGCGATTCCGTAATGGCTAGGCATCGATTCCGTCAAGGGATTCCGTAAATC";
const GUIDE = "GATTCCGTAA";

export function CrisprLab() {
  const [pos, setPos] = useState(0);

  const window10 = GENOME.slice(pos, pos + 10);
  const matches = GUIDE.split("").filter((g, i) => g === window10[i]).length;
  const pam = GENOME.slice(pos + 10, pos + 13);
  const hasPam = pam.length === 3 && pam[1] === "G" && pam[2] === "G";
  const verdict = matches === 10 && hasPam ? "cut" : matches >= 9 && hasPam ? "off-target" : "none";

  const draw = (ctx: CanvasRenderingContext2D) => {
    const x0 = 45;
    const step = 13.5;
    const gy = 150;

    D.label(ctx, "genomic DNA (one strand, 5′→3′)", 450, 70, { size: 11, color: D.COL.muted });

    // highlight the guide window and the PAM slot
    ctx.fillStyle =
      verdict === "cut" ? "rgba(71,194,107,0.18)" : verdict === "off-target" ? "rgba(246,178,107,0.18)" : "rgba(45,212,191,0.10)";
    ctx.fillRect(x0 + pos * step - 5, gy - 16, 10 * step, 32);
    ctx.fillStyle = "rgba(199,146,234,0.16)";
    ctx.fillRect(x0 + (pos + 10) * step - 5, gy - 16, 3 * step, 32);

    // the genome, letter by letter
    for (let i = 0; i < GENOME.length; i++) {
      const inWin = i >= pos && i < pos + 10;
      const inPam = i >= pos + 10 && i < pos + 13;
      const color = inWin
        ? GUIDE[i - pos] === GENOME[i]
          ? D.COL.good
          : D.COL.bad
        : inPam
          ? "#c792ea"
          : D.COL.text;
      D.label(ctx, GENOME[i], x0 + i * step, gy, { size: 14, mono: true, color, bold: inWin || inPam });
    }

    // the guide, aligned underneath
    D.label(ctx, "guide RNA", x0 + pos * step - 10, gy + 46, { align: "right", size: 11, color: D.COL.accent });
    for (let i = 0; i < 10; i++) {
      const ok = GUIDE[i] === window10[i];
      D.label(ctx, GUIDE[i], x0 + (pos + i) * step, gy + 46, { size: 14, mono: true, bold: true, color: ok ? D.COL.good : D.COL.bad });
      D.label(ctx, ok ? "│" : "×", x0 + (pos + i) * step, gy + 24, { size: 10, color: ok ? D.COL.good : D.COL.bad });
    }
    D.label(ctx, "PAM?", x0 + (pos + 11) * step, gy + 46, { size: 11, color: "#c792ea" });

    // scissors at the cut site
    if (verdict === "cut") {
      D.label(ctx, "✂", x0 + (pos + 7) * step, gy - 34, { size: 20, color: D.COL.good });
      D.label(ctx, "Cas9 cuts both strands here", x0 + (pos + 7) * step, gy - 56, { size: 11, bold: true, color: D.COL.good });
    }

    // verdict panel
    D.panel(ctx, 240, 240, 420, 130);
    const rows: Array<[string, string, string]> = [
      ["base-pair matches", `${matches} / 10`, matches === 10 ? D.COL.good : matches >= 9 ? D.COL.amber : D.COL.text],
      ["PAM (NGG) next door", hasPam ? "yes" : "no", hasPam ? "#c792ea" : D.COL.muted],
      [
        "result",
        verdict === "cut" ? "clean cut" : verdict === "off-target" ? "off-target risk!" : "no cut",
        verdict === "cut" ? D.COL.good : verdict === "off-target" ? D.COL.bad : D.COL.muted,
      ],
    ];
    rows.forEach(([k, v, c], i) => {
      const y = 272 + i * 30;
      D.label(ctx, k, 268, y, { align: "left", size: 12, color: D.COL.muted });
      D.label(ctx, v, 632, y, { align: "right", size: 13, bold: true, color: c });
    });

    D.meter(ctx, 20, 8, 190, "Guide position", String(pos), D.COL.accent);
    D.meter(
      ctx,
      220,
      8,
      190,
      "match",
      `${matches}/10 ${hasPam ? "+PAM" : ""}`,
      verdict === "cut" ? D.COL.good : verdict === "off-target" ? D.COL.bad : D.COL.muted
    );
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} label="A CRISPR guide RNA scanning a DNA sequence for its target" />
      <Controls>
        <Slider label="Guide position" min={0} max={GENOME.length - 13} step={1} value={pos} onChange={setPos} fmt={(v) => String(v)} />
      </Controls>
      <Readouts>
        <Readout label="Matches" value={`${matches} / 10`} tone={matches === 10 ? "good" : matches >= 9 ? "amber" : undefined} />
        <Readout label="PAM present" value={hasPam ? "yes" : "no"} />
        <Readout
          label="Cas9"
          value={verdict === "cut" ? "cuts here" : verdict === "off-target" ? "might cut — off-target!" : "does not cut"}
          tone={verdict === "cut" ? "good" : verdict === "off-target" ? "warn" : undefined}
        />
      </Readouts>
    </>
  );
}
