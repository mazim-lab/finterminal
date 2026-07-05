import Image from "next/image";
import { DataScapeGraphic } from "@/components/heroes/DataScapeGraphic";

/**
 * Front-page hero banner with overlaid brand copy. Two variants share one frame:
 *  - "photo": treated stock skyline (dark scrim so the copy always reads).
 *  - "graphic": the generative data-scape (themed, paper fade on the copy side).
 */
export function HomeHero({ variant }: { variant: "photo" | "graphic" }) {
  return (
    <section className={`home-hero home-hero-${variant}`} aria-label="FinTerminal, the terminal for Canadian money">
      <div className="home-hero-media">
        {variant === "photo" ? (
          <Image src="/heroes/skyline.jpg" alt="" fill priority sizes="100vw" className="home-hero-img" />
        ) : (
          <DataScapeGraphic />
        )}
        <div className="home-hero-tint" aria-hidden="true" />
        <div className="home-hero-grain" aria-hidden="true" />
      </div>
      <div className="home-hero-copy">
        <div className="hh-kick">FINTERMINAL · CANADA</div>
        <div className="hh-title">The terminal for Canadian money.</div>
        <div className="hh-sub">
          Compare cards on real value, maximize travel points, and track a live portfolio. Independent, verified,
          no sponsored noise.
        </div>
      </div>
    </section>
  );
}
