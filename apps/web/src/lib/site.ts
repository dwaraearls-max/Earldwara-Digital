const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://earlsdwara.digital";

export function getSiteUrl() {
  return siteUrl.replace(/\/$/, "");
}

function normalizeHttpUrl(val: string): string | null {
  const v = val.trim();
  if (!v) return null;
  if (/^https?:\/\//i.test(v)) return v;
  if (/^www\./i.test(v)) return `https://${v}`;
  return null;
}

/** Instagram: full URL, or @handle / handle → instagram.com (drops ?igsh / utm_* on profile URLs). */
function normalizeInstagram(val: string): string | null {
  const v = val.trim();
  if (!v) return null;
  const asUrl = normalizeHttpUrl(v);
  if (asUrl) {
    try {
      const u = new URL(asUrl);
      if (u.hostname.endsWith("instagram.com")) {
        u.search = "";
        const path = u.pathname.endsWith("/") ? u.pathname : `${u.pathname}/`;
        return `${u.origin}${path}`;
      }
    } catch {
      /* fall through */
    }
    return asUrl;
  }
  const user = v.replace(/^@/, "");
  return `https://www.instagram.com/${user}/`;
}

/** TikTok: full URL, or @handle / handle → tiktok.com/@… */
function normalizeTikTok(val: string): string | null {
  const v = val.trim();
  if (!v) return null;
  const asUrl = normalizeHttpUrl(v);
  if (asUrl) return asUrl;
  const user = v.replace(/^@/, "");
  return `https://www.tiktok.com/@${user}`;
}

export function getSocialLinks() {
  const igRaw = process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM?.trim() || "";
  const ttRaw = process.env.NEXT_PUBLIC_SOCIAL_TIKTOK?.trim() || "";

  return {
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN?.trim() || null,
    x: process.env.NEXT_PUBLIC_SOCIAL_X?.trim() || null,
    instagram: igRaw ? normalizeInstagram(igRaw) : null,
    youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE?.trim() || null,
    tiktok: ttRaw ? normalizeTikTok(ttRaw) : null,
  };
}

export type SocialLinks = ReturnType<typeof getSocialLinks>;
