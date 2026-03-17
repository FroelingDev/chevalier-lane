import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetail } from "../../components/ServiceDetail";
import { useLanguage } from "@/components/LanguageProvider";

export const Route = createFileRoute("/services/exclusive")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useLanguage();
  return (
    <ServiceDetail
      title={t("Exclusive Experiences")}
      subtitle={t("Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation")}
      description={t(
        "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation. Our exclusive experiences combine the finest vehicles with extraordinary destinations, VIP access, and personalized concierge services. From private villa visits to exclusive cultural events, we create bespoke experiences that reflect your individual passions and desires."
      )}
      heroImage="/foton-pagoda.png"
      mainImage="/bentley-6.png"
      mainImageAlt={t("Exclusive experience inside luxury Bentley interior")}
      imageOnLeft={true}
      features={[
        {
          title: t("VIP Services"),
          items: [
            t("Private Villa Access"),
            t("VIP Event Transportation"),
            t("Exclusive Cultural Experiences"),
            t("Personal Concierge Service"),
            t("Bespoke Itinerary Creation"),
            t("Luxury Accommodation Coordination"),
          ],
        },
        {
          title: t("Exclusive Packages"),
          items: [t("VIP Cultural Experience"), t("Private Estate Tour"), t("Bespoke Experience")],
        },
      ]}
      ctaText={t("Create Exclusive Experience")}
    />
  );
}
