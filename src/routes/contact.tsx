import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  ThumbsUp,
  Instagram,
  Linkedin,
} from "lucide-react";
import LastCallToAction from "@/components/LastCallToAction";
import { useLanguage } from "@/components/LanguageProvider";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  INSTAGRAM_URL,
  LINKEDIN_URL,
} from "@/lib/contact";

export const Route = createFileRoute("/contact")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }
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
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(184, 134, 11, 0.1) 0%, rgba(26, 26, 26, 0.6) 50%, rgba(212, 175, 55, 0.1) 100%),
              linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)),
              url('/contact.png')
            `,
          }}
        />

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgba(184,134,11,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="text-center">
              <div className="scroll-fade-in">
                <h1 className="text-5xl md:text-7xl xl:text-8xl luxury-display text-white mb-8 tracking-wider leading-tight drop-shadow-2xl">
                  {t("Contact Us")}
                </h1>
                <div className="gold-separator mx-auto w-64 mb-8"></div>
                <p className="text-xl md:text-2xl lg:text-3xl font-playfair text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
                  {t("Ready to experience unparalleled luxury transportation?")}
                  <span className="text-luxury-gold italic">
                    {" "}
                    {t("Get in touch with us today.")}
                  </span>
                </p>
              </div>

              <div className="scroll-scale-in grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="backdrop-blur-md bg-black/30 p-8 rounded-lg border border-luxury-gold/30 shadow-2xl text-center group hover:bg-black/40 transition-all duration-500">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-luxury-gold/20 rounded-full mb-6 group-hover:bg-luxury-gold/30 transition-all duration-300">
                    <Phone className="h-8 w-8 text-luxury-gold" />
                  </div>
                  <h3 className="text-2xl luxury-heading text-white mb-4">
                    {t("Call Us")}
                  </h3>
                  <a
                    href={CONTACT_PHONE_HREF}
                    className="text-lg text-white/90 font-playfair mb-2 inline-block transition-colors hover:text-luxury-gold"
                  >
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                  <p className="text-sm text-white/70">{t("24/7 Available")}</p>
                </div>

                <div className="hidden md:block" aria-hidden="true" />

                <div className="backdrop-blur-md bg-black/30 p-8 rounded-lg border border-luxury-gold/30 shadow-2xl text-center group hover:bg-black/40 transition-all duration-500">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-luxury-gold/20 rounded-full mb-6 group-hover:bg-luxury-gold/30 transition-all duration-300">
                    <Mail className="h-8 w-8 text-luxury-gold" />
                  </div>
                  <h3 className="text-2xl luxury-heading text-white mb-4">
                    {t("Email Us")}
                  </h3>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-lg text-white/90 font-playfair mb-2 inline-block transition-colors hover:text-luxury-gold"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  <p className="text-sm text-white/70">
                    {t("We respond within 2 hours")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white relative overflow-hidden">
        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 opacity-3 bg-[linear-gradient(45deg,transparent_25%,rgba(184,134,11,0.03)_25%,rgba(184,134,11,0.03)_50%,transparent_50%,transparent_75%,rgba(184,134,11,0.03)_75%)] bg-[length:24px_24px]"></div>
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_3px_3px,rgba(184,134,11,0.04)_1px,transparent_0)] bg-[length:28px_28px]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20 scroll-fade-in">
            <h2 className="text-5xl md:text-7xl luxury-display text-luxury-black mb-6 tracking-wider">
              {t("Send Us a Message")}
            </h2>
            <div className="gold-separator mx-auto w-64 mb-8"></div>
            <p className="text-xl font-playfair text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {t(
                "Whether you need transportation for a special occasion, business meeting, or simply wish to experience the pinnacle of luxury travel, we're here to make it happen."
              )}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="scroll-slide-left">
              <div className="bg-white rounded-sm shadow-luxury-soft p-8 border border-luxury-gold/10 hover:shadow-luxury transition-all duration-500">
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent"></div>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-luxury-gold mx-auto mb-6" />
                    <h3 className="text-2xl luxury-heading text-luxury-black mb-4">
                      {t("Message Sent Successfully!")}
                    </h3>
                    <p className="text-lg font-playfair text-gray-700">
                      {t(
                        "Thank you for contacting us. We'll get back to you within 2 hours."
                      )}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm luxury-sans-medium text-luxury-black mb-2"
                        >
                          {t("Full Name *")}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-luxury-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold transition-all duration-300 bg-luxury-ivory/50"
                          placeholder={t("Your full name")}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm luxury-sans-medium text-luxury-black mb-2"
                        >
                          {t("Email Address *")}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-luxury-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold transition-all duration-300 bg-luxury-ivory/50"
                          placeholder={t("your.email@example.com")}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm luxury-sans-medium text-luxury-black mb-2"
                        >
                          {t("Phone Number")}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-luxury-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold transition-all duration-300 bg-luxury-ivory/50"
                          placeholder={CONTACT_PHONE_DISPLAY}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm luxury-sans-medium text-luxury-black mb-2"
                        >
                          {t("Subject *")}
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-luxury-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold transition-all duration-300 bg-luxury-ivory/50"
                        >
                          <option value="">{t("Select a subject")}</option>
                          <option value="booking">
                            {t("Booking Inquiry")}
                          </option>
                          <option value="corporate">
                            {t("Corporate Services")}
                          </option>
                          <option value="special-event">
                            {t("Special Event")}
                          </option>
                          <option value="general">
                            {t("General Information")}
                          </option>
                          <option value="feedback">{t("Feedback")}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm luxury-sans-medium text-luxury-black mb-2"
                      >
                        {t("Message *")}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-luxury-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold transition-all duration-300 bg-luxury-ivory/50 resize-none"
                        placeholder={t(
                          "Please describe your requirements and any specific details..."
                        )}
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="btn-luxury-premium w-full text-lg group"
                      >
                        <span>{t("Send Message")}</span>
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                      </button>
                    </div>
                  </form>
                )}

                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent"></div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="scroll-slide-right space-y-8">
              <div className="bg-gradient-to-br from-white via-luxury-ivory to-luxury-pearl rounded-sm shadow-luxury-soft p-8 border border-luxury-gold/10">
                <h3 className="text-2xl luxury-heading text-luxury-black mb-6">
                  {t("Get in Touch")}
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-luxury-gold" />
                    </div>
                    <div>
                      <h4 className="luxury-sans-medium text-luxury-black mb-1">
                        {t("Phone")}
                      </h4>
                      <a
                        href={CONTACT_PHONE_HREF}
                        className="text-gray-700 font-playfair transition-colors hover:text-luxury-gold"
                      >
                        {CONTACT_PHONE_DISPLAY}
                      </a>
                      <p className="text-sm text-gray-600">
                        {t("Available 24/7 for urgent requests")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-luxury-gold" />
                    </div>
                    <div>
                      <h4 className="luxury-sans-medium text-luxury-black mb-1">
                        {t("Email")}
                      </h4>
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-gray-700 font-playfair transition-colors hover:text-luxury-gold"
                      >
                        {CONTACT_EMAIL}
                      </a>
                      <p className="text-sm text-gray-600">
                        {t("We respond within 2 hours")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center">
                      <Instagram className="h-6 w-6 text-luxury-gold" />
                    </div>
                    <div>
                      <h4 className="luxury-sans-medium text-luxury-black mb-1">
                        Instagram
                      </h4>
                      <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-700 font-playfair transition-colors hover:text-luxury-gold"
                      >
                        @chevalierlane
                      </a>
                      <p className="text-sm text-gray-600">
                        {t("Follow our latest arrivals and journeys")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center">
                      <Linkedin className="h-6 w-6 text-luxury-gold" />
                    </div>
                    <div>
                      <h4 className="luxury-sans-medium text-luxury-black mb-1">
                        LinkedIn
                      </h4>
                      <a
                        href={LINKEDIN_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-700 font-playfair transition-colors hover:text-luxury-gold"
                      >
                        Chevalier Lane
                      </a>
                      <p className="text-sm text-gray-600">
                        {t("Connect with our boutique chauffeur brand")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-luxury-gold" />
                    </div>
                    <div>
                      <h4 className="luxury-sans-medium text-luxury-black mb-1">
                        {t("Business Hours")}
                      </h4>
                      <p className="text-gray-700 font-playfair">
                        {t("Monday - Sunday")}
                      </p>
                      <p className="text-sm text-gray-600">
                        {t("24/7 Service Available")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-white rounded-sm shadow-luxury-soft p-8 border border-luxury-gold/10">
                <h3 className="text-2xl luxury-heading text-luxury-black mb-6">
                  {t("Why Choose Us?")}
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl luxury-display text-luxury-gold mb-2">
                      24/7
                    </div>
                    <div className="luxury-sans-medium text-luxury-black text-sm">
                      {t("Service")}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <ThumbsUp className="h-12 w-12 text-luxury-gold" />
                    </div>
                    <div className="luxury-sans-medium text-luxury-black text-sm">
                      {t("Satisfaction")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LastCallToAction />
    </div>
  );
}
