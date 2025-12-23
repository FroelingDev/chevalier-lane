import { useState, useEffect, type FormEvent } from "react";
import { getCalApi } from "@calcom/embed-react";
import {
  Calendar,
  Car,
  MapPin,
  User,
  Clock,
  CheckCircle,
  Euro,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { usePlacesAutocomplete } from "../lib/usePlacesAutocomplete";

interface CarOption {
  id: string;
  name: string;
  category: "modern" | "classic";
  image: string;
  price: string;
  minPrice: number;
  pricePerHour: number;
}

const carOptions: CarOption[] = [
  // Modern Cars
  {
    id: "bentley-mulsanne",
    name: "Bentley Mulsanne",
    category: "modern",
    image: "/bentley-28.png",
    price: "€500 for 2 hours + €200/hour extra",
    minPrice: 500,
    pricePerHour: 200,
  },
  {
    id: "mercedes-maybach",
    name: "Mercedes Maybach",
    category: "modern",
    image: "/maybach-14.png",
    price: "€400 for 2 hours + €150/hour extra",
    minPrice: 400,
    pricePerHour: 150,
  },
  {
    id: "bentley-flying-spur",
    name: "Bentley Flying Spur",
    category: "modern",
    image: "/flyingspur-6.png",
    price: "€360 for 2 hours + €150/hour extra",
    minPrice: 360,
    pricePerHour: 150,
  },
  {
    id: "mercedes-s500-brabus",
    name: "Mercedes S500 Brabus",
    category: "modern",
    image: "/brabus-16.png",
    price: "€300 for 2 hours + €100/hour extra",
    minPrice: 300,
    pricePerHour: 100,
  },
];

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedCar: string;
  startLocation: string;
  duration: string;
  passengers: string;
  specialRequests: string;
  serviceType: string;
}

// Available booking duration options in minutes
const DURATION_OPTIONS = [120, 150, 180, 240, 300, 360, 420, 480];

const CORPORATE_PRICE_MARKUP_MULTIPLIER = 1.06;
const roundToCents = (value: number) => Math.round(value * 100) / 100;

const calculatePrice = (
  durationMinutes: number,
  selectedCar: CarOption
): number => {
  if (Number.isNaN(durationMinutes) || durationMinutes <= 0) {
    return 0;
  }

  const extraHours = Math.max(0, (durationMinutes - 120) / 60);
  const basePrice =
    selectedCar.minPrice + selectedCar.pricePerHour * extraHours;

  return roundToCents(basePrice * CORPORATE_PRICE_MARKUP_MULTIPLIER);
};

const formatDuration = (minutes: number, t?: (key: string) => string): string => {
  const translate = t ?? ((value: string) => value);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0)
    return `${hours} ${translate(hours === 1 ? "hour" : "hours")}`;
  return `${hours}h ${mins}m`;
};

