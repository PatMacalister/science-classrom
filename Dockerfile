# syntax=docker/dockerfile:1

# Next.js 16 requires Node >= 20.9; 22 LTS is the safe default.
ARG NODE_VERSION=22-alpine

FROM node:${NODE_VERSION} AS base
# Next's native binaries (SWC/Turbopack) want glibc shims on musl.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# --- deps -------------------------------------------------------------
# Its own stage so this layer is only rebuilt when the lockfile changes.
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# --- builder ----------------------------------------------------------
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Fonts are self-hosted (src/app/fonts) — the build needs no network.
RUN npm run build

# --- runner -----------------------------------------------------------
FROM base AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs \
 && adduser -u 1001 -S nextjs -G nodejs

# standalone/ carries server.js plus only the traced node_modules.
# public/ and .next/static are not copied into it by the build, so they
# come over separately — server.js serves them once they are in place.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Sync/progress database lives here (node:sqlite). Pre-create it owned by the
# app user so a named volume mounted at /app/data inherits writable ownership.
RUN mkdir -p /app/data && chown nextjs:nodejs /app/data

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider "http://127.0.0.1:${PORT}/" || exit 1

CMD ["node", "server.js"]
