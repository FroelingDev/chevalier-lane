export type WeddingServiceType = "main" | "transport";

export interface WeddingVehicle {
  id: string;
  name: string;
  category: WeddingServiceType;
  image: string;
  basePrice?: number;
  minimumHours?: number;
  extraHourRate?: number;
  perTripRate?: number;
  maxTripsPerHour?: number;
  maxTripsPerBooking?: number;
  seats?: number;
  vatRate: number; // decimal (0.23 => 23%)
}

export const weddingVehicles: WeddingVehicle[] = [
  {
    id: "rolls-royce-silver-cloud-ii",
    name: "Rolls-Royce Silver Cloud II",
    category: "main",
    image: "/cloud-25.png",
    basePrice: 1200,
    minimumHours: 3,
    extraHourRate: 200,
    vatRate: 0.23,
  },
  {
    id: "oldsmobile-super-88",
    name: "Oldsmobile Super 88",
    category: "main",
    image: "/oldsmobile-18.png",
    basePrice: 1000,
    minimumHours: 3,
    extraHourRate: 200,
    vatRate: 0.23,
  },
  {
    id: "rolls-royce-silver-shadow",
    name: "Rolls-Royce Silver Shadow",
    category: "main",
    image: "/shadow-16.png",
    basePrice: 900,
    minimumHours: 3,
    extraHourRate: 150,
    vatRate: 0.23,
  },
  {
    id: "mercedes-280sl-pagoda",
    name: "Mercedes 280SL Pagoda",
    category: "main",
    image: "/pagoda-15.png",
    basePrice: 750,
    minimumHours: 3,
    extraHourRate: 150,
    vatRate: 0.23,
  },
  {
    id: "bentley-mulsanne",
    name: "Bentley Mulsanne",
    category: "main",
    image: "/bentley-28.png",
    basePrice: 900,
    minimumHours: 3,
    extraHourRate: 150,
    vatRate: 0.23,
  },
  {
    id: "mercedes-maybach",
    name: "Mercedes-Benz S-Class Maybach",
    category: "main",
    image: "/maybach-14.png",
    basePrice: 800,
    minimumHours: 3,
    extraHourRate: 100,
    vatRate: 0.23,
  },
  {
    id: "bentley-flying-spur",
    name: "Bentley Flying Spur",
    category: "main",
    image: "/flyingspur-6.png",
    basePrice: 750,
    minimumHours: 3,
    extraHourRate: 100,
    vatRate: 0.23,
  },
  {
    id: "bentley-mulsanne-transport",
    name: "Bentley Mulsanne",
    category: "transport",
    image: "/bentley-28.png",
    perTripRate: 150,
    maxTripsPerHour: 2,
    maxTripsPerBooking: 6,
    seats: 4,
    vatRate: 0.06,
  },
  {
    id: "mercedes-brabus-transport",
    name: "Mercedes Brabus",
    category: "transport",
    image: "/brabus-16.png",
    perTripRate: 120,
    maxTripsPerHour: 2,
    maxTripsPerBooking: 6,
    seats: 4,
    vatRate: 0.06,
  },
  {
    id: "bentley-flyingspur-transport",
    name: "Bentley Flying Spur",
    category: "transport",
    image: "/flyingspur-6.png",
    perTripRate: 150,
    maxTripsPerHour: 2,
    maxTripsPerBooking: 6,
    seats: 4,
    vatRate: 0.06,
  },
  // {
  //   id: "mercedes-glc-300-transport",
  //   name: "Mercedes GLC 300",
  //   category: "transport",
  //   image: "/glc300-1.png",
  //   perTripRate: 100,
  //   maxTripsPerHour: 2,
  //   maxTripsPerBooking: 6,
  //   seats: 4,
  //   vatRate: 0.06,
  // },
];

export interface DecorationOption {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  minPrice: number;
  maxPrice: number;
}

export const decorationOptions: DecorationOption[] = [
  {
    id: "basic",
    name: "Basic Decoration",
    description: "Artificial or simple natural flowers + ribbons",
    priceRange: "€150 - €300",
    minPrice: 150,
    maxPrice: 300,
  },
  {
    id: "intermediate",
    name: "Intermediate Decoration",
    description:
      "Medium quality natural flowers, front and side arrangements, bows",
    priceRange: "€300 - €600",
    minPrice: 300,
    maxPrice: 600,
  },
  {
    id: "luxury",
    name: "Luxury Decoration",
    description:
      "Premium flowers, multiple arrangements, detailed design, seasonal fresh or imported flowers, professional setup",
    priceRange: "€600 - €1,200+",
    minPrice: 600,
    maxPrice: 1200,
  },
];

export interface WeddingPricingInput {
  vehicle: WeddingVehicle;
  serviceType: WeddingServiceType;
  durationHours?: number;
  numberOfTrips?: number;
  decorationPrice?: number;
}

export interface WeddingPricingBreakdown {
  base: number;
  decoration: number;
  vat: number;
  totalBeforeVat: number;
}

export interface PricingResult {
  currency: "EUR";
  total: number;
  breakdown: WeddingPricingBreakdown;
}

export function calculateWeddingPrice({
  vehicle,
  serviceType,
  durationHours = 0,
  numberOfTrips = 0,
  decorationPrice = 0,
}: WeddingPricingInput): PricingResult {
  let basePrice = 0;

  if (serviceType === "main" && vehicle.basePrice && vehicle.extraHourRate) {
    const minimumHours = vehicle.minimumHours ?? 0;
    if (durationHours >= minimumHours) {
      const extraHours = Math.max(0, durationHours - minimumHours);
      basePrice = vehicle.basePrice + vehicle.extraHourRate * extraHours;
    }
  } else if (serviceType === "transport" && vehicle.perTripRate) {
    basePrice = vehicle.perTripRate * numberOfTrips;
  }

  const decoration = decorationPrice;
  const subtotal = basePrice + decoration;
  const vat = subtotal * vehicle.vatRate;
  const total = subtotal + vat;

  return {
    currency: "EUR",
    total,
    breakdown: {
      base: basePrice,
      decoration,
      vat,
      totalBeforeVat: subtotal,
    },
  };
}
