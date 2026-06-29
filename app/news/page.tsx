import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "News",
  description: "Company news and announcements (not deals).",
};

const articles = [
  {
    title: "We opened our 5,000th test location",
    date: "2026-06-15",
    body: "A general corporate announcement with no offer or discount content.",
  },
  {
    title: "FlavorHub partners with new delivery network",
    date: "2026-05-30",
    body: "Press release about logistics — contains no deals.",
  },
  {
    title: "Sustainability report 2026 released",
    date: "2026-04-22",
    body: "Environmental commitments and packaging changes. No promotions.",
  },
];

export default function NewsPage() {
  return (
    <div className="max-w-3xl">
      <Breadcrumbs items={[{ label: "News" }]} />
      <PageHeader
        title="Company News"
        badge="Should be IGNORED"
        description="Press releases and announcements. No deal markup — the scraper should not extract deals here."
      />
      <div className="space-y-6">
        {articles.map((a) => (
          <article key={a.title} className="border-b pb-6">
            <p className="text-xs text-muted-foreground">{a.date}</p>
            <h2 className="mt-1 text-xl font-semibold">{a.title}</h2>
            <p className="mt-2 text-muted-foreground">{a.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
