"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { stats } from "@/lib/constants";

const headlineWords = ["We", "Build", "Digital", "Products", "That", "Transform", "Businesses"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      {/* ── Animated Background ── */}
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 grid-pattern" />

      {/* Floating gradient orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent-400/8 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/3 h-64 w-64 rounded-full bg-primary-500/8 blur-3xl"
      />

      {/* Noise overlay */}
      <div className="noise-overlay absolute inset-0 opacity-30" />

      {/* ── Content ── */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-200/50 bg-accent-50/80 px-4 py-1.5 text-sm font-medium text-accent-700 backdrop-blur-sm dark:border-accent-800/50 dark:bg-accent-950/80 dark:text-accent-300"
        >
          <Sparkles size={14} className="text-accent-500" />
          Trusted by 200+ companies worldwide
        </motion.div>

        {/* Headline — staggered word animation */}
        <h1 className="mx-auto max-w-5xl font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`mr-[0.25em] inline-block ${
                word === "Digital" || word === "Products"
                  ? "bg-gradient-to-r from-accent-500 to-accent-400 bg-clip-text text-transparent"
                  : "text-foreground"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
        >
          From web &amp; mobile apps to cloud infrastructure — we architect,
          design, and engineer solutions that scale with your ambition.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-accent-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-accent-700 hover:shadow-glow-lg"
          >
            <span className="relative z-10">Start Your Project</span>
            <ArrowRight
              size={16}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            />
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>

          <Link
            href="/portfolio"
            className="group flex items-center gap-2 rounded-xl border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-accent-500/50 hover:bg-accent-50/50 dark:hover:bg-accent-950/50"
          >
            View Our Work
            <ArrowRight
              size={16}
              className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent-500"
            />
          </Link>
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4, ease: "easeOut" }}
          className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.6 + i * 0.1 }}
                className="font-heading text-3xl font-bold text-foreground sm:text-4xl"
              >
                {stat.prefix}
                {stat.value}
                {stat.suffix}
              </motion.div>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-muted-foreground/30 p-1"
        >
          <motion.div className="h-1.5 w-1 rounded-full bg-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
