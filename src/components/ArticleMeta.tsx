import { VerifiedStamp } from "@/components/VerifiedStamp";

// The one mono meta rule under a boarding-pass article header (spec 3.7):
//   by one dad in Ontario · 9 min read · ✓ VERIFIED JUL 04 2026
//
// The byline matches the naming on /about (the site is run by "one dad in
// Ontario"; there is no first-name persona). Read time is optional. The date
// feeds a VerifiedStamp, which fades from gold to a dim "last checked" once it
// ages past its cadence, so a missed week degrades gracefully instead of lying.

interface ArticleMetaProps {
  /** Read time, e.g. "9 min read". Omit if unknown. */
  readTime?: string;
  /** Inspection date for the VerifiedStamp (ISO or human string). */
  date: string;
  /** Days before the stamp fades to "last checked" (default 120 for guides). */
  cadenceDays?: number;
}

export function ArticleMeta({ readTime, date, cadenceDays = 120 }: ArticleMetaProps) {
  return (
    <div className="docmeta">
      <span>by one dad in Ontario</span>
      {readTime ? (
        <>
          <span className="sep">·</span>
          <span>{readTime}</span>
        </>
      ) : null}
      <span className="sep">·</span>
      <VerifiedStamp date={date} cadenceDays={cadenceDays} />
    </div>
  );
}
