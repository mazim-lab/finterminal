"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const PARTS = ["FIN", "TERMINAL"];

/**
 * FinTerminal split-flap wordmark: FIN · compass rose · TERMINAL.
 * Tiles clack into place once on mount, then settle static; a re-flap runs on
 * hover. No infinite animation: each pass is a brief settle under ~1.2s. Under
 * prefers-reduced-motion the wordmark renders instantly with no scramble.
 */
export function SplitFlapWordmark() {
  const finRef = useRef<HTMLSpanElement>(null);
  const termRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const containers = [finRef.current, termRef.current];
    const logo = logoRef.current;
    if (!containers[0] || !containers[1] || !logo) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tiles: { el: HTMLSpanElement; final: string; order: number }[] = [];
    let ord = 0;
    PARTS.forEach((word, pi) => {
      const container = containers[pi]!;
      container.innerHTML = "";
      if (pi > 0) ord += 2; // stagger: brief pause before the second word reveals
      for (const ch of word) {
        const t = document.createElement("span");
        t.className = "tile";
        t.textContent = ch;
        container.appendChild(t);
        tiles.push({ el: t, final: ch, order: ord++ });
      }
    });

    if (reduce) return; // final letters already set above; no scramble

    const flip = (el: HTMLSpanElement) => {
      el.classList.remove("flip");
      void el.offsetWidth;
      el.classList.add("flip");
    };

    // One settle pass, then static. Longest tile finishes in roughly:
    //   (6 + 13*1) ticks * 60ms ≈ 1.14s.
    let running = false;
    const intervals: number[] = [];
    const run = () => {
      if (running) return;
      running = true;
      let remaining = tiles.length;
      tiles.forEach((t) => {
        const ticks = 6 + t.order;
        let n = 0;
        const iv = window.setInterval(() => {
          if (n >= ticks) {
            t.el.textContent = t.final;
            flip(t.el);
            window.clearInterval(iv);
            if (--remaining === 0) running = false;
            return;
          }
          t.el.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          flip(t.el);
          n++;
        }, 60);
        intervals.push(iv);
      });
    };

    run();
    logo.addEventListener("mouseenter", run);
    return () => {
      intervals.forEach((iv) => window.clearInterval(iv));
      logo.removeEventListener("mouseenter", run);
    };
  }, []);

  return (
    <a ref={logoRef} href="/" className="logo" aria-label="FinTerminal">
      <span ref={finRef} className="flap" />
      <svg className="mark" viewBox="0 0 24 24" aria-hidden="true">
        <polygon points="12,1 13.6,10.4 23,12 13.6,13.6 12,23 10.4,13.6 1,12 10.4,10.4" fill="#E12B22" />
        <polygon points="12,5 12.9,11.1 19,12 12.9,12.9 12,19 11.1,12.9 5,12 11.1,11.1" fill="#EFE8D6" transform="rotate(45 12 12)" />
        <circle cx="12" cy="12" r="2.1" fill="#EFE8D6" stroke="#E12B22" strokeWidth="1.1" />
      </svg>
      <span ref={termRef} className="flap" />
    </a>
  );
}
