import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PortfolioContent from "./PortfolioContent";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Portfolio — Case Studies & Client Work",
  description:
    "Explore real-world projects delivered by Veb Techno Inc — from fintech dashboards and e-commerce platforms to mobile health apps and cloud migrations. See measurable results and technologies used.",
  openGraph: {
    title: "Portfolio — Case Studies & Client Work | Veb Techno Inc",
    description:
      "Explore real-world projects delivered by Veb Techno Inc — from fintech dashboards to mobile health apps. See measurable results.",
  },
};

interface ProjectSelectItem {
  slug: string;
  title: string;
  client: string;
  category: string;
  coverImage: string;
  problem: string;
  techStack: unknown;
}

export default async function PortfolioPage() {
  let projects: ProjectSelectItem[] = [];
  try {
    projects = await prisma.portfolioProject.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      select: {
        slug: true,
        title: true,
        client: true,
        category: true,
        coverImage: true,
        problem: true,
        techStack: true,
      },
    });
  } catch (err) {
    console.error("Failed to fetch portfolio projects:", err);
  }

  const serializedProjects = projects.map((p) => ({
    ...p,
    techStack: Array.isArray(p.techStack) ? (p.techStack as string[]) : [],
  }));

  return <PortfolioContent projects={serializedProjects} />;
}
