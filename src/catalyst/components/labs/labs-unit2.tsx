"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Slider, Segmented, Select, useTl } from "@/catalyst/components/controls";
import { fmtSci } from "@/catalyst/lib/sim/helpers";
import { tl as translate } from "@/catalyst/lib/labStrings";
import * as D from "@/catalyst/lib/sim/draw";

/* =====================================================================
 * Lab 2.1 — Balance the equation: atoms in = atoms out
 * ===================================================================== */

type Counts = Record<string, number>;

interface Species {
  formula: string;
  atoms: Counts;
}

interface Equation {
  id: string;
  label: string;
  left: Species[];
  right: Species[];
  /** the canonical smallest solution, for the "simplify" hint */
  solution: number[];
}

const EQUATIONS: Equation[] = [
  {
    id: "water",
    label: "H₂ + O₂ → H₂O",
    left: [
      { formula: "H₂", atoms: { H: 2 } },
      { formula: "O₂", atoms: { O: 2 } },
    ],
    right: [{ formula: "H₂O", atoms: { H: 2, O: 1 } }],
    solution: [2, 1, 2],
  },
  {
    id: "methane",
    label: "CH₄ + O₂ → CO₂ + H₂O",
    left: [
      { formula: "CH₄", atoms: { C: 1, H: 4 } },
      { formula: "O₂", atoms: { O: 2 } },
    ],
    right: [
      { formula: "CO₂", atoms: { C: 1, O: 2 } },
      { formula: "H₂O", atoms: { H: 2, O: 1 } },
    ],
    solution: [1, 2, 1, 2],
  },
  {
    id: "rust",
    label: "Fe + O₂ → Fe₂O₃",
    left: [
      { formula: "Fe", atoms: { Fe: 1 } },
      { formula: "O₂", atoms: { O: 2 } },
    ],
    right: [{ formula: "Fe₂O₃", atoms: { Fe: 2, O: 3 } }],
    solution: [4, 3, 2],
  },
  {
    id: "ammonia",
    label: "N₂ + H₂ → NH₃",
    left: [
      { formula: "N₂", atoms: { N: 2 } },
      { formula: "H₂", atoms: { H: 2 } },
    ],
    right: [{ formula: "NH₃", atoms: { N: 1, H: 3 } }],
    solution: [1, 3, 2],
  },
];

