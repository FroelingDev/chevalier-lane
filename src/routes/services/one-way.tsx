import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetail } from "../../components/ServiceDetail";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

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
      src: "/one-2.png",
      alt: "Bentley Mulsanne city transfer",
    },
    {
      src: "/one-3.png",
      alt: "Evening point-to-point journey",
    },
    {
      src: "/one-4.png",
      alt: "Private chauffeur experience in Lisbon",
    },
    {
      src: "/one-5.png",
      alt: "Private chauffeur experience in Lisbon",
    },
  ];

  const [currentPointImageIndex, setCurrentPointImageIndex] = useState(0);

  const goToPreviousPointImage = () => {
    setCurrentPointImageIndex((prev) =>
      prev === 0 ? pointImages.length - 1 : prev - 1
    );
  };

  const goToNextPointImage = () => {
    setCurrentPointImageIndex((prev) =>
      prev === pointImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <ServiceDetail
      title="One-Way Transportation"
      subtitle="Flexible point-to-point luxury transportation solutions"
      description="Experience seamless one-way transportation with our premium chauffeur service. Whether you need transportation from the airport to your hotel, between cities, or any other point-to-point journey, we provide comfortable, reliable, and sophisticated transport solutions tailored to your schedule and preferences."
      heroImage="/one-hero.png"
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

              <div className="relative max-w-4xl mx-auto">
                <button
                  type="button"
                  onClick={goToPreviousPointImage}
                  className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 border border-white/20 text-white p-3 rounded-full backdrop-blur transition-colors duration-300"
                  aria-label="View previous journey image"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goToNextPointImage}
                  className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 border border-white/20 text-white p-3 rounded-full backdrop-blur transition-colors duration-300"
                  aria-label="View next journey image"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>

                <div className="overflow-hidden rounded-3xl border border-luxury-gold/30 bg-gradient-to-br from-white/5 via-white/0 to-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.75)]">
                  <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                      transform: `translateX(-${currentPointImageIndex * 100}%)`,
                    }}
                  >
                    {pointImages.map((image) => (
                      <div
                        key={image.src}
                        className="min-w-full h-64 md:h-80 group relative overflow-hidden"
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
                </div>

                <div className="flex items-center justify-center gap-3 mt-6">
                  {pointImages.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => setCurrentPointImageIndex(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentPointImageIndex === index
                          ? "w-10 bg-luxury-gold"
                          : "w-5 bg-white/40"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      }
    />
  );
}
