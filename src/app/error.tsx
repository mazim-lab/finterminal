"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="app norail">
      <main>
        <div className="doc">
          <div className="head"><h1>Fault on the board</h1></div>
          <p className="lede">
            Something on our end tripped up while loading this page. Give it another go, and if it keeps happening, one of the usual routes below will get you where you were headed.
          </p>
          <div className="cd-note">
            <div className="cap">Where to go next</div>
            <p style={{ margin: 0 }} className="sub">
              Retry the page, or head back to the terminal and pick up from there.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 14 }}>
            <button type="button" onClick={() => reset()} className="cd-apply">Try again</button>
            <Link href="/" className="cd-apply">The board &rarr;</Link>
            <Link href="/cards" className="cd-apply">Compare cards &rarr;</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
