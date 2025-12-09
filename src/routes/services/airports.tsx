import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetail } from "../../components/ServiceDetail";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";

export const Route = createFileRoute("/services/airports")({
  component: RouteComponent,
});

function RouteComponent() {
  const airportImages = [
    {
      src: "/air-3.png",
      alt: "Luxury airport meet & greet service",
    },
    {
      src: "/air-1.png",
      alt: "Luxury airport meet & greet service",
    },
    {
      src: "/air-2.png",
      alt: "Seamless airport transportation",
    },
  ];

  const airportCarouselRef = useRef<HTMLDivElement | null>(null);

  const scrollAirportImages = (direction: "prev" | "next") => {
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
      title="Airport Transfers"
      subtitle="Transfers from Tires (Cascais Airport) - Fixed price for 25 km"
      description="Experience premium airport transfers with our luxury fleet. Our modern vehicles offer comfort, reliability, and onboard amenities for high-profile clients, while our classic cars provide a unique and memorable experience. All transfers include priority meet & greet service, flight tracking, luggage assistance, and multi-language support."
      heroImage="/air-4.png"
      mainServiceImage="/bentley-17.png"
      imageOnLeft={false}
      features={[
        {
          title: "Modern and Classic Fleet Services",
          items: [
            "Optional extra vehicle for luggage",
            "Priority meet & greet service",
            "Flight tracking & monitoring",
            "Private terminal access",
            "Luggage assistance",
            "Real-time arrival updates",
            "Multi-language support",
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
      ctaText="Book Airport Transfer"
      bookingLink="/booking/airport"
      preDetailsSection={
        <>
          {/* Section separator between hero title and Airport Transfers section */}
          <div className="bg-gradient-to-b from-luxury-black via-luxury-black/95 to-luxury-black">
            <div className="relative max-w-5xl mx-auto pt-8 pb-4 px-4">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-luxury-gold/70 to-transparent" />
            </div>
          </div>

          <section className="py-24 px-4 bg-gradient-to-br from-luxury-black via-[#0b0b0b] to-luxury-black relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,rgba(184,134,11,0.25),transparent_55%)]"></div>
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,transparent_40%,rgba(255,255,255,0.05)_80%)]"></div>

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl luxury-display text-white mb-6 tracking-[0.2em] uppercase">
                  Premium Airport Transfers
                </h2>
                <div className="gold-separator mx-auto mb-8 w-48"></div>
                <p className="text-lg md:text-xl font-playfair text-white/80 max-w-3xl mx-auto leading-relaxed">
                  Luxury airport transfers with priority service, flight
                  monitoring, and seamless transportation from Tires Airport to
                  your destination.
                </p>
              </div>

              <div className="relative max-w-5xl mx-auto">
                <div
                  ref={airportCarouselRef}
                  className="flex gap-6 lg:gap-8 overflow-x-auto no-scrollbar horizontal-scroll py-2"
                >
                  {airportImages.map((image) => (
                    <div
                      key={image.src}
                      className="group relative overflow-hidden rounded-3xl border border-luxury-gold/30 bg-gradient-to-br from-white/5 via-white/0 to-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.75)] min-w-[80%] sm:min-w-[60%] md:min-w-[40%] lg:min-w-[32%] h-72 md:h-[420px]"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = "legacy.png";
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-8 mt-8">
                  <button
                    type="button"
                    onClick={() => scrollAirportImages("prev")}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/15 transition-colors duration-300"
                    aria-label="View previous airport image"
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
                    onClick={() => scrollAirportImages("next")}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/15 transition-colors duration-300"
                    aria-label="View next airport image"
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
