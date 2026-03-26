import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Clock, Shield, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export const Route = createFileRoute("/services/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const serviceCards = [
    {
      title: "One-Way",
      description:
        "Direct point-to-point chauffeur service between any two destinations with comfort.",
      image: "/one-13.png",
      cta: "Find out more",
      to: "/services/one-way",
    },
    {
      title: "Airports",
      description:
        "Luxury airport transfers with professional meet & greet and real-time flight monitoring.",
      image: "/air-trans.png",
      cta: "Find out more",
      to: "/services/airports",
    },
    {
      title: "By the Hour",
      description:
        "Flexible chauffeur service for business meetings, shopping, dining, or city travel.",
      image: "/by-the-hour.png",
      cta: "Find out more",
      to: "/services/business",
    },
    {
      title: "Full Day",
      description:
        "A dedicated chauffeur and vehicle for your entire day, tailored to your schedule.",
      image: "/full-day.png",
      cta: "Find out more",
      to: "/services/business",
    },
    {
      title: "Weddings",
      description:
        "Elegant classic and luxury vehicles with professional chauffeurs for your special day.",
      image: "/wed-trans.png",
      cta: "Find out more",
      to: "/services/weddings",
    },
    {
      title: "Vineyard Tours",
      description:
        "Private chauffeur-driven wine tours through Portugal's finest vineyards and estates.",
      image: "/exp.png",
      cta: "Find out more",
      to: "/services/tours",
    },
    {
      title: "Events & Special Occasions",
      description:
        "Discreet luxury transportation for galas, celebrations, private events, and VIP arrivals.",
      image: "/excl-trans.png",
      cta: "Contact us",
      to: "/contact",
    },
    {
      title: "For Film & Editorial",
      description:
        "Luxury vehicles available for film productions, editorial shoots, campaigns, and creative projects.",
      image: "/wed-6.png",
      cta: "Contact us",
      to: "/contact",
    },
  ];

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

      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-start overflow-hidden text-white px-4 pt-8 md:pt-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(184, 134, 11, 0.1) 0%, rgba(26, 26, 26, 0.45) 50%, rgba(212, 175, 55, 0.1) 100%),
              linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)),
              url('/cloud-14.png')
            `,
          }}
        />
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgba(184,134,11,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        <div className="relative max-w-4xl mx-auto pt-1 md:pt-2 text-center space-y-6 md:space-y-7">
          <h1 className="text-4xl md:text-6xl lg:text-7xl luxury-display tracking-wider leading-tight drop-shadow-2xl">
            {t("Our Services")}
          </h1>
          <div className="gold-separator mx-auto w-64"></div>
          <p className="text-lg md:text-xl lg:text-2xl font-playfair text-white/90 leading-relaxed font-medium tracking-wide">
            {t(
              "Discover the full spectrum of luxury transportation experiences crafted for discerning individuals who demand nothing less than perfection.",
            )}
          </p>
        </div>
      </section>

      {/* Main Services Section */}
      <section
        id="services"
        className="py-32 px-4 bg-black relative overflow-hidden"
      >
        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 opacity-3 bg-[linear-gradient(45deg,transparent_25%,rgba(184,134,11,0.03)_25%,rgba(184,134,11,0.03)_50%,transparent_50%,transparent_75%,rgba(184,134,11,0.03)_75%)] bg-[length:24px_24px]"></div>
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_3px_3px,rgba(184,134,11,0.04)_1px,transparent_0)] bg-[length:28px_28px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 scroll-fade-in">
            <h2 className="text-5xl md:text-7xl luxury-display text-white mb-6 tracking-wider">
              {t("Complete Service Portfolio")}
            </h2>
            <div className="gold-separator mx-auto w-64 mb-4"></div>
            <p className="text-xl font-playfair text-white/70 max-w-4xl mx-auto leading-relaxed">
              {t(
                "From everyday luxury transportation to once-in-a-lifetime experiences, our comprehensive service portfolio ensures every journey reflects the pinnacle of sophistication and excellence.",
              )}
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-luxury-gold/15 bg-luxury-gold/10 md:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map((service, index) => (
              <div
                key={service.title}
                className={`scroll-fade-in bg-white/90 p-5 backdrop-blur-sm ${index >= 4 ? "border-t border-luxury-gold/10" : ""}`}
              >
                <Link
                  to={service.to}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-luxury-gold/10 bg-gradient-to-br from-white via-luxury-ivory to-luxury-pearl shadow-luxury-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={service.image}
                      alt={t(service.title)}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "legacy.png";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 via-luxury-black/10 to-transparent" />
                  </div>

                  <div className="flex flex-1 flex-col items-center px-6 py-7 text-center">
                    <h3 className="mb-3 text-3xl luxury-heading text-luxury-black">
                      {t(service.title)}
                    </h3>
                    <p className="mb-6 min-h-[108px] text-base font-playfair leading-relaxed text-gray-700">
                      {t(service.description)}
                    </p>
                    <div className="mt-auto inline-flex min-w-[170px] items-center justify-center rounded-md border border-[#d8c9ad] bg-[#efe4d1] px-6 py-2.5 text-base font-playfair font-semibold text-[#7b6948] transition-all duration-300 group-hover:border-luxury-gold group-hover:bg-[#e8d7bb] group-hover:text-luxury-black">
                      <span>{t(service.cta)}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-luxury-white via-luxury-ivory to-luxury-pearl relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl luxury-display text-luxury-black mb-8 tracking-wider">
              {t("Why Choose Chevalier Lane")}
            </h2>
            <div className="gold-separator mx-auto mb-10 w-56"></div>
            <p className="text-xl font-playfair text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {t(
                "Experience the difference that comes from over two decades of luxury transportation excellence and an unwavering commitment to perfection in every detail.",
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Uncompromising Safety",
                description:
                  "Every vehicle undergoes rigorous maintenance and our chauffeurs are extensively trained professionals.",
              },
              {
                icon: Award,
                title: "Proven Excellence",
                description:
                  "Recognized for outstanding service with a track record of satisfied clients worldwide.",
              },
              {
                icon: Clock,
                title: "Punctual Service",
                description:
                  "We understand that your time is valuable and maintain impeccable timing standards.",
              },
              {
                icon: Users,
                title: "Personalized Attention",
                description:
                  "Each client receives bespoke service tailored to their unique preferences and requirements.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`group text-center p-8 bg-white rounded-sm shadow-luxury-soft hover:shadow-luxury transition-all duration-500 fade-in-up border border-luxury-gold/10 scroll-scale-in stagger-${index + 1}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-luxury-gold/10 to-luxury-gold/5 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-8 w-8 text-luxury-gold" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
                <h3 className="text-xl luxury-heading text-luxury-black mb-4 group-hover:text-luxury-gold transition-colors duration-300">
                  {t(item.title)}
                </h3>
                <p className="luxury-sans text-gray-600 text-sm leading-relaxed">
                  {t(item.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient bridge: ivory → black */}
      <div className="h-24 bg-gradient-to-b from-luxury-pearl to-black" />

    </div>
  );
}
