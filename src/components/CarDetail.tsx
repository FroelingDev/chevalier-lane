import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Star,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import BookingNotice from "@/components/booking/BookingNotice";
import { useLanguage } from "@/components/LanguageProvider";

interface CarImage {
  src: string;
  alt: string;
  caption?: string;
}

interface CarPrice {
  label: string;
  value: string;
}

interface CarFeature {
  title: string;
  description: string;
  icon?: string;
}

interface CarDetailProps {
  name: string;
  year?: string;
  category: "classic" | "modern";
  images: CarImage[];
  description?: string;
  features: CarFeature[];
  specifications: Record<string, string>;
  prices?: CarPrice[];
  heroImage?: string;
  heroSideImage?: string;
  heroSideImageAlt?: string;
  heroSideImageMiddle?: string;
  heroSideImageAltMiddle?: string;
  heroSideImage2?: string;
  heroSideImageAlt2?: string;
  heroVideo?: string;
  heroVideoPoster?: string;
  reservationLink?: string;
  availabilityNotice?: string;
}

export function CarDetail({
  name,
  year,
  category,
  images,
  description,
  features,
  specifications,
  prices,
  heroImage,
  heroSideImage,
  heroSideImageAlt,
  heroSideImageMiddle,
  heroSideImageAltMiddle,
  heroSideImage2,
  heroSideImageAlt2,
  heroVideo,
  heroVideoPoster,
  reservationLink,
  availabilityNotice,
}: CarDetailProps) {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const heroImageUrl = heroImage || images[0]?.src || "hero-section.png";

  type HeroAccentImage = {
    src: string;
    alt?: string;
  };

  const heroAccentImages: HeroAccentImage[] = [];

  if (heroSideImage) {
    heroAccentImages.push({
      src: heroSideImage,
      alt: heroSideImageAlt,
    });
  }

  if (heroSideImageMiddle) {
    heroAccentImages.push({
      src: heroSideImageMiddle,
      alt: heroSideImageAltMiddle,
    });
  }

  if (heroSideImage2) {
    heroAccentImages.push({
      src: heroSideImage2,
      alt: heroSideImageAlt2,
    });
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] md:h-[70vh] md:min-h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(184, 134, 11, 0.15) 0%, rgba(26, 26, 26, 0.5) 50%, rgba(212, 175, 55, 0.15) 100%),
              linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)),
              url('${heroImageUrl}')
            `,
          }}
        />

        <img
          src={heroImageUrl}
          alt={`${name} ${t("hero")}`}
          className="absolute inset-0 h-full w-full object-cover object-center md:hidden"
          onError={(e) => {
            e.currentTarget.src = "legacy.png";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-luxury-black/30 to-transparent md:hidden" />

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 hidden md:block opacity-3 bg-[radial-gradient(circle_at_1px_1px,rgba(184,134,11,0.2)_1px,transparent_0)] bg-[length:24px_24px]"></div>
      </section>

      {/* Car Title & Actions */}
      <section className="bg-gradient-to-b from-luxury-black via-luxury-black/90 to-luxury-black text-white px-4 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-luxury-gold/80 mb-2">
              {t("Exclusive Fleet")}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl luxury-display tracking-wider leading-tight drop-shadow-xl">
              {name}
            </h1>
          </div>

          <div className="flex items-center justify-center space-x-3 sm:space-x-4">
            <span
              className={`px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] rounded-sm ${
                category === "classic"
                  ? "bg-luxury-gold text-luxury-black"
                  : "bg-luxury-champagne text-luxury-black"
              }`}
            >
              {category === "classic" ? t("Classic") : t("Modern")}
            </span>
            {year && (
              <span className="text-luxury-gold text-base sm:text-lg font-semibold tracking-wide">
                {year}
              </span>
            )}
          </div>

          {description && (
            <p className="text-sm sm:text-base md:text-lg font-playfair text-white/85 leading-relaxed px-2">
              {description.length > 140
                ? description.substring(0, 140) + "..."
                : description}
            </p>
          )}

          {availabilityNotice && (
            <BookingNotice message={t(availabilityNotice)} />
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2">
            <Link
              to={reservationLink || "/contact"}
              className="btn-luxury-premium text-xs sm:text-sm px-6 sm:px-8 py-2.5 sm:py-3 group"
            >
              <Calendar className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
              <span>{t("Reserve")}</span>
            </Link>
            <button
              onClick={() =>
                document
                  .getElementById("car-gallery")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-luxury-outline-premium text-xs sm:text-sm px-6 sm:px-8 py-2.5 sm:py-3 group"
            >
              <ArrowRight className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
              <span>{t("Explore")}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Optional Hero Video */}
      {heroVideo && (
        <section className="bg-luxury-black px-4 py-10 sm:py-14 relative overflow-hidden">
          <div className="max-w-5xl mx-auto rounded-sm overflow-hidden border border-luxury-gold/20 shadow-[0_25px_80px_rgba(0,0,0,0.45)] relative">
            <video
              className="w-full h-full aspect-video object-cover"
              src={heroVideo}
              poster={heroVideoPoster}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-luxury-black/30 via-transparent to-luxury-black/30" />
          </div>
        </section>
      )}

      {/* Optional Accent Images */}
      {heroAccentImages.length > 0 && (
        <section className="py-16 px-4 bg-gradient-to-br from-luxury-black via-[#0b0b0b] to-luxury-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,rgba(184,134,11,0.25),transparent_55%)]"></div>
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,transparent_40%,rgba(255,255,255,0.05)_80%)]"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex gap-6 lg:gap-8 overflow-x-auto no-scrollbar horizontal-scroll py-2">
              {heroAccentImages.map((image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className="group relative overflow-hidden rounded-3xl border border-luxury-gold/30 bg-gradient-to-br from-white/5 via-white/0 to-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.75)] min-w-[80%] sm:min-w-[60%] md:min-w-[40%] lg:min-w-[32%] h-72 md:h-[420px]"
                >
                  <img
                    src={image.src}
                    alt={image.alt || `${name} ${t("profile view")}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = heroImageUrl;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Car Gallery & Details Section */}
      <section
        id="car-gallery"
        className="py-16 sm:py-24 md:py-32 px-4 bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white relative overflow-hidden"
      >
        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 opacity-3 bg-[linear-gradient(45deg,transparent_25%,rgba(184,134,11,0.03)_25%,rgba(184,134,11,0.03)_50%,transparent_50%,transparent_75%,rgba(184,134,11,0.03)_75%)] bg-[length:24px_24px]"></div>
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_3px_3px,rgba(184,134,11,0.04)_1px,transparent_0)] bg-[length:28px_28px]"></div>

        <div className="max-w-7xl mx-auto relative z-10 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
            {/* Image Gallery */}
            <div className="space-y-4 sm:space-y-6 scroll-fade-in max-w-full overflow-hidden">
              <div className="relative">
                {/* Main Image */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-sm shadow-luxury bg-gray-100 md:aspect-auto md:h-96 lg:h-[500px]">
                  <img
                    src={images[currentImageIndex]?.src}
                    alt={images[currentImageIndex]?.alt}
                    className="w-full h-full object-contain object-center transition-opacity duration-500"
                    onError={(e) => {
                      e.currentTarget.src = "legacy.png";
                    }}
                  />

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-full bg-white/90 backdrop-blur-sm border-2 border-luxury-gold/40 shadow-luxury hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 flex items-center justify-center group touch-manipulation"
                    aria-label={t("Previous image")}
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform duration-300" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-full bg-white/90 backdrop-blur-sm border-2 border-luxury-gold/40 shadow-luxury hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 flex items-center justify-center group touch-manipulation"
                    aria-label={t("Next image")}
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform duration-300" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 bg-black/70 backdrop-blur-sm px-2 py-1 sm:px-3 rounded-sm">
                    <span className="text-white text-xs sm:text-sm luxury-sans-medium">
                      {currentImageIndex + 1} / {images.length}
                    </span>
                  </div>
                </div>

                {/* Image Caption */}
                {images[currentImageIndex]?.caption && (
                  <p className="text-center text-gray-600 mt-3 text-sm luxury-sans-medium">
                    {images[currentImageIndex].caption}
                  </p>
                )}
              </div>

              {/* Thumbnail Navigation */}
              <div className="relative w-full -mx-4 sm:mx-0">
                <div className="overflow-x-auto overflow-y-hidden pb-3 sm:pb-4 px-4 sm:px-0 scrollbar-hide">
                  <div className="flex gap-2 sm:gap-3 snap-x snap-mandatory touch-pan-x select-none">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-sm overflow-hidden border-2 transition-all duration-300 snap-start touch-manipulation ${
                          index === currentImageIndex
                            ? "border-luxury-gold shadow-lg scale-105"
                            : "border-gray-200 hover:border-luxury-gold/50"
                        }`}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-contain object-center bg-gray-100"
                          onError={(e) => {
                            e.currentTarget.src = "legacy.png";
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Car Details */}
            <div className="space-y-6 sm:space-y-8 scroll-slide-right max-w-full">
              <h2 className="text-2xl sm:text-3xl md:text-4xl luxury-heading text-luxury-black mb-4 sm:mb-6 tracking-wide">
                {t("About This Vehicle")}
              </h2>
              {/* Description */}
              {description && (
                <div>
                  <div className="gold-separator w-20 sm:w-24 mb-4 sm:mb-6"></div>
                  <p className="text-base sm:text-lg font-playfair text-gray-700 leading-relaxed mb-4 sm:mb-6">
                    {t(description)}
                  </p>
                </div>
              )}

              {/* Specifications */}
              <div>
                <h3 className="text-xl sm:text-2xl luxury-heading text-luxury-black mb-3 sm:mb-4 tracking-wide">
                  {t("Specifications")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-3 sm:p-4 rounded-sm border border-luxury-gold/10"
                    >
                      <div className="flex justify-between items-center gap-2">
                        <span className="luxury-sans-medium text-gray-700 text-xs sm:text-sm">
                          {t(key)}
                        </span>
                        <span className="text-luxury-gold font-semibold text-xs sm:text-sm text-right">
                          {t(value)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl sm:text-2xl luxury-heading text-luxury-black mb-3 sm:mb-4 tracking-wide">
                  {t("Key Features")}
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 sm:space-x-4 group/feature"
                    >
                      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-luxury-gold/10 rounded-full flex items-center justify-center group-hover/feature:bg-luxury-gold transition-colors duration-300 mt-0.5 sm:mt-1">
                        <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-luxury-gold group-hover/feature:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <h4 className="luxury-sans-medium text-luxury-black mb-1 text-sm sm:text-base group-hover/feature:text-luxury-gold transition-colors duration-300">
                          {t(feature.title)}
                        </h4>
                        <p className="luxury-sans text-gray-600 text-xs sm:text-sm leading-relaxed">
                          {t(feature.description)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              {prices && prices.length > 0 && (
                <div>
                  <h3 className="text-xl sm:text-2xl luxury-heading text-luxury-black mb-3 sm:mb-4 tracking-wide">
                    {t("Pricing Options")}
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {prices.map((price, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-3 sm:p-4 rounded-sm border border-luxury-gold/10"
                      >
                        <div className="flex justify-between items-center gap-2">
                          <span className="luxury-sans-medium text-gray-700 text-sm sm:text-base">
                            {t(price.label)}
                          </span>
                          <span className="text-luxury-gold font-semibold text-sm sm:text-base text-right">
                            {price.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-center text-gray-600 luxury-sans-medium opacity-80 mt-2 sm:mt-3">
                    {t("Prices are Subject to VAT")}
                  </p>
                </div>
              )}

              {/* Reserve Button */}
              <div className="pt-4 sm:pt-6">
                <Link
                  to={reservationLink || "/contact"}
                  className="btn-luxury-premium text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-4 sm:py-5 group w-full justify-center touch-manipulation"
                >
                  <Calendar className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                  <span>{t("Reserve This Vehicle")}</span>
                  <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/last-call-to-action.png')`,
          }}
        />
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 mx-auto max-w-4xl sm:hidden">
          <div className="overflow-hidden rounded-[2rem] border border-luxury-gold/25 bg-black/45 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-[2px]">
            <div className="px-7 pt-16 pb-14 text-center">
              <h2 className="text-5xl luxury-display text-white leading-[0.95] tracking-wide">
                {t("Ready to Experience Luxury?")}
              </h2>

              <div className="mx-auto mt-8 mb-10 h-0.5 w-28 bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>

              <p className="mx-auto max-w-[320px] text-[18px] font-playfair leading-relaxed text-white/92">
                {t(
                  "Contact our concierge team to arrange your exclusive transportation experience.",
                )}
              </p>

              <Link
                to="/contact"
                className="mt-10 flex w-full items-center justify-center rounded-2xl border border-[#b88913] bg-[#c9971a] px-6 py-5 text-[18px] font-playfair font-semibold text-[#111111] shadow-[0_4px_16px_rgba(184,137,19,0.28)] transition-all duration-300 active:scale-[0.99]"
              >
                <Phone className="mr-3 h-7 w-7 flex-shrink-0" />
                <span>{t("Call Concierge")}</span>
              </Link>

              <div className="mt-12 flex flex-col gap-5 text-left">
                <a
                  href="tel:+351"
                  className="flex items-center gap-4 text-white/90"
                >
                  <Phone className="h-7 w-7 flex-shrink-0 text-luxury-gold" />
                  <span className="luxury-sans-medium text-[19px]">
                    +351
                  </span>
                </a>
                <a
                  href="mailto:info@chevalierlane.com"
                  className="flex items-center gap-4 text-white/90"
                >
                  <Mail className="h-7 w-7 flex-shrink-0 text-luxury-gold" />
                  <span className="luxury-sans-medium break-all text-[19px]">
                    info@chevalierlane.com
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 hidden max-w-4xl mx-auto text-center sm:block">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl luxury-display text-white mb-6 sm:mb-8 tracking-wider leading-tight">
            {t("Ready to Experience Luxury?")}
          </h2>

          <div className="w-24 sm:w-32 h-0.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto mb-6 sm:mb-8"></div>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-playfair text-white/90 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed font-medium px-4">
            {t("Contact our concierge team to arrange your exclusive transportation experience.")}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-stretch sm:items-center">
            <Link
              to="/contact"
              className="btn-luxury-premium text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-4 sm:py-5 group w-full sm:w-auto justify-center touch-manipulation"
            >
              <Phone className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
              <span>{t("Call Concierge")}</span>
            </Link>
            <div className="flex flex-col gap-3 sm:gap-4 text-center sm:text-left">
              <a
                href="tel:+351"
                className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 text-white/80 hover:text-luxury-gold transition-colors touch-manipulation"
              >
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-luxury-gold flex-shrink-0" />
                <span className="luxury-sans-medium text-sm sm:text-base">
                  +351
                </span>
              </a>
              <a
                href="mailto:info@chevalierlane.com"
                className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 text-white/80 hover:text-luxury-gold transition-colors touch-manipulation"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-luxury-gold flex-shrink-0" />
                <span className="luxury-sans-medium text-sm sm:text-base break-all sm:break-normal">
                  info@chevalierlane.com
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
