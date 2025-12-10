import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetail } from "../../components/ServiceDetail";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/services/weddings")({
  component: RouteComponent,
});

function RouteComponent() {
  const [currentSlide, setCurrentSlide] = useState(2); // start on first real slide (index 2 with 2 clones)
  const [isTransitioning, setIsTransitioning] = useState(false);

  const pointImages = [
    {
      src: "/wed-2.png",
      alt: "Rolls-Royce Silver Cloud II wedding transport",
    },
    {
      src: "/weddings-rr.png",
      alt: "Rolls-Royce Silver Shadow wedding ceremony",
    },
    {
      src: "/oldsmobile-person.png",
      alt: "Oldsmobile Super 88 wedding chauffeur",
    },
    {
      src: "/wed-4.png",
      alt: "Wedding transportation",
    },
    {
      src: "/wed-6.png",
      alt: "Wedding transportation",
    },
    {
      src: "/wed-5.png",
      alt: "Wedding transportation",
    },
  ];

  const visibleSlides = 3;
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
      title="Wedding Services"
      subtitle="From Ceremony to Reception in Style and Elegance"
      description="Transform your special day into an unforgettable experience with our premium wedding transportation services. Our classic and modern luxury vehicles provide the perfect backdrop for your most cherished wedding moments. From ceremony arrivals to reception departures, we ensure every aspect of your wedding day transportation is handled with elegance and precision."
      heroImage="/wed-1.png"
      mainServiceImage="/wed-3.png"
      imageOnLeft={false}
      features={[
        {
          title: "Extra Wedding Transport Vehicles",
          items: [
            "Decorations and designs available as extras",
            "Minimum 3 hours booking required",
            "Basic Decoration (artificial or simple natural flowers + ribbons)",
            "Intermediate Decoration (medium quality natural flowers, front and side arrangements, bows)",
            "Luxury Decoration (premium flowers, multiple arrangements, detailed design, seasonal fresh or imported flowers, professional setup)",
          ],
        },
      ]}
      ctaText="Book Your Wedding Transport"
      bookingLink="/booking/wedding"
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
                  From Ceremony to Reception
                </h2>
                <div className="gold-separator mx-auto mb-6 w-32"></div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 mx-auto max-w-2xl text-luxury-black/85">
                  Elegant, seamless wedding journeys from ceremony venues to
                  reception halls, tailored around your special day timeline.
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
