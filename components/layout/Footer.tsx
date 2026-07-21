"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { siteConfig } from "@/lib/constants";

const footerLinks = {
  services: [
    { label: "Web Development", href: "/services/web-development" },
    { label: "Mobile Apps", href: "/services/mobile-app-development" },
    { label: "UI/UX Design", href: "/services/ui-ux-design" },
    { label: "Cloud & DevOps", href: "/services/cloud-devops" },
    { label: "Cybersecurity", href: "/services/cybersecurity" },
    { label: "IT Consulting", href: "/services/it-consulting" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
};

const socialLinks = [
  { href: siteConfig.links.twitter, label: "Twitter" },
  { href: siteConfig.links.linkedin, label: "LinkedIn" },
  { href: siteConfig.links.github, label: "GitHub" },
  { href: siteConfig.links.instagram, label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface">
      {/* Subtle gradient top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* ── Company Info ── */}
          <div className="lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-600 text-white font-heading font-bold text-sm">
                VT
              </div>
              <span className="font-heading text-lg font-bold text-foreground">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We architect, design, and engineer digital products that transform
              businesses. Bold ideas, exceptional execution.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border px-3 text-xs text-muted-foreground transition-colors hover:border-accent-500/50 hover:bg-accent-50 hover:text-accent-600 dark:hover:bg-accent-950 dark:hover:text-accent-400"
                >
                  <ExternalLink size={12} />
                  <span>{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Services ── */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent-600 dark:hover:text-accent-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company ── */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent-600 dark:hover:text-accent-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent-600 dark:hover:text-accent-400"
                >
                  <Mail size={14} />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent-600 dark:hover:text-accent-400"
                >
                  <Phone size={14} />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                {siteConfig.contact.address}
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm font-medium text-foreground">Stay updated</p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-2 flex gap-2"
              >
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 transition-colors"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-lg bg-accent-600 px-3 py-2 text-white transition-colors hover:bg-accent-700"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight size={16} />
                </motion.button>
              </form>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
