import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetail } from "../../components/ServiceDetail";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/services/one-way")({
  component: RouteComponent,
});

function RouteComponent() {
  const [currentSlide, setCurrentSlide] = useState(2); // start on first real slide (index 2 with 2 clones)
  const [isTransitioning, setIsTransitioning] = useState(false);

  const pointImages = [
    {
      src: "/one-7.png",
      alt: "One-way transportation",
    },
    {
      src: "/one-2.png",
      alt: "Bentley Mulsanne city transfer",
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
      src: "/one-8.png",
      alt: "One-way transportation",
    },
  ];

  const visibleSlides = 3;
  // We don't use fixed slideWidth anymore, we use specific widths for active/inactive slides
  // active = 50%, inactive = 25%. Total visible = 25% + 50% + 25% = 100%
  // The translate calculation needs to account for this.
  // Each "step" moves by one inactive slide width (25%)?
  // No, if we move from center (index 2) to next (index 3).
  // At index 2: [1(25%), 2(50%), 3(25%)] visible.
  // At index 3: [2(25%), 3(50%), 4(25%)] visible.
  // Shift needed:
  // Center of slide 2 was at 50% of container.
  // Center of slide 3 needs to be at 50% of container.
  // Before shift (at pos 2): Slide 3 starts at 75%. Center at 87.5%.
  // After shift (at pos 3): Slide 3 starts at 25%. Center at 50%.
  // Difference: 37.5%.
  // But widths change!
  // This logic with flex widths and transform is tricky because `translateX` moves the whole container.
  // If we rely on `flex-shrink-0` and fixed percentage widths, `translateX` needs to correspond to the width of one "unit".
  // Let's simplify: Use equal widths (33.33%) for layout but scale the content.
  // This is safer for the transform logic.
  const slideWidth = 100 / visibleSlides;

  const extendedImages = useMemo(() => {
    if (pointImages.length === 0) return [];
    return [
      pointImages[pointImages.length - 2],
      pointImages[pointImages.length - 1],
      ...pointImages,
      pointImages[0],
      pointImages[1],
    ];
  }, [pointImages]);

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
      setCurrentSlide(pointImages.length + currentSlide);
    } else if (currentSlide >= extendedImages.length - 2) {
      setCurrentSlide(currentSlide - pointImages.length);
    }
  };

  return (
    <ServiceDetail
      title="ONE-WAY TRANSPORTATION"
      subtitle="Flexible point-to-point luxury transportation solutions"
      description="Experience seamless one-way transportation with our premium chauffeur service. Whether you need transportation from the airport to your hotel, between cities, or any other point-to-point journey, we provide comfortable, reliable, and sophisticated transport solutions tailored to your schedule and preferences."
      heroImage="/one-6.png"
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
          <section className="py-12 px-4 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-luxury-black mb-6 tracking-wider leading-tight text-center uppercase drop-shadow-sm">
                  From Point A to Point B
                </h2>
                <div className="gold-separator mx-auto mb-6 w-32"></div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 mx-auto max-w-2xl text-luxury-black/85">
                  Elegant, seamless one-way journeys between airports, hotels,
                  villas, and city centers — tailored around your schedule.
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
                  {pointImages.map((_, index) => {
                    const normalizedIndex =
                      (((currentSlide - 1) % pointImages.length) +
                        pointImages.length) %
                      pointImages.length;
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
