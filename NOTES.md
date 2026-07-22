# Veb Techno Inc — Optimization Notes & Checklist

## Overview of Optimizations Applied

### 1. Performance & Core Web Vitals
- **Icon Tree-Shaking**: Replaced `import * as LucideIcons` with a static icon mapping in `ServicesGrid.tsx`, `ServicesPageContent.tsx`, and `app/services/[slug]/page.tsx`. Reduced client bundle size by eliminating the ~300KB `lucide-react` barrel import.
- **Client to Server Component Conversion**: 
  - `SectionHeading.tsx`: Converted to a Server Component using pure CSS animations (`animate-fade-in`, `animate-slide-up`).
  - `TechStackShowcase.tsx`: Converted to a Server Component as it uses pure CSS marquee animations without state/hooks.
  - `Footer.tsx`: Converted to a Server Component; extracted `NewsletterForm.tsx` as a minimal client component for handling `onSubmit`.
  - `not-found.tsx`: Converted 404 page to a Server Component with CSS scaling animation.
- **Code-Splitting via `next/dynamic`**: Wrapped below-the-fold heavy interactive components on the home page (`StatsCounter`, `Testimonials`, `FAQ`, `CTABanner`) with `{ ssr: false }` dynamic imports.
- **Image Optimization**:
  - Configured `next.config.ts` to automatically format images in **AVIF** (preferred) and **WebP** formats.
  - Added `priority` loading prop to the hero blog post image on `/blog` to optimize LCP.

### 2. Technical SEO & Metadata
- **Canonical URLs**: Added `alternates: { canonical: "./" }` in `app/layout.tsx` so all pages auto-generate self-referencing canonical links based on `metadataBase`.
- **Per-Page Metadata (`generateMetadata`)**:
  - `app/services/[slug]/page.tsx`: Generates dynamic SEO title, description, and OpenGraph/Twitter card for each service.
  - `app/blog/[slug]/page.tsx`: Generates article title, excerpt description, and featured cover image OpenGraph metadata.
  - `app/portfolio/[slug]/page.tsx`: Generates project case study title, description, and cover image metadata.
  - `app/portfolio/page.tsx`: Added missing metadata export.
  - `app/careers/page.tsx`: Added missing metadata export.
- **JSON-LD Structured Data**:
  - **Organization**: Embedded in `app/page.tsx` and `app/layout.tsx`.
  - **FAQPage**: Embedded in `app/page.tsx` pulling structured questions/answers from `content/faq.json`.
  - **Service**: Embedded on all `/services/[slug]` detail pages.
  - **Article**: Embedded on all `/blog/[slug]` detail pages.
  - **BreadcrumbList**: Embedded on Service detail, Blog detail, and Portfolio detail pages with semantic HTML breadcrumbs.
- **Image Alt Texts**: Improved accessibility and image SEO by replacing generic alt tags with descriptive titles (e.g., `${project.title} — ${project.category} case study`).

### 3. Content Quality & SEO Keywords
- **Expanded FAQ**: Added 3 new high-intent search query items to `content/faq.json` (Tech stack expertise, Startup offerings, App modernization).
- **Service Copy Enrichment**: Updated `content/services.json` descriptions with natural industry-relevant keywords ("custom web development company", "cloud migration services", "mobile app development agency").
- **Hero CTA**: Optimized hero action copy to "Get a Free Consultation".
- **Demo Data Flagging**: Added explicit `_DEMO_DATA_WARNING` markers in `content/team.json`, `content/testimonials.json`, `content/projects.json`, and comments in `lib/constants.ts` to clearly signal placeholder content that requires client updates prior to production launch.

---

## Post-Launch Action Items / Content Checklist for Client

- [ ] Replace placeholder address and phone number in `lib/constants.ts` and `app/contact/page.tsx`.
- [ ] Add real client case studies and metrics in `content/projects.json`.
- [ ] Add real client quotes and company names in `content/testimonials.json`.
- [ ] Add real team member photos and bios in `content/team.json`.
- [ ] Connect contact form endpoint in `app/api/contact/route.ts` to an email service provider (e.g., Resend, SendGrid).
