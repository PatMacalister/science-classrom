"use client";

import Link from "next/link";
import { LESSONS, getLesson } from "@/servo/lib/curriculum/registry";
import { localizeLesson } from "@/servo/lib/curriculum/localize";
import { useLang, useT } from "@/servo/lib/i18n";
import { useProgress } from "@/shared/progress";

const CAPSTONES = ["line-follower", "teach-by-demo"];

export default function CertificatePage() {
  const progress = useProgress();
  const { lang } = useLang();
  const t = useT();
  if (!progress.ready) return null;

  const capsDone = CAPSTONES.filter((slug) => progress.isComplete(slug));
  const unlocked = capsDone.length === CAPSTONES.length;
  const lessonsDone = LESSONS.filter((l) => progress.isComplete(l.slug)).length;
  const name = progress.state.profile.name ?? "";

  if (!unlocked) {
    return (
      <div className="review-empty">
        <h1>{t("certAwaitsHead")}</h1>
        <p>{t("certAwaitsBody")}</p>
        <div style={{ margin: "20px auto", maxWidth: 420, textAlign: "left" }}>
          {CAPSTONES.map((slug) => {
            const lesson = getLesson(slug);
            const done = progress.isComplete(slug);
            return (
              <p key={slug} style={{ margin: "6px 0" }}>
                {done ? "✅" : "⬜"}{" "}
                <Link href={`/servo/lesson/${slug}`}>
                  {lesson ? localizeLesson(lesson, lang).title : slug}
                </Link>
              </p>
            );
          })}
        </div>
        <Link className="btn" href="/servo">
          {t("reviewBackToCourse")}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <nav className="crumbs no-print">
        <Link href="/servo">{t("allLessons")}</Link>
        <span className="chip">{t("certChip")}</span>
      </nav>

      <div className="cert-frame">
        <div className="cert-zap">🤖</div>
        <div className="cert-sub">{t("certSub")}</div>
        <h1>{t("certTitle")}</h1>
        {name ? (
          <>
            <div className="cert-name">{name}</div>
            <div className="cert-line" />
          </>
        ) : (
          <div className="no-print" style={{ margin: "24px 0" }}>
            <input
              className="cert-name-input"
              placeholder={t("certNamePlaceholder")}
              onKeyDown={(e) => {
                if (e.key === "Enter") progress.setName((e.target as HTMLInputElement).value.trim());
              }}
              onBlur={(e) => {
                const v = e.target.value.trim();
                if (v) progress.setName(v);
              }}
            />
          </div>
        )}
        <p>{t("certBody", { done: lessonsDone, total: LESSONS.length })}</p>
        <div className="cert-builds">
          <span>{t("certBuild1")}</span>
          <span>{t("certBuild2")}</span>
        </div>
        <p>{t("certEvery")}</p>
        <div className="cert-date">
          {t("certCompleted", {
            date: new Date().toLocaleDateString(lang === "de" ? "de-DE" : undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          })}
        </div>
      </div>

      <div className="no-print" style={{ textAlign: "center", marginTop: 10 }}>
        {name ? (
          <>
            <button type="button" className="btn" onClick={() => window.print()}>
              {t("certPrint")}
            </button>{" "}
            <button type="button" className="btn secondary" onClick={() => progress.setName("")}>
              {t("certChangeName")}
            </button>
          </>
        ) : (
          <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{t("certTypeName")}</p>
        )}
      </div>
    </div>
  );
}
