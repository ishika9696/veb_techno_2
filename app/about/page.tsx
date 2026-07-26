import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us — Engineering Culture & Digital Excellence",
  description:
    "Learn about Veb Techno Inc — our story, mission, values, and senior engineering team building enterprise digital solutions for global clients.",
};

export default function AboutPage() {
  return <AboutContent />;
}
