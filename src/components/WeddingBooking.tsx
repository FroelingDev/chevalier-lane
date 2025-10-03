import { useState, useEffect, type FormEvent } from 'react'
import { Calendar, Car, User, Clock, CheckCircle, Heart } from 'lucide-react'
import { usePlacesAutocomplete } from '../lib/usePlacesAutocomplete'

export interface WeddingVehicle {
  id: string
  name: string
  category: 'main' | 'transport'
  image: string
  hourlyRate?: number
  minimumHours?: number
  twelveHourRate?: number
  perTripRate?: number
  maxTripsPerHour?: number
  maxTripsPerBooking?: number
  seats?: number
  vatRate: number // 0.23 for main fleet, 0.06 for transport
}

export const weddingVehicles: WeddingVehicle[] = [
  // Main Wedding Fleet (Stationary/Couples) - 23% VAT
  {
    id: 'rolls-royce-silver-cloud-ii',
    name: 'Rolls-Royce Silver Cloud II 1961',
    category: 'main',
    image: '/rolls-royce-silver-cloud-ii.png',
    hourlyRate: 300,
    minimumHours: 3,
    twelveHourRate: 3600,
    vatRate: 0.23
  },
  {
    id: 'rolls-royce-silver-shadow',
    name: 'Rolls-Royce Silver Shadow 1973',
    category: 'main',
    image: '/rolls-royce-silver-shadow.png',
    hourlyRate: 270,
    minimumHours: 3,
    twelveHourRate: 3240,
    vatRate: 0.23
  },
  {
    id: 'oldsmobile-super-88',
    name: 'Oldsmobile Super 88 1961',
    category: 'main',
    image: '/oldsmobile-super-88.png',
    hourlyRate: 350,
    minimumHours: 3,
    twelveHourRate: 4200,
    vatRate: 0.23
  },
  {
    id: 'mercedes-280sl-pagoda',
    name: 'Mercedes 280SL Pagoda 1969',
    category: 'main',
    image: '/mercedes-pagoda.png',
    hourlyRate: 250,
    minimumHours: 3,
    twelveHourRate: 3000,
    vatRate: 0.23
  },
  // Additional Wedding Transport Vehicles - 6% VAT
  {
    id: 'bentley-mulsanne-transport',
    name: 'Bentley Mulsanne',
    category: 'transport',
    image: '/bentley-mulsanne.png',
    perTripRate: 150,
    maxTripsPerHour: 2,
    maxTripsPerBooking: 6,
    seats: 4,
    vatRate: 0.06
  },
  {
    id: 'mercedes-brabus-transport',
    name: 'Mercedes Brabus',
    category: 'transport',
    image: '/mercedes-s500-brabus.png',
    perTripRate: 120,
    maxTripsPerHour: 2,
    maxTripsPerBooking: 6,
    seats: 4,
    vatRate: 0.06
  },
  // {
  //   id: 'mercedes-maybach-transport',
  //   name: 'Mercedes Maybach (Transport)',
  //   category: 'transport',
  //   image: '/foton-pagoda.png',
  //   perTripRate: 140,
  //   maxTripsPerHour: 2,
  //   maxTripsPerBooking: 6,
  //   seats: 3,
  //   vatRate: 0.06
  // },
  {
    id: 'mercedes-glc-300-transport',
    name: 'Mercedes GLC 300',
    category: 'transport',
    image: '/glc300-1.png',
    perTripRate: 100,
    maxTripsPerHour: 2,
    maxTripsPerBooking: 6,
    seats: 4,
    vatRate: 0.06
  }
]

interface DecorationOption {
  id: string
  name: string
  description: string
  priceRange: string
  minPrice: number
  maxPrice: number
}

const decorationOptions: DecorationOption[] = [
  {
    id: 'basic',
    name: 'Basic Decoration',
    description: 'Artificial or simple natural flowers + ribbons',
    priceRange: '€150 - €300',
    minPrice: 150,
    maxPrice: 300
  },
  {
    id: 'intermediate',
    name: 'Intermediate Decoration',
    description: 'Medium quality natural flowers, front and side arrangements, bows',
    priceRange: '€300 - €600',
    minPrice: 300,
    maxPrice: 600
  },
  {
    id: 'luxury',
    name: 'Luxury Decoration',
    description: 'Premium flowers, multiple arrangements, detailed design, seasonal fresh or imported flowers, professional setup',
    priceRange: '€600 - €1,200+',
    minPrice: 600,
    maxPrice: 1200
  }
]

