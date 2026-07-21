import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import services from "@/content/services.json";
import projects from "@/content/projects.json";
import CTABanner from "@/components/sections/CTABanner";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateStaticParams() {
  return services.map((s) => ({
    slug: s.slug,
  }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const service = services.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const IconComponent = (LucideIcons as any)[service.icon];

  /* Find related projects */
  const relatedProjects = projects.filter((p) =>
    service.relatedProjects.includes(p.slug)
  );

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to services
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100 text-accent-600 dark:bg-accent-950 dark:text-accent-400">
                {IconComponent ? <IconComponent size={24} /> : <LucideIcons.Code size={24} />}
              </div>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {service.longDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Tools */}
      <section className="py-16 lg:py-24 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Features */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Key Offerings</h2>
              <ul className="space-y-4">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-accent-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools & Tech */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Technologies & Tools</h2>
              <div className="grid grid-cols-2 gap-4">
                {service.tools.map((tool, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 hover:border-accent-500/30 transition-colors"
                  >
                    <div className="h-2 w-2 rounded-full bg-accent-500" />
                    <span className="font-heading text-sm font-semibold text-foreground">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 lg:py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-12 text-center">Service Delivery Process</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {service.process.map((p, idx) => (
              <div
                key={idx}
                className="relative rounded-xl border border-border bg-surface p-6 hover:shadow-md transition-shadow"
              >
                <div className="absolute top-4 right-4 font-heading text-3xl font-extrabold text-accent-500/10">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">{p.step}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 lg:py-24 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6 text-center">Pricing Plans</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Choose a plan that fits your business stage, or contact us for a custom quote tailored to your exact scope.
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {service.pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col rounded-xl border p-8 bg-surface ${
                  tier.highlighted
                    ? "border-accent-500 ring-2 ring-accent-500/25 scale-105 shadow-lg z-10"
                    : "border-border"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-600 px-3 py-1 text-xs font-semibold text-white">
                    Popular Option
                  </span>
                )}
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-heading text-3xl font-extrabold text-foreground">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="text-xs text-muted-foreground">/ project start</span>}
                </div>
                <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <LucideIcons.Check size={14} className="text-accent-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`w-full text-center rounded-lg py-2.5 text-sm font-semibold transition-all ${
                    tier.highlighted
                      ? "bg-accent-600 text-white hover:bg-accent-700 hover:shadow-glow"
                      : "border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 lg:py-24 border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-12">Related Case Studies</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {relatedProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/portfolio/${project.slug}`}
                  className="group block overflow-hidden rounded-xl border border-border bg-surface hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400">
                      {project.category}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-foreground mt-2 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {project.problem}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 dark:text-accent-400">
                      Read case study
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </div>
  );
}
