import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { SocialFeed } from "@/components/social-feed";

export const metadata: Metadata = {
  title: "TikTok Feed",
  description: "Simulated TikTok feed for social-scraping tests.",
};

export default function TiktokFeedPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Social", href: "/social/tiktok" }, { label: "TikTok" }]} />
      <PageHeader
        title="TikTok Feed"
        badge="Social scraping (future)"
        description="Short-form video captions — one advertises an app-only code, one is pure entertainment."
      />
      <SocialFeed platform="tiktok" />
    </div>
  );
}
