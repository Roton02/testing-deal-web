import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Careers",
  description: "Job openings (not deals).",
};

const jobs = [
  { role: "Crew Member", location: "Downtown Los Angeles", type: "Full-time" },
  { role: "Shift Manager", location: "New York Times Square", type: "Full-time" },
  { role: "Barista", location: "London Oxford Street", type: "Part-time" },
];

export default function CareersPage() {
  return (
    <div className="max-w-3xl">
      <Breadcrumbs items={[{ label: "Careers" }]} />
      <PageHeader
        title="Careers"
        badge="Should be IGNORED"
        description="Job listings. No deal content — the ranker should exclude /careers."
      />
      <ul className="divide-y rounded-xl border">
        {jobs.map((j) => (
          <li key={j.role} className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium">{j.role}</p>
              <p className="text-sm text-muted-foreground">{j.location}</p>
            </div>
            <span className="text-sm text-muted-foreground">{j.type}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