const ATOM_COLORS: Record<string, string> = {
  H: "#dde6f0",
  O: D.COL.bad,
  C: "#8fa0b3",
  N: D.COL.accent,
  Fe: D.COL.amber,
};

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function BalanceLab() {
  const tl = useTl();
  const [eqId, setEqId] = useState("water");
  const eq = EQUATIONS.find((e) => e.id === eqId)!;
  const nSpecies = eq.left.length + eq.right.length;
  const [coefs, setCoefs] = useState<number[]>(() => Array(nSpecies).fill(1));

  const setEq = (id: string) => {
    const next = EQUATIONS.find((e) => e.id === id)!;
    setEqId(id);
    setCoefs(Array(next.left.length + next.right.length).fill(1));
  };

  const elements = Array.from(
    new Set([...eq.left, ...eq.right].flatMap((s) => Object.keys(s.atoms)))
  );
  const totals = (side: Species[], offset: number): Counts => {
    const out: Counts = {};
    side.forEach((s, i) => {
      for (const [el, n] of Object.entries(s.atoms)) {
        out[el] = (out[el] ?? 0) + n * coefs[offset + i];
      }
    });
    return out;
  };
  const leftTotals = totals(eq.left, 0);
  const rightTotals = totals(eq.right, eq.left.length);
  const balanced = elements.every((el) => (leftTotals[el] ?? 0) === (rightTotals[el] ?? 0));
  const g = coefs.reduce((a, b) => gcd(a, b));
  const simplest = balanced && g === 1;

  const draw = (ctx: CanvasRenderingContext2D) => {
    // equation text
    const eqText =
      eq.left.map((s, i) => `${coefs[i]} ${s.formula}`).join(" + ") +
      "  →  " +
      eq.right.map((s, i) => `${coefs[eq.left.length + i]} ${s.formula}`).join(" + ");
    D.label(ctx, eqText, 450, 40, { size: 22, bold: true, color: balanced ? D.COL.good : D.COL.text, mono: true });

    // the scales: one beam per element
    const rowH = 74;
    elements.forEach((el, i) => {
      const y = 100 + i * rowH;
      const l = leftTotals[el] ?? 0;
      const r = rightTotals[el] ?? 0;
      const max = Math.max(l, r, 1);
      const tilt = Math.atan2(r - l, 14) * 0.5;

      D.label(ctx, el, 60, y + 18, { size: 20, bold: true, color: ATOM_COLORS[el] ?? D.COL.text });

      // beam
      ctx.save();
      ctx.translate(450, y + 22);
      ctx.rotate(tilt);
      D.wire(ctx, [[-260, 0], [260, 0]], l === r ? D.COL.good : D.COL.muted, 3);
      // pans with atom dots
      for (const [sign, count] of [[-1, l], [1, r]] as const) {
        const px = sign * 240;
        D.wire(ctx, [[px, 0], [px, 14]], D.COL.muted, 1.5);
        ctx.beginPath();
        ctx.strokeStyle = D.COL.muted;
        ctx.arc(px, 26, 26, Math.PI * 0.15, Math.PI * 0.85, false);
        ctx.stroke();
        for (let a = 0; a < count; a++) {
          const col = a % 7;
          const row = Math.floor(a / 7);
          D.dot(ctx, px - 18 + col * 6, 20 - row * 7, 2.8, ATOM_COLORS[el] ?? D.COL.text);
        }
      }
      ctx.restore();

      D.label(ctx, `${l}`, 160, y + 22, { size: 16, mono: true, color: l === r ? D.COL.good : D.COL.bad });
      D.label(ctx, `${r}`, 740, y + 22, { size: 16, mono: true, color: l === r ? D.COL.good : D.COL.bad });
      void max;
    });

    const msgY = 100 + elements.length * rowH + 16;
    if (balanced && simplest) {
      D.label(ctx, "⚖ balanced — every atom accounted for. Lavoisier approves.", 450, msgY, { size: 15, color: D.COL.good, bold: true });
    } else if (balanced) {
      D.label(ctx, `balanced — but every coefficient is divisible by ${g}. Find the smallest set!`, 450, msgY, { size: 14, color: D.COL.amber });
    } else {
      const off = elements.filter((el) => (leftTotals[el] ?? 0) !== (rightTotals[el] ?? 0));
      D.label(ctx, `${tl("not balanced:")} ${off.join(", ")}`, 450, msgY, { size: 14, color: D.COL.bad });
    }
  };

  const allSpecies = [...eq.left, ...eq.right];
  const height = 140 + elements.length * 74;

  return (
    <>
      <SimCanvas width={900} height={height} draw={draw} />
      <Controls>
        <Segmented label="Reaction" options={EQUATIONS.map((e) => ({ value: e.id, label: e.label }))} value={eqId} onChange={setEq} />
        {allSpecies.map((s, i) => (
          <Slider
            key={`${eqId}-${i}`}
            label={`${tl(i < eq.left.length ? "left" : "right")}: ${s.formula}`}
            min={1}
            max={6}
            step={1}
            value={coefs[i]}
            onChange={(v) => setCoefs((c) => c.map((cv, ci) => (ci === i ? v : cv)))}
            fmt={(v) => `× ${v}`}
          />
        ))}
      </Controls>
    </>
  );
}

/* =====================================================================
 * Lab 2.2 — The mole: grams on the scale, armies in the beaker
 * ===================================================================== */

interface MolSubstance {
  id: string;
  label: string;
  formula: string;
  molarMass: number;
  color: string;
  note: string;
}

