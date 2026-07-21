"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import teamData from "@/content/team.json";

export default function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Team"
          title="The People Behind the Work"
          subtitle="A team of senior engineers, designers, and strategists who genuinely care about craft."
        />

        <div ref={ref} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamData.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              {/* Photo */}
              <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Hover overlay with social links */}
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="mb-6 flex gap-2">
                    {Object.entries(member.socials)
                      .filter(([, url]) => url)
                      .map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 items-center gap-1 rounded-lg bg-white/20 px-2 text-xs text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                          aria-label={`${member.name}'s ${platform}`}
                        >
                          <ExternalLink size={12} />
                          <span className="capitalize">{platform}</span>
                        </a>
                      ))}
                  </div>
                </div>
              </div>

              {/* Info */}
              <h3 className="font-heading text-base font-semibold text-foreground">{member.name}</h3>
              <p className="text-sm text-accent-600 dark:text-accent-400">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
