import type { Metadata } from "next";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
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
      <section className="pb-16 pt-12 lg:pb-24 lg:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-700 dark:border-accent-800 dark:bg-accent-950 dark:text-accent-300">
              Get In Touch
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
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>

            {/* Info & Map */}
            <div className="space-y-8 flex flex-col justify-between">
              {/* Office Details */}
              <div className="rounded-2xl border border-border bg-muted/20 p-8 space-y-6">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Office Details</h2>
                {offices.map((office, idx) => (
                  <div key={idx} className="space-y-4">
                    <h3 className="font-heading text-lg font-bold text-foreground">{office.name}</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-sm text-muted-foreground">
                        <MapPin size={16} className="text-accent-500 shrink-0 mt-0.5" />
                        <span>{office.address}</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Phone size={16} className="text-accent-500 shrink-0" />
                        <a href={`tel:${office.phone}`} className="hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                          {office.phone}
                        </a>
                      </li>
                      <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Mail size={16} className="text-accent-500 shrink-0" />
                        <a href={`mailto:${office.email}`} className="hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                          {office.email}
                        </a>
                      </li>
                    </ul>
                  </div>
                ))}

                {/* Social Links */}
                <div className="pt-6 border-t border-border">
                  <h4 className="font-heading text-sm font-semibold text-foreground mb-3">Connect With Us</h4>
                  <div className="flex gap-4 flex-wrap">
                    {[
                      { name: "LinkedIn", href: siteConfig.links.linkedin },
                      { name: "Twitter", href: siteConfig.links.twitter },
                      { name: "GitHub", href: siteConfig.links.github }
                    ].map((s) => (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-accent-600 dark:text-accent-400 hover:text-accent-500"
                      >
                        {s.name} <ExternalLink size={12} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="relative overflow-hidden rounded-2xl border border-border h-72 w-full shadow-sm">
                <iframe
                  title="Veb Techno Inc NYC Headquarters Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.4284144426577!2d-73.98731968459384!3d40.74844047932824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1m5!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1642820542385!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
