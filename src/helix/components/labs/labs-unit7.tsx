"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider } from "@/helix/components/controls";
import { clamp } from "@/helix/lib/sim/helpers";
import { tl as translate } from "@/helix/lib/labStrings";
import * as D from "@/helix/lib/sim/draw";

/* =====================================================================
 * Lab 7.1 — Growth vs. clearance: an infection is a race between
 * bacteria doubling and phagocytes eating, and fever tilts the track.
 * ===================================================================== */

export function PhagocyteLab() {
  const [doubling, setDoubling] = useState(2); // hours per doubling
  const [phagocytes, setPhagocytes] = useState(150);
  const [fever, setFever] = useState<"37" | "39">("37");

  // Fever slows bacterial doubling and speeds the (enzyme-run) immune cells.
  const effDoubling = doubling * (fever === "39" ? 1.5 : 1);
  const eatBoost = fever === "39" ? 1.15 : 1;

  // Michaelis-style clearance: each phagocyte handles at most ~3 bacteria/h,
  // saturating — the same shape as the enzyme lab, because that is what it is.
  const series = (() => {
    const g = Math.log(2) / effDoubling;
    const out: number[] = [50];
    for (let t = 1; t <= 96; t++) {
      const b = out[t - 1];
      // below one bacterium the infection is over — without this floor the
      // decay is exponential and "cleared" would never be reached exactly
      if (b < 1) {
        out.push(0);
        continue;
      }
      const grown = b * g * 0.5; // half-hour steps
      const eaten = phagocytes * eatBoost * 3 * (b / (b + 500)) * 0.5;
      out.push(clamp(b + grown - eaten, 0, 200000));
    }
    return out;
  })();
  const final = series[series.length - 1];
  const clearedAt = series.findIndex((v, i) => i > 0 && v === 0);
  const overwhelmed = final >= 200000;

  const draw = (ctx: CanvasRenderingContext2D) => {
    const gx = 80;
    const gy = 70;
    const gw = 600;
    const gh = 280;
    D.panel(ctx, gx, gy, gw, gh, "#0a1420");

    // log axis: 1 .. 200,000
    const mapY = (v: number) => gy + gh - (Math.log10(Math.max(v, 1)) / Math.log10(200000)) * gh;

    ctx.save();
    ctx.beginPath();
    ctx.rect(gx, gy, gw, gh);
    ctx.clip();
    ctx.strokeStyle = overwhelmed ? D.COL.bad : D.COL.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    series.forEach((v, i) => {
      const x = gx + (i / (series.length - 1)) * gw;
      const y = mapY(v);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.restore();

    D.label(ctx, translate("Time") + " →  (48 h)", gx + gw / 2, gy + gh + 22, { color: D.COL.muted, size: 11 });
    ctx.save();
    ctx.translate(gx - 26, gy + gh / 2);
    ctx.rotate(-Math.PI / 2);
    D.label(ctx, "bacteria (log scale)", 0, 0, { color: D.COL.muted, size: 11 });
    ctx.restore();

    if (clearedAt > 0) {
      D.label(ctx, "infection cleared", gx + gw / 2, gy + 30, { color: D.COL.good, size: 13, bold: true });
    } else if (overwhelmed) {
      D.label(ctx, "defenses overwhelmed", gx + gw / 2, gy + 30, { color: D.COL.bad, size: 13, bold: true });
    } else {
      D.label(ctx, "still fighting", gx + gw / 2, gy + 30, { color: D.COL.amber, size: 12 });
    }

    // the two rates, side by side
    D.panel(ctx, 710, 70, 170, 280);
    D.label(ctx, "the race", 795, 94, { color: D.COL.muted, size: 11 });
    D.label(ctx, "🦠 doubling", 795, 130, { size: 13, bold: true, color: D.COL.bad });
    D.label(ctx, `${effDoubling.toFixed(1)} h`, 795, 152, { size: 13, mono: true, color: D.COL.text });
    D.label(ctx, "🍽 phagocytes", 795, 200, { size: 13, bold: true, color: D.COL.accent });
    D.label(ctx, `${phagocytes}`, 795, 222, { size: 13, mono: true, color: D.COL.text });
    if (fever === "39") {
      D.label(ctx, "fever active", 795, 270, { size: 12, bold: true, color: D.COL.amber });
      D.label(ctx, "germs slowed", 795, 292, { size: 10, color: D.COL.muted });
      D.label(ctx, "defenders sped up", 795, 308, { size: 10, color: D.COL.muted });
    }

    D.meter(ctx, 20, 14, 200, "Bacteria now", final >= 200000 ? "200k+" : String(Math.round(final)), overwhelmed ? D.COL.bad : D.COL.accent);
    D.meter(ctx, 230, 14, 220, "outcome", clearedAt > 0 ? "cleared" : overwhelmed ? "overwhelmed" : "contested", clearedAt > 0 ? D.COL.good : overwhelmed ? D.COL.bad : D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} label="A race between bacterial growth and phagocyte clearance" />
      <Controls>
        <Slider label="Bacterial doubling time" min={0.5} max={8} step={0.5} value={doubling} onChange={setDoubling} fmt={(v) => `${v.toFixed(1)} h`} />
        <Slider label="Phagocytes on patrol" min={0} max={400} step={10} value={phagocytes} onChange={setPhagocytes} fmt={(v) => String(v)} />
        <Segmented
          label="Body temperature"
          options={[
            { value: "37", label: "37 °C" },
            { value: "39", label: "39 °C fever" },
          ]}
          value={fever}
          onChange={setFever}
        />
      </Controls>
      <Readouts>
        <Readout label="Bacteria after 48 h" value={overwhelmed ? "200,000+" : Math.round(final)} tone={overwhelmed ? "warn" : "good"} />
        <Readout label="Cleared after" value={clearedAt > 0 ? `${(clearedAt / 2).toFixed(0)} h` : "—"} tone="amber" />
        <Readout label="Fever" value={fever === "39" ? "slows germs, speeds defenders" : "off"} />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 7.2 — First vs. second exposure: the adaptive response is slow
 * once and fast forever after. Vaccination is buying that speed cheap.
 * ===================================================================== */

export function ImmunityLab() {
  const [secondDay, setSecondDay] = useState(35);
  const [first, setFirst] = useState<"infection" | "vaccine">("infection");

  // Day-by-day model: the pathogen doubles until antibodies suppress it;
  // the response starts after a lag (long when naive, short with memory)
  // and expands exponentially. Numbers are tuned for shape, not medicine.
  const sim = (() => {
    const days = 70;
    const load: number[] = [];
    const anti: number[] = [];
    let V = 0;
    let A = 0.2;
    let memory = false;
    let sinceInfect = -1;
    let sickFirst = 0;
    let sickSecond = 0;
    let peakFirst = 0;
    let peakSecond = 0;

    for (let d = 0; d <= days; d++) {
      if (d === 0) {
        if (first === "infection") V = 10;
        else sinceInfect = 0; // vaccine: response starts, no live pathogen
      }
      if (d === secondDay) {
        V = Math.max(V, 10);
        sinceInfect = Math.max(sinceInfect, 0);
      }
      if (V > 0 && sinceInfect < 0) sinceInfect = 0;

      if (sinceInfect >= 0) {
        sinceInfect++;
        const lag = memory ? 1 : 6;
        if (sinceInfect > lag) A = Math.min(A * (memory ? 2.6 : 1.9), 1000);
      }
      if (A > 50) memory = true;

      if (V > 0) {
        V = V * (2.0 / (1 + A / 8));
        if (V < 1) {
          V = 0;
          sinceInfect = -1;
          A = Math.max(A, 60);
        }
      } else if (sinceInfect > 10) {
        sinceInfect = -1; // vaccine response winds down
      }
      if (sinceInfect < 0 && A > 6) A = Math.max(A * 0.92, 6); // decay to memory baseline

      if (V > 100) {
        if (d < secondDay) sickFirst++;
        else sickSecond++;
      }
      if (d < secondDay) peakFirst = Math.max(peakFirst, V);
      else peakSecond = Math.max(peakSecond, V);
      load.push(V);
      anti.push(A);
    }
    return { load, anti, sickFirst, sickSecond, peakFirst, peakSecond };
  })();

  const draw = (ctx: CanvasRenderingContext2D) => {
    const gx = 70;
    const gy = 70;
    const gw = 640;
    const gh = 290;
    D.panel(ctx, gx, gy, gw, gh, "#0a1420");
    const days = sim.load.length - 1;
    const mapX = (d: number) => gx + (d / days) * gw;
    const mapY = (v: number, max: number) => gy + gh - (Math.log10(Math.max(v, 0.5)) / Math.log10(max)) * (gh - 18) - 9;

    // sickness threshold
    const sy = mapY(100, 3000);
    ctx.setLineDash([6, 5]);
    D.wire(ctx, [[gx, sy], [gx + gw, sy]], "rgba(242,109,109,0.55)", 1.5);
    ctx.setLineDash([]);
    D.label(ctx, "feeling sick above this line", gx + gw - 12, sy - 12, { align: "right", size: 10, color: D.COL.bad });

    const curve = (data: number[], max: number, color: string) => {
      ctx.save();
      ctx.beginPath();
      ctx.rect(gx, gy, gw, gh);
      ctx.clip();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      data.forEach((v, d) => {
        const x = mapX(d);
        const y = mapY(v, max);
        if (d === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.restore();
    };
    curve(sim.load, 3000, D.COL.bad);
    curve(sim.anti, 3000, D.COL.good);

    // exposure arrows
    const mark = (d: number, text: string) => {
      const x = mapX(d);
      D.wire(ctx, [[x, gy + gh], [x, gy + gh + 10]], D.COL.muted, 2);
      D.label(ctx, text, x, gy + gh + 24, { size: 10, color: D.COL.muted });
    };
    mark(0, first === "vaccine" ? "vaccine" : "first exposure");
    mark(secondDay, "second exposure");

    D.label(ctx, "pathogen", gx + 70, gy + 24, { size: 12, bold: true, color: D.COL.bad });
    D.label(ctx, "antibodies", gx + 190, gy + 24, { size: 12, bold: true, color: D.COL.good });

    D.meter(ctx, 20, 14, 210, "sick days, 1st round", String(sim.sickFirst), sim.sickFirst > 0 ? D.COL.bad : D.COL.good);
    D.meter(ctx, 240, 14, 210, "sick days, 2nd round", String(sim.sickSecond), sim.sickSecond > 0 ? D.COL.bad : D.COL.good);
  };

  return (
    <>
      <SimCanvas width={900} height={420} draw={draw} label="Pathogen load and antibody level across a first and second exposure" />
      <Controls>
        <Segmented
          label="Day 0 is"
          options={[
            { value: "infection", label: "a real infection" },
            { value: "vaccine", label: "a vaccine" },
          ]}
          value={first}
          onChange={setFirst}
        />
        <Slider label="Second exposure on day" min={20} max={60} step={1} value={secondDay} onChange={setSecondDay} fmt={(v) => `${v}`} />
      </Controls>
      <Readouts>
        <Readout label="Sick days, first round" value={sim.sickFirst} tone={sim.sickFirst > 0 ? "warn" : "good"} />
        <Readout label="Sick days, second round" value={sim.sickSecond} tone={sim.sickSecond > 0 ? "warn" : "good"} />
        <Readout label="Why" value={sim.sickSecond === 0 ? "memory cells answered in a day" : "memory still forming"} />
      </Readouts>
    </>
  );
}
