"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LESSONS, getLesson, lessonNumber } from "@/vector/lib/curriculum/registry";
import { localizeLesson } from "@/vector/lib/curriculum/localize";
import { useLang, useT } from "@/vector/lib/i18n";
import { useProgress } from "@/shared/progress";
import { SI_BY_ID, kindVar } from "@/vector/lib/si";
import { HookText, KIND_KEYS } from "@/vector/components/SiTable";
import { SI_PREFIX, makeCard, scopePool, type DrillCard } from "@/vector/components/SiDrill";

/**
 * Two kinds of card share one deck and one Leitner schedule: quiz questions
 * (keyed "slug:questionIndex") and units-and-constants facts from the /units
 * drill (keyed "si:<id>").
 */
interface Card {
  key: string;
  kind: "quiz" | "si";
  /** quiz cards */
  slug: string;
  qi: number;
  /** drill cards — options are regenerated per visit, so it is never rote */
  drill?: DrillCard;
}

/**
 * The review deck: every quiz question you have ever missed comes back on a
 * Leitner schedule (10 min → 1 day → 3 days → graduated) until you have
 * beaten it three times.
 */
export default function ReviewPage() {
  const progress = useProgress();
  const { lang } = useLang();
  const t = useT();
  const [pos, setPos] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [sessionResults, setSessionResults] = useState({ right: 0, wrong: 0 });

  // deck computed once per visit: due cards + freshly-missed ones
  const deck = useMemo<Card[]>(() => {
    if (!progress.ready) return [];
    // eslint-disable-next-line react-hooks/purity -- deck is deliberately frozen per visit at the current time
    const now = Date.now();
    const cards: Card[] = [];
    const seen = new Set<string>();
    for (const [key, item] of Object.entries(progress.state.review)) {
      if (item.box >= 3 || item.due > now) continue;
      if (key.startsWith(SI_PREFIX)) {
        const entry = SI_BY_ID[key.slice(SI_PREFIX.length)];
        if (!entry) continue; // stale key from an older data set
        cards.push({ key, kind: "si", slug: entry.id, qi: 0, drill: makeCard(scopePool("all"), entry) });
      } else {
        cards.push({
          key,
          kind: "quiz",
          slug: key.slice(0, key.lastIndexOf(":")),
          qi: Number(key.slice(key.lastIndexOf(":") + 1)),
        });
      }
      seen.add(key);
    }
    for (const lesson of LESSONS) {
      const rec = progress.state.quiz[lesson.slug];
      for (const qi of rec?.missed ?? []) {
        const key = `${lesson.slug}:${qi}`;
        if (!seen.has(key) && !progress.state.review[key]) {
          cards.push({ key, kind: "quiz", slug: lesson.slug, qi });
          seen.add(key);
        }
      }
    }
    // Fisher–Yates: a sort() comparator that ignores its arguments is an
    // inconsistent comparator, so it shuffles with a pronounced bias.
    for (let i = cards.length - 1; i > 0; i--) {
      // eslint-disable-next-line react-hooks/purity -- one-time shuffle per visit is the desired behaviour
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress.ready]);

  if (!progress.ready) return null;

  const card = deck[pos];
  const isSi = card?.kind === "si";
  const lessonRaw = card && !isSi ? getLesson(card.slug) : undefined;
  const lesson = lessonRaw ? localizeLesson(lessonRaw, lang) : undefined;
  const question = lesson?.quiz?.[card.qi];

  const grade = (correct: boolean) => {
    if (!card) return;
    progress.gradeReview(card.key, correct);
    setSessionResults((r) => ({
      right: r.right + (correct ? 1 : 0),
      wrong: r.wrong + (correct ? 0 : 1),
    }));
  };

  const next = () => {
    setChosen(null);
    setRevealed(false);
    setPos((p) => p + 1);
  };

  const usable = card && (isSi ? !!card.drill : !!question && !!lesson);
  if (deck.length === 0 || !usable) {
    const done = deck.length > 0 && pos >= deck.length;
    return (
      <div className="review-empty">
        <h1>{done ? t("reviewClearedHead") : t("reviewEmptyHead")}</h1>
        <p>
          {done
            ? t("reviewClearedBody", { right: sessionResults.right, wrong: sessionResults.wrong })
            : t("reviewEmptyBody")}
        </p>
        <p>
          <Link className="btn" href="/vector">
            {t("reviewBackToCourse")}
          </Link>
        </p>
      </div>
    );
  }

  /* ---- units-and-constants card: the drill question, on the review schedule ---- */
  if (isSi) {
    const drill = card.drill!;
    const answer = SI_BY_ID[drill.target];
    const nameOf = (id: string) => (lang === "de" ? SI_BY_ID[id].nameDe : SI_BY_ID[id].name);
    const answerIdx = drill.options.indexOf(drill.target);
    const onChooseSi = (ci: number) => {
      if (revealed) return;
      setChosen(ci);
      setRevealed(true);
      grade(ci === answerIdx);
    };
    return (
      <div>
        <nav className="crumbs">
          <Link href="/vector">{t("allLessons")}</Link>
          <span className="chip">{t("reviewChip")}</span>
        </nav>
        <h1>{t("reviewTitle")}</h1>
        <p className="review-progress">
          {t("reviewCard", { i: pos + 1, n: deck.length })}{" "}
          <Link href="/vector/units">{t("siChip")}</Link>
        </p>

        <div className={`q-block${revealed ? (chosen === answerIdx ? " correct" : " wrong") : ""}`}>
          <h4>
            {drill.dir === "sym2name"
              ? `${t("drillWhichName")}  —  ${answer.symbol}  ·  ${t(KIND_KEYS[answer.kind])}`
              : t("drillWhichSymbol", { name: lang === "de" ? answer.nameDe : answer.name })}
          </h4>
          {drill.options.map((id, ci) => (
            <label key={id} className="q-choice">
              <input
                type="radio"
                name={`review-${card.key}`}
                checked={chosen === ci}
                disabled={revealed}
                onChange={() => onChooseSi(ci)}
              />
              <span>
                {drill.dir === "sym2name" ? nameOf(id) : SI_BY_ID[id].symbol}
                {revealed && ci === answerIdx ? "  ✓" : ""}
              </span>
            </label>
          ))}
          {revealed ? (
            <div className="q-explain" style={{ "--cat": kindVar(answer.kind) } as React.CSSProperties}>
              {chosen === answerIdx ? t("reviewBeaten") : t("reviewMissed")}
              <HookText text={lang === "de" ? answer.esel : answer.hook} />
            </div>
          ) : null}
        </div>

        {revealed ? (
          <button type="button" className="btn" onClick={next}>
            {pos + 1 < deck.length ? t("reviewNext") : t("reviewFinish")}
          </button>
        ) : null}
      </div>
    );
  }

  const onChoose = (ci: number) => {
    if (revealed) return;
    setChosen(ci);
    setRevealed(true);
    grade(ci === question!.answer);
  };

  return (
    <div>
      <nav className="crumbs">
        <Link href="/vector">{t("allLessons")}</Link>
        <span className="chip">{t("reviewChip")}</span>
      </nav>
      <h1>{t("reviewTitle")}</h1>
      <p className="review-progress">
        {t("reviewCard", { i: pos + 1, n: deck.length })}{" "}
        <Link href={`/vector/lesson/${lesson!.slug}`}>
          {lessonNumber(lessonRaw!)} {lesson!.title}
        </Link>
      </p>

      <div className={`q-block${revealed ? (chosen === question!.answer ? " correct" : " wrong") : ""}`}>
        <h4>{question!.q}</h4>
        {question!.choices.map((choice, ci) => (
          <label key={ci} className="q-choice">
            <input
              type="radio"
              name={`review-${card.key}`}
              checked={chosen === ci}
              disabled={revealed}
              onChange={() => onChoose(ci)}
            />
            <span>
              {choice}
              {revealed && ci === question!.answer ? "  ✓" : ""}
            </span>
          </label>
        ))}
        {revealed ? (
          <div className="q-explain">
            {chosen === question!.answer ? t("reviewBeaten") : t("reviewMissed")}
            {question!.explain}
          </div>
        ) : null}
      </div>

      {revealed ? (
        <button type="button" className="btn" onClick={next}>
          {pos + 1 < deck.length ? t("reviewNext") : t("reviewFinish")}
        </button>
      ) : null}
    </div>
  );
}
