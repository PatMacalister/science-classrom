"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Select, Slider, useTl } from "@/catalyst/components/controls";
import { clamp, rng } from "@/catalyst/lib/sim/helpers";
import { tl as translate } from "@/catalyst/lib/labStrings";
import * as D from "@/catalyst/lib/sim/draw";

/* =====================================================================
 * Lab 1.1 — Ionic bonds: watch sodium hand chlorine its electron
 * ===================================================================== */

interface IonPair {
  id: string;
  label: string;
  donor: { sym: string; shells: number[] };
  acceptor: { sym: string; shells: number[] };
  /** electrons to transfer */
  count: number;
  formula: string;
}

const PAIRS: IonPair[] = [
  { id: "nacl", label: "Na + Cl", donor: { sym: "Na", shells: [2, 8, 1] }, acceptor: { sym: "Cl", shells: [2, 8, 7] }, count: 1, formula: "NaCl — table salt" },
  { id: "mgo", label: "Mg + O", donor: { sym: "Mg", shells: [2, 8, 2] }, acceptor: { sym: "O", shells: [2, 6] }, count: 2, formula: "MgO — magnesia" },
];

export function IonicLab() {
  const tl = useTl();
  const [pairId, setPairId] = useState("nacl");
  const [given, setGiven] = useState(0);
  const anim = useRef({ progress: 1 }); // 0..1 flight of the moving electron

  const pair = PAIRS.find((p) => p.id === pairId)!;
  const done = given >= pair.count;

  const transfer = () => {
    if (done) return;
    anim.current.progress = 0;
    setGiven((g) => g + 1);
  };
  const reset = () => setGiven(0);

  const draw = (ctx: CanvasRenderingContext2D, dt: number, t: number) => {
    anim.current.progress = clamp(anim.current.progress + dt * 1.6, 0, 1);
    const prog = anim.current.progress;

    const dx = 260;
    const ax = 640;
    const cy = 235;

    // shells after (given) transfers
    const donorShells = [...pair.donor.shells];
    let toRemove = given;
    for (let i = donorShells.length - 1; i >= 0 && toRemove > 0; i--) {
      const take = Math.min(donorShells[i], toRemove);
      donorShells[i] -= take;
      toRemove -= take;
    }
    while (donorShells.length && donorShells[donorShells.length - 1] === 0) donorShells.pop();
    const accShells = [...pair.acceptor.shells];
    accShells[accShells.length - 1] += given;

    const donorCharge = given;
    const accCharge = -given;

    // attraction arrows once both are ions
    if (given > 0 && prog === 1) {
      const pull = 30 + given * 25;
      D.arrow(ctx, dx + 130, cy, dx + 130 + pull, cy, D.COL.accent, 3);
      D.arrow(ctx, ax - 130, cy, ax - 130 - pull, cy, D.COL.accent, 3);
      D.label(ctx, "opposite charges attract", (dx + ax) / 2, cy - 26, { color: D.COL.accent, size: 13 });
    }

    D.atom(ctx, dx, cy, 110, { shells: donorShells.length ? donorShells : [0], symbol: pair.donor.sym, color: given > 0 ? D.COL.bad : D.COL.amber }, t);
    D.atom(ctx, ax, cy, 110, { shells: accShells, symbol: pair.acceptor.sym, color: given > 0 ? D.COL.accent : D.COL.amber }, t);

    // the electron in flight
    if (prog < 1) {
      const ex = dx + (ax - dx) * prog;
      const ey = cy - 150 * Math.sin(Math.PI * prog);
      D.glow(ctx, ex, ey, 18, D.COL.accent, 0.8);
      D.dot(ctx, ex, ey, 5, D.COL.accent);
      D.label(ctx, "e⁻", ex, ey - 16, { color: D.COL.accent, size: 12, bold: true });
    }

    // charge labels
    D.label(ctx, donorCharge > 0 ? `${pair.donor.sym}${donorCharge === 1 ? "⁺" : "²⁺"}` : pair.donor.sym, dx, cy - 135, {
      size: 20,
      bold: true,
      color: donorCharge > 0 ? D.COL.bad : D.COL.text,
    });
    D.label(ctx, accCharge < 0 ? `${pair.acceptor.sym}${accCharge === -1 ? "⁻" : "²⁻"}` : pair.acceptor.sym, ax, cy - 135, {
      size: 20,
      bold: true,
      color: accCharge < 0 ? D.COL.accent : D.COL.text,
    });

    D.meter(ctx, 20, 14, 190, "electrons transferred", `${given} / ${pair.count}`, given ? D.COL.amber : D.COL.muted);
    D.meter(ctx, 225, 14, 200, "result", done ? pair.formula : "still neutral atoms", done ? D.COL.good : D.COL.muted);
    if (done) {
      D.label(ctx, "both outer shells are now full — the ions lock into a crystal lattice", 450, 425, {
        color: D.COL.good,
        size: 13,
      });
    }
  };

  return (
    <>
      <SimCanvas width={900} height={440} draw={draw} />
      <Controls>
        <Segmented
          label="Pair"
          options={PAIRS.map((p) => ({ value: p.id, label: p.label }))}
          value={pairId}
          onChange={(v) => {
            setPairId(v);
            setGiven(0);
          }}
        />
        <div className="ctl-row">
          <label>{tl("Reaction")}</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={transfer} disabled={done}>
              {tl("Transfer one electron →")}
            </button>
            <button type="button" className="seg-btn" onClick={reset}>
              {tl("Reset")}
            </button>
          </div>
        </div>
      </Controls>
    </>
  );
}

