import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { SocialFeed } from "@/components/social-feed";

export const metadata: Metadata = {
  title: "Instagram Feed",
  description: "Simulated Instagram feed for social-scraping tests.",
};

export default function InstagramFeedPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Social", href: "/social/instagram" }, { label: "Instagram" }]} />
      <PageHeader
        title="Instagram Feed"
        badge="Social scraping (future)"
        description="Image-heavy posts including BOGO and student-discount promos mixed with lifestyle content."
      />
      <SocialFeed platform="instagram" />
    </div>
  );
}
