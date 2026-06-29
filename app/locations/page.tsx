import type { Metadata } from "next";
import { MapPin, Phone, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/json-ld";
import { locations } from "@/lib/data/locations";

export const metadata: Metadata = {
  title: "Locations",
  description: "Find branches across the USA, Canada, UK, Australia and Bangladesh.",
};

export default function LocationsPage() {
  const byCountry = locations.reduce<Record<string, typeof locations>>(
    (acc, l) => {
      (acc[l.country] ??= []).push(l);
      return acc;
    },
    {},
  );

  const jsonLd = locations.map((l) => ({
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: l.name,
    telephone: l.phone,
    openingHours: l.hours,
    address: {
      "@type": "PostalAddress",
      streetAddress: l.address,
      addressLocality: l.city,
      addressRegion: l.state,
      postalCode: l.zip,
      addressCountry: l.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: l.lat, longitude: l.lng },
  }));

  return (
    <div>
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={[{ label: "Locations" }]} />
      <PageHeader
        title="Our Locations"
        badge="Location extraction"
        description="Branches across 5 countries with address, city, state, country, ZIP, coordinates, phone, hours and services — as cards, microdata and schema.org JSON-LD."
      />

      <div className="space-y-10">
        {Object.entries(byCountry).map(([country, locs]) => (
          <section key={country}>
            <h2 className="mb-4 text-xl font-bold">{country}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {locs.map((l) => (
                <div
                  key={l.id}
                  itemScope
                  itemType="https://schema.org/Restaurant"
                  className="rounded-xl border p-5"
                >
                  <h3 itemProp="name" className="font-semibold">
                    {l.name}
                  </h3>
                  <p
                    itemProp="address"
                    className="mt-2 flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      {l.address}, {l.city}, {l.state} {l.zip}, {l.country}
                    </span>
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span itemProp="telephone">{l.phone}</span>
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {l.hours}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Coordinates: {l.lat}, {l.lng}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {l.services.map((s) => (
                      <Badge key={s} variant="secondary">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
