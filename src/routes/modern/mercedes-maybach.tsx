import { CarDetail } from "@/components/CarDetail";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/modern/mercedes-maybach")({
  component: RouteComponent,
});

function RouteComponent() {
  const carImages = [
    {
      src: "/maybach-8.png",
      alt: "Mercedes Maybach detail - Front view",
      caption: "Front view of the Mercedes Maybach",
    },
    {
      src: "/maybach-9.png",
      alt: "Mercedes Maybach detail - Rear view",
      caption: "Rear view of the Mercedes Maybach",
    },
    {
      src: "/maybach-10.png",
      alt: "Mercedes Maybach detail - Interior",
      caption: "Interior of the Mercedes Maybach",
    },
    {
      src: "/maybach-11.png",
      alt: "Mercedes Maybach detail - Exterior",
      caption: "Exterior of the Mercedes Maybach",
    },
    {
      src: "/maybach-13.png",
      alt: "Mercedes Maybach detail - Rear view",
      caption: "Rear view of the Mercedes Maybach",
    },
    {
      src: "/maybach-12.png",
      alt: "Mercedes Maybach detail - Front view",
      caption: "Front view of the Mercedes Maybach",
    },
  ];
  const carFeatures = [
    {
      title: "V8 Engine",
      description: "The Mercedes Maybach is powered by a V8 engine.",
    },
  ];
  const specifications = {
    Engine: "V8 Engine",
    Passengers: "3",
    Luggage: "3 suitcases + 2 bags",
  };
  return (
    <CarDetail
      name="Mercedes Maybach"
      category="modern"
      images={carImages}
      description="The Mercedes S-Class Maybach"
      features={carFeatures}
      reservationLink="/contact"
      heroImage="/maybach-4.png"
      heroSideImage="/maybach-5.png"
      heroSideImageMiddle="/maybach-6.png"
      heroSideImage2="/maybach-7.png"
      specifications={specifications}
    />
  );
}
