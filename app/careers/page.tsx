import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import CareersContent from "./CareersContent";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Careers — Join Our Team",
  description:
    "Explore open positions at Veb Techno Inc. We're hiring senior engineers, designers, and DevOps specialists. Competitive pay, flexible work, and a culture that values craft.",
  openGraph: {
    title: "Careers — Join Our Team | Veb Techno Inc",
    description:
      "Explore open positions at Veb Techno Inc. We're hiring senior engineers, designers, and DevOps specialists.",
  },
};

interface JobSelectItem {
  title: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: unknown;
  responsibilities: unknown;
}

export default async function CareersPage() {
  let jobs: JobSelectItem[] = [];
  try {
    jobs = await prisma.jobListing.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Failed to fetch job listings:", err);
  }

  const serializedJobs = jobs.map((j) => ({
    title: j.title,
    department: j.department,
    location: j.location,
    type: j.employmentType,
    description: j.description,
    requirements: Array.isArray(j.requirements) ? (j.requirements as string[]) : [],
    responsibilities: Array.isArray(j.responsibilities) ? (j.responsibilities as string[]) : [],
  }));

  return <CareersContent jobs={serializedJobs} />;
}
