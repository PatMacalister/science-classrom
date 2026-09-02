"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LESSONS, getLesson, lessonNumber } from "@/helix/lib/curriculum/registry";
import { localizeLesson } from "@/helix/lib/curriculum/localize";
import { useLang, useT } from "@/helix/lib/i18n";
import { useProgress } from "@/shared/progress";
import { AMINO_ACIDS, AMINO_BY_CODE, CODON_TABLE } from "@/helix/lib/codons";
import { HookText } from "@/helix/components/CodonTable";
import {
  AA_PREFIX,
  CODON_PREFIX,
  makeCodeCard,
  makeCodonCard,
  type DrillCard,
} from "@/helix/components/CodonDrill";

/**
 * Two kinds of card share one deck and one Leitner schedule: quiz questions
 * (keyed "slug:questionIndex") and genetic-code facts from the /codons drill
 * (keyed "aa:<code1>" / "cd:<codon>").
 */
interface Card {
  key: string;
  kind: "quiz" | "code";
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
      if (key.startsWith(AA_PREFIX)) {
        const aa = AMINO_BY_CODE[key.slice(AA_PREFIX.length)];
        if (!aa) continue; // stale key from an older data set
        cards.push({ key, kind: "code", slug: aa.code1, qi: 0, drill: makeCodeCard(AMINO_ACIDS, aa) });
      } else if (key.startsWith(CODON_PREFIX)) {
        const codon = key.slice(CODON_PREFIX.length);
        if (!CODON_TABLE[codon]) continue;
        cards.push({ key, kind: "code", slug: codon, qi: 0, drill: makeCodonCard(codon) });
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
  const isCode = card?.kind === "code";
  const lessonRaw = card && !isCode ? getLesson(card.slug) : undefined;
  const lesson = lessonRaw ? localizeLesson(lessonRaw, lang) : undefined;
  const question = lesson?.quiz?.[card.qi];
  const nameOf = (aa: { name: string; nameDe: string }) => (lang === "de" ? aa.nameDe : aa.name);

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

  const usable = card && (isCode ? !!card.drill : !!question && !!lesson);
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
          <Link className="btn" href="/helix">
            {t("reviewBackToCourse")}
          </Link>
        </p>
      </div>
    );
  }

  /* ---- genetic-code card: the drill question, on the review schedule ---- */
  if (isCode) {
    const drill = card.drill!;
    const answerCode = drill.kind === "codon" ? CODON_TABLE[drill.target] : drill.target;
    const answer = AMINO_BY_CODE[answerCode];
    const answerIdx = drill.options.indexOf(answerCode);
    const onChooseCode = (ci: number) => {
      if (revealed) return;
      setChosen(ci);
      setRevealed(true);
      grade(ci === answerIdx);
    };
    return (
      <div>
        <nav className="crumbs">
          <Link href="/helix">{t("allLessons")}</Link>
          <span className="chip">{t("reviewChip")}</span>
        </nav>
        <h1>{t("reviewTitle")}</h1>
        <p className="review-progress">
          {t("reviewCard", { i: pos + 1, n: deck.length })}{" "}
          <Link href="/helix/codons">{t("codonsChip")}</Link>
        </p>

        <div className={`q-block${revealed ? (chosen === answerIdx ? " correct" : " wrong") : ""}`}>
          <h4>
            {drill.dir === "code2name"
              ? `${t("drillWhichAmino")}  —  ${drill.target}`
              : drill.dir === "codon2name"
                ? `${t("drillWhichCodon")}  —  ${drill.target}`
                : t("drillWhichCode", { name: nameOf(answer) })}
          </h4>
          {drill.options.map((code, ci) => {
            const opt = AMINO_BY_CODE[code];
            return (
              <label key={code} className="q-choice">
                <input
                  type="radio"
                  name={`review-${card.key}`}
                  checked={chosen === ci}
                  disabled={revealed}
                  onChange={() => onChooseCode(ci)}
                />
                <span>
                  {drill.dir === "name2code" ? code : nameOf(opt)}
                  {revealed && ci === answerIdx ? "  ✓" : ""}
                </span>
              </label>
            );
          })}
          {revealed ? (
            <div className="q-explain">
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
        <Link href="/helix">{t("allLessons")}</Link>
        <span className="chip">{t("reviewChip")}</span>
      </nav>
      <h1>{t("reviewTitle")}</h1>
      <p className="review-progress">
        {t("reviewCard", { i: pos + 1, n: deck.length })}{" "}
        <Link href={`/helix/lesson/${lesson!.slug}`}>
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