const SUBSTANCES: MolSubstance[] = [
  { id: "water", label: "Water", formula: "H₂O", molarMass: 18.02, color: "rgba(76,201,240,0.5)", note: "18 g of water ≈ one big gulp" },
  { id: "salt", label: "Table salt", formula: "NaCl", molarMass: 58.44, color: "rgba(221,230,240,0.55)", note: "58 g of salt ≈ a small shaker" },
  { id: "sugar", label: "Glucose", formula: "C₆H₁₂O₆", molarMass: 180.16, color: "rgba(246,178,107,0.5)", note: "180 g of glucose ≈ a full cup" },
  { id: "co2", label: "Carbon dioxide", formula: "CO₂", molarMass: 44.01, color: "rgba(143,160,179,0.4)", note: "44 g of CO₂ ≈ a party balloon's worth" },
  { id: "iron", label: "Iron", formula: "Fe", molarMass: 55.85, color: "rgba(246,178,107,0.7)", note: "56 g of iron ≈ a hefty bolt" },
];

export function MoleLab() {
  const tl = useTl();
  const [subId, setSubId] = useState("water");
  const [grams, setGrams] = useState(18);

  const sub = SUBSTANCES.find((s) => s.id === subId)!;
  const mol = grams / sub.molarMass;
  const particles = mol * 6.022e23;

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    // beaker fill proportional to mass
    const level = Math.min(1, grams / 500);
    D.beaker(ctx, 90, 90, 200, 280, level, sub.color);
    D.label(ctx, `${grams.toFixed(0)} g ${sub.formula}`, 190, 400, { size: 14, color: D.COL.text, mono: true });

    // a few drifting particles inside the liquid
    if (level > 0.02) {
      for (let i = 0; i < 14; i++) {
        const px = 110 + ((i * 53) % 160);
        const py = 360 - ((i * 37 + t * 12) % (level * 260));
        D.dot(ctx, px, py, 3, "rgba(255,255,255,0.5)");
      }
    }

    // conversion chain
    D.panel(ctx, 380, 90, 480, 260);
    D.label(ctx, "mass  ÷ molar mass  =  moles", 620, 122, { size: 14, color: D.COL.muted });
    D.label(ctx, `${grams.toFixed(0)} g ÷ ${sub.molarMass.toFixed(2)} g/mol`, 620, 156, { size: 18, mono: true, color: D.COL.text });
    D.label(ctx, `= ${mol.toFixed(3)} mol`, 620, 190, { size: 24, mono: true, bold: true, color: D.COL.accent });
    D.wire(ctx, [[420, 214], [820, 214]], "#243144", 1);
    D.label(ctx, "moles × Avogadro = particles", 620, 240, { size: 14, color: D.COL.muted });
    D.label(ctx, `${mol.toFixed(3)} mol × 6.022 × 10²³`, 620, 272, { size: 16, mono: true, color: D.COL.text });
    D.label(ctx, `= ${fmtSci(particles, 3)} ${tl("particles")}`, 620, 306, { size: 22, mono: true, bold: true, color: D.COL.amber });

    D.meter(ctx, 20, 14, 200, "molar mass M", `${sub.molarMass.toFixed(2)} g/mol`, D.COL.accent);
    D.meter(ctx, 235, 14, 150, "amount n", `${mol.toFixed(3)} mol`, D.COL.amber);
    D.label(ctx, sub.note, 620, 372, { size: 12, color: D.COL.muted });
  };

  return (
    <>
      <SimCanvas width={900} height={440} draw={draw} />
      <Controls>
        <Select
          label="Substance"
          value={subId}
          onChange={setSubId}
          options={SUBSTANCES.map((s) => ({ value: s.id, label: `${tl(s.label)} (${s.formula}, M = ${s.molarMass.toFixed(2)})` }))}
        />
        <Slider label="Mass on the scale" min={0} max={500} step={1} value={grams} onChange={setGrams} fmt={(v) => `${v} g`} />
      </Controls>
    </>
  );
}

