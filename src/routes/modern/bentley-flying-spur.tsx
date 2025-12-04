import { CarDetail } from "@/components/CarDetail";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/modern/bentley-flying-spur")({
  component: RouteComponent,
});

function RouteComponent() {
  const carImages = [
    {
      src: "/flyingspur-4.png",
      alt: "Bentley Flying Spur detail - Front view",
      caption: "Front view of the Bentley Flying Spur",
    },
    {
      src: "/flyingspur.png",
      alt: "Bentley Flying Spur detail - Rear view",
      caption: "Rear view of the Bentley Flying Spur",
    },
    {
      src: "/flyingspur-5.png",
      alt: "Bentley Flying Spur detail - Interior",
      caption: "Interior of the Bentley Flying Spur",
    },
  ];
  const carFeatures = [
    {
      title: "Handcrafted Interior",
      description:
        "Every detail meticulously crafted by master artisans using the finest materials available.",
    },
    {
      title: "Air Suspension",
      description:
        "Advanced air suspension system provides unparalleled comfort and ride quality.",
    },
    {
      title: "Air Suspension",
      description:
        "Spacious cabin with executive seating perfect for business travel and long journeys, complete with soothing massage functionality.",
    },
  ];
  const specifications = {
    Engine: "V8 Twin-Turbo Engine",
    Horsepower: "600 hp",
    Torque: "664 lb-ft",
    "0-60 mph": "3.7 seconds",
  };
  return (
    <CarDetail
      name="Bentley Flying Spur"
      category="modern"
      images={carImages}
      reservationLink="/contact"
      heroSideImage="/flyingspur-1.png"
      heroSideImageMiddle="/flyingspur-2.png"
      heroSideImage2="/flyingspur-3.png"
      heroImage="/flyingspur.png"
      features={carFeatures}
      specifications={specifications}
      description="The Bentley Flying Spur is a luxury car that is built in the United Kingdom."
    />
  );
}
