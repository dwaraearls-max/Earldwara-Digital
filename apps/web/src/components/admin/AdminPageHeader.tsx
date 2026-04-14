export function AdminPageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-border bg-gradient-to-b from-bg-elevated/50 to-transparent px-8 py-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="font-eyebrow text-[10px] font-extrabold uppercase tracking-[0.22em] text-accent-neon">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display mt-1 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
