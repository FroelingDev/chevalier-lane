import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Phone, Mail } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

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
}: ServiceDetailProps) {
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
      ".scroll-fade-in, .scroll-scale-in, .scroll-slide-left, .scroll-slide-right"
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

        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-luxury-black/40 to-transparent md:hidden" />

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 hidden md:block opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgba(184,134,11,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>

        {/* Hero Content Overlay - title center top, subtitle bottom left, transparent buttons */}
        <div className="absolute inset-0">
          {/* Title - Center Top */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-center max-w-4xl px-4">
            <h1 className="text-2xl md:text-4xl lg:text-5xl text-white tracking-wider leading-tight drop-shadow-2xl">
              {title}
            </h1>
            <div className="gold-separator mx-auto w-56 mt-4"></div>
          </div>

          {/* Subtitle - Bottom Left */}
          <div className="absolute bottom-8 md:bottom-16 left-4 md:left-8 lg:left-12 max-w-md">
            <div className="bg-luxury-black/20 backdrop-blur-md border border-luxury-gold/30 rounded-lg px-6 py-4 shadow-2xl">
              <p className="text-base md:text-xl lg:text-2xl text-white leading-relaxed tracking-wider">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Transparent Buttons - Bottom Right */}
          <div className="absolute bottom-8 md:bottom-16 right-4 md:right-8 lg:right-12 flex flex-col sm:flex-row gap-4">
            <Link
              to={bookingLink || "/contact"}
              className="bg-luxury-gold/10 backdrop-blur-sm border border-luxury-gold/30 text-white hover:bg-luxury-gold/20 hover:border-luxury-gold/50 transition-all duration-300 text-lg md:text-xl px-8 md:px-10 py-4 group rounded-lg"
            >
              <Phone className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
              <span>Book Your Service</span>
            </Link>
            <button
              onClick={() =>
                document
                  .getElementById("service-details")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-transparent border border-luxury-gold/30 text-white hover:bg-luxury-gold/10 hover:border-luxury-gold/50 transition-all duration-300 text-lg md:text-xl px-8 md:px-10 py-4 group rounded-lg"
            >
              <ArrowRight className="mr-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
              <span>Learn More</span>
            </button>
          </div>
        </div>
      </section>

      {/* Optional section directly under hero title (used for One-Way page, etc.) */}
      {preDetailsSection}

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
                  : "bg-gradient-to-br from-black/90 via-[#111111]/95 to-luxury-black/90 backdrop-blur-md rounded-3xl border border-luxury-gold/40 shadow-[0_28px_90px_rgba(0,0,0,0.7)] px-8 md:px-12 py-10 md:py-14"
              }
            >
              <div
                className={`grid gap-16 items-center ${
                  hasMainImage ? "lg:grid-cols-2" : ""
                } ${
                  hasMainImage && !imageOnLeft ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <div
                  className={`space-y-8 ${
                    hasMainImage
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
                        Prices are Subject to VAT
                      </p>
                    </div>
                  )}

                  <div className="pt-6">
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
                </div>
                {hasMainImage && (
                  <div
                    className={`relative ${
                      imageOnLeft ? "order-1 lg:order-2" : "order-1 lg:order-1"
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

            {/* Full-width additional content section */}
            {additionalContent && (
              <div className="mt-20 scroll-fade-in">
                <div className="space-y-12">{additionalContent}</div>
              </div>
            )}
          </div>
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
            Ready to Experience Luxury?
          </h2>

          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto mb-8"></div>

          <p className="text-xl md:text-2xl font-playfair text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            Contact our concierge team to discuss your transportation needs and
            discover how we can elevate your next journey to extraordinary
            heights.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
            <Link
              to="/contact"
              className="btn-luxury-premium text-xl px-12 py-5 group"
            >
              <Phone className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
              <span>Contact Us</span>
            </Link>
            <div className="flex flex-col sm:flex-row gap-4 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-3 text-white/80">
                <Phone className="h-5 w-5 text-luxury-gold" />
                <span className="luxury-sans-medium">+34 607 326 237</span>
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
                Always Available
              </div>
            </div>
            <div className="group space-y-4 scroll-scale-in stagger-2">
              <div className="relative">
                <div className="text-4xl md:text-5xl luxury-display text-luxury-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold to-luxury-champagne">
                    Instant
                  </span>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
              <div className="luxury-sans-medium text-white/80 text-lg tracking-wide">
                Quote Response
              </div>
            </div>
            <div className="group space-y-4 scroll-scale-in stagger-3">
              <div className="relative">
                <div className="text-4xl md:text-5xl luxury-display text-luxury-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                  Global
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
              <div className="luxury-sans-medium text-white/80 text-lg tracking-wide">
                Service Coverage
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
