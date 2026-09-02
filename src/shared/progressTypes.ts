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

/** One attempt at the cross-unit final exam. */
export interface ExamRecord {
  score: number;
  total: number;
  passed: boolean;
  ts: number;
}

export interface ProgressState {
  quiz: Record<string, QuizRecord>;
  checks: Record<string, boolean>;
  review: Record<string, ReviewItem>;
  profile: { name?: string };
  /** Cross-unit final exam: best attempt so far + how many were taken. */
  exam: { best?: ExamRecord; attempts: number };
}

export const EMPTY_PROGRESS: ProgressState = {
  quiz: {},
  checks: {},
  review: {},
  profile: {},
  exam: { attempts: 0 },
};

/** Coerce anything (old blobs, imports, API payloads) into a valid state. */
export function normalizeProgress(raw: unknown): ProgressState {
  const p = (raw ?? {}) as Partial<ProgressState>;
  const e = (typeof p.exam === "object" && p.exam ? p.exam : {}) as Partial<ProgressState["exam"]>;
  return {
    quiz: typeof p.quiz === "object" && p.quiz ? p.quiz : {},
    checks: typeof p.checks === "object" && p.checks ? p.checks : {},
    review: typeof p.review === "object" && p.review ? p.review : {},
    profile: typeof p.profile === "object" && p.profile ? p.profile : {},
    exam: {
      attempts: typeof e.attempts === "number" && e.attempts > 0 ? e.attempts : 0,
      ...(typeof e.best === "object" && e.best ? { best: e.best } : {}),
    },
  };
}

function betterQuiz(a: QuizRecord, b: QuizRecord): QuizRecord {
  if (a.passed !== b.passed) return a.passed ? a : b;
  if (a.score !== b.score) return a.score > b.score ? a : b;
  return (a.ts ?? 0) >= (b.ts ?? 0) ? a : b;
}

/** The better of two exam attempts: passed beats failed, then ratio, then recency. `a` wins ties. */
export function betterExam(a: ExamRecord, b: ExamRecord): ExamRecord {
  if (a.passed !== b.passed) return a.passed ? a : b;
  const ra = a.total > 0 ? a.score / a.total : 0;
  const rb = b.total > 0 ? b.score / b.total : 0;
  if (ra !== rb) return ra > rb ? a : b;
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
    exam: { attempts: 0 }, // filled in below
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
  const bests = [local.exam.best, remote.exam.best].filter((b): b is ExamRecord => !!b);
  out.exam = {
    // max, not sum: the two sides usually share history, so adding would double-count
    attempts: Math.max(local.exam.attempts, remote.exam.attempts),
    ...(bests.length ? { best: bests.length === 2 ? betterExam(bests[0], bests[1]) : bests[0] } : {}),
  };
  return out;
}

function stripEmpty(profile: { name?: string }): { name?: string } {
  return profile.name ? { name: profile.name } : {};
}
