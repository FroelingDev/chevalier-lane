import { createFileRoute } from "@tanstack/react-router";
import { CarDetail } from "../../components/CarDetail";

export const Route = createFileRoute("/modern/bentley-mulsanne")({
  component: RouteComponent,
});

function RouteComponent() {
  const carImages = [
    {
      src: "/bentley-1.png",
      alt: "Bentley Mulsanne exterior - high-angle driver-side view",
      caption:
        "High-angle exterior showcasing long wheelbase, dark wheels and sleek profile",
    },
    {
      src: "/bentley-2.png",
      alt: "Bentley Mulsanne interior - rear cabin with entertainment screens",
      caption:
        "Luxurious rear compartment with dual headrest screens and champagne cooler",
    },
    {
      src: "/bentley-3.png",
      alt: "Bentley Mulsanne interior - cockpit and dashboard",
      caption:
        "Driver's view of the steering wheel, gauges and center console controls",
    },
    {
      src: "/bentley-8.png",
      alt: "Bentley Mulsanne interior - front seat embroidery detail",
      caption:
        "Close-up of Bentley winged-B logo embroidered on cream leather seats",
    },
    {
      src: "/bentley-9.png",
      alt: "Bentley Mulsanne detail - Flying B hood mascot (monochrome)",
      caption: "Artistic black-and-white close-up of the retractable Flying B",
    },
    {
      src: "/bentley-10.png",
      alt: "Bentley Mulsanne detail - Flying B hood mascot close-up",
      caption: "Close-up of the gloss-black Flying B emblem on the bonnet",
    },
    {
      src: "/bentley-11.png",
      alt: "Bentley Mulsanne detail - Flying B hood mascot close-up",
      caption: "Close-up of the gloss-black Flying B emblem on the bonnet",
    },
  ];

  const carFeatures = [
    {
      title: "Handcrafted Interior",
      description:
        "Every detail meticulously crafted by master artisans using the finest materials available.",
    },
    {
      title: "Twin-Turbo V8 Power",
      description:
        "Powerful 6.75L twin-turbo V8 engine delivering effortless performance and refinement.",
    },
    {
      title: "Air Suspension",
      description:
        "Advanced air suspension system provides unparalleled comfort and ride quality.",
    },
    {
      title: "Executive Seating",
      description:
        "Spacious cabin with executive seating perfect for business travel and long journeys.",
    },
    {
      title: "Advanced Technology",
      description:
        "Latest infotainment and connectivity features seamlessly integrated with luxury.",
    },
    {
      title: "British Heritage",
      description:
        "Proud continuation of Bentley's legendary heritage and craftsmanship tradition.",
    },
  ];

  const specifications = {
    Engine: "V8 Twin-Turbo 6.75L",
    Power: "537 hp",
    Transmission: "8-Speed Automatic",
    "Top Speed": "190 mph (305 km/h)",
    Acceleration: "0-60 mph in 4.1s",
    "Fuel Economy": "15 mpg combined",
    Passengers: "4",
    Luggage: "3 suitcases + 2 bags",
    "Drive Type": "Rear-Wheel Drive",
  };

  const pricing = [
    { label: "Base rate (max. 25km)", value: "€270" },
    { label: "Additional per km", value: "€3,50/km" },
  ];

  return (
    <CarDetail
      name="Bentley Mulsanne"
      year="2023"
      category="modern"
      images={carImages}
      description="British luxury redefined, the Bentley Mulsanne offers unparalleled comfort and sophistication for the discerning traveler. This masterpiece combines cutting-edge technology with traditional British craftsmanship, creating an experience that transcends ordinary luxury transportation."
      features={carFeatures}
      specifications={specifications}
      prices={pricing}
      heroImage="/bentley-7.png"
      reservationLink="/booking/bentley-mulsanne"
    />
  );
}
