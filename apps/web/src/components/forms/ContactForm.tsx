"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().min(2, "Please enter your company."),
  serviceInterest: z.string().min(2, "Please select a service."),
  message: z.string().min(10, "Tell us a bit more (10+ characters)."),
});

type FormValues = z.infer<typeof schema>;

const serviceOptions = [
  "Brand Strategy",
  "UI/UX Design",
  "Website & Web App Development",
  "Digital Marketing & SEO",
  "Creative & Content",
  "Automation & AI Solutions",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      serviceInterest: "Website & Web App Development",
      message: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as { message?: string } | null;
        throw new Error(payload?.message ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Request failed.");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div>
        <div className="text-sm font-semibold text-accent-gold">Send your brief</div>
        <p className="mt-2 text-sm leading-6 text-muted">
          We’ll reply with clarity, next steps, and a proposed call time window.
        </p>
      </div>

      {status === "success" ? (
        <div className="rounded-2xl border border-border bg-card/30 p-4 text-sm text-fg" role="status">
          Your request was sent. We will respond shortly.
        </div>
      ) : null}

      {status === "error" ? (
        <div className="rounded-2xl border border-accent-gold/30 bg-card/30 p-4 text-sm text-fg" role="alert">
          {errorMessage ?? "Something went wrong."}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-muted2">Name</span>
          <input
            {...form.register("name")}
            className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-fg placeholder:text-muted2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
            placeholder="Your name"
            autoComplete="name"
          />
          {form.formState.errors.name ? (
            <span className="text-xs font-semibold text-accent-gold">{form.formState.errors.name.message}</span>
          ) : null}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-muted2">Email</span>
          <input
            {...form.register("email")}
            className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-fg placeholder:text-muted2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
            placeholder="you@company.com"
            autoComplete="email"
          />
          {form.formState.errors.email ? (
            <span className="text-xs font-semibold text-accent-gold">{form.formState.errors.email.message}</span>
          ) : null}
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-muted2">Company</span>
          <input
            {...form.register("company")}
            className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-fg placeholder:text-muted2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
            placeholder="Company name"
            autoComplete="organization"
          />
          {form.formState.errors.company ? (
            <span className="text-xs font-semibold text-accent-gold">
              {form.formState.errors.company.message}
            </span>
          ) : null}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-muted2">Service interest</span>
          <select
            {...form.register("serviceInterest")}
            className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-fg placeholder:text-muted2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
          >
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {form.formState.errors.serviceInterest ? (
            <span className="text-xs font-semibold text-accent-gold">
              {form.formState.errors.serviceInterest.message}
            </span>
          ) : null}
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-muted2">Message</span>
        <textarea
          {...form.register("message")}
          className="min-h-[140px] w-full resize-none rounded-xl border border-border bg-bg px-4 py-3 text-sm text-fg placeholder:text-muted2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
          placeholder="What are you building? What outcome matters most?"
        />
        {form.formState.errors.message ? (
          <span className="text-xs font-semibold text-accent-gold">{form.formState.errors.message.message}</span>
        ) : null}
      </label>

      <button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="w-full rounded-full bg-fg px-6 py-3 text-sm font-semibold text-bg shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-[1px] disabled:opacity-60 disabled:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
      >
        {form.formState.isSubmitting ? "Sending..." : "Send request"}
      </button>
    </form>
  );
}

