"use client";

import { useCallback, useState } from "react";
import {
  AMINO_ACIDS,
  AMINO_BY_CODE,
  BASES,
  CODON_TABLE,
  classVar,
  synonymsInFamily,
  type AminoAcid,
} from "@/helix/lib/codons";
import { useLang, useT } from "@/helix/lib/i18n";
import { useProgress } from "@/shared/progress";
import { HookText } from "./CodonTable";

/**
 * The genetic-code drill, Helix's counterpart to Catalyst's element drill.
 *
 * Two kinds of card share the deck. Code cards work the one-letter mapping in
 * both directions (W → ? and Tryptophan → ?) — the arbitrary letters are the
 * pain point the hooks exist for, so the hook is never the prompt, only the
 * reveal. Codon cards read a triplet straight off the table (GCU → ?), with
 * distractors drawn from single-base neighbours: the wrong answers ARE the
 * point mutations, so a near-miss here is the same near-miss the mutation
 * lesson is about.
 *
 * Missed cards are written into the same Leitner map the quiz deck uses,
 * under `aa:<code1>` / `cd:<codon>` keys, so they resurface in /helix/review
 * on the normal spaced-repetition schedule and ride along with sync.
 */

export type DrillScope = "tricky" | "codes" | "codons";

export const AA_PREFIX = "aa:";
export const CODON_PREFIX = "cd:";

/**
 * Amino acids whose one-letter code is not simply the start of the name —
 * W/Tryptophan, K/Lysine, Q/Glutamine. Computed per language because the
 * tricky set can genuinely differ between the English and German names.
 */
export function trickyAminoAcids(lang: "en" | "de"): AminoAcid[] {
  return AMINO_ACIDS.filter((a) => {
    const name = lang === "de" ? a.nameDe : a.name;
    return !name.toLowerCase().startsWith(a.code1.toLowerCase());
  });
}

export function scopePool(scope: DrillScope, lang: "en" | "de"): number {
  if (scope === "tricky") return trickyAminoAcids(lang).length;
  if (scope === "codes") return AMINO_ACIDS.length;
  return Object.keys(CODON_TABLE).length;
}

export interface DrillCard {
  kind: "code" | "codon";
  /** One-letter code for code cards; the mRNA triplet for codon cards. */
  target: string;
  /** code2name asks "which amino acid is W?"; name2code the reverse. */
  dir: "code2name" | "name2code" | "codon2name";
  /** Option one-letter codes, shuffled; the answer is among them. */
  options: string[];
}

const pick = <T,>(from: T[], n: number) => {
  const copy = [...from];
  const out: T[] = [];
  while (out.length < n && copy.length) {
    out.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
  }
  return out;
};

const shuffle = (options: string[]) => {
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
};

/**
 * Build one code card. Distractors prefer amino acids of the same class,
 * because polar-vs-polar is the confusion the drill is for.
 * Impure by design — call it from an event handler, never during render.
 */
export function makeCodeCard(pool: AminoAcid[], aa: AminoAcid): DrillCard {
  const others = pool.filter((o) => o.code1 !== aa.code1);
  const near = others.filter((o) => o.cls === aa.cls);
  const far = others.filter((o) => o.cls !== aa.cls);
  const distractors = [...pick(near, 2), ...pick(far, 3)].slice(0, 3);
  const options = shuffle([aa, ...distractors].map((o) => o.code1));
  return {
    kind: "code",
    target: aa.code1,
    dir: Math.random() < 0.5 ? "code2name" : "name2code",
    options,
  };
}

/**
 * Build one codon card. Distractors prefer the outcomes of single-base
 * neighbours — exactly the amino acids a point mutation could produce.
 */
export function makeCodonCard(codon: string): DrillCard {
  const answer = CODON_TABLE[codon];
  const neighbours = new Set<string>();
  for (let i = 0; i < 3; i++) {
    for (const b of BASES) {
      const aa = CODON_TABLE[codon.slice(0, i) + b + codon.slice(i + 1)];
      if (aa !== answer) neighbours.add(aa);
    }
  }
  const far = AMINO_ACIDS.map((a) => a.code1).filter((c) => c !== answer && !neighbours.has(c));
  const distractors = [...pick([...neighbours], 2), ...pick(far, 3)].slice(0, 3);
  const options = shuffle([answer, ...distractors]);
  return { kind: "codon", target: codon, dir: "codon2name", options };
}

