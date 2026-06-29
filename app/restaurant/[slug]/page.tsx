import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Globe } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DealsGrid } from "@/components/deals-grid";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/json-ld";
import { restaurants, restaurantBySlug } from "@/lib/data/restaurants";
import { dealsForRestaurant } from "@/lib/data/deals";
import { locationById } from "@/lib/data/locations";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return restaurants.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = restaurantBySlug(slug);
  if (!r) return { title: "Restaurant" };
  return {
    title: `${r.name} Deals`,
    description: r.description,
    openGraph: { title: `${r.name} Deals`, images: [r.logo], type: "website" },
  };
}

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = restaurantBySlug(slug);
  if (!r) notFound();

  const deals = dealsForRestaurant(slug);
  const locs = r.locationIds.map(locationById).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: r.name,
    description: r.description,
    servesCuisine: r.cuisine,
    url: r.website,
    image: r.hero,
    logo: r.logo,
    sameAs: r.aliases,
  };

  return (
    <div>
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { label: "Restaurants", href: "/menu" },
          { label: r.name },
        ]}
      />

      <div className="overflow-hidden rounded-2xl border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={r.hero} alt={r.name} className="h-56 w-full object-cover" />
        <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={r.logo} alt={`${r.name} logo`} className="h-14 w-14 rounded-xl" />
            <div>
              <h1 className="brand text-2xl font-bold">{r.name}</h1>
              <p className="category text-sm text-muted-foreground">{r.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={r.real ? "success" : "warning"}>
              {r.real ? "Existing brand" : "New restaurant (fake)"}
            </Badge>
            <a
              href={r.website}
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <Globe className="h-4 w-4" /> Website
            </a>
          </div>
        </div>
      </div>

      <p className="mt-6 max-w-2xl text-muted-foreground">{r.description}</p>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold">Locations</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {locs.map((l) => (
            <div key={l!.id} className="rounded-lg border p-4 text-sm">
              <p className="flex items-center gap-1 font-medium">
                <MapPin className="h-4 w-4 text-primary" /> {l!.name}
              </p>
              <p className="text-muted-foreground">
                {l!.address}, {l!.city}, {l!.state}, {l!.country}
              </p>
            </div>
          ))}
        </div>
        <Link
          href="/locations"
          className="mt-3 inline-block text-sm text-primary hover:underline"
        >
          View all locations →
        </Link>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold">{r.name} Deals</h2>
        {deals.length ? (
          <DealsGrid deals={deals} variant="cycle" />
        ) : (
          <p className="text-muted-foreground">No deals available.</p>
        )}
      </section>
    </div>
  );
}
