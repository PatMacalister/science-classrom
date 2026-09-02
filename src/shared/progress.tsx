"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  EMPTY_PROGRESS,
  betterExam,
  mergeProgress,
  normalizeProgress,
  type ExamRecord,
  type ProgressState,
  type QuizRecord,
  type ReviewItem,
} from "./progressTypes";

export type { ExamRecord, ProgressState, QuizRecord, ReviewItem };

export type SyncStatus = "off" | "syncing" | "synced" | "error";

export interface ProgressStore {
  /** The course id this store is namespaced to (route segment, sync API). */
  course: string;
  /** False until the persisted state has been loaded (avoids hydration flicker). */
  ready: boolean;
  state: ProgressState;
  isComplete(lessonSlug: string): boolean;
  quizRecord(lessonSlug: string): QuizRecord | undefined;
  recordQuiz(lessonSlug: string, score: number, total: number, missed?: number[]): void;
  markComplete(lessonSlug: string): void;
  getCheck(key: string): boolean;
  setCheck(key: string, value: boolean): void;
  setName(name: string): void;
  gradeReview(key: string, correct: boolean): void;
  recordExam(score: number, total: number): void;
  reset(): void;
  /* ---- sync & backup ---- */
  syncStatus: SyncStatus;
  /** The active sync code, if sync is enabled on this device. */
  syncCode: string | null;
  /** Create a new sync account for this device's progress. Returns the code. */
  enableSync(): Promise<string>;
  /** Adopt an existing code from another device; merges both sides. */
  linkWithCode(code: string): Promise<void>;
  /** Forget the code on this device (the server copy stays). */
  disableSync(): void;
  exportJson(): void;
  importJson(text: string): void;
}

export const PASS_THRESHOLD = 0.75;

/*
 * One provider serves every course: the course id namespaces the
 * localStorage keys (matching what the standalone apps used, so existing
 * browser progress carries over) and the sync API path. Sync codes are
 * account-global on the server — the same code syncs all courses.
 *
 * localStorage is the offline-first cache; when a sync code is present the
 * state is additionally pushed to /api/sync/<course> (debounced) and merged
 * from the server on load. All server communication lives in this file.
 */

function loadState(storageKey: string): ProgressState {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? normalizeProgress(JSON.parse(raw)) : EMPTY_PROGRESS;
  } catch {
    return EMPTY_PROGRESS;
  }
}

function saveState(storageKey: string, state: ProgressState) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    /* storage unavailable (private mode etc.) — progress just won't persist */
  }
}

const ProgressContext = createContext<ProgressStore | null>(null);

