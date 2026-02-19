import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ServiceDetail } from "../../components/ServiceDetail";
import { useLanguage } from "@/components/LanguageProvider";

export const Route = createFileRoute("/services/one-way")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useLanguage();
  const pointImages = [
    {
      src: "/one-7.png",
      alt: t("One-Way Transportation"),
      title: t("First class on the road"),
      description: t(
        "Unrivalled comfort, privacy, and refinement — without compromise.",
      ),
    },
    {
      src: "/one-2.png",
      alt: t("Bentley Mulsanne city transfer"),
      title: t("Arrive with Elegance"),
      description: t(
        "Because how you arrive matters as much as where you’re going.",
      ),
    },
    // {
    //   src: "/one-1.png",
    //   alt: "Chauffeur airport pick-up",
    // },
    // {
    //   src: "/one-3.png",
    //   alt: "Evening point-to-point journey",
    // },
    {
      src: "/one-10.png",
      alt: t("One-Way Transportation"),
      title: t("For Romantic Dates"),
      description: t(
        "Discreet, elegant one-way journeys designed for couples and intimate moments.",
      ),
    },
  ];

  const oneWayCarouselRef = useRef<HTMLDivElement | null>(null);

  const scrollOneWayExperiences = (direction: "prev" | "next") => {
    const container = oneWayCarouselRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.7;
    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <ServiceDetail
      title={t("ONE-WAY TRANSPORTATION")}
      subtitle={t("Flexible point-to-point luxury transportation solutions")}
      description={t(
        "Experience seamless one-way transportation with our premium chauffeur service. Whether you need transportation from the airport to your hotel, between cities, or any other point-to-point journey, we provide comfortable, reliable, and sophisticated transport solutions tailored to your schedule and preferences.",
      )}
      heroImage="/one-12.png"
      mainServiceImage="/one-11.png"
      imageOnLeft={false}
      features={[
        {
          title: t("Vehicle Options"),
          items: [
            t(
              "Modern Luxury: Bentley Mulsanne, Mercedes S-Class Brabus, Mercedes Maybach, Bentley Flying Spur",
            ),
            t(
              "Classic Collection: Rolls-Royce Silver Shadow, Rolls-Royce Silver Cloud II",
            ),
            t("Professional Chauffeur Service"),
            t("Real-time GPS Tracking"),
            t("Flexible Scheduling"),
          ],
        },
      ]}
      ctaText={t("Book One-Way Transfer")}
      bookingLink="/booking/one-way"
      whyChooseUsContent={
        <div className="space-y-4">
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
                  "Your personal driver delivers a smooth, discreet and attentive experience from start to finish.",
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
                {t("Complimentary Water")}
              </h4>
              <p className="text-sm text-white/80">
                {t("Premium bottled water included in every journey.")}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-luxury-gold/20 rounded-full flex items-center justify-center mt-1">
              <span className="text-luxury-gold text-sm">★</span>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">
                {t("All-Inclusive Pricing")}
              </h4>
              <p className="text-sm text-white/80">
                {t(
                  "No hidden extras — congestion charges, tolls, and taxes included.",
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
                {t("Champagne & Drinks on Request")}
              </h4>
              <p className="text-sm text-white/80">
                {t(
                  "Enhance your journey with chilled champagne, wine, or other beverages upon request.",
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
                {t("Comfort & Convenience")}
              </h4>
              <p className="text-sm text-white/80">
                {t(
                  "Beautifully maintained vehicles offering a refined and relaxing environment.",
                )}
              </p>
            </div>
          </div>
        </div>
      }
      preDetailsSection={
        <>
          {/* Section separator between hero title and Point A to Point B section */}
          <section className="py-12 px-4 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-luxury-black mb-6 tracking-wider leading-tight text-center uppercase drop-shadow-sm">
                  {t("From Point A to Point B")}
                </h2>
                <div className="gold-separator mx-auto mb-6 w-32"></div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 mx-auto max-w-2xl text-luxury-black/85">
                  {t(
                    "Elegant, seamless one-way journeys between airports, hotels, villas, and city centers — tailored around your schedule.",
                  )}
                </p>
              </div>

              <div className="relative">
                <div
                  ref={oneWayCarouselRef}
                  className="flex items-start gap-6 lg:gap-8 overflow-x-auto no-scrollbar horizontal-scroll py-2"
                >
                  {pointImages.map((image) => (
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

                <div className="flex items-center justify-center gap-8 mt-8">
                  <button
                    type="button"
                    onClick={() => scrollOneWayExperiences("prev")}
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
                    onClick={() => scrollOneWayExperiences("next")}
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
