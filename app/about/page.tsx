import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "About our fictional restaurant aggregator brand.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl">
      <Breadcrumbs items={[{ label: "About" }]} />
      <PageHeader title={`About ${SITE.name}`} badge="Content-only (no deals)" />
      <div className="prose-sm space-y-4 text-muted-foreground">
        <p>
          {SITE.name} is a fictional restaurant brand aggregator built solely to
          validate our enterprise scraping system. There are no real offers on
          this page — it exists to confirm the page ranker correctly treats
          content-only pages as low priority.
        </p>
        <p>
          Founded in this test environment, we partner with the world&apos;s
          biggest restaurant brands to surface their best deals, coupons and
          rewards in one place.
        </p>
      </div>
    </div>
  );
}
