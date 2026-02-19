import { useEffect, useRef, useState } from "react";
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
import { useLanguage } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: App,
});

const heroMedia = [
  // { type: "image" as const, src: "/home.png" },
  { type: "image" as const, src: "/modern-header.png" },
  { type: "video" as const, src: "/home-6.mp4" },
  { type: "video" as const, src: "/home-7.mp4" },
  { type: "video" as const, src: "/home-10.mp4" },
  // { type: "video" as const, src: "/home-8.mp4" },
  // { type: "video" as const, src: "/home-9.mp4" },
  // { type: "video" as const, src: "/home-1.mp4" },
  // { type: "video" as const, src: "/home-2.mp4" },
  // { type: "video" as const, src: "/home-3.mp4" },
  // { type: "video" as const, src: "/home-4.mp4" },
];

function App() {
  const { t } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentService, setCurrentService] = useState(0);
  const [servicesPerView, setServicesPerView] = useState(1);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isShowcasePlaying, setIsShowcasePlaying] = useState(false);
  const showcaseVideoRef = useRef<HTMLVideoElement | null>(null);

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
      ".scroll-fade-in, .scroll-scale-in, .scroll-slide-left, .scroll-slide-right",
    );
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const getServicesPerView = () =>
      window.matchMedia("(min-width: 1024px)").matches ? 3 : 1;

    const handleResize = () => {
      setServicesPerView(getServicesPerView());
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const current = heroMedia[currentHeroIndex];

    if (current.type === "image") {
      const timeoutId = window.setTimeout(() => {
        setCurrentHeroIndex((prev) =>
          prev === heroMedia.length - 1 ? 0 : prev + 1,
        );
      }, 6000);

      return () => window.clearTimeout(timeoutId);
    }
  }, [currentHeroIndex]);

  const currentHero = heroMedia[currentHeroIndex];

  const services = [
    {
      title: "One-Way",
      description: "Direct premium transportation between locations.",
      image: "oneway.png",
      features: [
        "Modern Luxury Fleet",
        "Classic Collection",
        "Professional Service",
      ],
      link: "/services/one-way",
    },
    {
      title: "By the Hour",
      description: "A professional chauffeur service available by the hour.",
      image: "exp-1.png",
      features: [
        "VIP Event Transport",
        "Private Villa Access",
        "Personal Concierge",
      ],
      link: "/services/business",
    },
    // {
    //   title: "Business Transportation",
    //   description:
    //     "Elevate your business travel with sophisticated, reliable transportation solutions designed for executives and companies seeking to impress clients.",
    //   image: "bentley-17.png",
    //   features: [
    //     "Executive Vehicles",
    //     "Meeting Coordination",
    //     "Professional Service",
    //   ],
    //   link: "/services/business",
    // },
    {
      title: "Airport",
      description: "Discreet chauffeur service to and from the airport.",
      image: "air-8.png",
      features: [
        "Fixed Price Transfers",
        "Priority Meet & Greet",
        "Flight Tracking",
      ],
      link: "/services/airports",
    },
    // {
    //   title: "Tours",
    //   description: "Private chauffeur-driven tours and experiences.",
    //   image: "scenic-routes.png",
    //   features: [
    //     "Private Wine Tastings",
    //     "Historic Palaces",
    //     "Chauffeured Transport",
    //   ],
    //   link: "/services/tours",
    // },
    // {
    //   title: "Weddings",
    //   description: "Elegant chauffeur-driven transportation for weddings.",
    //   image: "weddings-rr.png",
    //   features: [
    //     "Classic Wedding Fleet",
    //     "Modern Transport",
    //     "Professional Service",
    //   ],
    //   link: "/services/weddings",
    // },
    // {
    //   title: "Events & Special Occasions",
    //   description: "Price on request.",
    //   image: "corp-7.png",
    //   features: [],
    //   link: "/contact",
    // },
    // {
    //   title: "Automotive Presence for Film & Editorial",
    //   description: "Price on request.",
    //   image: "bentley-24.png",
    //   features: [],
    //   link: "/contact",
    // },
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
    {
      name: "Queen of Clubs",
      logo: "queenofclubs.png",
      descriptor: "Queen of Clubs",
    },
  ];

  const experienceImages = [
    { src: "home.png", alt: t("Private chauffeur experience in Lisbon") },
    { src: "exp.png", alt: t("Private chauffeur experience in Lisbon") },
    {
      src: "modern-header.png",
      alt: t("Private chauffeur experience in Lisbon"),
    },
  ];

  const maxServiceIndex = Math.max(services.length - servicesPerView, 0);

  useEffect(() => {
    setCurrentService((prev) => Math.min(prev, maxServiceIndex));
  }, [maxServiceIndex]);

  const goToPreviousService = () => {
    setCurrentService((prev) => (prev === 0 ? maxServiceIndex : prev - 1));
  };

  const goToNextService = () => {
    setCurrentService((prev) => (prev === maxServiceIndex ? 0 : prev + 1));
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
      <section className="relative h-[65svh] sm:h-screen overflow-hidden">
        {currentHero.type === "video" ? (
          <video
            key={currentHero.src}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            autoPlay
            muted
            playsInline
            onEnded={() =>
              setCurrentHeroIndex((prev) =>
                prev === heroMedia.length - 1 ? 0 : prev + 1,
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

        {/* Centered Hero Content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-8">
          <div className="w-full max-w-5xl text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-black/30 border border-white/20 backdrop-blur-sm text-xs sm:text-sm uppercase tracking-[0.4em] text-white/80">
              {t("Private Chauffeur Service")}
            </div>
            <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl luxury-serif-bold text-white tracking-wide leading-tight drop-shadow-2xl">
              {t("Your Personal & Boutique Chauffeur Service")}
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 pt-2">
              <div className="flex flex-col items-center gap-4">
                <Link
                  to="/services"
                  className="btn-luxury-premium group text-base sm:text-lg lg:text-xl px-8 sm:px-10 py-3 sm:py-4 rounded-full shadow-2xl w-full sm:w-auto"
                >
                  <span className="flex items-center justify-center">
                    {t("Book Your Experience")}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Link
                  to="/complete-fleet"
                  className="btn-luxury-outline-premium group text-base sm:text-lg lg:text-xl px-8 sm:px-10 py-3 sm:py-4 rounded-full border-2 shadow-2xl w-full sm:w-auto"
                >
                  <span className="flex items-center justify-center">
                    {t("Explore Our Fleet")}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Video Section */}
      <section className="bg-gradient-to-b from-black via-[#0d0d0d] to-luxury-black py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.4em] text-luxury-gold/70 font-semibold">
              {t("Immersive Journey")}
            </p>
            <h2 className="text-4xl md:text-5xl luxury-display text-white tracking-wide">
              {t("Lisbon in Motion")}
            </h2>
          </div>
          <div className="rounded-3xl overflow-hidden border border-luxury-gold/40 shadow-[0_30px_120px_rgba(0,0,0,0.65)] backdrop-blur-sm">
            <div className="relative">
              <video
                ref={showcaseVideoRef}
                className="w-full h-[60vh] object-cover"
                loop
                muted
                playsInline
                preload="metadata"
                poster="/home-2.png"
                onPlay={() => setIsShowcasePlaying(true)}
                onPause={() => setIsShowcasePlaying(false)}
                aria-label={t("Immersive Chevalier Lane showcase")}
              >
                <source src="/home-5.mp4" type="video/mp4" />
                Your browser doesn't support the video tag.
              </video>
              {!isShowcasePlaying && (
                <button
                  type="button"
                  onClick={() => {
                    const video = showcaseVideoRef.current;
                    if (!video) return;
                    video.play();
                  }}
                  className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/40"
                  aria-label={t("Play Lisbon in Motion video")}
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white shadow-[0_0_40px_rgba(255,255,255,0.35)] backdrop-blur">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-8 w-8 translate-x-[2px] fill-current"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
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
              {t("A Legacy of Excellence")}
            </h2>
            <div className="gold-separator mx-auto mb-8 w-48"></div>
            <p className="text-xl font-playfair text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {t(
                "Crafting unparalleled experiences since our founding, every journey with Chevalier Lane represents the pinnacle of luxury transportation.",
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 scroll-slide-left">
              <p className="text-lg font-playfair text-gray-700 leading-relaxed">
                {t(
                  "Chevalier Lane has redefined luxury transportation, the only company in Lisbon offering both modern luxury and classic elegance.",
                )}
              </p>
              <p className="text-lg font-playfair text-gray-700 leading-relaxed">
                {t(
                  "From a Rolls-Royce Silver Cloud to the commanding presence of a Bentley Mulsanne, each vehicle in our collection tells a story of engineering excellence and uncompromising luxury.",
                )}
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
                alt={t("Luxury services")}
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
      {/* <section className="py-32 px-4 bg-gradient-to-br from-luxury-black via-[#0b0b0b] to-luxury-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,rgba(184,134,11,0.25),transparent_55%)]"></div>
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,transparent_40%,rgba(255,255,255,0.05)_80%)]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.4em] text-luxury-gold/70 font-semibold mb-4">
              {t("Moments in Motion")}
            </p>
            <h2 className="text-5xl md:text-6xl luxury-display text-white mb-8 tracking-[0.2em]">
              {t("We Tailor Every Experience to You")}
            </h2>
            <div className="gold-separator mx-auto mb-8 w-48"></div>
            <p className="text-xl font-playfair text-white/80 max-w-3xl mx-auto leading-relaxed">
              {t(
                "A glimpse into the journeys we create — from intimate celebrations and wedding arrivals to scenic routes and bespoke corporate occasions.",
              )}
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
                onClick={() => scrollExperiences("next")}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/15 transition-colors duration-300"
                aria-label={t("View next experience")}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section> */}
      {/* Services Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-black via-[#0d0d0d] to-luxury-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:30px_30px] opacity-20"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <p className="text-sm uppercase tracking-[0.4em] text-luxury-gold/70 font-semibold mb-4">
              {t("Signature Services")}
            </p>
            <h2 className="text-5xl md:text-6xl luxury-display text-white mb-8 tracking-[0.2em]">
              {t("Curated Experiences")}
            </h2>
            <div className="gold-separator mx-auto mb-10 w-56"></div>
            <p className="text-xl md:text-2xl font-playfair text-white/80 max-w-4xl mx-auto leading-relaxed">
              {t(
                "Every journey with Chevalier Lane is meticulously crafted to exceed expectations, offering unparalleled service that transforms ordinary moments into extraordinary memories.",
              )}
            </p>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={goToPreviousService}
              className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 border border-white/20 text-white p-4 rounded-full backdrop-blur transition-colors duration-300"
              aria-label={t("View previous service")}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goToNextService}
              className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 border border-white/20 text-white p-4 rounded-full backdrop-blur transition-colors duration-300"
              aria-label={t("View next service")}
            >
              <ArrowRight className="h-5 w-5" />
            </button>

            <div className="overflow-hidden">
              <div
                className="flex items-stretch transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${
                    currentService * (100 / servicesPerView)
                  }%)`,
                }}
              >
                {services.map((service, index) => (
                  <div
                    key={service.title}
                    className="flex-shrink-0 box-border px-3 py-4"
                    style={{ width: `${100 / servicesPerView}%` }}
                  >
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-luxury-gold/30 bg-transparent shadow-[0_20px_80px_rgba(0,0,0,0.65)]">
                      <div className="relative h-48 md:h-56 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                      </div>

                      <div className="flex flex-1 flex-col p-6 text-white">
                        <p className="text-xs tracking-[0.5em] text-luxury-gold/70 uppercase">
                          {t("Service")} {index + 1} {t("of")} {services.length}
                        </p>
                        <h3 className="mt-3 text-2xl md:text-3xl luxury-display tracking-wide text-white">
                          {t(service.title)}
                        </h3>
                        <p className="mt-3 luxury-sans text-sm md:text-base text-white/80 leading-relaxed">
                          {t(service.description)}
                        </p>

                        <div className="mt-4 flex-1">
                          {service.features.length > 0 ? (
                            <ul className="space-y-3">
                              {service.features.map((feature) => (
                                <li
                                  key={feature}
                                  className="flex items-center space-x-3"
                                >
                                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-luxury-gold/40 bg-white/5">
                                    <Check className="h-4 w-4 text-luxury-gold" />
                                  </div>
                                  <span className="luxury-sans text-white/90 text-sm md:text-base">
                                    {t(feature)}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="min-h-[72px]" aria-hidden />
                          )}
                        </div>

                        <Link
                          to={service.link}
                          className="mt-6 inline-flex items-center gap-2 text-luxury-gold text-xs md:text-sm tracking-[0.3em] uppercase"
                        >
                          {t("Learn More")}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 mt-10">
              {Array.from({ length: maxServiceIndex + 1 }, (_, index) => (
                <button
                  key={services[index].title}
                  type="button"
                  onClick={() => setCurrentService(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    currentService === index
                      ? "w-16 bg-luxury-gold"
                      : "w-6 bg-white/30",
                  )}
                  aria-label={`${t("Go to service")} ${t(
                    services[index].title,
                  )}`}
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
              {t("Distinguished Partnerships")}
            </p>
            <h2 className="text-5xl md:text-7xl luxury-display text-luxury-black mb-8 tracking-wider">
              {t("Trusted Collaborations")}
            </h2>
            <div className="gold-separator mx-auto mb-10 w-52"></div>
            <p className="text-xl font-playfair text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {t(
                "We work hand-in-hand with elite brands and tastemakers to deliver seamless, unforgettable journeys for their most discerning guests.",
              )}
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
                          {t(partner.descriptor)}
                        </p>
                        <p className="luxury-sans-medium text-luxury-black mt-1">
                          {partner.name}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-10 text-sm tracking-[0.4em] uppercase">
            {t("Expand your brand presence with Chevalier Lane")}
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
            {t("Reserve Your Place")}
          </h2>

          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto mb-8"></div>

          <p className="text-xl md:text-2xl font-playfair text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            {t(
              "Join an exclusive circle of discerning individuals who understand that true luxury is not just about the destination, but the journey itself.",
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
            <Link
              to="/services"
              className="btn-luxury-premium text-xl px-12 py-5 group"
            >
              <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
              <span>{t("Book Your Experience")}</span>
            </Link>
            <Link
              to="/services"
              className="btn-luxury-outline-premium text-xl px-12 py-5 group"
            >
              <Users className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
              <span>{t("Learn More")}</span>
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
                {t("Available Service")}
              </div>
            </div>
            <div className="group space-y-4 scroll-scale-in stagger-2">
              <div className="relative">
                <div className="text-4xl md:text-5xl luxury-display text-luxury-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                  {t("Premium")}
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
              <div className="luxury-sans-medium text-white/80 text-lg tracking-wide">
                {t("Fleet Selection")}
              </div>
            </div>
            <div className="group space-y-4 scroll-scale-in stagger-3">
              <div className="relative">
                <div className="text-4xl md:text-5xl luxury-display text-luxury-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold to-luxury-champagne">
                    {t("Elite")}
                  </span>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
              <div className="luxury-sans-medium text-white/80 text-lg tracking-wide">
                {t("Client Experience")}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
