"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Enable the subtle glow-on-hover border effect */
  glowOnHover?: boolean;
}

export default function AnimatedCard({
  children,
  className,
  delay = 0,
  glowOnHover = true,
}: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-surface p-6 transition-shadow duration-300",
        glowOnHover && "hover:border-accent-500/30 hover:shadow-glow",
        className
      )}
    >
      {/* Gradient reveal on hover */}
      {glowOnHover && (
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-accent-500/5 via-transparent to-accent-600/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
