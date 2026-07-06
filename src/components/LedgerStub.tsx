import type { ReactNode } from "react";
import { VerifiedStamp } from "@/components/VerifiedStamp";

// The ledger stub (spec 3.6): "the one number to remember" in a guide, framed to
// be screenshotted and texted to a spouse. The number is huge in tabular mono,
// one serif caption sits under it, and a small checked-date mark grounds it in
// time. Hairline frame plus the board rail on top, no skeuomorphism.
//
// Props:
//   number   — the figure itself, e.g. "20%" or "$500". Rendered in tabular mono.
//   label    — the mono micro-cap above the number, e.g. "THE RESP GRANT".
//   caption  — one serif sentence explaining what the number means.
//   date     — optional inspection date; renders a VerifiedStamp when present.
//   cadenceDays — how long before the stamp fades to "last checked" (default 120).

interface LedgerStubProps {
  number: ReactNode;
  label: string;
  caption: ReactNode;
  date?: string;
  cadenceDays?: number;
}

export function LedgerStub({ number, label, caption, date, cadenceDays = 120 }: LedgerStubProps) {
  return (
    <figure className="ledger-stub">
      <div className="ledger-stub-label">{label}</div>
      <div className="ledger-stub-num">{number}</div>
      <figcaption className="ledger-stub-cap">{caption}</figcaption>
      {date ? (
        <div className="ledger-stub-stamp">
          <VerifiedStamp date={date} cadenceDays={cadenceDays} verb="CHECKED" />
        </div>
      ) : null}
    </figure>
  );
}
