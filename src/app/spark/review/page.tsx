"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LESSONS, getLesson, lessonNumber } from "@/spark/lib/curriculum/registry";
import { localizeLesson } from "@/spark/lib/curriculum/localize";
import { useLang, useT } from "@/spark/lib/i18n";
import { useProgress } from "@/shared/progress";

interface Card {
  key: string; // "slug:qi"
  slug: string;
  qi: number;
}

/**
 * The review deck: every quiz question you have ever missed comes back on a
 * Leitner schedule (10 min → 1 day → 3 days → graduated) until you have
 * beaten it three times in a row.
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
      if (item.box < 3 && item.due <= now) {
        cards.push({ key, slug: key.slice(0, key.lastIndexOf(":")), qi: Number(key.slice(key.lastIndexOf(":") + 1)) });
        seen.add(key);
      }
    }
    for (const lesson of LESSONS) {
      const rec = progress.state.quiz[lesson.slug];
      for (const qi of rec?.missed ?? []) {
        const key = `${lesson.slug}:${qi}`;
        if (!seen.has(key) && !progress.state.review[key]) {
          cards.push({ key, slug: lesson.slug, qi });
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
  const lessonRaw = card ? getLesson(card.slug) : undefined;
  const lesson = lessonRaw ? localizeLesson(lessonRaw, lang) : undefined;
  const question = lesson?.quiz?.[card.qi];

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

  if (deck.length === 0 || !card || !question || !lesson) {
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
          <Link className="btn" href="/spark">
            {t("reviewBackToCourse")}
          </Link>
        </p>
      </div>
    );
  }

  const onChoose = (ci: number) => {
    if (revealed) return;
    setChosen(ci);
    setRevealed(true);
    grade(ci === question.answer);
  };

  return (
    <div>
      <nav className="crumbs">
        <Link href="/spark">{t("allLessons")}</Link>
        <span className="chip">{t("reviewChip")}</span>
      </nav>
      <h1>{t("reviewTitle")}</h1>
      <p className="review-progress">
        {t("reviewCard", { i: pos + 1, n: deck.length })}{" "}
        <Link href={`/spark/lesson/${lesson.slug}`}>
          {lessonNumber(lessonRaw!)} {lesson.title}
        </Link>
      </p>

      <div className={`q-block${revealed ? (chosen === question.answer ? " correct" : " wrong") : ""}`}>
        <h4>{question.q}</h4>
        {question.choices.map((choice, ci) => (
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
              {revealed && ci === question.answer ? "  ✓" : ""}
            </span>
          </label>
        ))}
        {revealed ? (
          <div className="q-explain">
            {chosen === question.answer ? t("reviewBeaten") : t("reviewMissed")}
            {question.explain}
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