/* =====================================================================
 * Lab 1.2 — Covalent bonds: share pairs until everyone has an octet
 * ===================================================================== */

interface MolAtom {
  sym: string;
  x: number;
  y: number;
  /** valence electrons the free atom brings */
  valence: number;
  /** electrons needed for a full shell (2 for H, else 8) */
  full: number;
}

interface Molecule {
  id: string;
  label: string;
  atoms: MolAtom[];
  /** bonds as [atomA, atomB, pairs] */
  bonds: Array<[number, number, number]>;
  note: string;
}

const MOLECULES: Molecule[] = [
  {
    id: "h2",
    label: "H₂",
    atoms: [
      { sym: "H", x: 370, y: 220, valence: 1, full: 2 },
      { sym: "H", x: 530, y: 220, valence: 1, full: 2 },
    ],
    bonds: [[0, 1, 1]],
    note: "one shared pair — each H 'sees' 2 electrons",
  },
  {
    id: "o2",
    label: "O₂",
    atoms: [
      { sym: "O", x: 360, y: 220, valence: 6, full: 8 },
      { sym: "O", x: 540, y: 220, valence: 6, full: 8 },
    ],
    bonds: [[0, 1, 2]],
    note: "a double bond: two shared pairs",
  },
  {
    id: "n2",
    label: "N₂",
    atoms: [
      { sym: "N", x: 360, y: 220, valence: 5, full: 8 },
      { sym: "N", x: 540, y: 220, valence: 5, full: 8 },
    ],
    bonds: [[0, 1, 3]],
    note: "a triple bond — one of nature's toughest",
  },
  {
    id: "h2o",
    label: "H₂O",
    atoms: [
      { sym: "O", x: 450, y: 190, valence: 6, full: 8 },
      { sym: "H", x: 330, y: 290, valence: 1, full: 2 },
      { sym: "H", x: 570, y: 290, valence: 1, full: 2 },
    ],
    bonds: [
      [0, 1, 1],
      [0, 2, 1],
    ],
    note: "bent, not straight — the lone pairs push the H atoms down",
  },
  {
    id: "co2",
    label: "CO₂",
    atoms: [
      { sym: "C", x: 450, y: 220, valence: 4, full: 8 },
      { sym: "O", x: 280, y: 220, valence: 6, full: 8 },
      { sym: "O", x: 620, y: 220, valence: 6, full: 8 },
    ],
    bonds: [
      [0, 1, 2],
      [0, 2, 2],
    ],
    note: "two double bonds, perfectly linear",
  },
  {
    id: "ch4",
    label: "CH₄",
    atoms: [
      { sym: "C", x: 450, y: 220, valence: 4, full: 8 },
      { sym: "H", x: 450, y: 100, valence: 1, full: 2 },
      { sym: "H", x: 330, y: 300, valence: 1, full: 2 },
      { sym: "H", x: 570, y: 300, valence: 1, full: 2 },
      { sym: "H", x: 450, y: 340, valence: 1, full: 2 },
    ],
    bonds: [
      [0, 1, 1],
      [0, 2, 1],
      [0, 3, 1],
      [0, 4, 1],
    ],
    note: "carbon's four hands — the root of all organic chemistry",
  },
];

