// FinTerminal mark: an ink rounded square (FAEConf's logo shape) holding three
// ascending bars in the three pillar hues, Cards, Travel and Money.
export function BrandMark({ className = "brand-mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 28" aria-hidden="true" focusable="false">
      <rect width="28" height="28" rx="6.5" fill="var(--mark-bg)" />
      <rect x="6.5" y="15" width="4" height="7" rx="1.2" fill="var(--mark-1)" />
      <rect x="12" y="10.5" width="4" height="11.5" rx="1.2" fill="var(--mark-2)" />
      <rect x="17.5" y="6" width="4" height="16" rx="1.2" fill="var(--mark-3)" />
    </svg>
  );
}

export function Logo() {
  return (
    <a href="/" className="brand" aria-label="FinTerminal home">
      <BrandMark />
      <span className="brand-word">
        Fin<b>Terminal</b>
      </span>
    </a>
  );
}
