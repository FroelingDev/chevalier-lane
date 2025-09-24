import { useState, useEffect, type FormEvent } from 'react'
import { getCalApi } from '@calcom/embed-react'
import { Calendar, Users, Euro, Wine, MapPin, CheckCircle, Plus, Minus } from 'lucide-react'

interface TourOption {
  id: string
  name: string
  location: string
  basePrice: number
  priceRange?: [number, number] // For ranges like €30–50
  description: string
  duration: string
  minParticipants: number
  maxParticipants?: number
  category: 'buddha-eden' | 'palacio'
  includes: string[]
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
    description: 'Private visit to Buddha Eden Gardens with chauffeured arrival',
    duration: '~1.5–2 hours',
    minParticipants: 1,
    category: 'buddha-eden',
    includes: [
      'Private chauffeured arrival',
      'Entrance to Buddha Eden Gardens',
      'Asian-inspired sculptures, lakes, pagodas',
      'Terracotta warriors & contemporary art'
    ],
    addOns: [
      {
        id: 'garden-train',
        name: 'Garden Tourist Train',
        price: 6,
        description: 'Ride the tourist train around the gardens'
      }
    ]
  },
  {
    id: 'buddha-eden-wine-tasting',
    name: 'Private Wine Tasting (Quinta dos Loridos)',
    location: 'Quinta dos Loridos, Bombarral',
    basePrice: 30,
    priceRange: [30, 50],
    description: 'Exclusive private tasting of Bacalhôa wines after garden visit',
    duration: '~1-1.5 hours',
    minParticipants: 1,
    category: 'buddha-eden',
    includes: [
      'Guided tasting of 4–6 Bacalhôa wines',
      'Azeitão cheese and dried fruits pairing',
      'Regional snacks'
    ]
  },
  {
    id: 'buddha-eden-full',
    name: 'Full Private Experience',
    location: 'Quinta dos Loridos, Bombarral',
    basePrice: 40,
    priceRange: [40, 60],
    description: 'Garden visit + private wine tasting combination',
    duration: '~2.5–3 hours',
    minParticipants: 1,
    category: 'buddha-eden',
    includes: [
      'Garden visit + private wine tasting',
      'Total duration ~2.5–3 hours',
      'Closed group price option available'
    ]
  },
  {
    id: 'palacio-wine-tasting',
    name: 'Bacalhôa Wine Tasting',
    location: 'Palácio da Bacalhôa, Azeitão',
    basePrice: 75,
    description: 'Private guided tour with wine tasting experience',
    duration: '~2.5 hours',
    minParticipants: 2,
    maxParticipants: 20,
    category: 'palacio',
    includes: [
      'Private guided visit of Palace, gardens, vineyards',
      'Art collection and tile museum',
      'Tasting of 4 Bacalhôa wines',
      'Azeitão cheese and dried fruits'
    ]
  },
  {
    id: 'palacio-catarina',
    name: 'Catarina de Bragança Tasting',
    location: 'Palácio da Bacalhôa, Azeitão',
    basePrice: 75,
    description: 'Curated wine tasting experience at the Palace',
    duration: '~2 hours',
    minParticipants: 2,
    maxParticipants: 20,
    category: 'palacio',
    includes: [
      'Private guided tour of the Palace',
      'Curated wine tasting'
    ]
  },
  {
    id: 'palacio-carlos',
    name: 'D. Carlos I Tasting',
    location: 'Palácio da Bacalhôa, Azeitão',
    basePrice: 250,
    description: 'Exclusive premium wine tasting with rare vintages',
    duration: '~2 hours',
    minParticipants: 2,
    maxParticipants: 20,
    category: 'palacio',
    includes: [
      'Exclusive guided tour of the Palace',
      'Tasting of 5 premium wines',
      'Includes sparkling reserve and selected red wines',
      '20-year-old Moscatel de Setúbal'
    ]
  },
  {
    id: 'palacio-standard',
    name: 'Standard Visit & Tasting',
    location: 'Palácio da Bacalhôa, Azeitão',
    basePrice: 15,
    description: 'Guided visit with standard wine tasting',
    duration: '1.5–3 hours',
    minParticipants: 1,
    category: 'palacio',
    includes: [
      'Guided visit of Palace, museum, or Quinta',
      'Standard wine tasting'
    ]
  },
  {
    id: 'palacio-food-experience',
    name: 'Wine & Food Experience',
    location: 'Palácio da Bacalhôa, Azeitão',
    basePrice: 200,
    description: 'Premium wine tasting paired with regional food',
    duration: 'Varies',
    minParticipants: 6,
    category: 'palacio',
    includes: [
      'Guided tour of Palace and Quinta',
      'Premium wine tasting paired with regional products',
      'Refined food experience'
    ]
  }
]

