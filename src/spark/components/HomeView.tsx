"use client";

import Link from "next/link";
import { useState } from "react";
import type { Unit } from "@/spark/lib/curriculum/types";
import { LESSONS, UNITS, getUnit, lessonNumber, lessonsOfUnit } from "@/spark/lib/curriculum/registry";
import { TIERS, tierIdOf } from "@/spark/lib/curriculum/tiers";
import { localizeLesson, localizeUnit } from "@/spark/lib/curriculum/localize";
import { useLang, useT, type UIKey } from "@/spark/lib/i18n";
import { useProgress } from "@/shared/progress";
import SyncPanel from "./SyncPanel";

const TIER_KEYS: Record<string, { name: UIKey; tag: UIKey }> = {
  core: { name: "tierCore", tag: "tierCoreTag" },
  advanced: { name: "tierAdvanced", tag: "tierAdvancedTag" },
  expert: { name: "tierExpert", tag: "tierExpertTag" },
  master: { name: "tierMaster", tag: "tierMasterTag" },
  specialization: { name: "tierSpec", tag: "tierSpecTag" },
};

const BADGE_KEYS: Record<string, UIKey> = {
  advanced: "badgeAdvanced",
  expert: "badgeExpert",
  master: "badgeMaster",
  specialization: "badgeSpecialization",
};

