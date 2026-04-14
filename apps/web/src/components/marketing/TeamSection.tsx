import Image from "next/image";

import type { TeamMember } from "@/lib/mock/siteData";

function avatarInitials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase();
}

export function TeamSection({
  eyebrow = "People",
  title = "Meet the team",
  description = "The humans behind your builds — clarity, craft, and accountability on every engagement.",
  members,
  sectionId,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  members: TeamMember[];
  /** Anchor id for deep links (e.g. `"team"` on About). Omit on duplicate sections to avoid duplicate ids. */
  sectionId?: string;
}) {
  return (
    <div
      {...(sectionId ? { id: sectionId } : {})}
      className={`relative${sectionId ? " scroll-mt-28" : ""}`}
      role="region"
      aria-labelledby="team-heading"
    >
      <div className="mb-10 max-w-2xl">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-accent-gold">{eyebrow}</p>
        <h2 id="team-heading" className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          {title}
        </h2>
        {description ? <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{description}</p> : null}
      </div>

      <ul className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {members.map((member) => (
          <li key={member.name}>
            <article className="flex h-full flex-col rounded-2xl border border-border bg-card/40 p-6 text-center shadow-[0_1px_0_rgba(255,255,255,0.06)_inset] transition-[transform,box-shadow,border-color] duration-300 hover:border-accent-gold/25 hover:shadow-[0_28px_60px_-34px_rgba(0,0,0,0.5)] sm:p-8">
              <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border-2 border-accent-gold/25 bg-gradient-to-br from-accent-gold/20 via-bg-elevated to-accent-emerald/10 ring-2 ring-white/[0.06]">
                {member.imageSrc ? (
                  <Image
                    src={member.imageSrc}
                    alt={`${member.name}, ${member.title}`}
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                    sizes="128px"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center font-display text-xl font-bold tracking-tight text-accent-neon"
                    aria-hidden
                  >
                    {avatarInitials(member.name)}
                  </div>
                )}
              </div>

              <h3 className="mt-5 font-display text-lg font-semibold text-fg">{member.name}</h3>
              <p className="mt-1 text-sm text-muted">{member.title}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