interface BookingFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  selectedTour: string
  participants: number
  selectedAddOns: string[]
  specialRequests: string
}

export function TourBookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    selectedTour: '',
    participants: 1,
    selectedAddOns: [],
    specialRequests: ''
  })

  const [selectedTourOption, setSelectedTourOption] = useState<TourOption | null>(null)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [bookingComplete] = useState(false)

  // Initialize Cal API
  useEffect(() => {
    if (import.meta.env.VITE_CAL_USERNAME) {
      (async function () {
        const cal = await getCalApi({ "namespace": "tours" });
        cal("ui", { "hideEventTypeDetails": true, "layout": "month_view" });
      })();
    }
  }, [])

  // Calculate total price when selections change
  useEffect(() => {
    if (selectedTourOption) {
      let price = selectedTourOption.basePrice * formData.participants

      // Add add-on prices
      selectedTourOption.addOns?.forEach(addOn => {
        if (formData.selectedAddOns.includes(addOn.id)) {
          price += addOn.price * formData.participants
        }
      })

      setTotalPrice(price)
    } else {
      setTotalPrice(0)
    }
  }, [selectedTourOption, formData.participants, formData.selectedAddOns])

  // Update selected tour option when selection changes
  useEffect(() => {
    const tour = tourOptions.find(t => t.id === formData.selectedTour)
    setSelectedTourOption(tour || null)

    // Reset add-ons when changing tours
    if (tour?.id !== selectedTourOption?.id) {
      setFormData(prev => ({ ...prev, selectedAddOns: [] }))
    }

    // Reset participants if below minimum
    if (tour && formData.participants < tour.minParticipants) {
      setFormData(prev => ({ ...prev, participants: tour.minParticipants }))
    }
  }, [formData.selectedTour])

  const handleInputChange = (field: keyof BookingFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddOnToggle = (addOnId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedAddOns: prev.selectedAddOns.includes(addOnId)
        ? prev.selectedAddOns.filter(id => id !== addOnId)
        : [...prev.selectedAddOns, addOnId]
    }))
  }

  const adjustParticipants = (delta: number) => {
    if (!selectedTourOption) return

    const newCount = formData.participants + delta
    const minParticipants = selectedTourOption.minParticipants
    const maxParticipants = selectedTourOption.maxParticipants || 20

    if (newCount >= minParticipants && newCount <= maxParticipants) {
      setFormData(prev => ({ ...prev, participants: newCount }))
    }
  }

  const validateForm = (): string[] => {
    const errors: string[] = []

    if (!formData.firstName.trim()) errors.push('First name is required')
    if (!formData.lastName.trim()) errors.push('Last name is required')
    if (!formData.email.trim()) errors.push('Email is required')
    if (!formData.phone.trim()) errors.push('Phone number is required')
    if (!formData.selectedTour) errors.push('Please select a tour option')

    if (selectedTourOption) {
      if (formData.participants < selectedTourOption.minParticipants) {
        errors.push(`Minimum ${selectedTourOption.minParticipants} participants required for this tour`)
      }
      if (selectedTourOption.maxParticipants && formData.participants > selectedTourOption.maxParticipants) {
        errors.push(`Maximum ${selectedTourOption.maxParticipants} participants allowed for this tour`)
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

    // Form is valid - the Cal.com button will handle the booking
  }

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-luxury p-12 border border-luxury-gold/20">
            <CheckCircle className="h-20 w-20 text-luxury-gold mx-auto mb-6" />
            <h1 className="text-4xl luxury-display text-luxury-black mb-6">Tour Booking Confirmed!</h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Thank you for choosing Chevalier Lane. Your tour booking request has been received and our concierge team will contact you shortly to confirm the details and finalize your reservation.
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
            Book Your Luxury Tour
          </h1>
          <div className="gold-separator mx-auto w-64 mb-8"></div>
          <p className="text-xl font-playfair text-white/90 leading-relaxed">
            Experience Portugal's finest wine regions with our exclusive private tours. Select your preferred experience below and see pricing update in real-time.
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
                <Users className="h-6 w-6 text-luxury-gold mr-3" />
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

            {/* Tour Selection */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <Wine className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">Select Your Tour Experience</h2>
              </div>

              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Buddha Eden Tours */}
                <div>
                  <h3 className="text-lg font-semibold text-luxury-black mb-4 flex items-center">
                    <MapPin className="h-5 w-5 text-luxury-gold mr-2" />
                    Buddha Eden Gardens (Bombarral)
                  </h3>
                  <div className="space-y-3">
                    {tourOptions.filter(t => t.category === 'buddha-eden').map((tour) => (
                      <div key={tour.id} className="border border-gray-200 rounded-lg p-4 hover:border-luxury-gold transition-colors">
                        <label className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="tour"
                            value={tour.id}
                            checked={formData.selectedTour === tour.id}
                            onChange={(e) => handleInputChange('selectedTour', e.target.value)}
                            className="mt-1 text-luxury-gold focus:ring-luxury-gold"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-luxury-black">{tour.name}</h4>
                                <p className="text-sm text-gray-600">{tour.duration}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-luxury-gold font-semibold">
                                  {tour.priceRange
                                    ? `€${tour.priceRange[0]}–${tour.priceRange[1]}`
                                    : `€${tour.basePrice}`
                                  } pp
                                </div>
                                <div className="text-xs text-gray-500">per person</div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 mt-2">{tour.description}</p>
                            <div className="text-xs text-gray-600 mt-1">
                              Min {tour.minParticipants} participant{tour.minParticipants > 1 ? 's' : ''}
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Palácio Tours */}
                <div>
                  <h3 className="text-lg font-semibold text-luxury-black mb-4 flex items-center">
                    <MapPin className="h-5 w-5 text-luxury-gold mr-2" />
                    Palácio da Bacalhôa (Azeitão)
                  </h3>
                  <div className="space-y-3">
                    {tourOptions.filter(t => t.category === 'palacio').map((tour) => (
                      <div key={tour.id} className="border border-gray-200 rounded-lg p-4 hover:border-luxury-gold transition-colors">
                        <label className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="tour"
                            value={tour.id}
                            checked={formData.selectedTour === tour.id}
                            onChange={(e) => handleInputChange('selectedTour', e.target.value)}
                            className="mt-1 text-luxury-gold focus:ring-luxury-gold"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-luxury-black">{tour.name}</h4>
                                <p className="text-sm text-gray-600">{tour.duration}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-luxury-gold font-semibold">
                                  {tour.priceRange
                                    ? `€${tour.priceRange[0]}–${tour.priceRange[1]}`
                                    : `€${tour.basePrice}`
                                  } pp
                                </div>
                                <div className="text-xs text-gray-500">per person</div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 mt-2">{tour.description}</p>
                            <div className="text-xs text-gray-600 mt-1">
                              Min {tour.minParticipants} participant{tour.minParticipants > 1 ? 's' : ''}
                              {tour.maxParticipants && ` • Max ${tour.maxParticipants}`}
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Participants & Add-ons */}
            {selectedTourOption && (
              <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
                <div className="flex items-center mb-6">
                  <Users className="h-6 w-6 text-luxury-gold mr-3" />
                  <h2 className="text-2xl luxury-heading text-luxury-black">Participants & Options</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Number of Participants */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Number of Participants</label>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        onClick={() => adjustParticipants(-1)}
                        disabled={formData.participants <= selectedTourOption.minParticipants}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-xl font-semibold text-luxury-black min-w-[3rem] text-center">
                        {formData.participants}
                      </span>
                      <button
                        type="button"
                        onClick={() => adjustParticipants(1)}
                        disabled={selectedTourOption.maxParticipants !== undefined && formData.participants >= selectedTourOption.maxParticipants}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Min {selectedTourOption.minParticipants}
                      {selectedTourOption.maxParticipants && ` • Max ${selectedTourOption.maxParticipants}`}
                    </p>
                  </div>

                  {/* Add-ons */}
                  {selectedTourOption.addOns && selectedTourOption.addOns.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Optional Add-ons</label>
                      <div className="space-y-3">
                        {selectedTourOption.addOns.map((addOn) => (
                          <label key={addOn.id} className="flex items-start space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.selectedAddOns.includes(addOn.id)}
                              onChange={() => handleAddOnToggle(addOn.id)}
                              className="mt-1 text-luxury-gold focus:ring-luxury-gold rounded"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="font-medium text-luxury-black">{addOn.name}</span>
                                  <p className="text-sm text-gray-600">{addOn.description}</p>
                                </div>
                                <span className="text-luxury-gold font-semibold">€{addOn.price} pp</span>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Price Summary */}
            {selectedTourOption && totalPrice > 0 && (
              <div className="bg-luxury-gold/5 rounded-lg p-6 border border-luxury-gold/20">
                <h3 className="text-lg font-semibold text-luxury-black mb-4 flex items-center">
                  <Euro className="h-5 w-5 text-luxury-gold mr-2" />
                  Price Summary
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">
                      {selectedTourOption.name} × {formData.participants} participant{formData.participants > 1 ? 's' : ''}
                    </span>
                    <span className="font-semibold text-luxury-black">
                      €{(selectedTourOption.basePrice * formData.participants).toFixed(2)}
                    </span>
                  </div>

                  {selectedTourOption.addOns?.map(addOn => {
                    if (formData.selectedAddOns.includes(addOn.id)) {
                      return (
                        <div key={addOn.id} className="flex justify-between">
                          <span className="text-gray-700">
                            {addOn.name} × {formData.participants} participant{formData.participants > 1 ? 's' : ''}
                          </span>
                          <span className="font-semibold text-luxury-black">
                            €{(addOn.price * formData.participants).toFixed(2)}
                          </span>
                        </div>
                      )
                    }
                    return null
                  })}

                  <div className="border-t border-luxury-gold/30 pt-2 mt-3">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-luxury-black">Total Price</span>
                      <span className="font-bold text-luxury-gold">€{totalPrice.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Prices are subject to VAT</p>
                  </div>
                </div>
              </div>
            )}

            {/* Special Requests */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <Wine className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">Special Requests</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors resize-none"
                  placeholder="Any dietary requirements, accessibility needs, preferred languages, or special requests..."
                />
              </div>
            </div>

            {/* Booking Button */}
            <div className="text-center">
              {!import.meta.env.VITE_CAL_USERNAME ? (
                <div className="text-sm text-red-600">Missing Cal.com username. Please set <code>VITE_CAL_USERNAME</code>.</div>
              ) : selectedTourOption ? (
                <button
                  data-cal-namespace="tours"
                  data-cal-link={`${import.meta.env.VITE_CAL_USERNAME}/tours`}
                  data-cal-config={`{"layout":"month_view","name":"${`${formData.firstName} ${formData.lastName}`.trim()}","email":"${formData.email}","notes":"Tour: ${selectedTourOption.name}. Participants: ${formData.participants}. Add-ons: ${formData.selectedAddOns.map(id => selectedTourOption.addOns?.find(a => a.id === id)?.name).filter(Boolean).join(', ')}. Total Price: €${totalPrice.toFixed(2)}. Phone: ${formData.phone}. Special: ${formData.specialRequests}"}`}
                  className="btn-luxury-premium text-xl px-12 py-5 group"
                >
                  <div className="flex items-center">
                    <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Book Your Tour - €{totalPrice.toFixed(2)}</span>
                  </div>
                </button>
              ) : (
                <button
                  disabled
                  className="btn-luxury-premium text-xl px-12 py-5 opacity-50 cursor-not-allowed"
                >
                  <Calendar className="mr-3 h-6 w-6" />
                  <span>Please Select a Tour</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
