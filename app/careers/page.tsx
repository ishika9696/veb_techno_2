import type { Metadata } from "next";
import CareersContent from "./CareersContent";

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

export default function CareersPage() {
  return <CareersContent />;
}
