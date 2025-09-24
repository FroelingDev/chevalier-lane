import { createFileRoute } from '@tanstack/react-router'
import { ServiceDetail } from '../../components/ServiceDetail'

export const Route = createFileRoute('/services/weddings')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ServiceDetail
      title="Wedding Services"
      subtitle="Main Wedding Fleet: Stationary/Use by Couples - does not include decorations and designs as requested by the client"
      description="Transform your special day into an unforgettable experience with our premium wedding transportation services. Our classic and modern luxury vehicles provide the perfect backdrop for your most cherished wedding moments. From ceremony arrivals to reception departures, we ensure every aspect of your wedding day transportation is handled with elegance and precision."
      heroImage="/special-events.png"
      mainImage="/cloud-4.png"
      mainImageAlt="Rolls-Royce wedding chauffeur service"
      imageOnLeft={false}
      features={[
        {
          title: "Main Wedding Fleet (Stationary/Couples)",
          items: [
            "Rolls-Royce Silver Cloud II 1961 - €300/hour (minimum 3 hours €900, 12-hour day rate €3,600)",
            "Rolls-Royce Silver Shadow 1973 - €270/hour (minimum 3 hours €810, 12-hour day rate €3,240)",
            "Oldsmobile Super 88 1961 - €350/hour (minimum 3 hours €1,050, 12-hour day rate €4,200)",
            "Mercedes 280SL Pagoda 1969 - €250/hour (minimum 3 hours €750, 12-hour day rate €3,000)",
            "Decorations and designs available as extras",
            "Perfect for photos, ceremonies, and special moments",
            "Professional chauffeur service included"
          ]
        },
        {
          title: "Additional Wedding Transport Vehicles",
          items: [
            "Bentley Mulsanne (4 seats) - €150/trip, 2 trips/hour max, 6 trips max per booking",
            "Mercedes Brabus (4 seats) - €120/trip, 2 trips/hour max, 6 trips max per booking",
            "Mercedes Maybach (3 seats) - €140/trip, 2 trips/hour max, 6 trips max per booking",
            "Mercedes GLC 300 (4 seats) - €100/trip, 2 trips/hour max, 6 trips max per booking",
            "6% VAT included - For guest transportation",
            "Minimum 3 hours booking required",
            "1 trip = 1 pickup + 1 drop-off"
          ]
        },
        {
          title: "Decoration Options (Extra)",
          items: [
            "Basic Decoration (artificial or simple natural flowers + ribbons): €150 - €300",
            "Intermediate Decoration (medium quality natural flowers, front and side arrangements, bows): €300 - €600",
            "Luxury Decoration (premium flowers, multiple arrangements, detailed design, seasonal fresh or imported flowers, professional setup): €600 - €1,200+"
          ]
        },
        {
          title: "Service Features",
          items: [
            "Maximum 2 trips per hour depending on traffic and distance in Lisbon",
            "Maximum 6 trips per reservation for flexibility",
            "Minimum 3-hour booking to cover driver, preparation, and fuel",
            "12-hour maximum daily rate for full wedding day coverage",
            "Flexible scheduling for guests arriving/leaving at different times",
            "Professional coordination for multiple vehicle operations"
          ]
        }
      ]}
      pricing={[
        {
          name: "Rolls-Royce Silver Cloud II (3h min)",
          price: "€900"
        },
        {
          name: "Rolls-Royce Silver Shadow (3h min)",
          price: "€810"
        },
        {
          name: "Oldsmobile Super 88 (3h min)",
          price: "€1,050"
        },
        {
          name: "Mercedes 280SL Pagoda (3h min)",
          price: "€750"
        },
        {
          name: "Bentley Mulsanne (per trip)",
          price: "€150"
        },
        {
          name: "Mercedes Maybach (per trip)",
          price: "€140"
        }
      ]}
      ctaText="Book Your Wedding Transport"
      bookingLink="/booking/wedding"
    />
  )
}
