/**
 * Progress data model + merge logic, shared by the browser client and the
 * sync API (keep this file free of "use client" and server-only imports).
 */

export interface QuizRecord {
  score: number;
  total: number;
  passed: boolean;
  ts: number;
  /** Indices of questions answered wrong on the latest attempt (feeds /review). */
  missed?: number[];
}

/** Leitner-box state for one quiz question ("slug:questionIndex"). */
export interface ReviewItem {
  /** 0 = just missed … 3 = graduated (removed from the deck). */
  box: number;
  /** Epoch ms when this card is due again. */
  due: number;
  /** Epoch ms of the last answer (for merge conflict resolution). */
  last: number;
}

export interface ProgressState {
  quiz: Record<string, QuizRecord>;
  checks: Record<string, boolean>;
  review: Record<string, ReviewItem>;
  profile: { name?: string };
}

export const EMPTY_PROGRESS: ProgressState = { quiz: {}, checks: {}, review: {}, profile: {} };

/** Coerce anything (old blobs, imports, API payloads) into a valid state. */
export function normalizeProgress(raw: unknown): ProgressState {
  const p = (raw ?? {}) as Partial<ProgressState>;
  return {
    quiz: typeof p.quiz === "object" && p.quiz ? p.quiz : {},
    checks: typeof p.checks === "object" && p.checks ? p.checks : {},
    review: typeof p.review === "object" && p.review ? p.review : {},
    profile: typeof p.profile === "object" && p.profile ? p.profile : {},
  };
}

function betterQuiz(a: QuizRecord, b: QuizRecord): QuizRecord {
  if (a.passed !== b.passed) return a.passed ? a : b;
  if (a.score !== b.score) return a.score > b.score ? a : b;
  return (a.ts ?? 0) >= (b.ts ?? 0) ? a : b;
}

/**
 * Merge two progress states. Completions are never lost: passed quizzes and
 * ticked checklist items survive from either side. `local` wins ties and
 * profile preferences.
 */
export function mergeProgress(local: ProgressState, remote: ProgressState): ProgressState {
  const out: ProgressState = {
    quiz: { ...remote.quiz },
    checks: { ...remote.checks },
    review: { ...remote.review },
    profile: { ...remote.profile, ...stripEmpty(local.profile) },
  };
  for (const [slug, rec] of Object.entries(local.quiz)) {
    out.quiz[slug] = out.quiz[slug] ? betterQuiz(rec, out.quiz[slug]) : rec;
  }
  for (const [key, v] of Object.entries(local.checks)) {
    out.checks[key] = out.checks[key] || v;
  }
  for (const [key, item] of Object.entries(local.review)) {
    const other = out.review[key];
    out.review[key] = !other || item.last >= other.last ? item : other;
  }
  return out;
}

function stripEmpty(profile: { name?: string }): { name?: string } {
  return profile.name ? { name: profile.name } : {};
}
