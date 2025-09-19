import { createFileRoute } from '@tanstack/react-router'
import { ServiceDetail } from '../../components/ServiceDetail'

export const Route = createFileRoute('/services/business')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ServiceDetail
      title="Corporate Transportation"
      subtitle="Professional excellence for business travel and client relations"
      description="Elevate your business travel with sophisticated, reliable transportation solutions. Our corporate transportation service is designed for executives, business travelers, and companies seeking to impress clients and partners. We provide seamless coordination for meetings, conferences, and VIP client visits with uncompromising professionalism and confidentiality."
      heroImage="/corporate-transportation.png"
      mainImage="/corporate-transportation.png"
      mainImageAlt="Corporate Transportation"
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
            "Invoice & Expense Tracking"
          ]
        },
        {
          title: "Corporate Packages",
          items: [
            "Executive Daily Rate",
            "VIP Client Transfer",
            "Monthly Corporate Plan"
          ]
        }
      ]}
      pricing={[
        { name: "Executive Daily Rate", price: "€220" },
        { name: "VIP Client Transfer", price: "€280" },
        { name: "Monthly Corporate Plan", price: "Contact Us" }
      ]}
      ctaText="Corporate Inquiry"
      bookingLink="/booking/corporate"
    />
  )
}