export function CovalentLab() {
  const [molId, setMolId] = useState("h2o");
  const mol = MOLECULES.find((m) => m.id === molId)!;

  // electrons an atom "sees": own valence + one extra per shared pair
  const seen = mol.atoms.map((a, i) => {
    const pairs = mol.bonds.filter(([x, y]) => x === i || y === i).reduce((acc, [, , p]) => acc + p, 0);
    return a.valence + pairs;
  });
  const allFull = seen.every((s, i) => s === mol.atoms[i].full);

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    // bonds: shared pairs drawn as paired dots between atoms
    for (const [ai, bi, pairs] of mol.bonds) {
      const a = mol.atoms[ai];
      const b = mol.atoms[bi];
      D.wire(ctx, [[a.x, a.y], [b.x, b.y]], "rgba(148,163,179,0.25)", pairs * 5 + 3);
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      const px = -(b.y - a.y);
      const py = b.x - a.x;
      const plen = Math.hypot(px, py) || 1;
      for (let pr = 0; pr < pairs; pr++) {
        const off = (pr - (pairs - 1) / 2) * 14;
        const ox = (px / plen) * off;
        const oy = (py / plen) * off;
        const wob = Math.sin(t * 3 + pr) * 2;
        D.dot(ctx, mx + ox - 5 + wob, my + oy, 3.5, D.COL.accent);
        D.dot(ctx, mx + ox + 5 + wob, my + oy, 3.5, D.COL.accent);
      }
    }

    // atoms: nucleus + own (non-bonding) electrons around
    mol.atoms.forEach((a, i) => {
      const bondsOfA = mol.bonds.filter(([x, y]) => x === i || y === i);
      const bondingElectrons = bondsOfA.reduce((acc, [, , p]) => acc + p, 0);
      const lone = a.valence - bondingElectrons;
      const r = a.sym === "H" ? 30 : 44;
      D.glow(ctx, a.x, a.y, r + 12, seen[i] === a.full ? D.COL.good : D.COL.amber, 0.18);
      D.dot(ctx, a.x, a.y, r * 0.42, D.COL.amber);
      D.label(ctx, a.sym, a.x, a.y + 1, { color: "#0b0f14", size: 15, bold: true });
      D.ring(ctx, a.x, a.y, r, "rgba(148,163,179,0.4)", 1);
      // lone electrons in pairs on the far side of the atom
      for (let li = 0; li < lone; li++) {
        const pairIdx = Math.floor(li / 2);
        const within = li % 2;
        const ang = -Math.PI / 2 + pairIdx * (Math.PI / 1.6) + (within - 0.5) * 0.35 + Math.PI * (i % 2);
        D.dot(ctx, a.x + Math.cos(ang) * r, a.y + Math.sin(ang) * r, 3.5, D.COL.violet);
      }
      D.label(ctx, `sees ${seen[i]} / ${a.full}`, a.x, a.y + r + 16, {
        size: 11,
        color: seen[i] === a.full ? D.COL.good : D.COL.bad,
        mono: true,
      });
    });

    D.meter(ctx, 20, 14, 150, "shared pairs", `${mol.bonds.reduce((s, [, , p]) => s + p, 0)}`, D.COL.accent);
    D.meter(ctx, 185, 14, 220, "octet check", allFull ? "every atom satisfied ✓" : "someone is short!", allFull ? D.COL.good : D.COL.bad);
    D.label(ctx, mol.note, 450, 415, { size: 13, color: D.COL.muted });
    D.label(ctx, "cyan = shared pairs · violet = lone electrons", 720, 30, { size: 11, color: "rgba(148,163,179,0.6)" });
  };

  return (
    <>
      <SimCanvas width={900} height={440} draw={draw} />
      <Controls>
        <Segmented
          label="Molecule"
          options={MOLECULES.map((m) => ({ value: m.id, label: m.label }))}
          value={molId}
          onChange={setMolId}
        />
      </Controls>
    </>
  );
}

/* =====================================================================
 * Lab 1.3 — Bond classifier: the electronegativity tug-of-war
 * ===================================================================== */

interface ENElement {
  sym: string;
  name: string;
  en: number;
  metal: boolean;
}

const EN_ELEMENTS: ENElement[] = [
  { sym: "K", name: "Potassium", en: 0.82, metal: true },
  { sym: "Na", name: "Sodium", en: 0.93, metal: true },
  { sym: "Ca", name: "Calcium", en: 1.0, metal: true },
  { sym: "Mg", name: "Magnesium", en: 1.31, metal: true },
  { sym: "Al", name: "Aluminium", en: 1.61, metal: true },
  { sym: "Zn", name: "Zinc", en: 1.65, metal: true },
  { sym: "Fe", name: "Iron", en: 1.83, metal: true },
  { sym: "Cu", name: "Copper", en: 1.9, metal: true },
  { sym: "H", name: "Hydrogen", en: 2.2, metal: false },
  { sym: "C", name: "Carbon", en: 2.55, metal: false },
  { sym: "S", name: "Sulfur", en: 2.58, metal: false },
  { sym: "I", name: "Iodine", en: 2.66, metal: false },
  { sym: "Br", name: "Bromine", en: 2.96, metal: false },
  { sym: "N", name: "Nitrogen", en: 3.04, metal: false },
  { sym: "Cl", name: "Chlorine", en: 3.16, metal: false },
  { sym: "O", name: "Oxygen", en: 3.44, metal: false },
  { sym: "F", name: "Fluorine", en: 3.98, metal: false },
];

