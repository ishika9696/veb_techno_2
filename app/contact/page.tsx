import type { Metadata } from "next";
import { Mail, Phone, MapPin, ExternalLink, Clock, Sparkles } from "lucide-react";
import ContactForm from "@/components/shared/ContactForm";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Veb Techno Inc team. Start a new project, evaluate tech stacks, or request a quote for IT solutions.",
};

const offices = [
  {
    name: "Headquarters (New York)",
    address: siteConfig.contact.address,
    phone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
  }
];

export default function ContactPage() {
  return (
    <div className="pt-24">
      {/* Hero Header */}
      <section className="pb-12 pt-12 lg:pb-16 lg:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-accent-200 bg-accent-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent-700 dark:border-accent-800 dark:bg-accent-950 dark:text-accent-300">
              <Sparkles size={12} /> Get In Touch
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Let&apos;s Build Something{" "}
              <span className="bg-gradient-to-r from-accent-500 to-accent-400 bg-clip-text text-transparent">
                Great Together
              </span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Have a project, a question, or a business idea? Drop us a line and let&apos;s start engineering.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Info Section */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Form Column (7 cols on desktop) */}
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:col-span-7 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Send Us a Message</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Fill out the details below and our technical leads will respond within 24 hours.
              </p>
              <ContactForm />
            </div>

            {/* Info Cards Column (5 cols on desktop) */}
            <div className="space-y-6 lg:col-span-5 flex flex-col">
              {/* Office Details */}
              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-6 shadow-sm">
                <h2 className="font-heading text-xl font-bold text-foreground">Office Details</h2>
                {offices.map((office, idx) => (
                  <div key={idx} className="space-y-4">
                    <h3 className="font-heading text-base font-semibold text-foreground">{office.name}</h3>
                    <ul className="space-y-3.5">
                      <li className="flex items-start gap-3 text-sm text-muted-foreground">
                        <MapPin size={18} className="text-accent-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{office.address}</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Phone size={18} className="text-accent-500 shrink-0" />
                        <a href={`tel:${office.phone}`} className="hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                          {office.phone}
                        </a>
                      </li>
                      <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Mail size={18} className="text-accent-500 shrink-0" />
                        <a href={`mailto:${office.email}`} className="hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                          {office.email}
                        </a>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>

              {/* Working Hours & Availability */}
              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-3 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <Clock size={18} className="text-accent-500 shrink-0" />
                  <h3 className="font-heading text-base font-semibold text-foreground">Response SLA & Hours</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Monday – Friday: 9:00 AM – 6:00 PM EST
                </p>
                <p className="text-xs font-semibold text-accent-600 dark:text-accent-400">
                  ⚡ Average response time: Under 24 hours
                </p>
              </div>

              {/* Social Links Card */}
              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
                <h3 className="font-heading text-base font-semibold text-foreground mb-4">Connect With Us</h3>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { name: "LinkedIn", href: siteConfig.links.linkedin },
                    { name: "Twitter", href: siteConfig.links.twitter },
                    { name: "GitHub", href: siteConfig.links.github },
                    { name: "Instagram", href: siteConfig.links.instagram }
                  ].map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-accent-500/50 hover:bg-accent-50 hover:text-accent-600 dark:hover:bg-accent-950 dark:hover:text-accent-400"
                    >
                      {s.name} <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

