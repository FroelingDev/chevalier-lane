import { createFileRoute } from '@tanstack/react-router'
import { ServiceDetail } from '../../components/ServiceDetail'

export const Route = createFileRoute('/services/airports')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ServiceDetail
      title="Airport Transfers"
      subtitle="Seamless luxury transportation to and from your destination"
      description="Arrive in style with our premium airport transfer service. We provide seamless, punctual transfers ensuring you reach your destination comfortably and on time. Our experienced chauffeurs are familiar with all major airports in Portugal and Spain, providing priority service and meet & greet options for international travelers."
      heroImage="/airport-transfers.png"
      mainImage="/airport-transfers.png"
      mainImageAlt="Airport Transfers"
      imageOnLeft={false}
      features={[
        {
          title: "Transfer Services",
          items: [
            "Priority Meet & Greet Service",
            "Flight Tracking & Monitoring",
            "Private Terminal Access",
            "Luggage Assistance",
            "Real-time Arrival Updates",
            "Multi-language Support"
          ]
        },
        {
          title: "Major Routes",
          items: [
            "Lisbon Airport ↔ Center",
            "Cascais Airport",
            "Porto Airport"
          ]
        }
      ]}
      pricing={[
        { name: "Lisbon Airport ↔ Center", price: "€120" },
        { name: "Cascais Airport", price: "€250" },
        { name: "Porto Airport", price: "€180" }
      ]}
      ctaText="Book Airport Transfer"
    />
  )
}
