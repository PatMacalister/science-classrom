# Placeholders

Deliberate seams left for later — the app is fully functional without them.

## Hosted database driver (deployment)

`src/shared/server/store.ts` keeps sync accounts and per-course progress in
`./data/science.db` (Node's built-in SQLite) with a JSON-file fallback. That
persists on any long-running host (VPS, Docker with a volume, `next start` on
a desktop). On **serverless** hosts (Vercel/Netlify) the local filesystem does
not persist, so a hosted DB (Neon/Turso/Supabase) is needed. The driver seam
in `getDriver()` reads `process.env.DATABASE_URL` and currently only logs a
warning that no hosted driver is configured — implement a Postgres/libSQL
driver there when a `DATABASE_URL` exists.

## German lesson bodies (Catalyst)

Spark is fully bilingual (interface + all lesson bodies via its
`lib/curriculum/de/` overlay). Catalyst's interface and periodic table are
bilingual, but its lesson Theory/quiz/problem texts are English; DE mode shows
a notice banner. To translate, follow Spark's pattern: per-lesson override
modules merged by a localize layer.

## Landing-page lesson counts

`src/shared/courses.ts` hardcodes `lessonsTotal`/`unitsTotal` per course so the
landing page never imports a course's full curriculum bundle. Update the
numbers when a curriculum grows (or wire up a small build-time script that
generates them).
