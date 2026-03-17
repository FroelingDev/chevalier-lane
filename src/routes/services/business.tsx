import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  MapPinned,
  ScanSearch,
} from "lucide-react";
import { ServiceDetail } from "../../components/ServiceDetail";
import { useLanguage } from "@/components/LanguageProvider";
import ServiceHighlightsRow from "@/components/ServiceHighlightsRow";

export const Route = createFileRoute("/services/business")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useLanguage();
  const businessImages = [
    {
      src: "/corp-7.png",
      alt: t("Professional transportation"),
      title: t("Reserved Availability"),
      description: t(
        "An hourly service offering flexibility, discretion, and uninterrupted availability.",
      ),
    },
    {
      src: "/corp-3.png",
      alt: t("Professional transportation"),
      title: t("Arrive with Confidence"),
      description: t(
        "Discreet, elegant arrivals for meetings, shopping, or personal itineraries.",
      ),
    },
    {
      src: "/corp-4.png",
      alt: t("Professional transportation"),
      title: t("Your Time, Perfectly Managed"),
      description: t(
        "Punctual, flexible transportation designed entirely around your pace.",
      ),
    },
    // {
    //   src: "/corp-6.png",
    //   alt: "Corporate transportation",
    // },
    // {
    //   src: "/one-4.png",
    //   alt: "Private chauffeur experience in Lisbon",
    // },
    // {
    //   src: "/one-5.png",
    //   alt: "Private chauffeur experience in Lisbon",
    // },
  ];

  const businessCarouselRef = useRef<HTMLDivElement | null>(null);
  const businessHighlights = [
    { icon: Clock3, title: t("Hourly Bookings") },
    { icon: CalendarDays, title: t("Full Day Service") },
    { icon: BriefcaseBusiness, title: t("Executive Transfers") },
    { icon: MapPinned, title: t("Multiple Stops") },
    { icon: ScanSearch, title: t("Discreet Service") },
  ];

  const scrollBusinessExperiences = (direction: "prev" | "next") => {
    const container = businessCarouselRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.7;
    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <ServiceDetail
      title={t("By the Hour | Full Day")}
      subtitle={t("A dedicated chauffeur service available by the hour.")}
      description={t(
        "Elevate your hourly service with sophisticated, reliable transportation solutions. Our professional transportation service is designed for clients, business travelers, and companies seeking to impress clients and partners. We provide seamless coordination for appointments, conferences, and VIP client visits with uncompromising professionalism and confidentiality.",
      )}
      heroImage="/by-hour.png"
      mainServiceImage="/corp.png"
      features={[
        {
          title: t("Business Features"),
          items: [
            t("Executive Vehicle Fleet"),
            t("Appointment Coordination"),
            t("Confidentiality Assured"),
            t("Professional Presentation"),
            t("Professional Account Management"),
            t("Invoice & Expense Tracking"),
          ],
        },
        {
          title: t("Professional Packages"),
          items: [
            t("Starting price (min. 2h)"),
            t("Monthly Professional Plan"),
          ],
        },
      ]}
      ctaText={t("Find Out Prices")}
      bookingLink="/booking/corporate"
      whyChooseUsContent={
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-luxury-gold/20 rounded-full flex items-center justify-center mt-1">
              <span className="text-luxury-gold text-sm">★</span>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">
                {t("Flexibility for Hourly Service")}
              </h4>
              <p className="text-sm text-white/80">
                {t(
                  "Book on demand or in advance for complete control of your schedule.",
                )}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-luxury-gold/20 rounded-full flex items-center justify-center mt-1">
              <span className="text-luxury-gold text-sm">★</span>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">
                {t("Work Comfortably Onboard")}
              </h4>
              <p className="text-sm text-white/80">
                {t(
                  "Enjoy foldable tables, laptop space, and a quiet cabin ideal for productivity.",
                )}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-luxury-gold/20 rounded-full flex items-center justify-center mt-1">
              <span className="text-luxury-gold text-sm">★</span>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">
                {t("Charging & Connectivity")}
              </h4>
              <p className="text-sm text-white/80">
                {t(
                  "Multiple charging ports available for phones, laptops, and devices.",
                )}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-luxury-gold/20 rounded-full flex items-center justify-center mt-1">
              <span className="text-luxury-gold text-sm">★</span>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">
                {t("In-Car Entertainment")}
              </h4>
              <p className="text-sm text-white/80">
                {t(
                  "Screens and multimedia systems available for presentations or relaxation.",
                )}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-luxury-gold/20 rounded-full flex items-center justify-center mt-1">
              <span className="text-luxury-gold text-sm">★</span>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">
                {t("Discreet & Reliable Service")}
              </h4>
              <p className="text-sm text-white/80">
                {t(
                  "Designed for clients who value privacy, punctuality, and comfort.",
                )}
              </p>
            </div>
          </div>
        </div>
      }
      preDetailsSection={
        <>
          {/* Section separator between hero title and Point A to Point B section */}
          <div className="bg-gradient-to-b from-luxury-black via-luxury-black/95 to-luxury-black">
            <div className="relative max-w-5xl mx-auto pt-8 pb-4 px-4">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-luxury-gold/70 to-transparent" />
            </div>
          </div>

          <section className="py-12 px-4 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-luxury-black mb-6 tracking-wider leading-tight text-center uppercase drop-shadow-sm">
                  {t("Discreet Chauffeur Service")}
                </h2>
                <div className="gold-separator mx-auto mb-6 w-32"></div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 mx-auto max-w-2xl text-luxury-black/85">
                  {t(
                    "Professional, discreet, and flexible chauffeur service by the hour.",
                  )}
                </p>
              </div>

              <div className="relative">
                <div
                  ref={businessCarouselRef}
                  className="flex items-start gap-6 lg:gap-8 overflow-x-auto no-scrollbar horizontal-scroll py-2"
                >
                  {businessImages.map((image) => (
                    <div
                      key={image.src}
                      className="group relative flex h-96 min-w-[80%] flex-col overflow-hidden rounded-3xl border border-luxury-gold/30 bg-white shadow-none sm:min-w-[60%] md:h-[440px] md:min-w-[40%] lg:min-w-[32%]"
                    >
                      <div className="relative flex-1 min-h-0 w-full">
                        {image.title ? (
                          <div className="absolute left-4 top-4 z-10 rounded-full bg-black/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-sm backdrop-blur-sm">
                            {image.title}
                          </div>
                        ) : null}
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      {image.description ? (
                        <>
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-luxury-gold/70 to-transparent" />
                          <div className="flex h-24 items-center bg-luxury-black px-5 py-4 text-sm leading-relaxed text-white/90 line-clamp-3 md:h-28">
                            {image.description}
                          </div>
                        </>
                      ) : null}
                    </div>
                  ))}
                </div>

                <ServiceHighlightsRow items={businessHighlights} />

                <div className="flex items-center justify-center gap-8 mt-8">
                  <button
                    type="button"
                    onClick={() => scrollBusinessExperiences("prev")}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/15 transition-colors duration-300"
                    aria-label={t("View previous experience")}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="h-1 w-10 rounded-full bg-white/60" />
                    <span className="h-1 w-10 rounded-full bg-white/30" />
                    <span className="h-1 w-10 rounded-full bg-white/20" />
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollBusinessExperiences("next")}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/15 transition-colors duration-300"
                    aria-label={t("View next experience")}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      }
    />
  );
}
