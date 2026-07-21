import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { formatDate } from "@/lib/utils";
import CTABanner from "@/components/sections/CTABanner";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
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

  return (
    <div className="pt-24">
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
            <time>{formatDate(data.date)}</time>
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
              alt={data.title}
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
