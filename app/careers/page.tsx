"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Briefcase, Clock, ArrowRight, Star, Heart, Shield, Sparkles } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedCard from "@/components/shared/AnimatedCard";
import CTABanner from "@/components/sections/CTABanner";

const jobs = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "New York, NY (Hybrid)",
    type: "Full-time",
    description: "Lead development of premium Next.js and Node.js solutions for fintech and e-commerce clients. Work directly with design and product teams.",
    requirements: [
      "5+ years of experience with React, TypeScript, and Node.js",
      "Deep understanding of SQL (PostgreSQL) and caching layers (Redis)",
      "Strong testing practices (Jest, Cypress, Playwright)",
      "Experience with Next.js App Router and Server Components"
    ]
  },
  {
    title: "Lead UI/UX Designer",
    department: "Design",
    location: "Remote (US/Canada)",
    type: "Full-time",
    description: "Define design systems, visual languages, and micro-animations for enterprise applications. Run discovery workshops and prototype in Figma.",
    requirements: [
      "6+ years of UX/UI product design experience",
      "Stunning portfolio showing interactions, user flows, and typography systems",
      "Mastery of Figma component architecture and variables",
      "Excellent client presentation and facilitation skills"
    ]
  },
  {
    title: "Cloud Platform SRE",
    department: "DevOps",
    location: "New York, NY (Hybrid)",
    type: "Full-time",
    description: "Architect secure and automated Kubernetes, Terraform, and cloud platform setups for scale. Maintain high availability and automate everything.",
    requirements: [
      "4+ years managing production AWS/GCP workloads",
      "Strong expertise in Docker, Kubernetes, and Helm charts",
      "Infrastructure as Code tooling mastery (Terraform)",
      "CI/CD automation scripting in GitHub Actions or GitLab"
    ]
  }
];

const benefits = [
  { icon: Star, title: "Premium Compensation", description: "Competitive salaries, annual profit sharing, and performance bonuses." },
  { icon: Heart, title: "Health & Wellness", description: "Comprehensive medical, dental, and vision insurance with 100% premium coverage." },
  { icon: Shield, title: "Retirement Security", description: "401(k) retirement savings account with 4% company contribution match." },
  { icon: Sparkles, title: "Flexible Work", description: "Hybrid NYC office structure with optional fully remote days and flexible hours." }
];

export default function CareersPage() {
  const [activeJob, setActiveJob] = useState<number | null>(null);

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="pb-16 pt-12 lg:pb-24 lg:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-700 dark:border-accent-800 dark:bg-accent-950 dark:text-accent-300">
              Join Our Team
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Do the Best Work of Your{" "}
              <span className="bg-gradient-to-r from-accent-500 to-accent-400 bg-clip-text text-transparent">
                Career
              </span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              We care about engineering craft, visual design, and supporting developers. Read about our open positions and benefits.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/30 py-16 lg:py-24 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Perks"
            title="Benefits Built for You"
            subtitle="We ensure you have the tooling, space, support, and resources to thrive."
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, i) => (
              <AnimatedCard key={benefit.title} delay={i * 0.05} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100 text-accent-600 dark:bg-accent-950 dark:text-accent-400">
                  <benefit.icon size={24} />
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{benefit.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Openings"
            title="Active Job Positions"
            subtitle="Find your next challenge. Apply directly by clicking below."
          />

          <div className="space-y-4">
            {jobs.map((job, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-accent-500/20"
              >
                <button
                  onClick={() => setActiveJob(activeJob === idx ? null : idx)}
                  className="flex w-full flex-col sm:flex-row sm:items-center justify-between p-6 text-left"
                >
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">{job.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Briefcase size={12} /> {job.department}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {job.type}</span>
                    </div>
                  </div>
                  <span className="mt-4 sm:mt-0 text-sm font-semibold text-accent-600 dark:text-accent-400 hover:text-accent-500 inline-flex items-center gap-1.5 shrink-0">
                    {activeJob === idx ? "Hide Details" : "View Details"}
                    <ArrowRight size={14} className={`transition-transform duration-300 ${activeJob === idx ? "rotate-90" : ""}`} />
                  </span>
                </button>

                {activeJob === idx && (
                  <div className="border-t border-border p-6 bg-muted/20">
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{job.description}</p>
                    <h4 className="font-heading text-sm font-semibold text-foreground mb-3">Requirements:</h4>
                    <ul className="list-disc pl-5 space-y-2 mb-6 text-sm text-muted-foreground">
                      {job.requirements.map((req, ridx) => (
                        <li key={ridx}>{req}</li>
                      ))}
                    </ul>
                    <a
                      href="mailto:careers@vebtechno.com"
                      className="inline-flex items-center justify-center rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-700"
                    >
                      Apply Now
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