export function BondLab() {
  const tl = useTl();
  const [aSym, setASym] = useState("Na");
  const [bSym, setBSym] = useState("Cl");

  const A = EN_ELEMENTS.find((e) => e.sym === aSym)!;
  const B = EN_ELEMENTS.find((e) => e.sym === bSym)!;
  const dEN = Math.abs(A.en - B.en);
  const bothMetal = A.metal && B.metal;

  const kind = bothMetal
    ? "metallic"
    : dEN >= 1.7
      ? "ionic"
      : dEN >= 0.4
        ? "polar covalent"
        : "nonpolar covalent";
  const kindColor =
    kind === "metallic" ? D.COL.amber : kind === "ionic" ? D.COL.bad : kind === "polar covalent" ? D.COL.violet : D.COL.good;

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const ax = 300;
    const bx = 600;
    const cy = 200;
    const stronger = A.en >= B.en ? -1 : 1; // -1: A pulls cloud left

    if (bothMetal) {
      // electron sea
      D.panel(ctx, 230, 120, 440, 170, "#101825");
      for (let i = 0; i < 24; i++) {
        const gx = 260 + (i % 8) * 55;
        const gy = 150 + Math.floor(i / 8) * 55;
        D.dot(ctx, gx, gy, 13, "#5a6b7d");
        D.label(ctx, i % 2 ? A.sym : B.sym, gx, gy + 1, { size: 9, color: "#0b0f14", bold: true });
      }
      for (let i = 0; i < 16; i++) {
        const ex = 245 + ((i * 61 + t * 40) % 410);
        const ey = 135 + ((i * 37) % 140);
        D.dot(ctx, ex, ey, 3, D.COL.accent);
      }
      D.label(ctx, "a shared 'sea' of electrons drifts between the metal cations", 450, 320, { size: 13, color: D.COL.muted });
    } else {
      // shared cloud shifted toward the more electronegative atom
      const shift = kind === "ionic" ? stronger * 95 : stronger * dEN * 34;
      ctx.save();
      ctx.globalAlpha = 0.3;
      const grad = ctx.createRadialGradient(450 + shift, cy, 5, 450 + shift, cy, 120);
      grad.addColorStop(0, D.COL.accent);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(450 + shift, cy, 190, 85, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      D.dot(ctx, ax, cy, 34, D.COL.amber);
      D.label(ctx, A.sym, ax, cy + 1, { size: 16, bold: true, color: "#0b0f14" });
      D.dot(ctx, bx, cy, 34, D.COL.amber);
      D.label(ctx, B.sym, bx, cy + 1, { size: 16, bold: true, color: "#0b0f14" });

      // the two bonding electrons, orbiting nearer the stronger puller
      for (const off of [0, Math.PI]) {
        const exc = 450 + shift + Math.cos(t * 2 + off) * 45;
        const eyc = cy + Math.sin(t * 2 + off) * 26;
        D.dot(ctx, exc, eyc, 4.5, D.COL.accent);
      }

      if (kind === "ionic") {
        const winner = A.en > B.en ? A : B;
        const loser = A.en > B.en ? B : A;
        D.label(ctx, `${winner.sym} ${tl("rips the electron away:")} ${loser.sym}⁺ + ${winner.sym}⁻`, 450, 320, { size: 13, color: D.COL.bad });
      } else if (kind === "polar covalent") {
        D.label(ctx, "δ+", stronger === -1 ? bx + 55 : ax - 55, cy - 40, { size: 17, color: D.COL.bad, bold: true });
        D.label(ctx, "δ−", stronger === -1 ? ax - 55 : bx + 55, cy - 40, { size: 17, color: D.COL.accent, bold: true });
        D.label(ctx, "shared — but not fairly: the cloud sags toward the stronger atom", 450, 320, { size: 13, color: D.COL.muted });
      } else {
        D.label(ctx, "an even tug-of-war: the cloud stays centred", 450, 320, { size: 13, color: D.COL.good });
      }
    }

    // ΔEN gauge with zone markers
    D.label(ctx, "Δχ (electronegativity difference)", 450, 355, { size: 12, color: D.COL.muted });
    D.barGauge(ctx, 150, 368, 600, 18, dEN / 3.2, kindColor, `Δχ = ${dEN.toFixed(2)}`);
    for (const [v, lbl] of [
      [0.4, "0.4"],
      [1.7, "1.7"],
    ] as const) {
      const x = 150 + (v / 3.2) * 600;
      D.wire(ctx, [[x, 362], [x, 392]], D.COL.muted, 1);
      D.label(ctx, lbl, x, 402, { size: 10, color: D.COL.muted, mono: true });
    }

    D.meter(ctx, 20, 14, 170, "electronegativities", `${A.en.toFixed(2)} vs ${B.en.toFixed(2)}`, D.COL.accent);
    D.meter(ctx, 205, 14, 210, "bond type", kind, kindColor);
  };

  return (
    <>
      <SimCanvas width={900} height={440} draw={draw} />
      <Controls>
        <Select
          label="Atom A"
          value={aSym}
          onChange={setASym}
          options={EN_ELEMENTS.map((e) => ({ value: e.sym, label: `${tl(e.name)} (χ = ${e.en.toFixed(2)})` }))}
        />
        <Select
          label="Atom B"
          value={bSym}
          onChange={setBSym}
          options={EN_ELEMENTS.map((e) => ({ value: e.sym, label: `${tl(e.name)} (χ = ${e.en.toFixed(2)})` }))}
        />
      </Controls>
    </>
  );
}

