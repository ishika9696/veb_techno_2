import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Veb Techno Inc — our story, mission, values, and the team of senior engineers and designers building exceptional digital products.",
};

export default function AboutPage() {
  return <AboutContent />;
}
