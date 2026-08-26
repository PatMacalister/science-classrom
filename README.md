# 🔬 Science Academy

One app, several hands-on courses — built to live on a single subdomain
(e.g. `science.patrickhasse.de`). The landing page at `/` is the course picker;
each course lives under its own route prefix with its own theme, curriculum,
progress and language-aware interface:

| Course | Route | Field | Finale |
| --- | --- | --- | --- |
| ⚡ **Spark Academy** | `/spark` | Electrical engineering (57 lessons, 21 units, 4 tiers + specializations) | Real builds: 555 blinker, PWM dimmer, Pico firmware, a self-built oscilloscope, CPU/SDR/robot/PCB branches |
| ⚗️ **Catalyst Academy** | `/catalyst` | Chemistry (22 lessons, 7 units, core + advanced) | Kitchen Lab (red-cabbage pH, CO₂ balloon, crystals) and a lemon battery lighting an LED — plus all 118 elements with an Eselsbrücke each at `/catalyst/elements` |

Every lesson everywhere: **theory → interactive lab → quiz** (≥ 75% to pass),
with numeric problems on quantitative lessons, a spaced-repetition review deck
(`/<course>/review`) and a printable certificate (`/<course>/certificate`).

## Running it

```bash
npm install
npm run dev        # → http://localhost:3000
```

Production: `npm run build && npm start`. Docker: `docker compose up` — the
sync database persists in the `science-data` volume. Point the reverse proxy /
Coolify domain at port 3000 and the whole site (landing + all courses) is
served from the one container.

## Progress, language & sync

- **Progress** is per course, offline-first in localStorage
  (`<course>-academy-progress-v1` — the same keys the standalone apps used, so
  existing browser progress carries over).
- **Language** (EN/DE) is one shared preference (`science-lang`) across the
  landing page and every course.
- **Sync codes are account-global**: enable sync in any course and the same
  code links every course's progress across devices. Server-side, blobs are
  stored per `(course, account)` in `./data/science.db` (node:sqlite, JSON
  fallback; hosted-DB seam in `src/shared/server/store.ts` — see
  `PLACEHOLDERS.md`). API: `/api/sync/<course>/{account,progress}`.

## Architecture

```
src/
  app/
    page.tsx               Landing page (course picker — cards from the manifest)
    layout.tsx             Root shell: html/body + self-hosted fonts only
    globals.css            One stylesheet; per-course accents via .theme-<id>
    spark/…                Spark segment: layout (theme + providers) + pages
    catalyst/…             Catalyst segment: ditto (+ /elements)
    api/sync/[course]/…    Course-namespaced sync API (validates the manifest)
  shared/                  Code every course uses
    courses.ts             ← THE course manifest: register new fields here
    progress.tsx           ProgressProvider (per-course storage/sync namespace)
    progressTypes.ts       Progress model + merge logic (client + server)
    SimCanvas.tsx          rAF canvas host for all labs
    server/store.ts        Sync accounts + per-course progress storage
  spark/                   The complete Spark course (components + lib),
                           incl. its EN/DE content localization layer
  catalyst/                The complete Catalyst course (components + lib),
                           incl. elements.ts with the 118 Eselsbrücken
```

Each course is self-contained (own curriculum registry, i18n dictionary,
canvas-drawing palette, lab components); the shared layer is only what is
genuinely identical. Course code never imports another course; the landing
page imports only the lightweight manifest — so each course's curriculum stays
in its own route-segment chunk.

## Adding a new field (physics, biology, math…)

1. **Build the course** under `src/<id>/` — copy the shape of `catalyst/`
   (the leaner of the two): `lib/curriculum/{types,registry,tiers,glossary}`,
   `lib/i18n.tsx` (use LANG_KEY `"science-lang"`), `components/` with
   `labs/labs-unitN.tsx` per unit.
2. **Mount it** under `src/app/<id>/`: a `layout.tsx` wrapping children in
   `<div className="theme-<id>">` + `LanguageProvider` +
   `<ProgressProvider course="<id>">` + course TopBar/footer, plus `page.tsx`,
   `lesson/[slug]/page.tsx`, `review/`, `certificate/`. Prefix all internal
   hrefs with `/<id>`.
3. **Theme it**: add `.theme-<id> { --accent; --accent-dim; --btn-fg; }` in
   `globals.css` (every accent in the stylesheet derives from those three).
4. **Register it**: append one entry in `src/shared/courses.ts`. Landing card,
   sync namespace (`/api/sync/<id>`) and progress storage all follow
   automatically.

## Provenance

Merged from the two standalone apps in this workspace
(`../electrical-engineering`, `../chemistry`), which remain untouched as
references. Course code was imported byte-identical apart from mechanical
rewrites (import namespaces, route prefixes, shared-module redirects); the
imported Spark tree keeps its original lint profile via a scoped override in
`eslint.config.mjs`. Standalone sync codes are not migrated (fresh
`science.db`); browser-local progress carries over by key.
