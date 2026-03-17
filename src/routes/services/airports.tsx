import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Languages,
  Luggage,
  Plane,
  UserRoundCheck,
} from "lucide-react";
import { ServiceDetail } from "../../components/ServiceDetail";
import { useLanguage } from "@/components/LanguageProvider";
import ServiceHighlightsRow from "@/components/ServiceHighlightsRow";

export const Route = createFileRoute("/services/airports")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useLanguage();
  const airportImages = [
    // {
    //   src: "/air-6.png",
    //   alt: "Luxury airport meet & greet service",
    // },
    {
      src: "/air-3.png",
      alt: t("Luxury airport meet & greet service"),
      title: t("Arrive in first class"),
      description: t(
        "Chauffeured arrivals with privacy, comfort, and refined detail. Upon request, a curated selection of wine, champagne, and bespoke refreshments.",
      ),
    },
    {
      src: "/air-7.png",
      alt: t("Seamless airport transportation"),
      title: t("Executive time, reserved"),
      description: t(
        "Hourly availability for business meetings, itineraries, and executive schedules.",
      ),
    },
    {
      src: "/air-1.png",
      alt: t("Luxury airport meet & greet service"),
      title: t("Private aviation, perfected"),
      description: t("Discreet coordination from runway to destination."),
    },
  ];

  const airportCarouselRef = useRef<HTMLDivElement | null>(null);
  const airportHighlights = [
    { icon: Plane, title: t("Flight Monitoring") },
    { icon: UserRoundCheck, title: t("Priority Meet & Greet") },
    { icon: Luggage, title: t("Luggage Assistance") },
    { icon: Clock3, title: t("24/7 Availability") },
    { icon: Languages, title: t("Multilingual Support") },
  ];

  const scrollAirportExperiences = (direction: "prev" | "next") => {
    const container = airportCarouselRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.7;
    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <ServiceDetail
      title={t("Airport Transfers")}
      subtitle={t("Transfers from Cascais Airport and Lisbon Airport")}
      description={t(
        "Experience premium airport transfers with our luxury fleet. Our modern vehicles offer comfort, reliability, and onboard amenities for high-profile clients, while our classic cars provide a unique and memorable experience. All transfers include priority meet & greet service, flight tracking, luggage assistance, and multi-language support.",
      )}
      heroImage="/air-trans.png"
      mainServiceImage="/bentley-17.png"
      imageOnLeft={false}
      features={[
        {
          title: t("Modern and Classic Fleet Services"),
          items: [
            t("Optional extra vehicle for luggage"),
            t("Priority meet & greet service"),
            t("Flight tracking & monitoring"),
            t("Private terminal access"),
            t("Luggage assistance"),
            t("Real-time arrival updates"),
            t("Multi-language support"),
          ],
        },
        // {
        //   title: "Classic Fleet Services",
        //   items: [
        //     "Pickup of classic cars at the airport - unique experience",
        //     "Extra vehicle included",
        //     "Premium presentation and maintenance",
        //     "High value and rarity guarantee",
        //   ],
        // },
      ]}
      ctaText={t("Book Airport Transfer")}
      bookingLink="/booking/airport"
      whyChooseUsContent={
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-luxury-gold/20 rounded-full flex items-center justify-center mt-1">
              <span className="text-luxury-gold text-sm">★</span>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">
                {t("Flight Monitoring")}
              </h4>
              <p className="text-sm text-white/80">
                {t(
                  "Your chauffeur tracks your flight in real time to ensure perfect timing — even if you arrive early or late.",
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
                {t("Waiting & Parking Included")}
              </h4>
              <p className="text-sm text-white/80">
                {t(
                  "Enjoy 30 minutes of complimentary waiting time for airport arrivals.",
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
                {t("Meet & Greet Service")}
              </h4>
              <p className="text-sm text-white/80">
                {t(
                  "Your chauffeur will welcome you inside the terminal with a personalised name sign.",
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
                {t("Professional Chauffeur")}
              </h4>
              <p className="text-sm text-white/80">
                {t(
                  "Experienced, punctual and discreet drivers offering a calm, seamless airport transfer.",
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
                {t("Luggage Assistance")}
              </h4>
              <p className="text-sm text-white/80">
                {t(
                  "Your chauffeur will assist with all bags and ensure a comfortable transition from air to ground.",
                )}
              </p>
            </div>
          </div>
        </div>
      }
      preDetailsSection={
        <>
          {/* Section separator between hero title and Airport Transfers section */}
          <div className="bg-gradient-to-b from-luxury-black via-luxury-black/95 to-luxury-black">
            <div className="relative max-w-5xl mx-auto pt-8 pb-4 px-4">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-luxury-gold/70 to-transparent" />
            </div>
          </div>

          <section className="py-12 px-4 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-luxury-black mb-6 tracking-wider leading-tight text-center uppercase drop-shadow-sm">
                  {t("Premium Airport Transfers")}
                </h2>
                <div className="gold-separator mx-auto mb-6 w-32"></div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 mx-auto max-w-2xl text-luxury-black/85">
                  {t(
                    "Luxury airport transfers with priority service, flight monitoring, and seamless transportation from Tires Airport to your destination.",
                  )}
                </p>
              </div>

              <div className="relative">
                <div
                  ref={airportCarouselRef}
                  className="flex items-start gap-6 lg:gap-8 overflow-x-auto no-scrollbar horizontal-scroll py-2"
                >
                  {airportImages.map((image) => (
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

                <ServiceHighlightsRow items={airportHighlights} />

                <div className="flex items-center justify-center gap-8 mt-8">
                  <button
                    type="button"
                    onClick={() => scrollAirportExperiences("prev")}
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
                    onClick={() => scrollAirportExperiences("next")}
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
