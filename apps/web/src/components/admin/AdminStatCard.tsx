export function AdminStatCard({
  label,
  value,
  hint,
  trend,
}: {
  label: string;
  value: string | number;
  hint?: string;
  trend?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/80 p-5 shadow-[0_0_0_1px_rgba(37,99,235,0.08)] transition-shadow hover:shadow-[0_0_40px_-12px_rgba(37,99,235,0.14)]">
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent-gold/10 blur-2xl transition-opacity group-hover:opacity-100" />
      <p className="text-xs font-medium uppercase tracking-wider text-muted">{label}</p>
      <p className="font-display mt-2 text-3xl font-semibold tabular-nums tracking-tight text-fg">
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-muted2">{hint}</p> : null}
      {trend ? (
        <p className="mt-2 text-[11px] font-medium text-accent-emerald">{trend}</p>
      ) : null}
    </div>
  );
}
