"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import testimonials from "@/content/testimonials.json";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Testimonials"
          title="What Our Clients Say"
          subtitle="Don't take our word for it — hear from the teams we've partnered with."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-3xl"
        >
          {/* Quote Icon */}
          <div className="absolute -left-2 -top-2 text-accent-200 dark:text-accent-900 sm:-left-6 sm:-top-4">
            <Quote size={48} strokeWidth={1} />
          </div>

          {/* Card */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-warning-400 text-warning-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="mb-6 text-base leading-relaxed text-foreground sm:text-lg">
                  &ldquo;{testimonials[current].content}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={testimonials[current].avatar}
                      alt={testimonials[current].name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="font-heading text-sm font-semibold text-foreground">
                      {testimonials[current].name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonials[current].role}, {testimonials[current].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-8 bg-accent-600"
                        : "w-2 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prev}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={next}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={16} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