interface BookingFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  selectedVehicle: string
  serviceType: 'main' | 'transport'
  durationHours: string
  numberOfTrips: string
  startLocation: string
  endLocation: string
  eventDate: string
  eventTime: string
  specialRequests: string
  decorationOption: string
  decorationPrice: string
}

// Available booking durations in hours
const DURATION_OPTIONS = [3, 4, 5, 6, 8, 10, 12]

// Calculate price based on vehicle, duration/trips, and VAT
const calculatePrice = (
  vehicle: WeddingVehicle,
  serviceType: 'main' | 'transport',
  durationHours: number,
  numberOfTrips: number,
  decorationPrice: number
): number => {
  let basePrice = 0

  if (serviceType === 'main' && vehicle.hourlyRate) {
    if (durationHours === 12 && vehicle.twelveHourRate) {
      basePrice = vehicle.twelveHourRate
    } else if (durationHours >= vehicle.minimumHours!) {
      basePrice = vehicle.hourlyRate * durationHours
    }
  } else if (serviceType === 'transport' && vehicle.perTripRate) {
    basePrice = vehicle.perTripRate * numberOfTrips
  }

  // Add decoration price
  basePrice += decorationPrice

  // Add VAT
  const priceWithVat = basePrice * (1 + vehicle.vatRate)

  return priceWithVat
}

