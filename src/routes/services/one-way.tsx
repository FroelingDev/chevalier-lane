import { createFileRoute } from '@tanstack/react-router'
import { ServiceDetail } from '../../components/ServiceDetail'

export const Route = createFileRoute('/services/one-way')({
  component: RouteComponent,
})

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
            "Flexible Scheduling"
          ]
        },
        {
          title: "Pricing Structure",
          items: [
            "Modern Vehicles: Base rate up to 25km + €1.80-€3.50/km thereafter",
            "Classic Vehicles: Base rate up to 20km + subject to request",
            "Dynamic pricing based on distance and vehicle selection",
            "Real-time route calculation and price estimation"
          ]
        }
      ]}
      pricing={[
        { name: "Bentley Mulsanne (Modern)", price: "€270 (25km) + €3.50/km" },
        { name: "Mercedes S500 Brabus (Modern)", price: "€190 (25km) + €1.80/km" },
        { name: "Mercedes Maybach (Modern)", price: "€230 (25km) + €3.00/km" },
        { name: "Rolls-Royce Silver Shadow (Classic)", price: "€300 (20km) + Subject to request" },
        { name: "Rolls-Royce Silver Cloud II (Classic)", price: "€350 (20km) + Subject to request" },
        { name: "Oldsmobile Super 88 (Classic)", price: "€320 (20km) + Subject to request" }
      ]}
      ctaText="Book One-Way Transfer"
      bookingLink="/booking/one-way"
    />
  )
}
