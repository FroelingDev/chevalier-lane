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
    {
      src: "/flyingspur-7.png",
      alt: "Bentley Flying Spur detail - Exterior",
      caption: "Exterior of the Bentley Flying Spur",
    },
    {
      src: "/flyingspur-8.png",
      alt: "Bentley Flying Spur detail - Exterior",
      caption: "Exterior of the Bentley Flying Spur",
    },
    {
      src: "/flyingspur-9.png",
      alt: "Bentley Flying Spur detail - Exterior",
      caption: "Exterior of the Bentley Flying Spur",
    },
    {
      src: "/flyingspur-10.png",
      alt: "Bentley Flying Spur detail - Exterior",
      caption: "Exterior of the Bentley Flying Spur",
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
      title: "V12 engine",
      description:
        "The Bentley Flying Spur is powered by a V12 engine, delivering exceptional performance and refinement.",
    },
    {
      title: "Premium sound system",
      description:
        "The Bentley Flying Spur is equipped with a premium sound system, delivering exceptional audio quality.",
    },
    {
      title: "British Heritage",
      description:
        "The Bentley Flying Spur is a British car, built in the United Kingdom.",
    },
  ];
  const specifications = {
    Passengers: "3",
    Luggage: "3 suitcases + 2 bags",
  };
  return (
    <CarDetail
      name="Bentley Flying Spur"
      category="modern"
      images={carImages}
      reservationLink="/contact"
      heroVideo="/home-3.mp4"
      heroSideImage="/flyingspur-1.png"
      heroSideImageMiddle="/flyingspur-2.png"
      heroSideImage2="/flyingspur-3.png"
      heroImage="/flyingspur.png"
      features={carFeatures}
      specifications={specifications}
      // description="The Bentley Flying Spur is a luxury car that is built in the United Kingdom."
    />
  );
}
