import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin placeholder (must not be scraped).",
  robots: { index: false },
};

export default function AdminPage() {
  return (
    <div className="max-w-3xl">
      <Breadcrumbs items={[{ label: "Admin" }]} />
      <PageHeader
        title="Admin Dashboard"
        badge="Should be IGNORED + Disallowed"
        description="Internal admin placeholder. Disallowed in robots.txt; contains no public deals."
      />
      <p className="text-muted-foreground">
        Restricted area. This page exists only to confirm the scraper respects
        Disallow rules and does not index admin paths.
      </p>
    </div>
  );
}
