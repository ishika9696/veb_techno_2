"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { navItems, siteConfig } from "@/lib/constants";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-surface-overlay backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ── Logo ── */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-accent-600 text-white font-heading font-bold text-sm transition-transform duration-300 group-hover:scale-110">
              <span>VT</span>
              <div className="absolute inset-0 rounded-lg bg-accent-500 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-foreground">
              {siteConfig.name}
            </span>
          </Link>

          {/* ── Desktop Navigation ── */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-accent-600 dark:text-accent-400"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-accent-600 dark:bg-accent-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ y: -12, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 12, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            )}

            {/* CTA Button (desktop) */}
            <Link
              href="/contact"
              className="group hidden items-center gap-2 rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-700 hover:shadow-glow md:flex"
            >
              Get in Touch
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMobileMenuOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile Menu Overlay ── */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
