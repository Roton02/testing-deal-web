import Link from "next/link";
import { ArrowRight, Tag, Store, MapPin, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DealsGrid } from "@/components/deals-grid";
import { JsonLd } from "@/components/json-ld";
import { dealsForPage, DEAL_COUNT } from "@/lib/data/deals";
import { restaurants } from "@/lib/data/restaurants";
import { SITE } from "@/lib/site";

export default function HomePage() {
  const featured = dealsForPage("home");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/deals?q={query}`,
      "query-input": "required name=query",
    },
  };

  return (
    <div className="space-y-16">
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {DEAL_COUNT}+ live deals from top brands
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            All your favorite restaurant deals in one place
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{SITE.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/deals">
                Browse all deals <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/coupons">Get coupons</Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Tag, label: "Daily deals", href: "/deals" },
            { icon: Store, label: "Top brands", href: "/menu" },
            { icon: MapPin, label: "Locations", href: "/locations" },
            { icon: Smartphone, label: "App offers", href: "/app" },
          ].map((c) => (
            <Card key={c.label}>
              <CardContent className="flex flex-col items-start gap-2 p-5">
                <c.icon className="h-6 w-6 text-primary" />
                <Link href={c.href} className="font-medium hover:underline">
                  {c.label}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section>
        <h2 className="mb-4 text-2xl font-bold">Featured Brands</h2>
        <div className="flex flex-wrap gap-3">
          {restaurants.map((r) => (
            <Link
              key={r.slug}
              href={`/restaurant/${r.slug}`}
              className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/30"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.logo} alt={r.name} className="h-6 w-6 rounded-full" />
              {r.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured deals (also appear on deals/offers/specials → duplicates) */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Featured Deals</h2>
          <Link href="/deals" className="text-sm font-medium text-primary hover:underline">
            See all →
          </Link>
        </div>
        <DealsGrid deals={featured} variant="cycle" />
      </section>
    </div>
  );
}
