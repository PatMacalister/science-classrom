"use client";

import Link from "next/link";
import { useState } from "react";
import SiTable, { SiList } from "@/vector/components/SiTable";
import SiDrill from "@/vector/components/SiDrill";
import { useT } from "@/vector/lib/i18n";

/**
 * The units & constants page: the grouped reference (click any tile for its
 * meaning and memory hook), a searchable list with every hook visible at
 * once, and a drill whose misses feed the review deck — the counterpart to
 * Catalyst's periodic table and Helix's genetic code.
 */
export default function UnitsPage() {
  const t = useT();
  const [view, setView] = useState<"grid" | "list" | "drill">("grid");
  const [query, setQuery] = useState("");

  return (
    <div className="main-wide">
      <nav className="crumbs">
        <Link href="/vector">{t("allLessons")}</Link>
        <span className="chip">{t("siChip")}</span>
      </nav>

      <header className="lesson-head">
        <h1>{t("siTitle")}</h1>
        <p className="subtitle">{t("siLead")}</p>
      </header>

      <div className="pt-toolbar">
        <div className="seg">
          <button
            type="button"
            className={`seg-btn${view === "grid" ? " active" : ""}`}
            onClick={() => setView("grid")}
          >
            {t("siGridView")}
          </button>
          <button
            type="button"
            className={`seg-btn${view === "list" ? " active" : ""}`}
            onClick={() => setView("list")}
          >
            {t("siListView")}
          </button>
          <button
            type="button"
            className={`seg-btn${view === "drill" ? " active" : ""}`}
            onClick={() => setView("drill")}
          >
            🎯 {t("siDrillView")}
          </button>
        </div>
        {view === "list" ? (
          <input
            className="pt-search"
            placeholder={t("siSearch")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        ) : null}
      </div>

      {view === "drill" ? <SiDrill /> : view === "grid" ? <SiTable /> : <SiList query={query} />}
    </div>
  );
}
