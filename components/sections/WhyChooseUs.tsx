"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Zap, Shield, Users, Clock, Award } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const reasons = [
  {
    icon: Zap,
    title: "Engineering Excellence",
    description: "Clean, maintainable code built with modern frameworks and best practices. No shortcuts.",
  },
  {
    icon: Users,
    title: "Dedicated Teams",
    description: "Every project gets a focused team of senior engineers, designers, and a PM — not a rotating bench.",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Enterprise-grade security is baked into every line of code, not bolted on as an afterthought.",
  },
  {
    icon: Clock,
    title: "On-time Delivery",
    description: "We ship on schedule with transparent communication — no missed deadlines, no surprises.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "500+ projects delivered, 200+ happy clients, and 8+ years of consistent results.",
  },
  {
    icon: CheckCircle2,
    title: "Full Lifecycle Support",
    description: "From discovery to deployment and beyond — we're your long-term technology partner.",
  },
];

export default function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-muted/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Why Veb Techno"
          title="Built Different, Delivered Better"
          subtitle="We're not another dev shop. We're a team of senior engineers and designers who care about craft, reliability, and your success."
        />

        <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent-500/30 hover:shadow-md"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-100 text-accent-600 transition-colors group-hover:bg-accent-600 group-hover:text-white dark:bg-accent-950 dark:text-accent-400 dark:group-hover:bg-accent-600">
                <reason.icon size={20} />
              </div>
              <h3 className="mb-2 font-heading text-base font-semibold text-foreground">
                {reason.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
