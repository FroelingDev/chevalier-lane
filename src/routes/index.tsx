import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Star, Check, Calendar, Users } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/hero-section.png')`
          }}
        />

        {/* Top Left - Chevalier Lane Title */}
        <div className="absolute top-16 left-8 lg:top-24 lg:left-16 z-10 fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-6xl luxury-serif-bold text-white tracking-wide leading-tight">
            Your Personal<br />
            Chauffeur<br />
            Service
          </h1>
        </div>

        {/* Bottom Right - Paragraph and Buttons */}
        <div className="absolute bottom-16 right-8 lg:bottom-24 lg:right-16 z-10 text-right max-w-lg fade-in p-4">
          <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-playfair text-white mb-8 leading-relaxed font-medium tracking-wide">
            From Rolls-Royce elegance to modern Bentley comfort — travel with distinction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-end items-end">
            <Link to="/contact" className="btn-luxury text-lg inline-flex items-center gap-2">
              Discover Elegance
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/classic" className="btn-luxury-outline text-lg">
              Explore Our Fleet
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 bg-luxury-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl luxury-serif-bold text-luxury-black mb-6">
              A Legacy of Excellence
            </h2>
            <div className="gold-separator mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
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

            <div className="relative">
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
      <section className="py-24 px-4 bg-luxury-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl luxury-serif-bold text-luxury-black mb-6">
              Curated Experiences
            </h2>
            <div className="gold-separator mx-auto mb-8"></div>
            <p className="text-xl luxury-sans text-gray-600 max-w-3xl mx-auto">
              Every journey with Chevalier Lane is meticulously crafted to exceed expectations,
              offering unparalleled service that transforms ordinary moments into extraordinary memories.
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
              <div key={index} className="group bg-white rounded-sm shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl luxury-serif-bold text-luxury-black mb-3">
                    {service.title}
                  </h3>
                  <p className="luxury-sans text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-luxury-gold flex-shrink-0" />
                        <span className="luxury-sans text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-luxury-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl luxury-serif-bold text-luxury-black mb-6">
              Distinguished Clientele
            </h2>
            <div className="gold-separator mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Chevalier Lane transformed our wedding day into an experience of pure elegance. Their attention to detail and sophistication exceeded our every expectation.",
                author: "Victoria & James Harrington",
                title: "Private Clients",
                rating: 5
              },
              {
                quote: "As someone who demands excellence in every aspect of business, Chevalier Lane consistently delivers unparalleled service. Their fleet and professionalism are truly world-class.",
                author: "Marcus Chen",
                title: "CEO, Chen Enterprises",
                rating: 5
              },
              {
                quote: "The Rolls-Royce Silver Shadow they provided for our anniversary celebration was nothing short of spectacular. Every moment felt like royalty.",
                author: "Elena Rodriguez",
                title: "Art Collector",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-luxury-ivory p-8 rounded-sm shadow-lg fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-luxury-gold text-luxury-gold" />
                  ))}
                </div>
                <blockquote className="luxury-serif text-luxury-black text-lg leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-luxury-gold/20 pt-4">
                  <div className="luxury-sans-medium text-luxury-black font-semibold">
                    {testimonial.author}
                  </div>
                  <div className="luxury-sans text-gray-600 text-sm">
                    {testimonial.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 px-4 bg-luxury-black relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('hero-section.png')`
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl luxury-serif-bold text-white mb-6">
            Reserve Your Place
          </h2>
          <p className="text-xl luxury-sans text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join an exclusive circle of discerning individuals who understand that true luxury
            is not just about the destination, but the journey itself.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link to="/contact" className="btn-luxury text-lg">
              <Calendar className="mr-2 h-5 w-5" />
              Book Your Experience
            </Link>
            <Link to="/services" className="btn-luxury-outline text-lg text-white border-white hover:bg-white hover:text-luxury-black">
              <Users className="mr-2 h-5 w-5" />
              Learn More
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-2xl luxury-serif-bold text-luxury-gold">24/7</div>
              <div className="luxury-sans text-white/80">Available Service</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl luxury-serif-bold text-luxury-gold">Premium</div>
              <div className="luxury-sans text-white/80">Fleet Selection</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl luxury-serif-bold text-luxury-gold">Elite</div>
              <div className="luxury-sans text-white/80">Client Experience</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
