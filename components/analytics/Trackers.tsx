"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

interface ServicePageTrackerProps {
  service: string;
  title: string;
}

export function ServicePageTracker({ service, title }: ServicePageTrackerProps) {
  useEffect(() => {
    posthog.capture("service_page_viewed", {
      service,
      title,
    });
  }, [service, title]);

  return null;
}

interface PortfolioProjectTrackerProps {
  project: string;
  title: string;
}

export function PortfolioProjectTracker({ project, title }: PortfolioProjectTrackerProps) {
  useEffect(() => {
    posthog.capture("portfolio_project_viewed", {
      project,
      title,
    });
  }, [project, title]);

  return null;
}
