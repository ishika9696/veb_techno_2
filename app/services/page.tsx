import type { Metadata } from "next";
import ServicesPageContent from "./ServicesPageContent";

export const metadata: Metadata = {
  title: "Services",
  description: "End-to-end technology services: web development, mobile apps, UI/UX design, cloud & DevOps, cybersecurity, IT consulting, and digital marketing.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
