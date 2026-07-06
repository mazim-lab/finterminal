import Image from "next/image";
import type { ReactNode } from "react";

type PhotoProps = {
  variant: "photo";
  src: string;
  alt: string;
  priority?: boolean;
  credit?: ReactNode;
};
type GraphicProps = {
  variant: "graphic";
  /** Describes the graphic for screen readers (the SVG itself is aria-hidden). */
  alt: string;
  children: ReactNode;
  credit?: ReactNode;
};
type Props = PhotoProps | GraphicProps;

/**
 * Boarding-pass article header motif (spec 3.7). The old 16:6 banner is retired;
 * the article motif is now a small stamp (~96px) that sits beside the serif h1
 * and dek. The heading, dek, and mono meta rule live in the page next to this
 * component and compose into a single boarding-pass row via .doc CSS, so the
 * lede is always visible in the first viewport.
 *
 * The `variant` prop is preserved so every existing call site compiles unchanged:
 *  - "graphic": an on-palette generative SVG motif (themed via .gh-* CSS vars).
 *  - "photo": treated stock, grayscale + emerald tint, framed as a small stamp.
 */
export function ArticleHero(props: Props) {
  return (
    <figure className={`ahero ahero-${props.variant}`}>
      <div
        className="ahero-media"
        {...(props.variant === "graphic" ? { role: "img", "aria-label": props.alt } : {})}
      >
        {props.variant === "photo" ? (
          <Image
            src={props.src}
            alt={props.alt}
            fill
            priority={props.priority}
            sizes="96px"
            className="ahero-img"
          />
        ) : (
          props.children
        )}
        <div className="ahero-tint" aria-hidden="true" />
      </div>
      {props.credit ? <figcaption className="ahero-cap">{props.credit}</figcaption> : null}
    </figure>
  );
}
