/** Brand constants aligned with Earlsdwara Digital marketing materials (flyer). */

export const BRAND = {
  nameDisplay: "EARLSDWARA",
  nameSub: "DIGITAL",
  legalName: "Earlsdwara Digital",
  tagline: "Web development & digital solutions built for serious brands.",
  email: "dwaraearls@gmail.com",
  /** Flyer: local format; tel: uses E.164 for Ghana (+233). */
  phoneDisplay: "024 890 7887",
  phoneTel: "+233248907887",
  currency: "GHS",
  locale: "en-GH",
} as const;

/** Default message when someone taps “Get a website” (WhatsApp). */
export const BRAND_WHATSAPP_PREFILL_GET_WEBSITE =
  "Hi! I'd like to get a website from Earlsdwara Digital." as const;

function whatsAppDigits(): string {
  return BRAND.phoneTel.replace(/\D/g, "");
}

/** Open WhatsApp chat with optional pre-filled message. */
export function getWhatsAppHref(prefillMessage?: string): string {
  const text = prefillMessage ?? BRAND_WHATSAPP_PREFILL_GET_WEBSITE;
  return `https://wa.me/${whatsAppDigits()}?text=${encodeURIComponent(text)}`;
}

/** Open WhatsApp without pre-filled text. */
export function getWhatsAppChatHref(): string {
  return `https://wa.me/${whatsAppDigits()}`;
}
