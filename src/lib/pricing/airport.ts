export interface AirportCarOption {
  id: string;
  name: string;
  category: "modern" | "classic";
  image: string;
  basePrice: number;
  maxKmIncluded: number;
  pricePerKmExtra: number;
  extraVehiclePrice?: number;
}

export const airportCarOptions: AirportCarOption[] = [
  {
    id: "bentley-mulsanne",
    name: "Bentley Mulsanne",
    category: "modern",
    image: "/bentley-28.png",
    basePrice: 380,
    maxKmIncluded: 35,
    pricePerKmExtra: 4.0,
    extraVehiclePrice: 100,
  },
  {
    id: "mercedes-maybach",
    name: "Mercedes-Benz S-Class Maybach",
    category: "modern",
    image: "/maybach-14.png",
    basePrice: 330,
    maxKmIncluded: 35,
    pricePerKmExtra: 3.0,
    extraVehiclePrice: 100,
  },
  {
    id: "bentley-flying-spur",
    name: "Bentley Flying Spur",
    category: "modern",
    image: "/flyingspur-6.png",
    basePrice: 315,
    maxKmIncluded: 35,
    pricePerKmExtra: 3.0,
    extraVehiclePrice: 100,
  },
  // {
  //   id: "mercedes-s500-brabus",
  //   name: "Mercedes S500 Brabus",
  //   category: "modern",
  //   image: "/brabus-16.png",
  //   basePrice: 250,
  //   maxKmIncluded: 35,
  //   pricePerKmExtra: 1.8,
  //   extraVehiclePrice: 100,
  // },
  // {
  //   id: "rolls-royce-silver-cloud-ii",
  //   name: "Rolls-Royce Silver Cloud II",
  //   category: "classic",
  //   image: "/cloud-25.png",
  //   basePrice: 440,
  //   maxKmIncluded: 25,
  //   pricePerKmExtra: 0,
  //   extraVehiclePrice: 100,
  // },
  {
    id: "rolls-royce-silver-shadow",
    name: "Rolls-Royce Silver Shadow",
    category: "classic",
    image: "/shadow-16.png",
    basePrice: 377,
    maxKmIncluded: 25,
    pricePerKmExtra: 0,
    extraVehiclePrice: 100,
  },
];

const AIRPORT_PRICE_MARKUP_MULTIPLIER = 1.06;
const roundToCents = (value: number) => Math.round(value * 100) / 100;

export const calculateAirportPrice = (
  distanceKm: number,
  selectedCar: AirportCarOption,
  extraVehicle: boolean,
): number | null => {
  if (selectedCar.category === "classic") {
    return null;
  }

  let price = selectedCar.basePrice;

  if (distanceKm > selectedCar.maxKmIncluded) {
    const extraKm = distanceKm - selectedCar.maxKmIncluded;
    price += extraKm * selectedCar.pricePerKmExtra;
  }

  if (selectedCar.category === "modern" && extraVehicle) {
    price += selectedCar.extraVehiclePrice || 0;
  }

  return roundToCents(price * AIRPORT_PRICE_MARKUP_MULTIPLIER);
};
