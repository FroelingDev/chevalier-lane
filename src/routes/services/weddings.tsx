import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ServiceDetail } from "../../components/ServiceDetail";
import { useLanguage } from "@/components/LanguageProvider";

export const Route = createFileRoute("/services/weddings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useLanguage();
  const pointImages = [
    {
      src: "/wed-2.png",
      alt: t("Rolls-Royce Silver Cloud II wedding transport"),
    },
    {
      src: "/weddings-rr.png",
      alt: t("Rolls-Royce Silver Shadow wedding ceremony"),
    },
    {
      src: "/oldsmobile-person.png",
      alt: t("Oldsmobile Super 88 wedding chauffeur"),
    },
    {
      src: "/wed-4.png",
      alt: t("Wedding transportation"),
    },
    {
      src: "/wed-6.png",
      alt: t("Wedding transportation"),
    },
    {
      src: "/wed-3.png",
      alt: t("Wedding transportation"),
    },
  ];

  const weddingCarouselRef = useRef<HTMLDivElement | null>(null);

  const scrollWeddingExperiences = (direction: "prev" | "next") => {
    const container = weddingCarouselRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.7;
    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <ServiceDetail
      title={t("Wedding Services")}
      subtitle={t("From Ceremony to Reception in Style and Elegance")}
      description={t(
        "Transform your special day into an unforgettable experience with our premium wedding transportation services. Our classic and modern luxury vehicles provide the perfect backdrop for your most cherished wedding moments. From ceremony arrivals to reception departures, we ensure every aspect of your wedding day transportation is handled with elegance and precision."
      )}
      heroImage="/wed-1.png"
      mainServiceImage="/wed-5.png"
      imageOnLeft={false}
      features={[
        {
          title: t("Extra Wedding Transport Vehicles"),
          items: [
            t("Decorations and designs available as extras"),
            t("Minimum 3 hours booking required"),
            t(
              "Basic Decoration (artificial or simple natural flowers + ribbons)"
            ),
            t(
              "Intermediate Decoration (medium quality natural flowers, front and side arrangements, bows)"
            ),
            t(
              "Luxury Decoration (premium flowers, multiple arrangements, detailed design, seasonal fresh or imported flowers, professional setup)"
            ),
          ],
        },
      ]}
      ctaText={t("Book Your Wedding Transport")}
      bookingLink="/booking/wedding"
      whyChooseUsContent={
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-luxury-gold/20 rounded-full flex items-center justify-center mt-1">
              <span className="text-luxury-gold text-sm">★</span>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">
                {t("Free Ribbons")}
              </h4>
              <p className="text-sm text-white/80">
                {t(
                  "Complimentary ribbons and colour options available to match your wedding theme."
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
                {t("Chauffeur Arrival 20 Minutes Early")}
              </h4>
              <p className="text-sm text-white/80">
                {t(
                  "Your driver arrives ahead of time to ensure a calm and seamless start."
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
                {t("Classic Cars for the Ceremony")}
              </h4>
              <p className="text-sm text-white/80">
                {t(
                  "Choose from our iconic vintage collection for the bride or groom's arrival."
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
                {t("Modern Luxury Cars for Guests")}
              </h4>
              <p className="text-sm text-white/80">
                {t(
                  "Elegant modern vehicles available for transporting family and guests."
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
                {t("Flexible Journey Planning")}
              </h4>
              <p className="text-sm text-white/80">
                {t(
                  "Pick up the bride, groom, or wedding party and travel to the ceremony, photoshoot, and reception."
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
                {t("Decor & Personalisation")}
              </h4>
              <p className="text-sm text-white/80">
                {t("Custom decoration options to make your day truly unique.")}
              </p>
            </div>
          </div>
        </div>
      }
      preDetailsSection={
        <>
          {/* Section separator between hero title and From Ceremony to Reception section */}
          <div className="bg-gradient-to-b from-luxury-black via-luxury-black/95 to-luxury-black">
            <div className="relative max-w-5xl mx-auto pt-8 pb-4 px-4">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-luxury-gold/70 to-transparent" />
            </div>
          </div>

          <section className="py-12 px-4 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-luxury-black mb-6 tracking-wider leading-tight text-center uppercase drop-shadow-sm">
                  {t("From Ceremony to Reception")}
                </h2>
                <div className="gold-separator mx-auto mb-6 w-32"></div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 mx-auto max-w-2xl text-luxury-black/85">
                  {t(
                    "Elegant, seamless wedding journeys from ceremony venues to reception halls, tailored around your special day timeline."
                  )}
                </p>
              </div>

              <div className="relative">
                <div
                  ref={weddingCarouselRef}
                  className="flex gap-6 lg:gap-8 overflow-x-auto no-scrollbar horizontal-scroll py-2"
                >
                  {pointImages.map((image) => (
                    <div
                      key={image.src}
                      className="group relative overflow-hidden rounded-3xl border border-luxury-gold/30 bg-white shadow-none min-w-[80%] sm:min-w-[60%] md:min-w-[40%] lg:min-w-[32%] h-72 md:h-[420px]"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-8 mt-8">
                  <button
                    type="button"
                    onClick={() => scrollWeddingExperiences("prev")}
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
                    onClick={() => scrollWeddingExperiences("next")}
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
