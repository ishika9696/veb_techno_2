"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 text-center">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-100 text-accent-600 dark:bg-accent-950 dark:text-accent-400">
          <HelpCircle size={32} />
        </div>
        <h1 className="font-heading text-6xl font-extrabold tracking-tight text-foreground mb-4">
          404
        </h1>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="group flex items-center justify-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-700 hover:shadow-glow"
          >
            Go Home
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/services"
            className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          >
            Explore Services
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
