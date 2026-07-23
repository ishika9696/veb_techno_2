import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";
import CTABanner from "@/components/sections/CTABanner";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: resolvedParams.slug, published: true },
    });
    if (!post) return {};

    const title = post.title;
    const description = post.excerpt || `Read "${post.title}" on the Veb Techno blog.`;
    const url = `${siteConfig.url}/blog/${post.slug}`;

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        title: `${title} | ${siteConfig.name} Blog`,
        description,
        url,
        type: "article",
        publishedTime: post.publishedAt?.toISOString(),
        authors: [post.author],
        ...(post.coverImage && { images: [{ url: post.coverImage, alt: title }] }),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        ...(post.coverImage && { images: [post.coverImage] }),
      },
    };
  } catch {
    return {};
  }
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return posts.map((p: { slug: string }) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  let post = null;

  try {
    post = await prisma.blogPost.findUnique({
      where: { slug: resolvedParams.slug, published: true },
    });
  } catch (err) {
    console.error("Failed to fetch post:", err);
  }

  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || "",
    datePublished: post.publishedAt?.toISOString(),
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    url: `${siteConfig.url}/blog/${post.slug}`,
    ...(post.coverImage && { image: post.coverImage }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteConfig.url}/blog/${post.slug}` },
    ],
  };

  return (
    <div className="pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to all articles
        </Link>

        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="rounded-full bg-accent-100 text-accent-600 dark:bg-accent-950 dark:text-accent-400 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            {post.category}
          </span>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mt-4 leading-tight">
            {post.title}
          </h1>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 border-y border-border py-4 mb-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User size={16} />
            <span>{post.author}</span>
          </div>
          {post.publishedAt && (
            <div className="flex items-center gap-1.5">
              <Calendar size={16} />
              <time dateTime={post.publishedAt.toISOString()}>{formatDate(post.publishedAt.toISOString())}</time>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Clock size={16} />
            <span>{post.readTime}</span>
          </div>
        </div>

        {post.coverImage && (
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-border shadow-lg mb-12">
            <Image src={post.coverImage} alt={`Featured image for "${post.title}"`} fill className="object-cover" priority sizes="100vw" />
          </div>
        )}

        <div
          className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:mb-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-li:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <CTABanner />
    </div>
  );
}
