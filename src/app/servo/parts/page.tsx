"use client";

import Link from "next/link";
import { useState } from "react";
import PartsTable, { PartsList } from "@/servo/components/PartsTable";
import PartsDrill from "@/servo/components/PartsDrill";
import { useT } from "@/servo/lib/i18n";

/**
 * The parts-bench page: the grouped reference (click any tile for its role
 * and memory hook), a searchable list with every hook visible at once, and
 * a drill whose misses feed the review deck — the counterpart to Catalyst's
 * periodic table, Helix's genetic code and Vector's SI table.
 */
export default function PartsPage() {
  const t = useT();
  const [view, setView] = useState<"grid" | "list" | "drill">("grid");
  const [query, setQuery] = useState("");

  return (
    <div className="main-wide">
      <nav className="crumbs">
        <Link href="/servo">{t("allLessons")}</Link>
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

      {view === "drill" ? <PartsDrill /> : view === "grid" ? <PartsTable /> : <PartsList query={query} />}
    </div>
  );
}
