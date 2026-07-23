import Link from "next/link";
import {
  ExternalLink,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { siteConfig } from "@/lib/constants";
import NewsletterForm from "./NewsletterForm";

/**
 * Footer — Server Component
 * Converted from client component. Framer Motion whileHover/whileTap replaced
 * with CSS hover:/active: transforms. Newsletter form extracted to a tiny
 * client component (NewsletterForm) since it needs onSubmit.
 */

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

/* DEMO DATA: Replace these with real social media links before launch */
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

            {/* Social Links — CSS hover instead of Framer Motion whileHover */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-10 min-h-[40px] items-center justify-center gap-1.5 rounded-lg border border-border px-3.5 text-xs text-muted-foreground transition-all duration-200 hover:border-accent-500/50 hover:bg-accent-50 hover:text-accent-600 hover:scale-105 hover:-translate-y-0.5 active:scale-95 dark:hover:bg-accent-950 dark:hover:text-accent-400"
                >
                  <ExternalLink size={14} className="shrink-0" />
                  <span>{social.label}</span>
                </a>
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
            {/* DEMO DATA: Replace email, phone, and address with real info before launch */}
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
              <NewsletterForm />
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
