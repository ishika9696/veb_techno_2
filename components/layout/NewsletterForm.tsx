"use client";

import { ArrowRight } from "lucide-react";

/**
 * NewsletterForm — Tiny client component extracted from Footer.
 * Only this small form needs "use client" for the onSubmit handler.
 */
export default function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mt-2 flex gap-2"
    >
      <input
        type="email"
        placeholder="you@email.com"
        className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 transition-colors"
      />
      <button
        type="submit"
        className="rounded-lg bg-accent-600 px-3 py-2 text-white transition-all hover:bg-accent-700 hover:scale-[1.02] active:scale-[0.98]"
        aria-label="Subscribe to newsletter"
      >
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
