import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Phone, Mail } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useLanguage } from "./LanguageProvider";

interface ServiceFeature {
  title: string;
  items: string[];
}

interface PricingItem {
  name: string;
  price: string;
}

interface ServiceDetailProps {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  mainImage?: string;
  mainImageAlt?: string;
  features: ServiceFeature[];
  pricing?: PricingItem[];
  ctaText: string;
  bookingLink?: string;
  imageOnLeft?: boolean;
  additionalContent?: ReactNode;
  preDetailsSection?: ReactNode;
  mainServiceImage?: string;
  whyChooseUsContent?: ReactNode;
}

export function ServiceDetail({
  title,
  subtitle,
  description,
  heroImage,
  mainImage,
  mainImageAlt,
  features,
  pricing,
  ctaText,
  bookingLink,
  imageOnLeft = true,
  additionalContent,
  preDetailsSection,
  mainServiceImage,
  whyChooseUsContent,
}: ServiceDetailProps) {
  const { t } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const hasMainImage = Boolean(mainImage);

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

  return (
    <div className="min-h-screen">
      {/* Scroll Progress Indicator */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Image Section with overlaid text */}
      <section className="relative h-[50vh] min-h-[400px] md:h-[70vh] md:min-h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
              url('${heroImage}')
            `,
          }}
        />

        <img
          src={heroImage}
          alt={`${title} hero`}
          className="absolute inset-0 h-full w-full object-cover object-center md:hidden"
          onError={(e) => {
            e.currentTarget.src = "legacy.png";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 hidden md:block opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgba(184,134,11,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>

        {/* Hero Content Overlay - single stack inspired layout */}
        <div className="absolute inset-0 flex items-end md:items-center">
          <div className="w-full px-4 md:px-10 lg:px-16 pb-10 md:pb-16 lg:pb-20">
            <div className="max-w-3xl space-y-6">
              <div className="space-y-3">
                <h1 className="text-2xl md:text-4xl lg:text-5xl text-white tracking-[0.08em] leading-tight drop-shadow-2xl uppercase">
                  {title}
                </h1>
                <p className="text-md md:text-xl text-white/90 tracking-wide drop-shadow-lg">
                  {subtitle}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to={bookingLink || "/contact"}
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto rounded-full border-2 border-white/80 text-white px-5 py-2 sm:px-8 sm:py-3 text-base sm:text-lg tracking-wide uppercase bg-white/5 hover:bg-white/10 hover:border-white transition-all duration-300"
                >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Enquire Now</span>
                </Link>
                <button
                  onClick={() =>
                    document
                      .getElementById("service-details")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto rounded-full border-2 border-white/80 text-white px-5 py-2 sm:px-8 sm:py-3 text-base sm:text-lg tracking-wide uppercase bg-white/5 hover:bg-white/10 hover:border-white transition-all duration-300"
                >
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Book Online</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Optional section directly under hero title (used for One-Way page, etc.) */}
      {preDetailsSection}

      {/* Gold Separator */}
      {preDetailsSection && (
        <section className="bg-luxury-black py-6">
          <div className="max-w-5xl mx-auto px-6">
            <div className="h-[3px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent rounded-full shadow-[0_0_30px_rgba(184,134,11,0.5)]" />
          </div>
        </section>
      )}

      {/* Main Service Section */}
      <section
        id="service-details"
        className="pt-16 pb-32 px-4 relative overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${mainServiceImage || "/corp.png"}')`,
          }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 opacity-3 bg-[linear-gradient(45deg,transparent_25%,rgba(184,134,11,0.03)_25%,rgba(184,134,11,0.03)_50%,transparent_50%,transparent_75%,rgba(184,134,11,0.03)_75%)] bg-[length:24px_24px]"></div>
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_3px_3px,rgba(184,134,11,0.04)_1px,transparent_0)] bg-[length:28px_28px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`scroll-fade-in ${hasMainImage ? "" : "max-w-4xl mx-auto"}`}
          >
            <div
              className={
                hasMainImage
                  ? ""
                  : "bg-luxury-black/60 backdrop-blur-md border-2 border-luxury-gold/60 rounded-3xl px-8 md:px-12 py-10 md:py-14 shadow-[0_0_30px_rgba(184,134,11,0.3)]"
              }
            >
              <div
                className={`grid gap-16 items-center ${
                  hasMainImage && whyChooseUsContent
                    ? "lg:grid-cols-3"
                    : hasMainImage
                      ? "lg:grid-cols-2"
                      : ""
                } ${
                  hasMainImage && !imageOnLeft ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <div
                  className={`space-y-8 ${
                    hasMainImage && whyChooseUsContent
                      ? "lg:col-span-1"
                      : hasMainImage
                        ? imageOnLeft
                          ? "order-2 lg:order-1"
                          : "order-2 lg:order-2"
                        : "max-w-3xl mx-auto text-center"
                  }`}
                >
                  <div>
                    <h2
                      className={`text-4xl md:text-5xl luxury-heading text-luxury-black mb-6 tracking-wide ${
                        hasMainImage ? "" : "text-center text-white"
                      }`}
                    >
                      {title}
                    </h2>
                    <div
                      className={`gold-separator w-32 mb-6 ${
                        hasMainImage ? "" : "mx-auto"
                      }`}
                    ></div>
                    <p
                      className={`text-lg font-playfair text-gray-700 leading-relaxed mb-6 ${
                        hasMainImage ? "" : "mx-auto max-w-2xl text-white/85"
                      }`}
                    >
                      {description}
                    </p>
                  </div>

                  <div
                    className={`${
                      features.length === 1
                        ? "flex justify-center"
                        : "grid md:grid-cols-2 gap-6 place-items-center"
                    } ${hasMainImage ? "" : "max-w-5xl mx-auto"}`}
                  >
                    {features.map((featureSection, sectionIdx) => (
                      <div
                        key={sectionIdx}
                        className={`space-y-4 ${
                          features.length === 1
                            ? "text-center max-w-sm"
                            : "text-center md:text-left"
                        }`}
                      >
                        <h3
                          className={`text-xl luxury-heading ${
                            hasMainImage ? "text-luxury-black" : "text-white"
                          }`}
                        >
                          {featureSection.title}
                        </h3>
                        <ul className="space-y-3">
                          {featureSection.items.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-center space-x-3 group/feature"
                            >
                              <div className="flex-shrink-0 w-5 h-5 bg-luxury-gold/10 rounded-full flex items-center justify-center group-hover/feature:bg-luxury-gold transition-colors duration-300">
                                <Check className="h-3 w-3 text-luxury-gold group-hover/feature:text-white transition-colors duration-300" />
                              </div>
                              <span
                                className={`luxury-sans text-sm transition-colors duration-300 ${
                                  hasMainImage
                                    ? "text-gray-700 group-hover/feature:text-luxury-black"
                                    : "text-white/80 group-hover/feature:text-luxury-gold"
                                }`}
                              >
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {pricing && pricing.length > 0 && (
                    <div className="space-y-4 mt-8">
                      <h3
                        className={`text-xl luxury-heading ${
                          hasMainImage ? "text-luxury-black" : "text-white"
                        }`}
                      >
                        Pricing Options
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {pricing?.map((item, idx) => (
                          <div
                            key={idx}
                            className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10"
                          >
                            <div className="flex justify-between items-center">
                              <span className="luxury-sans-medium text-gray-700">
                                {item.name}
                              </span>
                              <span className="text-luxury-gold font-semibold">
                                {item.price}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-center text-gray-600 luxury-sans-medium opacity-80">
                        {t("Prices are Subject to VAT")}
                      </p>
                    </div>
                  )}
                </div>
                {hasMainImage && (
                  <div
                    className={`relative ${
                      hasMainImage && whyChooseUsContent
                        ? "lg:col-span-1"
                        : imageOnLeft
                          ? "order-1 lg:order-2"
                          : "order-1 lg:order-1"
                    }`}
                  >
                    <img
                      src={mainImage}
                      alt={mainImageAlt}
                      className="w-full h-96 object-cover rounded-sm shadow-luxury"
                      onError={(e) => {
                        e.currentTarget.src = "legacy.png";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {whyChooseUsContent && (
              <div className="lg:col-span-1 space-y-6 mt-16">
                <div className="bg-gradient-to-br from-luxury-gold/18 via-luxury-gold/14 to-luxury-champagne/18 backdrop-blur-sm rounded-2xl border-2 border-luxury-gold/38 p-8 shadow-luxury-soft">
                  <h3 className="text-2xl md:text-3xl luxury-heading text-white mb-6 text-center">
                    {t("Why Choose Us")}
                  </h3>
                  <div className="gold-separator w-24 mx-auto mb-6"></div>
                  <div className="space-y-4">{whyChooseUsContent}</div>
                </div>
              </div>
            )}

            <div className="pt-6 flex justify-center">
              <Link
                to={bookingLink || "/contact"}
                className={`btn-luxury-premium text-lg group ${
                  hasMainImage ? "" : "mx-auto"
                }`}
              >
                <span>{ctaText}</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
              </Link>
            </div>
            {/* Full-width additional content section */}
            {additionalContent && (
              <div className="mt-20 scroll-fade-in">
                <div className="space-y-12">{additionalContent}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gold Separator */}
      <section className="bg-luxury-black py-6">
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-[3px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent rounded-full shadow-[0_0_30px_rgba(184,134,11,0.5)]" />
        </div>
      </section>

      {/* Contact CTA Section */}
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
            {t("Ready to Experience Luxury?")}
          </h2>

          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto mb-8"></div>

          <p className="text-xl md:text-2xl font-playfair text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            {t(
              "Contact our concierge team to discuss your transportation needs and discover how we can elevate your next journey to extraordinary heights.",
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
            <Link
              to="/contact"
              className="btn-luxury-premium text-xl px-12 py-5 group"
            >
              <Phone className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
              <span>{t("Contact Us")}</span>
            </Link>
            <div className="flex flex-col sm:flex-row gap-4 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-3 text-white/80">
                <Phone className="h-5 w-5 text-luxury-gold" />
                <span className="luxury-sans-medium">+34 649 64 29 98</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3 text-white/80">
                <Mail className="h-5 w-5 text-luxury-gold" />
                <span className="luxury-sans-medium">
                  info@chevalierlane.com
                </span>
              </div>
            </div>
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
                {t("Always Available")}
              </div>
            </div>
            <div className="group space-y-4 scroll-scale-in stagger-2">
              <div className="relative">
                <div className="text-4xl md:text-5xl luxury-display text-luxury-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold to-luxury-champagne">
                    {t("Instant")}
                  </span>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
              <div className="luxury-sans-medium text-white/80 text-lg tracking-wide">
                {t("Quote Response")}
              </div>
            </div>
            <div className="group space-y-4 scroll-scale-in stagger-3">
              <div className="relative">
                <div className="text-4xl md:text-5xl luxury-display text-luxury-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                  {t("Global")}
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
              <div className="luxury-sans-medium text-white/80 text-lg tracking-wide">
                {t("Service Coverage")}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
