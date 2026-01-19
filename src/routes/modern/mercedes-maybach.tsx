import { CarDetail } from "@/components/CarDetail";
import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/components/LanguageProvider";

export const Route = createFileRoute("/modern/mercedes-maybach")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useLanguage();
  const carImages = [
    {
      src: "/maybach-8.png",
      alt: t("Mercedes Maybach detail - Front view"),
      caption: t("Front view of the Mercedes Maybach"),
    },
    {
      src: "/maybach-4.png",
      alt: t("Mercedes Maybach detail - Rear view"),
      caption: t("Rear view of the Mercedes Maybach"),
    },
    {
      src: "/maybach-10.png",
      alt: t("Mercedes Maybach detail - Interior"),
      caption: t("Interior of the Mercedes Maybach"),
    },
    {
      src: "/complete-fleet.png",
      alt: t("Mercedes Maybach detail - Exterior"),
      caption: t("Exterior of the Mercedes Maybach"),
    },
    {
      src: "/maybach-13.png",
      alt: t("Mercedes Maybach detail - Rear view"),
      caption: t("Rear view of the Mercedes Maybach"),
    },
    {
      src: "/maybach-12.png",
      alt: t("Mercedes Maybach detail - Front view"),
      caption: t("Front view of the Mercedes Maybach"),
    },
  ];
  const carFeatures = [
    {
      title: "Executive Rear Seating",
      description:
        "Spacious cabin with executive seating perfect for business travel and long journeys, complete with soothing massage functionality.",
    },
    {
      title: "Premium Materials",
      description:
        "Premium leather seating with massage function and climate control for ultimate comfort.",
    },
    {
      title: "Maybach Interior & Exterior",
      description:
        "A hand-finished cabin featuring exclusive Maybach details, refined stitching, and a serene atmosphere created for privacy and relaxation.",
    },
    {
      title: "Advanced Technology",
      description:
        "State-of-the-art infotainment system with navigation, connectivity, and driver assistance features.",
    },
  ];
  const specifications = {
    Passengers: "3 passengers + professional chauffeur",
    Luggage: "3 suitcases + 2 bags",
  };
  return (
    <CarDetail
      name="Mercedes Maybach"
      category="modern"
      images={carImages}
      // description="The Mercedes S-Class Maybach"
      features={carFeatures}
      reservationLink="/contact"
      heroImage="/maybach-9.png"
      heroVideo="/home-1.mp4"
      heroSideImage="/maybach-5.png"
      heroSideImageMiddle="/maybach-6.png"
      heroSideImage2="/maybach-7.png"
      specifications={specifications}
    />
  );
}
