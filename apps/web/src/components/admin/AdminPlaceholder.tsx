import Link from "next/link";

export function AdminPlaceholder({
  title,
  description,
  bullets,
  cta,
}: {
  title: string;
  description: string;
  bullets: string[];
  cta?: { href: string; label: string };
}) {
  return (
    <div className="border-b border-border px-8 py-10">
      <div className="mx-auto max-w-3xl">
        <p className="font-eyebrow text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent-neon">
          Roadmap
        </p>
        <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight text-fg">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
        <ul className="mt-6 space-y-2 text-sm text-muted">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-emerald" />
              {b}
            </li>
          ))}
        </ul>
        {cta ? (
          <Link
            href={cta.href}
            className="mt-8 inline-flex rounded-full border border-accent-gold/40 bg-accent-gold/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-accent-neon transition-colors hover:border-accent-emerald/50 hover:bg-accent-emerald/10"
          >
            {cta.label}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
