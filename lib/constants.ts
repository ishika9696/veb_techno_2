import type { NavItem, Stat, ProcessStep } from "@/types";

/* ─── Site Configuration ─── */
export const siteConfig = {
  name: "Veb Techno Inc",
  description:
    "We architect, design, and engineer digital products that transform businesses. From web & mobile apps to cloud infrastructure — we bring bold ideas to life.",
  url: "https://vebtechno.com",
  ogImage: "/images/og-image.png",
  links: {
    twitter: "https://twitter.com/vebtechno",
    github: "https://github.com/vebtechno",
    linkedin: "https://linkedin.com/company/vebtechno",
    instagram: "https://instagram.com/vebtechno",
  },
  /* DEMO DATA: Replace all contact details with real business info before launch */
  contact: {
    email: "hello@vebtechno.com",
    phone: "+1 (555) 123-4567",
    address: "350 Fifth Avenue, Suite 4200, New York, NY 10118",
  },
} as const;

/* ─── Navigation ─── */
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

/* ─── Stats ─── DEMO DATA: Replace all stat values with real numbers before launch */
export const stats: Stat[] = [
  { label: "Happy Clients", value: 200, suffix: "+" },
  { label: "Projects Delivered", value: 500, suffix: "+" },
  { label: "Years of Experience", value: 8, suffix: "+" },
  { label: "Team Members", value: 50, suffix: "+" },
];

/* ─── Process Steps ─── */
export const processSteps: ProcessStep[] = [
  {
    title: "Discover",
    description:
      "We dive deep into your business goals, target audience, and market landscape to define a clear project roadmap.",
    icon: "Search",
  },
  {
    title: "Design",
    description:
      "Our designers craft stunning, user-centric interfaces with wireframes, prototypes, and a cohesive visual language.",
    icon: "Palette",
  },
  {
    title: "Develop",
    description:
      "Our engineers build scalable, performant solutions using modern frameworks and industry best practices.",
    icon: "Code",
  },
  {
    title: "Deploy",
    description:
      "We launch your product with CI/CD pipelines, automated testing, and zero-downtime deployment strategies.",
    icon: "Rocket",
  },
  {
    title: "Support",
    description:
      "Post-launch, we provide ongoing maintenance, monitoring, performance optimization, and feature enhancements.",
    icon: "Headphones",
  },
];

/* ─── Tech Stack (for marquee) ─── */
export const techStackItems = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "AWS",
  "Docker",
  "Kubernetes",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "GraphQL",
  "Figma",
  "Terraform",
  "Go",
  "Swift",
  "Kotlin",
  "Flutter",
  "TailwindCSS",
  "Firebase",
] as const;

/* ─── Service Categories (for portfolio filter) ─── */
export const serviceCategories = [
  "All",
  "Web Development",
  "Mobile App",
  "UI/UX Design",
  "Cloud & DevOps",
  "Cybersecurity",
  "Digital Marketing",
] as const;
