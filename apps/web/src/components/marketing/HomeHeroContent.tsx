"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BRAND, getWhatsAppChatHref, getWhatsAppHref } from "@/lib/brand";

export function HomeHeroContent() {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full max-w-[40rem] lg:max-w-[44rem] [text-shadow:0_2px_20px_rgba(0,0,0,0.55),0_1px_3px_rgba(0,0,0,0.85)]">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.04 },
          },
        }}
      >
        <motion.p
          variants={{
            hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="font-eyebrow text-[11px] font-extrabold uppercase tracking-[0.28em] text-white/55"
        >
          Digital studio · {BRAND.currency}
        </motion.p>

        <motion.h1
          variants={{
            hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="font-display mt-6 text-[2.125rem] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.75rem] sm:leading-[1.06] lg:text-[3.35rem] lg:leading-[1.05] xl:text-[3.75rem]"
        >
          <span className="block">
            Lead in the digital economy.
            <span className="relative ml-2 inline-block align-middle" aria-hidden>
              <span className="inline-block size-2.5 rounded-[2px] bg-blue-400 sm:size-3" />
            </span>
          </span>
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.5, delay: reduce ? 0 : 0.06 } },
          }}
          className="mt-6 max-w-xl text-[0.9375rem] leading-[1.65] text-white/78 sm:text-lg sm:leading-relaxed"
        >
          {BRAND.tagline} Engineering websites, e‑commerce, and growth-ready experiences for teams in Ghana and
          globally — with clear scope and senior execution.
        </motion.p>

        <motion.div
          variants={{
            hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : 0.1 } },
          }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <a
            href={getWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-eyebrow inline-flex min-h-[3rem] items-center justify-center rounded-full bg-blue-500 px-8 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white shadow-[0_4px_14px_rgba(0,0,0,0.35),0_8px_28px_-8px_rgba(37,99,235,0.55)] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-blue-400 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c1929]"
          >
            Get a website
          </a>
          <a
            href={getWhatsAppChatHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-eyebrow inline-flex min-h-[3rem] items-center justify-center rounded-full border-2 border-white/70 bg-white/18 px-8 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_4px_20px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-300 hover:border-white hover:bg-white/28 hover:shadow-[0_6px_24px_rgba(0,0,0,0.4)] hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c1929]"
          >
            Chat on WhatsApp
          </a>
          <Link
            href="/pricing#packages"
            className="font-eyebrow inline-flex min-h-[3rem] items-center justify-center rounded-full border-2 border-white/55 bg-white/12 px-8 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_4px_18px_rgba(0,0,0,0.3)] backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-300 hover:border-white hover:bg-white/20 hover:underline hover:decoration-white hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c1929]"
          >
            View packages
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
