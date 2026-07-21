"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import TeamSection from "@/components/sections/TeamSection";
import CTABanner from "@/components/sections/CTABanner";

const values = [
  { icon: Target, title: "Craft Over Speed", description: "We'd rather ship something exceptional a week later than something mediocre on time. Quality isn't negotiable." },
  { icon: Eye, title: "Radical Transparency", description: "No black boxes. You see our progress in real-time, understand our decisions, and always know where your budget goes." },
  { icon: Heart, title: "Long-term Partnership", description: "We don't build and disappear. We become your technology partner — invested in your success far beyond the launch date." },
];

export default function AboutContent() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="pb-16 pt-12 lg:pb-24 lg:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-4 inline-flex items-center rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-700 dark:border-accent-800 dark:bg-accent-950 dark:text-accent-300">
              Our Story
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Building the Future,{" "}
              <span className="bg-gradient-to-r from-accent-500 to-accent-400 bg-clip-text text-transparent">
                One Product at a Time
              </span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Founded in 2018, Veb Techno Inc started with a simple belief: businesses deserve technology partners
              who care as much about their success as they do. What began as a two-person freelance operation has
              grown into a team of 50+ engineers, designers, and strategists — but our founding principle hasn&apos;t changed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted/50 py-16 lg:py-24">
        <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="rounded-xl border border-border bg-surface p-8"
            >
              <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">Our Mission</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                To democratize access to exceptional technology by bringing enterprise-grade engineering, design,
                and strategic thinking to businesses of every size. We believe great software shouldn&apos;t be a
                luxury — it should be the standard.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-xl border border-border bg-surface p-8"
            >
              <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">Our Vision</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                To be the technology partner that ambitious companies trust most — known not for our size,
                but for the quality of our craft, the depth of our partnerships, and the measurable impact
                we create for every client we serve.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Values"
            title="What We Stand For"
            subtitle="Three principles that guide every decision we make."
          />
          <div className="grid gap-8 lg:grid-cols-3">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-border bg-surface p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100 text-accent-600 dark:bg-accent-950 dark:text-accent-400">
                  <value.icon size={24} />
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TeamSection />
      <CTABanner />
    </div>
  );
}
