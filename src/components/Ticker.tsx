import Link from "next/link";
import { POINT_VALUATIONS, VALUATION_SOURCE } from "@/data/point-valuations";

// Point-value strip (home page pantry). These are FinTerminal's own baseline
// estimates (cents per point), not a live market feed, so they render as
// plain static text and link to the methodology. Values come straight from
// point-valuations.ts, so the strip can never drift from the method page.
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatAsOf(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const m = /^(\d{4})-(\d{2})$/.exec(raw);
  if (!m) return null;
  const month = MONTHS[Number(m[2]) - 1];
  return month ? `${month} ${m[1]}` : null;
}
const AS_OF = formatAsOf(VALUATION_SOURCE.asOf);

const FEEDS = [
  { label: "Aeroplan", key: "aeroplan" },
  { label: "Amex MR", key: "membership rewards" },
];

export function Ticker() {
  const items = FEEDS.map((f) => ({ ...f, v: POINT_VALUATIONS[f.key]?.baseline })).filter(
    (f): f is { label: string; key: string; v: number } => typeof f.v === "number",
  );
  if (!items.length) return null;
  return (
    <Link
      className="pv-strip"
      href="/how-we-value-points"
      title="Our baseline point values. How we value points"
    >
      {items.map((f, i) => (
        <span key={f.key}>
          {i > 0 && <span aria-hidden="true">· </span>}
          {f.label} <b>{f.v.toFixed(2)}¢</b>
        </span>
      ))}
      {AS_OF && <span>({AS_OF})</span>}
    </Link>
  );
}