export function CorporateBooking() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    selectedCar: "",
    startLocation: "",
    duration: "120",
    passengers: "1",
    specialRequests: "",
    serviceType: "corporate",
  });

  const [bookingComplete] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarOption | null>(null);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  // Google Places Autocomplete hook for starting location
  const startLocationAutocomplete = usePlacesAutocomplete({
    onPlaceSelect: (place) => {
      if (place.formatted_address) {
        handleInputChange("startLocation", place.formatted_address);
      }
    },
    types: ["establishment", "geocode"],
    componentRestrictions: { country: "PT" },
  });

  // Initialize Cal API when car is selected
  useEffect(() => {
    if (selectedCar && import.meta.env.VITE_CAL_USERNAME) {
      (async function () {
        const cal = await getCalApi({
          namespace: `corporate-${selectedCar.id}`,
        });
        cal("ui", { hideEventTypeDetails: true, layout: "month_view" });
      })();
    }
  }, [selectedCar]);

  // Calculate price when duration or selected car changes
  useEffect(() => {
    if (formData.duration && selectedCar) {
      const durationMinutes = parseInt(formData.duration);
      const price = calculatePrice(durationMinutes, selectedCar);
      setCalculatedPrice(price);
    } else {
      setCalculatedPrice(null);
    }
  }, [formData.duration, selectedCar]);

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "selectedCar") {
      const car = carOptions.find((c) => c.id === value);
      setSelectedCar(car || null);
    }
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];

    if (!formData.firstName.trim()) errors.push(t("First name is required"));
    if (!formData.lastName.trim()) errors.push(t("Last name is required"));
    if (!formData.email.trim()) errors.push(t("Email is required"));
    if (!formData.phone.trim()) errors.push(t("Phone number is required"));
    if (!formData.selectedCar) errors.push(t("Please select a vehicle"));
    if (!formData.startLocation.trim())
      errors.push(t("Starting location is required"));
    if (!formData.duration) errors.push(t("Duration is required"));

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push(t("Please enter a valid email address"));
    }

    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      alert(t("Please fix the following errors:\n") + errors.join("\n"));
      return;
    }

    // Form is valid - calculations are already done, the button will trigger the Cal popup
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-luxury p-12 border border-luxury-gold/20">
            <CheckCircle className="h-20 w-20 text-luxury-gold mx-auto mb-6" />
            <h1 className="text-4xl luxury-display text-luxury-black mb-6">
              {t("Booking Confirmed!")}
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {t(
                "Thank you for choosing Chevalier Lane. Your booking request has been received and our concierge team will contact you shortly to confirm the details and finalize your reservation."
              )}
            </p>
            <div className="bg-luxury-gold/5 p-6 rounded-lg border border-luxury-gold/10">
              <p className="text-sm text-gray-600">
                {t("A confirmation email has been sent to")}{" "}
                <span className="font-semibold text-luxury-black">
                  {formData.email}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white">
      {/* Header */}
      <section
        className="relative py-20 px-4 bg-cover bg-center"
        style={{ backgroundImage: "url(/corp-6.png)" }}
      >
        <div className="absolute inset-0 bg-luxury-black/60"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl luxury-display text-white mb-6 tracking-wider">
            {t("Book by the Hour")}
          </h1>
          <div className="gold-separator mx-auto w-64 mb-8"></div>
          <p className="text-xl font-playfair text-white/90 leading-relaxed">
            {t(
              "Experience luxury transportation with our premium chauffeur service. Reserve your vehicle and destinations below."
            )}
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
                <h2 className="text-2xl luxury-heading text-luxury-black">
                  {t("Personal Information")}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("First Name")}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder={t("Enter your first name")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Last Name")}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder={t("Enter your last name")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Email")}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder={t("your@email.com")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Phone")}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder="+34 649 64 29 98"
                  />
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">
                  {t("Trip Details")}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Starting Location")}
                  </label>
                  <input
                    ref={startLocationAutocomplete.inputRef}
                    type="text"
                    required
                    value={formData.startLocation}
                    onChange={(e) =>
                      handleInputChange("startLocation", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder={t("e.g., Lisbon Airport, Hotel Name")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Duration")}
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) =>
                      handleInputChange("duration", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                  >
                    {DURATION_OPTIONS.map((minutes) => (
                      <option key={minutes} value={minutes.toString()}>
                        {formatDuration(minutes, t)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pickup date/time will be chosen in the Cal.com scheduler */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Number of Passengers")}
                  </label>
                  <select
                    value={formData.passengers}
                    onChange={(e) =>
                      handleInputChange("passengers", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <option key={num} value={num.toString()}>
                        {num} {num === 1 ? t("Passenger") : t("Passengers")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Trip Summary */}
            {selectedCar && formData.duration && (
              <div className="bg-luxury-gold/5 rounded-lg p-6 border border-luxury-gold/20">
                <h3 className="text-lg font-semibold text-luxury-black mb-3">
                  {t("Booking Summary")}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-luxury-gold mr-2" />
                    <span className="text-gray-700">
                      {t("Duration:")}{" "}
                      <span className="font-semibold text-luxury-black">
                        {formatDuration(parseInt(formData.duration), t)}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Euro className="h-5 w-5 text-luxury-gold mr-2" />
                    <span className="text-gray-700">
                      {t("Price:")}{" "}
                      <span className="font-semibold text-luxury-black">
                        {calculatedPrice
                          ? `€${calculatedPrice.toFixed(2)}`
                          : t("Calculating...")}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Vehicle Selection */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <Car className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">
                  {t("Select Your Vehicle")}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {carOptions.map((car) => (
                  <div
                    key={car.id}
                    className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      formData.selectedCar === car.id
                        ? "border-luxury-gold bg-luxury-gold/5 shadow-lg"
                        : "border-gray-200 hover:border-luxury-gold/50"
                    }`}
                    onClick={() => handleInputChange("selectedCar", car.id)}
                  >
                    <div className="aspect-video mb-4 overflow-hidden rounded-md bg-gray-100">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "legacy.png";
                        }}
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-luxury-black mb-2">
                      {t(car.name)}
                    </h3>
                    <p className="text-luxury-gold font-medium mb-2">
                      {t(car.price)}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        car.category === "modern"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {car.category === "modern"
                        ? t("Modern")
                        : t("Classic")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Requests */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <Clock className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">
                  {t("Special Requests")}
                </h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("Additional Information")}
                </label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) =>
                    handleInputChange("specialRequests", e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors resize-none"
                  placeholder={t(
                    "Any special requirements, accessibility needs, or additional services..."
                  )}
                />
              </div>
            </div>

            {/* Cal.com Popup Button */}
            <div className="text-center">
              {!import.meta.env.VITE_CAL_USERNAME ? (
                <div className="text-sm text-red-600">
                  {t("Missing Cal.com username. Please set")}{" "}
                  <code>VITE_CAL_USERNAME</code>.
                </div>
              ) : selectedCar && formData.duration && formData.startLocation ? (
                <button
                  data-cal-namespace={`corporate-${selectedCar.id}`}
                  data-cal-link={`${import.meta.env.VITE_CAL_USERNAME}/corporate-${selectedCar.id}`}
                  data-cal-config={`{"layout":"month_view","duration":"${formData.duration}","name":"${`${formData.firstName} ${formData.lastName}`.trim()}","email":"${formData.email}","notes":"Starting from: ${formData.startLocation}. Duration: ${formatDuration(parseInt(formData.duration), t)}. Passengers: ${formData.passengers}. Phone: ${formData.phone}. Special: ${formData.specialRequests}. Price: €${calculatedPrice?.toFixed(2) || "Subject to request"}"}`}
                  className="btn-luxury-premium text-xl px-12 py-5 group"
                >
                  <div className="flex items-center">
                    <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                    <span>
                      {t("Book")} {t(selectedCar.name)}
                    </span>
                  </div>
                </button>
              ) : !selectedCar ? (
                <button
                  disabled
                  className="btn-luxury-premium text-xl px-12 py-5 opacity-50 cursor-not-allowed"
                >
                  <div className="flex items-center">
                    <Calendar className="mr-3 h-6 w-6" />
                    <span>{t("Please Select a Vehicle")}</span>
                  </div>
                </button>
              ) : !formData.startLocation ? (
                <button
                  disabled
                  className="btn-luxury-premium text-xl px-12 py-5 opacity-50 cursor-not-allowed"
                >
                  <div className="flex items-center">
                    <Calendar className="mr-3 h-6 w-6" />
                    <span>{t("Please Enter Starting Location")}</span>
                  </div>
                </button>
              ) : (
                <button
                  disabled
                  className="btn-luxury-premium text-xl px-12 py-5 opacity-50 cursor-not-allowed"
                >
                  <div className="flex items-center">
                    <Calendar className="mr-3 h-6 w-6" />
                    <span>{t("Please Complete the Form")}</span>
                  </div>
                </button>
              )}

              {!formData.selectedCar && (
                <p className="text-red-600 mt-2 text-sm">
                  {t("Please select a vehicle to proceed")}
                </p>
              )}
              {selectedCar && !formData.startLocation && (
                <p className="text-red-600 mt-2 text-sm">
                  {t("Please enter a starting location")}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
