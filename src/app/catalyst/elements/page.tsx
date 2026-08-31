"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import PeriodicTable, { CATEGORY_KEYS, EselText } from "@/catalyst/components/PeriodicTable";
import ElementDrill from "@/catalyst/components/ElementDrill";
import { ELEMENTS, categoryVar } from "@/catalyst/lib/elements";
import { useLang, useT } from "@/catalyst/lib/i18n";

/**
 * The full periodic table page: the classic grid (click for details and the
 * Eselsbrücke), plus a searchable list of all 118 elements with every
 * Eselsbrücke visible at once.
 */
export default function ElementsPage() {
  const t = useT();
  const { lang } = useLang();
  const [view, setView] = useState<"grid" | "list" | "drill">("grid");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ELEMENTS;
    return ELEMENTS.filter(
      (el) =>
        el.name.toLowerCase().includes(q) ||
        el.nameDe.toLowerCase().includes(q) ||
        el.symbol.toLowerCase() === q ||
        el.symbol.toLowerCase().startsWith(q) ||
        String(el.z) === q
    );
  }, [query]);

  return (
    <div className="main-wide">
      <nav className="crumbs">
        <Link href="/catalyst">{t("allLessons")}</Link>
        <span className="chip">{t("elementsChip")}</span>
      </nav>

      <header className="lesson-head">
        <h1>{t("elementsTitle")}</h1>
        <p className="subtitle">{t("elementsLead")}</p>
      </header>

      <div className="pt-toolbar">
        <div className="seg">
          <button
            type="button"
            className={`seg-btn${view === "grid" ? " active" : ""}`}
            onClick={() => setView("grid")}
          >
            {t("elementsGridView")}
          </button>
          <button
            type="button"
            className={`seg-btn${view === "list" ? " active" : ""}`}
            onClick={() => setView("list")}
          >
            {t("elementsListView")}
          </button>
          <button
            type="button"
            className={`seg-btn${view === "drill" ? " active" : ""}`}
            onClick={() => setView("drill")}
          >
            🎯 {t("elementsDrillView")}
          </button>
        </div>
        {view === "list" ? (
          <input
            className="pt-search"
            placeholder={t("elementsSearch")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        ) : null}
      </div>

      {view === "drill" ? (
        <ElementDrill />
      ) : view === "grid" ? (
        <PeriodicTable />
      ) : filtered.length === 0 ? (
        <p className="pt-empty">{t("elementsNoHit", { q: query.trim() })}</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="pt-list">
            <thead>
              <tr>
                <th>{t("elCol")}</th>
                <th>{t("colName")}</th>
                <th>{lang === "de" ? "Englischer Name" : t("colNameDe")}</th>
                <th>{t("colMass")}</th>
                <th>{t("colEsel")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((el) => {
                const style = { "--cat": categoryVar(el.category) } as CSSProperties;
                return (
                  <tr key={el.z} style={style}>
                    <td className="cell-sym">
                      <span className="cell-z">{el.z}</span>&nbsp;&nbsp;{el.symbol}
                    </td>
                    <td>
                      <span className="cat-dot" title={t(CATEGORY_KEYS[el.category])} />
                      {lang === "de" ? el.nameDe : el.name}
                    </td>
                    <td style={{ color: "var(--muted)" }}>{lang === "de" ? el.name : el.nameDe}</td>
                    <td className="cell-mass">{el.mass}</td>
                    <td className="cell-esel">
                      <EselText text={lang === "de" ? el.esel : el.hook} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
