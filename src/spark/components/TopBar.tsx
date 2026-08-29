"use client";

import Link from "next/link";
import { LESSONS } from "@/spark/lib/curriculum/registry";
import { useProgress } from "@/shared/progress";
import { useLang, useT, type Lang } from "@/spark/lib/i18n";

export default function TopBar() {
  const progress = useProgress();
  const { lang, setLang } = useLang();
  const t = useT();
  const done = LESSONS.filter((l) => progress.isComplete(l.slug)).length;
  return (
    <header className="topbar">
      <div className="topbar-left">
        <Link className="topbar-home" href="/" title="All courses">
          ⌂
        </Link>
        <Link className="brand" href="/spark">
          ⚡ Spark Academy
        </Link>
      </div>
      <div className="topbar-right">
        <Link className="topbar-link" href="/search" title={t("searchTitle")}>
          🔍
        </Link>
        <div className="lang-switch" role="group" aria-label="Language">
          {(["en", "de"] as Lang[]).map((l) => (
            <button
              key={l}
              type="button"
              className={`lang-btn${lang === l ? " active" : ""}`}
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <span className="pill" suppressHydrationWarning>
          {progress.ready
            ? t("complete", { done, total: LESSONS.length })
            : `${LESSONS.length} ${t("lessonsWord")}`}
        </span>
      </div>
    </header>
  );
}
