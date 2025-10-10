import { createFileRoute } from "@tanstack/react-router";
import { CarDetail } from "../../components/CarDetail";

export const Route = createFileRoute("/classic/rolls-royce-silver-shadow")({
  component: RouteComponent,
});

function RouteComponent() {
  const carImages = [
    {
      src: "/shadow-1.png",
      alt: "Rolls-Royce Silver Shadow exterior - low front three-quarter view",
      caption:
        "Low-angle front three-quarter shot showing quad headlamps and grille",
    },
    {
      src: "/shadow-2.png",
      alt: "Rolls-Royce Silver Shadow detail - Spirit of Ecstasy on bonnet",
      caption:
        "Close-up of the Spirit of Ecstasy mascot with reflections on the bonnet",
    },
    {
      src: "/shadow-4.png",
      alt: "Rolls-Royce Silver Shadow exterior - low side profile",
      caption:
        "Low-angle side view emphasizing the front wing, chrome trim and stance",
    },
    {
      src: "/shadow-3.png",
      alt: "Rolls-Royce Silver Shadow detail - wheel and hubcap",
      caption: "Close-up of wheel with Rolls-Royce hubcap and trim ring",
    },
    {
      src: "/shadow-5.png",
      alt: "Rolls-Royce Silver Shadow exterior - front view with grille badges",
      caption:
        "Head-on view of the Pantheon grille adorned with club badges and chrome bumper",
    },
  ];

  const carFeatures = [
    {
      title: "Hydropneumatic Suspension",
      description:
        "Revolutionary self-leveling suspension system providing unparalleled ride comfort.",
    },
    {
      title: "V8 Turbo Engine",
      description:
        "Powerful and refined turbocharged V8 delivering modern performance standards.",
    },
    {
      title: "Modern Classic",
      description:
        "Perfect blend of traditional Rolls-Royce values with contemporary engineering.",
    },
    {
      title: "Executive Comfort",
      description:
        "Spacious cabin designed for business travel and long-distance comfort.",
    },
    {
      title: "Advanced Technology",
      description:
        "Incorporated modern automotive technology while maintaining luxury standards.",
    },
    {
      title: "Timeless Design",
      description:
        "Design that influenced modern luxury cars and remains relevant today.",
    },
  ];

  const specifications = {
    Engine: "V8 Turbo 6.75L",
    Passengers: "4",
    Luggage: "2 suitcases + 2 bags",
  };

  // const pricing = [
  //   { label: "Base rate (max. 20km)", value: "€300" },
  //   { label: "Additional km", value: "Subject to request" },
  // ];

  return (
    <CarDetail
      name="Rolls-Royce Silver Shadow"
      year="1973"
      category="classic"
      images={carImages}
      description="The Rolls-Royce Silver Shadow represents a masterpiece of automotive engineering that blends traditional Rolls-Royce craftsmanship with cutting-edge technology. This 1973 classic introduced revolutionary features like hydropneumatic suspension while maintaining the unparalleled luxury and refinement that Rolls-Royce is renowned for worldwide."
      features={carFeatures}
      specifications={specifications}
      // prices={pricing}
      heroImage="/shadow-5.png"
      reservationLink="/booking/rolls-royce-silver-shadow"
    />
  );
}
