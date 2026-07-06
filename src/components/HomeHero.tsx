import Image from "next/image";
import Link from "next/link";
import { DataScapeGraphic } from "@/components/heroes/DataScapeGraphic";

/**
 * Front-page hero (spec 3.5): roughly half its old height. Two variants share one
 * frame:
 *  - "photo": treated stock skyline (dark scrim so the copy always reads).
 *  - "graphic": the generative data-scape (production rendering; new short
 *    composition, paper fade on the copy side).
 *  - "takeoff": alias retained for API compatibility; renders the graphic.
 *
 * Copy: the display headline, ONE serif promise sentence, and the signed human
 * line linking to /about. No independence claims live here.
 */
export function HomeHero({ variant }: { variant: "photo" | "graphic" | "takeoff" }) {
  const isPhoto = variant === "photo";
  const cls = isPhoto ? "home-hero-photo" : "home-hero-graphic";
  return (
    <section className={`home-hero ${cls}`} aria-label="FinTerminal, the terminal for Canadian money">
      <div className="home-hero-media">
        {isPhoto ? (
          <Image src="/heroes/skyline.jpg" alt="" fill priority sizes="100vw" className="home-hero-img" />
        ) : (
          <DataScapeGraphic />
        )}
        <div className="home-hero-tint" aria-hidden="true" />
      </div>
      <div className="home-hero-copy">
        <div className="hh-kick">FINTERMINAL · CANADA</div>
        <h1 className="hh-title">The terminal for Canadian money.</h1>
        <p className="hh-sub">
          Cards ranked on the money they actually put in your pocket, points stretched into real family trips, and a
          live portfolio that shows its losses.
        </p>
        <p className="hh-signed">
          I&apos;m one dad in Ontario who runs every one of these numbers for my own family first.{" "}
          <Link href="/about" className="hh-signed-link">who runs this &rarr;</Link>
        </p>
      </div>
    </section>
  );
}
