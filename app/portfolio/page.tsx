import type { Metadata } from "next";
import PortfolioContent from "./PortfolioContent";

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

export default function PortfolioPage() {
  return <PortfolioContent />;
}
