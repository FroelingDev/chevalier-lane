import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetail } from "../../components/ServiceDetail";

export const Route = createFileRoute("/services/business")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ServiceDetail
      title="Corporate Transportation"
      subtitle="Professional excellence for business travel and client relations"
      description="Elevate your business travel with sophisticated, reliable transportation solutions. Our corporate transportation service is designed for executives, business travelers, and companies seeking to impress clients and partners. We provide seamless coordination for meetings, conferences, and VIP client visits with uncompromising professionalism and confidentiality."
      heroImage="/corporate-transportation.png"
      mainImage="/bentley-4.png"
      mainImageAlt="Executive chauffeur service featuring Bentley Mulsanne"
      imageOnLeft={true}
      features={[
        {
          title: "Business Features",
          items: [
            "Executive Vehicle Fleet",
            "Meeting Coordination",
            "Confidentiality Assured",
            "Professional Presentation",
            "Corporate Account Management",
            "Invoice & Expense Tracking",
          ],
        },
        {
          title: "Corporate Packages",
          items: ["Starting price (min. 2h)", "Monthly Corporate Plan"],
        },
      ]}
      ctaText="Book Your Corporate Transfer"
      bookingLink="/booking/corporate"
    />
  );
}
