// FinTerminal mark: "Homestead sprout". A soft-cornered house with a two-leaf
// sprout growing from its floor, cut out as negative space (even-odd fill), so
// the mark works in one colour and needs no mask ids. Home and things that grow.
export const MARK_PATH =
  "M14.4 4.3Q16 3 17.6 4.3L28 12.6Q29 13.4 29 14.8V25.6Q29 28.2 26.4 28.2H5.6Q3 28.2 3 25.6V14.8Q3 13.4 4 12.6Z" +
  "M14.9 25.4V21.6C12.2 21.4 10.4 19.7 10 16.9 12.6 16.9 14.4 18.2 14.9 19.9V18.2C15.3 14.8 17.8 12.9 22 12.8 21.8 16.6 19.6 18.8 17.1 19.1V25.4Q17.1 26.4 16 26.4 14.9 26.4 14.9 25.4Z";

export function BrandMark({ className = "brand-mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d={MARK_PATH} fill="var(--fin)" fillRule="evenodd" />
    </svg>
  );
}

export function Logo() {
  return (
    <a href="/" className="brand" aria-label="FinTerminal home">
      <BrandMark />
      <span className="brand-word">FinTerminal</span>
    </a>
  );
}
