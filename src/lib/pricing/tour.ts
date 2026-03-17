export type TourCategory = "palacio";

export interface TourAddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface TourOption {
  id: string;
  name: string;
  location: string;
  basePrice: number;
  priceRange?: [number, number];
  description: string;
  duration: string;
  minParticipants: number;
  maxParticipants?: number;
  category: TourCategory;
  includes: string[];
  addOns?: TourAddOn[];
}

export const tourOptions: TourOption[] = [
  {
    id: "palacio-wine-tasting",
    name: "Bacalhôa Wine Tasting",
    location: "Palácio da Bacalhôa, Azeitão",
    basePrice: 75,
    description: "Private guided tour with wine tasting experience",
    duration: "~2.5 hours",
    minParticipants: 2,
    maxParticipants: 20,
    category: "palacio",
    includes: [
      "Private guided visit of Palace, gardens, vineyards",
      "Art collection and tile museum",
      "Tasting of 4 Bacalhôa wines",
      "Azeitão cheese and dried fruits",
    ],
  },
  {
    id: "palacio-catarina",
    name: "Catarina de Bragança Tasting",
    location: "Palácio da Bacalhôa, Azeitão",
    basePrice: 75,
    description: "Curated wine tasting experience at the Palace",
    duration: "~2 hours",
    minParticipants: 2,
    maxParticipants: 20,
    category: "palacio",
    includes: ["Private guided tour of the Palace", "Curated wine tasting"],
  },
  {
    id: "palacio-carlos",
    name: "D. Carlos I Tasting",
    location: "Palácio da Bacalhôa, Azeitão",
    basePrice: 250,
    description: "Exclusive premium wine tasting with rare vintages",
    duration: "~2 hours",
    minParticipants: 2,
    maxParticipants: 20,
    category: "palacio",
    includes: [
      "Exclusive guided tour of the Palace",
      "Tasting of 5 premium wines",
      "Includes sparkling reserve and selected red wines",
      "20-year-old Moscatel de Setúbal",
    ],
  },
  {
    id: "palacio-standard",
    name: "Standard Visit & Tasting",
    location: "Palácio da Bacalhôa, Azeitão",
    basePrice: 15,
    description: "Guided visit with standard wine tasting",
    duration: "1.5–3 hours",
    minParticipants: 1,
    category: "palacio",
    includes: [
      "Guided visit of Palace, museum, or Quinta",
      "Standard wine tasting",
    ],
  },
  {
    id: "palacio-food-experience",
    name: "Wine & Food Experience",
    location: "Palácio da Bacalhôa, Azeitão",
    basePrice: 200,
    description: "Premium wine tasting paired with regional food",
    duration: "Varies",
    minParticipants: 6,
    category: "palacio",
    includes: [
      "Guided tour of Palace and Quinta",
      "Premium wine tasting paired with regional products",
      "Refined food experience",
    ],
  },
];

export const TOUR_DESTINATIONS: Record<
  TourCategory,
  { name: string; address: string }
> = {
  palacio: {
    name: "Palácio da Bacalhôa",
    address:
      "Estrada Nacional 10, Vila Fresca de Azeitão, 2925-483 Azeitão, Portugal",
  },
};

export interface TourPricingInput {
  tourOption?: TourOption | null;
  participants: number;
  selectedAddOnIds: string[];
  vehicle?: {
    minPrice: number;
    pricePerKm?: number;
    maxKmIncluded?: number;
  } | null;
  distanceKm?: number | null;
}

export interface TourPricingBreakdown {
  tour: number;
  addOns: { id: string; name: string; total: number }[];
  vehicle: number;
}

export interface TourPricingResult {
  currency: "EUR";
  total: number;
  breakdown: TourPricingBreakdown;
}

const calculateVehiclePrice = (
  vehicle: TourPricingInput["vehicle"],
  distanceKm?: number | null,
): number => {
  if (!vehicle) return 0;
  const maxKmIncluded = vehicle.maxKmIncluded ?? 25;
  if (!distanceKm || !vehicle.pricePerKm || distanceKm <= maxKmIncluded) {
    return vehicle.minPrice;
  }

  const extraDistance = distanceKm - maxKmIncluded;
  return vehicle.minPrice + extraDistance * vehicle.pricePerKm;
};

export function calculateTourPrice({
  tourOption,
  participants,
  selectedAddOnIds,
  vehicle,
  distanceKm,
}: TourPricingInput): TourPricingResult {
  let tourBase = 0;
  const addOnBreakdown: TourPricingBreakdown["addOns"] = [];
  let addOnsTotal = 0;

  if (tourOption) {
    tourBase = tourOption.basePrice * participants;

    tourOption.addOns?.forEach((addOn) => {
      if (selectedAddOnIds.includes(addOn.id)) {
        const total = addOn.price * participants;
        addOnBreakdown.push({ id: addOn.id, name: addOn.name, total });
        addOnsTotal += total;
      }
    });
  }

  const vehicleTotal = vehicle ? calculateVehiclePrice(vehicle, distanceKm) : 0;

  const total = tourBase + addOnsTotal + vehicleTotal;

  return {
    currency: "EUR",
    total,
    breakdown: {
      tour: tourBase,
      addOns: addOnBreakdown,
      vehicle: vehicleTotal,
    },
  };
}
