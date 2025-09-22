import { createFileRoute } from '@tanstack/react-router'
import { ServiceDetail } from '../../components/ServiceDetail'

export const Route = createFileRoute('/services/airports')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ServiceDetail
      title="Airport Transfers"
      subtitle="Transfers from Tires (Cascais Airport) - Fixed price for 25 km - 6% VAT included"
      description="Experience premium airport transfers with our luxury fleet. Our modern vehicles offer comfort, reliability, and onboard amenities for high-profile clients, while our classic cars provide a unique and memorable experience. All transfers include priority meet & greet service, flight tracking, luggage assistance, and multi-language support."
      heroImage="/airport-transfers.png"
      mainImage="/airport-transfers.png"
      mainImageAlt="Airport Transfers"
      imageOnLeft={false}
      features={[
        {
          title: "Modern Fleet Services",
          items: [
            "Fixed price covering 25 km with 6% VAT included",
            "Extra kilometers charged per km",
            "Optional extra vehicle for luggage (Mercedes GLC 300) - €150",
            "Priority meet & greet service",
            "Flight tracking & monitoring",
            "Private terminal access",
            "Luggage assistance",
            "Real-time arrival updates",
            "Multi-language support"
          ]
        },
        {
          title: "Classic Fleet Services",
          items: [
            "Pickup of classic cars at the airport - unique experience",
            "Maximum distance included: 20 km - fixed price",
            "Extra vehicle included (Mercedes GLC 300) - €150 extra",
            "Extra kilometers charged per km",
            "Premium presentation and maintenance",
            "High value and rarity guarantee"
          ]
        },
        {
          title: "Vehicle Options",
          items: [
            "Bentley Mulsanne - €270 (25km) + €2.5/km extra",
            "Mercedes Maybach - €230 (25km) + €2/km extra",
            "Mercedes Brabus - €190 (25km) + €1.8/km extra",
            "Rolls-Royce Silver Cloud II 1961 - €350 (20km) + €3/km extra",
            "Rolls-Royce Silver Shadow 1973 - €300 (20km) + €2.5/km extra",
            "Oldsmobile Super 88 1961 - €320 (20km) + €2.8/km extra"
          ]
        }
      ]}
      pricing={[
        {
          name: "Bentley Mulsanne (25km fixed)",
          price: "€270 (€286.20 incl. 6% VAT)"
        },
        {
          name: "Mercedes Maybach (25km fixed)",
          price: "€230 (€243.80 incl. 6% VAT)"
        },
        {
          name: "Mercedes Brabus (25km fixed)",
          price: "€190 (€201.40 incl. 6% VAT)"
        },
        {
          name: "Rolls-Royce Silver Cloud II (20km fixed)",
          price: "€350 (€371 incl. 6% VAT)"
        },
        {
          name: "Rolls-Royce Silver Shadow (20km fixed)",
          price: "€300 (€318 incl. 6% VAT)"
        },
        {
          name: "Oldsmobile Super 88 (20km fixed)",
          price: "€320 (€339.20 incl. 6% VAT)"
        }
      ]}
      ctaText="Book Airport Transfer"
      bookingLink="/booking/airport"
    />
  )
}
