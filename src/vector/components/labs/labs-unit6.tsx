"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider } from "@/vector/components/controls";
import { clamp } from "@/vector/lib/sim/helpers";
import * as D from "@/vector/lib/sim/draw";

/* =====================================================================
 * Lab 6.1 — The equilibrium bench: two blocks meet in the middle —
 * weighted by mass × specific heat, not by wishful averaging.
 * ===================================================================== */

const MATERIALS = {
  water: { c: 4186, label: "water (c = 4186)" },
  iron: { c: 449, label: "iron (c = 449)" },
  copper: { c: 385, label: "copper (c = 385)" },
} as const;

export function HeatFlowLab() {
  const [t1, setT1] = useState(80);
  const [t2, setT2] = useState(20);
  const [m1, setM1] = useState(1);
  const [m2, setM2] = useState(1);
  const [mat1, setMat1] = useState<keyof typeof MATERIALS>("water");
  const [mat2, setMat2] = useState<keyof typeof MATERIALS>("iron");

  const c1 = MATERIALS[mat1].c;
  const c2 = MATERIALS[mat2].c;
  const tEq = (m1 * c1 * t1 + m2 * c2 * t2) / (m1 * c1 + m2 * c2);
  const q = m1 * c1 * Math.abs(t1 - tEq); // heat handed over

  const tempColor = (temp: number) => {
    const u = clamp((temp - 0) / 100, 0, 1);
    return `rgb(${Math.round(60 + 190 * u)}, ${Math.round(90 + 40 * (1 - u))}, ${Math.round(240 - 180 * u)})`;
  };

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    // approach to equilibrium, replayed on a loop
    const u = 1 - Math.exp(-((t * 0.9) % 6) / 1.4);
    const t1Now = t1 + (tEq - t1) * u;
    const t2Now = t2 + (tEq - t2) * u;

    const draw1 = { x: 250, w: 60 + m1 * 24 };
    const draw2 = { x: 490, w: 60 + m2 * 24 };
    ctx.fillStyle = tempColor(t1Now);
    ctx.fillRect(draw1.x - draw1.w / 2, 130, draw1.w, 120);
    ctx.fillStyle = tempColor(t2Now);
    ctx.fillRect(draw2.x - draw2.w / 2, 130, draw2.w, 120);
    D.label(ctx, `${m1} kg ${mat1}`, draw1.x, 270, { size: 11, color: D.COL.muted });
    D.label(ctx, `${m2} kg ${mat2}`, draw2.x, 270, { size: 11, color: D.COL.muted });
    D.label(ctx, `${t1Now.toFixed(1)} °C`, draw1.x, 190, { size: 15, bold: true, mono: true, color: "#ffffff" });
    D.label(ctx, `${t2Now.toFixed(1)} °C`, draw2.x, 190, { size: 15, bold: true, mono: true, color: "#ffffff" });

    // heat flow arrow while unequal
    if (Math.abs(t1Now - t2Now) > 1) {
      const dir = t1Now > t2Now ? 1 : -1;
      const ax = 370;
      D.wire(ctx, [[ax - dir * 30, 190], [ax + dir * 30, 190]], D.COL.amber, 4);
      D.label(ctx, "heat", ax, 168, { size: 11, color: D.COL.amber });
      D.label(ctx, "hot → cold, always", ax, 214, { size: 10, color: D.COL.muted });
    } else {
      D.label(ctx, "thermal equilibrium", 370, 190, { size: 12, bold: true, color: D.COL.good });
    }

    D.panel(ctx, 660, 120, 220, 150);
    D.label(ctx, "the compromise", 770, 144, { color: D.COL.muted, size: 11 });
    D.label(ctx, `weighted by m·c`, 770, 172, { size: 11, color: D.COL.muted });
    D.label(ctx, `${(m1 * c1).toLocaleString("en-GB")} vs ${(m2 * c2).toLocaleString("en-GB")}`, 770, 198, { size: 12, mono: true, color: D.COL.text });
    D.label(ctx, `→ ${tEq.toFixed(1)} °C`, 770, 232, { size: 16, mono: true, bold: true, color: D.COL.accent });

    D.meter(ctx, 20, 8, 200, "equilibrium", `${tEq.toFixed(1)} °C`, D.COL.accent);
    D.meter(ctx, 230, 8, 220, "heat handed over", `${(q / 1000).toFixed(1)} kJ`, D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={300} draw={draw} label="Two blocks exchanging heat until they meet at a weighted equilibrium temperature" />
      <Controls>
        <Slider label="Block 1 temperature" min={0} max={100} step={1} value={t1} onChange={setT1} fmt={(v) => `${v} °C`} />
        <Slider label="Block 2 temperature" min={0} max={100} step={1} value={t2} onChange={setT2} fmt={(v) => `${v} °C`} />
        <Slider label="Block 1 mass" min={0.5} max={4} step={0.5} value={m1} onChange={setM1} fmt={(v) => `${v} kg`} />
        <Slider label="Block 2 mass" min={0.5} max={4} step={0.5} value={m2} onChange={setM2} fmt={(v) => `${v} kg`} />
        <Segmented label="Block 1 material" options={Object.entries(MATERIALS).map(([k, m]) => ({ value: k as keyof typeof MATERIALS, label: m.label }))} value={mat1} onChange={setMat1} />
        <Segmented label="Block 2 material" options={Object.entries(MATERIALS).map(([k, m]) => ({ value: k as keyof typeof MATERIALS, label: m.label }))} value={mat2} onChange={setMat2} />
      </Controls>
      <Readouts>
        <Readout label="Meeting point" value={`${tEq.toFixed(1)} °C`} tone="good" />
        <Readout label="Thermal bulk 1 (m·c)" value={(m1 * c1).toLocaleString("en-GB")} />
        <Readout label="Thermal bulk 2 (m·c)" value={(m2 * c2).toLocaleString("en-GB")} />
        <Readout label="Water wins because" value="c = 4,186 — a thermal flywheel" tone="amber" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 6.2 — The photoelectric bench: exact change only. Frequency buys
 * escape; brightness only buys copies.
 * ===================================================================== */

export function PhotoelectricLab() {
  const [freq, setFreq] = useState(5.0); // ×10^14 Hz
  const [brightness, setBrightness] = useState(50);

  const H = 6.63e-34;
  const WORK = 3.6e-19; // ~ sodium-ish, threshold ≈ 5.4 ×10^14 Hz
  const photonE = H * freq * 1e14;
  const escapes = photonE > WORK;
  const thresholdF = WORK / H / 1e14;
  const surplus = Math.max(0, photonE - WORK);
  const rate = escapes ? Math.round(brightness / 5) : 0;

  const lightColor = freq < 4 ? "#b03030" : freq < 4.8 ? "#ff4d4d" : freq < 5.3 ? "#ffe14d" : freq < 6.4 ? "#4dc3ff" : freq < 7.5 ? "#a44dff" : "#d9c7ff";

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const plateX = 320;

    // metal plate
    ctx.fillStyle = "#33445e";
    ctx.fillRect(plateX - 14, 80, 14, 220);
    D.label(ctx, "metal", plateX - 40, 190, { size: 11, color: D.COL.muted });

    // incoming photons
    const count = Math.round(brightness / 10) + 1;
    for (let i = 0; i < count; i++) {
      const phase = (t * 1.3 + i * 0.37) % 1;
      const x = 60 + phase * (plateX - 80);
      const y = 100 + ((i * 53) % 180);
      D.dot(ctx, x, y, 4, lightColor);
      D.wire(ctx, [[x - 14, y], [x - 4, y]], `${lightColor}88`, 1.5);
    }

    // ejected electrons (only above threshold)
    if (escapes) {
      for (let i = 0; i < rate; i++) {
        const phase = (t * (0.5 + surplus * 6e18) + i * 0.29) % 1;
        const x = plateX + 8 + phase * 380;
        const y = 110 + ((i * 71) % 170);
        D.dot(ctx, x, y, 3.5, D.COL.accent);
      }
      D.label(ctx, "electrons out — instantly", plateX + 210, 70, { size: 11, color: D.COL.accent });
    } else {
      D.label(ctx, "nothing — at any brightness, for any duration", plateX + 210, 70, { size: 11, bold: true, color: D.COL.bad });
    }

    // the vending machine ledger
    D.panel(ctx, 640, 110, 240, 190);
    D.label(ctx, "one photon's offer", 760, 134, { color: D.COL.muted, size: 11 });
    D.label(ctx, `E = hf = ${(photonE * 1e19).toFixed(2)} ×10⁻¹⁹ J`, 760, 164, { size: 11, mono: true, color: D.COL.text });
    D.label(ctx, `escape costs ${(WORK * 1e19).toFixed(2)} ×10⁻¹⁹ J`, 760, 192, { size: 11, mono: true, color: D.COL.amber });
    D.label(ctx, escapes ? "paid — surplus becomes speed" : "insufficient — no sale", 760, 226, {
      size: 12,
      bold: true,
      color: escapes ? D.COL.good : D.COL.bad,
    });
    D.label(ctx, "packets don't pool", 760, 274, { size: 10, color: D.COL.muted });

    D.meter(ctx, 20, 8, 210, "frequency", `${freq.toFixed(1)} ×10¹⁴ Hz`, escapes ? D.COL.good : D.COL.bad);
    D.meter(ctx, 240, 8, 190, "threshold", `${thresholdF.toFixed(1)} ×10¹⁴ Hz`, D.COL.amber);
    D.meter(ctx, 440, 8, 180, "electrons/s", String(rate), escapes ? D.COL.accent : D.COL.muted);
  };

  return (
    <>
      <SimCanvas width={900} height={330} draw={draw} label="Photons striking a metal plate, ejecting electrons only above a threshold frequency" />
      <Controls>
        <Slider label="Light frequency" min={3} max={9} step={0.1} value={freq} onChange={setFreq} fmt={(v) => `${v.toFixed(1)} ×10¹⁴ Hz`} />
        <Slider label="Brightness" min={10} max={100} step={5} value={brightness} onChange={setBrightness} fmt={(v) => `${v}%`} />
      </Controls>
      <Readouts>
        <Readout label="Electrons" value={escapes ? "ejected instantly" : "none"} tone={escapes ? "good" : "warn"} />
        <Readout label="Brightness controls" value="how many — never how fast" tone="amber" />
        <Readout label="Frequency controls" value="each electron's energy" />
        <Readout label="Because" value="E = hf, exact change only" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 6.3 — The decay farm: lawless individuals, metronomic crowds.
 * A seeded generator keeps every run reproducible-but-random-looking.
 * ===================================================================== */

export function DecayLab() {
  const [n0, setN0] = useState(10000);
  const [halfLife, setHalfLife] = useState(10);
  const [seed, setSeed] = useState(1);
  const [sample, setSample] = useState<"fresh" | "ancient">("fresh");

  // seeded hash so the wobble is honest randomness, reproducibly — a pure
  // function of (seed, draw index), so no closure state survives the render
  const series = (() => {
    const randAt = (i: number) => {
      let z = (Math.imul(seed, 0x9e3779b9) + Math.imul(i + 1, 0x6d2b79f5)) >>> 0;
      z = Math.imul(z ^ (z >>> 15), z | 1);
      z ^= z + Math.imul(z ^ (z >>> 7), z | 61);
      return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
    };
    const pPerStep = 1 - Math.pow(0.5, 1 / halfLife); // per time unit
    const start = sample === "ancient" ? Math.round(n0 / 8) : n0;
    let n = start;
    let draw = 0;
    const out = [n];
    for (let t = 1; t <= 60; t++) {
      // binomial via normal approx for speed; exact loop for small n
      if (n > 200) {
        const mean = n * pPerStep;
        const sd = Math.sqrt(n * pPerStep * (1 - pPerStep));
        const gauss = randAt(draw) + randAt(draw + 1) + randAt(draw + 2) + randAt(draw + 3) - 2;
        draw += 4;
        const decayed = Math.round(mean + sd * gauss * 1.73);
        n = Math.max(0, n - Math.max(0, decayed));
      } else {
        let decayed = 0;
        for (let i = 0; i < n; i++) if (randAt(draw + i) < pPerStep) decayed++;
        draw += n;
        n -= decayed;
      }
      out.push(n);
    }
    return { out, start };
  })();

  const remainFrac = series.start / n0;
  const impliedAge = sample === "ancient" ? Math.log2(1 / remainFrac) * halfLife : 0;

  const draw = (ctx: CanvasRenderingContext2D) => {
    const gx = 70;
    const gy = 50;
    const gw = 560;
    const gh = 280;
    D.panel(ctx, gx, gy, gw, gh, "#0a1420");
    const yMax = series.start * 1.08;
    const mapY = (n: number) => gy + gh - (n / yMax) * (gh - 20);

    // ideal exponential for comparison
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "rgba(246,178,107,0.55)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let t = 0; t <= 60; t++) {
      const ideal = series.start * Math.pow(0.5, t / halfLife);
      const x = gx + (t / 60) * gw;
      if (t === 0) ctx.moveTo(x, mapY(ideal));
      else ctx.lineTo(x, mapY(ideal));
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // measured (random) curve
    ctx.strokeStyle = D.COL.accent;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    series.out.forEach((n, t) => {
      const x = gx + (t / 60) * gw;
      if (t === 0) ctx.moveTo(x, mapY(n));
      else ctx.lineTo(x, mapY(n));
    });
    ctx.stroke();

    // half-life gridlines
    for (let k = 1; k * halfLife <= 60 && k <= 5; k++) {
      const x = gx + ((k * halfLife) / 60) * gw;
      D.wire(ctx, [[x, gy], [x, gy + gh]], "rgba(139,151,167,0.2)", 1);
      D.label(ctx, `${k}·T½`, x, gy + gh + 16, { size: 9, mono: true, color: D.COL.muted });
    }

    D.label(ctx, "dashed: the ideal halving · solid: this run's actual luck", gx + gw / 2, gy + 20, {
      size: 10,
      color: D.COL.muted,
    });

    D.panel(ctx, 670, 50, 210, 280);
    D.label(ctx, "the census", 775, 74, { color: D.COL.muted, size: 11 });
    [1, 2, 3].forEach((k) => {
      const idx = Math.min(60, k * halfLife);
      D.label(ctx, `after ${k}·T½`, 692, 100 + k * 34, { align: "left", size: 11, color: D.COL.muted });
      D.label(ctx, `${series.out[idx]}`, 858, 100 + k * 34, { align: "right", size: 12, mono: true, color: D.COL.text });
    });
    D.label(ctx, `ideal: ${Math.round(series.start / 2)}, ${Math.round(series.start / 4)}, ${Math.round(series.start / 8)}`, 775, 244, { size: 10, mono: true, color: D.COL.amber });
    D.label(ctx, series.start < 100 ? "small sample: ragged" : "big sample: metronomic", 775, 290, {
      size: 11,
      bold: true,
      color: series.start < 100 ? D.COL.bad : D.COL.good,
    });

    D.meter(ctx, 20, 8, 180, "population", String(series.start), D.COL.accent);
    D.meter(ctx, 210, 8, 180, "half-life", `${halfLife} time units`, D.COL.amber);
    if (sample === "ancient") {
      D.meter(ctx, 400, 8, 230, "implied age (1/8 left)", `${impliedAge.toFixed(0)} time units`, D.COL.good);
    }
  };

  return (
    <>
      <SimCanvas width={900} height={370} draw={draw} label="A radioactive population halving on schedule despite individually random decays" />
      <Controls>
        <Slider label="Starting nuclei" min={20} max={10000} step={20} value={n0} onChange={setN0} fmt={(v) => String(v)} />
        <Slider label="Half-life" min={4} max={20} step={1} value={halfLife} onChange={setHalfLife} fmt={(v) => `${v}` } />
        <Slider label="Random seed" min={1} max={20} step={1} value={seed} onChange={setSeed} fmt={(v) => `run #${v}`} />
        <Segmented
          label="Sample"
          options={[
            { value: "fresh", label: "fresh (100%)" },
            { value: "ancient", label: "ancient (12.5% left)" },
          ]}
          value={sample}
          onChange={setSample}
        />
      </Controls>
      <Readouts>
        <Readout label="Nuclei now (end of run)" value={series.out[60]} tone="amber" />
        <Readout label="Any single nucleus" value="genuinely unpredictable" />
        <Readout
          label={sample === "ancient" ? "Dating: 1/8 left means" : "The crowd"}
          value={sample === "ancient" ? `3 half-lives ≈ ${impliedAge.toFixed(0)} units old` : "halves on schedule"}
          tone="good"
        />
      </Readouts>
    </>
  );
}
