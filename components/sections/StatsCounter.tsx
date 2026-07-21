"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { stats } from "@/lib/constants";
import SectionHeading from "@/components/shared/SectionHeading";

function AnimatedCounter({ value, suffix, prefix }: { value: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += value / steps;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="font-heading text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
      {prefix}
      {count}
      {suffix}
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="relative bg-muted/50 py-24 lg:py-32">
      {/* Subtle gradient */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="By the Numbers"
          title="Results That Matter"
          subtitle="Our track record speaks louder than promises."
        />

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group text-center"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
