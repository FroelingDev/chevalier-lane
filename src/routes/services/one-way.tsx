import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetail } from "../../components/ServiceDetail";

export const Route = createFileRoute("/services/one-way")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ServiceDetail
      title="One-Way Transportation"
      subtitle="Flexible point-to-point luxury transportation solutions"
      description="Experience seamless one-way transportation with our premium chauffeur service. Whether you need transportation from the airport to your hotel, between cities, or any other point-to-point journey, we provide comfortable, reliable, and sophisticated transport solutions tailored to your schedule and preferences."
      heroImage="/modern-header.png"
      mainImage="/bentley-2.png"
      mainImageAlt="Mercedes S500 Brabus one-way chauffeur"
      imageOnLeft={false}
      features={[
        {
          title: "Vehicle Options",
          items: [
            "Modern Luxury: Bentley Mulsanne, Mercedes S-Class, Mercedes Maybach",
            "Classic Collection: Rolls-Royce Silver Shadow, Rolls-Royce Silver Cloud II, Oldsmobile Super 88",
            "Professional Chauffeur Service",
            "Real-time GPS Tracking",
            "Flexible Scheduling",
          ],
        },
        {
          title: "Pricing Structure",
          items: [
            "Modern Vehicles: Base rate up to 25km",
            "Classic Vehicles: Base rate up to 20km + subject to request",
            "Dynamic pricing based on distance and vehicle selection",
            "Real-time route calculation and price estimation",
          ],
        },
      ]}
      ctaText="Book One-Way Transfer"
      bookingLink="/booking/one-way"
    />
  );
}