export function WeddingBooking() {
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    selectedVehicle: '',
    serviceType: 'main',
    durationHours: '3',
    numberOfTrips: '1',
    startLocation: '',
    endLocation: '',
    eventDate: '',
    eventTime: '',
    specialRequests: '',
    decorationOption: '',
    decorationPrice: '0'
  })

  const [bookingComplete, setBookingComplete] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<WeddingVehicle | null>(null)
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Google Places Autocomplete hooks
  const startLocationAutocomplete = usePlacesAutocomplete({
    onPlaceSelect: (place) => {
      if (place.formatted_address) {
        handleInputChange('startLocation', place.formatted_address)
      }
    },
    types: ['establishment', 'geocode'],
    componentRestrictions: { country: 'PT' },
  })

  const endLocationAutocomplete = usePlacesAutocomplete({
    onPlaceSelect: (place) => {
      if (place.formatted_address) {
        handleInputChange('endLocation', place.formatted_address)
      }
    },
    types: ['establishment', 'geocode'],
    componentRestrictions: { country: 'PT' },
  })

  // Calculate price when relevant fields change
  useEffect(() => {
    if (selectedVehicle) {
      const duration = parseInt(formData.durationHours) || 0
      const trips = parseInt(formData.numberOfTrips) || 0
      const decorationPrice = parseFloat(formData.decorationPrice) || 0

      const price = calculatePrice(
        selectedVehicle,
        formData.serviceType,
        duration,
        trips,
        decorationPrice
      )
      setCalculatedPrice(price)
    }
  }, [selectedVehicle, formData.serviceType, formData.durationHours, formData.numberOfTrips, formData.decorationPrice])

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    if (field === 'serviceType') {
      setSelectedVehicle(null)
      setCalculatedPrice(null)
      setFormData(prev => ({
        ...prev,
        serviceType: value as BookingFormData['serviceType'],
        selectedVehicle: '',
        durationHours: value === 'main' ? prev.durationHours || '3' : prev.durationHours,
        numberOfTrips: value === 'transport' ? prev.numberOfTrips || '1' : prev.numberOfTrips
      }))
      return
    }

    if (field === 'selectedVehicle') {
      setSelectedVehicle(weddingVehicles.find(v => v.id === value) || null)
      setFormData(prev => ({ ...prev, selectedVehicle: value }))
      return
    } else if (field === 'decorationOption') {
      const decoration = decorationOptions.find(d => d.id === value)
      setFormData(prev => {
        if (decoration) {
          const defaultPrice = Math.round((decoration.minPrice + decoration.maxPrice) / 2)
          return { ...prev, decorationOption: value, decorationPrice: defaultPrice.toString() }
        }
        return { ...prev, decorationOption: '', decorationPrice: '0' }
      })
      return
    }

    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = (): string[] => {
    const errors: string[] = []

    if (!formData.firstName.trim()) errors.push('First name is required')
    if (!formData.lastName.trim()) errors.push('Last name is required')
    if (!formData.email.trim()) errors.push('Email is required')
    if (!formData.phone.trim()) errors.push('Phone number is required')
    if (!formData.selectedVehicle) errors.push('Please select a vehicle')
    if (!formData.startLocation.trim()) errors.push('Starting location is required')
    if (!formData.endLocation.trim()) errors.push('Final location is required')
    if (!formData.eventDate) errors.push('Event date is required')
    if (!formData.eventTime) errors.push('Event time is required')

    if (formData.serviceType === 'main') {
      if (!formData.durationHours || parseInt(formData.durationHours) < 3) {
        errors.push('Minimum 3 hours required for main fleet bookings')
      }
    }

    if (formData.serviceType === 'transport') {
      if (!formData.numberOfTrips || parseInt(formData.numberOfTrips) < 1) {
        errors.push('At least 1 trip required for transport bookings')
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address')
    }

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
    setSubmitError(null)

    try {
      const response = await fetch('/api/wedding-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          calculatedPrice,
          selectedVehicleName: selectedVehicle?.name,
          decorationOptionName: formData.decorationOption
            ? decorationOptions.find(d => d.id === formData.decorationOption)?.name || null
            : null
        })
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'Failed to submit booking. Please try again.')
      }

      setBookingComplete(true)
    } catch (error) {
      console.error('Error submitting wedding booking:', error)
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred')
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
            <h1 className="text-4xl luxury-display text-luxury-black mb-6">Wedding Booking Confirmed!</h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Thank you for choosing Chevalier Lane for your special day. Your wedding transportation booking request has been received and our concierge team will contact you shortly to confirm the details and finalize your reservation.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white">
      {/* Header */}
      <section className="relative py-20 px-4 bg-cover bg-center" style={{ backgroundImage: 'url(/special-events.png)' }}>
        <div className="absolute inset-0 bg-luxury-black/60"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl luxury-display text-white mb-6 tracking-wider">
            Book Your Wedding Transport
          </h1>
          <div className="gold-separator mx-auto w-64 mb-8"></div>
          <p className="text-xl font-playfair text-white/90 leading-relaxed">
            Create unforgettable memories with our premium wedding transportation services. Choose from our classic main fleet for the couple or additional transport vehicles for your guests.
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
                    placeholder="+34 607 326 237"
                  />
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <Heart className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">Wedding Event Details</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Wedding Date</label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => handleInputChange('eventDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Start Time</label>
                  <input
                    type="time"
                    required
                    value={formData.eventTime}
                    onChange={(e) => handleInputChange('eventTime', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Starting Location</label>
                  <input
                    ref={startLocationAutocomplete.inputRef}
                    type="text"
                    required
                    value={formData.startLocation}
                    onChange={(e) => handleInputChange('startLocation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder="e.g., Hotel, Church, Home"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Final Location</label>
                  <input
                    ref={endLocationAutocomplete.inputRef}
                    type="text"
                    required
                    value={formData.endLocation}
                    onChange={(e) => handleInputChange('endLocation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder="e.g., Ceremony Venue, Reception Hall"
                  />
                </div>
              </div>
            </div>

            {/* Service Type Selection */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <h2 className="text-2xl luxury-heading text-luxury-black mb-6">Service Type</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    formData.serviceType === 'main'
                      ? 'border-luxury-gold bg-luxury-gold/5'
                      : 'border-gray-200 hover:border-luxury-gold/50'
                  }`}
                  onClick={() => handleInputChange('serviceType', 'main')}
                >
                  <h3 className="text-lg font-semibold text-luxury-black mb-2">Main Wedding Fleet</h3>
                  <p className="text-sm text-gray-600 mb-2">For the couple - stationary use, photos, ceremonies (23% VAT)</p>
                  <p className="text-luxury-gold font-medium">Hourly rates from €250</p>
                </div>

                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    formData.serviceType === 'transport'
                      ? 'border-luxury-gold bg-luxury-gold/5'
                      : 'border-gray-200 hover:border-luxury-gold/50'
                  }`}
                  onClick={() => handleInputChange('serviceType', 'transport')}
                >
                  <h3 className="text-lg font-semibold text-luxury-black mb-2">Guest Transport</h3>
                  <p className="text-sm text-gray-600 mb-2">For transporting wedding guests and party (6% VAT)</p>
                  <p className="text-luxury-gold font-medium">Per-trip rates from €100</p>
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
                {weddingVehicles
                  .filter(vehicle => vehicle.category === formData.serviceType)
                  .map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      formData.selectedVehicle === vehicle.id
                        ? 'border-luxury-gold bg-luxury-gold/5 shadow-lg'
                        : 'border-gray-200 hover:border-luxury-gold/50'
                    }`}
                    onClick={() => handleInputChange('selectedVehicle', vehicle.id)}
                  >
                    <div className="aspect-video mb-4 overflow-hidden rounded-md">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'legacy.png'
                        }}
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-luxury-black mb-2">{vehicle.name}</h3>
                    {vehicle.category === 'main' && vehicle.hourlyRate && (
                      <p className="text-luxury-gold font-medium mb-2">
                        €{vehicle.hourlyRate}/hour (min {vehicle.minimumHours}h)
                      </p>
                    )}
                    {vehicle.category === 'transport' && vehicle.perTripRate && (
                      <p className="text-luxury-gold font-medium mb-2">
                        €{vehicle.perTripRate}/trip
                      </p>
                    )}
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      vehicle.category === 'main'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {vehicle.category === 'main' ? 'Main Fleet' : 'Transport'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Details */}
            {selectedVehicle && (
              <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
                <h2 className="text-2xl luxury-heading text-luxury-black mb-6">Booking Details</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {formData.serviceType === 'main' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Hours)</label>
                      <select
                        value={formData.durationHours}
                        onChange={(e) => handleInputChange('durationHours', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                      >
                        {DURATION_OPTIONS.map(hours => (
                          <option key={hours} value={hours.toString()}>
                            {hours} hours {hours === 12 ? '(Full Day Rate)' : ''}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">Minimum 3 hours required</p>
                    </div>
                  )}

                  {formData.serviceType === 'transport' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Number of Trips</label>
                      <select
                        value={formData.numberOfTrips}
                        onChange={(e) => handleInputChange('numberOfTrips', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                      >
                        {[1, 2, 3, 4, 5, 6].map(trips => (
                          <option key={trips} value={trips.toString()}>{trips} trip{trips > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">Maximum 6 trips per booking, 2 trips per hour</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Decoration Options (Optional)</label>
                    <select
                      value={formData.decorationOption}
                      onChange={(e) => handleInputChange('decorationOption', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    >
                      <option value="">No decoration</option>
                      {decorationOptions.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.name} - {option.priceRange}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.decorationOption && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Decoration Price (€)</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.decorationPrice}
                        onChange={(e) => handleInputChange('decorationPrice', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                        placeholder="Enter decoration price"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Price Summary */}
            {calculatedPrice !== null && (
              <div className="bg-luxury-gold/5 rounded-lg p-6 border border-luxury-gold/20">
                <h3 className="text-lg font-semibold text-luxury-black mb-3">Price Summary</h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Total Price:</span>
                  <span className="text-2xl font-bold text-luxury-gold">
                    €{calculatedPrice.toFixed(2)}
                  </span>
                </div>
                {selectedVehicle && (
                  <p className="text-xs text-gray-500 mt-2">
                    Includes {selectedVehicle.vatRate * 100}% VAT
                  </p>
                )}
              </div>
            )}

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
                  placeholder="Any special requirements, decoration details, or additional services..."
                />
              </div>
            </div>

            {/* Cal.com Popup Button */}
            <div className="text-center space-y-3">
              <button
                type="submit"
                disabled={isSubmitting || !selectedVehicle || calculatedPrice === null}
                className={`btn-luxury-premium text-xl px-12 py-5 group ${(isSubmitting || !selectedVehicle || calculatedPrice === null) ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center justify-center">
                  <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Wedding Booking'}</span>
                </div>
              </button>

              {submitError && (
                <p className="text-red-600 text-sm">{submitError}</p>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
