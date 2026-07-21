import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import matter from "gray-matter";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { formatDate } from "@/lib/utils";
import AnimatedCard from "@/components/shared/AnimatedCard";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Blog",
  description: "Stay ahead with insights, guides, and trends in Software Engineering, Cloud Architecture, UI/UX design, and IT strategy from the Veb Techno team.",
};

interface BlogPostItem {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  category: string;
  coverImage: string;
  readTime: string;
}

export default async function BlogPage() {
  const postsDirectory = path.join(process.cwd(), "content", "blog");
  let posts: BlogPostItem[] = [];

  try {
    if (fs.existsSync(postsDirectory)) {
      const filenames = fs.readdirSync(postsDirectory);
      posts = filenames
        .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
        .map((filename) => {
          const filePath = path.join(postsDirectory, filename);
          const fileContents = fs.readFileSync(filePath, "utf8");
          const { data } = matter(fileContents);
          const slug = filename.replace(/\.(mdx|md)$/, "");

          return {
            slug,
            title: data.title || "Untitled",
            date: data.date || "",
            author: data.author || "Anonymous",
            excerpt: data.excerpt || "",
            category: data.category || "General",
            coverImage: data.coverImage || "/images/placeholder.jpg",
            readTime: data.readTime || "5 min read",
          };
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  } catch (error) {
    console.error("Error reading blog directory:", error);
  }

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="pb-16 pt-12 lg:pb-24 lg:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-700 dark:border-accent-800 dark:bg-accent-950 dark:text-accent-300">
              Veb Insights
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Thought Leadership &amp;{" "}
              <span className="bg-gradient-to-r from-accent-500 to-accent-400 bg-clip-text text-transparent">
                IT Strategy
              </span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Explore the latest insights on software development, mobile platforms, design methodologies, and security.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-foreground">No posts found</h2>
              <p className="text-muted-foreground mt-2">Check back later for new articles!</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <div key={post.slug} className="group">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block overflow-hidden rounded-xl border border-border bg-surface hover:shadow-lg transition-all duration-300 hover:border-accent-500/30"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute left-3 top-3 rounded-full bg-accent-600/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="mb-2 font-heading text-lg font-bold text-foreground line-clamp-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-600 dark:text-accent-400">
                        Read Article
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <CTABanner />
    </div>
  );
}