export function ProgressProvider({ course, children }: { course: string; children: ReactNode }) {
  // static per mount (each course layout mounts its own provider)
  const storageKey = `${course}-academy-progress-v1`;
  const syncKey = `${course}-academy-sync-code`;
  const apiBase = `/api/sync/${course}`;

  const [state, setState] = useState<ProgressState>(EMPTY_PROGRESS);
  const [ready, setReady] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("off");
  const [syncCode, setSyncCode] = useState<string | null>(null);
  const loadedRef = useRef(false);
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const codeRef = useRef<string | null>(null);

  const pushToServer = useCallback(
    async (snapshot: ProgressState) => {
      const code = codeRef.current;
      if (!code) return;
      setSyncStatus("syncing");
      try {
        const res = await fetch(`${apiBase}/progress`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${code}`, "Content-Type": "application/json" },
          body: JSON.stringify(snapshot),
        });
        if (!res.ok) throw new Error(String(res.status));
        const { state: merged } = await res.json();
        // adopt the server merge only if it actually added something new
        setState((cur) => {
          const combined = mergeProgress(cur, normalizeProgress(merged));
          return JSON.stringify(combined) === JSON.stringify(cur) ? cur : combined;
        });
        setSyncStatus("synced");
      } catch {
        setSyncStatus("error");
      }
    },
    [apiBase]
  );

  /*
   * Initial load: local first, then merge the server copy if sync is on.
   *
   * loadedRef makes this once-only: React StrictMode (dev) runs mount effects
   * twice, and a second loadState() here would read storage AFTER the save
   * effect below may have touched it. Combined with gating the save effect on
   * the committed `ready` state, load and save can no longer race.
   */
  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    const local = loadState(storageKey);
    setState(local);
    setReady(true);
    let code: string | null = null;
    try {
      code = localStorage.getItem(syncKey);
    } catch {}
    if (code) {
      codeRef.current = code;
      setSyncCode(code);
      setSyncStatus("syncing");
      fetch(`${apiBase}/progress`, { headers: { Authorization: `Bearer ${code}` } })
        .then(async (res) => {
          if (res.status === 401) {
            // account vanished server-side — drop the dead code, keep local data
            codeRef.current = null;
            setSyncCode(null);
            setSyncStatus("off");
            try {
              localStorage.removeItem(syncKey);
            } catch {}
            return;
          }
          if (!res.ok) throw new Error(String(res.status));
          const { state: remote } = await res.json();
          if (remote) setState((cur) => mergeProgress(cur, normalizeProgress(remote)));
          setSyncStatus("synced");
        })
        .catch(() => setSyncStatus("error"));
    }
  }, [storageKey, syncKey, apiBase]);

  /* persist locally + schedule a debounced push on every change */
  useEffect(() => {
    if (!ready) return; // committed state only — see the load effect's comment
    saveState(storageKey, state);
    if (codeRef.current) {
      if (pushTimer.current) clearTimeout(pushTimer.current);
      pushTimer.current = setTimeout(() => pushToServer(state), 1500);
    }
  }, [ready, state, storageKey, pushToServer]);

  const recordQuiz = useCallback((slug: string, score: number, total: number, missed?: number[]) => {
    setState((s) => ({
      ...s,
      quiz: {
        ...s.quiz,
        [slug]: {
          score,
          total,
          passed: total > 0 && score / total >= PASS_THRESHOLD,
          ts: Date.now(),
          missed,
        },
      },
    }));
  }, []);

  const markComplete = useCallback((slug: string) => {
    setState((s) => ({
      ...s,
      quiz: { ...s.quiz, [slug]: { score: 1, total: 1, passed: true, ts: Date.now() } },
    }));
  }, []);

  const setCheck = useCallback((key: string, value: boolean) => {
    setState((s) => ({ ...s, checks: { ...s.checks, [key]: value } }));
  }, []);

  const setName = useCallback((name: string) => {
    setState((s) => ({ ...s, profile: { ...s.profile, name } }));
  }, []);

  /** Leitner grading: correct promotes with growing delay; wrong resets. */
  const gradeReview = useCallback((key: string, correct: boolean) => {
    const DELAYS_MS = [10 * 60_000, 24 * 3_600_000, 3 * 24 * 3_600_000]; // box 0→1→2 spacing
    setState((s) => {
      const cur = s.review[key] ?? { box: 0, due: 0, last: 0 };
      const box = correct ? Math.min(3, cur.box + 1) : 0;
      const due = Date.now() + (correct ? DELAYS_MS[Math.min(box, 2)] : DELAYS_MS[0]);
      return { ...s, review: { ...s.review, [key]: { box, due, last: Date.now() } } };
    });
  }, []);

  const recordExam = useCallback((score: number, total: number) => {
    setState((s) => {
      const rec: ExamRecord = {
        score,
        total,
        passed: total > 0 && score / total >= PASS_THRESHOLD,
        ts: Date.now(),
      };
      return {
        ...s,
        exam: { attempts: s.exam.attempts + 1, best: s.exam.best ? betterExam(rec, s.exam.best) : rec },
      };
    });
  }, []);

  const reset = useCallback(() => setState(EMPTY_PROGRESS), []);

  const enableSync = useCallback(async (): Promise<string> => {
    const res = await fetch(`${apiBase}/account`, { method: "POST" });
    if (!res.ok) throw new Error("could not create a sync account");
    const { token } = await res.json();
    codeRef.current = token;
    setSyncCode(token);
    try {
      localStorage.setItem(syncKey, token);
    } catch {}
    setState((cur) => {
      void pushToServer(cur);
      return cur;
    });
    return token;
  }, [apiBase, syncKey, pushToServer]);

  const linkWithCode = useCallback(
    async (code: string) => {
      const trimmed = code.trim().toLowerCase();
      const res = await fetch(`${apiBase}/progress`, {
        headers: { Authorization: `Bearer ${trimmed}` },
      });
      if (res.status === 401) throw new Error("That code isn't known to this server.");
      if (!res.ok) throw new Error("The sync server didn't answer — try again.");
      const { state: remote } = await res.json();
      codeRef.current = trimmed;
      setSyncCode(trimmed);
      try {
        localStorage.setItem(syncKey, trimmed);
      } catch {}
      setState((cur) => {
        const merged = remote ? mergeProgress(cur, normalizeProgress(remote)) : cur;
        void pushToServer(merged);
        return merged;
      });
      setSyncStatus("synced");
    },
    [apiBase, syncKey, pushToServer]
  );

  /*
   * Scan-to-link: a QR on another device encodes …/<course>#sync=<code>.
   * On arrival, adopt the code (merging both sides) and scrub it from the
   * URL — the hash never reaches the server, and shouldn't linger in the
   * address bar either.
   */
  const hashChecked = useRef(false);
  useEffect(() => {
    if (!ready || hashChecked.current) return;
    hashChecked.current = true;
    const m = window.location.hash.match(/^#sync=([a-z0-9-]{6,})$/i);
    if (!m) return;
    const code = m[1].toLowerCase();
    history.replaceState(null, "", window.location.pathname + window.location.search);
    if (codeRef.current === code) return;
    void linkWithCode(code).catch(() => setSyncStatus("error"));
  }, [ready, linkWithCode]);

  const disableSync = useCallback(() => {
    codeRef.current = null;
    setSyncCode(null);
    setSyncStatus("off");
    try {
      localStorage.removeItem(syncKey);
    } catch {}
  }, [syncKey]);

  const exportJson = useCallback(() => {
    setState((cur) => {
      const blob = new Blob([JSON.stringify(cur, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${course}-academy-progress-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      return cur;
    });
  }, [course]);

  const importJson = useCallback((text: string) => {
    const incoming = normalizeProgress(JSON.parse(text)); // throws on bad JSON — caller shows the error
    setState((cur) => mergeProgress(incoming, cur));
  }, []);

  const store = useMemo<ProgressStore>(
    () => ({
      course,
      ready,
      state,
      isComplete: (slug) => !!state.quiz[slug]?.passed,
      quizRecord: (slug) => state.quiz[slug],
      recordQuiz,
      markComplete,
      getCheck: (key) => !!state.checks[key],
      setCheck,
      setName,
      gradeReview,
      recordExam,
      reset,
      syncStatus,
      syncCode,
      enableSync,
      linkWithCode,
      disableSync,
      exportJson,
      importJson,
    }),
    [
      course,
      ready,
      state,
      recordQuiz,
      markComplete,
      setCheck,
      setName,
      gradeReview,
      recordExam,
      reset,
      syncStatus,
      syncCode,
      enableSync,
      linkWithCode,
      disableSync,
      exportJson,
      importJson,
    ]
  );

  return <ProgressContext.Provider value={store}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressStore {
  const store = useContext(ProgressContext);
  if (!store) throw new Error("useProgress must be used inside <ProgressProvider>");
  return store;
}
