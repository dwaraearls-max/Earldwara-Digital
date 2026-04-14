"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "ed_cookie_consent_v1";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        if (typeof window === "undefined") return;
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored) setVisible(true);
      } catch {
        setVisible(true);
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  function accept() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-[60] border-t border-border bg-bg/95 p-4 shadow-[0_-8px_40px_rgba(0,0,0,0.4)] backdrop-blur supports-[backdrop-filter]:bg-bg/85"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:px-2">
        <div className="text-sm text-muted">
          <p id="cookie-consent-title" className="font-semibold text-fg">
            Cookies &amp; privacy
          </p>
          <p className="mt-1 leading-6">
            We use essential cookies to run this site and optional analytics when enabled. See our{" "}
            <Link href="/cookies" className="font-semibold text-accent-gold underline-offset-4 hover:underline">
              Cookie policy
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-semibold text-accent-gold underline-offset-4 hover:underline">
              Privacy policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={accept}
            className="rounded-full bg-fg px-5 py-2.5 text-sm font-semibold text-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
          >
            Accept
          </button>
          <Link
            href="/cookies"
            className="inline-flex items-center justify-center rounded-full border border-border bg-card/40 px-5 py-2.5 text-sm font-semibold text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
          >
            Manage
          </Link>
        </div>
      </div>
    </div>
  );
}
