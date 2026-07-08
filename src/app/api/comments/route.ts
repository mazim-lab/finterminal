import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import {
  configured,
  addComment,
  listComments,
  deleteComment,
  bumpRateLimit,
  type StoredComment,
} from "@/lib/comments-store";
import { validateComment } from "@/lib/comment-guards";

// Comments are user data: never cache, always render fresh.
export const dynamic = "force-dynamic";

// Only these article sections accept comments. Anything else is a 400 so we
// don't spin up storage for arbitrary paths.
const PATH_RE = /^\/(personal-finance|guides|travel(\/sweet-spots)?|news)\/[a-z0-9-]+$/;

function validPath(path: unknown): path is string {
  return typeof path === "string" && PATH_RE.test(path);
}

// Client IP for rate-limit bucketing. On Cloudflare `cf-connecting-ip` is set
// by the edge to the connecting peer and is NOT client-spoofable, so we trust
// it first. On Vercel `x-real-ip` plays the same non-spoofable role, so it is
// the next fallback. `x-forwarded-for` CAN be forged by the caller (a client
// can prepend its own hop), so we only use its first entry as a fallback when
// neither trusted header is present. Last resort is a constant so the limiter
// still buckets *something*.
function clientIp(req: NextRequest): string {
  const cfIp = req.headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return "unknown";
}

// Hard cap on the request body we will even parse. The real content rules live
// in validateComment (body <= 1200 chars), but we must reject an oversized
// payload BEFORE buffering/parsing it, or a single huge POST becomes a cheap
// memory/CPU DoS. App Router route handlers impose no default body limit.
const MAX_BODY_BYTES = 16 * 1024; // 16 KB is plenty for name + a 1200-char body

// ---- GET: read comments for a path ---------------------------------------

export async function GET(req: NextRequest) {
  if (!configured()) {
    return NextResponse.json({ error: "comments are not available" }, { status: 501 });
  }
  const path = req.nextUrl.searchParams.get("path");
  if (!validPath(path)) {
    return NextResponse.json({ error: "bad path" }, { status: 400 });
  }

  // Stored newest-first; reverse to oldest-first for natural reading order.
  const stored = await listComments(path, 100);
  const comments = stored
    .map((c) => ({ id: c.id, name: c.name, body: c.body, ts: c.ts }))
    .reverse();

  return NextResponse.json({ comments });
}

// ---- POST: add a comment --------------------------------------------------

const MAX_PER_HOUR = 5;
const MAX_PER_DAY = 20;

export async function POST(req: NextRequest) {
  if (!configured()) {
    return NextResponse.json({ error: "comments are not available" }, { status: 501 });
  }

  // Reject oversized bodies before we buffer/parse them.
  const declaredLen = Number(req.headers.get("content-length") ?? "");
  if (Number.isFinite(declaredLen) && declaredLen > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "that comment is too large" }, { status: 413 });
  }

  let payload: unknown;
  try {
    const raw = await req.text();
    // Guard again in case Content-Length was missing or lied about the size.
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "that comment is too large" }, { status: 413 });
    }
    payload = raw ? JSON.parse(raw) : {};
  } catch {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }
  const data = (payload ?? {}) as Record<string, unknown>;

  if (!validPath(data.path)) {
    return NextResponse.json({ error: "bad path" }, { status: 400 });
  }

  const result = validateComment({
    path: data.path,
    name: data.name,
    body: data.body,
    website: data.website,
  });

  // Honeypot tripped: pretend all is well, store nothing.
  if (!result.ok && "silentDrop" in result) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  // Rate limit per IP: 5/hour and 20/day. Check before writing.
  const ip = clientIp(req);
  const hourCount = await bumpRateLimit(`rl:h:${ip}`, 60 * 60);
  const dayCount = await bumpRateLimit(`rl:d:${ip}`, 24 * 60 * 60);
  if (hourCount > MAX_PER_HOUR || dayCount > MAX_PER_DAY) {
    return NextResponse.json(
      { error: "you're posting a lot; give it a little while and try again" },
      { status: 429 }
    );
  }

  const comment: StoredComment = {
    id: crypto.randomUUID(),
    name: result.name,
    body: result.body, // stored raw; React escapes at render time
    ts: Date.now(),
  };
  await addComment(data.path, comment);

  return NextResponse.json(comment, { status: 201 });
}

// ---- DELETE: moderation hatch (owner only) --------------------------------

// Length-independent, constant-time token compare so a rejected DELETE leaks
// neither the token's length nor how many leading bytes matched.
function tokenMatches(provided: string | null, expected: string): boolean {
  if (!provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function DELETE(req: NextRequest) {
  const adminToken = process.env.COMMENTS_ADMIN_TOKEN;
  if (!adminToken) {
    return NextResponse.json({ error: "moderation is not configured" }, { status: 501 });
  }
  if (!tokenMatches(req.headers.get("x-admin-token"), adminToken)) {
    return NextResponse.json({ error: "not authorized" }, { status: 401 });
  }

  const path = req.nextUrl.searchParams.get("path");
  const id = req.nextUrl.searchParams.get("id");
  if (!validPath(path)) {
    return NextResponse.json({ error: "bad path" }, { status: 400 });
  }
  if (!id) {
    return NextResponse.json({ error: "missing id" }, { status: 400 });
  }

  const removed = await deleteComment(path, id);
  return NextResponse.json({ ok: removed }, { status: removed ? 200 : 404 });
}
