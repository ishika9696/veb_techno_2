"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, siteConfig } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuVariants: any = {
  closed: { opacity: 0, x: "100%" },
  open: {
    opacity: 1,
    x: "0%",
    transition: { type: "spring", stiffness: 300, damping: 30, staggerChildren: 0.05, delayChildren: 0.1 },
  },
  exit: { opacity: 0, x: "100%", transition: { duration: 0.2 } },
};

const itemVariants: any = {
  closed: { opacity: 0, x: 40 },
  open: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-surface p-6 pt-20 shadow-xl md:hidden"
          >
            {/* Nav Links */}
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <motion.div key={item.href} variants={itemVariants}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-lg font-medium transition-colors",
                        isActive
                          ? "bg-accent-50 text-accent-600 dark:bg-accent-950 dark:text-accent-400"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <div className="ml-auto h-2 w-2 rounded-full bg-accent-600 dark:bg-accent-400" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* CTA */}
            <motion.div variants={itemVariants} className="mt-6">
              <Link
                href="/contact"
                onClick={onClose}
                className="group flex items-center justify-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-accent-700"
              >
                Start Your Project
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Bottom Section */}
            <div className="mt-auto border-t border-border pt-6">
              {/* Contact */}
              <motion.div variants={itemVariants} className="mb-6 space-y-2 text-sm text-muted-foreground">
                <p>{siteConfig.contact.email}</p>
                <p>{siteConfig.contact.phone}</p>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants} className="flex gap-3">
                {[
                  { href: siteConfig.links.twitter, label: "Twitter" },
                  { href: siteConfig.links.linkedin, label: "LinkedIn" },
                  { href: siteConfig.links.github, label: "GitHub" },
                  { href: siteConfig.links.instagram, label: "Instagram" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-border px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <ExternalLink size={14} />
                    <span>{social.label}</span>
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
