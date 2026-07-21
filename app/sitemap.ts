import { MetadataRoute } from "next";
import services from "@/content/services.json";
import projects from "@/content/projects.json";
import { siteConfig } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  /* Static routes */
  const routes = ["", "/about", "/services", "/portfolio", "/blog", "/careers", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  /* Service detail routes */
  const serviceRoutes = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  /* Portfolio project detail routes */
  const projectRoutes = projects.map((p) => ({
    url: `${baseUrl}/portfolio/${p.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  /* Blog post detail routes (manually parsed titles/slugs or hardcoded list) */
  const blogSlugs = [
    "future-of-web-development",
    "mobile-first-strategy",
    "cloud-migration-guide",
    "roi-of-good-design",
    "cybersecurity-essentials",
    "choosing-tech-stack",
  ];
  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...routes, ...serviceRoutes, ...projectRoutes, ...blogRoutes];
}