/* =====================================================================
 * Lab 1.4 — VSEPR: electron groups repel, and the shape that results
 * decides whether the molecule is polar overall.
 * ===================================================================== */

interface Shape {
  name: string;
  formula: string;
  /** Bond directions in degrees (screen angles), plus lone-pair directions. */
  bonds: number[];
  lonePairs: number[];
  outer: string;
  centre: string;
  geometry: string;
  angle: string;
  polar: boolean;
  why: string;
}

const SHAPES: Record<string, Shape> = {
  ch4: {
    name: "Methane", formula: "CH\u2084", centre: "C", outer: "H",
    bonds: [-90, 30, 150, 210], lonePairs: [],
    geometry: "tetrahedral", angle: "109.5\u00b0", polar: false,
    why: "Four identical bonds pointing to the corners of a tetrahedron - every pull cancels.",
  },
  nh3: {
    name: "Ammonia", formula: "NH\u2083", centre: "N", outer: "H",
    bonds: [40, 140, 90], lonePairs: [-90],
    geometry: "trigonal pyramidal", angle: "107\u00b0", polar: true,
    why: "The lone pair pushes the three bonds down into a pyramid - the pulls no longer cancel.",
  },
  h2o: {
    name: "Water", formula: "H\u2082O", centre: "O", outer: "H",
    bonds: [35, 145], lonePairs: [-60, -120],
    geometry: "bent", angle: "104.5\u00b0", polar: true,
    why: "Two lone pairs squeeze the bonds into a V. The dipoles add instead of cancelling - this is why water is water.",
  },
  co2: {
    name: "Carbon dioxide", formula: "CO\u2082", centre: "C", outer: "O",
    bonds: [0, 180], lonePairs: [], geometry: "linear", angle: "180\u00b0", polar: false,
    why: "Both C=O bonds are strongly polar - but they point exactly opposite, so the molecule as a whole is not.",
  },
  bf3: {
    name: "Boron trifluoride", formula: "BF\u2083", centre: "B", outer: "F",
    bonds: [-90, 30, 150], lonePairs: [], geometry: "trigonal planar", angle: "120\u00b0", polar: false,
    why: "Three polar bonds at 120 degrees - perfectly balanced, so no net dipole despite fluorine's greed.",
  },
};

