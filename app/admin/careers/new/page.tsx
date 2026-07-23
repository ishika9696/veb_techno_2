"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import RepeatableListInput from "@/components/admin/RepeatableListInput";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewJobListingPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [department, setDepartment] = useState("Engineering");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [published, setPublished] = useState(true);

  const generateSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const handleTitleChange = (val: string) => { setTitle(val); if (!slug || slug === generateSlug(title)) setSlug(generateSlug(val)); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setSaving(true);
    try {
      const res = await fetch("/api/admin/careers", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, department, location, employmentType, description, responsibilities, requirements, published }) });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Failed"); }
      setSuccess(true); setTimeout(() => router.push("/admin/careers"), 1000);
    } catch (err) { setError(err instanceof Error ? err.message : "Something went wrong"); }
    finally { setSaving(false); }
  };

  return (
    <AdminShell>
      <div className="mb-6">
        <Link href="/admin/careers" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"><ArrowLeft size={14} /> Back to listings</Link>
        <h1 className="font-heading text-2xl font-bold text-foreground">New Job Listing</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div><label className="mb-1.5 block text-sm font-medium text-foreground">Title *</label>
              <input type="text" value={title} onChange={(e) => handleTitleChange(e.target.value)} required className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" /></div>
            <div><label className="mb-1.5 block text-sm font-medium text-foreground">Slug *</label>
              <div className="flex items-center gap-2"><span className="text-sm text-muted-foreground">/careers/</span>
              <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className="flex-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" /></div></div>
            <div><label className="mb-1.5 block text-sm font-medium text-foreground">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 resize-none" placeholder="About this role..." /></div>
            <RepeatableListInput label="Responsibilities" values={responsibilities} onChange={setResponsibilities} placeholder="e.g. Lead technical architecture..." />
            <RepeatableListInput label="Requirements" values={requirements} onChange={setRequirements} placeholder="e.g. 5+ years React experience..." />
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Published</label>
                <button type="button" onClick={() => setPublished(!published)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${published ? "bg-accent-600" : "bg-muted"}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${published ? "translate-x-6" : "translate-x-1"}`} /></button>
              </div>
            </div>
            <div><label className="mb-1.5 block text-sm font-medium text-foreground">Department</label>
              <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20">
                {["Engineering", "Design", "DevOps", "Marketing", "Sales", "Operations"].map((d) => (<option key={d} value={d}>{d}</option>))}
              </select></div>
            <div><label className="mb-1.5 block text-sm font-medium text-foreground">Location</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" placeholder="New York, NY (Hybrid)" /></div>
            <div><label className="mb-1.5 block text-sm font-medium text-foreground">Employment Type</label>
              <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20">
                {["Full-time", "Part-time", "Contract", "Internship"].map((t) => (<option key={t} value={t}>{t}</option>))}
              </select></div>
          </div>
        </div>
        {error && <div className="rounded-lg bg-red-50 dark:bg-red-950/50 px-4 py-3 text-sm text-red-600 dark:text-red-400">{error}</div>}
        {success && <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/50 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">Job listing created! Redirecting...</div>}
        <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
          {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save Listing</>}
        </button>
      </form>
    </AdminShell>
  );
}
