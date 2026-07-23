"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import ImageUploader from "@/components/admin/ImageUploader";
import RepeatableListInput from "@/components/admin/RepeatableListInput";
import MetricsInput from "@/components/admin/MetricsInput";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EditPortfolioProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [client, setClient] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<{ label: string; value: string }[]>([]);
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/portfolio/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title || "");
        setSlug(data.slug || "");
        setClient(data.client || "");
        setCategory(data.category || "Web Development");
        setProblem(data.problem || "");
        setSolution(data.solution || "");
        setTechStack(Array.isArray(data.techStack) ? data.techStack : []);
        setCoverImage(data.coverImage || "");
        setGallery(Array.isArray(data.gallery) ? data.gallery : []);
        setMetrics(Array.isArray(data.metrics) ? data.metrics : []);
        setFeatured(data.featured || false);
        setPublished(data.published ?? true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/portfolio/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, client, category, description: "", problem, solution, techStack, coverImage, gallery, metrics, testimonial: null, featured, published }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Failed"); }
      setSuccess(true);
      setTimeout(() => router.push("/admin/portfolio"), 1000);
    } catch (err) { setError(err instanceof Error ? err.message : "Something went wrong"); }
    finally { setSaving(false); }
  };

  const categories = ["Web Development", "Mobile App", "UI/UX Design", "Cloud & DevOps", "Cybersecurity", "Digital Marketing"];

  if (loading) {
    return <AdminShell><div className="flex items-center justify-center py-12"><Loader2 size={24} className="animate-spin text-accent-500" /></div></AdminShell>;
  }

  return (
    <AdminShell>
      <div className="mb-6">
        <Link href="/admin/portfolio" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft size={14} /> Back to projects
        </Link>
        <h1 className="font-heading text-2xl font-bold text-foreground">Edit Project</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Title *</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Client</label>
                <input type="text" value={client} onChange={(e) => setClient(e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Slug *</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">/portfolio/</span>
                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required
                  className="flex-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">The Challenge</label>
              <textarea value={problem} onChange={(e) => setProblem(e.target.value)} rows={4}
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 resize-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Our Solution</label>
              <textarea value={solution} onChange={(e) => setSolution(e.target.value)} rows={4}
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 resize-none" />
            </div>
            <RepeatableListInput label="Tech Stack" values={techStack} onChange={setTechStack} placeholder="e.g. React, TypeScript" />
            <MetricsInput values={metrics} onChange={setMetrics} />
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-surface p-4 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Published</label>
                <button type="button" onClick={() => setPublished(!published)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${published ? "bg-accent-600" : "bg-muted"}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${published ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Featured</label>
                <button type="button" onClick={() => setFeatured(!featured)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${featured ? "bg-amber-500" : "bg-muted"}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${featured ? "translate-x-6" : "translate-x-1"}`} />
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
            <ImageUploader value={coverImage} onChange={setCoverImage} />
            <RepeatableListInput label="Gallery Image URLs" values={gallery} onChange={setGallery} placeholder="Paste image URL..." />
          </div>
        </div>
        {error && <div className="rounded-lg bg-red-50 dark:bg-red-950/50 px-4 py-3 text-sm text-red-600 dark:text-red-400">{error}</div>}
        {success && <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/50 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">Project updated! Redirecting...</div>}
        <button type="submit" disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
          {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Update Project</>}
        </button>
      </form>
    </AdminShell>
  );
}
