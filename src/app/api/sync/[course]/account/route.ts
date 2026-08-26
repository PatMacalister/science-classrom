import { NextResponse } from "next/server";
import { getDriver, newToken, tokenId } from "@/shared/server/store";
import { isCourseId } from "@/shared/courses";

/**
 * Create a fresh sync account and hand back its (only-ever-shown-once) code.
 * Accounts are global: the same code works for every course's progress.
 */
export async function POST(_req: Request, ctx: { params: Promise<{ course: string }> }) {
  const { course } = await ctx.params;
  if (!isCourseId(course)) return NextResponse.json({ error: "unknown course" }, { status: 404 });
  const driver = await getDriver();
  const token = newToken();
  driver.createAccount(tokenId(token));
  return NextResponse.json({ token });
}
