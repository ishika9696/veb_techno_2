"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import projects from "@/content/projects.json";

export default function ProjectsShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Work"
          title="Projects That Speak for Themselves"
          subtitle="Real results for real businesses. Here are a few projects we're especially proud of."
        />

        <div ref={ref} className="grid gap-8 lg:grid-cols-3">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="group block overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-accent-500/30 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Category tag */}
                  <div className="absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="mb-1 font-heading text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="mb-3 text-sm text-muted-foreground">{project.client}</p>

                  {/* Tech badges */}
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Results preview */}
                  <div className="grid grid-cols-2 gap-3 border-t border-border pt-4">
                    {project.results.slice(0, 2).map((result) => (
                      <div key={result.label}>
                        <p className="font-heading text-lg font-bold text-accent-600 dark:text-accent-400">
                          {result.value}
                        </p>
                        <p className="text-xs text-muted-foreground">{result.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-accent-500/50 hover:bg-accent-50/50 dark:hover:bg-accent-950/50"
          >
            View All Projects
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
