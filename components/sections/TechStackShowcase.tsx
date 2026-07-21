"use client";

import { techStackItems } from "@/lib/constants";
import SectionHeading from "@/components/shared/SectionHeading";

export default function TechStackShowcase() {
  /* Duplicate items for seamless infinite scroll */
  const items = [...techStackItems, ...techStackItems];

  return (
    <section className="py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Stack"
          title="Technologies We Master"
          subtitle="We choose the right tools for the job — not the trendiest. Here's what we work with daily."
        />
      </div>

      {/* Marquee Row 1 — Left to Right */}
      <div className="relative mb-4">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-surface to-transparent" />

        <div className="flex animate-marquee gap-4 hover:[animation-play-state:paused]">
          {items.map((tech, i) => (
            <div
              key={`row1-${i}`}
              className="group flex shrink-0 items-center gap-3 rounded-xl border border-border bg-surface px-5 py-3 transition-all duration-300 hover:border-accent-500/40 hover:shadow-md"
            >
              {/* Text-based wordmark logo */}
              <span className="font-heading text-sm font-bold text-muted-foreground transition-colors group-hover:text-accent-600 dark:group-hover:text-accent-400">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 — Right to Left */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-surface to-transparent" />

        <div
          className="flex gap-4 hover:[animation-play-state:paused]"
          style={{ animation: "marquee 40s linear infinite reverse" }}
        >
          {[...items].reverse().map((tech, i) => (
            <div
              key={`row2-${i}`}
              className="group flex shrink-0 items-center gap-3 rounded-xl border border-border bg-surface px-5 py-3 transition-all duration-300 hover:border-accent-500/40 hover:shadow-md"
            >
              <span className="font-heading text-sm font-bold text-muted-foreground transition-colors group-hover:text-accent-600 dark:group-hover:text-accent-400">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
