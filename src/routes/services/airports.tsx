import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetail } from "../../components/ServiceDetail";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services/airports")({
  component: RouteComponent,
});

function RouteComponent() {
  const airportImages = [
    // {
    //   src: "/air-6.png",
    //   alt: "Luxury airport meet & greet service",
    // },
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
      title="Airport Transfers"
      subtitle="Transfers from Cascais Airport and Lisbon Airport"
      description="Experience premium airport transfers with our luxury fleet. Our modern vehicles offer comfort, reliability, and onboard amenities for high-profile clients, while our classic cars provide a unique and memorable experience. All transfers include priority meet & greet service, flight tracking, luggage assistance, and multi-language support."
      heroImage="/air-5.png"
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
      whyChooseUsContent={
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-luxury-gold/20 rounded-full flex items-center justify-center mt-1">
              <span className="text-luxury-gold text-sm">★</span>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">
                Flight Monitoring
              </h4>
              <p className="text-sm text-white/80">
                Your chauffeur tracks your flight in real time to ensure perfect
                timing — even if you arrive early or late.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-luxury-gold/20 rounded-full flex items-center justify-center mt-1">
              <span className="text-luxury-gold text-sm">★</span>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">
                Waiting & Parking Included
              </h4>
              <p className="text-sm text-white/80">
                Enjoy 30 minutes of complimentary waiting time for airport
                arrivals.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-luxury-gold/20 rounded-full flex items-center justify-center mt-1">
              <span className="text-luxury-gold text-sm">★</span>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">
                Meet & Greet Service
              </h4>
              <p className="text-sm text-white/80">
                Your chauffeur will welcome you inside the terminal with a
                personalised name sign.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-luxury-gold/20 rounded-full flex items-center justify-center mt-1">
              <span className="text-luxury-gold text-sm">★</span>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">
                Professional Chauffeur
              </h4>
              <p className="text-sm text-white/80">
                Experienced, punctual and discreet drivers offering a calm,
                seamless airport transfer.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-luxury-gold/20 rounded-full flex items-center justify-center mt-1">
              <span className="text-luxury-gold text-sm">★</span>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">
                Luggage Assistance
              </h4>
              <p className="text-sm text-white/80">
                Your chauffeur will assist with all bags and ensure a
                comfortable transition from air to ground.
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
                  Premium Airport Transfers
                </h2>
                <div className="gold-separator mx-auto mb-6 w-32"></div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 mx-auto max-w-2xl text-luxury-black/85">
                  Luxury airport transfers with priority service, flight
                  monitoring, and seamless transportation from Tires Airport to
                  your destination.
                </p>
              </div>

              <div className="relative">
                <div
                  ref={airportCarouselRef}
                  className="flex gap-6 lg:gap-8 overflow-x-auto no-scrollbar horizontal-scroll py-2"
                >
                  {airportImages.map((image) => (
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
                    onClick={() => scrollAirportExperiences("prev")}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/15 transition-colors duration-300"
                    aria-label="View previous experience"
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
                    aria-label="View next experience"
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
