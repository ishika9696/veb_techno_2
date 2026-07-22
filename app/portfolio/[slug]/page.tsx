import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import projects from "@/content/projects.json";
import { siteConfig } from "@/lib/constants";
import CTABanner from "@/components/sections/CTABanner";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

/* ── SEO: Per-project metadata ── */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);
  if (!project) return {};

  const title = `${project.title} — Case Study`;
  const description = `See how Veb Techno Inc helped ${project.client} with ${project.category.toLowerCase()}. ${project.problem.slice(0, 120)}…`;
  const url = `${siteConfig.url}/portfolio/${project.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      type: "article",
      images: [{ url: project.coverImage, alt: `${project.title} case study` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.coverImage],
    },
  };
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  /* ── JSON-LD: BreadcrumbList ── */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: `${siteConfig.url}/portfolio` },
      { "@type": "ListItem", position: 3, name: project.title, item: `${siteConfig.url}/portfolio/${project.slug}` },
    ],
  };

  return (
    <div className="pt-24">
      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li>/</li>
          <li><Link href="/portfolio" className="hover:text-foreground transition-colors">Portfolio</Link></li>
          <li>/</li>
          <li className="text-foreground font-medium">{project.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to portfolio
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400">
                {project.category}
              </span>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl mt-2">
                {project.title}
              </h1>
              {/* DEMO DATA: Replace client names with real clients before launch */}
              <p className="mt-2 text-lg text-muted-foreground">Client: {project.client}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image Banner */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-border shadow-lg">
            <Image
              src={project.images[0] || project.coverImage}
              alt={`${project.title} — ${project.category} project hero image`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* Case Study Details */}
      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left Content (Problem/Solution) */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">The Challenge</h2>
                <p className="text-base leading-relaxed text-muted-foreground">{project.problem}</p>
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Our Solution</h2>
                <p className="text-base leading-relaxed text-muted-foreground">{project.solution}</p>
              </div>

              {/* Extra Images Grid */}
              <div className="grid gap-4 sm:grid-cols-2 pt-6">
                {project.images.slice(1, 3).map((img, idx) => (
                  <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-border">
                    <Image
                      src={img}
                      alt={`${project.title} — ${project.category} implementation detail ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar (Metrics & Tech) */}
            <div className="space-y-8">
              {/* Metrics — DEMO DATA: Replace with real metrics before launch */}
              <div className="rounded-xl border border-border bg-muted/30 p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-6">Key Results</h3>
                <div className="space-y-6">
                  {project.results.map((r, idx) => (
                    <div key={idx} className="border-b border-border last:border-0 pb-4 last:pb-0">
                      <p className="font-heading text-3xl font-extrabold text-accent-600 dark:text-accent-400">
                        {r.value}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="rounded-xl border border-border bg-muted/30 p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Testimonial */}
      {project.testimonial && (
        <section className="py-16 lg:py-24 border-t border-border bg-muted/30">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">What the Client Said</h2>
            <blockquote className="text-xl italic leading-relaxed text-foreground mb-6">
              &ldquo;{project.testimonial.quote}&rdquo;
            </blockquote>
            <p className="font-heading text-base font-semibold text-accent-600 dark:text-accent-400">
              {project.testimonial.author}
            </p>
            <p className="text-xs text-muted-foreground">{project.testimonial.role}</p>
          </div>
        </section>
      )}

      <CTABanner />
    </div>
  );
}
