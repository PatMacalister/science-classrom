"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { KIND_ORDER, SI_ENTRIES, kindVar, type SiEntry, type SiKind } from "@/vector/lib/si";
import { useLang, useT, type UIKey } from "@/vector/lib/i18n";

export const KIND_KEYS: Record<SiKind, UIKey> = {
  base: "siKindBase",
  derived: "siKindDerived",
  prefix: "siKindPrefix",
  constant: "siKindConstant",
};

/** Render a hook: text between *asterisks* becomes bold. */
export function HookText({ text }: { text: string }): ReactNode {
  return (
    <>
      {text.split("*").map((p, i) => (i % 2 === 1 ? <b key={i}>{p}</b> : <span key={i}>{p}</span>))}
    </>
  );
}

function entryStyle(e: SiEntry): CSSProperties {
  // the tile styles read --aa, the drill/detail styles --cat — serve both
  return { "--aa": kindVar(e.kind), "--cat": kindVar(e.kind) } as CSSProperties;
}

export function SiDetail({ entry }: { entry: SiEntry }) {
  const t = useT();
  const { lang } = useLang();
  return (
    <div className="codon-detail" style={entryStyle(entry)}>
      <div className="codon-big">
        <span className="c-triplet">{entry.symbol}</span>
      </div>
      <div className="codon-info">
        <h3>{lang === "de" ? entry.nameDe : entry.name}</h3>
        <div className="codon-facts">
          <span>{t(KIND_KEYS[entry.kind])}</span>
          <span>
            <b>{lang === "de" ? entry.meaningDe : entry.meaning}</b>
          </span>
        </div>
      </div>
      <div className="codon-hook">
        <span className="esel-tag">📏 {lang === "de" ? "Eselsbrücke" : "Memory hook"}</span>
        <p>
          <HookText text={lang === "de" ? entry.esel : entry.hook} />
        </p>
      </div>
    </div>
  );
}

/**
 * The reference view: one section per kind (base, derived, prefix, constant),
 * each a grid of tiles. Click a tile for its meaning and memory hook —
 * the same interaction as Catalyst's periodic table and Helix's code table.
 */
export default function SiTable() {
  const t = useT();
  const { lang } = useLang();
  const [picked, setPicked] = useState<string>("g-earth");
  const entry = SI_ENTRIES.find((e) => e.id === picked) ?? SI_ENTRIES[0];

  return (
    <div className="codon-wrap">
      {KIND_ORDER.map((kind) => (
        <section key={kind} className="si-section">
          <h3 className="si-kind-head">{t(KIND_KEYS[kind])}</h3>
          <div className="si-grid">
            {SI_ENTRIES.filter((e) => e.kind === kind).map((e) => (
              <button
                key={e.id}
                type="button"
                className={`codon-tile${picked === e.id ? " selected" : ""}`}
                style={entryStyle(e)}
                onClick={() => setPicked(e.id)}
                title={`${e.symbol} — ${lang === "de" ? e.nameDe : e.name}`}
              >
                <span className="t-codon">{e.symbol}</span>
                <span className="t-aa">{lang === "de" ? e.nameDe : e.name}</span>
              </button>
            ))}
          </div>
        </section>
      ))}
      <SiDetail entry={entry} />
    </div>
  );
}

/** Searchable list of all entries with every hook visible at once. */
export function SiList({ query }: { query: string }) {
  const t = useT();
  const { lang } = useLang();
  const q = query.trim().toLowerCase();
  const rows = SI_ENTRIES.filter(
    (e) =>
      !q ||
      e.name.toLowerCase().includes(q) ||
      e.nameDe.toLowerCase().includes(q) ||
      e.symbol.toLowerCase() === q ||
      e.meaning.toLowerCase().includes(q) ||
      e.meaningDe.toLowerCase().includes(q) ||
      (lang === "de" ? e.esel : e.hook).toLowerCase().replace(/\*/g, "").includes(q)
  );

  if (rows.length === 0) return <p className="pt-empty">{t("siNoHit", { q: query.trim() })}</p>;

  return (
    <div style={{ overflowX: "auto" }}>
      <table className="pt-list">
        <thead>
          <tr>
            <th>{t("siColSymbol")}</th>
            <th>{t("colName")}</th>
            <th>{t("siColMeaning")}</th>
            <th>{t("colEsel")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((e) => (
            <tr key={e.id} style={entryStyle(e)}>
              <td className="cell-sym">
                <span className="cell-z">{e.symbol}</span>
              </td>
              <td>
                <span className="aa-dot" title={t(KIND_KEYS[e.kind])} />
                {lang === "de" ? e.nameDe : e.name}
              </td>
              <td className="cell-codons">{lang === "de" ? e.meaningDe : e.meaning}</td>
              <td className="cell-esel">
                <HookText text={lang === "de" ? e.esel : e.hook} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
