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
      mainImage="/range-rover-vogue.png"
      mainImageAlt="One-Way Transportation"
      imageOnLeft={false}
      features={[
        {
          title: "Service Options",
          items: [
            "Airport to Hotel Transfers",
            "City to City Transportation",
            "Inter-regional Travel",
            "Flexible Scheduling",
            "Real-time GPS Tracking",
            "Professional Chauffeurs"
          ]
        },
        {
          title: "Popular Routes",
          items: [
            "Lisbon ↔ Porto",
            "Lisbon ↔ Algarve",
            "Porto ↔ Algarve",
            "Madrid ↔ Barcelona"
          ]
        }
      ]}
      pricing={[
        { name: "Lisbon ↔ Porto", price: "€450" },
        { name: "Lisbon ↔ Algarve", price: "€650" },
        { name: "Madrid ↔ Barcelona", price: "€550" }
      ]}
      ctaText="Book One-Way Transfer"
    />
  )
}
