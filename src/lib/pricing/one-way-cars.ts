export type CarCategory = "modern" | "classic";

export interface OneWayCarOption {
  id: string;
  name: string;
  category: CarCategory;
  image: string;
  price: string;
  minPrice: number;
  pricePerKm?: number;
}

export const oneWayCarOptions: OneWayCarOption[] = [
  {
    id: "bentley-mulsanne",
    name: "Bentley Mulsanne",
    category: "modern",
    image: "/bentley-mulsanne.png",
    price: "€270 (max. 25km) + €3,50/km",
    minPrice: 270,
    pricePerKm: 3.5,
  },
  {
    id: "mercedes-s500-brabus",
    name: "Mercedes S500 Brabus",
    category: "modern",
    image: "/mercedes-s500-brabus.png",
    price: "€190 (max. 25km) + €1,80/km",
    minPrice: 190,
    pricePerKm: 1.8,
  },
  {
    id: "rolls-royce-silver-shadow",
    name: "Rolls-Royce Silver Shadow",
    category: "classic",
    image: "/rolls-royce-silver-shadow.png",
    price: "€300 (max. 20km) + Subject to request",
    minPrice: 300,
  },
  {
    id: "rolls-royce-silver-cloud-ii",
    name: "Rolls-Royce Silver Cloud II",
    category: "classic",
    image: "/rolls-royce-silver-cloud-ii.png",
    price: "€350 (max. 20km) + Subject to request",
    minPrice: 350,
  },
  {
    id: "oldsmobile-super-88",
    name: "Oldsmobile Super 88",
    category: "classic",
    image: "/oldsmobile-super-88.png",
    price: "€320 (max. 20km) + Subject to request",
    minPrice: 320,
  },
];
