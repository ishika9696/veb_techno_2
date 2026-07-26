"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, Briefcase, Users, LogOut, Eye, LayoutDashboard, Menu, X } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
  { label: "Careers", href: "/admin/careers", icon: Users },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.email) setEmail(data.email);
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-2 sm:gap-4">
            {/* Left: Logo & Nav Links */}
            <div className="flex items-center gap-3 sm:gap-6 min-w-0">
              <Link href="/admin" className="flex items-center gap-2 shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-600 text-white font-heading font-bold text-xs">
                  VT
                </div>
                <span className="font-heading text-sm font-bold text-foreground">
                  Admin Panel
                </span>
              </Link>

              {/* Desktop Nav Items */}
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/admin" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-300 font-semibold"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <item.icon size={15} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right: Welcome, View Site, Logout (Desktop) */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
              {email && (
                <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                  Welcome back, <strong className="font-medium text-foreground">{email}</strong>
                </span>
              )}
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Eye size={14} />
                  <span>View Site</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-red-500 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-2 md:hidden">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-border p-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                title="View Site"
              >
                <Eye size={16} />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-surface px-4 py-3 md:hidden space-y-3 shadow-lg">
            {email && (
              <div className="pb-2 border-b border-border text-xs text-muted-foreground">
                Welcome back, <span className="font-semibold text-foreground">{email}</span>
              </div>
            )}
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-300 font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="pt-2 border-t border-border flex items-center justify-between">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                <Eye size={14} /> View Public Site
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:underline"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Body */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
