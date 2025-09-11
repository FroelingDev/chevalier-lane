import { Link } from '@tanstack/react-router'

interface CarPrice {
  label: string
  value: string
}

interface Car {
  id: string
  name: string
  image: string
  link: string
  prices: CarPrice[]
  description?: string
  features?: string[]
  year?: string
  category: 'classic' | 'modern'
}

interface CarMarketplaceProps {
  title: string
  subtitle: string
  description: string
  heroImage: string
  cars: Car[]
}

export function CarMarketplace({
  title,
  subtitle,
  description,
  heroImage,
  cars
}: CarMarketplaceProps) {

  return (
    <div className="min-h-screen">
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
                <Link to="/contact" className="btn-luxury-premium text-xl px-12 py-5 group">
                  <span>Book Your Car</span>
                </Link>
                <button
                  onClick={() => document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-luxury-outline-premium text-xl px-12 py-5 group"
                >
                  <span>Explore Fleet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section id="marketplace" className="py-32 px-4 bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white relative overflow-hidden">
        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 opacity-3 bg-[linear-gradient(45deg,transparent_25%,rgba(184,134,11,0.03)_25%,rgba(184,134,11,0.03)_50%,transparent_50%,transparent_75%,rgba(184,134,11,0.03)_75%)] bg-[length:24px_24px]"></div>
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_3px_3px,rgba(184,134,11,0.04)_1px,transparent_0)] bg-[length:28px_28px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl luxury-display text-luxury-black mb-6 tracking-wider">
              Our Complete Fleet
            </h2>
            <div className="gold-separator mx-auto w-64 mb-4"></div>
            <p className="text-xl font-playfair text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>

          {/* Cars Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car, index) => (
              <div
                key={car.id}
                className="group bg-white rounded-sm shadow-luxury-soft overflow-hidden hover:shadow-luxury transition-all duration-500 fade-in-up hover:-translate-y-2 border border-luxury-gold/10 scroll-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Car Image */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-b from-luxury-ivory to-luxury-pearl">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = 'legacy.png'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-sm ${
                      car.category === 'classic'
                        ? 'bg-luxury-gold text-luxury-black'
                        : 'bg-luxury-champagne text-luxury-black'
                    }`}>
                      {car.category}
                    </span>
                  </div>

                  {/* Year Badge */}
                  {car.year && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 text-xs font-bold bg-black/50 text-white rounded-sm">
                        {car.year}
                      </span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="h-0.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </div>

                {/* Car Details */}
                <div className="p-6 relative">
                  {/* Decorative top border */}
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent"></div>

                  <h3 className="text-2xl luxury-heading text-luxury-black mb-3 tracking-wide text-center group-hover:text-luxury-gold transition-colors duration-300">
                    {car.name}
                  </h3>

                  {car.description && (
                    <p className="luxury-sans text-gray-600 mb-4 leading-relaxed text-sm text-center">
                      {car.description}
                    </p>
                  )}

                  {/* Features */}
                  {car.features && car.features.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {car.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-luxury-gold/10 text-luxury-gold text-xs rounded-sm">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pricing */}
                  <div className="space-y-2 mb-6">
                    {car.prices.slice(0, 2).map((price, idx) => (
                      <div key={idx} className="group/price flex items-center justify-between py-2 px-3 bg-gradient-to-r from-luxury-gold/5 to-transparent rounded-sm border border-luxury-gold/10 hover:border-luxury-gold/30 transition-all duration-300">
                        <span className="text-xs luxury-sans text-gray-700 group-hover/price:text-luxury-black transition-colors duration-300">{price.label}</span>
                        <span className="text-sm luxury-sans-medium text-luxury-gold font-semibold group-hover/price:scale-105 transition-transform duration-300">{price.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="text-center">
                    <Link
                      to={car.link}
                      className="inline-block bg-luxury-gold text-luxury-black font-playfair text-sm px-6 py-3 rounded-sm border border-luxury-gold hover:bg-luxury-champagne transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-luxury-gold/30 hover:scale-105"
                    >
                      View Details
                    </Link>
                  </div>

                  {/* Decorative bottom border */}
                  <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent"></div>
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

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl luxury-display text-white mb-8 tracking-wider">
            Ready to Experience Luxury?
          </h2>

          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto mb-8"></div>

          <p className="text-xl md:text-2xl font-playfair text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Choose from our exquisite collection and let our professional chauffeurs transport you in unparalleled style and comfort.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link to="/contact" className="btn-luxury-premium text-xl px-12 py-5 group">
              <span>Book Your Vehicle</span>
            </Link>
            <Link to="/services" className="btn-luxury-outline-premium text-xl px-12 py-5 group">
              <span>View Services</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
