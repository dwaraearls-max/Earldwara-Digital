"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function MotionInView({
  children,
  className,
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, y: 28, filter: "blur(10px)" }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-72px" }}
      transition={
        reduce
          ? { duration: 0.25, delay: delayMs / 1000 }
          : {
              type: "spring",
              stiffness: 120,
              damping: 22,
              mass: 0.85,
              delay: delayMs / 1000,
            }
      }
    >
      {children}
    </motion.div>
  );
}
