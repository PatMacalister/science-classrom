"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import {
  AMINO_ACIDS,
  AMINO_BY_CODE,
  BASES,
  CODON_TABLE,
  START_CODON,
  classVar,
  synonymsInFamily,
  type AminoAcid,
} from "@/helix/lib/codons";
import { useLang, useT, type UIKey } from "@/helix/lib/i18n";

export const CLASS_KEYS: Record<string, UIKey> = {
  nonpolar: "aaNonpolar",
  polar: "aaPolar",
  acidic: "aaAcidic",
  basic: "aaBasic",
  aromatic: "aaAromatic",
  stop: "aaStop",
};

/** Render a hook: text between *asterisks* becomes bold. */
export function HookText({ text }: { text: string }): ReactNode {
  return (
    <>
      {text.split("*").map((p, i) => (i % 2 === 1 ? <b key={i}>{p}</b> : <span key={i}>{p}</span>))}
    </>
  );
}

function aaStyle(aa: AminoAcid): CSSProperties {
  return { "--aa": classVar(aa.cls) } as CSSProperties;
}

export function AminoDetail({ codon }: { codon: string }) {
  const t = useT();
  const { lang } = useLang();
  const aa = AMINO_BY_CODE[CODON_TABLE[codon]];
  const deg = synonymsInFamily(codon);
  const isStart = codon === START_CODON;

  return (
    <div className="codon-detail" style={aaStyle(aa)}>
      <div className="codon-big">
        <span className="c-triplet">{codon}</span>
        <span className="c-code">{aa.code1}</span>
      </div>
      <div className="codon-info">
        <h3>
          {lang === "de" ? aa.nameDe : aa.name}{" "}
          <span className="c-three">{aa.code3}</span>
        </h3>
        <div className="codon-facts">
          <span>
            {t("codonClass")}: <b>{t(CLASS_KEYS[aa.cls])}</b>
          </span>
          <span>
            {t("codonWobble")}: <b>{t("codonWobbleN", { n: deg })}</b>
          </span>
          {isStart ? <span className="c-start">{t("codonIsStart")}</span> : null}
        </div>
      </div>
      <div className="codon-hook">
        <span className="esel-tag">
          🧬 {lang === "de" ? "Eselsbrücke" : "Memory hook"}
        </span>
        <p>
          <HookText text={lang === "de" ? aa.esel : aa.hook} />
        </p>
      </div>
    </div>
  );
}

export function AminoLegend() {
  const t = useT();
  const classes = ["nonpolar", "polar", "acidic", "basic", "aromatic", "stop"];
  return (
    <div className="codon-legend">
      {classes.map((c) => (
        <span key={c} style={{ "--aa": `var(--aa-${c})` } as CSSProperties}>
          <i />
          {t(CLASS_KEYS[c])}
        </span>
      ))}
    </div>
  );
}

/**
 * The genetic code in its classic layout: first base down the side, second
 * base across the top, third base within each cell. Grouping this way makes
 * the wobble obvious — most families are one solid colour, meaning the third
 * base does not change the amino acid at all.
 */
export default function CodonTable() {
  const t = useT();
  const { lang } = useLang();
  const [picked, setPicked] = useState<string>(START_CODON);

  return (
    <div className="codon-wrap">
      <div className="codon-scroll">
        <table className="codon-grid">
          <thead>
            <tr>
              <th className="corner">{t("codonFirst")}</th>
              {BASES.map((b) => (
                <th key={b} className="base-col">
                  {b}
                </th>
              ))}
              <th className="corner">{t("codonThird")}</th>
            </tr>
          </thead>
          <tbody>
            {BASES.map((first) =>
              BASES.map((third, ti) => (
                <tr key={`${first}${third}`}>
                  {ti === 0 ? (
                    <th className="base-row" rowSpan={4}>
                      {first}
                    </th>
                  ) : null}
                  {BASES.map((second) => {
                    const codon = `${first}${second}${third}`;
                    const aa = AMINO_BY_CODE[CODON_TABLE[codon]];
                    return (
                      <td key={codon} className="codon-cell">
                        <button
                          type="button"
                          className={`codon-tile${picked === codon ? " selected" : ""}${
                            codon === START_CODON ? " start" : ""
                          }`}
                          style={aaStyle(aa)}
                          onClick={() => setPicked(codon)}
                          title={`${codon} — ${lang === "de" ? aa.nameDe : aa.name}`}
                        >
                          <span className="t-codon">{codon}</span>
                          <span className="t-aa">{aa.code1 === "*" ? "STOP" : aa.code3}</span>
                        </button>
                      </td>
                    );
                  })}
                  <th className="base-row third">{third}</th>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AminoLegend />
      <AminoDetail codon={picked} />
    </div>
  );
}

/** All 21 outcomes with their hooks, for the list view. */
export function AminoList({ query }: { query: string }) {
  const t = useT();
  const { lang } = useLang();
  const q = query.trim().toLowerCase();
  const rows = AMINO_ACIDS.filter(
    (a) =>
      !q ||
      a.name.toLowerCase().includes(q) ||
      a.nameDe.toLowerCase().includes(q) ||
      a.code1.toLowerCase() === q ||
      a.code3.toLowerCase().includes(q) ||
      (lang === "de" ? a.esel : a.hook).toLowerCase().replace(/\*/g, "").includes(q)
  );

  if (rows.length === 0) return <p className="pt-empty">{t("codonNoHit", { q: query.trim() })}</p>;

  return (
    <div style={{ overflowX: "auto" }}>
      <table className="pt-list">
        <thead>
          <tr>
            <th>{t("codonCode")}</th>
            <th>{t("colName")}</th>
            <th>{t("codonCodons")}</th>
            <th>{t("colEsel")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((a) => {
            const codons = Object.entries(CODON_TABLE)
              .filter(([, c]) => c === a.code1)
              .map(([k]) => k);
            return (
              <tr key={a.code1} style={aaStyle(a)}>
                <td className="cell-sym">
                  <span className="cell-z">{a.code1}</span>&nbsp;&nbsp;{a.code3}
                </td>
                <td>
                  <span className="aa-dot" title={t(CLASS_KEYS[a.cls])} />
                  {lang === "de" ? a.nameDe : a.name}
                </td>
                <td className="cell-codons">{codons.join(" ")}</td>
                <td className="cell-esel">
                  <HookText text={lang === "de" ? a.esel : a.hook} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
