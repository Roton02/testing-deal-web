import { locationById } from "./locations";

/** Branch rows embedded in deal cards for scraper location extraction. */
export type DealScrapeLocation = {
  name: string;
  address: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  latitude: number;
  longitude: number;
  phone?: string;
  website?: string;
};

export const scrapeLocationsForRestaurant = (
  locationIds: string[],
  limit = 2,
): DealScrapeLocation[] => {
  const rows: DealScrapeLocation[] = [];
  for (const id of locationIds.slice(0, limit)) {
    const loc = locationById(id);
    if (!loc) continue;
    rows.push({
      name: loc.name,
      address: loc.address,
      city: loc.city,
      state: loc.state,
      country: loc.country,
      postalCode: loc.zip,
      latitude: loc.lat,
      longitude: loc.lng,
      phone: loc.phone,
    });
  }
  return rows;
};
