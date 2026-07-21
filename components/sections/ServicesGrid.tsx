"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedCard from "@/components/shared/AnimatedCard";
import services from "@/content/services.json";

export default function ServicesGrid() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="What We Do"
          title="Services Built for Growth"
          subtitle="End-to-end technology services designed to take your business from where it is to where you want it to be."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const IconComponent = (LucideIcons as any)[service.icon];
            return (
              <AnimatedCard key={service.slug} delay={i * 0.08}>
                <Link href={`/services/${service.slug}`} className="block">
                  {/* Icon */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100 text-accent-600 transition-colors group-hover:bg-accent-600 group-hover:text-white dark:bg-accent-950 dark:text-accent-400 dark:group-hover:bg-accent-600 dark:group-hover:text-white">
                    {IconComponent ? <IconComponent size={24} /> : <LucideIcons.Code size={24} />}
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  {/* Link */}
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 transition-colors group-hover:text-accent-500 dark:text-accent-400">
                    Learn more
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
