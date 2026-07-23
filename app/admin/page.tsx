import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FileText, Briefcase, Users, LogOut, PenSquare, Eye } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [postCount, projectCount, jobCount, draftCount] = await Promise.all([
    prisma.blogPost.count(),
    prisma.portfolioProject.count(),
    prisma.jobListing.count(),
    prisma.blogPost.count({ where: { published: false } }),
  ]);

  const stats = [
    { label: "Blog Posts", value: postCount, icon: FileText, href: "/admin/blog", color: "text-blue-500" },
    { label: "Projects", value: projectCount, icon: Briefcase, href: "/admin/portfolio", color: "text-emerald-500" },
    { label: "Job Listings", value: jobCount, icon: Users, href: "/admin/careers", color: "text-purple-500" },
    { label: "Drafts", value: draftCount, icon: PenSquare, href: "/admin/blog", color: "text-amber-500" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back, {session.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Eye size={14} /> View Site
          </Link>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:text-red-500 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
            >
              <LogOut size={14} /> Logout
            </button>
          </form>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-xl border border-border bg-surface p-6 shadow-sm hover:shadow-md hover:border-accent-500/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon size={20} className={stat.color} />
            </div>
            <p className="font-heading text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-3 rounded-lg border border-border p-4 hover:border-accent-500/30 hover:bg-accent-50/50 dark:hover:bg-accent-950/30 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <FileText size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">New Blog Post</p>
              <p className="text-xs text-muted-foreground">Write a new article</p>
            </div>
          </Link>
          <Link
            href="/admin/portfolio/new"
            className="flex items-center gap-3 rounded-lg border border-border p-4 hover:border-accent-500/30 hover:bg-accent-50/50 dark:hover:bg-accent-950/30 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <Briefcase size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">New Project</p>
              <p className="text-xs text-muted-foreground">Add a case study</p>
            </div>
          </Link>
          <Link
            href="/admin/careers/new"
            className="flex items-center gap-3 rounded-lg border border-border p-4 hover:border-accent-500/30 hover:bg-accent-50/50 dark:hover:bg-accent-950/30 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
              <Users size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">New Job Listing</p>
              <p className="text-xs text-muted-foreground">Post an open position</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
