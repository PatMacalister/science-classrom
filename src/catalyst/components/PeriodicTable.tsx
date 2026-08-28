"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { ELEMENTS, categoryVar, type ChemElement, type ElementCategory } from "@/catalyst/lib/elements";
import { useLang, useT, type UIKey } from "@/catalyst/lib/i18n";

export const CATEGORY_KEYS: Record<ElementCategory, UIKey> = {
  alkali: "catAlkali",
  alkaline: "catAlkaline",
  transition: "catTransition",
  "post-transition": "catPostTransition",
  metalloid: "catMetalloid",
  nonmetal: "catNonmetal",
  halogen: "catHalogen",
  noble: "catNoble",
  lanthanide: "catLanthanide",
  actinide: "catActinide",
  unknown: "catUnknown",
};

const CATEGORY_ORDER: ElementCategory[] = [
  "alkali",
  "alkaline",
  "transition",
  "post-transition",
  "metalloid",
  "nonmetal",
  "halogen",
  "noble",
  "lanthanide",
  "actinide",
  "unknown",
];

/** Render a memory-hook string: text between *asterisks* becomes <b>. */
export function EselText({ text }: { text: string }) {
  const parts = text.split("*");
  return (
    <>
      {parts.map((p, i) => (i % 2 === 1 ? <b key={i}>{p}</b> : <span key={i}>{p}</span>))}
    </>
  );
}

function catStyle(cat: ElementCategory): CSSProperties {
  return { "--cat": categoryVar(cat) } as CSSProperties;
}

/** Grid position: main-block elements sit at (period, group); the f-block
 *  goes into two detached rows below (row 9/10, columns 3–17). */
function gridPos(el: ChemElement): { row: number; col: number } {
  if (el.group !== null) return { row: el.period, col: el.group };
  const isLa = el.category === "lanthanide";
  const base = isLa ? 57 : 89;
  return { row: isLa ? 9 : 10, col: 3 + (el.z - base) };
}

export function ElementDetail({ el }: { el: ChemElement }) {
  const t = useT();
  const { lang } = useLang();
  return (
    <div className="pt-detail" style={catStyle(el.category)}>
      <div className="big-sym">
        <span className="s">{el.symbol}</span>
        <span className="z2">{el.z}</span>
      </div>
      <div className="pt-info">
        <h3>{lang === "de" ? el.nameDe : el.name}</h3>
        <p className="de-name">{lang === "de" ? el.name : el.nameDe}</p>
        <div className="facts">
          <span>
            {t("detailMass")}: <b>{el.mass} u</b>
          </span>
          <span>
            {t("detailPeriod")}: <b>{el.period}</b>
          </span>
          {el.group !== null ? (
            <span>
              {t("detailGroup")}: <b>{el.group}</b>
            </span>
          ) : null}
          <span>
            {t("detailCategory")}: <b>{t(CATEGORY_KEYS[el.category])}</b>
          </span>
          <span>
            {t("detailShells")}: <b>{el.shells.join("–")}</b>
          </span>
        </div>
      </div>
      <div className="pt-esel">
        <span className="esel-tag">{t("eselTag")}</span>
        <p>
          <EselText text={lang === "de" ? el.esel : el.hook} />
        </p>
      </div>
    </div>
  );
}

export function CategoryLegend() {
  const t = useT();
  return (
    <div className="pt-legend">
      {CATEGORY_ORDER.map((cat) => (
        <span className="lg" key={cat} style={catStyle(cat)}>
          <span className="swatch" />
          {t(CATEGORY_KEYS[cat])}
        </span>
      ))}
    </div>
  );
}

/**
 * The interactive periodic table: the classic 18-column grid with the
 * f-block detached below. Click a tile to see the element's details and its
 * Eselsbrücke. Used both as the Unit 0 lab and on the /elements page.
 */
export default function PeriodicTable({
  legend = true,
  footer,
}: {
  legend?: boolean;
  /** Optional extra content rendered under the detail card. */
  footer?: ReactNode;
}) {
  const t = useT();
  const { lang } = useLang();
  const [selectedZ, setSelectedZ] = useState<number | null>(null);
  const selected = selectedZ !== null ? ELEMENTS[selectedZ - 1] : null;

  return (
    <div className="pt-wrap">
      <div className="pt-scroll">
        <div className="pt-grid">
          {ELEMENTS.map((el) => {
            const { row, col } = gridPos(el);
            return (
              <button
                key={el.z}
                type="button"
                className={`pt-tile${selectedZ === el.z ? " selected" : ""}`}
                style={{ ...catStyle(el.category), gridRow: row, gridColumn: col }}
                onClick={() => setSelectedZ(el.z)}
                title={`${el.z} · ${lang === "de" ? el.nameDe : el.name}`}
              >
                <span className="z">{el.z}</span>
                <span className="sym">{el.symbol}</span>
                <span className="nm">{lang === "de" ? el.nameDe : el.name}</span>
              </button>
            );
          })}
          {/* range markers pointing at the detached f-block rows below —
              deliberately styled unlike element tiles (no symbol, dashed) */}
          <div
            className="pt-range"
            style={{ ...catStyle("lanthanide"), gridRow: 6, gridColumn: 3 }}
            aria-hidden
          >
            <span className="rng">57–71</span>
            <span className="arrow">↓</span>
          </div>
          <div
            className="pt-range"
            style={{ ...catStyle("actinide"), gridRow: 7, gridColumn: 3 }}
            aria-hidden
          >
            <span className="rng">89–103</span>
            <span className="arrow">↓</span>
          </div>
          <div className="pt-spacer-row" style={{ gridRow: 8, gridColumn: "1 / -1" }} />
        </div>
      </div>

      {legend ? <CategoryLegend /> : null}

      {selected ? (
        <ElementDetail el={selected} />
      ) : (
        <div className="pt-detail">
          <p style={{ margin: 0, color: "var(--muted)" }}>{t("detailPickOne")}</p>
        </div>
      )}

      {footer}
    </div>
  );
}
