import type { Metadata } from "next";
import ServicesPageContent from "./ServicesPageContent";

export const metadata: Metadata = {
  title: "Software Engineering Services & Digital Solutions",
  description:
    "Explore end-to-end technology services: custom web apps, mobile app development, UI/UX design, cloud DevOps, cybersecurity, and strategic IT consulting.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
