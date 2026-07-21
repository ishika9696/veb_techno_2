"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import faqData from "@/content/faq.json";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FAQ"
          title="Questions? We've Got Answers"
          subtitle="Everything you need to know about working with us."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl space-y-3"
        >
          {faqData.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-accent-500/20"
            >
              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="pr-4 font-heading text-base font-semibold text-foreground">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors"
                >
                  {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="border-t border-border px-6 pb-5 pt-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
