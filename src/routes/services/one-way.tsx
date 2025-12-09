import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetail } from "../../components/ServiceDetail";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";

export const Route = createFileRoute("/services/one-way")({
  component: RouteComponent,
});

function RouteComponent() {
  const pointImages = [
    {
      src: "/one-1.png",
      alt: "Chauffeur airport pick-up",
    },
    {
      src: "/one-3.png",
      alt: "Evening point-to-point journey",
    },
    {
      src: "/one-2.png",
      alt: "Bentley Mulsanne city transfer",
    },
  ];

  const pointCarouselRef = useRef<HTMLDivElement | null>(null);

  const scrollPointImages = (direction: "prev" | "next") => {
    const container = pointCarouselRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.7;
    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <ServiceDetail
      title="One-Way Transportation"
      subtitle="Flexible point-to-point luxury transportation solutions"
      description="Experience seamless one-way transportation with our premium chauffeur service. Whether you need transportation from the airport to your hotel, between cities, or any other point-to-point journey, we provide comfortable, reliable, and sophisticated transport solutions tailored to your schedule and preferences."
      heroImage="/one-hero.png"
      mainServiceImage="/one-4.png"
      imageOnLeft={false}
      features={[
        {
          title: "Vehicle Options",
          items: [
            "Modern Luxury: Bentley Mulsanne, Mercedes S-Class, Mercedes Maybach",
            "Classic Collection: Rolls-Royce Silver Shadow, Rolls-Royce Silver Cloud II, Oldsmobile Super 88",
            "Professional Chauffeur Service",
            "Real-time GPS Tracking",
            "Flexible Scheduling",
          ],
        },
        {
          title: "Pricing Structure",
          items: [
            "Modern Vehicles: Base rate up to 25km",
            "Classic Vehicles: Base rate up to 20km + subject to request",
            "Dynamic pricing based on distance and vehicle selection",
            "Real-time route calculation and price estimation",
          ],
        },
      ]}
      ctaText="Book One-Way Transfer"
      bookingLink="/booking/one-way"
      preDetailsSection={
        <>
          {/* Section separator between hero title and Point A to Point B section */}
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
                  From Point A to Point B
                </h2>
                <div className="gold-separator mx-auto mb-8 w-48"></div>
                <p className="text-lg md:text-xl font-playfair text-white/80 max-w-3xl mx-auto leading-relaxed">
                  Elegant, seamless one-way journeys between airports, hotels,
                  villas, and city centers — tailored around your schedule.
                </p>
              </div>

              <div className="relative max-w-5xl mx-auto">
                <div
                  ref={pointCarouselRef}
                  className="flex gap-6 lg:gap-8 overflow-x-auto no-scrollbar horizontal-scroll py-2"
                >
                  {pointImages.map((image) => (
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
                    onClick={() => scrollPointImages("prev")}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/15 transition-colors duration-300"
                    aria-label="View previous journey image"
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
                    onClick={() => scrollPointImages("next")}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/15 transition-colors duration-300"
                    aria-label="View next journey image"
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
