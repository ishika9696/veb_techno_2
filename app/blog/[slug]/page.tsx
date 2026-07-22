import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";
import CTABanner from "@/components/sections/CTABanner";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

/** Helper to load frontmatter by slug */
function getPostData(slug: string) {
  const postsDirectory = path.join(process.cwd(), "content", "blog");
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const fileContents = fs.readFileSync(filePath, "utf8");
  return matter(fileContents);
}

/* ── SEO: Per-article metadata ── */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const result = getPostData(resolvedParams.slug);
  if (!result) return {};

  const { data } = result;
  const title = data.title;
  const description = data.excerpt || `Read "${data.title}" on the Veb Techno blog.`;
  const url = `${siteConfig.url}/blog/${resolvedParams.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name} Blog`,
      description,
      url,
      type: "article",
      publishedTime: data.date,
      authors: [data.author],
      ...(data.coverImage && {
        images: [{ url: data.coverImage, alt: title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(data.coverImage && {
        images: [data.coverImage],
      }),
    },
  };
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "content", "blog");
  try {
    if (fs.existsSync(postsDirectory)) {
      const filenames = fs.readdirSync(postsDirectory);
      return filenames
        .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
        .map((filename) => ({
          slug: filename.replace(/\.(mdx|md)$/, ""),
        }));
    }
  } catch (err) {
    console.error(err);
  }
  return [];
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const postsDirectory = path.join(process.cwd(), "content", "blog");
  const filePath = path.join(postsDirectory, `${resolvedParams.slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContents);

  /* ── JSON-LD: Article schema ── */
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.excerpt || "",
    datePublished: data.date,
    author: {
      "@type": "Person",
      name: data.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/blog/${resolvedParams.slug}`,
    ...(data.coverImage && {
      image: data.coverImage,
    }),
  };

  /* ── JSON-LD: BreadcrumbList ── */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
      { "@type": "ListItem", position: 3, name: data.title, item: `${siteConfig.url}/blog/${resolvedParams.slug}` },
    ],
  };

  return (
    <div className="pt-24">
      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to all articles
        </Link>

        {/* Category & Title */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="rounded-full bg-accent-100 text-accent-600 dark:bg-accent-950 dark:text-accent-400 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            {data.category}
          </span>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mt-4 leading-tight">
            {data.title}
          </h1>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center justify-center gap-6 border-y border-border py-4 mb-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User size={16} />
            <span>{data.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={16} />
            <time dateTime={data.date}>{formatDate(data.date)}</time>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={16} />
            <span>{data.readTime}</span>
          </div>
        </div>

        {/* Featured Image */}
        {data.coverImage && (
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-border shadow-lg mb-12">
            <Image
              src={data.coverImage}
              alt={`Featured image for "${data.title}" — ${data.category} article by ${data.author}`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        )}

        {/* Content Body */}
        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:mb-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-li:text-muted-foreground">
          <MDXRemote source={content} />
        </div>
      </article>

      <CTABanner />
    </div>
  );
}
