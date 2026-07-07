"use client";

import { useEffect, useState } from "react";

// Key that stores the epoch-ms timestamp of the reader's PREVIOUS visit. We read
// the prior value on mount, decide freshness against it, then stamp "now" so the
// next visit compares against this one.
const LAST_VISIT_KEY = "ft-last-visit";

// Read + advance the last-visit marker exactly once per page load. Returns the
// PREVIOUS visit time (ms), or null on the first-ever visit / unavailable storage.
// Memoised at module scope so every FreshDot on the page shares one decision and
// the marker is only written once, not once per chip.
let priorVisit: number | null | undefined;
function readAndAdvanceLastVisit(): number | null {
  if (priorVisit !== undefined) return priorVisit;
  try {
    const raw = window.localStorage.getItem(LAST_VISIT_KEY);
    const parsed = raw === null ? NaN : Number(raw);
    priorVisit = Number.isFinite(parsed) ? parsed : null;
    window.localStorage.setItem(LAST_VISIT_KEY, String(Date.now()));
  } catch {
    // Private mode / storage disabled: never a chip, never a throw.
    priorVisit = null;
  }
  return priorVisit;
}

// Parse a day-level date string ("Jul 7, 2026") defensively. Returns ms or null.
function parseDay(date: string | undefined): number | null {
  if (!date) return null;
  const t = new Date(date).getTime();
  return Number.isNaN(t) ? null : t;
}

/**
 * A tiny mono "NEW" chip shown beside returning-reader items that are dated after
 * their previous visit. Renders nothing on the server and until mounted (so there
 * is no hydration mismatch), nothing without JS, and nothing on a first-ever
 * visit or when the item date can't be parsed.
 */
export function FreshDot({ date }: { date?: string }) {
  const [fresh, setFresh] = useState(false);

  useEffect(() => {
    const prior = readAndAdvanceLastVisit();
    if (prior === null) return; // first visit: nothing is "new" yet
    const itemMs = parseDay(date);
    if (itemMs === null) return; // unparseable: stay quiet
    if (itemMs > prior) setFresh(true);
  }, [date]);

  if (!fresh) return null;
  return (
    <span className="freshchip" aria-label="new since your last visit">NEW</span>
  );
}
