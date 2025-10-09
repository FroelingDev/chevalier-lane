import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetail } from "../../components/ServiceDetail";

export const Route = createFileRoute("/services/weddings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ServiceDetail
      title="Wedding Services"
      subtitle="Main Wedding Fleet: Stationary/Use by Couples - does not include decorations and designs as requested by the client"
      description="Transform your special day into an unforgettable experience with our premium wedding transportation services. Our classic and modern luxury vehicles provide the perfect backdrop for your most cherished wedding moments. From ceremony arrivals to reception departures, we ensure every aspect of your wedding day transportation is handled with elegance and precision."
      heroImage="/special-events.png"
      mainImage="/oldsmobile-person.png"
      mainImageAlt="Rolls-Royce wedding chauffeur service"
      imageOnLeft={false}
      features={[
        {
          title: "Main Wedding Fleet (Stationary/Couples)",
          items: [
            "Rolls-Royce Silver Cloud II 1961",
            "Rolls-Royce Silver Shadow 1973",
            "Oldsmobile Super 88 1961",
            "Mercedes 280SL Pagoda 1969",
            "Decorations and designs available as extras",
            "Perfect for photos, ceremonies, and special moments",
            "Professional chauffeur service included",
          ],
        },
        {
          title: "Additional Wedding Transport Vehicles",
          items: [
            "Bentley Mulsanne (4 seats)",
            "Mercedes Maybach (3 seats)",
            "6% VAT included - For guest transportation",
            "Minimum 3 hours booking required",
            "1 trip = 1 pickup + 1 drop-off",
          ],
        },
        {
          title: "Decoration Options (Extra)",
          items: [
            "Basic Decoration (artificial or simple natural flowers + ribbons)",
            "Intermediate Decoration (medium quality natural flowers, front and side arrangements, bows)",
            "Luxury Decoration (premium flowers, multiple arrangements, detailed design, seasonal fresh or imported flowers, professional setup)",
          ],
        },
        {
          title: "Service Features",
          items: [
            "Maximum 2 trips per hour depending on traffic and distance in Lisbon",
            "Maximum 6 trips per reservation for flexibility",
            "Minimum 3-hour booking to cover driver, preparation, and fuel",
            "12-hour maximum daily rate for full wedding day coverage",
            "Flexible scheduling for guests arriving/leaving at different times",
            "Professional coordination for multiple vehicle operations",
          ],
        },
      ]}
      // pricing={[
      //   {
      //     name: "Rolls-Royce Silver Cloud II (3h min)",
      //     price: "€900",
      //   },
      //   {
      //     name: "Rolls-Royce Silver Shadow (3h min)",
      //     price: "€810",
      //   },
      //   {
      //     name: "Oldsmobile Super 88 (3h min)",
      //     price: "€1,050",
      //   },
      //   {
      //     name: "Mercedes 280SL Pagoda (3h min)",
      //     price: "€750",
      //   },
      //   {
      //     name: "Bentley Mulsanne (per trip)",
      //     price: "€150",
      //   },
      //   {
      //     name: "Mercedes Maybach (per trip)",
      //     price: "€140",
      //   },
      // ]}
      ctaText="Book Your Wedding Transport"
      bookingLink="/booking/wedding"
    />
  );
}