/* =====================================================================
 * Lab 2.3 — Limiting reagent: the recipe runs out of something first
 * ===================================================================== */

export function LimitingLab() {
  const [h2, setH2] = useState(4);
  const [o2, setO2] = useState(4);

  // 2 H₂ + O₂ → 2 H₂O
  const reactions = Math.min(h2 / 2, o2);
  const water = reactions * 2;
  const h2Left = h2 - reactions * 2;
  const o2Left = o2 - reactions;
  const limiting = h2 === 0 && o2 === 0 ? "—" : h2 / 2 < o2 ? "H₂" : o2 < h2 / 2 ? "O₂" : "perfect ratio";

  const draw = (ctx: CanvasRenderingContext2D) => {
    D.label(ctx, "2 H₂  +  O₂  →  2 H₂O", 450, 36, { size: 20, bold: true, mono: true, color: D.COL.text });

    const bar = (x: number, label: string, before: number, after: number, color: string) => {
      const maxH = 240;
      const scale = maxH / 10;
      D.label(ctx, label, x + 55, 96, { size: 15, bold: true, color });
      // before (ghost) and after (solid)
      ctx.fillStyle = "rgba(148,163,179,0.15)";
      ctx.fillRect(x + 10, 360 - before * scale, 40, before * scale);
      ctx.fillStyle = color;
      ctx.fillRect(x + 60, 360 - after * scale, 40, after * scale);
      D.label(ctx, "start", x + 30, 378, { size: 10, color: D.COL.muted });
      D.label(ctx, "end", x + 80, 378, { size: 10, color: D.COL.muted });
      D.label(ctx, `${after.toFixed(1)} mol`, x + 80, 348 - after * scale, { size: 12, mono: true, color });
    };

    bar(120, "H₂", h2, h2Left, D.COL.accent);
    bar(390, "O₂", o2, o2Left, D.COL.bad);
    bar(660, "H₂O", 0, water, D.COL.good);

    D.arrow(ctx, 330, 230, 380, 230, D.COL.muted, 2);
    D.arrow(ctx, 600, 230, 650, 230, D.COL.muted, 2);

    D.meter(ctx, 20, 14, 190, "limiting reagent", limiting, limiting === "perfect ratio" ? D.COL.good : D.COL.amber);
    D.meter(ctx, 225, 14, 170, "water produced", `${water.toFixed(1)} mol`, D.COL.good);
    D.meter(
      ctx,
      410,
      14,
      210,
      "left over",
      h2Left > 0.01 ? `${h2Left.toFixed(1)} mol H₂` : o2Left > 0.01 ? `${o2Left.toFixed(1)} mol O₂` : "nothing — clean plate",
      h2Left > 0.01 || o2Left > 0.01 ? D.COL.muted : D.COL.good
    );
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} />
      <Controls>
        <Slider label="Hydrogen H₂" min={0} max={10} step={0.5} value={h2} onChange={setH2} fmt={(v) => `${v} mol`} />
        <Slider label="Oxygen O₂" min={0} max={10} step={0.5} value={o2} onChange={setO2} fmt={(v) => `${v} mol`} />
      </Controls>
    </>
  );
}

/* =====================================================================
 * Lab 2.4 — Reaction sorter: five patterns, one card at a time. Name the
 * pattern before the answer shows itself.
 * ===================================================================== */

type RxType = "synthesis" | "decomposition" | "single" | "double" | "combustion";

const TYPE_LABEL: Record<RxType, string> = {
  synthesis: "Synthesis",
  decomposition: "Decomposition",
  single: "Single replacement",
  double: "Double replacement",
  combustion: "Combustion",
};

const TYPE_PATTERN: Record<RxType, string> = {
  synthesis: "A + B \u2192 AB",
  decomposition: "AB \u2192 A + B",
  single: "A + BC \u2192 AC + B",
  double: "AB + CD \u2192 AD + CB",
  combustion: "fuel + O\u2082 \u2192 CO\u2082 + H\u2082O",
};

