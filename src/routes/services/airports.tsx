import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetail } from "../../components/ServiceDetail";

export const Route = createFileRoute("/services/airports")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ServiceDetail
      title="Airport Transfers"
      subtitle="Transfers from Tires (Cascais Airport) - Fixed price for 25 km"
      description="Experience premium airport transfers with our luxury fleet. Our modern vehicles offer comfort, reliability, and onboard amenities for high-profile clients, while our classic cars provide a unique and memorable experience. All transfers include priority meet & greet service, flight tracking, luggage assistance, and multi-language support."
      heroImage="/airport-transfers.png"
      mainImage="/bentley-2.png"
      mainImageAlt="Mercedes GLC 300 airport transfer support vehicle"
      imageOnLeft={false}
      features={[
        {
          title: "Modern Fleet Services",
          items: [
            "Fixed price covering 25 km",
            "Extra kilometers charged per km",
            "Optional extra vehicle for luggage",
            "Priority meet & greet service",
            "Flight tracking & monitoring",
            "Private terminal access",
            "Luggage assistance",
            "Real-time arrival updates",
            "Multi-language support",
          ],
        },
        {
          title: "Classic Fleet Services",
          items: [
            "Pickup of classic cars at the airport - unique experience",
            "Maximum distance included: 20 km",
            "Extra vehicle included",
            "Extra kilometers charged per km",
            "Premium presentation and maintenance",
            "High value and rarity guarantee",
          ],
        },
        {
          title: "Vehicle Options",
          items: [
            "Bentley Mulsanne",
            "Mercedes Maybach",
            "Mercedes S500 Brabus",
            "Rolls-Royce Silver Cloud II 1961",
            "Rolls-Royce Silver Shadow 1973",
            "Oldsmobile Super 88 1961",
          ],
        },
      ]}
      ctaText="Book Airport Transfer"
      bookingLink="/booking/airport"
    />
  );
}
