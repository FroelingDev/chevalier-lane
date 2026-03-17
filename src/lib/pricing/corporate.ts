export interface CorporateCarOption {
  id: string;
  name: string;
  category: "modern" | "classic";
  image: string;
  price: string;
  minPrice: number;
  pricePerHour: number;
  maxPassengers: number;
  availabilityStatus?: "available" | "coming-soon";
}

export const corporateCarOptions: CorporateCarOption[] = [
  {
    id: "bentley-mulsanne",
    name: "Bentley Mulsanne",
    category: "modern",
    image: "/bentley-28.png",
    price: "€500 for 2 hours + €200/hour extra",
    minPrice: 500,
    pricePerHour: 200,
    maxPassengers: 3,
    availabilityStatus: "coming-soon",
  },
  {
    id: "mercedes-maybach",
    name: "Mercedes-Benz S-Class Maybach",
    category: "modern",
    image: "/maybach-14.png",
    price: "€450 for 2 hours + €150/hour extra",
    minPrice: 450,
    pricePerHour: 150,
    maxPassengers: 3,
  },
  {
    id: "bentley-flying-spur",
    name: "Bentley Flying Spur",
    category: "modern",
    image: "/flyingspur-6.png",
    price: "€400 for 2 hours + €150/hour extra",
    minPrice: 400,
    pricePerHour: 150,
    maxPassengers: 3,
  },
];

const CORPORATE_PRICE_MARKUP_MULTIPLIER = 1.06;
const roundToCents = (value: number) => Math.round(value * 100) / 100;

export const calculateCorporatePrice = (
  durationMinutes: number,
  selectedCar: CorporateCarOption
): number => {
  if (Number.isNaN(durationMinutes) || durationMinutes <= 0) {
    return 0;
  }

  const extraHours = Math.max(0, (durationMinutes - 120) / 60);
  const basePrice = selectedCar.minPrice + selectedCar.pricePerHour * extraHours;

  return roundToCents(basePrice * CORPORATE_PRICE_MARKUP_MULTIPLIER);
};
