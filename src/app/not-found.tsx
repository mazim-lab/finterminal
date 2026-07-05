import Link from "next/link";

export const metadata = {
  title: "404, page not found | FinTerminal",
  description: "That page is not on the board. Head back to the terminal or jump to cards, points, or personal finance.",
};

export default function NotFound() {
  return (
    <div className="app norail">
      <main>
        <div className="doc">
          <div className="head"><h1>404 · Signal Lost</h1></div>
          <p className="lede">
            That page is not on the board. It may have moved, or the link was mistyped. No harm done, here is the way back.
          </p>
          <div className="cd-note">
            <div className="cap">Where to go next</div>
            <p style={{ margin: 0 }} className="sub">
              Head back to the terminal, or jump straight to what you were probably after.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 14 }}>
            <Link href="/" className="cd-apply">The board &rarr;</Link>
            <Link href="/cards" className="cd-apply">Compare cards &rarr;</Link>
            <Link href="/personal-finance" className="cd-apply">Personal finance &rarr;</Link>
            <Link href="/travel" className="cd-apply">Travel &amp; points &rarr;</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
