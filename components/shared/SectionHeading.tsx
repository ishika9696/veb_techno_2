import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * SectionHeading — Server Component
 * Converted from client component (Framer Motion) to server component with CSS animations.
 * Uses the animate-fade-in / animate-slide-up keyframes already defined in globals.css.
 * This removes Framer Motion from the bundle for every section on every page.
 */
export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "mx-auto max-w-2xl text-center",
        className
      )}
    >
      {/* Badge */}
      {badge && (
        <div className="mb-4 inline-flex items-center rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-700 dark:border-accent-800 dark:bg-accent-950 dark:text-accent-300 animate-fade-in">
          {badge}
        </div>
      )}

      {/* Title */}
      <h2
        className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl animate-slide-up"
        style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg animate-slide-up"
          style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
