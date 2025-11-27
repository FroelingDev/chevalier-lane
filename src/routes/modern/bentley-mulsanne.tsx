import { createFileRoute } from "@tanstack/react-router";
import { CarDetail } from "../../components/CarDetail";

export const Route = createFileRoute("/modern/bentley-mulsanne")({
  component: RouteComponent,
});

function RouteComponent() {
  const carImages = [
    {
      src: "/bentley-17.png",
      alt: "Bentley Mulsanne detail - Flying B hood mascot close-up",
      caption: "Close-up of the gloss-black Flying B emblem on the bonnet",
    },
    {
      src: "/bentley-18.png",
      alt: "Bentley Mulsanne detail - Front view",
      caption: "Front view of the Bentley Mulsanne",
    },
    {
      src: "/bentley-21.png",
      alt: "Bentley Mulsanne detail - Rear view",
      caption: "Rear view of the Bentley Mulsanne",
    },
    {
      src: "/bentley-22.png",
      alt: "Bentley Mulsanne detail - Interior",
      caption: "Interior of the Bentley Mulsanne",
    },
    {
      src: "/bentley-25.png",
      alt: "Bentley Mulsanne side view - Exterior",
      caption: "Exterior of the Bentley Mulsanne",
    },
    {
      src: "/bentley-26.png",
      alt: "Bentley Mulsanne front right side view - Exterior",
      caption: "Front right side view of the Bentley Mulsanne",
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
        "Spacious cabin with executive seating perfect for business travel and long journeys, complete with soothing massage functionality.",
    },
    {
      title: "Advanced Technology",
      description:
        "Latest infotainment and connectivity features seamlessly integrated with luxury.",
    },
    {
      title: "Rear Entertainment Suite",
      description:
        "Large high-resolution screen lets passengers enjoy TV and media in complete comfort.",
    },
    {
      title: "British Heritage",
      description:
        "Proud continuation of Bentley's legendary heritage and craftsmanship tradition.",
    },
  ];

  const specifications = {
    Engine: "V8 Twin-Turbo 6.75L",
    Passengers: "4",
    Luggage: "3 suitcases + 2 bags",
  };

  // const pricing = [
  //   { label: "Base rate (max. 25km)", value: "€270" },
  //   { label: "Additional per km", value: "€3,50/km" },
  // ];

  return (
    <CarDetail
      name="Bentley Mulsanne"
      category="modern"
      images={carImages}
      description="British luxury redefined, the Bentley Mulsanne offers unparalleled comfort and sophistication for the discerning traveler. This masterpiece combines cutting-edge technology with traditional British craftsmanship, creating an experience that transcends ordinary luxury transportation."
      features={carFeatures}
      specifications={specifications}
      // prices={pricing}
      heroVideo="/bentley.MP4"
      heroImage="/bentley-16.png"
      heroSideImage="/bentley-23.png"
      heroSideImageAlt="Bentley Mulsanne profile detail"
      heroSideImageMiddle="/bentley-24.png"
      heroSideImageAltMiddle="Bentley Mulsanne rear quarter detail"
      heroSideImage2="/bentley-19.png"
      heroSideImageAlt2="Bentley Mulsanne profile detail"
      reservationLink="/booking/bentley-mulsanne"
    />
  );
}
