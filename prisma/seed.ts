import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "admin@vebtechno.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "AdminPassword123!";
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail.toLowerCase() },
    update: { hashedPassword },
    create: {
      email: adminEmail.toLowerCase(),
      hashedPassword,
    },
  });

  console.log(`✅ Admin user seeded: ${admin.email}`);

  // 2. Seed Portfolio Projects from content/projects.json
  const projectsFilePath = path.join(process.cwd(), "content", "projects.json");
  if (fs.existsSync(projectsFilePath)) {
    const rawProjects = JSON.parse(fs.readFileSync(projectsFilePath, "utf8"));
    const cleanProjects = rawProjects.filter((p: Record<string, unknown>) => p.slug);

    for (const proj of cleanProjects) {
      await prisma.portfolioProject.upsert({
        where: { slug: proj.slug },
        update: {
          title: proj.title,
          client: proj.client || "",
          category: proj.category || "",
          description: proj.description || "",
          problem: proj.problem || "",
          solution: proj.solution || "",
          techStack: proj.techStack || [],
          coverImage: proj.coverImage || "",
          gallery: proj.images || [],
          metrics: proj.results || [],
          testimonial: proj.testimonial || null,
          featured: Boolean(proj.featured),
          published: true,
        },
        create: {
          slug: proj.slug,
          title: proj.title,
          client: proj.client || "",
          category: proj.category || "",
          description: proj.description || "",
          problem: proj.problem || "",
          solution: proj.solution || "",
          techStack: proj.techStack || [],
          coverImage: proj.coverImage || "",
          gallery: proj.images || [],
          metrics: proj.results || [],
          testimonial: proj.testimonial || null,
          featured: Boolean(proj.featured),
          published: true,
        },
      });
    }
    console.log(`✅ ${cleanProjects.length} Portfolio projects seeded.`);
  }

  // 3. Seed Blog Posts from content/blog/*.mdx
  const blogDir = path.join(process.cwd(), "content", "blog");
  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

    for (const filename of files) {
      const slug = filename.replace(/\.(mdx|md)$/, "");
      const filePath = path.join(blogDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      // Convert MDX paragraphs into HTML paragraphs for Tiptap compatibility
      const paragraphs = content
        .split("\n\n")
        .filter((p) => p.trim().length > 0)
        .map((p) => {
          const trimmed = p.trim();
          if (trimmed.startsWith("## ")) {
            return `<h2>${trimmed.replace(/^##\s+/, "")}</h2>`;
          }
          if (trimmed.startsWith("### ")) {
            return `<h3>${trimmed.replace(/^###\s+/, "")}</h3>`;
          }
          return `<p>${trimmed}</p>`;
        })
        .join("\n");

      await prisma.blogPost.upsert({
        where: { slug },
        update: {
          title: data.title || slug,
          excerpt: data.excerpt || "",
          content: paragraphs,
          coverImage: data.coverImage || "",
          category: data.category || "General",
          readTime: data.readTime || "5 min read",
          author: data.author || "Veb Techno Team",
          published: true,
          publishedAt: data.date ? new Date(data.date) : new Date(),
        },
        create: {
          slug,
          title: data.title || slug,
          excerpt: data.excerpt || "",
          content: paragraphs,
          coverImage: data.coverImage || "",
          category: data.category || "General",
          readTime: data.readTime || "5 min read",
          author: data.author || "Veb Techno Team",
          published: true,
          publishedAt: data.date ? new Date(data.date) : new Date(),
        },
      });
    }
    console.log(`✅ ${files.length} Blog posts seeded.`);
  }

  // 4. Seed Initial Job Listings
  const jobs = [
    {
      title: "Senior Full-Stack Engineer",
      slug: "senior-full-stack-engineer",
      department: "Engineering",
      location: "New York, NY (Hybrid)",
      employmentType: "Full-time",
      description:
        "Lead development of premium Next.js and Node.js solutions for fintech and e-commerce clients. Work directly with design and product teams.",
      responsibilities: [
        "Architect and implement scalable web applications using Next.js and Node.js",
        "Participate in code reviews and mentor junior developers",
        "Collaborate closely with UI/UX designers to implement pixel-perfect interfaces",
      ],
      requirements: [
        "5+ years of experience with React, TypeScript, and Node.js",
        "Deep understanding of SQL (PostgreSQL) and caching layers (Redis)",
        "Strong testing practices (Jest, Cypress, Playwright)",
        "Experience with Next.js App Router and Server Components",
      ],
    },
    {
      title: "Lead UI/UX Designer",
      slug: "lead-ui-ux-designer",
      department: "Design",
      location: "Remote (US/Canada)",
      employmentType: "Full-time",
      description:
        "Define design systems, visual languages, and micro-animations for enterprise applications. Run discovery workshops and prototype in Figma.",
      responsibilities: [
        "Create high-fidelity design prototypes and design systems in Figma",
        "Conduct user research and usability testing",
        "Work with developers to ensure design integrity during engineering",
      ],
      requirements: [
        "6+ years of UX/UI product design experience",
        "Stunning portfolio showing interactions, user flows, and typography systems",
        "Mastery of Figma component architecture and variables",
        "Excellent client presentation and facilitation skills",
      ],
    },
    {
      title: "Cloud Platform SRE",
      slug: "cloud-platform-sre",
      department: "DevOps",
      location: "New York, NY (Hybrid)",
      employmentType: "Full-time",
      description:
        "Architect secure and automated Kubernetes, Terraform, and cloud platform setups for scale. Maintain high availability and automate everything.",
      responsibilities: [
        "Manage cloud infrastructure on AWS and GCP",
        "Build automated CI/CD pipelines and monitoring alerts",
        "Ensure 99.99% uptime for client microservices",
      ],
      requirements: [
        "4+ years managing production AWS/GCP workloads",
        "Strong expertise in Docker, Kubernetes, and Helm charts",
        "Infrastructure as Code tooling mastery (Terraform)",
        "CI/CD automation scripting in GitHub Actions or GitLab",
      ],
    },
  ];

  for (const job of jobs) {
    await prisma.jobListing.upsert({
      where: { slug: job.slug },
      update: { ...job, published: true },
      create: { ...job, published: true },
    });
  }
  console.log(`✅ ${jobs.length} Job listings seeded.`);

  console.log("🎉 Database seed complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
