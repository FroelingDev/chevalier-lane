import { Link } from "@tanstack/react-router";
import { Calendar, Users } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function LastCallToAction() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-32 px-4 relative overflow-hidden">
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
              {t("Reserve Your Place")}
            </h2>

            <div className="mx-auto mt-8 mb-10 h-0.5 w-28 bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>

            <p className="mx-auto max-w-[320px] text-[18px] font-playfair leading-relaxed text-white/92">
              {t(
                "Join an exclusive circle of discerning individuals who understand that true luxury is not just about the destination, but the journey itself.",
              )}
            </p>

            <Link
              to="/services"
              className="mt-10 flex w-full items-center justify-center rounded-2xl border border-[#b88913] bg-[#c9971a] px-6 py-5 text-[18px] font-playfair font-semibold text-[#111111] shadow-[0_4px_16px_rgba(184,137,19,0.28)] transition-all duration-300 active:scale-[0.99]"
            >
              <Calendar className="mr-3 h-7 w-7 flex-shrink-0" />
              <span>{t("Book Your Experience")}</span>
            </Link>

            <Link
              to="/services"
              className="mt-4 flex w-full items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-6 py-5 text-[18px] font-playfair font-semibold text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-300 active:scale-[0.99]"
            >
              <Users className="mr-3 h-7 w-7 flex-shrink-0" />
              <span>{t("Learn More")}</span>
            </Link>

            <div className="mt-12 grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-3xl luxury-display text-luxury-gold">
                  24/7
                </div>
                <div className="luxury-sans-medium text-white/70 text-sm tracking-wide">
                  {t("Available Service")}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl luxury-display text-luxury-gold">
                  {t("Premium")}
                </div>
                <div className="luxury-sans-medium text-white/70 text-sm tracking-wide">
                  {t("Fleet Selection")}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl luxury-display text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold to-luxury-champagne">
                  {t("Elite")}
                </div>
                <div className="luxury-sans-medium text-white/70 text-sm tracking-wide">
                  {t("Client Experience")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center hidden sm:block">
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
  );
}
