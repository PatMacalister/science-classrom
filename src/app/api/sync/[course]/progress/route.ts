import { NextResponse } from "next/server";
import { getDriver, progressKey, tokenId } from "@/shared/server/store";
import { isCourseId } from "@/shared/courses";
import { mergeProgress, normalizeProgress } from "@/shared/progressTypes";

const MAX_BODY = 512 * 1024; // a progress blob is a few KB; anything huge is abuse

async function auth(req: Request) {
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return null;
  const driver = await getDriver();
  const id = tokenId(token);
  return driver.hasAccount(id) ? { driver, id } : null;
}

/** Fetch the server copy of one course's progress. 401 for unknown codes. */
export async function GET(req: Request, ctx: { params: Promise<{ course: string }> }) {
  const { course } = await ctx.params;
  if (!isCourseId(course)) return NextResponse.json({ error: "unknown course" }, { status: 404 });
  const session = await auth(req);
  if (!session) return NextResponse.json({ error: "unknown sync code" }, { status: 401 });
  const stored = session.driver.getProgress(progressKey(course, session.id));
  return NextResponse.json({
    state: stored ? JSON.parse(stored.state) : null,
    updatedAt: stored?.updatedAt ?? null,
  });
}

/**
 * Save one course's progress. The server merges with its stored copy
 * (completions are never lost to a stale client) and returns the merge.
 */
export async function PUT(req: Request, ctx: { params: Promise<{ course: string }> }) {
  const { course } = await ctx.params;
  if (!isCourseId(course)) return NextResponse.json({ error: "unknown course" }, { status: 404 });
  const session = await auth(req);
  if (!session) return NextResponse.json({ error: "unknown sync code" }, { status: 401 });

  const text = await req.text();
  if (text.length > MAX_BODY) return NextResponse.json({ error: "too large" }, { status: 413 });
  let incoming;
  try {
    incoming = normalizeProgress(JSON.parse(text));
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const key = progressKey(course, session.id);
  const stored = session.driver.getProgress(key);
  const merged = stored
    ? mergeProgress(incoming, normalizeProgress(JSON.parse(stored.state)))
    : incoming;
  session.driver.putProgress(key, JSON.stringify(merged));
  return NextResponse.json({ state: merged });
}
