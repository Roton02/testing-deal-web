import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { SocialFeed } from "@/components/social-feed";

export const metadata: Metadata = {
  title: "X (Twitter) Feed",
  description: "Simulated X/Twitter feed for social-scraping tests.",
};

export default function XFeedPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Social", href: "/social/x" }, { label: "X (Twitter)" }]} />
      <PageHeader
        title="X (Twitter) Feed"
        badge="Social scraping (future)"
        description="Text-first posts — one is a rewards promo (no image), one is a milestone tweet."
      />
      <SocialFeed platform="x" />
    </div>
  );
}
