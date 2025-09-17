import { useState, useEffect, type FormEvent } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { Calendar, Car, MapPin, User, Clock, CheckCircle } from 'lucide-react'

interface CarOption {
  id: string
  name: string
  category: 'modern' | 'classic'
  image: string
  price: string
}

const carOptions: CarOption[] = [
  // Modern Cars
  {
    id: 'bentley-mulsanne',
    name: 'Bentley Mulsanne',
    category: 'modern',
    image: '/bentley-mulsanne.png',
    price: '€850/day'
  },
  {
    id: 'mercedes-s500-brabus',
    name: 'Mercedes S500 Brabus',
    category: 'modern',
    image: '/mercedes-s500-brabus.png',
    price: '€750/day'
  },
  {
    id: 'range-rover-vogue',
    name: 'Range Rover Vogue',
    category: 'modern',
    image: '/range-rover-vogue.png',
    price: '€650/day'
  },
  {
    id: 'mercedes-gls-300',
    name: 'Mercedes GLS 300',
    category: 'modern',
    image: '/foton-pagoda.png',
    price: '€550/day'
  },
  // Classic Cars
  {
    id: 'rolls-royce-silver-shadow',
    name: 'Rolls-Royce Silver Shadow',
    category: 'classic',
    image: '/rolls-royce-silver-shadow.png',
    price: '€950/day'
  },
  {
    id: 'rolls-royce-silver-cloud-ii',
    name: 'Rolls-Royce Silver Cloud II',
    category: 'classic',
    image: '/rolls-royce-silver-cloud-ii.png',
    price: '€900/day'
  },
  {
    id: 'mercedes-280sl-pagoda',
    name: 'Mercedes 280SL Pagoda',
    category: 'classic',
    image: '/mercedes-pagoda.png',
    price: '€800/day'
  },
  {
    id: 'oldsmobile-super-88',
    name: 'Oldsmobile Super 88',
    category: 'classic',
    image: '/oldsmobile-super-88.png',
    price: '€700/day'
  }
]

interface BookingFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  selectedCar: string
  startLocation: string
  endLocation: string
  passengers: string
  specialRequests: string
  serviceType: string
}

