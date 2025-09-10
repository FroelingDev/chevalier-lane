import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { ArrowRight, ArrowLeft, Star, Check, Calendar, Users } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
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
              url('/hero-section.png')
            `
          }}
        />

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgba(184,134,11,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>

        {/* Top Left - Chevalier Lane Title */}
        <div className="absolute top-16 left-8 lg:top-24 lg:left-16 z-10 scroll-slide-left">
          <div className="backdrop-blur-sm bg-black/20 p-8 rounded-lg border border-gold/20 shadow-2xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-6xl luxury-serif-bold text-white tracking-wider leading-tight drop-shadow-2xl">
              Your Personal<br />
              <span className="text-luxury-gold drop-shadow-lg">Chauffeur</span><br />
              Service
            </h1>
            <div className="mt-4 h-0.5 w-24 bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>
          </div>
        </div>

        {/* Bottom Right - Paragraph and Buttons */}
        <div className="absolute bottom-16 right-8 lg:bottom-24 lg:right-16 z-10 pl-8 text-right max-w-lg scroll-slide-right">
          <div className="backdrop-blur-md bg-black/30 p-8 rounded-lg border border-luxury-gold/30 shadow-2xl">
            <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-playfair text-white mb-8 leading-relaxed font-medium tracking-wider drop-shadow-lg">
              From Rolls-Royce elegance to modern Bentley comfort — travel with <span className="text-luxury-gold italic">unparalleled distinction</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-end items-end">
              <Link to="/contact" className="btn-luxury-premium text-lg inline-flex items-center gap-2 group">
                Discover Elegance
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link to="/classic" className="btn-luxury-outline-premium text-lg">
                Explore Our Fleet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Carousel Section */}
      <section className="py-28 px-4 bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white relative overflow-hidden">
        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 opacity-3 bg-[linear-gradient(45deg,transparent_25%,rgba(184,134,11,0.03)_25%,rgba(184,134,11,0.03)_50%,transparent_50%,transparent_75%,rgba(184,134,11,0.03)_75%)] bg-[length:24px_24px]"></div>
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_3px_3px,rgba(184,134,11,0.04)_1px,transparent_0)] bg-[length:28px_28px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="text-5xl md:text-7xl luxury-display text-luxury-black mb-6 tracking-wider">
              Our Chauffeur Driven Cars
            </h2>
            <div className="gold-separator mx-auto w-64 mb-4"></div>
            <p className="text-xl font-playfair text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Experience unparalleled luxury transportation with our meticulously curated fleet,
              where every vehicle embodies the pinnacle of automotive excellence and refined elegance.
            </p>
          </div>

          {(() => {
            const vehicles: {
              name: string
              image: string
              link: string
              prices: { label: string; value: string }[]
            }[] = [
              {
                name: 'MERCEDES S500 BRABUS',
                image: 'mercedes-s500-brabus.png',
                link: '/modern/mercedes-s500-brabus',
                prices: [
                  { label: 'Hourly rate (minimum 2 hours)', value: '€180' },
                  { label: 'Full day rate (max. 8 hours)', value: '€850' },
                  { label: 'Cascais Airport to Lisbon Center', value: '€250' },
                ],
              },
              {
                name: 'BENTLEY MULSANNE',
                image: 'bentley-mulsanne.png',
                link: '/modern/bentley-mulsanne',
                prices: [
                  { label: 'Hourly rate (minimum 2 hours)', value: '€250' },
                  { label: 'Hourly rate (max. 6 hours)', value: '€1200' },
                  { label: 'Cascais Airport to Lisbon Center', value: '€400' },
                ],
              },
              // {
              //   name: 'MERCEDES GLS 300',
              //   image: 'modern-header.png',
              //   link: '/modern/mercedes-gls-300',
              //   prices: [
              //     { label: 'Hourly rate (minimum 2 hours)', value: '€100' },
              //     { label: 'Hourly rate (max. 8 hours)', value: '€650' },
              //     { label: 'Cascais Airport (Extra Car)', value: '€80' },
              //   ],
              // },
              {
                name: 'RANGE ROVER VOGUE',
                image: 'range-rover-vogue.png',
                link: '/modern/range-rover-vogue',
                prices: [
                  { label: 'Hourly rate (minimum 2 hours)', value: '€220' },
                  { label: 'Full day rate (max. 8 hours)', value: '€950' },
                  { label: 'Airport transfer', value: '€300' },
                ],
              },
              {
                name: 'MERCEDES 280SL PAGODA',
                image: 'mercedes-pagoda.png',
                link: '/classic/mercedes-280sl-pagoda',
                prices: [
                  { label: 'Hourly rate (minimum 2 hours)', value: '€220' },
                  { label: 'Special events (up to 6 hours)', value: '€900' },
                  { label: 'Chauffeur service', value: 'By request' },
                ],
              },
              {
                name: 'ROLLS-ROYCE SILVER CLOUD II',
                image: 'rolls-royce-silver-cloud-ii.png',
                link: '/classic/rolls-royce-silver-cloud-ii',
                prices: [
                  { label: 'Hourly rate (minimum 2 hours)', value: '€260' },
                  { label: 'Special events (up to 6 hours)', value: '€1100' },
                  { label: 'Chauffeur service', value: 'By request' },
                ],
              },
              {
                name: 'ROLLS-ROYCE SILVER SHADOW',
                image: 'rolls-royce-silver-shadow.png',
                link: '/classic/rolls-royce-silver-shadow',
                prices: [
                  { label: 'Hourly rate (minimum 2 hours)', value: '€240' },
                  { label: 'Special events (up to 6 hours)', value: '€980' },
                  { label: 'Chauffeur service', value: 'By request' },
                ],
              },
              {
                name: 'OLDSMOBILE SUPER 88',
                image: 'oldsmobile-super-88.png',
                link: '/classic/oldsmobile-super-88',
                prices: [
                  { label: 'Hourly rate (minimum 2 hours)', value: '€200' },
                  { label: 'Special events (up to 6 hours)', value: '€850' },
                  { label: 'Chauffeur service', value: 'By request' },
                ],
              },
            ]

            const scrollerRef = useRef<HTMLDivElement | null>(null)

            const scrollByAmount = (direction: 'left' | 'right') => () => {
              const container = scrollerRef.current
              if (!container) return
              const amount = Math.min(
                container.clientWidth * 0.9,
                800
              ) * (direction === 'left' ? -1 : 1)
              container.scrollBy({ left: amount, behavior: 'smooth' })
            }

            return (
              <div className="relative">
                <button
                  aria-label="Previous vehicles"
                  onClick={scrollByAmount('left')}
                  className="hidden md:flex items-center justify-center absolute -left-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/95 backdrop-blur-sm border-2 border-luxury-gold/40 shadow-luxury hover:bg-gradient-to-r hover:from-luxury-gold hover:to-luxury-champagne hover:text-luxury-black hover:shadow-2xl hover:shadow-luxury-gold/30 hover:scale-110 transition-all duration-500 z-10 group"
                >
                  <ArrowLeft className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                </button>

                <div
                  ref={scrollerRef}
                  className="no-scrollbar flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-px-4"
                >
                  {vehicles.map((v, idx) => (
                    <div
                      key={idx}
                      className="min-w-[320px] md:min-w-[360px] lg:min-w-[380px] snap-start bg-gradient-to-br from-white via-luxury-ivory to-luxury-pearl rounded-sm shadow-luxury-soft hover:shadow-luxury transition-all duration-500 group border border-luxury-gold/10 hover:-translate-y-2 hover:border-luxury-gold/30 fade-in-up scroll-fade-in"
                      style={{ animationDelay: `${idx * 0.15}s` }}
                    >
                      <div className="relative h-64 overflow-hidden rounded-t-sm bg-gradient-to-b from-luxury-ivory to-luxury-pearl">
                        <img
                          src={v.image}
                          alt={v.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                          onError={(e) => {
                            e.currentTarget.src = 'legacy.png'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="h-0.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        </div>
                      </div>
                      <div className="p-8 relative">
                        {/* Decorative top border */}
                        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent"></div>

                        <h3 className="text-2xl luxury-heading text-luxury-black mb-6 tracking-wide text-center group-hover:text-luxury-gold transition-colors duration-300">
                          {v.name}
                        </h3>

                        <div className="space-y-3 mb-6">
                          {v.prices.map((p, i) => (
                            <div key={i} className="group/price flex items-center justify-between py-3 px-4 bg-gradient-to-r from-luxury-gold/5 to-transparent rounded-sm border border-luxury-gold/10 hover:border-luxury-gold/30 transition-all duration-300">
                              <span className="text-sm luxury-sans text-gray-700 group-hover/price:text-luxury-black transition-colors duration-300">{p.label}</span>
                              <span className="text-sm luxury-sans-medium text-luxury-gold font-semibold group-hover/price:scale-105 transition-transform duration-300">{p.value}</span>
                            </div>
                          ))}
                        </div>

                        <div className="text-center space-y-4">
                          <Link
                            to={v.link}
                            className="inline-block bg-luxury-gold text-luxury-black font-playfair text-sm px-6 py-3 rounded-sm border border-luxury-gold hover:bg-luxury-champagne transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-luxury-gold/30 hover:scale-105"
                          >
                            Get more Info
                          </Link>
                          <div className="text-xs text-center text-gray-600 luxury-sans-medium opacity-80">
                            Prices are Subject to VAT
                          </div>
                        </div>

                        {/* Decorative bottom border */}
                        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent"></div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  aria-label="Next vehicles"
                  onClick={scrollByAmount('right')}
                  className="hidden md:flex items-center justify-center absolute -right-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/95 backdrop-blur-sm border-2 border-luxury-gold/40 shadow-luxury hover:bg-gradient-to-r hover:from-luxury-gold hover:to-luxury-champagne hover:text-luxury-black hover:shadow-2xl hover:shadow-luxury-gold/30 hover:scale-110 transition-all duration-500 z-10 group"
                >
                  <ArrowRight className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>
            )
          })()}
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
              Crafting unparalleled experiences since our founding, every journey with Chevalier Lane
              represents the pinnacle of luxury transportation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 scroll-slide-left">
              <p className="text-lg font-playfair text-gray-700 leading-relaxed">
                Chevalier Lane has redefined luxury transportation, the only company in Lisbon offering both modern luxury and classic elegance.
              </p>
              <p className="text-lg font-playfair text-gray-700 leading-relaxed">
                From the iconic curves of a 1960s Mercedes 280SL Pagoda to the commanding presence
                of a Bentley Mulsanne, each vehicle in our collection tells a story of
                engineering excellence and uncompromising luxury.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-luxury-gold text-luxury-gold" />
                  ))}
                </div>
                <span className="luxury-sans-medium text-luxury-black">Trusted by discerning clients worldwide</span>
              </div>
            </div>

            <div className="relative scroll-slide-right">
              <img
                src="legacy-section.png"
                alt="Luxury interior"
                className="w-full h-96 object-cover rounded-sm shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = "legacy-section.png"
                }}
              />
              <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-luxury-gold rounded-sm -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white relative overflow-hidden">
        {/* Elegant Pattern Overlay */}
        <div className="absolute inset-0 opacity-4 bg-[radial-gradient(circle_at_3px_3px,rgba(184,134,11,0.06)_1px,transparent_0)] bg-[length:25px_25px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl luxury-display text-luxury-black mb-8 tracking-wider">
              Curated Experiences
            </h2>
            <div className="gold-separator mx-auto mb-10 w-56"></div>
            <p className="text-xl md:text-2xl font-playfair text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Every journey with Chevalier Lane is meticulously crafted to exceed expectations,
              offering <span className="text-luxury-gold italic">unparalleled service</span> that transforms ordinary moments into extraordinary memories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Private Chauffeur Service",
                description: "Discreet, professional transportation tailored to your schedule and preferences.",
                image: "services-header.png",
                features: ["24/7 Availability", "Professional Chauffeurs", "Luxury Vehicles"]
              },
              {
                title: "Special Events & Occasions",
                description: "Make your special moments unforgettable with our bespoke transportation solutions.",
                image: "hero-section.png",
                features: ["Wedding Services", "Corporate Events", "VIP Transport"]
              },
              {
                title: "Airport Transfers",
                description: "Seamless, punctual transfers ensuring you arrive in style and comfort.",
                image: "hero-section.png",
                features: ["Priority Service", "Flight Tracking", "Meet & Greet"]
              },
              {
                title: "Luxury Tours & Scenic Routes",
                description: "Discover breathtaking destinations through the comfort of our premium fleet.",
                image: "hero-section.png",
                features: ["Custom Itineraries", "Expert Guides", "Premium Dining"]
              },
              {
                title: "Corporate Transportation",
                description: "Elevate your business travel with sophisticated, reliable transportation solutions.",
                image: "hero-section.png",
                features: ["Executive Service", "Meeting Coordination", "Confidentiality"]
              },
              {
                title: "Exclusive Experiences",
                description: "Unique, one-of-a-kind experiences combining luxury travel with extraordinary destinations.",
                image: "hero-section.png",
                features: ["Private Tours", "VIP Access", "Personal Concierge"]
              }
            ].map((service, index) => (
              <div key={index} className={`group bg-white rounded-sm shadow-luxury-soft overflow-hidden hover:shadow-luxury transition-all duration-500 fade-in-up hover:-translate-y-2 scroll-scale-in stagger-${index + 1}`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="h-0.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </div>
                <div className="p-8 relative">
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent"></div>
                  <h3 className="text-xl luxury-heading text-luxury-black mb-4 group-hover:text-luxury-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="luxury-sans text-gray-600 mb-6 leading-relaxed text-base">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3 group/feature">
                        <div className="flex-shrink-0 w-5 h-5 bg-luxury-gold/10 rounded-full flex items-center justify-center group-hover/feature:bg-luxury-gold transition-colors duration-300">
                          <Check className="h-3 w-3 text-luxury-gold group-hover/feature:text-white transition-colors duration-300" />
                        </div>
                        <span className="luxury-sans text-sm text-gray-700 group-hover/feature:text-luxury-black transition-colors duration-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-4 border-t border-luxury-gold/10">
                    <div className="text-luxury-gold text-sm luxury-sans-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      LEARN MORE →
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-luxury-white via-luxury-pearl to-luxury-ivory relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl luxury-display text-luxury-black mb-8 tracking-wider">
              Distinguished Clientele
            </h2>
            <div className="gold-separator mx-auto mb-10 w-52"></div>
            <p className="text-xl font-playfair text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Trusted by the world's most discerning individuals who demand nothing less than perfection.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Chevalier Lane transformed our wedding day into an experience of pure elegance. Their attention to detail and sophistication exceeded our every expectation, creating memories that will last a lifetime.",
                author: "Victoria & James Harrington",
                title: "Private Clients",
                rating: 5,
                location: "Lisbon, Portugal"
              },
              {
                quote: "As someone who demands excellence in every aspect of business, Chevalier Lane consistently delivers unparalleled service. Their fleet and professionalism are truly world-class, setting the standard for luxury transportation.",
                author: "Marcus Chen",
                title: "CEO, Chen Enterprises",
                rating: 5,
                location: "Singapore"
              },
              {
                quote: "The Rolls-Royce Silver Shadow they provided for our anniversary celebration was nothing short of spectacular. Every moment felt like royalty, an experience of absolute refinement and grace.",
                author: "Elena Rodriguez",
                title: "Art Collector",
                rating: 5,
                location: "Barcelona, Spain"
              }
            ].map((testimonial, index) => (
              <div key={index} className={`group bg-gradient-to-br from-luxury-ivory via-white to-luxury-pearl p-8 rounded-sm shadow-luxury-soft hover:shadow-luxury transition-all duration-500 fade-in-up hover:-translate-y-1 border border-luxury-gold/10 scroll-fade-in stagger-${index + 1}`} style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="relative mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-luxury-gold text-luxury-gold drop-shadow-sm" />
                      ))}
                    </div>
                    <div className="text-luxury-gold/60 text-xs luxury-sans-medium tracking-wider">
                      ★★★★★
                    </div>
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-luxury-gold/30"></div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-luxury-gold/30"></div>
                </div>
                <blockquote className="luxury-serif text-luxury-black text-lg leading-relaxed mb-8 italic relative">
                  <span className="text-4xl text-luxury-gold/30 absolute -top-2 -left-2">"</span>
                  {testimonial.quote}
                  <span className="text-4xl text-luxury-gold/30 absolute -bottom-4 -right-2">"</span>
                </blockquote>
                <div className="border-t border-luxury-gold/20 pt-6 relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>
                  <div className="luxury-sans-medium text-luxury-black font-semibold text-base mb-1">
                    {testimonial.author}
                  </div>
                  <div className="luxury-sans text-gray-600 text-sm mb-2">
                    {testimonial.title}
                  </div>
                  <div className="text-luxury-gold text-xs luxury-sans-medium tracking-wider opacity-70">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-luxury-black via-luxury-midnight to-luxury-black relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url('hero-section.png')`
          }}
        />

        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_2px_2px,rgba(184,134,11,0.4)_1px,transparent_0)] bg-[length:30px_30px]"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl luxury-display text-white mb-8 tracking-wider">
            Reserve Your Place
          </h2>

          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto mb-8"></div>

          <p className="text-xl md:text-2xl font-playfair text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            Join an exclusive circle of discerning individuals who understand that true luxury
            is not just about the destination, but <span className="text-luxury-gold italic">the journey itself</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
            <Link to="/contact" className="btn-luxury-premium text-xl px-12 py-5 group">
              <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              Book Your Experience
            </Link>
            <Link to="/services" className="btn-luxury-outline-premium text-xl px-12 py-5">
              <Users className="mr-3 h-6 w-6" />
              Learn More
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
              <div className="luxury-sans-medium text-white/80 text-lg tracking-wide">Available Service</div>
            </div>
            <div className="group space-y-4 scroll-scale-in stagger-2">
              <div className="relative">
                <div className="text-4xl md:text-5xl luxury-display text-luxury-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                  Premium
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
              <div className="luxury-sans-medium text-white/80 text-lg tracking-wide">Fleet Selection</div>
            </div>
            <div className="group space-y-4 scroll-scale-in stagger-3">
              <div className="relative">
                <div className="text-4xl md:text-5xl luxury-display text-luxury-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold to-luxury-champagne">Elite</span>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
              <div className="luxury-sans-medium text-white/80 text-lg tracking-wide">Client Experience</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
