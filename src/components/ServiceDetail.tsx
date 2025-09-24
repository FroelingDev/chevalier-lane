import { Link } from '@tanstack/react-router'
import { ArrowRight, Check, Phone, Mail } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'

interface ServiceFeature {
  title: string
  items: string[]
}

interface PricingItem {
  name: string
  price: string
}

interface ServiceDetailProps {
  title: string
  subtitle: string
  description: string
  heroImage: string
  mainImage: string
  mainImageAlt: string
  features: ServiceFeature[]
  pricing: PricingItem[]
  ctaText: string
  bookingLink?: string
  imageOnLeft?: boolean
  additionalContent?: ReactNode
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
  additionalContent
}: ServiceDetailProps) {
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
              url('${heroImage}')
            `
          }}
        />

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgba(184,134,11,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <div className="backdrop-blur-md bg-black/30 p-12 rounded-lg border border-luxury-gold/30 shadow-2xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl luxury-display text-white tracking-wider leading-tight drop-shadow-2xl mb-6">
                {title}
              </h1>
              <div className="gold-separator mx-auto w-64 mb-8"></div>
              <p className="text-xl md:text-2xl lg:text-3xl font-playfair text-white/90 mb-8 leading-relaxed font-medium tracking-wider drop-shadow-lg">
                {subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to={bookingLink || '/contact'} className="btn-luxury-premium text-xl px-12 py-5 group">
                  <Phone className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                  <span>Book Your Service</span>
                </Link>
                <button
                  onClick={() => document.getElementById('service-details')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-luxury-outline-premium text-xl px-12 py-5 group"
                >
                  <ArrowRight className="mr-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                  <span>Learn More</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Service Section */}
      <section id="service-details" className="py-32 px-4 bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white relative overflow-hidden">
        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 opacity-3 bg-[linear-gradient(45deg,transparent_25%,rgba(184,134,11,0.03)_25%,rgba(184,134,11,0.03)_50%,transparent_50%,transparent_75%,rgba(184,134,11,0.03)_75%)] bg-[length:24px_24px]"></div>
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_3px_3px,rgba(184,134,11,0.04)_1px,transparent_0)] bg-[length:28px_28px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="scroll-fade-in">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${imageOnLeft ? '' : 'lg:grid-flow-col-dense'}`}>
              <div className={`space-y-8 ${imageOnLeft ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
                <div>
                  <h2 className="text-4xl md:text-5xl luxury-heading text-luxury-black mb-6 tracking-wide">
                    {title}
                  </h2>
                  <div className="gold-separator w-32 mb-6"></div>
                  <p className="text-lg font-playfair text-gray-700 leading-relaxed mb-6">
                    {description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {features.map((featureSection, sectionIdx) => (
                    <div key={sectionIdx} className="space-y-4">
                      <h3 className="text-xl luxury-heading text-luxury-black">{featureSection.title}</h3>
                      <ul className="space-y-3">
                        {featureSection.items.map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-3 group/feature">
                            <div className="flex-shrink-0 w-5 h-5 bg-luxury-gold/10 rounded-full flex items-center justify-center group-hover/feature:bg-luxury-gold transition-colors duration-300">
                              <Check className="h-3 w-3 text-luxury-gold group-hover/feature:text-white transition-colors duration-300" />
                            </div>
                            <span className="luxury-sans text-sm text-gray-700 group-hover/feature:text-luxury-black transition-colors duration-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {pricing.length > 0 && (
                  <div className="space-y-4 mt-8">
                    <h3 className="text-xl luxury-heading text-luxury-black">Pricing Options</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {pricing.map((item, idx) => (
                        <div key={idx} className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                          <div className="flex justify-between items-center">
                            <span className="luxury-sans-medium text-gray-700">{item.name}</span>
                            <span className="text-luxury-gold font-semibold">{item.price}</span>
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
                  <Link to={bookingLink || '/contact'} className="btn-luxury-premium text-lg group">
                    <span>{ctaText}</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                  </Link>
                </div>
              </div>
              <div className={`relative ${imageOnLeft ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}>
                <img
                  src={mainImage}
                  alt={mainImageAlt}
                  className="w-full h-96 object-cover rounded-sm shadow-luxury"
                  onError={(e) => {
                    e.currentTarget.src = 'legacy.png'
                  }}
                />
              </div>
            </div>

            {/* Full-width additional content section */}
            {additionalContent && (
              <div className="mt-20 scroll-fade-in">
                <div className="space-y-12">
                  {additionalContent}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-luxury-black via-luxury-midnight to-luxury-black relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url('hero-section.png')`
          }}
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
              <span>Contact Us</span>
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
