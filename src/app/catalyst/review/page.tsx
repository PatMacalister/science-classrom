"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LESSONS, getLesson, lessonNumber } from "@/catalyst/lib/curriculum/registry";
import { localizeLesson } from "@/catalyst/lib/curriculum/localize";
import { useLang, useT } from "@/catalyst/lib/i18n";
import { useProgress } from "@/shared/progress";
import { ELEMENTS } from "@/catalyst/lib/elements";
import { EselText } from "@/catalyst/components/PeriodicTable";
import { makeCard, REVIEW_PREFIX, type DrillCard } from "@/catalyst/components/ElementDrill";

/**
 * Two kinds of card share one deck and one Leitner schedule: quiz questions
 * (keyed "slug:questionIndex") and element symbols from the /elements drill
 * (keyed "el:<symbol>").
 */
interface Card {
  key: string;
  kind: "quiz" | "element";
  /** quiz cards */
  slug: string;
  qi: number;
  /** element cards — options are regenerated per visit, so it is never rote */
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
      if (key.startsWith(REVIEW_PREFIX)) {
        const symbol = key.slice(REVIEW_PREFIX.length);
        const el = ELEMENTS.find((e) => e.symbol === symbol);
        if (!el) continue; // stale key from an older data set
        cards.push({ key, kind: "element", slug: symbol, qi: 0, drill: makeCard(ELEMENTS, el) });
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
  const isElement = card?.kind === "element";
  const lessonRaw = card && !isElement ? getLesson(card.slug) : undefined;
  const lesson = lessonRaw ? localizeLesson(lessonRaw, lang) : undefined;
  const question = lesson?.quiz?.[card.qi];
  const element = isElement ? ELEMENTS.find((e) => e.symbol === card.slug) : undefined;
  const nameOf = (e: { name: string; nameDe: string }) => (lang === "de" ? e.nameDe : e.name);

  const grade = (correct: boolean) => {
    if (!card) return;
    progress.gradeReview(card.key, correct);
    setSessionResults((r) => ({ right: r.right + (correct ? 1 : 0), wrong: r.wrong + (correct ? 0 : 1) }));
  };

  const next = () => {
    setChosen(null);
    setRevealed(false);
    setPos((p) => p + 1);
  };

  const usable = card && (isElement ? !!element && !!card.drill : !!question && !!lesson);
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
          <Link className="btn" href="/catalyst">
            {t("reviewBackToCourse")}
          </Link>
        </p>
      </div>
    );
  }

  /* ---- element card: the drill question, on the review schedule ---- */
  if (isElement) {
    const drill = card.drill!;
    const el = element!;
    const answerIdx = drill.options.indexOf(drill.symbol);
    const onChooseEl = (ci: number) => {
      if (revealed) return;
      setChosen(ci);
      setRevealed(true);
      grade(ci === answerIdx);
    };
    return (
      <div>
        <nav className="crumbs">
          <Link href="/catalyst">{t("allLessons")}</Link>
          <span className="chip">{t("reviewChip")}</span>
        </nav>
        <h1>{t("reviewTitle")}</h1>
        <p className="review-progress">
          {t("reviewCard", { i: pos + 1, n: deck.length })}{" "}
          <Link href="/catalyst/elements">{t("elementsChip")}</Link>
        </p>

        <div className={`q-block${revealed ? (chosen === answerIdx ? " correct" : " wrong") : ""}`}>
          <h4>
            {drill.dir === "sym2name"
              ? `${t("drillWhichElement")}  —  ${drill.symbol}`
              : t("drillWhichSymbol", { name: nameOf(el) })}
          </h4>
          {drill.options.map((sym, ci) => {
            const opt = ELEMENTS.find((e) => e.symbol === sym)!;
            return (
              <label key={sym} className="q-choice">
                <input
                  type="radio"
                  name={`review-${card.key}`}
                  checked={chosen === ci}
                  disabled={revealed}
                  onChange={() => onChooseEl(ci)}
                />
                <span>
                  {drill.dir === "sym2name" ? nameOf(opt) : sym}
                  {revealed && ci === answerIdx ? "  ✓" : ""}
                </span>
              </label>
            );
          })}
          {revealed ? (
            <div className="q-explain">
              {chosen === answerIdx ? t("reviewBeaten") : t("reviewMissed")}
              <EselText text={lang === "de" ? el.esel : el.hook} />
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
        <Link href="/catalyst">{t("allLessons")}</Link>
        <span className="chip">{t("reviewChip")}</span>
      </nav>
      <h1>{t("reviewTitle")}</h1>
      <p className="review-progress">
        {t("reviewCard", { i: pos + 1, n: deck.length })}{" "}
        <Link href={`/catalyst/lesson/${lesson!.slug}`}>
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
