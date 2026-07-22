"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedCard from "@/components/shared/AnimatedCard";
import projects from "@/content/projects.json";
import { serviceCategories } from "@/lib/constants";
import CTABanner from "@/components/sections/CTABanner";

export default function PortfolioContent() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()) || activeCategory.toLowerCase().includes(p.category.toLowerCase()));

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="pb-12 pt-12 lg:pb-16 lg:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-700 dark:border-accent-800 dark:bg-accent-950 dark:text-accent-300">
              Our Portfolio
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Proven Digital{" "}
              <span className="bg-gradient-to-r from-accent-500 to-accent-400 bg-clip-text text-transparent">
                Masterpieces
              </span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Explore how we have engineered real business growth, resolved tech challenges, and delivered premium digital products.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border pb-6">
            {serviceCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  activeCategory === category
                    ? "bg-accent-600 text-white shadow-md shadow-accent-600/20"
                    : "bg-surface hover:bg-muted text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  layout
                  key={project.slug}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                >
                  <AnimatedCard delay={idx * 0.05} className="h-full flex flex-col justify-between">
                    <Link href={`/portfolio/${project.slug}`} className="block group">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-lg mb-4">
                        <Image
                          src={project.coverImage}
                          alt={`${project.title} — ${project.category} project by Veb Techno Inc`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                          {project.category}
                        </div>
                      </div>
                      <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                        {project.title}
                      </h3>
                      {/* DEMO DATA: Replace client names with real clients before launch */}
                      <p className="text-xs text-muted-foreground mb-3">{project.client}</p>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-6">
                        {project.problem}
                      </p>
                    </Link>

                    <div className="mt-auto border-t border-border pt-4">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-1.5 flex-wrap">
                          {project.techStack.slice(0, 3).map(tech => (
                            <span key={tech} className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={`/portfolio/${project.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 dark:text-accent-400 group-hover:text-accent-500"
                        >
                          Details <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </AnimatedCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
