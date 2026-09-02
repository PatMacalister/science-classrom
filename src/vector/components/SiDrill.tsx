"use client";

import { useCallback, useState } from "react";
import { SI_ENTRIES, SI_BY_ID, kindVar, type SiEntry } from "@/vector/lib/si";
import { useLang, useT } from "@/vector/lib/i18n";
import { useProgress } from "@/shared/progress";
import { HookText, KIND_KEYS } from "./SiTable";

/**
 * The units-and-constants drill, Vector's counterpart to Catalyst's element
 * drill and Helix's codon drill. Symbols and names in both directions; the
 * hook is never the prompt (most hooks spell their own symbol) — it appears
 * as the explanation on reveal, alongside what the entry measures.
 *
 * Missed cards are written into the same Leitner map the quiz deck uses,
 * under `si:<id>` keys (ids, not symbols — m is both metre and milli), so
 * they resurface in /vector/review on the normal spaced-repetition schedule
 * and ride along with sync.
 */

export type DrillScope = "prefixes" | "units" | "all";

export const SI_PREFIX = "si:";

export function scopePool(scope: DrillScope): SiEntry[] {
  if (scope === "prefixes") return SI_ENTRIES.filter((e) => e.kind === "prefix");
  if (scope === "units") return SI_ENTRIES.filter((e) => e.kind === "base" || e.kind === "derived");
  return SI_ENTRIES;
}

export interface DrillCard {
  /** Entry id — unique even where symbols collide (m, G, c…). */
  target: string;
  /** sym2name asks "what is K?"; name2sym asks "symbol for kelvin?". */
  dir: "sym2name" | "name2sym";
  /** Option entry ids, shuffled; the answer is among them. */
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

/**
 * Build one card. Distractors prefer entries of the same kind — prefix
 * against prefix is the confusion the ladder actually produces.
 * Impure by design — call it from an event handler, never during render.
 */
export function makeCard(pool: SiEntry[], entry: SiEntry): DrillCard {
  const others = pool.filter((o) => o.id !== entry.id);
  const near = others.filter((o) => o.kind === entry.kind);
  const far = others.filter((o) => o.kind !== entry.kind);
  const distractors = [...pick(near, 2), ...pick(far, 3)].slice(0, 3);
  const options = [entry, ...distractors].map((o) => o.id);
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return { target: entry.id, dir: Math.random() < 0.5 ? "sym2name" : "name2sym", options };
}

export default function SiDrill() {
  const t = useT();
  const { lang } = useLang();
  const progress = useProgress();
  const [scope, setScope] = useState<DrillScope>("prefixes");
  const [card, setCard] = useState<DrillCard | null>(null);
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore] = useState({ right: 0, wrong: 0 });

  /*
   * Dealing is impure (Math.random), so it only ever runs from an event
   * handler — never during render and never from an effect. That is also why
   * the drill opens on a start screen instead of auto-dealing.
   */
  const deal = useCallback(
    (forScope: DrillScope = scope) => {
      const pool = scopePool(forScope);
      setCard(makeCard(pool, pool[Math.floor(Math.random() * pool.length)]));
      setChosen(null);
    },
    [scope]
  );

  const pickScope = (s: DrillScope) => {
    setScope(s);
    setScore({ right: 0, wrong: 0 });
    if (card) deal(s);
  };

  const nameOf = (e: SiEntry) => (lang === "de" ? e.nameDe : e.name);
  const answer = card ? SI_BY_ID[card.target] : null;
  const revealed = chosen !== null;
  const correct = !!card && chosen === card.target;

  const choose = (id: string) => {
    if (revealed || !card) return;
    setChosen(id);
    const ok = id === card.target;
    progress.gradeReview(`${SI_PREFIX}${card.target}`, ok);
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), wrong: s.wrong + (ok ? 0 : 1) }));
  };

  const total = score.right + score.wrong;

  return (
    <section className="drill">
      <div className="drill-bar">
        <div className="seg">
          {(["prefixes", "units", "all"] as DrillScope[]).map((s) => (
            <button
              key={s}
              type="button"
              className={`seg-btn${scope === s ? " active" : ""}`}
              onClick={() => pickScope(s)}
            >
              {t(s === "prefixes" ? "drillPrefixes" : s === "units" ? "drillUnits" : "drillEverything")}
            </button>
          ))}
        </div>
        <span className="drill-count">{t("drillPoolSize", { n: scopePool(scope).length })}</span>
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
            ? `${t("drillWhichName")}  ·  ${t(KIND_KEYS[answer.kind])}`
            : t("drillWhichSymbol", { name: nameOf(answer) })}
        </p>
        {card.dir === "sym2name" ? (
          <div className="drill-prompt" style={{ "--cat": kindVar(answer.kind) } as React.CSSProperties}>
            {answer.symbol}
          </div>
        ) : null}

        <div className="drill-options">
          {card.options.map((id) => {
            const e = SI_BY_ID[id];
            const cls = revealed
              ? id === card.target
                ? " right"
                : id === chosen
                  ? " picked-wrong"
                  : " dim"
              : "";
            return (
              <button
                key={id}
                type="button"
                className={`drill-opt${cls}`}
                onClick={() => choose(id)}
                disabled={revealed}
              >
                {card.dir === "sym2name" ? nameOf(e) : e.symbol}
              </button>
            );
          })}
        </div>

        {revealed ? (
          <div className="drill-reveal">
            <p className="drill-verdict">
              {correct
                ? t("drillRight")
                : t("drillWrong", { answer: card.dir === "sym2name" ? nameOf(answer) : answer.symbol })}
            </p>
            <p className="drill-q">
              {answer.symbol} · {lang === "de" ? answer.meaningDe : answer.meaning}
            </p>
            <div className="drill-esel">
              <span className="esel-tag">📏 {lang === "de" ? "Eselsbrücke" : "Memory hook"}</span>
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
