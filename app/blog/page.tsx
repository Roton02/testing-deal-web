import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Blog",
  description: "Editorial blog posts (not deals).",
};

const posts = [
  {
    title: "The history of the cheeseburger",
    date: "2026-06-10",
    body: "A long editorial read about burger history. No offers here.",
  },
  {
    title: "How we roast our coffee beans",
    date: "2026-05-18",
    body: "Behind-the-scenes storytelling content. Contains no promotions.",
  },
  {
    title: "5 tips for the perfect pizza night",
    date: "2026-04-02",
    body: "Lifestyle blog content. No deal markup.",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-3xl">
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <PageHeader
        title="Blog"
        badge="Should be IGNORED"
        description="Editorial posts. The scraper should skip blog content entirely."
      />
      <div className="space-y-6">
        {posts.map((p) => (
          <article key={p.title} className="border-b pb-6">
            <p className="text-xs text-muted-foreground">{p.date}</p>
            <h2 className="mt-1 text-xl font-semibold">{p.title}</h2>
            <p className="mt-2 text-muted-foreground">{p.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
