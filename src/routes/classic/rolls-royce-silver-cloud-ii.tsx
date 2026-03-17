import { createFileRoute } from "@tanstack/react-router";
import { CarDetail } from "../../components/CarDetail";
import { useLanguage } from "@/components/LanguageProvider";

export const Route = createFileRoute("/classic/rolls-royce-silver-cloud-ii")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useLanguage();
  const carImages = [
    {
      src: "/cloud-20.png",
      alt: t(
        "Rolls-Royce Silver Cloud II interior - high-angle left side view",
      ),
      caption: t(
        "Elegant teal body with flowing lines and brightwork from an elevated angle",
      ),
    },
    {
      src: "/cloud-14.png",
      alt: t("Rolls-Royce Silver Cloud II exterior - front three-quarter view"),
      caption: t(
        "Classic front end with prominent bonnet and chrome bumper overriders",
      ),
    },
    {
      src: "/cloud-21.png",
      alt: t("Rolls-Royce Silver Cloud II interior - rear picnic tables"),
      caption: t("Fold-out walnut picnic trays for rear passengers"),
    },
    {
      src: "/cloud-22.png",
      alt: t(
        "Rolls-Royce Silver Cloud II interior - front cabin and dashboard",
      ),
      caption: t(
        "Cream leather front bench with rich walnut veneer dashboard and trim",
      ),
    },
    {
      src: "/cloud-23.png",
      alt: t("Rolls-Royce Silver Cloud II interior - rear seat and headliner"),
      caption: t(
        "Spacious rear compartment with cream leather upholstery and wood accents",
      ),
    },
    {
      src: "/cloud-24.png",
      alt: t("Rolls-Royce Silver Cloud II interior - rear seat and headliner"),
      caption: t(
        "Spacious rear compartment with cream leather upholstery and wood accents",
      ),
    },
  ];

  const carFeatures = [
    {
      title: "Handcrafted Interior",
      description:
        "Every detail meticulously crafted by master artisans in the Rolls-Royce tradition.",
    },
    {
      title: "Silent Ride",
      description:
        "Legendary Rolls-Royce refinement with unmatched noise isolation and smoothness.",
    },
    {
      title: "Royal Heritage",
      description:
        "Proud bearer of the Royal Warrant, serving British royalty for generations.",
    },
    {
      title: "Timeless Elegance",
      description:
        "Design that transcends decades, still considered the pinnacle of automotive luxury.",
    },
    {
      title: "British Craftsmanship",
      description:
        "The gold standard of automotive excellence and attention to detail.",
    },
  ];

  const specifications = {
    Passengers: "4 passengers + professional chauffeur",
    Luggage: "1 suitcase + 2 bags",
  };

  // const pricing = [
  //   { label: "Base rate (max. 20km)", value: "€350" },
  //   { label: "Additional km", value: "Subject to request" },
  // ];

  return (
    <CarDetail
      name="Rolls-Royce Silver Cloud II"
      // year="1961"
      category="classic"
      images={carImages}
      // description="The Rolls-Royce Silver Cloud II represents the epitome of British luxury and prestige from the golden age of motoring. This 1961 masterpiece offers unmatched refinement and craftsmanship, embodying the legendary Rolls-Royce tradition of excellence that has served British royalty and discerning clients for generations."
      features={carFeatures}
      specifications={specifications}
      // prices={pricing}
      heroImage="/cloud-16.png"
      heroSideImage="/cloud-17.png"
      heroSideImage2="/cloud-18.png"
      heroSideImageMiddle="/cloud-19.png"
      reservationLink="/booking/rolls-royce-silver-cloud-ii"
    />
  );
}
