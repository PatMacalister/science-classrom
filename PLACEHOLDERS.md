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

## (resolved) German lesson bodies

Both courses are now fully bilingual — interface, all lesson bodies and the
canvas labels. The fallback machinery stays in place: any future lesson added
without a `curriculum/de/` entry automatically shows the English body under a
notice banner, so content can be written first and translated later.

## Landing-page lesson counts

`src/shared/courses.ts` hardcodes `lessonsTotal`/`unitsTotal` per course so the
landing page never imports a course's full curriculum bundle. Update the
numbers when a curriculum grows (or wire up a small build-time script that
generates them).
