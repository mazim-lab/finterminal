"use client";

import { useEffect, useRef } from "react";

const NUM = "0123456789.";
const FEEDS = [
  { label: "AERO", val: "2.05" },
  { label: "MR", val: "1.95" },
];

/**
 * Point-value ticker. Digits flap into place once on mount, then settle to
 * their real values and stay static; a re-flap runs on hover. No infinite
 * animation. Under prefers-reduced-motion the values render instantly.
 */
export function Ticker() {
  const rootRef = useRef<HTMLSpanElement>(null);
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
    <span className="ticker" ref={rootRef}>
      <span className="tk">AERO</span>
      <span className="miniflap" ref={aeroRef} />
      <span className="up">▲</span>
      <span className="sep">·</span>
      <span className="tk">MR</span>
      <span className="miniflap" ref={mrRef} />
      <span className="up">▲</span>
    </span>
  );
}
