"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SEARCH_INDEX, type SearchRow } from "@/shared/searchIndex.generated";
import { COURSES } from "@/shared/courses";

const LANG_KEY = "science-lang";

/**
 * Cross-course lesson search.
 *
 * The index is a generated list of plain strings (see
 * scripts/build-search-index.mjs), so this route stays a few kB — importing the
 * curriculum registries directly would pull every lab of every course into it.
 */

const COURSE_BY_ID = Object.fromEntries(COURSES.map((c) => [c.id, c]));

/** Score a row against the query; higher is better, 0 means "no match". */
function score(row: SearchRow, q: string, de: boolean): number {
  const title = (de && row.titleDe ? row.titleDe : row.title).toLowerCase();
  const subtitle = (de && row.subtitleDe ? row.subtitleDe : row.subtitle).toLowerCase();
  const unit = row.unitTitle.toLowerCase();
  // search both languages regardless, so a German query finds an English-only lesson
  const haystacks = [title, subtitle, unit, row.title.toLowerCase(), row.subtitle.toLowerCase()];

  if (title.startsWith(q)) return 100;
  if (title.includes(q)) return 70;
  if (row.slug.includes(q)) return 60;
  if (unit.includes(q)) return 40;
  if (haystacks.some((h) => h.includes(q))) return 20;
  return 0;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [course, setCourse] = useState<string>("all");
  // Self-contained language read, like the landing page: this route must not
  // import a course's i18n provider (that would pull in its curriculum).
  const [de, setDe] = useState(false);
  useEffect(() => {
    const read = () => {
      try {
        setDe(localStorage.getItem(LANG_KEY) === "de");
      } catch {}
    };
    const id = setTimeout(read, 0);
    return () => clearTimeout(id);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return SEARCH_INDEX.filter((r) => course === "all" || r.course === course)
      .map((r) => ({ r, s: score(r, q, de) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s || a.r.course.localeCompare(b.r.course) || a.r.unitNum - b.r.unitNum)
      .slice(0, 40);
  }, [query, course, de]);

  const q = query.trim();

  return (
    <div className="search-page">
      <nav className="crumbs">
        <Link href="/">{de ? "← Alle Kurse" : "← All courses"}</Link>
        <span className="chip">{de ? "SUCHE" : "SEARCH"}</span>
      </nav>

      <header className="lesson-head">
        <h1>{de ? "Lektionen durchsuchen" : "Search the lessons"}</h1>
        <p className="subtitle">
          {de
            ? `Alle ${SEARCH_INDEX.length} Lektionen aus jedem Kurs, in einem Feld.`
            : `All ${SEARCH_INDEX.length} lessons across every course, in one box.`}
        </p>
      </header>

      <div className="search-controls">
        {/* the whole page is this one box, so focusing it is the expected behaviour */}
        <input
          className="search-box"
          autoFocus
          placeholder={de ? "z. B. Elektronegativität, Ohm, Titration…" : "e.g. electronegativity, Ohm, titration…"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={de ? "Lektionen durchsuchen" : "Search lessons"}
        />
        <div className="seg">
          <button
            type="button"
            className={`seg-btn${course === "all" ? " active" : ""}`}
            onClick={() => setCourse("all")}
          >
            {de ? "Alle Kurse" : "All courses"}
          </button>
          {COURSES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`seg-btn${course === c.id ? " active" : ""}`}
              onClick={() => setCourse(c.id)}
            >
              {c.emoji} {c.name.replace(" Academy", "")}
            </button>
          ))}
        </div>
      </div>

      {q.length < 2 ? (
        <p className="search-hint">
          {de ? "Tippe mindestens zwei Zeichen." : "Type at least two characters."}
        </p>
      ) : results.length === 0 ? (
        <p className="search-hint">
          {de ? `Nichts passt zu „${q}“.` : `Nothing matches “${q}”.`}
        </p>
      ) : (
        <ul className="search-results">
          {results.map(({ r }) => {
            const info = COURSE_BY_ID[r.course];
            return (
              <li key={`${r.course}/${r.slug}`}>
                <Link href={`/${r.course}/lesson/${r.slug}`} className="search-hit">
                  <span className="hit-course" style={{ color: info?.accent }}>
                    {info?.emoji} {r.lessonNo}
                  </span>
                  <span className="hit-body">
                    <strong>{de && r.titleDe ? r.titleDe : r.title}</strong>
                    <span className="hit-sub">{de && r.subtitleDe ? r.subtitleDe : r.subtitle}</span>
                  </span>
                  <span className="hit-unit">{r.unitTitle}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
