/** FinTerminal mark: a compass / navigation star (maps + charting a course). */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <circle cx="12" cy="12" r="10.25" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
      {/* compass star */}
      <path
        d="M12 2.75 L13.7 10.3 L21.25 12 L13.7 13.7 L12 21.25 L10.3 13.7 L2.75 12 L10.3 10.3 Z"
        fill="currentColor"
      />
      <circle cx="12" cy="12" r="1.6" className="fill-background" />
    </svg>
  );
}
