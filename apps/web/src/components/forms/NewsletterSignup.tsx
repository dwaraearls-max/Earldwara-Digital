"use client";

import type { FormEvent } from "react";
import { useState } from "react";

export function NewsletterSignup({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("idle");
    setMsg(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as { message?: string } | null;
        throw new Error(j?.message ?? "Could not subscribe.");
      }
      setStatus("ok");
      setEmail("");
      setMsg("You are subscribed. Check your inbox.");
    } catch (err) {
      setStatus("err");
      setMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-email">
          Email
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="min-w-0 flex-1 rounded-xl border border-border bg-bg px-4 py-3 text-sm text-fg placeholder:text-muted2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
        />
        <button
          type="submit"
          className="rounded-full bg-fg px-6 py-3 text-sm font-semibold text-bg shadow-[0_20px_60px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
        >
          Subscribe
        </button>
      </div>
      {status === "ok" ? (
        <p className="mt-2 text-sm text-accent-emerald" role="status">
          {msg}
        </p>
      ) : null}
      {status === "err" ? (
        <p className="mt-2 text-sm text-accent-neon" role="alert">
          {msg}
        </p>
      ) : null}
      <p className="mt-2 text-xs text-muted2">No spam. Unsubscribe anytime.</p>
    </form>
  );
}
