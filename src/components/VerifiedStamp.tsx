// VerifiedStamp — a small server-safe component that renders a mono inspection
// date in the fixed gold/ink-dim semantics from the Golden Hour Terminal spec.
//
// Freshness is evaluated at build time, which is correct for this site's static
// generation model: the stamp on a deployed page reflects the state at the last
// build, not at read time. That matches the update-playbook cadence and means
// no client JS is needed.
//
// Props:
//   date        — ISO or human-readable date string (e.g. "2026-07-04" or "Jul 4 2026")
//   cadenceDays — how many days before the stamp fades to the stale state (default 45)
//   verb        — override the fresh verb, e.g. "CHECKED" instead of "VERIFIED"
//
// Fresh  → gold  + uppercase mono: "✓ VERIFIED JUL 04 2026"
// Stale  → ink-dim + lowercase:    "last checked jul 04 2026"
// Bad date → treated as stale (renders dim with the raw string)

function formatDate(d: Date): string {
  // MMM DD YYYY, zero-padded day, uppercase month abbreviation.
  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
  ];
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${months[d.getUTCMonth()]} ${day} ${d.getUTCFullYear()}`;
}

interface VerifiedStampProps {
  date: string;
  cadenceDays?: number;
  verb?: string;
}

export function VerifiedStamp({ date, cadenceDays = 45, verb = "VERIFIED" }: VerifiedStampProps) {
  const parsed = new Date(date);
  const isValid = !isNaN(parsed.getTime());

  // Age check against build time.
  const now = new Date();
  const ageMs = now.getTime() - (isValid ? parsed.getTime() : 0);
  const ageDays = ageMs / (1000 * 60 * 60 * 24);
  const isFresh = isValid && ageDays <= cadenceDays;

  if (isFresh) {
    const label = `✓ ${verb} ${formatDate(parsed)}`;
    return (
      <span className="verified-stamp verified-stamp--fresh" aria-label={`Verified on ${formatDate(parsed)}`}>
        {label}
      </span>
    );
  }

  // Stale or unparseable: dim, lowercase, human wording.
  const displayDate = isValid ? formatDate(parsed).toLowerCase() : date;
  const label = `last checked ${displayDate}`;
  return (
    <span className="verified-stamp verified-stamp--stale" aria-label={label}>
      {label}
    </span>
  );
}
