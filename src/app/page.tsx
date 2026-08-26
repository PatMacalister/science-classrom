"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { COURSES } from "@/shared/courses";

/*
 * The landing page: one card per course from the manifest. Deliberately
 * self-contained (own tiny EN/DE dictionary, reads progress straight from
 * localStorage) so it never imports a course bundle — the curricula stay in
 * their own route segments' chunks.
 */

type Lang = "en" | "de";
const LANG_KEY = "science-lang";

const T = {
  en: {
    titlePre: "Learn science",
    titleZap: "by building",
    lead: "Hands-on courses that never stop at theory: every lesson pairs readable first-principles explanations with an interactive lab you can poke, drag and break — and each course ends with the real thing on your desk.",
    enter: "Enter course →",
    lessons: "lessons",
    units: "units",
    done: "completed",
    foot: "Progress is saved per course in this browser — with optional cross-device sync inside each course.",
  },
  de: {
    titlePre: "Wissenschaft lernen —",
    titleZap: "durch Bauen",
    lead: "Praxiskurse, die nie bei der Theorie stehen bleiben: Jede Lektion verbindet lesbare Erklärungen aus ersten Prinzipien mit einem interaktiven Labor zum Anfassen, Ziehen und Kaputtmachen — und jeder Kurs endet mit dem echten Ding auf deinem Tisch.",
    enter: "Zum Kurs →",
    lessons: "Lektionen",
    units: "Einheiten",
    done: "abgeschlossen",
    foot: "Der Fortschritt wird je Kurs in diesem Browser gespeichert — mit optionalem Geräte-Sync in jedem Kurs.",
  },
};

/** Count passed lessons straight from a course's localStorage blob. */
function readDone(courseId: string): number {
  try {
    const raw = localStorage.getItem(`${courseId}-academy-progress-v1`);
    if (!raw) return 0;
    const quiz = (JSON.parse(raw)?.quiz ?? {}) as Record<string, { passed?: boolean }>;
    return Object.values(quiz).filter((q) => q?.passed).length;
  } catch {
    return 0;
  }
}

export default function Landing() {
  const [lang, setLang] = useState<Lang>("en");
  const [done, setDone] = useState<Record<string, number>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LANG_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage
      if (stored === "de" || stored === "en") setLang(stored);
    } catch {}
    setDone(Object.fromEntries(COURSES.map((c) => [c.id, readDone(c.id)])));
  }, []);

  const pick = (l: Lang) => {
    setLang(l);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {}
  };
  const t = T[lang];

  return (
    <>
      <header className="topbar">
        <span className="brand">🔬 Science Academy</span>
        <div className="topbar-right">
          <div className="lang-switch" role="group" aria-label="Language">
            {(["en", "de"] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                className={`lang-btn${lang === l ? " active" : ""}`}
                onClick={() => pick(l)}
                aria-pressed={lang === l}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main>
        <section className="landing-hero">
          <h1>
            {t.titlePre} <span className="accent">{t.titleZap}</span>
          </h1>
          <p className="lead">{t.lead}</p>
        </section>

        <div className="course-grid">
          {COURSES.map((c) => {
            const d = done[c.id] ?? 0;
            return (
              <Link
                key={c.id}
                href={`/${c.id}`}
                className="course-card"
                style={{ "--course-accent": c.accent } as CSSProperties}
              >
                <div className="course-head">
                  <span className="course-emoji">{c.emoji}</span>
                  <div>
                    <span className="course-field">{c.field[lang]}</span>
                    <h2>{c.name}</h2>
                  </div>
                </div>
                <p>{c.tagline[lang]}</p>
                <p className="course-capstone">🎯 {c.capstone[lang]}</p>
                <div className="course-stats" suppressHydrationWarning>
                  <span>
                    <b>{c.lessonsTotal}</b> {t.lessons}
                  </span>
                  <span>
                    <b>{c.unitsTotal}</b> {t.units}
                  </span>
                  <span>
                    <b>{d}</b> / {c.lessonsTotal} {t.done}
                  </span>
                </div>
                <div className="course-progress-bar">
                  <span style={{ width: `${Math.min(100, (d / c.lessonsTotal) * 100)}%` }} />
                </div>
                <span className="course-cta">{t.enter}</span>
              </Link>
            );
          })}
        </div>

        <p className="landing-foot">{t.foot}</p>
      </main>
    </>
  );
}
