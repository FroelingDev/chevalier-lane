import { createFileRoute } from "@tanstack/react-router";
import { CarDetail } from "../../components/CarDetail";

export const Route = createFileRoute("/classic/mercedes-280sl-pagoda")({
  component: RouteComponent,
});

function RouteComponent() {
  const carImages = [
    {
      src: "/pagoda-11.png",
      alt: "Mercedes 280SL Pagoda - Front Left View",
      caption: "Elegant front left view showcasing the pagoda's elegant design",
    },
    {
      src: "/pagoda-12.png",
      alt: "Mercedes 280SL Pagoda - Driver's Wheel",
      caption: "Driver's wheel with classic Mercedes styling",
    },
    {
      src: "/pagoda-8.png",
      alt: "Mercedes 280SL Pagoda - Front Grill",
      caption: "Front grill with classic Mercedes styling",
    },
    {
      src: "/pagoda-13.png",
      alt: "Mercedes 280SL Pagoda - Driver's Seat",
      caption: "Driver's seat with classic Mercedes styling",
    },
    {
      src: "/pagoda-14.png",
      alt: "Mercedes 280SL Pagoda - Rear View",
      caption: "Rear view of the pagoda's elegant design",
    },
    {
      src: "/foton-pagoda.png",
      alt: "Mercedes 280SL Pagoda - Full View",
      caption: "Full view of the pagoda's elegant design",
    },
  ];

  const carFeatures = [
    {
      title: "Iconic Pagoda Design",
      description:
        "The distinctive soft top roof that gives this car its legendary name and status.",
    },
    {
      title: "Pure Driving Experience",
      description:
        "Experience automotive purity with manual transmission and analog instrumentation.",
    },
    {
      title: "Timeless Elegance",
      description:
        "A design that transcends generations, still turning heads after six decades.",
    },
    {
      title: "Engineering Excellence",
      description:
        "Mercedes-Benz build quality and attention to detail that has stood the test of time.",
    },
    {
      title: "Collectible Status",
      description:
        "One of the most sought-after classic cars, appreciating in value and prestige.",
    },
    {
      title: "Event Perfect",
      description:
        "Makes any occasion special with its presence and the stories it tells.",
    },
  ];

  const specifications = {
    Engine: "Inline-6 2.8L",
    Seating: "1 passengers",
  };

  // const pricing = [{ label: "Pricing", value: "Subject to special request" }];

  return (
    <CarDetail
      name="Mercedes 280SL Pagoda"
      year="1969"
      category="classic"
      images={carImages}
      description="The iconic Mercedes 280SL Pagoda represents automotive excellence from the golden age of motoring. With its distinctive hardtop roof and timeless design, this 1969 masterpiece continues to captivate enthusiasts and represents the pinnacle of 1960s automotive design."
      features={carFeatures}
      specifications={specifications}
      // prices={pricing}
      heroImage="/hero-pagoda.png"
      heroSideImage="/pagoda-8.png"
      heroSideImage2="/pagoda-10.png"
      heroSideImageMiddle="/pagoda-9.png"
      reservationLink="/contact"
    />
  );
}
