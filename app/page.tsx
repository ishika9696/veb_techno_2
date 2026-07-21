import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TechStackShowcase from "@/components/sections/TechStackShowcase";
import ProjectsShowcase from "@/components/sections/ProjectsShowcase";
import StatsCounter from "@/components/sections/StatsCounter";
import Testimonials from "@/components/sections/Testimonials";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import BlogPreview from "@/components/sections/BlogPreview";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <WhyChooseUs />
      <TechStackShowcase />
      <ProjectsShowcase />
      <StatsCounter />
      <Testimonials />
      <ProcessTimeline />
      <BlogPreview />
      <FAQ />
      <CTABanner />
    </>
  );
}
