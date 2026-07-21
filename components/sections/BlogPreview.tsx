"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { formatDate } from "@/lib/utils";

/* Hardcoded blog preview data to avoid MDX parsing on client */
const blogPreviews = [
  {
    slug: "future-of-web-development",
    title: "The Future of Web Development: Trends to Watch in 2026",
    date: "2026-06-15",
    excerpt: "From AI-powered development tools to edge computing and WebAssembly — here are the technologies reshaping how we build for the web.",
    category: "Web Development",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    readTime: "6 min read",
  },
  {
    slug: "mobile-first-strategy",
    title: "Why Your Business Needs a Mobile-First Strategy in 2026",
    date: "2026-05-28",
    excerpt: "Mobile traffic now accounts for 72% of all web visits. Here's why mobile-first isn't optional anymore — and how to get it right.",
    category: "Mobile Development",
    coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    readTime: "5 min read",
  },
  {
    slug: "cloud-migration-guide",
    title: "Cloud Migration: A Practical Guide for Growing Companies",
    date: "2026-05-10",
    excerpt: "Thinking about moving to the cloud? Here's a no-nonsense guide covering strategy, common pitfalls, and how to make the transition.",
    category: "Cloud & DevOps",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    readTime: "7 min read",
  },
];

export default function BlogPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Insights"
          title="From Our Blog"
          subtitle="Thoughts, insights, and best practices from our team on building great technology."
        />

        <div ref={ref} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPreviews.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-accent-500/30 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-accent-600/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="mb-2 font-heading text-base font-semibold text-foreground line-clamp-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-accent-500/50 hover:bg-accent-50/50 dark:hover:bg-accent-950/50"
          >
            View All Posts
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