/**
 * Draw prose wrapped to `width` characters, returning the next free y.
 * The whole sentence is translated before wrapping — the per-line tl() inside
 * D.label could never match a dictionary key once the text is chopped up.
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  y: number,
  width: number,
  opts: { color?: string; size?: number } = {}
): number {
  let line = "";
  let ly = y;
  for (const w of translate(text).split(" ")) {
    if ((line + w).length > width) {
      D.label(ctx, line.trim(), cx, ly, { color: opts.color ?? D.COL.muted, size: opts.size ?? 11 });
      ly += (opts.size ?? 11) + 6;
      line = "";
    }
    line += w + " ";
  }
  D.label(ctx, line.trim(), cx, ly, { color: opts.color ?? D.COL.muted, size: opts.size ?? 11 });
  return ly + (opts.size ?? 11) + 6;
}

export function ShapeLab() {
  const tl = useTl();
  const [key, setKey] = useState("h2o");
  const [showPairs, setShowPairs] = useState<"on" | "off">("on");

  const s = SHAPES[key];

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const cx = 380;
    const cy = 220;
    const bondLen = 118;
    const wob = Math.sin(t * 1.2) * 1.5;

    // lone pairs first, behind the bonds
    if (showPairs === "on") {
      for (const ang of s.lonePairs) {
        const a = ((ang + wob) * Math.PI) / 180;
        const lx = cx + Math.cos(a) * 66;
        const ly = cy + Math.sin(a) * 66;
        D.glow(ctx, lx, ly, 40, "#c792ea", 0.4);
        for (const off of [-8, 8]) {
          const pa = a + Math.PI / 2;
          D.dot(ctx, lx + Math.cos(pa) * off, ly + Math.sin(pa) * off, 5.5, "#c792ea");
        }
      }
    }

    // bonds + outer atoms
    for (const ang of s.bonds) {
      const a = ((ang + wob) * Math.PI) / 180;
      const ox = cx + Math.cos(a) * bondLen;
      const oy = cy + Math.sin(a) * bondLen;
      if (key === "co2") {
        const pa = a + Math.PI / 2;
        for (const off of [-4, 4]) {
          D.wire(
            ctx,
            [[cx + Math.cos(pa) * off, cy + Math.sin(pa) * off], [ox + Math.cos(pa) * off, oy + Math.sin(pa) * off]],
            "rgba(148,163,179,0.6)",
            2.5
          );
        }
      } else {
        D.wire(ctx, [[cx, cy], [ox, oy]], "rgba(148,163,179,0.6)", 3);
      }
      D.dot(ctx, ox, oy, 26, "#2c6f86");
      D.ring(ctx, ox, oy, 26, "#4cc9f0", 2);
      D.label(ctx, s.outer, ox, oy, { size: 17, bold: true });
    }

    // central atom
    D.glow(ctx, cx, cy, 70, "#f6b26b", 0.25);
    D.dot(ctx, cx, cy, 34, "#7a5c33");
    D.ring(ctx, cx, cy, 34, "#f6b26b", 2.5);
    D.label(ctx, s.centre, cx, cy, { size: 22, bold: true });

    // net dipole: the vector sum of the bonds, reversed (it points away from
    // the lone pairs, which are the electron-rich end)
    if (s.polar) {
      let vx = 0;
      let vy = 0;
      for (const ang of s.bonds) {
        const a = (ang * Math.PI) / 180;
        vx += Math.cos(a);
        vy += Math.sin(a);
      }
      const len = Math.hypot(vx, vy) || 1;
      D.arrow(ctx, cx - (vx / len) * 20, cy - (vy / len) * 20,
        cx - (vx / len) * 105, cy - (vy / len) * 105, "#c792ea", 3.5, 11);
      D.label(ctx, "net dipole", cx - (vx / len) * 128, cy - (vy / len) * 128, {
        color: D.COL.violet, size: 12, bold: true,
      });
    } else {
      D.label(ctx, "pulls cancel - no net dipole", cx, cy + 175, { color: D.COL.good, size: 13, bold: true });
    }

    // info panel
    const bx = 620;
    D.panel(ctx, bx, 70, 258, 300);
    D.label(ctx, s.formula, bx + 129, 108, { size: 30, bold: true, color: D.COL.accent });
    D.label(ctx, s.name, bx + 129, 138, { size: 14 });
    D.label(ctx, s.geometry, bx + 129, 172, { color: D.COL.amber, size: 13, bold: true });
    D.label(ctx, `bond angle \u2248 ${s.angle}`, bx + 129, 194, { color: D.COL.muted, size: 12, mono: true });
    D.label(ctx, `${s.bonds.length} bonding + ${s.lonePairs.length} lone`, bx + 129, 216, {
      color: D.COL.muted, size: 12,
    });
    D.label(ctx, s.polar ? "polar molecule" : "nonpolar molecule", bx + 129, 248, {
      color: s.polar ? D.COL.violet : D.COL.good, size: 13, bold: true,
    });
    wrapText(ctx, s.why, bx + 129, 278, 30);

    D.meter(ctx, 20, 14, 200, "electron groups", `${s.bonds.length + s.lonePairs.length}`, D.COL.accent);
    D.meter(ctx, 230, 14, 220, "shape", s.geometry, D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={420} draw={draw} />
      <Controls>
        <Select
          label="Molecule"
          value={key}
          onChange={setKey}
          options={Object.entries(SHAPES).map(([k, v]) => ({ value: k, label: `${v.formula} - ${tl(v.name)}` }))}
        />
        <Segmented
          label="Lone pairs"
          value={showPairs}
          onChange={setShowPairs}
          options={[
            { value: "on", label: "Show" },
            { value: "off", label: "Hide" },
          ]}
        />
      </Controls>
      <Readouts>
        <Readout label="Geometry" value={s.geometry} tone="amber" />
        <Readout label="Bond angle" value={s.angle} />
        <Readout label="Lone pairs" value={s.lonePairs.length} tone="amber" />
        <Readout label="Overall" value={s.polar ? "polar" : "nonpolar"} tone={s.polar ? "amber" : "good"} />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 1.5 — Intermolecular forces: same-size molecules, wildly different
 * boiling points, because of how strongly they cling to each other.
 * ===================================================================== */

