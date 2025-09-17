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
                <Link to="/contact" className="btn-luxury-premium text-xl px-12 py-5 group">
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
            {/* Private Chauffeur Service */}
            <div className="scroll-fade-in">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <img
                    src="/private-chauffeur.png"
                    alt="Private Chauffeur Service"
                    className="w-full h-96 object-cover rounded-sm shadow-luxury"
                    onError={(e) => {
                      e.currentTarget.src = 'legacy.png'
                    }}
                  />
                </div>
                <div className="order-1 lg:order-2 space-y-8">
                  <div>
                    <h3 className="text-4xl md:text-5xl luxury-heading text-luxury-black mb-6 tracking-wide">
                      Private Chauffeur Service
                    </h3>
                    <div className="gold-separator w-32 mb-6"></div>
                    <p className="text-lg font-playfair text-gray-700 leading-relaxed mb-6">
                      Experience the ultimate in discreet, professional transportation. Our private chauffeur service
                      provides personalized luxury transportation tailored to your schedule, preferences, and lifestyle.
                      Whether it's daily commuting, business travel, or leisure activities, our professional chauffeurs
                      ensure every journey is seamless and sophisticated.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-xl luxury-heading text-luxury-black">Service Features</h4>
                      <ul className="space-y-3">
                        {[
                          "24/7 Professional Chauffeurs",
                          "Luxury Vehicle Selection",
                          "Personalized Itinerary Planning",
                          "Real-time GPS Tracking",
                          "Discreet & Confidential Service",
                          "Flexible Booking Options"
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
                            <span className="luxury-sans-medium text-gray-700">Hourly Rate (min. 2h)</span>
                            <span className="text-luxury-gold font-semibold">€180</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Full Day (max. 8h)</span>
                            <span className="text-luxury-gold font-semibold">€850</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Airport Transfer</span>
                            <span className="text-luxury-gold font-semibold">From €120</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-center text-gray-600 luxury-sans-medium opacity-80">
                        Prices are Subject to VAT
                      </p>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link to="/contact" className="btn-luxury-premium text-lg group">
                      <span>Book Private Chauffeur</span>
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
                      Arrive in style with our premium airport transfer service. We provide seamless, punctual transfers
                      ensuring you reach your destination comfortably and on time. Our experienced chauffeurs are
                      familiar with all major airports in Portugal and Spain, providing priority service and meet & greet
                      options for international travelers.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-xl luxury-heading text-luxury-black">Transfer Services</h4>
                      <ul className="space-y-3">
                        {[
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
                      <h4 className="text-xl luxury-heading text-luxury-black">Major Routes</h4>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Lisbon Airport ↔ Center</span>
                            <span className="text-luxury-gold font-semibold">€120</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Cascais Airport</span>
                            <span className="text-luxury-gold font-semibold">€250</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Porto Airport</span>
                            <span className="text-luxury-gold font-semibold">€180</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link to="/contact" className="btn-luxury-premium text-lg group">
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
                            <span className="luxury-sans-medium text-gray-700">Executive Daily Rate</span>
                            <span className="text-luxury-gold font-semibold">€220</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">VIP Client Transfer</span>
                            <span className="text-luxury-gold font-semibold">€280</span>
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
                    <Link to="/contact" className="btn-luxury-premium text-lg group">
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
                      Special Events & Weddings
                    </h3>
                    <div className="gold-separator w-32 mb-6"></div>
                    <p className="text-lg font-playfair text-gray-700 leading-relaxed mb-6">
                      Transform your special occasions into unforgettable experiences with our bespoke event transportation.
                      Whether it's your dream wedding, corporate gala, or milestone celebration, we provide elegant
                      transportation solutions that complement and enhance your special moments. Our classic and modern
                      fleet offers the perfect backdrop for your most cherished memories.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-xl luxury-heading text-luxury-black">Event Services</h4>
                      <ul className="space-y-3">
                        {[
                          "Wedding Transportation",
                          "Ceremony & Reception Service",
                          "Classic Car Collection",
                          "Bridal Party Transport",
                          "Guest Shuttle Service",
                          "Event Coordination"
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
                      <h4 className="text-xl luxury-heading text-luxury-black">Popular Packages</h4>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Classic Car Wedding</span>
                            <span className="text-luxury-gold font-semibold">€950</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Luxury SUV Wedding</span>
                            <span className="text-luxury-gold font-semibold">€750</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Complete Event Package</span>
                            <span className="text-luxury-gold font-semibold">Contact Us</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link to="/contact" className="btn-luxury-premium text-lg group">
                      <span>Plan Your Event</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                    </Link>
                  </div>
                </div>
                <div>
                  <img
                    src="/special-events.png"
                    alt="Special Events"
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
                      Discover breathtaking destinations through the comfort of our premium fleet. Our luxury tours
                      combine exceptional transportation with curated experiences, expert local knowledge, and
                      personalized itineraries. Whether exploring the Algarve's coastline, Portugal's wine regions,
                      or Spain's cultural landmarks, every journey becomes a memorable adventure.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-xl luxury-heading text-luxury-black">Tour Experiences</h4>
                      <ul className="space-y-3">
                        {[
                          "Custom Itinerary Planning",
                          "Expert Local Guides",
                          "Premium Dining Experiences",
                          "Historic Site Access",
                          "Wine Region Tours",
                          "Coastal Scenic Routes"
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
                      <h4 className="text-xl luxury-heading text-luxury-black">Popular Destinations</h4>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Algarve Coastal Tour</span>
                            <span className="text-luxury-gold font-semibold">€450</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Douro Wine Valley</span>
                            <span className="text-luxury-gold font-semibold">€550</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">Sintra Day Trip</span>
                            <span className="text-luxury-gold font-semibold">€350</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link to="/contact" className="btn-luxury-premium text-lg group">
                      <span>Plan Your Tour</span>
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
                <span className="luxury-sans-medium">+351 123 456 789</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3 text-white/80">
                <Mail className="h-5 w-5 text-luxury-gold" />
                <span className="luxury-sans-medium">concierge@chevalierlane.com</span>
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