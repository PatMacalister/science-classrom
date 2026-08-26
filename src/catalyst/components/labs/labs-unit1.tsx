"use client";

import { useRef, useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Segmented, Select } from "@/catalyst/components/controls";
import { clamp } from "@/catalyst/lib/sim/helpers";
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
          <label>Reaction</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={transfer} disabled={done}>
              Transfer one electron →
            </button>
            <button type="button" className="seg-btn" onClick={reset}>
              Reset
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
        D.label(ctx, `${winner.sym} rips the electron away: ${loser.sym}⁺ and ${winner.sym}⁻`, 450, 320, { size: 13, color: D.COL.bad });
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
          options={EN_ELEMENTS.map((e) => ({ value: e.sym, label: `${e.name} (χ = ${e.en.toFixed(2)})` }))}
        />
        <Select
          label="Atom B"
          value={bSym}
          onChange={setBSym}
          options={EN_ELEMENTS.map((e) => ({ value: e.sym, label: `${e.name} (χ = ${e.en.toFixed(2)})` }))}
        />
      </Controls>
    </>
  );
}