interface Substance {
  name: string;
  formula: string;
  /** Relative stickiness - sets how hard it is to tear molecules apart. */
  stickiness: number;
  force: string;
  bpC: number;
  mass: number;
  note: string;
}

const SUBSTANCES: Record<string, Substance> = {
  ch4: {
    name: "Methane", formula: "CH\u2084", stickiness: 0.16, force: "London dispersion only",
    bpC: -161, mass: 16, note: "Nonpolar. Only fleeting, accidental dipoles hold it together.",
  },
  h2s: {
    name: "Hydrogen sulfide", formula: "H\u2082S", stickiness: 0.42, force: "dipole-dipole",
    bpC: -60, mass: 34, note: "Bent and polar, but sulfur is too big and mild for hydrogen bonds.",
  },
  nh3: {
    name: "Ammonia", formula: "NH\u2083", stickiness: 0.66, force: "hydrogen bonding (N-H)",
    bpC: -33, mass: 17, note: "One lone pair, three H - real hydrogen bonds, but only one acceptor.",
  },
  h2o: {
    name: "Water", formula: "H\u2082O", stickiness: 1.0, force: "hydrogen bonding (O-H)",
    bpC: 100, mass: 18, note: "Two lone pairs and two H: every molecule can hold four neighbours.",
  },
};

