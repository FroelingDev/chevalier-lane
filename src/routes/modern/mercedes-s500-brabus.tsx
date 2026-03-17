import { createFileRoute } from "@tanstack/react-router";
import { CarDetail } from "../../components/CarDetail";
import { useLanguage } from "@/components/LanguageProvider";

export const Route = createFileRoute("/modern/mercedes-s500-brabus")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useLanguage();
  const carImages = [
    {
      src: "/brabus-10.png",
      alt: t("Mercedes S500 BRABUS exterior - low front three-quarter view"),
      caption:
        t(
          "Aggressive front three-quarter stance with multi-spoke wheels and chrome grille"
        ),
    },
    {
      src: "/brabus-11.png",
      alt: t("Mercedes S500 BRABUS exterior - head-on front view"),
      caption:
        t("Wide front view highlighting the large grille and swept headlamps"),
    },
    {
      src: "/brabus-12.png",
      alt: t("Mercedes S500 BRABUS detail - bonnet star emblem close-up"),
      caption: t("Close-up of the Mercedes bonnet star and grille badge"),
    },
    {
      src: "/brabus-13.png",
      alt: t("Mercedes S500 BRABUS interior - steering wheel and cockpit"),
      caption:
        t(
          "Driver-focused cockpit with multifunction steering wheel and center console controls"
        ),
    },
    {
      src: "/brabus-14.png",
      alt: t("Mercedes S500 BRABUS rim"),
      caption: t("Rim of the Mercedes S500 BRABUS"),
    },
    {
      src: "/brabus-15.png",
      alt: t("Mercedes S500 BRABUS interior - rear view"),
      caption: t("Rear view of the Mercedes S500 BRABUS"),
    },
  ];

  const carFeatures = [
    {
      title: "BRABUS Performance",
      description:
        "Enhanced with BRABUS power upgrades delivering exceptional performance and refinement.",
    },
    {
      title: "Executive Comfort",
      description:
        "Premium leather seating with massage function and climate control for ultimate comfort.",
    },
    {
      title: "Advanced Technology",
      description:
        "State-of-the-art infotainment system with navigation, connectivity, and driver assistance features.",
    },
    {
      title: "Luxury Interior",
      description:
        "Handcrafted interior with premium materials and meticulous attention to detail.",
    },
    {
      title: "Safety First",
      description:
        "Comprehensive safety systems including adaptive cruise control and lane keeping assist.",
    },
    {
      title: "Fuel Efficiency",
      description:
        "Optimized engine management for balanced performance and efficiency.",
    },
  ];

  const specifications = {
    Engine: "V8 Twin-Turbo 4.0L",
    Power: "621 hp",
    Transmission: "9-Speed Automatic",
    "Top Speed": "250 km/h (limited)",
    Acceleration: "0-100 km/h in 3.9s",
    "Fuel Economy": "9.1 L/100km",
    Passengers: "4 passengers + professional chauffeur",
    Luggage: "2 suitcases + 2 bags",
    "Drive Type": "Rear-Wheel Drive",
  };

  // const pricing = [
  //   { label: "Base rate (max. 25km)", value: "€190" },
  //   { label: "Additional per km", value: "€1,80/km" },
  // ];

  return (
    <CarDetail
      name="Mercedes S-Class BRABUS"
      category="modern"
      images={carImages}
      description="Experience the ultimate expression of German engineering excellence, combining power, luxury, and cutting-edge technology. The Mercedes S500 BRABUS represents the pinnacle of automotive performance with BRABUS enhancements that elevate every aspect of this magnificent vehicle."
      features={carFeatures}
      specifications={specifications}
      // prices={pricing}
      heroImage="/brabus-6.png"
      heroSideImage="/brabus-7.png"
      heroSideImageMiddle="/brabus-8.png"
      heroSideImage2="/brabus-9.png"
      reservationLink="/booking/mercedes-s500-brabus"
    />
  );
}
