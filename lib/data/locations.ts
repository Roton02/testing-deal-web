/**
 * Restaurant locations across USA, Canada, UK, Australia and Bangladesh.
 * Rendered on /locations and per-restaurant pages as cards + schema.org JSON-LD.
 */

export type Location = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  lat: number;
  lng: number;
  phone: string;
  hours: string;
  services: ("Delivery" | "Pickup" | "Dine-in")[];
};

export const locations: Location[] = [
  {
    id: "us-ca-la",
    name: "Downtown Los Angeles",
    address: "123 Spring St",
    city: "Los Angeles",
    state: "California",
    country: "USA",
    zip: "90012",
    lat: 34.0522,
    lng: -118.2437,
    phone: "+1-213-555-0100",
    hours: "Mon–Sun 6:00 AM – 11:00 PM",
    services: ["Delivery", "Pickup", "Dine-in"],
  },
  {
    id: "us-tx-austin",
    name: "Austin Congress Ave",
    address: "500 Congress Ave",
    city: "Austin",
    state: "Texas",
    country: "USA",
    zip: "78701",
    lat: 30.2672,
    lng: -97.7431,
    phone: "+1-512-555-0110",
    hours: "Mon–Sun 7:00 AM – 10:00 PM",
    services: ["Pickup", "Dine-in"],
  },
  {
    id: "us-ny-nyc",
    name: "New York Times Square",
    address: "1500 Broadway",
    city: "New York",
    state: "New York",
    country: "USA",
    zip: "10036",
    lat: 40.758,
    lng: -73.9855,
    phone: "+1-212-555-0120",
    hours: "Open 24 hours",
    services: ["Delivery", "Pickup", "Dine-in"],
  },
  {
    id: "us-il-chicago",
    name: "Chicago Loop",
    address: "200 N State St",
    city: "Chicago",
    state: "Illinois",
    country: "USA",
    zip: "60601",
    lat: 41.8853,
    lng: -87.6278,
    phone: "+1-312-555-0130",
    hours: "Mon–Sun 8:00 AM – 10:00 PM",
    services: ["Delivery", "Dine-in"],
  },
  {
    id: "us-fl-miami",
    name: "Miami Beach",
    address: "800 Ocean Dr",
    city: "Miami",
    state: "Florida",
    country: "USA",
    zip: "33139",
    lat: 25.7825,
    lng: -80.1303,
    phone: "+1-305-555-0140",
    hours: "Mon–Sun 9:00 AM – 11:30 PM",
    services: ["Delivery", "Pickup", "Dine-in"],
  },
  {
    id: "ca-on-toronto",
    name: "Toronto Yonge St",
    address: "10 Dundas St E",
    city: "Toronto",
    state: "Ontario",
    country: "Canada",
    zip: "M5B 2G9",
    lat: 43.6561,
    lng: -79.3802,
    phone: "+1-416-555-0150",
    hours: "Mon–Sun 7:00 AM – 10:00 PM",
    services: ["Delivery", "Pickup"],
  },
  {
    id: "uk-london",
    name: "London Oxford Street",
    address: "300 Oxford St",
    city: "London",
    state: "England",
    country: "United Kingdom",
    zip: "W1C 1DX",
    lat: 51.5154,
    lng: -0.1419,
    phone: "+44-20-7946-0100",
    hours: "Mon–Sun 8:00 AM – 9:00 PM",
    services: ["Pickup", "Dine-in"],
  },
  {
    id: "au-sydney",
    name: "Sydney CBD",
    address: "55 George St",
    city: "Sydney",
    state: "New South Wales",
    country: "Australia",
    zip: "2000",
    lat: -33.8599,
    lng: 151.2089,
    phone: "+61-2-5550-0170",
    hours: "Mon–Sun 8:00 AM – 10:00 PM",
    services: ["Delivery", "Pickup", "Dine-in"],
  },
  {
    id: "au-melbourne",
    name: "Melbourne Flinders Ln",
    address: "120 Flinders Ln",
    city: "Melbourne",
    state: "Victoria",
    country: "Australia",
    zip: "3000",
    lat: -37.8166,
    lng: 144.9669,
    phone: "+61-3-5550-0180",
    hours: "Mon–Sun 7:30 AM – 9:30 PM",
    services: ["Pickup", "Dine-in"],
  },
  {
    id: "bd-dhaka",
    name: "Dhaka Gulshan",
    address: "Road 11, Gulshan 1",
    city: "Dhaka",
    state: "Dhaka Division",
    country: "Bangladesh",
    zip: "1212",
    lat: 23.7806,
    lng: 90.4152,
    phone: "+880-2-5550-0160",
    hours: "Sat–Thu 10:00 AM – 11:00 PM",
    services: ["Delivery", "Dine-in"],
  },
];

export const locationById = (id: string) => locations.find((l) => l.id === id);
