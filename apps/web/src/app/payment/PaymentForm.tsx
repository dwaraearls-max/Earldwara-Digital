"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

function sanitizeAmount(input: string) {
  const cleaned = input.replace(/[^\d.]/g, "");
  const n = Number(cleaned);
  if (!Number.isFinite(n) || n <= 0) return "";
  // Keep 2 dp max (display only; not a payment processor)
  return String(Math.round(n * 100) / 100);
}

export function PaymentForm() {
  const params = useSearchParams();

  const defaults = useMemo(() => {
    const amount = sanitizeAmount(params.get("amount") ?? "");
    const email = (params.get("email") ?? "").trim();
    const ref = (params.get("ref") ?? "").trim();
    return { amount, email, ref };
  }, [params]);

  const [amount, setAmount] = useState(defaults.amount);
  const [email, setEmail] = useState(defaults.email);
  const [reference, setReference] = useState(defaults.ref);

  const subject = encodeURIComponent(`Payment request — ${BRAND.legalName}`);
  const body = encodeURIComponent(
    [
      `Hello ${BRAND.legalName},`,
      "",
      "I want to make a payment.",
      "",
      `Amount: ${BRAND.currency} ${amount || "(enter amount)"}`,
      `Email: ${email || "(enter email)"}`,
      `Reference: ${reference || "(optional)"}`,
      "",
      "Please reply with the payment link / instructions.",
      "",
    ].join("\n")
  );

  const mailto = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="ed-card-glass rounded-3xl border border-white/[0.09] p-6 sm:p-10">
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-neon">
            Secure payment
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Pay Earlsdwara Digital
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            This page collects your payment details and sends a request to our team. We’ll respond with a secure
            payment link and confirmation.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-muted2">Amount ({BRAND.currency})</span>
            <input
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(sanitizeAmount(e.target.value))}
              placeholder="e.g. 3500"
              className="h-12 rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-fg outline-none focus:border-accent-neon/60"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-muted2">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-fg outline-none focus:border-accent-neon/60"
            />
          </label>
          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className="text-xs font-semibold text-muted2">Reference (optional)</span>
            <input
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Invoice / project name"
              className="h-12 rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-fg outline-none focus:border-accent-neon/60"
            />
          </label>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={mailto}
            className="inline-flex min-h-[3.25rem] items-center justify-center rounded-xl bg-accent-neon px-8 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#060606] hover:bg-[#41e35f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-neon focus-visible:ring-offset-2 focus-visible:ring-offset-[#040404]"
          >
            Request payment link
          </a>
          <Link
            href="/contact"
            className="inline-flex min-h-[3.25rem] items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-8 text-[11px] font-bold uppercase tracking-[0.18em] text-fg hover:border-white/25 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040404]"
          >
            Talk to us
          </Link>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted2">
          Prefer WhatsApp? Message{" "}
          <a className="font-semibold text-fg hover:underline" href={`tel:${BRAND.phoneTel}`}>
            {BRAND.phoneDisplay}
          </a>{" "}
          or email{" "}
          <a className="font-semibold text-fg hover:underline" href={`mailto:${BRAND.email}`}>
            {BRAND.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}

