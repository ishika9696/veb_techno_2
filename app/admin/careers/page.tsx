"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";

interface Job {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
  published: boolean;
}

export default function AdminCareersListPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/careers")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  const togglePublish = async (id: string, published: boolean) => {
    await fetch(`/api/admin/careers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published }),
    });
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, published: !published } : j)));
  };

  const deleteJob = async (id: string) => {
    if (!confirm("Delete this job listing?")) return;
    await fetch(`/api/admin/careers/${id}`, { method: "DELETE" });
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Job Listings</h1>
          <p className="text-sm text-muted-foreground mt-1">{jobs.length} listings total</p>
        </div>
        <Link
          href="/admin/careers/new"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent-600 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-700 transition-colors self-start sm:self-auto"
        >
          <Plus size={16} /> New Listing
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={24} className="animate-spin text-accent-500" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12 rounded-xl border border-border bg-surface">
          <p className="text-muted-foreground">No job listings yet.</p>
          <Link href="/admin/careers/new" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-accent-600">
            Create your first job listing <Plus size={14} />
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-surface overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-border bg-muted/30 text-left">
                  <th className="px-4 py-3 font-medium text-muted-foreground">Position</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Department</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Type</th>
                  <th className="px-4 py-3 text-center font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{job.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{job.location}</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">{job.department}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{job.employmentType}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => togglePublish(job.id, job.published)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                          job.published
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-400"
                            : "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-950 dark:text-amber-400"
                        }`}
                      >
                        {job.published ? "Active" : "Draft"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/careers/${job.id}/edit`}
                          className="rounded-lg p-2 text-muted-foreground hover:text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-950 transition-colors"
                        >
                          <Edit size={14} />
                        </Link>
                        <button
                          onClick={() => deleteJob(job.id)}
                          className="rounded-lg p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
