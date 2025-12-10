import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetail } from "../../components/ServiceDetail";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/services/airports")({
  component: RouteComponent,
});

function RouteComponent() {
  const [currentSlide, setCurrentSlide] = useState(2); // start on first real slide (index 2 with 2 clones)
  const [isTransitioning, setIsTransitioning] = useState(false);

  const airportImages = [
    {
      src: "/air-6.png",
      alt: "Luxury airport meet & greet service",
    },
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

  const visibleSlides = 3;
  const slideWidth = 100 / visibleSlides;

  const extendedImages = useMemo(() => {
    if (airportImages.length === 0) return [];
    return [
      airportImages[airportImages.length - 2],
      airportImages[airportImages.length - 1],
      ...airportImages,
      airportImages[0],
      airportImages[1],
    ];
  }, [airportImages]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentSlide <= 1) {
      setCurrentSlide(airportImages.length + currentSlide);
    } else if (currentSlide >= extendedImages.length - 2) {
      setCurrentSlide(currentSlide - airportImages.length);
    }
  };

  return (
    <ServiceDetail
      title="Airport Transfers"
      subtitle="Transfers from Tires (Cascais Airport) - Fixed price for 25 km"
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

              <div className="relative w-full max-w-[90rem] mx-auto">
                <div className="relative overflow-hidden">
                  <div
                    className="content-carousel full-screen-width slides-5 h-full"
                    data-slider_id="1"
                  >
                    <div className="aspect-[4/3] w-full md:aspect-[4/1] px-4">
                      <div
                        className="flex h-full items-center"
                        style={{
                          transform: `translateX(-${
                            (currentSlide - 1) * slideWidth
                          }%)`,
                          transition: isTransitioning
                            ? "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)"
                            : "none",
                        }}
                        onTransitionEnd={handleTransitionEnd}
                      >
                        {extendedImages.map((image, index) => (
                          <div
                            key={`${image.src}-${index}`}
                            className="flex-shrink-0 px-2 h-full transition-all duration-500 ease-out"
                            style={{ flexBasis: `${slideWidth}%` }}
                            onClick={() => {
                              if (index !== currentSlide) {
                                setIsTransitioning(true);
                                setCurrentSlide(index);
                              }
                            }}
                          >
                            <div
                              className={`relative h-full w-full overflow-hidden rounded-xl shadow-lg transition-all duration-500 ${
                                index === currentSlide
                                  ? "scale-110 z-20 shadow-2xl ring-1 ring-black/5"
                                  : "scale-90 z-10 opacity-60 grayscale-[30%]"
                              }`}
                            >
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="h-full w-full object-cover"
                                decoding="async"
                                onError={(e) => {
                                  e.currentTarget.src = "legacy.png";
                                }}
                              />
                              {/* Overlay for non-active slides */}
                              <div
                                className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${
                                  index === currentSlide
                                    ? "opacity-0"
                                    : "opacity-100"
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white to-transparent z-10" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white to-transparent z-10" />
                  <div className="absolute inset-y-0 left-4 flex items-center z-20">
                    <button
                      onClick={prevSlide}
                      className="bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-colors duration-300 backdrop-blur"
                      aria-label="Previous slide"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute inset-y-0 right-4 flex items-center">
                    <button
                      onClick={nextSlide}
                      className="bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-colors duration-300 backdrop-blur"
                      aria-label="Next slide"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center mt-4 space-x-2">
                  {airportImages.map((_, index) => {
                    const normalizedIndex =
                      (((currentSlide - 1) % airportImages.length) +
                        airportImages.length) %
                      airportImages.length;
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setIsTransitioning(true);
                          setCurrentSlide(index + 1);
                        }}
                        className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                          index === normalizedIndex
                            ? "bg-luxury-gold"
                            : "bg-luxury-black/20"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </>
      }
    />
  );
}
