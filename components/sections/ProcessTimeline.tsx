"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Palette, Code, Rocket, Headphones } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { processSteps } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Search,
  Palette,
  Code,
  Rocket,
  Headphones,
};

export default function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-muted/50 py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Process"
          title="From Idea to Impact"
          subtitle="A proven, transparent process that keeps you in the loop at every stage."
        />

        <div ref={ref} className="relative">
          {/* Timeline Line (desktop) */}
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-accent-500 via-accent-400 to-transparent lg:left-1/2 lg:block lg:-translate-x-px" />

          {/* Steps */}
          <div className="space-y-12 lg:space-y-16">
            {processSteps.map((step, i) => {
              const Icon = iconMap[step.icon] || Search;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 32, x: isEven ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex flex-col lg:flex-row lg:items-center ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 lg:pr-16 ${!isEven ? "lg:pl-16 lg:pr-0 lg:text-right" : ""}`}>
                    <div
                      className={`rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent-500/30 hover:shadow-md ${
                        !isEven ? "lg:ml-auto" : ""
                      }`}
                    >
                      <div className={`mb-3 flex items-center gap-3 ${!isEven ? "lg:flex-row-reverse" : ""}`}>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-100 text-accent-600 dark:bg-accent-950 dark:text-accent-400">
                          <Icon size={20} />
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400">
                            Step {i + 1}
                          </span>
                          <h3 className="font-heading text-lg font-semibold text-foreground">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                    </div>
                  </div>

                  {/* Timeline Dot (desktop) */}
                  <div className="absolute left-8 top-6 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-accent-500 bg-surface lg:left-1/2 lg:block" />

                  {/* Spacer for opposite side */}
                  <div className="hidden flex-1 lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
