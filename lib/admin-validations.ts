import { z } from "zod";

/* ─── Blog Post ─── */
export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  excerpt: z.string().max(500).optional().default(""),
  content: z.string().optional().default(""),
  coverImage: z.string().optional().default(""),
  category: z.string().optional().default("General"),
  readTime: z.string().optional().default("5 min read"),
  author: z.string().optional().default("Veb Techno Team"),
  published: z.boolean().optional().default(false),
});

export type BlogPostFormValues = z.infer<typeof blogPostSchema>;

/* ─── Portfolio Project ─── */
export const portfolioProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  client: z.string().max(200).optional().default(""),
  category: z.string().optional().default(""),
  description: z.string().optional().default(""),
  problem: z.string().optional().default(""),
  solution: z.string().optional().default(""),
  techStack: z.array(z.string()).optional().default([]),
  coverImage: z.string().optional().default(""),
  gallery: z.array(z.string()).optional().default([]),
  metrics: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .optional()
    .default([]),
  testimonial: z
    .object({
      quote: z.string(),
      author: z.string(),
      role: z.string(),
    })
    .nullable()
    .optional()
    .default(null),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(true),
});

export type PortfolioProjectFormValues = z.infer<typeof portfolioProjectSchema>;

/* ─── Job Listing ─── */
export const jobListingSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  department: z.string().optional().default(""),
  location: z.string().optional().default(""),
  employmentType: z.string().optional().default("Full-time"),
  description: z.string().optional().default(""),
  responsibilities: z.array(z.string()).optional().default([]),
  requirements: z.array(z.string()).optional().default([]),
  published: z.boolean().optional().default(true),
});

export type JobListingFormValues = z.infer<typeof jobListingSchema>;

/* ─── Login ─── */
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
