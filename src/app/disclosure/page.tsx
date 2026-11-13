import Link from "next/link";
import type { Metadata } from "next";
import { ogMeta } from "@/lib/og";
import s from "../simple-page.module.css";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | FinTerminal",
  description: "Where FinTerminal stands on affiliate links today, what would change if we ever add them, and our promise that they never change our rankings or recommendations.",
  alternates: { canonical: "/disclosure" },
  ...ogMeta("Affiliate Disclosure", "FinTerminal", "/disclosure"),
};

export default function DisclosurePage() {
  return (
    <main className="wrap page tone-neutral">
      <header className="page-head">
        <span className="eyebrow">Disclosure</span>
        <h1>Affiliate Disclosure</h1>
        <p className="dek">
          The short version: FinTerminal has no affiliate links right now. We may add some one day.
          If we do, this page will say so first, and they will never change what we rank first or
          what we recommend.
        </p>
      </header>

      <div className={`doc ${s.body}`}>
        <h2 className="cd-sec">How it works</h2>
        <p>
          Today, the Apply buttons and deal links go to the bank&apos;s or store&apos;s own page, and
          no one pays FinTerminal when you click them. Running a site like this does cost money, so we
          may join some affiliate programs in the future. If we do, a bank or store would pay us a
          referral fee when you open an account or buy through one of those links, at no extra cost to
          you, and we will update this page before any such link goes live. Separately, if you ask
          through the contact page for one of my personal card referral links, the issuer may pay me a
          referral bonus if you are approved, and I will tell you that when I send it.
        </p>

        <h2 className="cd-sec">What it does not do</h2>
        <p>
          The Card Explorer sorts by our own estimated value, calculated
          the same way for every card, and an affiliate relationship never moves a card up the list or
          buys a better write-up. Deals are chosen because they are genuinely good, not because they pay.
          When something has a real catch, we tell you, affiliate link or not. If we ever cannot link to
          the best option, we will still tell you it is the best option.
        </p>

        <h2 className="cd-sec">Not financial advice</h2>
        <p>
          FinTerminal is information, not personalized financial advice. We are not licensed advisors.
          Always check the current terms with the bank or retailer before you apply or buy, since offers
          change often.
        </p>

        <p className={s.closing}>
          Questions? <Link href="/contact">Reach out any time</Link>. We would rather earn your trust
          than a quick click.
        </p>
      </div>
    </main>
  );
}
