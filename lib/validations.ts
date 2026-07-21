import { z } from "zod";

/**
 * Contact form validation schema.
 * Used by both client-side (react-hook-form) and server-side (API route) validation.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().max(100, "Company name must be under 100 characters").optional().or(z.literal("")),
  phone: z
    .string()
    .regex(/^[+]?[\d\s()-]*$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  service: z.string().optional().or(z.literal("")),
  budget: z.string().optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * Newsletter subscription schema.
 */
export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;
