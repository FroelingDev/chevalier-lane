import { Link } from '@tanstack/react-router'
import { ArrowRight, MapPin, Clock, Users, Wine, Star, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

interface TourOption {
  id: string
  name: string
  location: string
  basePrice: number
  priceRange?: [number, number]
  description: string
  duration: string
  minParticipants: number
  maxParticipants?: number
  category: 'buddha-eden' | 'palacio'
  includes: string[]
  highlights?: string[]
  addOns?: {
    id: string
    name: string
    price: number
    description: string
  }[]
}

const tourOptions: TourOption[] = [
  {
    id: 'buddha-eden-gardens',
    name: 'Buddha Eden Gardens Visit',
    location: 'Quinta dos Loridos, Bombarral',
    basePrice: 7,
    description: 'Private chauffeured visit to the stunning Buddha Eden Gardens featuring Asian-inspired sculptures, lakes, pagodas, and contemporary art.',
    duration: '~1.5–2 hours',
    minParticipants: 1,
    category: 'buddha-eden',
    includes: [
      'Chauffeured private arrival',
      'Entrance to Buddha Eden Gardens',
      'Asian-inspired sculptures, lakes, pagodas',
      'Terracotta warriors & contemporary art'
    ],
    highlights: [
      'Over 1,000 sculptures and installations',
      'Peaceful lakes and meditation spaces',
      'Award-winning contemporary art collection',
      'Flexible visit duration'
    ],
    addOns: [
      {
        id: 'garden-train',
        name: 'Garden Tourist Train',
        price: 6,
        description: 'Ride the tourist train around the gardens (€6 pp)'
      }
    ]
  },
  {
    id: 'buddha-eden-wine-tasting',
    name: 'Private Wine Tasting',
    location: 'Quinta dos Loridos, Bombarral',
    basePrice: 30,
    priceRange: [30, 50],
    description: 'Exclusive private tasting of Bacalhôa wines in the estate setting, featuring guided tasting of premium Portuguese wines.',
    duration: '~1-1.5 hours',
    minParticipants: 1,
    category: 'buddha-eden',
    includes: [
      'Guided tasting of 4–6 Bacalhôa wines',
      'Azeitão cheese and dried fruits pairing',
      'Regional snacks and pairings'
    ],
    highlights: [
      'Selection of white, red, and Moscatel wines',
      'Local Azeitão cheese and dried fruits',
      'Expert sommelier guidance',
      'Estate setting with vineyard views'
    ]
  },
  {
    id: 'buddha-eden-full',
    name: 'Full Private Experience',
    location: 'Quinta dos Loridos, Bombarral',
    basePrice: 40,
    priceRange: [40, 60],
    description: 'Complete luxury experience combining the garden visit with private wine tasting in a seamless, chauffeured journey.',
    duration: '~2.5–3 hours',
    minParticipants: 1,
    category: 'buddha-eden',
    includes: [
      'Garden visit + private wine tasting',
      'Chauffeured transportation throughout',
      'Total duration ~2.5–3 hours',
      'Seamless experience coordination'
    ],
    highlights: [
      'Best value combination package',
      'Complete luxury experience',
      'Expert coordination',
      'Flexible timing options'
    ]
  },
  {
    id: 'palacio-wine-tasting',
    name: 'Bacalhôa Wine Tasting',
    location: 'Palácio da Bacalhôa, Azeitão',
    basePrice: 75,
    description: 'Comprehensive private guided experience featuring the historic Palace, extensive art collection, and premium wine tasting.',
    duration: '~2.5 hours',
    minParticipants: 2,
    maxParticipants: 20,
    category: 'palacio',
    includes: [
      'Private guided visit of Palace, gardens, vineyards',
      'Art collection and historic tile museum',
      'Tasting of 4 Bacalhôa wines',
      'Azeitão cheese and dried fruits'
    ],
    highlights: [
      'Historic 16th-century Palace',
      'Extensive art and tile collection',
      'Premium wine selection',
      'Breathtaking vineyard views'
    ]
  },
  {
    id: 'palacio-catarina',
    name: 'Catarina de Bragança Tasting',
    location: 'Palácio da Bacalhôa, Azeitão',
    basePrice: 75,
    description: 'Curated private tour of the Palace with specially selected wine tasting experience featuring regional specialties.',
    duration: '~2 hours',
    minParticipants: 2,
    maxParticipants: 20,
    category: 'palacio',
    includes: [
      'Private guided tour of the Palace',
      'Curated wine tasting experience',
      'Regional cheese and fruit pairings'
    ],
    highlights: [
      'Intimate Palace tour',
      'Curated wine selection',
      'Personalized service',
      'Historic architecture focus'
    ]
  },
  {
    id: 'palacio-carlos',
    name: 'D. Carlos I Tasting',
    location: 'Palácio da Bacalhôa, Azeitão',
    basePrice: 250,
    description: 'Ultra-premium exclusive experience featuring rare vintages, including sparkling reserve wines and a 20-year-old Moscatel de Setúbal.',
    duration: '~2 hours',
    minParticipants: 2,
    maxParticipants: 20,
    category: 'palacio',
    includes: [
      'Exclusive guided tour of the Palace',
      'Tasting of 5 premium wines',
      'Includes sparkling reserve and selected red wines',
      '20-year-old Moscatel de Setúbal'
    ],
    highlights: [
      'Rare and vintage wines',
      'Sparkling wine reserve',
      'Exceptional Moscatel de Setúbal',
      'Ultimate luxury experience'
    ]
  },
  {
    id: 'palacio-standard',
    name: 'Standard Visit & Tasting',
    location: 'Palácio da Bacalhôa, Azeitão',
    basePrice: 15,
    description: 'Accessible introduction to the Palace and Bacalhôa wines, perfect for those seeking a quality experience at great value.',
    duration: '1.5–3 hours',
    minParticipants: 1,
    category: 'palacio',
    includes: [
      'Guided visit of Palace, museum, or Quinta',
      'Standard wine tasting experience'
    ],
    highlights: [
      'Great value introduction',
      'Flexible duration options',
      'Historic site exploration',
      'Quality wine experience'
    ]
  },
  {
    id: 'palacio-food-experience',
    name: 'Wine & Food Experience',
    location: 'Palácio da Bacalhôa, Azeitão',
    basePrice: 200,
    description: 'Culinary journey featuring premium wine tasting perfectly paired with regional Portuguese gastronomy and delicacies.',
    duration: 'Varies',
    minParticipants: 6,
    category: 'palacio',
    includes: [
      'Guided tour of Palace and Quinta',
      'Premium wine tasting paired with regional products',
      'Refined food experience'
    ],
    highlights: [
      'Gastronomic excellence',
      'Regional Portuguese specialties',
      'Wine and food pairing mastery',
      'Group dining experience'
    ]
  }
]

interface TourCardProps {
  tour: TourOption
}

function TourCard({ tour }: TourCardProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm border border-luxury-gold/20 rounded-xl p-8 shadow-luxury hover:shadow-xl transition-all duration-300 hover:border-luxury-gold/40 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <MapPin className="h-4 w-4 text-luxury-gold mr-2 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-600">{tour.location}</span>
          </div>
          <h3 className="text-2xl luxury-heading text-luxury-black mb-2 group-hover:text-luxury-gold transition-colors duration-300">
            {tour.name}
          </h3>
        </div>
        <div className="text-right ml-4">
          <div className="text-2xl font-bold text-luxury-gold">
            {tour.priceRange
              ? `€${tour.priceRange[0]}–${tour.priceRange[1]}`
              : `€${tour.basePrice}`
            }
          </div>
          <div className="text-sm text-gray-500">per person</div>
        </div>
      </div>

      <p className="text-gray-700 mb-6 leading-relaxed">{tour.description}</p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 text-luxury-gold mr-2" />
            <span className="font-medium">Duration:</span>
            <span className="ml-2">{tour.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 text-luxury-gold mr-2" />
            <span className="font-medium">Group:</span>
            <span className="ml-2">
              Min {tour.minParticipants}
              {tour.maxParticipants && ` • Max ${tour.maxParticipants}`}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-luxury-black">Includes:</div>
          <ul className="text-sm text-gray-600 space-y-1">
            {tour.includes.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-center">
                <CheckCircle className="h-3 w-3 text-luxury-gold mr-2 flex-shrink-0" />
                {item}
              </li>
            ))}
            {tour.includes.length > 3 && (
              <li className="text-luxury-gold font-medium">
                +{tour.includes.length - 3} more inclusions
              </li>
            )}
          </ul>
        </div>
      </div>

      {tour.highlights && (
        <div className="border-t border-luxury-gold/10 pt-4">
          <div className="flex items-center mb-3">
            <Star className="h-4 w-4 text-luxury-gold mr-2" />
            <span className="text-sm font-medium text-luxury-black">Highlights</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {tour.highlights.map((highlight, idx) => (
              <div key={idx} className="text-sm text-gray-600 flex items-center">
                <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full mr-3 flex-shrink-0"></div>
                {highlight}
              </div>
            ))}
          </div>
        </div>
      )}

      {tour.addOns && tour.addOns.length > 0 && (
        <div className="border-t border-luxury-gold/10 pt-4 mt-4">
          <div className="text-sm font-medium text-luxury-black mb-2">Optional Add-ons:</div>
          {tour.addOns.map((addOn) => (
            <div key={addOn.id} className="text-sm text-gray-600 bg-luxury-gold/5 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">{addOn.name}</span>
                <span className="text-luxury-gold font-semibold">€{addOn.price} pp</span>
              </div>
              <div className="text-xs mt-1">{addOn.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function TourServicesDisplay() {
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

  const buddhaEdenTours = tourOptions.filter(tour => tour.category === 'buddha-eden')
  const palacioTours = tourOptions.filter(tour => tour.category === 'palacio')

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
              url('/scenic-routes.png')
            `
          }}
        />

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgba(184,134,11,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <div className="backdrop-blur-md bg-black/30 p-12 rounded-lg border border-luxury-gold/30 shadow-2xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl luxury-display text-white tracking-wider leading-tight drop-shadow-2xl mb-6">
                Luxury Tours
              </h1>
              <div className="gold-separator mx-auto w-64 mb-8"></div>
              <p className="text-xl md:text-2xl lg:text-3xl font-playfair text-white/90 mb-8 leading-relaxed font-medium tracking-wider drop-shadow-lg">
                Exclusive Private Wine Experiences
              </p>
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                Discover Portugal's finest wine regions through chauffeured comfort and private experiences at Buddha Eden Gardens and Palácio da Bacalhôa
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/booking/tours" className="btn-luxury-premium text-xl px-12 py-5 group">
                  <Wine className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                  <span>Book Your Tour</span>
                </Link>
                <button
                  onClick={() => document.getElementById('tour-options')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-luxury-outline-premium text-xl px-12 py-5 group"
                >
                  <ArrowRight className="mr-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                  <span>Explore Options</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="tour-options" className="py-32 px-4 bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white relative overflow-hidden">
        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 opacity-3 bg-[linear-gradient(45deg,transparent_25%,rgba(184,134,11,0.03)_25%,rgba(184,134,11,0.03)_50%,transparent_50%,transparent_75%,rgba(184,134,11,0.03)_75%)] bg-[length:24px_24px]"></div>
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_3px_3px,rgba(184,134,11,0.04)_1px,transparent_0)] bg-[length:28px_28px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Buddha Eden Section */}
          <div className="scroll-fade-in mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-luxury-gold/10 rounded-full px-6 py-2 mb-6">
                <MapPin className="h-5 w-5 text-luxury-gold mr-2" />
                <span className="text-luxury-gold font-medium tracking-wide">BOMBARRAL</span>
              </div>
              <h2 className="text-4xl md:text-6xl luxury-heading text-luxury-black mb-6 tracking-wide">
                Buddha Eden Gardens
              </h2>
              <div className="gold-separator w-32 mx-auto mb-6"></div>
              <p className="text-xl font-playfair text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Discover the extraordinary Buddha Eden Gardens, a unique artistic paradise featuring over 1,000 sculptures,
                peaceful lakes, and contemporary art installations. Combine your visit with exclusive private wine tastings
                at the adjacent Quinta dos Loridos estate.
              </p>
            </div>

            <div className="grid lg:grid-cols-1 xl:grid-cols-3 gap-8">
              {buddhaEdenTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>

          {/* Palácio da Bacalhôa Section */}
          <div className="scroll-fade-in">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-luxury-gold/10 rounded-full px-6 py-2 mb-6">
                <MapPin className="h-5 w-5 text-luxury-gold mr-2" />
                <span className="text-luxury-gold font-medium tracking-wide">AZEITÃO</span>
              </div>
              <h2 className="text-4xl md:text-6xl luxury-heading text-luxury-black mb-6 tracking-wide">
                Palácio da Bacalhôa
              </h2>
              <div className="gold-separator w-32 mx-auto mb-6"></div>
              <p className="text-xl font-playfair text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Experience the grandeur of a 16th-century Palace combined with world-class wine production.
                Our exclusive private tours offer intimate access to the historic estate, extensive art collections,
                and premium wine tastings in the heart of Portugal's renowned wine region.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {palacioTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20 scroll-scale-in">
            <div className="bg-gradient-to-r from-luxury-gold/5 via-luxury-gold/10 to-luxury-gold/5 rounded-2xl p-12 border border-luxury-gold/20">
              <h3 className="text-3xl md:text-4xl luxury-heading text-luxury-black mb-6">
                Ready to Create Your Perfect Experience?
              </h3>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Our concierge team is here to customize your luxury tour experience. Whether you prefer the artistic serenity
                of Buddha Eden or the historic elegance of Palácio da Bacalhôa, we'll ensure every detail is perfect.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/booking/tours" className="btn-luxury-premium text-xl px-12 py-5 group">
                  <Wine className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Book Your Tour</span>
                </Link>
                <Link to="/contact" className="btn-luxury-outline-premium text-xl px-12 py-5 group !text-luxury-black hover:!text-luxury-black">
                  <span>Contact Us</span>
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/last-call-to-action.png')`
          }}
        />
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl luxury-display text-white mb-8 tracking-wider">
            Experience Luxury Like Never Before
          </h2>

          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto mb-8"></div>

          <p className="text-xl md:text-2xl font-playfair text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            Every detail of your private tour is meticulously planned to ensure an unforgettable journey through
            Portugal's most exclusive wine experiences.
          </p>

          <div className="grid md:grid-cols-3 gap-12 text-center mb-16">
            <div className="group space-y-4 scroll-scale-in stagger-1">
              <div className="relative">
                <div className="text-4xl md:text-5xl luxury-display text-luxury-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                  Private
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
              <div className="luxury-sans-medium text-white/80 text-lg tracking-wide">Exclusive Access</div>
            </div>
            <div className="group space-y-4 scroll-scale-in stagger-2">
              <div className="relative">
                <div className="text-4xl md:text-5xl luxury-display text-luxury-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                  Chauffeur
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
              <div className="luxury-sans-medium text-white/80 text-lg tracking-wide">Premium Transport</div>
            </div>
            <div className="group space-y-4 scroll-scale-in stagger-3">
              <div className="relative">
                <div className="text-4xl md:text-5xl luxury-display text-luxury-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                  Curated
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
              <div className="luxury-sans-medium text-white/80 text-lg tracking-wide">Personal Experience</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link to="/booking/tours" className="btn-luxury-premium text-xl px-12 py-5 group">
              <Wine className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
              <span>Start Planning</span>
            </Link>
            <div className="flex flex-col sm:flex-row gap-4 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-3 text-white/80">
                <span className="luxury-sans-medium">+34 607 326 237</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3 text-white/80">
                <span className="luxury-sans-medium">info@chevalierlane.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
