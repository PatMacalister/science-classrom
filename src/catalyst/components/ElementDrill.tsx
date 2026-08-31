"use client";

import { useCallback, useState } from "react";
import { ELEMENTS, categoryVar, type ChemElement } from "@/catalyst/lib/elements";
import { useLang, useT } from "@/catalyst/lib/i18n";
import { useProgress } from "@/shared/progress";
import { EselText } from "./PeriodicTable";

/**
 * Symbol ↔ name drill over the 118 elements.
 *
 * The mnemonic is deliberately NOT the prompt — every hook spells its own
 * symbol, so asking "which element is this hook about?" gives the answer
 * away. Instead the drill asks the question that is actually hard (Fe → ?)
 * and reveals the hook as the explanation, which is where it earns its keep.
 *
 * Missed cards are written into the same Leitner map the quiz deck uses, under
 * `el:<symbol>` keys, so they resurface in /catalyst/review on the normal
 * spaced-repetition schedule and ride along with sync.
 */

export type DrillScope = "tricky" | "common" | "all";

export const REVIEW_PREFIX = "el:";

/**
 * Elements whose symbol is not simply the start of the name — Fe/Iron,
 * W/Tungsten, Na/Sodium. Computed per language, because the tricky set genuinely
 * differs: Na/Natrium is obvious to a German reader, Fe/Eisen is not.
 */
export function trickyElements(lang: "en" | "de"): ChemElement[] {
  return ELEMENTS.filter((el) => {
    const name = lang === "de" ? el.nameDe : el.name;
    return !name.toLowerCase().startsWith(el.symbol.toLowerCase());
  });
}

export function scopePool(scope: DrillScope, lang: "en" | "de"): ChemElement[] {
  if (scope === "tricky") return trickyElements(lang);
  if (scope === "common") return ELEMENTS.slice(0, 36);
  return ELEMENTS;
}

export interface DrillCard {
  symbol: string;
  /** sym2name asks "which element is Fe?"; name2sym asks "symbol for Iron?". */
  dir: "sym2name" | "name2sym";
  /** Option symbols, shuffled; the answer is among them. */
  options: string[];
}

/**
 * Build one card. Distractors prefer elements whose symbol starts with the same
 * letter (I / In / Ir), because near-misses are what the drill is for.
 * Impure by design — call it from an effect or an event handler, never render.
 */
export function makeCard(pool: ChemElement[], el: ChemElement): DrillCard {
  const others = pool.filter((o) => o.symbol !== el.symbol);
  const near = others.filter((o) => o.symbol[0] === el.symbol[0]);
  const far = others.filter((o) => o.symbol[0] !== el.symbol[0]);
  const pick = (from: ChemElement[], n: number) => {
    const copy = [...from];
    const out: ChemElement[] = [];
    while (out.length < n && copy.length) {
      out.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
    }
    return out;
  };
  const distractors = [...pick(near, 2), ...pick(far, 3)].slice(0, 3);
  const options = [el, ...distractors].map((o) => o.symbol);
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return { symbol: el.symbol, dir: Math.random() < 0.5 ? "sym2name" : "name2sym", options };
}

const bySymbol = (s: string) => ELEMENTS.find((e) => e.symbol === s)!;

export default function ElementDrill() {
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
      const pool = scopePool(forScope, lang);
      const el = pool[Math.floor(Math.random() * pool.length)];
      setCard(makeCard(pool, el));
      setChosen(null);
    },
    [scope, lang]
  );

  const pickScope = (s: DrillScope) => {
    setScope(s);
    setScore({ right: 0, wrong: 0 });
    if (card) deal(s);
  };

  const nameOf = (el: ChemElement) => (lang === "de" ? el.nameDe : el.name);
  const answer = card ? bySymbol(card.symbol) : null;
  const revealed = chosen !== null;
  const correct = !!card && chosen === card.symbol;

  const choose = (sym: string) => {
    if (revealed || !card) return;
    setChosen(sym);
    const ok = sym === card.symbol;
    progress.gradeReview(`${REVIEW_PREFIX}${card.symbol}`, ok);
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), wrong: s.wrong + (ok ? 0 : 1) }));
  };

  const total = score.right + score.wrong;
  const pool = scopePool(scope, lang);

  return (
    <section className="drill">
      <div className="drill-bar">
        <div className="seg">
          {(["tricky", "common", "all"] as DrillScope[]).map((s) => (
            <button
              key={s}
              type="button"
              className={`seg-btn${scope === s ? " active" : ""}`}
              onClick={() => pickScope(s)}
            >
              {t(s === "tricky" ? "drillTricky" : s === "common" ? "drillCommon" : "drillAll")}
            </button>
          ))}
        </div>
        <span className="drill-count">{t("drillPoolSize", { n: pool.length })}</span>
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
          {card.dir === "sym2name"
            ? t("drillWhichElement")
            : t("drillWhichSymbol", { name: nameOf(answer) })}
        </p>
        {card.dir === "sym2name" ? (
          <div className="drill-prompt" style={{ "--cat": categoryVar(answer.category) } as React.CSSProperties}>
            {card.symbol}
          </div>
        ) : null}

        <div className="drill-options">
          {card.options.map((sym) => {
            const el = bySymbol(sym);
            const isAnswer = sym === card.symbol;
            const cls = revealed
              ? isAnswer
                ? " right"
                : sym === chosen
                  ? " picked-wrong"
                  : " dim"
              : "";
            return (
              <button
                key={sym}
                type="button"
                className={`drill-opt${cls}`}
                onClick={() => choose(sym)}
                disabled={revealed}
              >
                {card.dir === "sym2name" ? nameOf(el) : sym}
              </button>
            );
          })}
        </div>

        {revealed ? (
          <div className="drill-reveal">
            <p className="drill-verdict">
              {correct ? t("drillRight") : t("drillWrong", { answer: card.dir === "sym2name" ? nameOf(answer) : answer.symbol })}
            </p>
            <div className="drill-esel">
              <span className="esel-tag">🫏 {lang === "de" ? "Eselsbrücke" : "Memory hook"}</span>
              <p>
                <EselText text={lang === "de" ? answer.esel : answer.hook} />
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
