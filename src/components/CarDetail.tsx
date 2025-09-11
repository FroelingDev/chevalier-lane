import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar, Star, Phone, Mail, ArrowRight } from 'lucide-react'

interface CarImage {
  src: string
  alt: string
  caption?: string
}

interface CarPrice {
  label: string
  value: string
}

interface CarFeature {
  title: string
  description: string
  icon?: string
}

interface CarDetailProps {
  name: string
  year: string
  category: 'classic' | 'modern'
  images: CarImage[]
  description: string
  features: CarFeature[]
  specifications: Record<string, string>
  prices: CarPrice[]
  heroImage?: string
}

export function CarDetail({
  name,
  year,
  category,
  images,
  description,
  features,
  specifications,
  prices,
  heroImage
}: CarDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="min-h-screen">
      {/* Scroll Progress Indicator */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(184, 134, 11, 0.15) 0%, rgba(26, 26, 26, 0.5) 50%, rgba(212, 175, 55, 0.15) 100%),
              linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)),
              url('${heroImage || images[0]?.src || 'hero-section.png'}')
            `
          }}
        />

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-3 bg-[radial-gradient(circle_at_1px_1px,rgba(184,134,11,0.2)_1px,transparent_0)] bg-[length:24px_24px]"></div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto px-6">
            {/* Centered Compact Content Box */}
            <div className="backdrop-blur-sm bg-black/20 p-8 rounded-lg border border-luxury-gold/20 shadow-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl luxury-display text-white tracking-wider leading-tight drop-shadow-xl mb-4">
                {name}
              </h1>

              {/* Compact category and year display */}
              <div className="flex items-center justify-center space-x-4 mb-4">
                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-sm ${
                  category === 'classic'
                    ? 'bg-luxury-gold text-luxury-black'
                    : 'bg-luxury-champagne text-luxury-black'
                }`}>
                  {category}
                </span>
                <span className="text-luxury-gold text-lg font-semibold">{year}</span>
              </div>

              {/* Shortened description */}
              <p className="text-lg md:text-xl font-playfair text-white/90 mb-6 leading-relaxed drop-shadow-md">
                {description.length > 120 ? description.substring(0, 120) + '...' : description}
              </p>

              {/* Compact action buttons */}
              <div className="flex justify-center gap-4">
                <Link to="/contact" className="btn-luxury-premium text-sm px-8 py-3 group">
                  <Calendar className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                  <span>Reserve</span>
                </Link>
                <button
                  onClick={() => document.getElementById('car-gallery')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-luxury-outline-premium text-sm px-8 py-3 group"
                >
                  <ArrowRight className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                  <span>Explore</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Car Gallery & Details Section */}
      <section id="car-gallery" className="py-32 px-4 bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white relative overflow-hidden">
        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 opacity-3 bg-[linear-gradient(45deg,transparent_25%,rgba(184,134,11,0.03)_25%,rgba(184,134,11,0.03)_50%,transparent_50%,transparent_75%,rgba(184,134,11,0.03)_75%)] bg-[length:24px_24px]"></div>
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_3px_3px,rgba(184,134,11,0.04)_1px,transparent_0)] bg-[length:28px_28px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Image Gallery */}
            <div className="space-y-6 scroll-fade-in">
              <div className="relative">
                {/* Main Image */}
                <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-sm shadow-luxury">
                  <img
                    src={images[currentImageIndex]?.src}
                    alt={images[currentImageIndex]?.alt}
                    className="w-full h-full object-cover transition-opacity duration-500"
                    onError={(e) => {
                      e.currentTarget.src = 'legacy.png'
                    }}
                  />

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 backdrop-blur-sm border-2 border-luxury-gold/40 shadow-luxury hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 flex items-center justify-center group"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 backdrop-blur-sm border-2 border-luxury-gold/40 shadow-luxury hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 flex items-center justify-center group"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-sm">
                    <span className="text-white text-sm luxury-sans-medium">
                      {currentImageIndex + 1} / {images.length}
                    </span>
                  </div>
                </div>

                {/* Image Caption */}
                {images[currentImageIndex]?.caption && (
                  <p className="text-center text-gray-600 mt-3 text-sm luxury-sans-medium">
                    {images[currentImageIndex].caption}
                  </p>
                )}
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-sm overflow-hidden border-2 transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'border-luxury-gold shadow-lg scale-105'
                        : 'border-gray-200 hover:border-luxury-gold/50'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'legacy.png'
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Car Details */}
            <div className="space-y-8 scroll-slide-right">
              {/* Description */}
              <div>
                <h2 className="text-3xl md:text-4xl luxury-heading text-luxury-black mb-6 tracking-wide">
                  About This Vehicle
                </h2>
                <div className="gold-separator w-24 mb-6"></div>
                <p className="text-lg font-playfair text-gray-700 leading-relaxed mb-6">
                  {description}
                </p>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-2xl luxury-heading text-luxury-black mb-4 tracking-wide">
                  Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                      <div className="flex justify-between items-center">
                        <span className="luxury-sans-medium text-gray-700 text-sm">{key}</span>
                        <span className="text-luxury-gold font-semibold text-sm">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-2xl luxury-heading text-luxury-black mb-4 tracking-wide">
                  Key Features
                </h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4 group/feature">
                      <div className="flex-shrink-0 w-8 h-8 bg-luxury-gold/10 rounded-full flex items-center justify-center group-hover/feature:bg-luxury-gold transition-colors duration-300 mt-1">
                        <Star className="h-4 w-4 text-luxury-gold group-hover/feature:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <h4 className="luxury-sans-medium text-luxury-black mb-1 group-hover/feature:text-luxury-gold transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="luxury-sans text-gray-600 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="text-2xl luxury-heading text-luxury-black mb-4 tracking-wide">
                  Pricing Options
                </h3>
                <div className="space-y-3">
                  {prices.map((price, index) => (
                    <div key={index} className="bg-gradient-to-r from-luxury-gold/5 to-transparent p-4 rounded-sm border border-luxury-gold/10">
                      <div className="flex justify-between items-center">
                        <span className="luxury-sans-medium text-gray-700">{price.label}</span>
                        <span className="text-luxury-gold font-semibold">{price.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-center text-gray-600 luxury-sans-medium opacity-80 mt-3">
                  Prices are Subject to VAT
                </p>
              </div>

              {/* Reserve Button */}
              <div className="pt-6">
                <Link to="/contact" className="btn-luxury-premium text-xl px-12 py-5 group w-full justify-center">
                  <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                  <span>Reserve This Vehicle</span>
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                </Link>
              </div>
            </div>
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

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl luxury-display text-white mb-8 tracking-wider">
            Ready to Experience Luxury?
          </h2>

          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto mb-8"></div>

          <p className="text-xl md:text-2xl font-playfair text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Contact our concierge team to arrange your exclusive transportation experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link to="/contact" className="btn-luxury-premium text-xl px-12 py-5 group">
              <Phone className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
              <span>Call Concierge</span>
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
        </div>
      </section>
    </div>
  )
}
