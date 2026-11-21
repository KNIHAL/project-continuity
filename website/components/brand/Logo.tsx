type LogoMarkProps = { size?: number; className?: string };

/** Three linked nodes: inferred, reported, verified. Trust grows to the right. */
export function LogoMark({ size = 22, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5 12h14"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="5" cy="12" r="3.25" fill="var(--inferred)" />
      <circle cx="12" cy="12" r="3.25" fill="var(--reported)" />
      <circle cx="19" cy="12" r="3.25" fill="var(--verified)" />
    </svg>
  );
}

export function Brand() {
  return (
    <span className="brand">
      <LogoMark />
      <span>PCS</span>
    </span>
  );
}
