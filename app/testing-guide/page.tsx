import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { guideSections } from "@/lib/data/testing-guide";
import { DEAL_COUNT } from "@/lib/data/deals";
import { restaurants } from "@/lib/data/restaurants";
import { locations } from "@/lib/data/locations";

export const metadata: Metadata = {
  title: "Testing Guide",
  description: "What every page validates in the scraping pipeline.",
};

export default function TestingGuidePage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Testing Guide" }]} />
      <PageHeader
        title="Scraping Testing Guide"
        badge="Internal reference"
        description="This site is an internal environment for validating the enterprise scraping pipeline. Each page below maps to a specific scraper feature."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Deals", value: `${DEAL_COUNT}+` },
          { label: "Restaurants", value: `${restaurants.length}` },
          { label: "Locations / countries", value: `${locations.length} / 5` },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border p-5">
            <p className="text-3xl font-bold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-10">
        {guideSections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-3 text-xl font-bold">{section.title}</h2>
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <th className="p-3 font-semibold">Area</th>
                    <th className="p-3 font-semibold">Path</th>
                    <th className="p-3 font-semibold">Feature</th>
                    <th className="p-3 font-semibold">Expectation</th>
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-3 font-medium">{row.area}</td>
                      <td className="p-3 font-mono text-xs text-muted-foreground">
                        {row.path}
                      </td>
                      <td className="p-3">{row.feature}</td>
                      <td className="p-3 text-muted-foreground">{row.expectation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
