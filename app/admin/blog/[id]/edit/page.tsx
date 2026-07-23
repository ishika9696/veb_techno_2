"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import TiptapEditor from "@/components/admin/TiptapEditor";
import ImageUploader from "@/components/admin/ImageUploader";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("General");
  const [readTime, setReadTime] = useState("5 min read");
  const [author, setAuthor] = useState("Veb Techno Team");
  const [published, setPublished] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/blog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title || "");
        setSlug(data.slug || "");
        setExcerpt(data.excerpt || "");
        setContent(data.content || "");
        setCoverImage(data.coverImage || "");
        setCategory(data.category || "General");
        setReadTime(data.readTime || "5 min read");
        setAuthor(data.author || "Veb Techno Team");
        setPublished(data.published || false);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, excerpt, content, coverImage, category, readTime, author, published }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update post");
      }

      setSuccess(true);
      setTimeout(() => router.push("/admin/blog"), 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const categories = ["General", "IT Consulting", "Web Development", "Mobile App", "Cloud & DevOps", "UI/UX Design", "Cybersecurity"];

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center py-12">
          <Loader2 size={24} className="animate-spin text-accent-500" />
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="mb-6">
        <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft size={14} /> Back to posts
        </Link>
        <h1 className="font-heading text-2xl font-bold text-foreground">Edit Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Slug *</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">/blog/</span>
                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required
                  className="flex-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Excerpt</label>
              <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3}
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 resize-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Content</label>
              <TiptapEditor content={content} onChange={setContent} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Published</label>
                <button type="button" onClick={() => setPublished(!published)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${published ? "bg-accent-600" : "bg-muted"}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${published ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20">
                {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Author</label>
              <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Read Time</label>
              <input type="text" value={readTime} onChange={(e) => setReadTime(e.target.value)}
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
            </div>
            <ImageUploader value={coverImage} onChange={setCoverImage} />
          </div>
        </div>

        {error && <div className="rounded-lg bg-red-50 dark:bg-red-950/50 px-4 py-3 text-sm text-red-600 dark:text-red-400">{error}</div>}
        {success && <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/50 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">Post updated! Redirecting...</div>}

        <button type="submit" disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
          {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Update Post</>}
        </button>
      </form>
    </AdminShell>
  );
}
