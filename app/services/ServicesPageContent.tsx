"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedCard from "@/components/shared/AnimatedCard";
import CTABanner from "@/components/sections/CTABanner";
import services from "@/content/services.json";

export default function ServicesPageContent() {
  return (
    <div className="pt-24">
      <section className="pb-16 pt-12 lg:pb-24 lg:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-4 inline-flex items-center rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-700 dark:border-accent-800 dark:bg-accent-950 dark:text-accent-300">
              Our Expertise
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Solutions to Scale Your{" "}
              <span className="bg-gradient-to-r from-accent-500 to-accent-400 bg-clip-text text-transparent">
                Digital Horizon
              </span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              We design, engineer, secure, and grow products for companies that demand excellence. Discover our range of specialized IT capabilities.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const IconComponent = (LucideIcons as any)[service.icon];
              return (
                <AnimatedCard key={service.slug} delay={i * 0.05}>
                  <Link href={`/services/${service.slug}`} className="block">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100 text-accent-600 transition-colors group-hover:bg-accent-600 group-hover:text-white dark:bg-accent-950 dark:text-accent-400 dark:group-hover:bg-accent-600">
                      {IconComponent ? <IconComponent size={24} /> : <LucideIcons.Code size={24} />}
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <ul className="mb-6 space-y-2">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <LucideIcons.CheckCircle2 size={12} className="text-accent-500 shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 transition-colors group-hover:text-accent-500 dark:text-accent-400">
                      View Service Details
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>
      <CTABanner />
    </div>
  );
}
