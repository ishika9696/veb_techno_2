import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TechStackShowcase from "@/components/sections/TechStackShowcase";
import ProjectsShowcase from "@/components/sections/ProjectsShowcase";
import BlogPreview from "@/components/sections/BlogPreview";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";
import faqData from "@/content/faq.json";

export const metadata: Metadata = {
  title: "Veb Techno Inc — Custom Software Engineering & Product Design Studio",
  description:
    "We architect, design, and build scalable web applications, mobile apps, and enterprise cloud solutions tailored for ambitious brands.",
};

/**
 * Below-fold heavy components are code-split with next/dynamic.
 * These contain interactive carousels, counter animations, and accordion state
 * that aren't needed for initial paint / LCP.
 */
const StatsCounter = dynamic(() => import("@/components/sections/StatsCounter"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const CTABanner = dynamic(() => import("@/components/sections/CTABanner"));

export default function HomePage() {
  /* ── JSON-LD: Organization schema ── */
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    /* DEMO DATA: Replace logo URL with real logo before launch */
    logo: `${siteConfig.url}/images/logo.png`,
    description: siteConfig.description,
    /* DEMO DATA: Replace contact info with real data before launch */
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      contactType: "customer service",
      email: siteConfig.contact.email,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "350 Fifth Avenue, Suite 4200",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10118",
      addressCountry: "US",
    },
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.linkedin,
      siteConfig.links.github,
      siteConfig.links.instagram,
    ],
  };

  /* ── JSON-LD: FAQPage schema ── */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Hero />
      <ServicesGrid />
      <WhyChooseUs />
      <TechStackShowcase />
      <ProjectsShowcase />
      <StatsCounter />
      <Testimonials />
      <ProcessTimeline />
      <BlogPreview />
      <FAQ />
      <CTABanner />
    </>
  );
}
