"use client";

import Link from "next/link";
import { useState } from "react";
import CodonTable, { AminoList } from "@/helix/components/CodonTable";
import CodonDrill from "@/helix/components/CodonDrill";
import { useT } from "@/helix/lib/i18n";

/**
 * The genetic code page: the classic 4×4×4 table (click a codon for its amino
 * acid and memory hook), a searchable list of all 21 outcomes with every hook
 * visible at once, and a drill whose misses feed the review deck — the
 * counterpart to Catalyst's periodic table.
 */
export default function CodonsPage() {
  const t = useT();
  const [view, setView] = useState<"grid" | "list" | "drill">("grid");
  const [query, setQuery] = useState("");

  return (
    <div className="main-wide">
      <nav className="crumbs">
        <Link href="/helix">{t("allLessons")}</Link>
        <span className="chip">{t("codonsChip")}</span>
      </nav>

      <header className="lesson-head">
        <h1>{t("codonsTitle")}</h1>
        <p className="subtitle">{t("codonsLead")}</p>
      </header>

      <div className="pt-toolbar">
        <div className="seg">
          <button
            type="button"
            className={`seg-btn${view === "grid" ? " active" : ""}`}
            onClick={() => setView("grid")}
          >
            {t("codonsGridView")}
          </button>
          <button
            type="button"
            className={`seg-btn${view === "list" ? " active" : ""}`}
            onClick={() => setView("list")}
          >
            {t("codonsListView")}
          </button>
          <button
            type="button"
            className={`seg-btn${view === "drill" ? " active" : ""}`}
            onClick={() => setView("drill")}
          >
            🎯 {t("codonsDrillView")}
          </button>
        </div>
        {view === "list" ? (
          <input
            className="pt-search"
            placeholder={t("codonsSearch")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        ) : null}
      </div>

      {view === "drill" ? <CodonDrill /> : view === "grid" ? <CodonTable /> : <AminoList query={query} />}
    </div>
  );
}
