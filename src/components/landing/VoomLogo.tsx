type VoomLogoProps = {
  compact?: boolean;
};

export function VoomLogo({ compact = false }: VoomLogoProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <svg
        viewBox="0 0 32 32"
        width={compact ? 18 : 24}
        height={compact ? 18 : 24}
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="14" fill="none" stroke="#F5A623" strokeWidth="2" />
        <circle cx="16" cy="16" r="3" fill="#F5A623" />
        <path d="M16 16 L8.8 11.8" stroke="#F5A623" strokeWidth="2" />
        <path d="M16 16 L23.2 11.8" stroke="#F5A623" strokeWidth="2" />
        <path d="M16 16 L16 24.2" stroke="#F5A623" strokeWidth="2" />
      </svg>
      <span className="headline-display text-[2rem] leading-none tracking-[0.03em] text-[#F0EDE8]">
        VOOM
      </span>
      {!compact ? (
        <span className="text-[11px] tracking-[0.15em] text-[#7A7A7A] uppercase">
          Cabs
        </span>
      ) : null}
    </div>
  );
}