export function OneWayBooking() {
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    selectedCar: '',
    startLocation: '',
    endLocation: '',
    passengers: '1',
    specialRequests: '',
    serviceType: 'one-way'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingComplete] = useState(false)
  const [selectedCar, setSelectedCar] = useState<CarOption | null>(null)
  const [showScheduler, setShowScheduler] = useState(false)
  const [calculatedDurationMinutes, setCalculatedDurationMinutes] = useState<number>(140)

  // Placeholder: compute duration using Google Routes API (route time + 60min). For now fixed 140min
  useEffect(() => {
    if (!formData.startLocation || !formData.endLocation) return
    // TODO: Replace with Google Routes API call. Example:
    // const routeMinutes = await getRouteMinutes(formData.startLocation, formData.endLocation)
    // setCalculatedDurationMinutes(routeMinutes + 60)
    setCalculatedDurationMinutes(140)
  }, [formData.startLocation, formData.endLocation])

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    if (field === 'selectedCar') {
      const car = carOptions.find(c => c.id === value)
      setSelectedCar(car || null)
    }
  }

  const validateForm = (): string[] => {
    const errors: string[] = []

    if (!formData.firstName.trim()) errors.push('First name is required')
    if (!formData.lastName.trim()) errors.push('Last name is required')
    if (!formData.email.trim()) errors.push('Email is required')
    if (!formData.phone.trim()) errors.push('Phone number is required')
    if (!formData.selectedCar) errors.push('Please select a vehicle')
    if (!formData.startLocation.trim()) errors.push('Starting location is required')
    if (!formData.endLocation.trim()) errors.push('Final destination is required')

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address')
    }

    // Date validation
    // Pickup date/time is selected in Cal embed

    // Return date validation (if provided)
    // No pickup date in the form anymore

    return errors
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const errors = validateForm()
    if (errors.length > 0) {
      alert('Please fix the following errors:\n' + errors.join('\n'))
      return
    }
    setIsSubmitting(true)
    try {
      setShowScheduler(true)
      setTimeout(() => {
        document.getElementById('cal-scheduler')?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    } catch (error) {
      console.error('Error initializing scheduler:', error)
      alert('There was an error initializing the scheduler. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-luxury p-12 border border-luxury-gold/20">
            <CheckCircle className="h-20 w-20 text-luxury-gold mx-auto mb-6" />
            <h1 className="text-4xl luxury-display text-luxury-black mb-6">Booking Confirmed!</h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Thank you for choosing Chevalier Lane. Your booking request has been received and our concierge team will contact you shortly to confirm the details and finalize your reservation.
            </p>
            <div className="bg-luxury-gold/5 p-6 rounded-lg border border-luxury-gold/10">
              <p className="text-sm text-gray-600">
                A confirmation email has been sent to <span className="font-semibold text-luxury-black">{formData.email}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white">
      {/* Header */}
      <section className="bg-luxury-black py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl luxury-display text-white mb-6 tracking-wider">
            Book Your One-Way Transfer
          </h1>
          <div className="gold-separator mx-auto w-64 mb-8"></div>
          <p className="text-xl font-playfair text-white/90 leading-relaxed">
            Experience luxury transportation with our premium chauffeur service. Reserve your vehicle and destinations below.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <User className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">Personal Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder="Enter your last name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder="+351 123 456 789"
                  />
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">Trip Details</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Starting Location</label>
                  <input
                    type="text"
                    required
                    value={formData.startLocation}
                    onChange={(e) => handleInputChange('startLocation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder="e.g., Lisbon Airport, Hotel Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Final Destination</label>
                  <input
                    type="text"
                    required
                    value={formData.endLocation}
                    onChange={(e) => handleInputChange('endLocation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder="e.g., Porto City Center, Algarve Resort"
                  />
                </div>

                {/* Pickup date/time will be chosen in the Cal.com scheduler */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Passengers</label>
                  <select
                    value={formData.passengers}
                    onChange={(e) => handleInputChange('passengers', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map(num => (
                      <option key={num} value={num.toString()}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Vehicle Selection */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <Car className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">Select Your Vehicle</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {carOptions.map((car) => (
                  <div
                    key={car.id}
                    className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      formData.selectedCar === car.id
                        ? 'border-luxury-gold bg-luxury-gold/5 shadow-lg'
                        : 'border-gray-200 hover:border-luxury-gold/50'
                    }`}
                    onClick={() => handleInputChange('selectedCar', car.id)}
                  >
                    <div className="aspect-video mb-4 overflow-hidden rounded-md">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'legacy.png'
                        }}
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-luxury-black mb-2">{car.name}</h3>
                    <p className="text-luxury-gold font-medium mb-2">{car.price}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      car.category === 'modern'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>


            {/* Special Requests */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <Clock className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">Special Requests</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors resize-none"
                  placeholder="Any special requirements, accessibility needs, or additional services..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting || !formData.selectedCar}
                className={`btn-luxury-premium text-xl px-12 py-5 group ${
                  isSubmitting || !formData.selectedCar ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Processing Booking...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Book with Cal.com</span>
                  </div>
                )}
              </button>

              {!formData.selectedCar && (
                <p className="text-red-600 mt-2 text-sm">
                  Please select a vehicle to proceed
                </p>
              )}
            </div>
          </form>

          {/* Cal.com Scheduler Embed (non-Platform) */}
          {showScheduler && selectedCar && (
            <div id="cal-scheduler" className="mt-12 bg-white rounded-lg shadow-luxury pb-32 p-6 border border-luxury-gold/20">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 text-luxury-gold mr-3" />
                <h3 className="text-xl luxury-heading text-luxury-black">
                  Schedule your {selectedCar.name}
                </h3>
              </div>
              {!import.meta.env.VITE_CAL_USERNAME ? (
                <div className="text-sm text-red-600">Missing Cal.com username. Please set <code>VITE_CAL_USERNAME</code>.</div>
              ) : (
                <Cal
                  calLink={`${import.meta.env.VITE_CAL_USERNAME}/one-way-${selectedCar.id}`}
                  style={{ width: '100%', height: 'min(800px, 80vh)', border: '0', maxWidth: '100%' }}
                  config={{
                    layout: 'month_view',
                    theme: 'light',
                  // Date/time will be selected in the Cal widget
                    date: '',
                    // Pass metadata/prefill via query params
                    name: `${formData.firstName} ${formData.lastName}`.trim(),
                    email: formData.email,
                    notes: `From ${formData.startLocation} to ${formData.endLocation}. Passengers: ${formData.passengers}. Phone: ${formData.phone}. Special: ${formData.specialRequests}. Est: ${calculatedDurationMinutes}min.`,
                  }}
                  onLoad={async () => {
                    // set fixed duration for now; later replace with Google Routes minutes + 60
                    try {
                      const cal = await getCalApi()
                      // The embed API supports dispatching commands via ns
                      // @ts-expect-error: runtime API shape
                      cal?.('event-type:set', { duration: calculatedDurationMinutes })
                    } catch {}
                  }}
                />
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
