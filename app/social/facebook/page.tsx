import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { SocialFeed } from "@/components/social-feed";

export const metadata: Metadata = {
  title: "Facebook Feed",
  description: "Simulated Facebook feed for social-scraping tests.",
};

export default function FacebookFeedPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Social", href: "/social/facebook" }, { label: "Facebook" }]} />
      <PageHeader
        title="Facebook Feed"
        badge="Social scraping (future)"
        description="Simulated brand posts. Some are promotions, some are not — future social scraping must tell them apart."
      />
      <SocialFeed platform="facebook" />
    </div>
  );
}
