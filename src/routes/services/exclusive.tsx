import { createFileRoute } from '@tanstack/react-router'
import { ServiceDetail } from '../../components/ServiceDetail'

export const Route = createFileRoute('/services/exclusive')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ServiceDetail
      title="Exclusive Experiences"
      subtitle="Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation"
      description="Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation. Our exclusive experiences combine the finest vehicles with extraordinary destinations, VIP access, and personalized concierge services. From private villa visits to exclusive cultural events, we create bespoke experiences that reflect your individual passions and desires."
      heroImage="/foton-pagoda.png"
      mainImage="/foton-pagoda.png"
      mainImageAlt="Exclusive Experiences"
      imageOnLeft={true}
      features={[
        {
          title: "VIP Services",
          items: [
            "Private Villa Access",
            "VIP Event Transportation",
            "Exclusive Cultural Experiences",
            "Personal Concierge Service",
            "Bespoke Itinerary Creation",
            "Luxury Accommodation Coordination"
          ]
        },
        {
          title: "Exclusive Packages",
          items: [
            "VIP Cultural Experience",
            "Private Estate Tour",
            "Bespoke Experience"
          ]
        }
      ]}
      pricing={[
        { name: "VIP Cultural Experience", price: "€800" },
        { name: "Private Estate Tour", price: "€1200" },
        { name: "Bespoke Experience", price: "Contact Us" }
      ]}
      ctaText="Create Exclusive Experience"
    />
  )
}