interface RxCard {
  eq: string;
  type: RxType;
  why: string;
}

const CARDS: RxCard[] = [
  { eq: "2 Mg + O\u2082 \u2192 2 MgO", type: "synthesis",
    why: "Two elements combine into one compound. Nothing comes apart." },
  { eq: "2 H\u2082O \u2192 2 H\u2082 + O\u2082", type: "decomposition",
    why: "One compound splits into two elements - electrolysis does exactly this." },
  { eq: "Zn + CuSO\u2084 \u2192 ZnSO\u2084 + Cu", type: "single",
    why: "Zinc kicks copper out of its compound and takes its place. One element swaps in, one drops out." },
  { eq: "AgNO\u2083 + NaCl \u2192 AgCl + NaNO\u2083", type: "double",
    why: "Both compounds swap partners. AgCl is insoluble, so it precipitates out and drives the reaction." },
  { eq: "CH\u2084 + 2 O\u2082 \u2192 CO\u2082 + 2 H\u2082O", type: "combustion",
    why: "A hydrocarbon plus oxygen giving carbon dioxide and water - the signature of burning." },
  { eq: "CaCO\u2083 \u2192 CaO + CO\u2082", type: "decomposition",
    why: "Heating limestone splits it into quicklime and carbon dioxide. One in, two out." },
  { eq: "Fe + 2 HCl \u2192 FeCl\u2082 + H\u2082", type: "single",
    why: "Iron displaces hydrogen from the acid, and the hydrogen bubbles off as a gas." },
  { eq: "N\u2082 + 3 H\u2082 \u2192 2 NH\u2083", type: "synthesis",
    why: "Two elements, one product. The Haber process that feeds about half the planet." },
  { eq: "HCl + NaOH \u2192 NaCl + H\u2082O", type: "double",
    why: "Acid and base swap partners to give a salt and water - neutralisation is a double replacement." },
  { eq: "2 C\u2088H\u2081\u2088 + 25 O\u2082 \u2192 16 CO\u2082 + 18 H\u2082O", type: "combustion",
    why: "Octane burning in an engine. Hydrocarbon + O2 gives CO2 + H2O, every time." },
];

