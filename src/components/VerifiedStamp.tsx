// VerifiedStamp: a small server-safe component that renders an inspection date
// as a soft pill: green when fresh, amber when it is past its cadence.
//
// Freshness is evaluated at build time, which is correct for this site's static
// generation model: the stamp on a deployed page reflects the state at the last
// build, not at read time. That matches the update-playbook cadence and means
// no client JS is needed.
//
// Props:
//   date        : ISO or human-readable date string (e.g. "2026-07-04" or "Jul 4 2026")
//   cadenceDays : how many days before the stamp fades to the stale state (default 45)
//   verb        : override the fresh verb, e.g. "CHECKED" instead of "VERIFIED"
//
// Fresh  → green pill: "✓ Verified Jul 04 2026"
// Stale  → amber pill: "Last checked Jul 04 2026"
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

  // Display in sentence case ("✓ Verified Nov 04 2026"); the date and the
  // fresh/stale decision are exactly as before.
  const niceVerb = verb.charAt(0).toUpperCase() + verb.slice(1).toLowerCase();
  const niceDate = (d: Date) => {
    const up = formatDate(d);
    return up.charAt(0) + up.slice(1, 3).toLowerCase() + up.slice(3);
  };

  if (isFresh) {
    const label = `✓ ${niceVerb} ${niceDate(parsed)}`;
    return (
      <span className="verified-stamp verified-stamp--fresh" aria-label={`Verified on ${formatDate(parsed)}`}>
        {label}
      </span>
    );
  }

  // Stale or unparseable: dim, lowercase, human wording.
  const displayDate = isValid ? niceDate(parsed) : date;
  const label = `Last checked ${displayDate}`;
  return (
    <span className="verified-stamp verified-stamp--stale" aria-label={label}>
      {label}
    </span>
  );
}