export default function HomeView() {
  const progress = useProgress();
  const { lang } = useLang();
  const t = useT();
  const [confirmReset, setConfirmReset] = useState(false);
  const [toggles, setToggles] = useState<Record<string, boolean>>({});

  const firstIncomplete = LESSONS.find((l) => !progress.isComplete(l.slug));
  const doneCount = LESSONS.filter((l) => progress.isComplete(l.slug)).length;
  const buildCount = LESSONS.filter((l) => l.checklist).length;
  // eslint-disable-next-line react-hooks/purity -- due-date badge is intentionally clock-based
  const now = Date.now();
  const inDeck = new Set(
    Object.entries(progress.state.review)
      .filter(([, r]) => r.box < 3 && r.due <= now)
      .map(([k]) => k)
  );
  for (const l of LESSONS) {
    for (const qi of progress.state.quiz[l.slug]?.missed ?? []) {
      const key = `${l.slug}:${qi}`;
      if (!progress.state.review[key]) inDeck.add(key);
    }
  }
  const reviewDue = progress.ready ? inDeck.size : 0;
  const currentTier = firstIncomplete ? tierIdOf(getUnit(firstIncomplete.unitId)) : "specialization";
  const isOpen = (tierId: string) => toggles[tierId] ?? tierId === currentTier;

  const renderUnit = (unitRaw: Unit) => {
    const unit = localizeUnit(unitRaw, lang);
    const lessons = lessonsOfUnit(unit.id);
    const unitDone = lessons.filter((l) => progress.isComplete(l.slug)).length;
    return (
      <section className="unit-section" key={unit.id}>
        <div className="unit-head">
          <span className="unit-num">{t("unitWord")} {unit.num}</span>
          <h2>{unit.title.replace(/^Specialization: /, "")}</h2>
          {unit.track ? (
            <span className={`adv-badge ${unit.track}`}>{t(BADGE_KEYS[unit.track])}</span>
          ) : null}
          <span className="unit-progress" suppressHydrationWarning>
            {unitDone}/{lessons.length}
          </span>
          <p className="unit-blurb">{unit.blurb}</p>
        </div>
        <div className="lesson-grid">
          {lessons.map((lessonRaw) => {
            const lesson = localizeLesson(lessonRaw, lang);
            const done = progress.isComplete(lesson.slug);
            return (
              <Link
                key={lesson.slug}
                href={`/spark/lesson/${lesson.slug}`}
                className={`lesson-card${done ? " done" : ""}`}
              >
                <div className="card-top">
                  <span className="lesson-no">{t("lessonWord")} {lessonNumber(lessonRaw)}</span>
                  <span className={`status ${done ? "done" : "todo"}`} suppressHydrationWarning>
                    {done ? t("doneBadge") : "○"}
                  </span>
                </div>
                <h3>{lesson.title}</h3>
                <p>{lesson.subtitle}</p>
              </Link>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <>
      <section className="hero">
        <h1>
          {t("heroTitlePre")} <span className="zap">{t("heroTitleZap")}</span>
        </h1>
        <p className="lead">{t("heroLead")}</p>
        <div className="hero-stats">
          <span className="stat-chip">
            <b>{LESSONS.length}</b> {t("statLessons")}
          </span>
          <span className="stat-chip">
            <b>{UNITS.length}</b> {t("statUnits")}
          </span>
          <span className="stat-chip">
            <b>{buildCount}</b> {t("statBuilds")}
          </span>
          <span className="stat-chip" suppressHydrationWarning>
            <b>{progress.ready ? doneCount : "…"}</b> {t("statCompleted")}
          </span>
        </div>
        <Link className="btn" href={`/spark/lesson/${(firstIncomplete ?? LESSONS[0]).slug}`}>
          {doneCount === 0 ? t("startLearning") : t("continueLearning")}
        </Link>{" "}
        <Link className="btn secondary" href="/spark/review" suppressHydrationWarning>
          {t("reviewDeck")}{reviewDue > 0 ? ` ${t("reviewDue", { n: reviewDue })}` : ""}
        </Link>{" "}
        <Link className="btn secondary" href="/spark/exam">
          {t("examLink")}
        </Link>{" "}
        <Link className="btn secondary" href="/spark/stats">
          {t("statsLink")}
        </Link>{" "}
        <Link className="btn secondary" href="/spark/certificate">
          {t("certificate")}
        </Link>
      </section>

      {TIERS.map((tier) => {
        const units = UNITS.filter((u) => tierIdOf(u) === tier.id);
        if (units.length === 0) return null;
        const tierLessons = units.flatMap((u) => lessonsOfUnit(u.id));
        const tierDone = tierLessons.filter((l) => progress.isComplete(l.slug)).length;
        const open = isOpen(tier.id);
        const keys = TIER_KEYS[tier.id];
        return (
          <div className={`tier-block tier-${tier.id}`} key={tier.id}>
            <button
              type="button"
              className={`tier-head${open ? " open" : ""}`}
              onClick={() => setToggles((tg) => ({ ...tg, [tier.id]: !open }))}
            >
              <span className="chev">▶</span>
              <h2>{keys ? t(keys.name) : tier.name}</h2>
              <span className="tier-tagline">{keys ? t(keys.tag) : tier.tagline}</span>
              <span className="tier-bar">
                <span style={{ width: `${(tierDone / tierLessons.length) * 100}%` }} />
              </span>
              <span className="tier-progress" suppressHydrationWarning>
                {tierDone}/{tierLessons.length}
              </span>
            </button>
            {open ? (
              <div className="tier-body">
                {tier.id === "specialization" ? <p className="tier-intro">{t("specIntro")}</p> : null}
                {units.map(renderUnit)}
              </div>
            ) : null}
          </div>
        );
      })}

      <div className="capstone-banner">
        <h3>{t("capstoneHead")}</h3>
        <p>{t("capstoneBody")}</p>
      </div>

      <SyncPanel />

      <div className="home-footer">
        <p>{t("progressSaved")}</p>
        {confirmReset ? (
          <button
            type="button"
            className="btn danger small"
            onClick={() => {
              progress.reset();
              setConfirmReset(false);
            }}
          >
            {t("resetConfirm")}
          </button>
        ) : (
          <button type="button" className="btn secondary small" onClick={() => setConfirmReset(true)}>
            {t("resetProgress")}
          </button>
        )}
      </div>
    </>
  );
}
