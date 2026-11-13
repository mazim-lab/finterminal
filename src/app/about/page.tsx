import Link from "next/link";
import type { Metadata } from "next";
import { ogMeta } from "@/lib/og";
import s from "./about.module.css";

export const metadata: Metadata = {
  title: "About | FinTerminal",
  description:
    "Who runs FinTerminal and why. One dad in Ontario who runs every number for his own family first, values every card with the same formula, and shows his real portfolio, losses and all.",
  alternates: { canonical: "/about" },
  ...ogMeta("About", "About", "/about"),
};

export default function AboutPage() {
  return (
    <div className="wrap page tone-neutral">
      <header className="page-head">
        <span className="eyebrow">About</span>
        <h1>One dad, one notebook, read over my shoulder</h1>
        <p className="dek">
          I run FinTerminal by myself. I&apos;m one dad in Ontario, and I built this the way I keep track of my
          own family&apos;s money, then left the door open so you can read over my shoulder.
        </p>
      </header>

      <div className={s.layout}>
        <article className={`doc ${s.body}`}>
          <h2 className="cd-sec">Who is behind this</h2>
          <p>
            One person. Not a team, not a media company, not a wall of freelancers churning out card reviews.
            When I check a welcome bonus or update a rate, it&apos;s because I needed the answer for my own
            household first. If it&apos;s good enough for the card in my wallet and the accounts I set up for my
            kids, it goes on the site. If it isn&apos;t, it doesn&apos;t.
          </p>

          <h2 className="cd-sec">Why it exists</h2>
          <p>
            I got tired of comparison sites that quietly rank whoever pays them the most. You go looking for the
            best card for your family and you get handed the card with the fattest referral fee that week. That
            felt backwards. So I started running the numbers myself, the same way for every card, and writing
            down what I found so I would not have to redo it every year. FinTerminal is that notebook, cleaned
            up and made public.
          </p>

          <h2 className="cd-sec">How the numbers work</h2>
          <p>
            Every card gets the same formula. I take the welcome bonus, value it at conservative baseline point
            rates, and subtract the annual fee. No card gets a friendlier calculation because a bank likes me
            better. You can read the whole method, including how I value each rewards program, on{" "}
            <Link href="/how-we-value-points">how we value points</Link>. The formula is printed
            right next to the results so you can check my work.
          </p>

          <h2 className="cd-sec">The portfolio promise</h2>
          <p>
            The <Link href="/portfolio">portfolio</Link> is my real money, real positions, with
            the thesis behind each one. I show the losers next to the winners, because a track record that only
            shows the wins is a sales pitch, not a record. It&apos;s all in percent terms, never dollar figures,
            so you get the honesty without me posting my net worth on the internet. These are my own positions,
            not advice for yours.
          </p>

          <h2 className="cd-sec">How the site pays for itself</h2>
          <p>
            Some of the links here are affiliate links, which means a bank or retailer may pay me a referral fee
            if you sign up through one. That fee never moves a card up or down the list. The rankings come from
            the same formula every time, affiliate link or not, and if the best option has no link to pay me, I
            still tell you it&apos;s the best option. You can read the full{" "}
            <Link href="/disclosure">disclosure</Link> any time.
          </p>

          <h2 className="cd-sec">How to reach me</h2>
          <p>
            I read every message myself. If you spot a number that looks off, want a second opinion on a card, or
            just want to say hello, the <Link href="/contact">contact page</Link> comes straight
            to my inbox and I aim to reply within a few days.
          </p>
        </article>

        <aside className={s.aside} aria-labelledby="how-site-works">
          <div className={s.box}>
            <h2 id="how-site-works" className={s.boxTitle}>How this site works</h2>
            <dl className={s.list}>
              <div className={s.item}>
                <dt>Every number has a date</dt>
                <dd>
                  Offers, rates and point values carry the day I last checked them, so you always know how
                  fresh a figure is before you lean on it.
                </dd>
              </div>
              <div className={s.item}>
                <dt>
                  <span className="verified-stamp verified-stamp--fresh" aria-hidden="true">Verified</span>
                  <span className="sr-only">Green stamp</span>
                </dt>
                <dd>Green means I checked it within its normal window, like two weeks for card offers.</dd>
              </div>
              <div className={s.item}>
                <dt>
                  <span className="verified-stamp verified-stamp--stale" aria-hidden="true">last checked</span>
                  <span className="sr-only">Amber stamp</span>
                </dt>
                <dd>
                  Amber means it has been a while since I last looked. It is probably still right, but check
                  with the bank before you apply.
                </dd>
              </div>
              <div className={s.item}>
                <dt>Same formula for every card</dt>
                <dd>Bonus at conservative point values, minus the annual fee. Affiliate link or not.</dd>
              </div>
            </dl>
            <div className={s.links}>
              <Link className="cd-apply" href="/how-we-value-points">How I value points &rarr;</Link>
              <Link className="cd-apply" href="/disclosure">Affiliate disclosure &rarr;</Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
