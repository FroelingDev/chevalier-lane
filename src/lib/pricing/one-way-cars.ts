export type CarCategory = "modern" | "classic";

export interface OneWayCarOption {
  id: string;
  name: string;
  category: CarCategory;
  image: string;
  price: string;
  minPrice: number;
  maxKmIncluded: number;
  pricePerKm?: number;
  requiresContact?: boolean;
  maxPassengers: number;
  availabilityStatus?: "available" | "coming-soon";
}

export const oneWayCarOptions: OneWayCarOption[] = [
  {
    id: "bentley-mulsanne",
    name: "Bentley Mulsanne",
    category: "modern",
    image: "/bentley-28.png",
    price: "€380 (max. 35km) + €4,00/km",
    minPrice: 380,
    maxKmIncluded: 35,
    pricePerKm: 4.0,
    maxPassengers: 3,
    availabilityStatus: "coming-soon",
  },
  {
    id: "mercedes-maybach",
    name: "Mercedes-Benz S-Class Maybach",
    category: "modern",
    image: "/maybach-14.png",
    price: "€330 (max. 35km) + €3,00/km",
    minPrice: 330,
    maxKmIncluded: 35,
    pricePerKm: 3.0,
    maxPassengers: 3,
  },
  {
    id: "bentley-flying-spur",
    name: "Bentley Flying Spur",
    category: "modern",
    image: "/flyingspur-6.png",
    price: "€315 (max. 35km) + €3,00/km",
    minPrice: 315,
    maxKmIncluded: 35,
    pricePerKm: 3.0,
    maxPassengers: 3,
  },
  {
    id: "rolls-royce-silver-shadow",
    name: "Rolls-Royce Silver Shadow",
    category: "classic",
    image: "/shadow-16.png",
    price: "€377 (max. 25km)",
    minPrice: 377,
    maxKmIncluded: 25,
    maxPassengers: 4,
  },
  {
    id: "rolls-royce-silver-cloud-ii",
    name: "Rolls-Royce Silver Cloud II",
    category: "classic",
    image: "/cloud-25.png",
    price: "€440 (max. 25km) + Subject to request",
    minPrice: 440,
    maxKmIncluded: 25,
    requiresContact: true,
    maxPassengers: 4,
  },
  {
    id: "oldsmobile-super-88",
    name: "Oldsmobile Super 88",
    category: "classic",
    image: "/oldsmobile-18.png",
    price: "€320 (max. 20km) + Subject to request",
    minPrice: 320,
    maxKmIncluded: 20,
    requiresContact: true,
    maxPassengers: 4,
  },
];
