import { PostHog } from "posthog-node";

let posthogInstance: PostHog | null = null;

export function getPostHogServer(): PostHog | null {
  if (!posthogInstance) {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

    if (key) {
      posthogInstance = new PostHog(key, {
        host,
        flushAt: 1,
        flushInterval: 0,
      });
    }
  }
  return posthogInstance;
}

export default getPostHogServer;
