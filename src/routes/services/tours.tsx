import { createFileRoute } from '@tanstack/react-router'
import { ServiceDetail } from '../../components/ServiceDetail'

export const Route = createFileRoute('/services/tours')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ServiceDetail
      title="Luxury Tours"
      subtitle="Discover breathtaking destinations through the comfort of our premium fleet"
      description="Discover breathtaking destinations through the comfort of our premium fleet. Our luxury tours combine exceptional transportation with curated experiences, expert local knowledge, and personalized itineraries. Whether exploring the Algarve's coastline, Portugal's wine regions, or Spain's cultural landmarks, every journey becomes a memorable adventure."
      heroImage="/scenic-routes.png"
      mainImage="/scenic-routes.png"
      mainImageAlt="Luxury Tours"
      imageOnLeft={true}
      features={[
        {
          title: "Tour Experiences",
          items: [
            "Custom Itinerary Planning",
            "Expert Local Guides",
            "Premium Dining Experiences",
            "Historic Site Access",
            "Wine Region Tours",
            "Coastal Scenic Routes"
          ]
        },
        {
          title: "Popular Destinations",
          items: [
            "Algarve Coastal Tour",
            "Douro Wine Valley",
            "Sintra Day Trip"
          ]
        }
      ]}
      pricing={[
        { name: "Algarve Coastal Tour", price: "€450" },
        { name: "Douro Wine Valley", price: "€550" },
        { name: "Sintra Day Trip", price: "€350" }
      ]}
      ctaText="Plan Your Tour"
    />
  )
}
