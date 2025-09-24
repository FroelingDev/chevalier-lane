import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Check, Calendar, Users, Clock, Shield, Award, Phone, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/services/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scroll = totalScroll / windowHeight
      setScrollProgress(scroll * 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll('.scroll-fade-in, .scroll-scale-in, .scroll-slide-left, .scroll-slide-right')
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

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
              linear-gradient(135deg, rgba(184, 134, 11, 0.1) 0%, rgba(26, 26, 26, 0.4) 50%, rgba(212, 175, 55, 0.1) 100%),
              linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)),
              url('/services-header.png')
            `
          }}
        />

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgba(184,134,11,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <div className="backdrop-blur-md bg-black/30 p-12 rounded-lg border border-luxury-gold/30 shadow-2xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl luxury-display text-white tracking-wider leading-tight drop-shadow-2xl mb-6">
                Our Services
              </h1>
              <div className="gold-separator mx-auto w-64 mb-8"></div>
              <p className="text-xl md:text-2xl lg:text-3xl font-playfair text-white/90 mb-8 leading-relaxed font-medium tracking-wider drop-shadow-lg">
                Discover the <span className="text-luxury-gold italic">full spectrum</span> of luxury transportation experiences crafted for discerning individuals who demand nothing less than perfection.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/booking/one-way" className="btn-luxury-premium text-xl px-12 py-5 group">
                  <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                  <span>Book Your Service</span>
                </Link>
                <button
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-luxury-outline-premium text-xl px-12 py-5 group"
                >
                  <ArrowRight className="mr-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                  <span>Explore Services</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section id="services" className="py-32 px-4 bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white relative overflow-hidden">
        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 opacity-3 bg-[linear-gradient(45deg,transparent_25%,rgba(184,134,11,0.03)_25%,rgba(184,134,11,0.03)_50%,transparent_50%,transparent_75%,rgba(184,134,11,0.03)_75%)] bg-[length:24px_24px]"></div>
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_3px_3px,rgba(184,134,11,0.04)_1px,transparent_0)] bg-[length:28px_28px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 scroll-fade-in">
            <h2 className="text-5xl md:text-7xl luxury-display text-luxury-black mb-6 tracking-wider">
              Complete Service Portfolio
            </h2>
            <div className="gold-separator mx-auto w-64 mb-4"></div>
            <p className="text-xl font-playfair text-gray-700 max-w-4xl mx-auto leading-relaxed">
              From everyday luxury transportation to once-in-a-lifetime experiences, our comprehensive service portfolio
              ensures every journey reflects the pinnacle of sophistication and excellence.
            </p>
          </div>

          <div className="space-y-32">
            {/* One-Way Transportation */}
            <div className="scroll-fade-in">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <img
                    src="/private-chauffeur.png"
                    alt="One-Way Transportation"
                    className="w-full h-96 object-cover rounded-sm shadow-luxury"
                    onError={(e) => {
                      e.currentTarget.src = 'legacy.png'
                    }}
                  />
                </div>
                <div className="order-1 lg:order-2 space-y-8">
                  <div>
                    <h3 className="text-4xl md:text-5xl luxury-heading text-luxury-black mb-6 tracking-wide">
                      One-Way Transportation
                    </h3>
                    <div className="gold-separator w-32 mb-6"></div>
                    <p className="text-lg font-playfair text-gray-700 leading-relaxed mb-6">
                      Experience seamless one-way transportation with our premium chauffeur service. Whether you need transportation from the airport to your hotel, between cities, or any other point-to-point journey, we provide comfortable, reliable, and sophisticated transport solutions tailored to your schedule and preferences.
                    </p>
                    <p className="text-sm font-playfair text-gray-600 italic">
                      Flexible point-to-point luxury transportation solutions
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-xl luxury-heading text-luxury-black">Vehicle Options</h4>
                      <ul className="space-y-3">
                        {[
                          "Modern Luxury: Bentley Mulsanne, Mercedes S-Class, Mercedes Maybach",
                          "Classic Collection: Rolls-Royce Silver Shadow, Rolls-Royce Silver Cloud II, Oldsmobile Super 88",
                          "Professional Chauffeur Service",
                          "Real-time GPS Tracking",
                          "Flexible Scheduling"
                        ].map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-3 group/feature">
                            <div className="flex-shrink-0 w-5 h-5 bg-luxury-gold/10 rounded-full flex items-center justify-center group-hover/feature:bg-luxury-gold transition-colors duration-300">
                              <Check className="h-3 w-3 text-luxury-gold group-hover/feature:text-white transition-colors duration-300" />
                            </div>
                            <span className="luxury-sans text-sm text-gray-700 group-hover/feature:text-luxury-black transition-colors duration-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl luxury-heading text-luxury-black">Pricing Structure</h4>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Bentley Mulsanne (25km)</span>
                            <span className="text-luxury-gold font-semibold">€270 + €3.50/km</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Mercedes S500 Brabus (25km)</span>
                            <span className="text-luxury-gold font-semibold">€190 + €1.80/km</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Mercedes Maybach (25km)</span>
                            <span className="text-luxury-gold font-semibold">€230 + €3.00/km</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Classic Fleet (20km)</span>
                            <span className="text-luxury-gold font-semibold">€300-€350 + extra/km</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link to="/booking/one-way" className="btn-luxury-premium text-lg group">
                      <span>Book One-Way Transfer</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Airport Transfers */}
            <div className="scroll-fade-in">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-4xl md:text-5xl luxury-heading text-luxury-black mb-6 tracking-wide">
                      Airport Transfers
                    </h3>
                    <div className="gold-separator w-32 mb-6"></div>
                    <p className="text-lg font-playfair text-gray-700 leading-relaxed mb-6">
                      Experience premium airport transfers with our luxury fleet. Our modern vehicles offer comfort, reliability, and onboard amenities for high-profile clients, while our classic cars provide a unique and memorable experience. All transfers include priority meet & greet service, flight tracking, luggage assistance, and multi-language support.
                    </p>
                    <p className="text-sm font-playfair text-gray-600 italic">
                      Transfers from Tires (Cascais Airport) - Fixed price for 25 km
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-xl luxury-heading text-luxury-black">Modern Fleet Services</h4>
                      <ul className="space-y-3">
                        {[
                          "Fixed price covering 25 km",
                          "Extra kilometers charged per km",
                          "Priority Meet & Greet Service",
                          "Flight Tracking & Monitoring",
                          "Private Terminal Access",
                          "Luggage Assistance",
                          "Real-time Arrival Updates",
                          "Multi-language Support"
                        ].map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-3 group/feature">
                            <div className="flex-shrink-0 w-5 h-5 bg-luxury-gold/10 rounded-full flex items-center justify-center group-hover/feature:bg-luxury-gold transition-colors duration-300">
                              <Check className="h-3 w-3 text-luxury-gold group-hover/feature:text-white transition-colors duration-300" />
                            </div>
                            <span className="luxury-sans text-sm text-gray-700 group-hover/feature:text-luxury-black transition-colors duration-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl luxury-heading text-luxury-black">Vehicle Options</h4>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Bentley Mulsanne (25km)</span>
                            <span className="text-luxury-gold font-semibold">€270 + €2.5/km</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Mercedes Maybach (25km)</span>
                            <span className="text-luxury-gold font-semibold">€230 + €2/km</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Mercedes S500 Brabus (25km)</span>
                            <span className="text-luxury-gold font-semibold">€190 + €1.8/km</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Classic Fleet (20km)</span>
                            <span className="text-luxury-gold font-semibold">€300-€350 + extra/km</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link to="/booking/airport" className="btn-luxury-premium text-lg group">
                      <span>Book Airport Transfer</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                    </Link>
                  </div>
                </div>
                <div>
                  <img
                    src="/airport-transfers.png"
                    alt="Airport Transfers"
                    className="w-full h-96 object-cover rounded-sm shadow-luxury"
                    onError={(e) => {
                      e.currentTarget.src = 'legacy.png'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Corporate Transportation */}
            <div className="scroll-fade-in">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <img
                    src="/corporate-transportation.png"
                    alt="Corporate Transportation"
                    className="w-full h-96 object-cover rounded-sm shadow-luxury"
                    onError={(e) => {
                      e.currentTarget.src = 'legacy.png'
                    }}
                  />
                </div>
                <div className="order-1 lg:order-2 space-y-8">
                  <div>
                    <h3 className="text-4xl md:text-5xl luxury-heading text-luxury-black mb-6 tracking-wide">
                      Corporate Transportation
                    </h3>
                    <div className="gold-separator w-32 mb-6"></div>
                    <p className="text-lg font-playfair text-gray-700 leading-relaxed mb-6">
                      Elevate your business travel with sophisticated, reliable transportation solutions. Our corporate
                      transportation service is designed for executives, business travelers, and companies seeking to
                      impress clients and partners. We provide seamless coordination for meetings, conferences, and
                      VIP client visits with uncompromising professionalism and confidentiality.
                    </p>
                    <p className="text-sm font-playfair text-gray-600 italic">
                      Professional excellence for business travel and client relations
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-xl luxury-heading text-luxury-black">Business Features</h4>
                      <ul className="space-y-3">
                        {[
                          "Executive Vehicle Fleet",
                          "Meeting Coordination",
                          "Confidentiality Assured",
                          "Professional Presentation",
                          "Corporate Account Management",
                          "Invoice & Expense Tracking"
                        ].map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-3 group/feature">
                            <div className="flex-shrink-0 w-5 h-5 bg-luxury-gold/10 rounded-full flex items-center justify-center group-hover/feature:bg-luxury-gold transition-colors duration-300">
                              <Check className="h-3 w-3 text-luxury-gold group-hover/feature:text-white transition-colors duration-300" />
                            </div>
                            <span className="luxury-sans text-sm text-gray-700 group-hover/feature:text-luxury-black transition-colors duration-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl luxury-heading text-luxury-black">Corporate Packages</h4>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Starting price (min. 2h)</span>
                            <span className="text-luxury-gold font-semibold">€220</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Monthly Corporate Plan</span>
                            <span className="text-luxury-gold font-semibold">Contact Us</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link to="/booking/corporate" className="btn-luxury-premium text-lg group">
                      <span>Corporate Inquiry</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Events & Weddings */}
            <div className="scroll-fade-in">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-4xl md:text-5xl luxury-heading text-luxury-black mb-6 tracking-wide">
                      Wedding Services
                    </h3>
                    <div className="gold-separator w-32 mb-6"></div>
                    <p className="text-lg font-playfair text-gray-700 leading-relaxed mb-6">
                      Transform your special day into an unforgettable experience with our premium wedding transportation services. Our classic and modern luxury vehicles provide the perfect backdrop for your most cherished wedding moments. From ceremony arrivals to reception departures, we ensure every aspect of your wedding day transportation is handled with elegance and precision.
                    </p>
                    <p className="text-sm font-playfair text-gray-600 italic">
                      Main Wedding Fleet: Stationary/Use by Couples - does not include decorations and designs as requested by the client
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-xl luxury-heading text-luxury-black">Main Wedding Fleet</h4>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Rolls-Royce Silver Cloud II (3h min)</span>
                            <span className="text-luxury-gold font-semibold">€900</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Rolls-Royce Silver Shadow (3h min)</span>
                            <span className="text-luxury-gold font-semibold">€810</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Oldsmobile Super 88 (3h min)</span>
                            <span className="text-luxury-gold font-semibold">€1,050</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Mercedes 280SL Pagoda (3h min)</span>
                            <span className="text-luxury-gold font-semibold">€750</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl luxury-heading text-luxury-black">Additional Transport</h4>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Bentley Mulsanne (per trip)</span>
                            <span className="text-luxury-gold font-semibold">€150</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Mercedes Maybach (per trip)</span>
                            <span className="text-luxury-gold font-semibold">€140</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Mercedes Brabus (per trip)</span>
                            <span className="text-luxury-gold font-semibold">€120</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Mercedes GLC 300 (per trip)</span>
                            <span className="text-luxury-gold font-semibold">€100</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link to="/booking/wedding" className="btn-luxury-premium text-lg group">
                      <span>Book Wedding Transport</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                    </Link>
                  </div>
                </div>
                <div>
                  <img
                    src="/special-events.png"
                    alt="Wedding Services"
                    className="w-full h-96 object-cover rounded-sm shadow-luxury"
                    onError={(e) => {
                      e.currentTarget.src = 'legacy.png'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Luxury Tours & Scenic Routes */}
            <div className="scroll-fade-in">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <img
                    src="/scenic-routes.png"
                    alt="Luxury Tours"
                    className="w-full h-96 object-cover rounded-sm shadow-luxury"
                    onError={(e) => {
                      e.currentTarget.src = 'legacy.png'
                    }}
                  />
                </div>
                <div className="order-1 lg:order-2 space-y-8">
                  <div>
                    <h3 className="text-4xl md:text-5xl luxury-heading text-luxury-black mb-6 tracking-wide">
                      Luxury Tours & Scenic Routes
                    </h3>
                    <div className="gold-separator w-32 mb-6"></div>
                    <p className="text-lg font-playfair text-gray-700 leading-relaxed mb-6">
                      Discover Portugal's finest wine regions through chauffeured comfort and private experiences at Buddha Eden Gardens and Palácio da Bacalhôa. Our exclusive private tours offer intimate access to historic estates, extensive art collections, and premium wine tastings in the heart of Portugal's renowned wine country.
                    </p>
                    <p className="text-sm font-playfair text-gray-600 italic">
                      Exclusive Private Wine Experiences
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-xl luxury-heading text-luxury-black">Tour Experiences</h4>
                      <ul className="space-y-3">
                        {[
                          "Private Wine Tastings",
                          "Historic Palace Tours",
                          "Art Collection Access",
                          "Chauffeured Transportation",
                          "Expert Local Guides",
                          "Custom Itinerary Planning"
                        ].map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-3 group/feature">
                            <div className="flex-shrink-0 w-5 h-5 bg-luxury-gold/10 rounded-full flex items-center justify-center group-hover/feature:bg-luxury-gold transition-colors duration-300">
                              <Check className="h-3 w-3 text-luxury-gold group-hover/feature:text-white transition-colors duration-300" />
                            </div>
                            <span className="luxury-sans text-sm text-gray-700 group-hover/feature:text-luxury-black transition-colors duration-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl luxury-heading text-luxury-black">Featured Experiences</h4>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Buddha Eden Gardens</span>
                            <span className="text-luxury-gold font-semibold">From €7 pp</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Palácio da Bacalhôa</span>
                            <span className="text-luxury-gold font-semibold">From €15 pp</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Premium Wine Experiences</span>
                            <span className="text-luxury-gold font-semibold">€75-€250 pp</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link to="/services/tours" className="btn-luxury-premium text-lg group">
                      <span>Explore Tours</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Exclusive Experiences */}
            <div className="scroll-fade-in">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-4xl md:text-5xl luxury-heading text-luxury-black mb-6 tracking-wide">
                      Exclusive Experiences
                    </h3>
                    <div className="gold-separator w-32 mb-6"></div>
                    <p className="text-lg font-playfair text-gray-700 leading-relaxed mb-6">
                      Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation.
                      Our exclusive experiences combine the finest vehicles with extraordinary destinations, VIP access,
                      and personalized concierge services. From private villa visits to exclusive cultural events,
                      we create bespoke experiences that reflect your individual passions and desires.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-xl luxury-heading text-luxury-black">VIP Services</h4>
                      <ul className="space-y-3">
                        {[
                          "Private Villa Access",
                          "VIP Event Transportation",
                          "Exclusive Cultural Experiences",
                          "Personal Concierge Service",
                          "Bespoke Itinerary Creation",
                          "Luxury Accommodation Coordination"
                        ].map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-3 group/feature">
                            <div className="flex-shrink-0 w-5 h-5 bg-luxury-gold/10 rounded-full flex items-center justify-center group-hover/feature:bg-luxury-gold transition-colors duration-300">
                              <Check className="h-3 w-3 text-luxury-gold group-hover/feature:text-white transition-colors duration-300" />
                            </div>
                            <span className="luxury-sans text-sm text-gray-700 group-hover/feature:text-luxury-black transition-colors duration-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl luxury-heading text-luxury-black">Exclusive Packages</h4>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">VIP Cultural Experience</span>
                            <span className="text-luxury-gold font-semibold">€800</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Private Estate Tour</span>
                            <span className="text-luxury-gold font-semibold">€1200</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Bespoke Experience</span>
                            <span className="text-luxury-gold font-semibold">Contact Us</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link to="/contact" className="btn-luxury-premium text-lg group">
                      <span>Create Exclusive Experience</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                    </Link>
                  </div>
                </div>
                <div>
                  <img
                    src="/foton-pagoda.png"
                    alt="Exclusive Experiences"
                    className="w-full h-96 object-cover rounded-sm shadow-luxury"
                    onError={(e) => {
                      e.currentTarget.src = 'legacy.png'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-luxury-white via-luxury-ivory to-luxury-pearl relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl luxury-display text-luxury-black mb-8 tracking-wider">
              Why Choose Chevalier Lane
            </h2>
            <div className="gold-separator mx-auto mb-10 w-56"></div>
            <p className="text-xl font-playfair text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Experience the difference that comes from over two decades of luxury transportation excellence
              and an unwavering commitment to perfection in every detail.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Uncompromising Safety",
                description: "Every vehicle undergoes rigorous maintenance and our chauffeurs are extensively trained professionals."
              },
              {
                icon: Award,
                title: "Proven Excellence",
                description: "Recognized for outstanding service with a track record of satisfied clients worldwide."
              },
              {
                icon: Clock,
                title: "Punctual Service",
                description: "We understand that your time is valuable and maintain impeccable timing standards."
              },
              {
                icon: Users,
                title: "Personalized Attention",
                description: "Each client receives bespoke service tailored to their unique preferences and requirements."
              }
            ].map((item, index) => (
              <div key={index} className={`group text-center p-8 bg-white rounded-sm shadow-luxury-soft hover:shadow-luxury transition-all duration-500 fade-in-up border border-luxury-gold/10 scroll-scale-in stagger-${index + 1}`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-luxury-gold/10 to-luxury-gold/5 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-8 w-8 text-luxury-gold" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
                <h3 className="text-xl luxury-heading text-luxury-black mb-4 group-hover:text-luxury-gold transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="luxury-sans text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-luxury-black via-luxury-midnight to-luxury-black relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl luxury-display text-white mb-8 tracking-wider">
            Ready to Experience Luxury?
          </h2>

          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto mb-8"></div>

          <p className="text-xl md:text-2xl font-playfair text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            Contact our concierge team to discuss your transportation needs and discover how we can
            elevate your next journey to extraordinary heights.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
            <Link to="/contact" className="btn-luxury-premium text-xl px-12 py-5 group">
              <Phone className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
              <span>Contact Concierge</span>
            </Link>
            <div className="flex flex-col sm:flex-row gap-4 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-3 text-white/80">
                <Phone className="h-5 w-5 text-luxury-gold" />
                <span className="luxury-sans-medium">+34 607 326 237</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3 text-white/80">
                <Mail className="h-5 w-5 text-luxury-gold" />
                <span className="luxury-sans-medium">info@chevalierlane.com</span>
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
              <div className="luxury-sans-medium text-white/80 text-lg tracking-wide">Always Available</div>
            </div>
            <div className="group space-y-4 scroll-scale-in stagger-2">
              <div className="relative">
                <div className="text-4xl md:text-5xl luxury-display text-luxury-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold to-luxury-champagne">Instant</span>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
              <div className="luxury-sans-medium text-white/80 text-lg tracking-wide">Quote Response</div>
            </div>
            <div className="group space-y-4 scroll-scale-in stagger-3">
              <div className="relative">
                <div className="text-4xl md:text-5xl luxury-display text-luxury-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                  Global
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
              <div className="luxury-sans-medium text-white/80 text-lg tracking-wide">Service Coverage</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}