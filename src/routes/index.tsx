import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowLeft,
  Star,
  Check,
  Calendar,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

const heroMedia = [
  { type: "image" as const, src: "/home.png" },
  { type: "video" as const, src: "/home-1.mp4" },
  { type: "video" as const, src: "/home-2.MP4" },
  { type: "video" as const, src: "/home-3.MP4" },
  { type: "video" as const, src: "/home-4.MP4" },
];

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentService, setCurrentService] = useState(0);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      ".scroll-fade-in, .scroll-scale-in, .scroll-slide-left, .scroll-slide-right"
    );
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const current = heroMedia[currentHeroIndex];

    if (current.type === "image") {
      const timeoutId = window.setTimeout(() => {
        setCurrentHeroIndex((prev) =>
          prev === heroMedia.length - 1 ? 0 : prev + 1
        );
      }, 6000);

      return () => window.clearTimeout(timeoutId);
    }
  }, [currentHeroIndex]);

  const currentHero = heroMedia[currentHeroIndex];

  const services = [
    {
      title: "One-Way Transportation",
      description:
        "Experience seamless one-way transportation with our premium chauffeur service. Flexible point-to-point luxury transportation solutions tailored to your schedule.",
      image: "maybach-2.png",
      features: [
        "Modern Luxury Fleet",
        "Classic Collection",
        "Professional Service",
      ],
      link: "/services/one-way",
    },
    {
      title: "Corporate Transportation",
      description:
        "Elevate your business travel with sophisticated, reliable transportation solutions designed for executives and companies seeking to impress clients.",
      image: "bentley-17.png",
      features: [
        "Executive Vehicles",
        "Meeting Coordination",
        "Professional Service",
      ],
      link: "/services/business",
    },
    {
      title: "Airport Transfers",
      description:
        "Experience premium airport transfers with our luxury fleet. Priority meet & greet service, flight tracking, and seamless transfers from Tires (Cascais Airport).",
      image: "airport-service.png",
      features: [
        "Fixed Price Transfers",
        "Priority Meet & Greet",
        "Flight Tracking",
      ],
      link: "/services/airports",
    },
    {
      title: "Luxury Tours & Scenic Routes",
      description:
        "Discover Portugal's finest wine regions through chauffeured comfort and private experiences at Buddha Eden Gardens and Palácio da Bacalhôa.",
      image: "scenic-routes.png",
      features: [
        "Private Wine Tastings",
        "Historic Palaces",
        "Chauffeured Transport",
      ],
      link: "/services/tours",
    },
    {
      title: "Wedding Services",
      description:
        "Transform your special day into an unforgettable experience with our premium wedding transportation services. Classic and modern luxury vehicles for your most cherished moments.",
      image: "weddings-rr.png",
      features: [
        "Classic Wedding Fleet",
        "Modern Transport",
        "Professional Service",
      ],
      link: "/services/weddings",
    },
    {
      title: "Exclusive Experiences",
      description:
        "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation. VIP access, private villa visits, and bespoke experiences.",
      image: "home.png",
      features: [
        "VIP Event Transport",
        "Private Villa Access",
        "Personal Concierge",
      ],
      link: "/services/exclusive",
    },
  ];

  const partners = [
    {
      name: "Splendour Luxury Group",
      logo: "splendour.png",
      descriptor: "Luxury Lifestyle",
    },
    {
      name: "Bacalhôa Palace",
      logo: "bacalhoa.png",
      descriptor: "Wine Tasting",
    },
  ];

  const experienceImages = [
    { src: "home.png", alt: "Private chauffeur experience in Lisbon" },
    { src: "exp.png", alt: "Private chauffeur experience in Lisbon" },
    { src: "exp-1.png", alt: "Private chauffeur experience in Lisbon" },
  ];

  const goToPreviousService = () => {
    setCurrentService((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const goToNextService = () => {
    setCurrentService((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  const experienceCarouselRef = useRef<HTMLDivElement | null>(null);

  const scrollExperiences = (direction: "prev" | "next") => {
    const container = experienceCarouselRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.7;
    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Scroll Progress Indicator */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {currentHero.type === "video" ? (
          <video
            key={currentHero.src}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            autoPlay
            muted
            playsInline
            onEnded={() =>
              setCurrentHeroIndex((prev) =>
                prev === heroMedia.length - 1 ? 0 : prev + 1
              )
            }
            aria-hidden="true"
          >
            <source src={currentHero.src} type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${currentHero.src}')`,
            }}
          />
        )}

        {/* Gradient Overlay (slightly lighter for more visible media) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(184, 134, 11, 0.08) 0%, rgba(26, 26, 26, 0.3) 50%, rgba(212, 175, 55, 0.08) 100%),
              linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.3))
            `,
          }}
        />

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgba(184,134,11,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>

        {/* Top Left - Chevalier Lane Title */}
        <div className="absolute top-6 left-4 sm:top-12 sm:left-6 lg:top-24 lg:left-16 z-10 scroll-slide-left max-w-[calc(100vw-2rem)] sm:max-w-none">
          <div className="backdrop-blur-sm bg-black/20 p-6 sm:p-6 lg:p-8 rounded-lg border border-gold/20 shadow-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl luxury-serif-bold text-white tracking-wider leading-tight drop-shadow-2xl">
              {/*Your
              <br />*/}
              <span className="text-luxury-gold drop-shadow-lg">
                <span className="text-white">Luxury</span> Concierge
                <br />
                <span className="text-white">&</span>
                <br />
                <span className="text-white">Boutique</span> Chauffeur
                <br />
                <span className="text-white">Service</span>
              </span>
            </h1>
            <div className="mt-3 sm:mt-4 h-0.5 w-20 sm:w-24 bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>
          </div>
        </div>

        {/* Bottom Right - Paragraph and Buttons */}
        <div className="absolute bottom-6 left-4 right-4 sm:bottom-12 sm:left-auto sm:right-6 lg:bottom-24 lg:right-16 z-10 text-left sm:text-right max-w-full sm:max-w-md md:max-w-xl lg:max-w-2xl scroll-slide-right">
          <div className="backdrop-blur-md bg-black/30 p-6 sm:p-6 lg:p-8 rounded-lg border border-luxury-gold/30 shadow-2xl overflow-hidden">
            <p className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-playfair text-white mb-5 sm:mb-6 lg:mb-8 leading-relaxed font-medium tracking-wider drop-shadow-lg">
              From Rolls-Royce elegance to modern Bentley comfort in Lisbon —
              travel with{" "}
              <span className="text-luxury-gold italic">
                unparalleled distinction
              </span>
              .
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-start sm:justify-end items-stretch sm:items-end">
              <Link
                to="/services"
                className="btn-luxury-premium text-base sm:text-base lg:text-lg group"
              >
                <span>Book Your Experience</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
              </Link>
              <Link
                to="/complete-fleet"
                className="btn-luxury-outline-premium text-base sm:text-base lg:text-lg group"
              >
                <span>Explore Our Fleet</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Video Section */}
      <section className="bg-gradient-to-b from-black via-[#0d0d0d] to-luxury-black py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.4em] text-luxury-gold/70 font-semibold">
              Immersive Journey
            </p>
            <h2 className="text-4xl md:text-5xl luxury-display text-white tracking-wide">
              Lisbon in Motion
            </h2>
          </div>
          <div className="rounded-3xl overflow-hidden border border-luxury-gold/40 shadow-[0_30px_120px_rgba(0,0,0,0.65)] backdrop-blur-sm">
            <video
              className="w-full h-[60vh] object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-label="Immersive Chevalier Lane showcase"
            >
              <source src="/1125.mp4" type="video/mp4" />
              Your browser doesn't support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-luxury-white via-luxury-ivory to-luxury-pearl relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-3 bg-[linear-gradient(45deg,transparent_25%,rgba(184,134,11,0.05)_25%,rgba(184,134,11,0.05)_50%,transparent_50%,transparent_75%,rgba(184,134,11,0.05)_75%)] bg-[length:20px_20px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl luxury-display text-luxury-black mb-8 tracking-wider">
              A Legacy of Excellence
            </h2>
            <div className="gold-separator mx-auto mb-8 w-48"></div>
            <p className="text-xl font-playfair text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Crafting unparalleled experiences since our founding, every
              journey with Chevalier Lane represents the pinnacle of luxury
              transportation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 scroll-slide-left">
              <p className="text-lg font-playfair text-gray-700 leading-relaxed">
                Chevalier Lane has redefined luxury transportation, the only
                company in Lisbon offering both modern luxury and classic
                elegance.
              </p>
              <p className="text-lg font-playfair text-gray-700 leading-relaxed">
                From a Rolls-Royce Silver Cloud to the commanding presence of a
                Bentley Mulsanne, each vehicle in our collection tells a story
                of engineering excellence and uncompromising luxury.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-luxury-gold text-luxury-gold"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="relative scroll-slide-right">
              <img
                src="cloud-14.png"
                alt="Luxury services"
                className="w-full h-96 object-cover rounded-sm shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = "legacy.png";
                }}
              />
              <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-luxury-gold rounded-sm -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Gallery Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-luxury-black via-[#0b0b0b] to-luxury-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,rgba(184,134,11,0.25),transparent_55%)]"></div>
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,transparent_40%,rgba(255,255,255,0.05)_80%)]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.4em] text-luxury-gold/70 font-semibold mb-4">
              Moments in Motion
            </p>
            <h2 className="text-5xl md:text-6xl luxury-display text-white mb-8 tracking-[0.2em]">
              We Tailor Every Experience to You
            </h2>
            <div className="gold-separator mx-auto mb-8 w-48"></div>
            <p className="text-xl font-playfair text-white/80 max-w-3xl mx-auto leading-relaxed">
              A glimpse into the journeys we create — from intimate celebrations
              and wedding arrivals to scenic routes and bespoke corporate
              occasions.
            </p>
          </div>

          <div className="relative">
            <div
              ref={experienceCarouselRef}
              className="flex gap-6 lg:gap-8 overflow-x-auto no-scrollbar horizontal-scroll py-2"
            >
              {experienceImages.map((image) => (
                <div
                  key={image.src}
                  className="group relative overflow-hidden rounded-3xl border border-luxury-gold/30 bg-gradient-to-br from-white/5 via-white/0 to-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.75)] min-w-[80%] sm:min-w-[60%] md:min-w-[40%] lg:min-w-[32%] h-72 md:h-[420px]"
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
                onClick={() => scrollExperiences("prev")}
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
                onClick={() => scrollExperiences("next")}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/15 transition-colors duration-300"
                aria-label="View next experience"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-black via-[#0d0d0d] to-luxury-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:30px_30px] opacity-20"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <p className="text-sm uppercase tracking-[0.4em] text-luxury-gold/70 font-semibold mb-4">
              Signature Services
            </p>
            <h2 className="text-5xl md:text-6xl luxury-display text-white mb-8 tracking-[0.2em]">
              Curated Experiences
            </h2>
            <div className="gold-separator mx-auto mb-10 w-56"></div>
            <p className="text-xl md:text-2xl font-playfair text-white/80 max-w-4xl mx-auto leading-relaxed">
              Every journey with Chevalier Lane is meticulously crafted to
              exceed expectations, offering
              <span className="text-luxury-gold italic">
                {" "}
                unparalleled service{" "}
              </span>
              that transforms ordinary moments into extraordinary memories.
            </p>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={goToPreviousService}
              className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 border border-white/20 text-white p-4 rounded-full backdrop-blur transition-colors duration-300"
              aria-label="View previous service"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goToNextService}
              className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 border border-white/20 text-white p-4 rounded-full backdrop-blur transition-colors duration-300"
              aria-label="View next service"
            >
              <ArrowRight className="h-5 w-5" />
            </button>

            <div className="overflow-hidden rounded-[32px] border border-luxury-gold/30 shadow-[0_30px_120px_rgba(0,0,0,0.75)] bg-gradient-to-br from-[#050505] via-[#0d0d0d] to-black">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentService * 100}%)` }}
              >
                {services.map((service, index) => (
                  <div key={service.title} className="min-w-full px-6 py-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6 text-white">
                        <p className="text-sm tracking-[0.5em] text-luxury-gold/70 uppercase">
                          Service {index + 1} of {services.length}
                        </p>
                        <h3 className="text-4xl luxury-display tracking-wide text-white">
                          {service.title}
                        </h3>
                        <p className="luxury-sans text-lg text-white/80 leading-relaxed">
                          {service.description}
                        </p>
                        <ul className="space-y-4">
                          {service.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center space-x-4"
                            >
                              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-luxury-gold/40 bg-white/5">
                                <Check className="h-4 w-4 text-luxury-gold" />
                              </div>
                              <span className="luxury-sans text-white/90 text-lg">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <Link
                          to={service.link}
                          className="inline-flex items-center gap-2 text-luxury-gold text-sm tracking-[0.3em] uppercase"
                        >
                          Learn More
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                      <div className="relative">
                        <div className="absolute -inset-6 rounded-[32px] border border-luxury-gold/30 opacity-60"></div>
                        <img
                          src={service.image}
                          alt={service.title}
                          className="relative rounded-[32px] object-cover w-full h-[420px] shadow-2xl"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 mt-10">
              {services.map((service, index) => (
                <button
                  key={service.title}
                  type="button"
                  onClick={() => setCurrentService(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentService === index
                      ? "w-16 bg-luxury-gold"
                      : "w-6 bg-white/30"
                  }`}
                  aria-label={`Go to ${service.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-luxury-white via-luxury-pearl to-luxury-ivory relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,rgba(184,134,11,0.15),transparent_45%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.4em] text-luxury-gold/70 font-semibold mb-4">
              Distinguished Partnerships
            </p>
            <h2 className="text-5xl md:text-7xl luxury-display text-luxury-black mb-8 tracking-wider">
              Trusted Collaborations
            </h2>
            <div className="gold-separator mx-auto mb-10 w-52"></div>
            <p className="text-xl font-playfair text-gray-700 max-w-3xl mx-auto leading-relaxed">
              We work hand-in-hand with elite brands and tastemakers to deliver
              seamless, unforgettable journeys for their most discerning guests.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-luxury-gold/20 bg-white/80 backdrop-blur-md shadow-luxury-soft">
            <div className="partner-marquee">
              <div className="partner-marquee-track flex items-center gap-16 py-12 px-10">
                {[...partners, ...partners, ...partners].map(
                  (partner, index) => (
                    <div
                      key={`${partner.name}-${index}`}
                      className="flex flex-col items-center gap-4 min-w-[220px] opacity-75 hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="flex items-center justify-center w-48 h-24">
                        <img
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          className="max-h-20 w-full object-contain grayscale hover:grayscale-0 transition duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm tracking-[0.3em] uppercase text-luxury-gold">
                          {partner.descriptor}
                        </p>
                        <p className="luxury-sans-medium text-luxury-black mt-1">
                          {partner.name}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-10 text-sm tracking-[0.4em] uppercase">
            Expand your brand presence with Chevalier Lane
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/last-call-to-action.png')`,
          }}
        />
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl luxury-display text-white mb-8 tracking-wider">
            Reserve Your Place
          </h2>

          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto mb-8"></div>

          <p className="text-xl md:text-2xl font-playfair text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            Join an exclusive circle of discerning individuals who understand
            that true luxury is not just about the destination, but{" "}
            <span className="text-luxury-gold italic">the journey itself</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
            <Link
              to="/services"
              className="btn-luxury-premium text-xl px-12 py-5 group"
            >
              <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
              <span>Book Your Experience</span>
            </Link>
            <Link
              to="/services"
              className="btn-luxury-outline-premium text-xl px-12 py-5 group"
            >
              <Users className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
              <span>Learn More</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="group space-y-4 scroll-scale-in stagger-1">
              <div className="relative">
                <div className="text-4xl md:text-5xl luxury-display text-luxury-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
              <div className="luxury-sans-medium text-white/80 text-lg tracking-wide">
                Available Service
              </div>
            </div>
            <div className="group space-y-4 scroll-scale-in stagger-2">
              <div className="relative">
                <div className="text-4xl md:text-5xl luxury-display text-luxury-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                  Premium
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
              <div className="luxury-sans-medium text-white/80 text-lg tracking-wide">
                Fleet Selection
              </div>
            </div>
            <div className="group space-y-4 scroll-scale-in stagger-3">
              <div className="relative">
                <div className="text-4xl md:text-5xl luxury-display text-luxury-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold to-luxury-champagne">
                    Elite
                  </span>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
              <div className="luxury-sans-medium text-white/80 text-lg tracking-wide">
                Client Experience
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
