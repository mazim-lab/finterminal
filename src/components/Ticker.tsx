"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { VALUATION_SOURCE } from "@/data/point-valuations";

const NUM = "0123456789.";
const FEEDS = [
  { label: "AERO", val: "2.05" },
  { label: "MR", val: "1.95" },
];

// Turn the stored "YYYY-MM" into a subtle "Jun 2026" label. If the format is
// ever something unexpected, fall back to skipping the label rather than
// printing a broken date.
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatAsOf(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const m = /^(\d{4})-(\d{2})$/.exec(raw);
  if (!m) return null;
  const month = MONTHS[Number(m[2]) - 1];
  return month ? `${month} ${m[1]}` : null;
}
const AS_OF = formatAsOf(VALUATION_SOURCE.asOf);

/**
 * Point-value ticker. Shows FinTerminal's own baseline estimates (not a live
 * market feed) and links to the methodology. Digits flap into place once on
 * mount, then settle to their real values and stay static; a re-flap runs on
 * hover. No infinite animation, no up/down arrows: these are steady estimates,
 * not fluctuating quotes. Under prefers-reduced-motion the values render
 * instantly.
 */
export function Ticker() {
  const rootRef = useRef<HTMLAnchorElement>(null);
  const aeroRef = useRef<HTMLSpanElement>(null);
  const mrRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cells = [aeroRef.current, mrRef.current];
    const root = rootRef.current;
    if (!cells[0] || !cells[1] || !root) return;

    const texts = FEEDS.map((f) => f.val + "¢");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ensure = (el: HTMLSpanElement, text: string) => {
      while (el.children.length < text.length) { const c = document.createElement("span"); c.className = "mc"; el.appendChild(c); }
      while (el.children.length > text.length) el.removeChild(el.lastChild!);
    };

    if (reduce) {
      cells.forEach((el, i) => {
        ensure(el!, texts[i]);
        for (let j = 0; j < texts[i].length; j++) (el!.children[j] as HTMLSpanElement).textContent = texts[i].charAt(j);
      });
      return;
    }

    const flip = (el: HTMLSpanElement) => { el.classList.remove("flip"); void el.offsetWidth; el.classList.add("flip"); };
    let running = false;
    const intervals: number[] = [];
    const render = (el: HTMLSpanElement, text: string) => {
      ensure(el, text);
      for (let i = 0; i < text.length; i++) {
        ((cell: HTMLSpanElement, finalCh: string, idx: number) => {
          const ticks = 4 + idx * 2; let n = 0;
          const iv = window.setInterval(() => {
            if (n >= ticks) { cell.textContent = finalCh; flip(cell); window.clearInterval(iv); return; }
            cell.textContent = NUM[Math.floor(Math.random() * NUM.length)]; flip(cell); n++;
          }, 80);
          intervals.push(iv);
        })(el.children[i] as HTMLSpanElement, text.charAt(i), i);
      }
    };

    const run = () => {
      if (running) return;
      running = true;
      cells.forEach((el, i) => render(el!, texts[i]));
      // Longest cell finishes in (4 + 4*2) ticks * 80ms ≈ 0.96s.
      window.setTimeout(() => { running = false; }, 1100);
    };

    run();
    root.addEventListener("mouseenter", run);
    return () => {
      intervals.forEach((iv) => window.clearInterval(iv));
      root.removeEventListener("mouseenter", run);
    };
  }, []);

  return (
    <Link
      className="ticker"
      href="/how-we-value-points"
      ref={rootRef}
      title="How we value points"
      aria-label="Point value estimates: how we value points"
    >
      <span className="tk">AERO</span>
      <span className="miniflap" ref={aeroRef} />
      <span className="sep">·</span>
      <span className="tk">MR</span>
      <span className="miniflap" ref={mrRef} />
      {AS_OF && <span className="asof">as of {AS_OF}</span>}
    </Link>
  );
}
