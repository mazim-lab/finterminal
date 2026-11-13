// Small date helpers shared by the News and Deals pages. The data files store
// human dates like "Jun 30, 2026"; these turn them into ISO days so we can
// group by month and compute ages without relying on Date parsing quirks.

const MONTHS: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, sept: 9, oct: 10, nov: 11, dec: 12,
};
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Jun 30, 2026" -> "2026-06-30", or null if the string does not look like that. */
export function humanToISO(s: string): string | null {
  const m = /^\s*([A-Za-z]{3,9})\.?\s+(\d{1,2}),?\s+(\d{4})\s*$/.exec(s);
  if (!m) return null;
  const mo = MONTHS[m[1].slice(0, 4).toLowerCase()] ?? MONTHS[m[1].slice(0, 3).toLowerCase()];
  const day = Number(m[2]);
  if (!mo || day < 1 || day > 31) return null;
  return `${m[3]}-${String(mo).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** "2026-06-30" -> "Jun 30, 2026". */
export function isoToHuman(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTH_SHORT[m - 1]} ${d}, ${y}`;
}

/** "Jun 30, 2026" -> "June 2026" (falls back to the raw string). */
export function monthLabel(s: string): string {
  const iso = humanToISO(s);
  if (!iso) return s;
  const [y, m] = iso.split("-").map(Number);
  return `${MONTH_NAMES[m - 1]} ${y}`;
}

/** Whole days from ISO day a to ISO day b (b - a). */
export function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  return Math.round((Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 86400000);
}

/** A friendly age like "today", "3 days ago", "5 weeks ago", "2 months ago". */
export function ageLabel(days: number): string {
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 14) return `${days} days ago`;
  if (days < 60) return `${Math.round(days / 7)} weeks ago`;
  const months = Math.round(days / 30);
  return months <= 1 ? "a month ago" : `${months} months ago`;
}
