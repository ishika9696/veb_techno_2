"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent-600 via-accent-700 to-primary-900 px-8 py-16 text-center sm:px-16 sm:py-20"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 grid-pattern opacity-10" />

          {/* Floating orbs */}
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/5 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-white/5 blur-3xl"
          />

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto max-w-2xl font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
            >
              Ready to Build Something{" "}
              <span className="bg-gradient-to-r from-accent-200 to-white bg-clip-text text-transparent">
                Extraordinary
              </span>
              ?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mx-auto mt-4 max-w-lg text-base text-white/80 sm:text-lg"
            >
              Let&apos;s talk about your next project. No commitments, no pressure — just
              a conversation about what&apos;s possible.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/contact"
                className="group flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-accent-700 shadow-lg transition-all duration-300 hover:bg-white/90 hover:shadow-xl"
              >
                Start a Conversation
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/portfolio"
                className="flex items-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
              >
                See Our Work
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