export default function CodonDrill() {
  const t = useT();
  const { lang } = useLang();
  const progress = useProgress();
  const [scope, setScope] = useState<DrillScope>("tricky");
  const [card, setCard] = useState<DrillCard | null>(null);
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore] = useState({ right: 0, wrong: 0 });

  /*
   * Dealing is impure (Math.random), so it only ever runs from an event
   * handler — never during render and never from an effect. That is also why
   * the drill opens on a start screen instead of auto-dealing: you pick the
   * scope, then press start.
   */
  const deal = useCallback(
    (forScope: DrillScope = scope) => {
      if (forScope === "codons") {
        const codons = Object.keys(CODON_TABLE);
        setCard(makeCodonCard(codons[Math.floor(Math.random() * codons.length)]));
      } else {
        const pool = forScope === "tricky" ? trickyAminoAcids(lang) : AMINO_ACIDS;
        setCard(makeCodeCard(pool, pool[Math.floor(Math.random() * pool.length)]));
      }
      setChosen(null);
    },
    [scope, lang]
  );

  const pickScope = (s: DrillScope) => {
    setScope(s);
    setScore({ right: 0, wrong: 0 });
    if (card) deal(s);
  };

  const nameOf = (aa: AminoAcid) => (lang === "de" ? aa.nameDe : aa.name);
  const answerCode = card ? (card.kind === "codon" ? CODON_TABLE[card.target] : card.target) : null;
  const answer = answerCode ? AMINO_BY_CODE[answerCode] : null;
  const revealed = chosen !== null;
  const correct = !!answerCode && chosen === answerCode;

  const choose = (code: string) => {
    if (revealed || !card) return;
    setChosen(code);
    const ok = code === answerCode;
    const key = card.kind === "codon" ? `${CODON_PREFIX}${card.target}` : `${AA_PREFIX}${card.target}`;
    progress.gradeReview(key, ok);
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), wrong: s.wrong + (ok ? 0 : 1) }));
  };

  const total = score.right + score.wrong;

  return (
    <section className="drill">
      <div className="drill-bar">
        <div className="seg">
          {(["tricky", "codes", "codons"] as DrillScope[]).map((s) => (
            <button
              key={s}
              type="button"
              className={`seg-btn${scope === s ? " active" : ""}`}
              onClick={() => pickScope(s)}
            >
              {t(s === "tricky" ? "drillTricky" : s === "codes" ? "drillCodes" : "drillCodons")}
            </button>
          ))}
        </div>
        <span className="drill-count">{t("drillPoolSize", { n: scopePool(scope, lang) })}</span>
        <span className="drill-score" suppressHydrationWarning>
          {total > 0 ? `${score.right} / ${total}` : ""}
        </span>
      </div>

      {!card || !answer ? (
        <div className="drill-card">
          <p className="drill-q">{t("drillStartBody")}</p>
          <button type="button" className="btn" onClick={() => deal()}>
            {t("drillStart")}
          </button>
        </div>
      ) : (
      <div className={`drill-card${revealed ? (correct ? " correct" : " wrong") : ""}`}>
        <p className="drill-q">
          {card.dir === "code2name"
            ? t("drillWhichAmino")
            : card.dir === "codon2name"
              ? t("drillWhichCodon")
              : t("drillWhichCode", { name: nameOf(answer) })}
        </p>
        {card.dir !== "name2code" ? (
          <div className="drill-prompt" style={{ "--cat": classVar(answer.cls) } as React.CSSProperties}>
            {card.target}
          </div>
        ) : null}

        <div className="drill-options">
          {card.options.map((code) => {
            const aa = AMINO_BY_CODE[code];
            const cls = revealed
              ? code === answerCode
                ? " right"
                : code === chosen
                  ? " picked-wrong"
                  : " dim"
              : "";
            return (
              <button
                key={code}
                type="button"
                className={`drill-opt${cls}`}
                onClick={() => choose(code)}
                disabled={revealed}
              >
                {card.dir === "name2code" ? code : nameOf(aa)}
              </button>
            );
          })}
        </div>

        {revealed ? (
          <div className="drill-reveal">
            <p className="drill-verdict">
              {correct
                ? t("drillRight")
                : t("drillWrong", { answer: card.dir === "name2code" ? answer.code1 : nameOf(answer) })}
            </p>
            {card.kind === "codon" ? (
              <p className="drill-q">
                {card.target} → {answer.code3} · {t("codonWobbleN", { n: synonymsInFamily(card.target) })}
              </p>
            ) : null}
            <div className="drill-esel">
              <span className="esel-tag">🧬 {lang === "de" ? "Eselsbrücke" : "Memory hook"}</span>
              <p>
                <HookText text={lang === "de" ? answer.esel : answer.hook} />
              </p>
            </div>
            <button type="button" className="btn" onClick={() => deal()}>
              {t("drillNext")}
            </button>
          </div>
        ) : null}
      </div>
      )}

      <p className="drill-foot">{t("drillFoot")}</p>
    </section>
  );
}
