import { createFileRoute } from '@tanstack/react-router'
import { ServiceDetail } from '../../components/ServiceDetail'

export const Route = createFileRoute('/services/special-events')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ServiceDetail
      title="Special Events"
      subtitle="Transform your special occasions into unforgettable experiences"
      description="Transform your special occasions into unforgettable experiences with our bespoke event transportation. Whether it's your dream wedding, corporate gala, or milestone celebration, we provide elegant transportation solutions that complement and enhance your special moments. Our classic and modern fleet offers the perfect backdrop for your most cherished memories."
      heroImage="/special-events.png"
      mainImage="/special-events.png"
      mainImageAlt="Special Events"
      imageOnLeft={false}
      features={[
        {
          title: "Event Services",
          items: [
            "Wedding Transportation",
            "Ceremony & Reception Service",
            "Classic Car Collection",
            "Bridal Party Transport",
            "Guest Shuttle Service",
            "Event Coordination"
          ]
        },
        {
          title: "Popular Packages",
          items: [
            "Classic Car Wedding",
            "Luxury SUV Wedding",
            "Complete Event Package"
          ]
        }
      ]}
      pricing={[
        { name: "Classic Car Wedding", price: "€950" },
        { name: "Luxury SUV Wedding", price: "€750" },
        { name: "Complete Event Package", price: "Contact Us" }
      ]}
      ctaText="Plan Your Event"
    />
  )
}