export function ReactionTypeLab() {
  const tl = useTl();
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<RxType | null>(null);
  const [score, setScore] = useState({ right: 0, wrong: 0 });

  const card = CARDS[i];
  const correct = picked === card.type;

  const choose = (t: RxType) => {
    if (picked) return;
    setPicked(t);
    setScore((s) => ({
      right: s.right + (t === card.type ? 1 : 0),
      wrong: s.wrong + (t === card.type ? 0 : 1),
    }));
  };

  const next = () => {
    setPicked(null);
    setI((v) => (v + 1) % CARDS.length);
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    D.panel(ctx, 80, 60, 740, 116);
    D.label(ctx, `reaction ${i + 1} of ${CARDS.length}`, 450, 84, { color: D.COL.muted, size: 11 });
    D.label(ctx, card.eq, 450, 124, { size: 24, bold: true, color: D.COL.accent, mono: true });
    D.label(ctx, picked ? TYPE_PATTERN[card.type] : "which pattern is this?", 450, 156, {
      color: picked ? D.COL.amber : D.COL.muted, size: picked ? 14 : 12, mono: !!picked,
    });

    if (picked) {
      D.panel(ctx, 80, 196, 740, 150, correct ? "rgba(71,194,107,0.10)" : "rgba(242,109,109,0.10)");
      D.label(ctx, correct ? "correct" : `it is ${TYPE_LABEL[card.type]}`, 450, 226, {
        size: 18, bold: true, color: correct ? D.COL.good : D.COL.bad,
      });
      // translate before wrapping — the per-line tl() inside D.label could
      // never match a dictionary key once the sentence is chopped into lines
      let line = "";
      let ly = 260;
      for (const w of translate(card.why).split(" ")) {
        if ((line + w).length > 66) {
          D.label(ctx, line.trim(), 450, ly, { color: D.COL.text, size: 13 });
          ly += 20;
          line = "";
        }
        line += w + " ";
      }
      D.label(ctx, line.trim(), 450, ly, { color: D.COL.text, size: 13 });
      if (!correct) {
        D.label(ctx, `you said ${TYPE_LABEL[picked]}: ${TYPE_PATTERN[picked]}`, 450, 326, {
          color: D.COL.muted, size: 12, mono: true,
        });
      }
    } else {
      D.label(ctx, "the five patterns", 450, 216, { color: D.COL.muted, size: 11 });
      (Object.keys(TYPE_LABEL) as RxType[]).forEach((t, n) => {
        const y = 244 + n * 24;
        D.label(ctx, TYPE_LABEL[t], 330, y, { size: 13, align: "right", color: D.COL.text });
        D.label(ctx, TYPE_PATTERN[t], 370, y, { size: 13, align: "left", color: D.COL.amber, mono: true });
      });
    }

    D.meter(ctx, 20, 14, 150, "correct", String(score.right), D.COL.good);
    D.meter(ctx, 180, 14, 150, "missed", String(score.wrong), score.wrong ? D.COL.bad : D.COL.muted);
  };

  return (
    <>
      <SimCanvas width={900} height={370} draw={draw} />
      <Controls>
        <div className="ctl-row">
          <label>{tl("Classify it")}</label>
          <div className="seg">
            {(Object.keys(TYPE_LABEL) as RxType[]).map((t) => (
              <button
                key={t}
                type="button"
                className={`seg-btn${picked === t ? " active" : ""}`}
                onClick={() => choose(t)}
                disabled={!!picked}
              >
                {tl(TYPE_LABEL[t])}
              </button>
            ))}
          </div>
        </div>
        <div className="ctl-row">
          <label>{tl("Next")}</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={next} disabled={!picked}>
              {tl("Next reaction \u2192")}
            </button>
          </div>
        </div>
      </Controls>
      <Readouts>
        <Readout label="Score" value={`${score.right} / ${score.right + score.wrong}`} tone="good" />
        <Readout label="Card" value={`${i + 1} / ${CARDS.length}`} />
        <Readout label="This one" value={picked ? TYPE_LABEL[card.type] : "\u2014"} tone="amber" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 2.1b — Lavoisier's balance: mass only seems to change when the
 * vessel is open. Seal it and the needle cannot move.
 * ===================================================================== */

interface MassDemo {
  name: string;
  equation: string;
  /** Mass of everything on the reactant side, grams. */
  startMass: number;
  /** Mass of gas that leaves an open vessel, or joins it from the air. */
  gasMass: number;
  /** true = the gas comes OUT of the mixture, false = it goes IN from the air. */
  gasLeaves: boolean;
  gasName: string;
}

const MASS_DEMOS: Record<string, MassDemo> = {
  vinegar: {
    name: "Baking soda + vinegar",
    equation: "NaHCO\u2083 + CH\u2083COOH \u2192 CH\u2083COONa + H\u2082O + CO\u2082",
    startMass: 100, gasMass: 4.4, gasLeaves: true, gasName: "CO\u2082",
  },
  magnesium: {
    name: "Burning magnesium",
    equation: "2 Mg + O\u2082 \u2192 2 MgO",
    startMass: 100, gasMass: 65.9, gasLeaves: false, gasName: "O\u2082",
  },
  rust: {
    name: "Iron rusting",
    equation: "4 Fe + 3 O\u2082 \u2192 2 Fe\u2082O\u2083",
    startMass: 100, gasMass: 43.0, gasLeaves: false, gasName: "O\u2082",
  },
};

export function ConservationLab() {
  const tl = useTl();
  const [key, setKey] = useState("vinegar");
  const [closed, setClosed] = useState<"open" | "closed">("open");
  const [progress, setProgress] = useState(0);
  const anim = useRef({ p: 0 });

  const demo = MASS_DEMOS[key];
  const isClosed = closed === "closed";
  // in a sealed vessel the system mass cannot change; open, gas enters or leaves
  const delta = isClosed ? 0 : (demo.gasLeaves ? -1 : 1) * demo.gasMass * progress;
  const nowMass = demo.startMass + delta;
  const level = Math.abs(delta) < 0.05;

  const draw = (ctx: CanvasRenderingContext2D, dt: number, t: number) => {
    const s = anim.current;
    s.p += (progress - s.p) * Math.min(1, dt * 4);
    const p = s.p;

    // ---- the balance ----
    const pivotX = 250;
    const pivotY = 300;
    const armLen = 150;
    const tilt = Math.max(-0.2, Math.min(0.2, (-delta / demo.startMass) * 2.2));
    D.wire(ctx, [[pivotX - 40, pivotY + 90], [pivotX, pivotY], [pivotX + 40, pivotY + 90]], D.COL.muted, 3);
    D.wire(ctx, [[pivotX - 70, pivotY + 90], [pivotX + 70, pivotY + 90]], D.COL.muted, 4);
    const lx = pivotX - Math.cos(tilt) * armLen;
    const ly = pivotY - Math.sin(tilt) * armLen;
    const rx = pivotX + Math.cos(tilt) * armLen;
    const ry = pivotY + Math.sin(tilt) * armLen;
    D.wire(ctx, [[lx, ly], [rx, ry]], D.COL.glass, 4);
    D.dot(ctx, pivotX, pivotY, 7, D.COL.amber);

    // left pan: the reaction vessel
    D.wire(ctx, [[lx, ly], [lx, ly + 40]], D.COL.muted, 2);
    const jarY = ly + 40;
    D.beaker(ctx, lx - 45, jarY, 90, 76, 0.55, "rgba(45,212,191,0.35)");
    if (p > 0.02) {
      if (demo.gasLeaves) {
        for (let i = 0; i < 12; i++) {
          const bt = (t * 0.9 + i * 0.37) % 1;
          const bx = lx - 28 + ((i * 37) % 56);
          const by = jarY + 70 - bt * (isClosed ? 46 : 120);
          if (!isClosed || by > jarY + 6) {
            ctx.globalAlpha = (1 - bt) * p;
            D.dot(ctx, bx, by, 3.5 + bt * 2, "#a7f3d0");
            ctx.globalAlpha = 1;
          }
        }
      } else {
        D.glow(ctx, lx, jarY + 44, 60 * p, "#fff3c4", 0.5 * p);
      }
    }

    if (isClosed) {
      D.wire(ctx, [[lx - 52, jarY - 2], [lx + 52, jarY - 2]], D.COL.amber, 5);
      D.label(ctx, "sealed", lx, jarY - 16, { color: D.COL.amber, size: 11, bold: true });
    } else {
      D.label(ctx, "open to the air", lx, jarY - 16, { color: D.COL.muted, size: 11 });
    }

    // right pan: the reference weight
    D.wire(ctx, [[rx, ry], [rx, ry + 40]], D.COL.muted, 2);
    ctx.fillStyle = "#3d4f6b";
    ctx.beginPath();
    ctx.roundRect(rx - 34, ry + 40, 68, 46, 5);
    ctx.fill();
    D.label(ctx, `${demo.startMass} g`, rx, ry + 63, { size: 14, bold: true, mono: true });
    D.label(ctx, "reference", rx, ry + 100, { color: D.COL.muted, size: 11 });

    // gas leaving or arriving
    if (!isClosed && p > 0.05) {
      const gy = jarY - 40 - p * 30;
      ctx.globalAlpha = p;
      if (demo.gasLeaves) {
        D.arrow(ctx, lx, jarY - 26, lx, gy, "rgba(167,243,208,0.9)", 2.5, 8);
        D.label(ctx, `${demo.gasName} escapes`, lx, gy - 16, { color: "#a7f3d0", size: 12, bold: true });
      } else {
        D.arrow(ctx, lx - 90, gy - 10, lx - 30, jarY + 20, "rgba(76,201,240,0.9)", 2.5, 8);
        D.arrow(ctx, lx + 90, gy - 10, lx + 30, jarY + 20, "rgba(76,201,240,0.9)", 2.5, 8);
        D.label(ctx, `${demo.gasName} joins from the air`, lx, gy - 24, {
          color: "#4cc9f0", size: 12, bold: true,
        });
      }
      ctx.globalAlpha = 1;
    }

    // ---- the ledger ----
    const bx = 540;
    D.panel(ctx, bx, 60, 340, 330);
    D.label(ctx, tl(demo.name), bx + 170, 84, { color: D.COL.muted, size: 12 });
    D.label(ctx, demo.equation, bx + 170, 112, { color: D.COL.accent, size: 13, mono: true });

    D.label(ctx, "mass on the balance", bx + 170, 150, { color: D.COL.muted, size: 11 });
    D.label(ctx, `${nowMass.toFixed(1)} g`, bx + 170, 186, {
      size: 34, bold: true, mono: true,
      color: level ? D.COL.good : delta < 0 ? D.COL.bad : D.COL.amber,
    });
    D.label(
      ctx,
      level ? tl("unchanged") : `${delta > 0 ? "+" : ""}${delta.toFixed(1)} g`,
      bx + 170, 214,
      { color: level ? D.COL.good : D.COL.amber, size: 13, bold: true }
    );

    D.label(ctx, isClosed ? "closed system" : "open system", bx + 170, 250, {
      color: isClosed ? D.COL.good : D.COL.bad, size: 13, bold: true,
    });
    const msg = isClosed
      ? "Every atom stays inside. The balance cannot move - mass is conserved, exactly."
      : demo.gasLeaves
        ? "Atoms leave as gas. Mass seems to vanish; it is only walking out of the jar."
        : "Atoms arrive from the air. Mass seems to appear; it was in the atmosphere all along.";
    let line = "";
    let ly2 = 280;
    for (const w of translate(msg).split(" ")) {
      if ((line + w).length > 40) {
        D.label(ctx, line.trim(), bx + 170, ly2, { color: D.COL.muted, size: 11 });
        ly2 += 17;
        line = "";
      }
      line += w + " ";
    }
    D.label(ctx, line.trim(), bx + 170, ly2, { color: D.COL.muted, size: 11 });

    D.meter(ctx, 20, 14, 200, "reaction progress", `${Math.round(progress * 100)} %`, D.COL.accent);
    D.meter(ctx, 230, 14, 190, "vessel", isClosed ? "sealed" : "open", isClosed ? D.COL.good : D.COL.bad);
  };

  return (
    <>
      <SimCanvas width={900} height={420} draw={draw} />
      <Controls>
        <Select
          label="Reaction"
          value={key}
          onChange={(v) => {
            setKey(v);
            setProgress(0);
          }}
          options={Object.entries(MASS_DEMOS).map(([k, v]) => ({ value: k, label: v.name }))}
        />
        <Segmented
          label="Vessel"
          value={closed}
          onChange={setClosed}
          options={[
            { value: "open", label: "Open beaker" },
            { value: "closed", label: "Sealed jar" },
          ]}
        />
        <Slider
          label="Run the reaction"
          min={0}
          max={1}
          step={0.01}
          value={progress}
          onChange={setProgress}
          fmt={(v) => `${Math.round(v * 100)} %`}
        />
      </Controls>
      <Readouts>
        <Readout label="Start mass" value={`${demo.startMass.toFixed(1)} g`} />
        <Readout label="Mass now" value={`${nowMass.toFixed(1)} g`} tone={level ? "good" : "amber"} />
        <Readout label="Change" value={`${delta >= 0 ? "+" : ""}${delta.toFixed(1)} g`} />
        <Readout label="Atoms" value="always conserved" tone="good" />
      </Readouts>
    </>
  );
}
