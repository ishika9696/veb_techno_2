/* ─── Navigation ─── */
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

/* ─── Services ─── */
export interface ServiceTool {
  name: string;
  icon?: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: string;
  features: string[];
  tools: ServiceTool[];
  process: { step: string; description: string }[];
  pricingTiers: PricingTier[];
  relatedProjects: string[]; // slugs
}

/* ─── Projects / Portfolio ─── */
export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  coverImage: string;
  images: string[];
  problem: string;
  solution: string;
  techStack: string[];
  results: ProjectMetric[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  featured?: boolean;
}

/* ─── Team ─── */
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

/* ─── Testimonials ─── */
export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

/* ─── FAQ ─── */
export interface FAQItem {
  question: string;
  answer: string;
}

/* ─── Blog ─── */
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  category: string;
  coverImage: string;
  readTime: string;
  content?: string;
}

/* ─── Career ─── */
export interface JobPosition {
  title: string;
  department: string;
  location: string;
  type: string; // Full-time, Part-time, Contract
  description: string;
  requirements: string[];
  benefits: string[];
}

/* ─── Contact Form ─── */
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
}

/* ─── Stats ─── */
export interface Stat {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}

/* ─── Process Step ─── */
export interface ProcessStep {
  title: string;
  description: string;
  icon: string;
}
