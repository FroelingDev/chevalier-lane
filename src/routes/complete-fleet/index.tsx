import { createFileRoute } from "@tanstack/react-router";
import { CarMarketplace } from "../../components/CarMarketplace";
import { useLanguage } from "@/components/LanguageProvider";

export const Route = createFileRoute("/complete-fleet/")({
  component: RouteComponent,
});

const completeFleet = [
  // 2. Bentley Mulsanne
  {
    id: "bentley-mulsanne",
    name: "BENTLEY MULSANNE",
    image: "/bentley-27.png",
    link: "/modern/bentley-mulsanne",
    year: "2023",
    category: "modern" as const,
    description:
      "British luxury redefined, the Mulsanne offers unparalleled comfort and sophistication for the discerning traveler.",
    features: [
      "V8 Twin-Turbo Engine",
      "Handcrafted Interior",
      "Air Suspension",
      "Executive Seating",
    ],
  },
  {
    id: "mercedes-maybach",
    name: "MERCEDES MAYBACH",
    image: "/maybach-3.png",
    link: "/modern/mercedes-maybach",
    year: "2024",
    category: "modern" as const,
    description:
      "The pinnacle of luxury and refinement, the Mercedes-Benz S-Class Maybach delivers unmatched comfort and prestige.",
    features: [
      "V12 Engine",
      "Executive Rear Seating",
      "Premium Materials",
      "Advanced Technology",
    ],
    availableSoon: false,
  },
  {
    id: "bentley-flyingspur",
    name: "BENTLEY FLYING SPUR",
    image: "/flyingspur.png",
    link: "/modern/bentley-flyingspur",
    year: "2023",
    category: "modern" as const,
    description:
      "British luxury redefined, the Flying Spur offers unparalleled comfort and sophistication for the discerning traveler.",
    features: ["Handcrafted Interior", "Air Suspension", "Executive Seating"],
  },
  // 3. Mercedes-Benz S-Class Maybach
  // {
  //   id: "mercedes-s500-brabus",
  //   name: "MERCEDES S-CLASS BRABUS",
  //   image: "/brabus-6.png",
  //   link: "/modern/mercedes-s500-brabus",
  //   year: "2024",
  //   category: "modern" as const,
  //   description:
  //     "The ultimate expression of German engineering excellence, combining power, luxury, and cutting-edge technology.",
  //   features: [
  //     "V8 Twin-Turbo Engine",
  //     "BRABUS Performance",
  //     "Executive Comfort",
  //     "Advanced Tech",
  //   ],
  // },
  // 4. Rolls Royce Silver Shadow
  {
    id: "rolls-royce-silver-shadow",
    name: "ROLLS-ROYCE SILVER SHADOW",
    image: "/shadow-6.png",
    link: "/classic/rolls-royce-silver-shadow",
    // year: "1973",
    category: "classic" as const,
    description:
      "A masterpiece of automotive engineering, the Silver Shadow delivers power and luxury in perfect harmony.",
    features: [
      "V8 Turbo Engine",
      "Hydropneumatic Suspension",
      "Executive Comfort",
      "Modern Classic",
    ],
  },
  // 5. Oldsmobile Super 88
  // 6. Rolls Royce Silver Cloud II
  {
    id: "rolls-royce-silver-cloud-ii",
    name: "ROLLS-ROYCE SILVER CLOUD II",
    image: "/cloud-15.png",
    link: "/classic/rolls-royce-silver-cloud-ii",
    // year: "1961",
    category: "classic" as const,
    description:
      "The epitome of British luxury, the Silver Cloud II offers unmatched refinement and prestige.",
    features: [
      "V8 Engine",
      "Handcrafted Interior",
      "Silent Ride",
      "Royal Heritage",
    ],
  },
  // 7. Mercedes Pagoda
  {
    id: "oldsmobile-super-88",
    name: "OLDSMOBILE SUPER 88",
    image: "/oldsmobile-10.png",
    link: "/classic/oldsmobile-super-88",
    // year: "1961",
    category: "classic" as const,
    description:
      "Experience American automotive heritage with the powerful and stylish Oldsmobile Super 88.",
    features: [
      "V8 Rocket Engine",
      "American Classic",
      "Powerful Performance",
      "Retro Design",
    ],
  },
  {
    id: "mercedes-280sl-pagoda",
    name: "MERCEDES PAGODA",
    image: "/pagoda-7.png",
    link: "/classic/mercedes-280sl-pagoda",
    // year: "1969",
    category: "classic" as const,
    description:
      "The iconic Mercedes 280SL Pagoda represents automotive excellence from the golden age of motoring.",
    features: [
      "V8 Engine",
      "Classic Design",
      "Timeless Elegance",
      "Perfect for Events",
    ],
  },
  // 8. Jaguar XJ6 - Available Soon
  // {
  //   id: "jaguar-xj6",
  //   name: "JAGUAR XJ6",
  //   image: "/jaguar-xj6-1968.png",
  //   link: "/classic/jaguar-xj6",
  //   year: "1968",
  //   category: "classic" as const,
  //   description:
  //     "British elegance meets sporting performance in this iconic Jaguar XJ6, a true classic of automotive design.",
  //   features: [
  //     "Straight-6 Engine",
  //     "British Luxury",
  //     "Sporting Heritage",
  //     "Timeless Design",
  //   ],
  //   availableSoon: true,
  // },
  // // 9. Jaguar Double Six Daimler - Available Soon
  // {
  //   id: "jaguar-double-six-daimler",
  //   name: "JAGUAR DOUBLE SIX DAIMLER",
  //   image: "/jaguar-double-six-daimler-1991.png",
  //   link: "/classic/jaguar-double-six-daimler",
  //   year: "1991",
  //   category: "classic" as const,
  //   description:
  //     "The ultimate expression of British luxury, the Double Six Daimler combines V12 power with unparalleled refinement.",
  //   features: [
  //     "V12 Engine",
  //     "Daimler Luxury",
  //     "Executive Comfort",
  //     "British Prestige",
  //   ],
  //   availableSoon: true,
  // },
];

function RouteComponent() {
  const { t } = useLanguage();

  return (
    <CarMarketplace
      title={t("Complete Fleet")}
      subtitle={t(
        "Classic heritage and modern innovation in one exclusive collection"
      )}
      description={t(
        "Explore our full fleet of classic masterpieces and modern marvels. Whether you seek timeless elegance or cutting-edge luxury, each vehicle is meticulously maintained and ready to elevate your next journey."
      )}
      heroImage="/complete-fleet-1.png"
      cars={completeFleet}
    />
  );
}