export function IMFLab() {
  const [key, setKey] = useState("h2o");
  const [tempC, setTempC] = useState(20);
  const sim = useRef({
    parts: Array.from({ length: 60 }, () => ({ x: 0, y: 0, vx: 0, vy: 0 })),
    seeded: false,
  });

  const sub = SUBSTANCES[key];
  const isGas = tempC > sub.bpC;
  const energy = clamp((tempC + 200) / 300, 0.02, 1.4);
  const escape = clamp((tempC - sub.bpC) / 120 + 0.5, 0, 1);

  const draw = (ctx: CanvasRenderingContext2D, dt: number) => {
    const s = sim.current;
    const boxX = 60;
    const boxY = 70;
    const boxW = 460;
    const boxH = 320;

    if (!s.seeded) {
      const rand = rng(7);
      for (const p of s.parts) {
        p.x = boxX + 20 + rand() * (boxW - 40);
        p.y = boxY + 20 + rand() * (boxH - 40);
        p.vx = (rand() - 0.5) * 40;
        p.vy = (rand() - 0.5) * 40;
      }
      s.seeded = true;
    }

    const speed = 40 + energy * 260;
    const liquidTop = boxY + boxH - boxH * 0.55;
    for (const p of s.parts) {
      if (isGas) {
        p.x += p.vx * dt * (speed / 90);
        p.y += p.vy * dt * (speed / 90);
      } else {
        // below the boiling point the molecules settle into the lower half
        const pull = 90 * (1 - escape);
        p.vy += (p.y < liquidTop ? pull : -pull * 0.25) * dt;
        p.x += p.vx * dt * (speed / 260);
        p.y += p.vy * dt * (speed / 260);
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.vx += (Math.random() - 0.5) * speed * 0.25;
        p.vy += (Math.random() - 0.5) * speed * 0.25;
      }
      if (p.x < boxX + 8) { p.x = boxX + 8; p.vx = Math.abs(p.vx); }
      if (p.x > boxX + boxW - 8) { p.x = boxX + boxW - 8; p.vx = -Math.abs(p.vx); }
      if (p.y < boxY + 8) { p.y = boxY + 8; p.vy = Math.abs(p.vy); }
      if (p.y > boxY + boxH - 8) { p.y = boxY + boxH - 8; p.vy = -Math.abs(p.vy); }
    }

    D.panel(ctx, boxX, boxY, boxW, boxH, "#0a0e14");

    // attraction lines between close neighbours - the visual for the IMF
    if (!isGas) {
      const reach = 34 + sub.stickiness * 26;
      ctx.strokeStyle = `rgba(199,146,234,${0.15 + sub.stickiness * 0.5})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let i = 0; i < s.parts.length; i++) {
        for (let j = i + 1; j < s.parts.length; j++) {
          const a = s.parts[i];
          const b = s.parts[j];
          if (Math.hypot(a.x - b.x, a.y - b.y) < reach) {
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
          }
        }
      }
      ctx.stroke();
    }

    for (const p of s.parts) D.dot(ctx, p.x, p.y, 6.5, isGas ? "#4cc9f0" : "#2dd4bf");

    D.label(ctx, isGas ? "gas - molecules fly free" : "liquid - molecules cling",
      boxX + boxW / 2, boxY + boxH + 24,
      { color: isGas ? D.COL.accent : D.COL.good, size: 13, bold: true });

    // thermometer
    const tx = 560;
    const ty = 80;
    const th = 280;
    D.panel(ctx, tx - 4, ty - 12, 44, th + 30, "#101825");
    const frac = clamp((tempC + 200) / 320, 0, 1);
    ctx.fillStyle = tempC > 0 ? "#f26d6d" : "#4cc9f0";
    ctx.fillRect(tx + 12, ty + th - frac * th, 12, frac * th);
    ctx.strokeStyle = "#33445e";
    ctx.strokeRect(tx + 12, ty, 12, th);
    const bpFrac = clamp((sub.bpC + 200) / 320, 0, 1);
    const bpY = ty + th - bpFrac * th;
    D.wire(ctx, [[tx + 4, bpY], [tx + 32, bpY]], D.COL.amber, 2);
    D.label(ctx, `${sub.bpC} \u00b0C`, tx + 60, bpY, { color: D.COL.amber, size: 11, align: "left", mono: true });
    D.label(ctx, "boiling point", tx + 60, bpY + 14, { color: D.COL.muted, size: 10, align: "left" });
    D.label(ctx, `${tempC} \u00b0C`, tx + 18, ty + th + 24, { color: D.COL.text, size: 12, mono: true });

    // substance panel
    const px = 660;
    D.panel(ctx, px, 70, 220, 300);
    D.label(ctx, sub.formula, px + 110, 106, { size: 28, bold: true, color: D.COL.accent });
    D.label(ctx, sub.name, px + 110, 134, { size: 13 });
    D.label(ctx, `M = ${sub.mass} g/mol`, px + 110, 158, { color: D.COL.muted, size: 12, mono: true });
    D.label(ctx, "strongest force", px + 110, 192, { color: D.COL.muted, size: 11 });
    D.label(ctx, sub.force, px + 110, 212, { color: D.COL.violet, size: 12, bold: true });
    D.barGauge(ctx, px + 30, 232, 160, 16, sub.stickiness, "#c792ea",
      `${Math.round(sub.stickiness * 100)}%`);
    wrapText(ctx, sub.note, px + 110, 274, 26);

    D.meter(ctx, 20, 14, 180, "state", isGas ? "gas" : "liquid", isGas ? D.COL.accent : D.COL.good);
    D.meter(ctx, 210, 14, 190, "boils at", `${sub.bpC} \u00b0C`, D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={430} draw={draw} />
      <Controls>
        <Select
          label="Substance"
          value={key}
          onChange={(v) => {
            setKey(v);
            sim.current.seeded = false;
          }}
          options={Object.entries(SUBSTANCES).map(([k, v]) => ({
            value: k,
            label: `${v.formula} (M = ${v.mass})`,
          }))}
        />
        <Slider
          label="Temperature"
          min={-200}
          max={120}
          step={1}
          value={tempC}
          onChange={setTempC}
          fmt={(v) => `${v} \u00b0C`}
        />
      </Controls>
      <Readouts>
        <Readout label="State" value={isGas ? "gas" : "liquid"} tone={isGas ? undefined : "good"} />
        <Readout label="Molar mass" value={`${sub.mass} g/mol`} />
        <Readout label="Boiling point" value={`${sub.bpC} \u00b0C`} tone="amber" />
        <Readout label="Held by" value={sub.force} tone="amber" />
      </Readouts>
    </>
  );
}
