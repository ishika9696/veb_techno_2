"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { Plus, Edit, Trash2, Loader2, Star } from "lucide-react";

interface Project {
  id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  published: boolean;
  featured: boolean;
}

export default function AdminPortfolioListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/portfolio")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .finally(() => setLoading(false));
  }, []);

  const togglePublish = async (id: string, published: boolean) => {
    await fetch(`/api/admin/portfolio/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published }),
    });
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !published } : p))
    );
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await fetch(`/api/admin/portfolio/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Portfolio Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">{projects.length} projects total</p>
        </div>
        <Link href="/admin/portfolio/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent-600 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-700 transition-colors">
          <Plus size={16} /> New Project
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12"><Loader2 size={24} className="animate-spin text-accent-500" /></div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 rounded-xl border border-border bg-surface">
          <p className="text-muted-foreground">No projects yet.</p>
          <Link href="/admin/portfolio/new" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-accent-600">
            Add your first project <Plus size={14} />
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Project</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden sm:table-cell">Category</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground line-clamp-1">{project.title}</p>
                      {project.featured && <Star size={12} className="text-amber-500 fill-amber-500 shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{project.client}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">{project.category}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => togglePublish(project.id, project.published)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                        project.published
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-400"
                          : "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-950 dark:text-amber-400"
                      }`}>
                      {project.published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/portfolio/${project.id}/edit`}
                        className="rounded-lg p-2 text-muted-foreground hover:text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-950 transition-colors">
                        <Edit size={14} />
                      </Link>
                      <button onClick={() => deleteProject(project.id)}
                        className="rounded-lg p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
