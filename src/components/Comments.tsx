"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

// Anonymous comments for an article. No sign-up, no third parties.
//
// The section renders NOTHING until it has mounted AND a GET has succeeded.
// A 501 (comments backend not connected) hides the whole block, so before the
// owner wires up Redis, production shows no comments UI at all.

type Comment = { id: string; name: string; body: string; ts: number };

const MIN_BODY = 3;
const MAX_BODY = 1200;
const MAX_NAME = 40;

// Loose relative time: "just now", "3h ago", then a plain date once it's old.
function relTime(ts: number): string {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day}d ago`;
  return new Date(ts).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });
}

export function Comments({ path }: { path: string }) {
  const [ready, setReady] = useState(false); // GET succeeded → show the block
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [posting, setPosting] = useState(false);
  const [note, setNote] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const honeypot = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`/api/comments?path=${encodeURIComponent(path)}`, { cache: "no-store" });
        if (!res.ok) return; // 501/400 etc → stay hidden
        const json = (await res.json()) as { comments?: Comment[] };
        if (!alive) return;
        setComments(Array.isArray(json.comments) ? json.comments : []);
        setReady(true);
      } catch {
        // network error → stay hidden, nothing to show
      }
    })();
    return () => {
      alive = false;
    };
  }, [path]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNote(null);

    // Client-side mirror of the server length checks, for fast feedback.
    const trimmed = body.trim();
    if (trimmed.length < MIN_BODY) {
      setNote({ kind: "err", text: "Say a little more first." });
      return;
    }
    if (trimmed.length > MAX_BODY) {
      setNote({ kind: "err", text: `Keep it under ${MAX_BODY} characters.` });
      return;
    }

    setPosting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path,
          name: name.trim(),
          body: trimmed,
          website: honeypot.current?.value ?? "",
        }),
      });
      const json = (await res.json().catch(() => ({}))) as Partial<Comment> & { error?: string };
      if (res.ok && json && "id" in json && json.id) {
        // Server returns the stored comment; append to the end (oldest→newest).
        setComments((prev) => [...prev, json as Comment]);
        setBody("");
        setNote({ kind: "ok", text: "Posted. Thanks for adding to the thread." });
      } else {
        setNote({ kind: "err", text: json.error || "Could not post that. Try again shortly." });
      }
    } catch {
      setNote({ kind: "err", text: "Could not post that. Try again shortly." });
    } finally {
      setPosting(false);
    }
  }

  if (!ready) return null;

  const count = comments.length;
  const remaining = MAX_BODY - body.length;

  return (
    <section className="cmts" aria-label="Comments">
      <div className="cmts-head">
        FROM THE GROUND · {count} {count === 1 ? "comment" : "comments"}
      </div>

      {count > 0 ? (
        <ul className="cmts-list">
          {comments.map((c) => (
            <li key={c.id} className="cmt">
              <div className="cmt-meta">
                <span className="cmt-name">{c.name}</span>
                <span className="cmt-sep">·</span>
                <span className="cmt-time">{relTime(c.ts)}</span>
              </div>
              <p className="cmt-body">{c.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="cmts-empty">No comments yet. Be the first to add something useful.</p>
      )}

      <form className="cmts-form" onSubmit={onSubmit}>
        <input
          className="finput cmts-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={MAX_NAME}
          placeholder="Name (optional)"
          aria-label="Your name, optional"
          autoComplete="off"
        />

        <textarea
          className="finput ftext cmts-text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={MAX_BODY}
          placeholder="Say something useful. Be kind. No links."
          aria-label="Your comment"
          required
        />

        {/* Honeypot: hidden from humans, catnip for bots. */}
        <input
          ref={honeypot}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="cmts-hp"
        />

        <div className="cmts-actions">
          <span className={`cmts-count${remaining < 0 ? " over" : ""}`}>{remaining} left</span>
          <button className="fbtn cmts-submit" type="submit" disabled={posting}>
            {posting ? "Posting…" : "Post comment"}
          </button>
        </div>

        {note && (
          <p className={note.kind === "ok" ? "cmts-ok" : "cmts-err"} role="status">
            {note.text}
          </p>
        )}
      </form>
    </section>
  );
}
