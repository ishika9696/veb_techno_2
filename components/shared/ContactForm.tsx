"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20";
  const errorClasses = "mt-1 text-xs text-error-500";
  const labelClasses = "mb-1.5 block text-sm font-medium text-foreground";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-5", className)}>
      {/* Name & Email Row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>Name *</label>
          <input
            id="name"
            {...register("name")}
            placeholder="John Doe"
            className={cn(inputClasses, errors.name && "border-error-500")}
          />
          {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>Email *</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="john@company.com"
            className={cn(inputClasses, errors.email && "border-error-500")}
          />
          {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
        </div>
      </div>

      {/* Company & Phone Row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className={labelClasses}>Company</label>
          <input
            id="company"
            {...register("company")}
            placeholder="Acme Corp"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>Phone</label>
          <input
            id="phone"
            {...register("phone")}
            placeholder="+1 (555) 000-0000"
            className={cn(inputClasses, errors.phone && "border-error-500")}
          />
          {errors.phone && <p className={errorClasses}>{errors.phone.message}</p>}
        </div>
      </div>

      {/* Service & Budget Row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className={labelClasses}>Service Interested In</label>
          <select
            id="service"
            {...register("service")}
            className={cn(inputClasses, "appearance-none")}
            defaultValue=""
          >
            <option value="" disabled>Select a service</option>
            <option value="web-development">Web Development</option>
            <option value="mobile-app">Mobile App Development</option>
            <option value="ui-ux">UI/UX Design</option>
            <option value="cloud-devops">Cloud & DevOps</option>
            <option value="cybersecurity">Cybersecurity</option>
            <option value="consulting">IT Consulting</option>
            <option value="marketing">Digital Marketing & SEO</option>
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelClasses}>Budget Range</label>
          <select
            id="budget"
            {...register("budget")}
            className={cn(inputClasses, "appearance-none")}
            defaultValue=""
          >
            <option value="" disabled>Select budget range</option>
            <option value="5k-10k">$5,000 – $10,000</option>
            <option value="10k-25k">$10,000 – $25,000</option>
            <option value="25k-50k">$25,000 – $50,000</option>
            <option value="50k-100k">$50,000 – $100,000</option>
            <option value="100k+">$100,000+</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClasses}>Message *</label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          placeholder="Tell us about your project, goals, and timeline..."
          className={cn(inputClasses, "resize-none", errors.message && "border-error-500")}
        />
        {errors.message && <p className={errorClasses}>{errors.message.message}</p>}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={status === "loading"}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="group flex w-full items-center justify-center gap-2 rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-700 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </>
        )}
      </motion.button>

      {/* Status Messages */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 rounded-lg bg-success-500/10 px-4 py-3 text-sm text-success-600 dark:text-success-400"
          >
            <CheckCircle2 size={16} />
            Message sent successfully! We&apos;ll get back to you within 24 hours.
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 rounded-lg bg-error-500/10 px-4 py-3 text-sm text-error-600 dark:text-error-400"
          >
            <AlertCircle size={16} />
            Something went wrong. Please try again or email us directly.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
