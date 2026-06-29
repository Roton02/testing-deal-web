import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Legal privacy policy (must not be scraped).",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl">
      <Breadcrumbs items={[{ label: "Privacy" }]} />
      <PageHeader
        title="Privacy Policy"
        badge="Should be IGNORED + Disallowed"
        description="Legal text only. Disallowed in robots.txt and contains no deals."
      />
      <div className="space-y-4 text-sm text-muted-foreground">
        <p>This is placeholder legal privacy text for a test environment.</p>
        <p>
          We describe how a fictional company would handle data. No promotional
          or deal content appears on this page. The scraper must not extract
          deals from legal pages.
        </p>
        <p>Sections: data collection, cookies, third parties, your rights, contact.</p>
      </div>
    </div>
  );
}
