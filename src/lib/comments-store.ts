// ---------------------------------------------------------------------------
// Anonymous comments storage adapter.
//
// SETUP FOR THE OWNER (read me):
//   This module picks a backend at runtime. To turn comments ON in production,
//   connect an Upstash Redis database from the Vercel Marketplace. Vercel's
//   Upstash integration injects these env vars automatically:
//
//       KV_REST_API_URL            (Upstash REST endpoint)
//       KV_REST_API_TOKEN          (Upstash REST token)
//
//   As a fallback we also accept the raw Upstash names if you wire them by hand:
//
//       UPSTASH_REDIS_REST_URL
//       UPSTASH_REDIS_REST_TOKEN
//
//   One more env var, optional but recommended, unlocks the moderation hatch
//   (the DELETE endpoint that removes a single comment by id):
//
//       COMMENTS_ADMIN_TOKEN       (any long random string you keep private)
//
//   Until a Redis URL/token pair exists, in PRODUCTION the whole comments
//   feature degrades to invisible: the API returns 501 and the UI renders
//   nothing. In local development (NODE_ENV !== "production") an in-memory
//   Map backend turns on automatically so you can QA with zero setup. That
//   memory store is per-process and resets on reload; it is never used in prod.
// ---------------------------------------------------------------------------

export type StoredComment = {
  id: string;
  name: string;
  body: string;
  ts: number;
};

// ---- backend selection ----------------------------------------------------

function redisUrl(): string | undefined {
  return process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || undefined;
}
function redisToken(): string | undefined {
  return process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || undefined;
}

function hasRedis(): boolean {
  return Boolean(redisUrl() && redisToken());
}

function devFallbackActive(): boolean {
  return process.env.NODE_ENV !== "production";
}

/**
 * True when there is a usable backend: a real Redis in any environment, or the
 * in-memory dev fallback outside production. When this is false the API layer
 * returns 501 and the UI hides itself entirely.
 */
export function configured(): boolean {
  return hasRedis() || devFallbackActive();
}

// ---- keys -----------------------------------------------------------------

const listKey = (path: string) => `comments:${path}`;

// ---- Upstash REST transport ----------------------------------------------
//
// Upstash's REST API accepts a command as a JSON array of strings, e.g.
// ["LPUSH", key, value]. We POST each command to the base URL. No SDK, no new
// npm dependency, just fetch.

type UpstashResult<T> = { result: T };

async function redisCmd<T>(command: (string | number)[]): Promise<T> {
  const url = redisUrl()!;
  const token = redisToken()!;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command.map((c) => String(c))),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`upstash ${command[0]} failed: ${res.status}`);
  }
  const json = (await res.json()) as UpstashResult<T>;
  return json.result;
}

// ---- in-memory dev fallback ----------------------------------------------
//
// Keyed exactly like Redis would be. Lists are newest-first (we unshift) to
// mirror LPUSH semantics. Rate-limit counters live in the same map namespace.

type MemEntry = { list?: string[]; counter?: number; expiresAt?: number };
const mem: Map<string, MemEntry> = new Map();

function memGet(key: string): MemEntry {
  const e = mem.get(key);
  if (e && e.expiresAt && e.expiresAt <= Date.now()) {
    mem.delete(key);
    return {};
  }
  return e ?? {};
}

// ---- public API -----------------------------------------------------------

/**
 * Push a comment onto the front of the list for a path (newest first).
 */
export async function addComment(path: string, comment: StoredComment): Promise<void> {
  const key = listKey(path);
  const payload = JSON.stringify(comment);
  if (hasRedis()) {
    await redisCmd(["LPUSH", key, payload]);
    return;
  }
  const entry = memGet(key);
  entry.list = [payload, ...(entry.list ?? [])];
  mem.set(key, entry);
}

/**
 * Read up to `limit` comments for a path. Returned newest-first (storage order);
 * the API layer reverses for display. Bad/legacy JSON rows are skipped.
 */
export async function listComments(path: string, limit = 100): Promise<StoredComment[]> {
  const key = listKey(path);
  let raw: string[];
  if (hasRedis()) {
    raw = (await redisCmd<string[]>(["LRANGE", key, 0, limit - 1])) ?? [];
  } else {
    raw = (memGet(key).list ?? []).slice(0, limit);
  }
  const out: StoredComment[] = [];
  for (const s of raw) {
    try {
      const c = JSON.parse(s) as StoredComment;
      if (c && typeof c.id === "string" && typeof c.body === "string") out.push(c);
    } catch {
      // skip unparseable rows
    }
  }
  return out;
}

/**
 * Delete a single comment by id from a path's list (moderation hatch).
 * Returns true if something was removed.
 */
export async function deleteComment(path: string, id: string): Promise<boolean> {
  const key = listKey(path);
  if (hasRedis()) {
    // Find the exact stored member, then LREM it. We scan the recent window,
    // which is plenty for a small comment list.
    const raw = (await redisCmd<string[]>(["LRANGE", key, 0, 999])) ?? [];
    const target = raw.find((s) => {
      try {
        return (JSON.parse(s) as StoredComment).id === id;
      } catch {
        return false;
      }
    });
    if (!target) return false;
    const removed = await redisCmd<number>(["LREM", key, 1, target]);
    return removed > 0;
  }
  const entry = memGet(key);
  if (!entry.list) return false;
  const before = entry.list.length;
  entry.list = entry.list.filter((s) => {
    try {
      return (JSON.parse(s) as StoredComment).id !== id;
    } catch {
      return true;
    }
  });
  mem.set(key, entry);
  return entry.list.length < before;
}

/**
 * Increment a rate-limit counter and (on first hit) set its TTL in seconds.
 * Returns the counter's new value so callers can compare against a cap.
 */
export async function bumpRateLimit(key: string, windowSeconds: number): Promise<number> {
  if (hasRedis()) {
    const n = await redisCmd<number>(["INCR", key]);
    if (n === 1) {
      await redisCmd(["EXPIRE", key, windowSeconds]);
    }
    return n;
  }
  const entry = memGet(key);
  const n = (entry.counter ?? 0) + 1;
  entry.counter = n;
  if (n === 1) entry.expiresAt = Date.now() + windowSeconds * 1000;
  mem.set(key, entry);
  return n;
}
