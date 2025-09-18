import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Award, Users, Clock, Star, Heart, Shield, Crown, Sparkles } from 'lucide-react'

export const Route = createFileRoute('/about')({
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
              linear-gradient(135deg, rgba(184, 134, 11, 0.1) 0%, rgba(26, 26, 26, 0.7) 50%, rgba(212, 175, 55, 0.1) 100%),
              linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)),
              url('/legacy-section.png')
            `
          }}
        />

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgba(184,134,11,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="text-center">
              <div className="scroll-fade-in">
                <h1 className="text-5xl md:text-7xl xl:text-8xl luxury-display text-white mb-8 tracking-wider leading-tight drop-shadow-2xl">
                  About Chevalier Lane
                </h1>
                <div className="gold-separator mx-auto w-64 mb-8"></div>
                <p className="text-xl md:text-2xl lg:text-3xl font-playfair text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
                  Crafting <span className="text-luxury-gold italic">unparalleled experiences</span> through
                  the art of luxury transportation since our founding.
                </p>
              </div>

              <div className="scroll-scale-in grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                <div className="backdrop-blur-md bg-black/30 p-6 rounded-lg border border-luxury-gold/30 shadow-2xl text-center group hover:bg-black/40 transition-all duration-500">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-luxury-gold/20 rounded-full mb-4 group-hover:bg-luxury-gold/30 transition-all duration-300">
                    <Clock className="h-6 w-6 text-luxury-gold" />
                  </div>
                  <div className="text-2xl luxury-display text-luxury-gold mb-1">15+</div>
                  <div className="luxury-sans-medium text-white/90 text-sm">Years of Excellence</div>
                </div>

                <div className="backdrop-blur-md bg-black/30 p-6 rounded-lg border border-luxury-gold/30 shadow-2xl text-center group hover:bg-black/40 transition-all duration-500">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-luxury-gold/20 rounded-full mb-4 group-hover:bg-luxury-gold/30 transition-all duration-300">
                    <Users className="h-6 w-6 text-luxury-gold" />
                  </div>
                  <div className="text-2xl luxury-display text-luxury-gold mb-1">10K+</div>
                  <div className="luxury-sans-medium text-white/90 text-sm">Happy Clients</div>
                </div>

                <div className="backdrop-blur-md bg-black/30 p-6 rounded-lg border border-luxury-gold/30 shadow-2xl text-center group hover:bg-black/40 transition-all duration-500">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-luxury-gold/20 rounded-full mb-4 group-hover:bg-luxury-gold/30 transition-all duration-300">
                    <Crown className="h-6 w-6 text-luxury-gold" />
                  </div>
                  <div className="text-2xl luxury-display text-luxury-gold mb-1">10+</div>
                  <div className="luxury-sans-medium text-white/90 text-sm">Luxury Vehicles</div>
                </div>

                <div className="backdrop-blur-md bg-black/30 p-6 rounded-lg border border-luxury-gold/30 shadow-2xl text-center group hover:bg-black/40 transition-all duration-500">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-luxury-gold/20 rounded-full mb-4 group-hover:bg-luxury-gold/30 transition-all duration-300">
                    <Award className="h-6 w-6 text-luxury-gold" />
                  </div>
                  <div className="text-2xl luxury-display text-luxury-gold mb-1">24/7</div>
                  <div className="luxury-sans-medium text-white/90 text-sm">Service Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white relative overflow-hidden">
        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 opacity-3 bg-[linear-gradient(45deg,transparent_25%,rgba(184,134,11,0.03)_25%,rgba(184,134,11,0.03)_50%,transparent_50%,transparent_75%,rgba(184,134,11,0.03)_75%)] bg-[length:24px_24px]"></div>
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_3px_3px,rgba(184,134,11,0.04)_1px,transparent_0)] bg-[length:28px_28px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 scroll-fade-in">
            <h2 className="text-5xl md:text-7xl luxury-display text-luxury-black mb-6 tracking-wider">
              Our Story
            </h2>
            <div className="gold-separator mx-auto w-64 mb-8"></div>
            <p className="text-xl font-playfair text-gray-700 max-w-3xl mx-auto leading-relaxed">
              A legacy of excellence built on passion, precision, and an unwavering commitment
              to <span className="text-luxury-gold italic">exceptional service</span>.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-slide-left">
              <div className="space-y-8">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-luxury-gold/40"></div>
                  <h3 className="text-3xl luxury-heading text-luxury-black mb-6">The Beginning</h3>
                  <p className="text-lg font-playfair text-gray-700 leading-relaxed">
                    Founded in Lisbon, Portugal, Chevalier Lane emerged from a simple yet profound vision:
                    to redefine luxury transportation by combining timeless elegance with modern sophistication.
                    What started as a passion project has evolved into Portugal's premier luxury chauffeur service.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-luxury-gold/40"></div>
                  <h3 className="text-3xl luxury-heading text-luxury-black mb-6">Our Unique Position</h3>
                  <p className="text-lg font-playfair text-gray-700 leading-relaxed">
                    As the only company in Lisbon offering both classic and modern luxury vehicles,
                    we bridge the gap between automotive heritage and contemporary excellence.
                    Our collection spans from iconic 1960s Mercedes Pagodas to state-of-the-art Bentley Mulsannes.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-luxury-gold/40"></div>
                  <h3 className="text-3xl luxury-heading text-luxury-black mb-6">A Commitment to Excellence</h3>
                  <p className="text-lg font-playfair text-gray-700 leading-relaxed">
                    Every journey with Chevalier Lane is a testament to our dedication to perfection.
                    From the moment you make your reservation to the instant you reach your destination,
                    every detail is meticulously orchestrated to ensure an unforgettable experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="scroll-slide-right relative">
              <img
                src="/legacy-section.png"
                alt="Luxury car interior"
                className="w-full h-96 object-cover rounded-sm shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = "legacy.png"
                }}
              />
              <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-luxury-gold rounded-sm -z-10"></div>
              <div className="absolute top-6 right-6 w-16 h-16 bg-luxury-gold/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-luxury-gold" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-luxury-white via-luxury-ivory to-luxury-pearl relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 scroll-fade-in">
            <h2 className="text-5xl md:text-7xl luxury-display text-luxury-black mb-6 tracking-wider">
              Our Values
            </h2>
            <div className="gold-separator mx-auto w-64 mb-8"></div>
            <p className="text-xl font-playfair text-gray-700 max-w-3xl mx-auto leading-relaxed">
              The principles that guide every decision and shape every experience we create.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Trust & Integrity",
                description: "We uphold the highest standards of honesty, reliability, and ethical conduct in all our interactions."
              },
              {
                icon: Heart,
                title: "Personalized Service",
                description: "Every client receives bespoke attention, ensuring their unique needs and preferences are met with care."
              },
              {
                icon: Crown,
                title: "Excellence in Detail",
                description: "From vehicle selection to journey execution, we pursue perfection in every aspect of our service."
              },
              {
                icon: Star,
                title: "Innovation & Tradition",
                description: "We honor automotive heritage while embracing modern luxury, creating experiences that transcend time."
              }
            ].map((value, index) => (
              <div key={index} className={`group bg-white rounded-sm shadow-luxury-soft p-8 border border-luxury-gold/10 hover:shadow-luxury transition-all duration-500 fade-in-up hover:-translate-y-2 scroll-fade-in stagger-${index + 1}`} style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="relative mb-6">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-luxury-gold/10 to-luxury-champagne/10 rounded-full mb-4 group-hover:from-luxury-gold/20 group-hover:to-luxury-champagne/20 transition-all duration-300">
                    <value.icon className="h-8 w-8 text-luxury-gold group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <h3 className="text-xl luxury-heading text-luxury-black mb-4 group-hover:text-luxury-gold transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="luxury-sans text-gray-600 leading-relaxed text-base group-hover:text-gray-700 transition-colors duration-300">
                  {value.description}
                </p>
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Expertise Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-luxury-black via-luxury-midnight to-luxury-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 scroll-fade-in">
            <h2 className="text-5xl md:text-7xl luxury-display text-white mb-6 tracking-wider">
              Our Expertise
            </h2>
            <div className="gold-separator mx-auto w-64 mb-8"></div>
            <p className="text-xl font-playfair text-white/90 max-w-3xl mx-auto leading-relaxed">
              Comprehensive luxury transportation solutions tailored to every occasion and requirement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Executive Transportation",
                description: "Professional chauffeur services for business executives, ensuring punctuality and discretion for important meetings and corporate events.",
                features: ["Confidentiality Assured", "GPS Tracking", "Professional Chauffeurs"]
              },
              {
                title: "Special Events & Weddings",
                description: "Transform special occasions into unforgettable memories with our bespoke luxury transportation solutions.",
                features: ["Custom Decorations", "Flexible Scheduling", "Premium Fleet Selection"]
              },
              {
                title: "Airport Transfers",
                description: "Seamless, stress-free airport transportation with priority service and flight monitoring for timely arrivals.",
                features: ["Flight Tracking", "Meet & Greet", "Priority Service"]
              },
              {
                title: "Luxury Tours",
                description: "Discover breathtaking destinations through the comfort of our premium fleet, guided by expert local knowledge.",
                features: ["Custom Itineraries", "Expert Guides", "Premium Dining"]
              },
              {
                title: "VIP Concierge",
                description: "Complete concierge services ensuring every aspect of your journey is handled with the utmost care and attention.",
                features: ["24/7 Support", "Personal Assistant", "Exclusive Access"]
              },
              {
                title: "Fleet Management",
                description: "Comprehensive vehicle maintenance and management ensuring our fleet remains in impeccable condition.",
                features: ["Regular Maintenance", "Quality Assurance", "Latest Technology"]
              }
            ].map((expertise, index) => (
              <div key={index} className={`group bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm p-8 rounded-sm border border-luxury-gold/20 hover:border-luxury-gold/40 transition-all duration-500 fade-in-up hover:-translate-y-1 scroll-scale-in stagger-${index + 1}`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative mb-6">
                  <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-luxury-gold/30"></div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-luxury-gold/30"></div>
                </div>
                <h3 className="text-2xl luxury-heading text-white mb-4 group-hover:text-luxury-gold transition-colors duration-300">
                  {expertise.title}
                </h3>
                <p className="luxury-sans text-white/80 mb-6 leading-relaxed text-base">
                  {expertise.description}
                </p>
                <ul className="space-y-3">
                  {expertise.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3 group/feature">
                      <div className="flex-shrink-0 w-5 h-5 bg-luxury-gold/20 rounded-full flex items-center justify-center group-hover/feature:bg-luxury-gold transition-colors duration-300">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="luxury-sans text-sm text-white/70 group-hover/feature:text-white transition-colors duration-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-luxury-white via-luxury-ivory to-luxury-pearl relative overflow-hidden">
        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 opacity-3 bg-[radial-gradient(circle_at_2px_2px,rgba(184,134,11,0.05)_1px,transparent_0)] bg-[length:30px_30px]"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl luxury-display text-luxury-black mb-8 tracking-wider">
            Experience Excellence
          </h2>

          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto mb-8"></div>

          <p className="text-xl md:text-2xl font-playfair text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join thousands of discerning clients who trust Chevalier Lane to transform ordinary journeys
            into <span className="text-luxury-gold italic">extraordinary experiences</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/booking/one-way" className="btn-luxury-premium text-xl px-12 py-5 group">
              <Crown className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
              <span>Book Your Experience</span>
            </a>
            <a href="/contact" className="btn-luxury-outline text-xl px-12 py-5 group flex flex-row items-center">
              <Users className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
              <span>Contact Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
