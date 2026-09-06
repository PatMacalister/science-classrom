"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { KIND_ORDER, PART_ENTRIES, kindVar, type PartEntry, type PartKind } from "@/servo/lib/parts";
import { useLang, useT, type UIKey } from "@/servo/lib/i18n";

export const KIND_KEYS: Record<PartKind, UIKey> = {
  sensor: "partKindSensor",
  actuator: "partKindActuator",
  driver: "partKindDriver",
  brain: "partKindBrain",
  mechanism: "partKindMechanism",
};

/** Render a hook: text between *asterisks* becomes bold. */
export function HookText({ text }: { text: string }): ReactNode {
  return (
    <>
      {text.split("*").map((p, i) => (i % 2 === 1 ? <b key={i}>{p}</b> : <span key={i}>{p}</span>))}
    </>
  );
}

function entryStyle(e: PartEntry): CSSProperties {
  // the tile styles read --aa, the drill/detail styles --cat — serve both
  return { "--aa": kindVar(e.kind), "--cat": kindVar(e.kind) } as CSSProperties;
}

export function PartDetail({ entry }: { entry: PartEntry }) {
  const t = useT();
  const { lang } = useLang();
  return (
    <div className="codon-detail" style={entryStyle(entry)}>
      <div className="codon-big">
        <span className="c-triplet">{entry.glyph}</span>
      </div>
      <div className="codon-info">
        <h3>{lang === "de" ? entry.nameDe : entry.name}</h3>
        <div className="codon-facts">
          <span>{t(KIND_KEYS[entry.kind])}</span>
          <span>
            <b>{lang === "de" ? entry.roleDe : entry.role}</b>
          </span>
        </div>
      </div>
      <div className="codon-hook">
        <span className="esel-tag">🔩 {lang === "de" ? "Eselsbrücke" : "Memory hook"}</span>
        <p>
          <HookText text={lang === "de" ? entry.esel : entry.hook} />
        </p>
      </div>
    </div>
  );
}

/**
 * The reference view: one section per kind (sensor, actuator, driver, brain,
 * mechanism), each a grid of tiles. Click a tile for its role and memory
 * hook — the same interaction as the sibling courses' signature tables.
 */
export default function PartsTable() {
  const t = useT();
  const { lang } = useLang();
  const [picked, setPicked] = useState<string>("h-bridge");
  const entry = PART_ENTRIES.find((e) => e.id === picked) ?? PART_ENTRIES[0];

  return (
    <div className="codon-wrap">
      {KIND_ORDER.map((kind) => (
        <section key={kind} className="si-section">
          <h3 className="si-kind-head">{t(KIND_KEYS[kind])}</h3>
          <div className="si-grid">
            {PART_ENTRIES.filter((e) => e.kind === kind).map((e) => (
              <button
                key={e.id}
                type="button"
                className={`codon-tile${picked === e.id ? " selected" : ""}`}
                style={entryStyle(e)}
                onClick={() => setPicked(e.id)}
                title={`${e.glyph} ${lang === "de" ? e.nameDe : e.name}`}
              >
                <span className="t-codon">{e.glyph}</span>
                <span className="t-aa">{lang === "de" ? e.nameDe : e.name}</span>
              </button>
            ))}
          </div>
        </section>
      ))}
      <PartDetail entry={entry} />
    </div>
  );
}

/** Searchable list of all entries with every hook visible at once. */
export function PartsList({ query }: { query: string }) {
  const t = useT();
  const { lang } = useLang();
  const q = query.trim().toLowerCase();
  const rows = PART_ENTRIES.filter(
    (e) =>
      !q ||
      e.name.toLowerCase().includes(q) ||
      e.nameDe.toLowerCase().includes(q) ||
      e.role.toLowerCase().includes(q) ||
      e.roleDe.toLowerCase().includes(q) ||
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
                <span className="cell-z">{e.glyph}</span>
              </td>
              <td>
                <span className="aa-dot" title={t(KIND_KEYS[e.kind])} />
                {lang === "de" ? e.nameDe : e.name}
              </td>
              <td className="cell-codons">{lang === "de" ? e.roleDe : e.role}</td>
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
