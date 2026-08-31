"use client";

import { useState } from "react";
import SimCanvas from "@/shared/SimCanvas";
import { Controls, Readout, Readouts, Segmented, Slider, useTl } from "@/helix/components/controls";
import { clamp } from "@/helix/lib/sim/helpers";
import { tl as translate } from "@/helix/lib/labStrings";
import {
  AMINO_BY_CODE,
  CODON_TABLE,
  complement,
  transcribe,
  translate as translateRna,
} from "@/helix/lib/codons";
import * as D from "@/helix/lib/sim/draw";

const BASE_COLOR: Record<string, string> = {
  A: "#fb7185",
  T: "#fbbf24",
  U: "#fbbf24",
  C: "#7dd3fc",
  G: "#34d399",
};

/* =====================================================================
 * Lab 2.1 — Base pairing: A holds T with two bonds, C holds G with
 * three. Type any strand and its partner writes itself.
 * ===================================================================== */

export function BasePairLab() {
  const [strand, setStrand] = useState("ATGCGGATTACA");

  const bases = strand.toUpperCase().replace(/[^ATCG]/g, "").slice(0, 18).split("");
  const partner = bases.map(complement);
  const gcCount = bases.filter((b) => b === "G" || b === "C").length;
  const gcPercent = bases.length ? (gcCount / bases.length) * 100 : 0;
  const hBonds = bases.reduce((n, b) => n + (b === "G" || b === "C" ? 3 : 2), 0);

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const n = bases.length;
    if (n === 0) {
      D.label(ctx, "type some bases: A, T, C, G", 450, 200, { color: D.COL.muted, size: 15 });
      return;
    }
    const step = Math.min(46, 800 / n);
    const x0 = 450 - ((n - 1) * step) / 2;
    const topY = 150;
    const botY = 290;

    // sugar-phosphate backbones, drawn as a gentle twist
    for (const [y, dir] of [[topY, -1], [botY, 1]] as const) {
      ctx.strokeStyle = "rgba(148,163,179,0.55)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const x = x0 + i * step;
        const yy = y + Math.sin(i * 0.6 + t * 0.8) * 5 * dir;
        if (i === 0) ctx.moveTo(x, yy);
        else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }

    for (let i = 0; i < n; i++) {
      const x = x0 + i * step;
      const b = bases[i];
      const p = partner[i];
      const strong = b === "G" || b === "C";
      // hydrogen bonds: two rungs or three
      const rungs = strong ? 3 : 2;
      ctx.strokeStyle = strong ? "rgba(52,211,153,0.8)" : "rgba(251,191,36,0.7)";
      ctx.lineWidth = 1.6;
      for (let r = 0; r < rungs; r++) {
        const off = (r - (rungs - 1) / 2) * 5;
        ctx.beginPath();
        ctx.moveTo(x + off, topY + 20);
        ctx.lineTo(x + off, botY - 20);
        ctx.stroke();
      }
      // the bases themselves
      for (const [y, letter] of [[topY, b], [botY, p]] as const) {
        D.dot(ctx, x, y, 16, BASE_COLOR[letter] ?? D.COL.muted);
        D.label(ctx, letter, x, y + 1, { size: 15, bold: true, color: "#101825" });
      }
    }

    D.label(ctx, "5' → 3'", x0 - 42, topY, { color: D.COL.muted, size: 12, mono: true });
    D.label(ctx, "3' ← 5'", x0 - 42, botY, { color: D.COL.muted, size: 12, mono: true });
    D.label(ctx, "the two strands run in opposite directions — antiparallel", 450, 350, {
      color: D.COL.muted,
      size: 12,
    });

    D.meter(ctx, 20, 14, 170, "bases", String(n), D.COL.accent);
    D.meter(ctx, 200, 14, 190, "G–C content", `${gcPercent.toFixed(0)} %`, D.COL.good);
    D.meter(ctx, 400, 14, 210, "hydrogen bonds", String(hBonds), D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={380} draw={draw} label="A DNA double helix with base pairs and hydrogen bonds" />
      <Controls>
        <div className="ctl-row">
          <label>Template strand</label>
          <input
            className="prob-input"
            value={strand}
            maxLength={18}
            onChange={(e) => setStrand(e.target.value.toUpperCase())}
            placeholder="ATGCGGATTACA"
            aria-label="DNA bases"
          />
        </div>
        <div className="ctl-row">
          <label>Presets</label>
          <div className="seg">
            {["ATGCGGATTACA", "GGGCCCGGGCCC", "ATATATATATAT"].map((s) => (
              <button key={s} type="button" className="seg-btn" onClick={() => setStrand(s)}>
                {s.slice(0, 6)}…
              </button>
            ))}
          </div>
        </div>
      </Controls>
      <Readouts>
        <Readout label="Complement" value={partner.join("") || "—"} />
        <Readout label="G–C content" value={`${gcPercent.toFixed(0)} %`} tone="good" />
        <Readout label="Hydrogen bonds" value={hBonds} tone="amber" />
        <Readout label="Harder to separate" value={gcPercent > 55 ? "yes — GC-rich" : "no — AT-rich"} />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 2.2 — The replication fork: unzip, and each old strand templates
 * a new one. One side runs smoothly, the other in backwards chunks.
 * ===================================================================== */

export function ReplicationLab() {
  const [progress, setProgress] = useState(0.35);
  const [showLagging, setShowLagging] = useState<"on" | "off">("on");

  const template = "ATGCGGATTACAGGCTTAGCCATGGTCA";
  const n = template.length;
  const opened = Math.round(progress * n);

  const draw = (ctx: CanvasRenderingContext2D, _dt: number, t: number) => {
    const step = 27;
    const x0 = 90;
    const midY = 210;
    const spread = 62;

    for (let i = 0; i < n; i++) {
      const x = x0 + i * step;
      const isOpen = i < opened;
      const sep = isOpen ? spread : 20;
      const topY = midY - sep;
      const botY = midY + sep;
      const b = template[i];
      const c = complement(b);

      if (!isOpen) {
        ctx.strokeStyle = "rgba(148,163,179,0.4)";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(x, topY + 14);
        ctx.lineTo(x, botY - 14);
        ctx.stroke();
      }

      // original strands
      D.dot(ctx, x, topY, 11, BASE_COLOR[b]);
      D.label(ctx, b, x, topY + 1, { size: 11, bold: true, color: "#101825" });
      D.dot(ctx, x, botY, 11, BASE_COLOR[c]);
      D.label(ctx, c, x, botY + 1, { size: 11, bold: true, color: "#101825" });

      // newly built strands appear behind the fork
      if (isOpen) {
        const newTop = complement(b);
        const newBot = b;
        // leading strand: continuous, right up to the fork
        D.dot(ctx, x, topY + 26, 9, BASE_COLOR[newTop] + "cc");
        D.label(ctx, newTop, x, topY + 27, { size: 10, bold: true, color: "#101825" });
        // lagging strand: drawn in fragments
        if (showLagging === "on") {
          const frag = Math.floor(i / 5);
          const inFrag = i % 5;
          if (inFrag < 4 || frag % 2 === 0) {
            D.dot(ctx, x, botY - 26, 9, BASE_COLOR[newBot] + "cc");
            D.label(ctx, newBot, x, botY - 27, { size: 10, bold: true, color: "#101825" });
          }
        }
      }
    }

    // the fork marker
    const fx = x0 + opened * step;
    D.wire(ctx, [[fx, midY - 110], [fx, midY + 110]], "rgba(45,212,191,0.5)", 2);
    D.glow(ctx, fx, midY, 40 + Math.sin(t * 3) * 6, "#2dd4bf", 0.35);
    D.label(ctx, "helicase", fx, midY - 124, { color: D.COL.accent, size: 12, bold: true });
    D.label(ctx, "unzips the two strands", fx, midY + 128, { color: D.COL.muted, size: 11 });

    D.label(ctx, "leading strand — built continuously", 450, 92, { color: "#a7f3d0", size: 12 });
    if (showLagging === "on") {
      D.label(ctx, "lagging strand — built in backwards fragments, then glued", 450, 336, {
        color: "#fbbf24",
        size: 12,
      });
    }

    D.meter(ctx, 20, 14, 190, "bases unzipped", `${opened} / ${n}`, D.COL.accent);
    D.meter(ctx, 220, 14, 240, "result", "2 identical double helices", D.COL.good);
  };

  return (
    <>
      <SimCanvas width={900} height={400} draw={draw} label="A DNA replication fork with leading and lagging strands" />
      <Controls>
        <Slider
          label="Fork progress"
          min={0}
          max={1}
          step={0.01}
          value={progress}
          onChange={setProgress}
          fmt={(v) => `${Math.round(v * 100)} %`}
        />
        <Segmented
          label="Lagging strand"
          value={showLagging}
          onChange={setShowLagging}
          options={[
            { value: "on", label: "Show" },
            { value: "off", label: "Hide" },
          ]}
        />
      </Controls>
      <Readouts>
        <Readout label="Unzipped" value={`${opened} / ${n} bases`} />
        <Readout label="Each new helix" value="1 old + 1 new strand" tone="good" />
        <Readout label="Called" value="semi-conservative" tone="amber" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 2.3 — Transcription and translation, codon by codon. The genetic
 * code table from /helix/codons, applied one triplet at a time.
 * ===================================================================== */

const DEFAULT_GENE = "TACCCGGGATTAACT";

export function TranslationLab() {
  const tl = useTl();
  const [dna, setDna] = useState(DEFAULT_GENE);
  const [step, setStep] = useState(3);

  const template = dna.toUpperCase().replace(/[^ATCG]/g, "").slice(0, 30);
  const mrna = transcribe(template);
  const { protein, codons } = translateRna(mrna);
  const shown = clamp(step, 0, codons.length);

  const draw = (ctx: CanvasRenderingContext2D) => {
    const step0 = 30;
    const x0 = 70;

    // --- DNA template ---
    D.label(ctx, tl("Template strand"), x0 - 8, 76, { align: "left", size: 12, color: D.COL.muted });
    for (let i = 0; i < template.length; i++) {
      const x = x0 + i * step0;
      D.dot(ctx, x, 104, 12, BASE_COLOR[template[i]]);
      D.label(ctx, template[i], x, 105, { size: 12, bold: true, color: "#101825" });
    }

    D.arrow(ctx, 450, 128, 450, 152, D.COL.muted, 2, 8);
    D.label(ctx, "transcription", 500, 140, { color: D.COL.accent, size: 12 });

    // --- mRNA ---
    D.label(ctx, "mRNA", x0 - 8, 176, { align: "left", size: 12, color: D.COL.muted });
    for (let i = 0; i < mrna.length; i++) {
      const x = x0 + i * step0;
      const codonIdx = Math.floor(i / 3);
      const active = codonIdx < shown;
      ctx.globalAlpha = active ? 1 : 0.35;
      D.dot(ctx, x, 204, 12, BASE_COLOR[mrna[i]]);
      D.label(ctx, mrna[i], x, 205, { size: 12, bold: true, color: "#101825" });
      ctx.globalAlpha = 1;
      // codon brackets
      if (i % 3 === 0 && i + 2 < mrna.length) {
        ctx.strokeStyle = active ? "rgba(45,212,191,0.8)" : "rgba(148,163,179,0.25)";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x - 16, 186, step0 * 3 - 6, 36);
      }
    }

    D.arrow(ctx, 450, 232, 450, 256, D.COL.muted, 2, 8);
    D.label(ctx, "translation", 500, 244, { color: D.COL.accent, size: 12 });

    // --- protein ---
    D.label(ctx, tl("Protein"), x0 - 8, 280, { align: "left", size: 12, color: D.COL.muted });
    for (let i = 0; i < shown; i++) {
      const codon = codons[i];
      const code = CODON_TABLE[codon];
      const aa = AMINO_BY_CODE[code];
      const x = x0 + i * step0 * 3 + step0;
      const isStop = code === "*";
      D.dot(ctx, x, 310, 19, isStop ? "#f26d6d" : "#2dd4bf");
      D.label(ctx, isStop ? "■" : aa.code1, x, 311, { size: 14, bold: true, color: "#08312c" });
      D.label(ctx, isStop ? "STOP" : aa.code3, x, 338, { size: 11, color: D.COL.muted });
      if (i > 0 && !isStop) {
        D.wire(ctx, [[x - step0 * 3 + 19, 310], [x - 19, 310]], "rgba(45,212,191,0.6)", 3);
      }
    }

    // the codon being read
    if (shown > 0 && shown <= codons.length) {
      const codon = codons[shown - 1];
      const code = CODON_TABLE[codon];
      const aa = AMINO_BY_CODE[code];
      D.panel(ctx, 620, 356, 260, 56, "#101825");
      D.label(ctx, `${codon} → ${code === "*" ? "STOP" : aa.name}`, 750, 384, {
        size: 15,
        bold: true,
        mono: true,
        color: code === "*" ? D.COL.bad : D.COL.accent,
      });
    }

    D.meter(ctx, 20, 14, 190, "codons read", `${shown} / ${codons.length}`, D.COL.accent);
    D.meter(ctx, 220, 14, 220, "protein so far", protein.slice(0, shown) || "—", D.COL.good);
    D.meter(ctx, 450, 14, 190, "starts with", template.startsWith("TAC") ? "AUG ✓ Met" : "not a start", template.startsWith("TAC") ? D.COL.good : D.COL.amber);
  };

  return (
    <>
      <SimCanvas width={900} height={420} draw={draw} label="DNA transcribed to mRNA and translated into a protein" />
      <Controls>
        <div className="ctl-row">
          <label>DNA template</label>
          <input
            className="prob-input"
            value={dna}
            maxLength={30}
            onChange={(e) => {
              setDna(e.target.value.toUpperCase());
              setStep(0);
            }}
            aria-label="DNA template strand"
          />
        </div>
        <Slider
          label="Read codons"
          min={0}
          max={Math.max(1, codons.length)}
          step={1}
          value={shown}
          onChange={setStep}
          fmt={(v) => `${v}`}
        />
        <div className="ctl-row">
          <label>Presets</label>
          <div className="seg">
            <button type="button" className="seg-btn" onClick={() => { setDna(DEFAULT_GENE); setStep(0); }}>
              Start codon
            </button>
            <button type="button" className="seg-btn" onClick={() => { setDna("TACAAACCCATT"); setStep(0); }}>
              Met-Phe-Gly-Stop
            </button>
          </div>
        </div>
      </Controls>
      <Readouts>
        <Readout label="mRNA" value={mrna || "—"} />
        <Readout label="Protein" value={protein || "—"} tone="good" />
        <Readout label="Codons" value={codons.length} />
        <Readout label="Reading frame" value="fixed by the start codon" tone="amber" />
      </Readouts>
    </>
  );
}

/* =====================================================================
 * Lab 2.4 — Mutations: change one base and watch what it does to the
 * protein. Sometimes nothing at all; sometimes everything after it.
 * ===================================================================== */

type MutKind = "none" | "substitution" | "insertion" | "deletion";

export function MutationLab() {
  /*
   * mRNA: AUG UAC UGG AAA GGC CUC → protein MYWKGL, with NO internal stop.
   * That is deliberate: every advertised outcome is reachable by a single
   * edit — silent (e.g. position 5 G→A keeps Tyr), missense, and nonsense
   * (position 5 G→T turns codon 2 into UAA, an early STOP). The previous
   * gene carried a stop at codon 4, which made nonsense unreachable and let
   * post-stop edits produce misleading verdicts.
   */
  const original = "TACATGACCTTTCCGGAG";
  const [kind, setKind] = useState<MutKind>("none");
  const [pos, setPos] = useState(4);
  const [newBase, setNewBase] = useState("G");

  const mutate = (): string => {
    const b = original.split("");
    const i = clamp(pos, 0, b.length - 1);
    if (kind === "substitution") b[i] = newBase;
    if (kind === "insertion") b.splice(i, 0, newBase);
    if (kind === "deletion") b.splice(i, 1);
    return b.join("");
  };

  const mutated = kind === "none" ? original : mutate();
  const before = translateRna(transcribe(original));
  const after = translateRna(transcribe(mutated));

  const effect =
    kind === "none"
      ? "none"
      : kind === "substitution"
        ? before.protein === after.protein
          ? "silent"
          : after.protein.length < before.protein.length
            ? "nonsense"
            : "missense"
        : "frameshift";

  const draw = (ctx: CanvasRenderingContext2D) => {
    const rows: Array<[string, string, string, number]> = [
      ["original", original, before.protein, 130],
      ["mutated", mutated, after.protein, 270],
    ];

    for (const [label, seq, prot, y] of rows) {
      D.label(ctx, label, 40, y - 34, { align: "left", size: 12, color: D.COL.muted });
      const step = 26;
      for (let i = 0; i < seq.length; i++) {
        const x = 60 + i * step;
        const changed = label === "mutated" && kind !== "none" && i >= pos;
        D.dot(ctx, x, y, 11, changed ? BASE_COLOR[seq[i]] : (BASE_COLOR[seq[i]] ?? D.COL.muted) + "99");
        D.label(ctx, seq[i], x, y + 1, { size: 11, bold: true, color: "#101825" });
        if (i % 3 === 0) {
          ctx.strokeStyle = "rgba(148,163,179,0.3)";
          ctx.lineWidth = 1;
          ctx.strokeRect(x - 14, y - 15, step * 3 - 4, 30);
        }
      }
      // resulting protein
      D.label(ctx, prot || "(none)", 60, y + 44, {
        align: "left",
        size: 15,
        mono: true,
        bold: true,
        color: label === "mutated" && prot !== before.protein ? D.COL.bad : D.COL.good,
      });
    }

    // mutation marker
    if (kind !== "none") {
      const x = 60 + pos * 26;
      D.wire(ctx, [[x, 96], [x, 300]], "rgba(242,109,109,0.55)", 2);
      D.label(ctx, translate(kind), x, 84, { color: D.COL.bad, size: 12, bold: true });
    }

    // verdict
    const verdicts: Record<string, [string, string]> = {
      none: ["no mutation", "the protein is unchanged"],
      silent: ["silent", "the codon changed but the amino acid did not — thank the wobble"],
      missense: ["missense", "one amino acid is swapped; the rest of the protein is intact"],
      nonsense: ["nonsense", "an early STOP — the protein is cut short and usually useless"],
      frameshift: ["frameshift", "every codon after the change is misread; almost always catastrophic"],
    };
    const [head, body] = verdicts[effect];
    D.panel(ctx, 60, 344, 780, 62, effect === "none" || effect === "silent" ? "rgba(71,194,107,0.10)" : "rgba(242,109,109,0.10)");
    D.label(ctx, translate(head), 450, 366, {
      size: 15,
      bold: true,
      color: effect === "none" || effect === "silent" ? D.COL.good : D.COL.bad,
    });
    D.label(ctx, body, 450, 390, { size: 12, color: D.COL.text });

    D.meter(ctx, 20, 14, 190, "Mutation type", translate(kind), kind === "none" ? D.COL.muted : D.COL.amber);
    D.meter(ctx, 220, 14, 190, "effect", translate(head), effect === "silent" || effect === "none" ? D.COL.good : D.COL.bad);
  };

  return (
    <>
      <SimCanvas width={900} height={420} draw={draw} label="A gene before and after a mutation, with the resulting proteins" />
      <Controls>
        <Segmented
          label="Mutation type"
          value={kind}
          onChange={setKind}
          options={[
            { value: "none", label: "none" },
            { value: "substitution", label: "substitution" },
            { value: "insertion", label: "insertion" },
            { value: "deletion", label: "deletion" },
          ]}
        />
        <Slider label="Position" min={3} max={original.length - 1} step={1} value={pos} onChange={setPos} fmt={(v) => `${v}`} />
        <Segmented
          label="New base"
          value={newBase}
          onChange={setNewBase}
          options={["A", "T", "C", "G"].map((b) => ({ value: b, label: b }))}
        />
      </Controls>
      <Readouts>
        <Readout label="Original protein" value={before.protein || "—"} />
        <Readout label="Mutated protein" value={after.protein || "—"} tone={after.protein === before.protein ? "good" : "warn"} />
        <Readout label="Effect" value={effect} tone={effect === "silent" || effect === "none" ? "good" : "warn"} />
      </Readouts>
    </>
  );
}
