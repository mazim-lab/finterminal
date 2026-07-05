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
 * Article hero with the house treatment. Two variants share one frame + grain:
 *  - "photo": treated stock (grayscale + emerald tint + dark scrim) so any photo
 *    reads as native to the terminal look, in both light and dark themes.
 *  - "graphic": an on-palette generative SVG (themed via CSS vars), no tint.
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
            sizes="(max-width: 900px) 100vw, 900px"
            className="ahero-img"
          />
        ) : (
          props.children
        )}
        <div className="ahero-tint" aria-hidden="true" />
        <div className="ahero-grain" aria-hidden="true" />
      </div>
      {props.credit ? <figcaption className="ahero-cap">{props.credit}</figcaption> : null}
    </figure>
  );
}
