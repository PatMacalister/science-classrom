"use client";

import { useCallback, useState } from "react";
import { PART_ENTRIES, PART_BY_ID, kindVar, type PartEntry } from "@/servo/lib/parts";
import { useLang, useT } from "@/servo/lib/i18n";
import { useProgress } from "@/shared/progress";
import { HookText, KIND_KEYS } from "./PartsTable";

/**
 * The parts-bench drill, Servo's counterpart to Catalyst's element drill,
 * Helix's codon drill and Vector's units drill. Parts and their roles in both
 * directions; the hook is never the prompt (most hooks name their own part) —
 * it appears as the explanation on reveal, alongside the part's role.
 *
 * Missed cards are written into the same Leitner map the quiz deck uses,
 * under `pb:<id>` keys, so they resurface in /servo/review on the normal
 * spaced-repetition schedule and ride along with sync.
 */

export type DrillScope = "sensors" | "actuators" | "all";

export const PB_PREFIX = "pb:";

export function scopePool(scope: DrillScope): PartEntry[] {
  if (scope === "sensors") return PART_ENTRIES.filter((e) => e.kind === "sensor");
  if (scope === "actuators") return PART_ENTRIES.filter((e) => e.kind === "actuator" || e.kind === "driver");
  return PART_ENTRIES;
}

export interface DrillCard {
  /** Entry id. */
  target: string;
  /** part2role asks "what does this do?"; role2part asks "which part does X?". */
  dir: "part2role" | "role2part";
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
 * Build one card. Distractors prefer entries of the same kind — sensor
 * against sensor is the confusion the bench actually produces (ultrasonic vs
 * time-of-flight, accelerometer vs gyroscope). Ids are unique, so unlike
 * Vector's symbol drill no option de-duplication is needed.
 * Impure by design — call it from an event handler, never during render.
 */
export function makeCard(pool: PartEntry[], entry: PartEntry): DrillCard {
  const dir: DrillCard["dir"] = Math.random() < 0.5 ? "part2role" : "role2part";
  const others = pool.filter((o) => o.id !== entry.id);
  const near = others.filter((o) => o.kind === entry.kind);
  const far = others.filter((o) => o.kind !== entry.kind);
  const distractors = [...pick(near, 3), ...pick(far, 3)].slice(0, 3);
  const options = [entry, ...distractors].map((o) => o.id);
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return { target: entry.id, dir, options };
}

export default function PartsDrill() {
  const t = useT();
  const { lang } = useLang();
  const progress = useProgress();
  const [scope, setScope] = useState<DrillScope>("sensors");
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

  const nameOf = (e: PartEntry) => (lang === "de" ? e.nameDe : e.name);
  const roleOf = (e: PartEntry) => (lang === "de" ? e.roleDe : e.role);
  const answer = card ? PART_BY_ID[card.target] : null;
  const revealed = chosen !== null;
  const correct = !!card && chosen === card.target;

  const choose = (id: string) => {
    if (revealed || !card) return;
    setChosen(id);
    const ok = id === card.target;
    progress.gradeReview(`${PB_PREFIX}${card.target}`, ok);
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), wrong: s.wrong + (ok ? 0 : 1) }));
  };

  const total = score.right + score.wrong;

  return (
    <section className="drill">
      <div className="drill-bar">
        <div className="seg">
          {(["sensors", "actuators", "all"] as DrillScope[]).map((s) => (
            <button
              key={s}
              type="button"
              className={`seg-btn${scope === s ? " active" : ""}`}
              onClick={() => pickScope(s)}
            >
              {t(s === "sensors" ? "drillSensors" : s === "actuators" ? "drillActuators" : "drillEverything")}
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
          {card.dir === "part2role"
            ? `${t("drillWhichRole")}  ·  ${t(KIND_KEYS[answer.kind])}`
            : t("drillWhichPart", { role: roleOf(answer) })}
        </p>
        {card.dir === "part2role" ? (
          <div className="drill-prompt" style={{ "--cat": kindVar(answer.kind) } as React.CSSProperties}>
            {answer.glyph} {nameOf(answer)}
          </div>
        ) : null}

        <div className="drill-options">
          {card.options.map((id) => {
            const e = PART_BY_ID[id];
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
                {card.dir === "part2role" ? roleOf(e) : `${e.glyph} ${nameOf(e)}`}
              </button>
            );
          })}
        </div>

        {revealed ? (
          <div className="drill-reveal">
            <p className="drill-verdict">
              {correct
                ? t("drillRight")
                : t("drillWrong", { answer: card.dir === "part2role" ? roleOf(answer) : nameOf(answer) })}
            </p>
            <p className="drill-q">
              {answer.glyph} {nameOf(answer)} · {roleOf(answer)}
            </p>
            <div className="drill-esel">
              <span className="esel-tag">🔩 {lang === "de" ? "Eselsbrücke" : "Memory hook"}</span>
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
