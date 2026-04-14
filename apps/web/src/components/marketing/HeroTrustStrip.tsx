type Props = {
  label?: string;
  items: string[];
};

/**
 * Bottom “trusted by / featured” strip inside full-viewport hero (text-based logos).
 */
export function HeroTrustStrip({ label = "Trusted across", items }: Props) {
  return (
    <div className="border-t border-white/[0.12] pt-8 mt-auto">
      <p className="font-eyebrow text-center text-[10px] font-bold uppercase tracking-[0.32em] text-white/45 sm:text-[11px]">
        {label}
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10">
        {items.map((name) => (
          <span
            key={name}
            className="font-display text-sm font-semibold tracking-wide text-white/88 opacity-90 sm:text-base"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
