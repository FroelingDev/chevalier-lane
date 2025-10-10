import { useState, useEffect, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { getCalApi } from "@calcom/embed-react";
import {
  Calendar,
  Car,
  MapPin,
  User,
  Clock,
  CheckCircle,
  Euro,
  Plane,
} from "lucide-react";
import { usePlacesAutocomplete } from "../lib/usePlacesAutocomplete";

interface CarOption {
  id: string;
  name: string;
  category: "modern" | "classic";
  image: string;
  basePrice: number;
  maxKmIncluded: number;
  pricePerKmExtra: number;
  extraVehiclePrice?: number;
}

const carOptions: CarOption[] = [
  // Modern Cars
  {
    id: "bentley-mulsanne",
    name: "Bentley Mulsanne",
    category: "modern",
    image: "/bentley-mulsanne.png",
    basePrice: 270,
    maxKmIncluded: 25,
    pricePerKmExtra: 2.5,
    extraVehiclePrice: 150,
  },
  // {
  //   id: 'mercedes-maybach',
  //   name: 'Mercedes Maybach',
  //   category: 'modern',
  //   image: '/foton-pagoda.png',
  //   basePrice: 230,
  //   maxKmIncluded: 25,
  //   pricePerKmExtra: 2,
  //   extraVehiclePrice: 150
  // },
  {
    id: "mercedes-s500-brabus",
    name: "Mercedes S500 Brabus",
    category: "modern",
    image: "/mercedes-s500-brabus.png",
    basePrice: 190,
    maxKmIncluded: 25,
    pricePerKmExtra: 1.8,
    extraVehiclePrice: 150,
  },
  // Classic Cars
  {
    id: "rolls-royce-silver-cloud-ii",
    name: "Rolls-Royce Silver Cloud II",
    category: "classic",
    image: "/rolls-royce-silver-cloud-ii.png",
    basePrice: 0, // Subject to request
    maxKmIncluded: 20,
    pricePerKmExtra: 0, // Not applicable for classic cars
    extraVehiclePrice: 150,
  },
  {
    id: "rolls-royce-silver-shadow",
    name: "Rolls-Royce Silver Shadow",
    category: "classic",
    image: "/rolls-royce-silver-shadow.png",
    basePrice: 0, // Subject to request
    maxKmIncluded: 20,
    pricePerKmExtra: 0, // Not applicable for classic cars
    extraVehiclePrice: 150,
  },
  {
    id: "oldsmobile-super-88",
    name: "Oldsmobile Super 88",
    category: "classic",
    image: "/oldsmobile-super-88.png",
    basePrice: 0, // Subject to request
    maxKmIncluded: 20,
    pricePerKmExtra: 0, // Not applicable for classic cars
    extraVehiclePrice: 150,
  },
];

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedCar: string;
  pickupLocation: string;
  dropoffLocation: string;
  passengers: string;
  specialRequests: string;
  serviceType: string;
  extraVehicle: boolean;
  flightNumber: string;
  airline: string;
  handLuggage: string;
  largeLuggage: string;
}

// Available booking duration options in minutes
const DURATION_OPTIONS = [120, 150, 180, 240, 300, 360, 420, 480];

// Find the nearest duration option
const findNearestDuration = (calculatedMinutes: number): number => {
  return DURATION_OPTIONS.reduce((prev, curr) =>
    Math.abs(curr - calculatedMinutes) < Math.abs(prev - calculatedMinutes)
      ? curr
      : prev
  );
};

const calculatePrice = (
  distanceKm: number,
  selectedCar: CarOption,
  extraVehicle: boolean
): number | null => {
  // Classic cars are subject to request - return null to indicate no calculated price
  if (selectedCar.category === "classic") {
    return null;
  }

  let price = selectedCar.basePrice;

  // Add extra kilometers
  if (distanceKm > selectedCar.maxKmIncluded) {
    const extraKm = distanceKm - selectedCar.maxKmIncluded;
    price += extraKm * selectedCar.pricePerKmExtra;
  }

  // Add extra vehicle cost for modern cars (if selected)
  if (selectedCar.category === "modern" && extraVehicle) {
    price += selectedCar.extraVehiclePrice || 0;
  }

  // Add 6% VAT
  //   price *= 1.06

  return price;
};

export function AirportBooking() {
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    selectedCar: "",
    pickupLocation: "",
    dropoffLocation: "",
    passengers: "1",
    specialRequests: "",
    serviceType: "airport",
    extraVehicle: false,
    flightNumber: "",
    airline: "",
    handLuggage: "0",
    largeLuggage: "0",
  });

  const [bookingComplete] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarOption | null>(null);
  const [calculatedDurationMinutes, setCalculatedDurationMinutes] =
    useState<number>(140);
  const [nearestDurationMinutes, setNearestDurationMinutes] =
    useState<number>(140);
  const [calculatedDistanceKm, setCalculatedDistanceKm] = useState<
    number | null
  >(null);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  // Google Places Autocomplete hooks
  const pickupLocationAutocomplete = usePlacesAutocomplete({
    onPlaceSelect: (place) => {
      if (place.formatted_address) {
        handleInputChange("pickupLocation", place.formatted_address);
      }
    },
    types: ["establishment", "geocode"],
    componentRestrictions: { country: "PT" },
  });

  const dropoffLocationAutocomplete = usePlacesAutocomplete({
    onPlaceSelect: (place) => {
      if (place.formatted_address) {
        handleInputChange("dropoffLocation", place.formatted_address);
      }
    },
    types: ["establishment", "geocode"],
    componentRestrictions: { country: "PT" },
  });

  // Initialize Cal API when car is selected
  useEffect(() => {
    if (selectedCar && import.meta.env.VITE_CAL_USERNAME) {
      (async function () {
        const cal = await getCalApi({ namespace: `airport-${selectedCar.id}` });
        cal("ui", { hideEventTypeDetails: true, layout: "month_view" });
      })();
    }
  }, [selectedCar]);

  // Calculate trip details when locations or selected car change
  useEffect(() => {
    if (formData.pickupLocation && formData.dropoffLocation && selectedCar) {
      calculateTripDetails();
    }
  }, [
    formData.pickupLocation,
    formData.dropoffLocation,
    selectedCar,
    formData.extraVehicle,
  ]);

  const calculateTripDetails = async () => {
    if (!formData.pickupLocation || !formData.dropoffLocation || !selectedCar) {
      return;
    }

    setIsCalculating(true);

    try {
      const [calculatedDuration, calculatedDistance] = await Promise.all([
        pickupLocationAutocomplete.calculateRouteDuration(
          formData.pickupLocation,
          formData.dropoffLocation
        ),
        pickupLocationAutocomplete.calculateRouteDistance(
          formData.pickupLocation,
          formData.dropoffLocation
        ),
      ]);

      if (calculatedDuration) {
        setCalculatedDurationMinutes(calculatedDuration);
        const nearestDuration = findNearestDuration(calculatedDuration);
        setNearestDurationMinutes(nearestDuration);
        console.log(
          `Trip duration calculated: ${calculatedDuration} minutes → rounded to: ${nearestDuration} minutes (${Math.floor(nearestDuration / 60)}h ${nearestDuration % 60}m)`
        );
      } else {
        console.warn(
          "Could not calculate route duration, using default 120 minutes"
        );
        setCalculatedDurationMinutes(120);
        setNearestDurationMinutes(120);
      }

      if (calculatedDistance) {
        setCalculatedDistanceKm(calculatedDistance);
        console.log(`Trip distance calculated: ${calculatedDistance} km`);

        // Calculate price based on distance and options
        const price = calculatePrice(
          calculatedDistance,
          selectedCar,
          formData.extraVehicle
        );
        setCalculatedPrice(price);
        setHasCalculated(true);
      } else {
        console.warn("Could not calculate route distance");
        setCalculatedDistanceKm(null);
        setCalculatedPrice(null);
        setHasCalculated(true);
      }
    } catch (error) {
      console.error("Error calculating trip details:", error);
      setCalculatedDurationMinutes(120);
      setNearestDurationMinutes(120);
      setCalculatedDistanceKm(null);
      setCalculatedPrice(null);
      setHasCalculated(true);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleInputChange = (
    field: keyof BookingFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "selectedCar") {
      const car = carOptions.find((c) => c.id === value);
      setSelectedCar(car || null);
      // Auto-select extra vehicle for classic cars
      if (car?.category === "classic") {
        setFormData((prev) => ({ ...prev, extraVehicle: true }));
      }
    }
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];

    if (!formData.firstName.trim()) errors.push("First name is required");
    if (!formData.lastName.trim()) errors.push("Last name is required");
    if (!formData.email.trim()) errors.push("Email is required");
    if (!formData.phone.trim()) errors.push("Phone number is required");
    if (!formData.selectedCar) errors.push("Please select a vehicle");
    if (!formData.pickupLocation.trim())
      errors.push("Pickup location is required");
    if (!formData.dropoffLocation.trim())
      errors.push("Drop-off location is required");
    if (!formData.flightNumber.trim()) errors.push("Flight number is required");
    if (!formData.airline.trim()) errors.push("Airline is required");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push("Please enter a valid email address");
    }

    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      alert("Please fix the following errors:\n" + errors.join("\n"));
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
              Booking Confirmed!
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Thank you for choosing Chevalier Lane. Your airport transfer
              booking request has been received and our concierge team will
              contact you shortly to confirm the details and finalize your
              reservation.
            </p>
            <div className="bg-luxury-gold/5 p-6 rounded-lg border border-luxury-gold/10">
              <p className="text-sm text-gray-600">
                A confirmation email has been sent to{" "}
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
        style={{ backgroundImage: "url(/side-steeringwheel.png)" }}
      >
        <div className="absolute inset-0 bg-luxury-black/60"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl luxury-display text-white mb-6 tracking-wider">
            Book Your Airport Transfer
          </h1>
          <div className="gold-separator mx-auto w-64 mb-8"></div>
          <p className="text-xl font-playfair text-white/90 leading-relaxed">
            Experience premium airport transfers with our luxury fleet from
            Tires (Cascais Airport). All prices are subject to 6% VAT.
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
                  Personal Information
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder="Enter your last name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder="+34 607 326 237"
                  />
                </div>
              </div>
            </div>

            {/* Flight Information */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <Plane className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">
                  Flight Information
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Flight Number
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.flightNumber}
                    onChange={(e) =>
                      handleInputChange("flightNumber", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder="e.g., TP 1234, IB 5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Airline
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.airline}
                    onChange={(e) =>
                      handleInputChange("airline", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder="e.g., TAP Air Portugal, Iberia"
                  />
                </div>
              </div>
            </div>

            {/* Luggage Information */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <Car className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">
                  Luggage Information
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hand Luggage
                  </label>
                  <select
                    value={formData.handLuggage}
                    onChange={(e) =>
                      handleInputChange("handLuggage", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num.toString()}>
                        {num} {num === 1 ? "Piece" : "Pieces"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Large Luggage
                  </label>
                  <select
                    value={formData.largeLuggage}
                    onChange={(e) =>
                      handleInputChange("largeLuggage", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num.toString()}>
                        {num} {num === 1 ? "Piece" : "Pieces"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                Please specify the number of hand luggage (carry-on) and large
                luggage (checked bags) you'll be traveling with.
              </p>
            </div>

            {/* Transfer Details */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">
                  Transfer Details
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Location
                  </label>
                  <input
                    ref={pickupLocationAutocomplete.inputRef}
                    type="text"
                    required
                    value={formData.pickupLocation}
                    onChange={(e) =>
                      handleInputChange("pickupLocation", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder="e.g., Tires Airport (Cascais), Lisbon Airport"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Drop-off Location
                  </label>
                  <input
                    ref={dropoffLocationAutocomplete.inputRef}
                    type="text"
                    required
                    value={formData.dropoffLocation}
                    onChange={(e) =>
                      handleInputChange("dropoffLocation", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder="e.g., Lisbon City Center, Hotel Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Passengers
                  </label>
                  <select
                    value={formData.passengers}
                    onChange={(e) =>
                      handleInputChange("passengers", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                  >
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num.toString()}>
                        {num} {num === 1 ? "Passenger" : "Passengers"}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedCar?.category === "modern" && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="extraVehicle"
                      checked={formData.extraVehicle}
                      onChange={(e) =>
                        handleInputChange("extraVehicle", e.target.checked)
                      }
                      className="h-4 w-4 text-luxury-gold focus:ring-luxury-gold border-gray-300 rounded"
                    />
                    <label
                      htmlFor="extraVehicle"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Extra vehicle for luggage (€
                      {selectedCar.extraVehiclePrice})
                    </label>
                  </div>
                )}

                {selectedCar?.category === "classic" && (
                  <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                    <p className="text-sm text-amber-800">
                      <strong>Note:</strong> Classic car transfers include an
                      extra vehicle (Range Rover Vogue) for luggage at €
                      {selectedCar.extraVehiclePrice} extra.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Trip Summary */}
            {(isCalculating || hasCalculated) && (
              <div className="bg-luxury-gold/5 rounded-lg p-6 border border-luxury-gold/20">
                <h3 className="text-lg font-semibold text-luxury-black mb-3">
                  Transfer Summary
                </h3>
                {isCalculating ? (
                  <div className="text-center py-4">
                    <div className="inline-flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-luxury-gold mr-2"></div>
                      <span className="text-gray-600">
                        Calculating route...
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-luxury-gold mr-2" />
                      <span className="text-gray-700">
                        Distance:{" "}
                        <span className="font-semibold text-luxury-black">
                          {calculatedDistanceKm} km
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-luxury-gold mr-2" />
                      <span className="text-gray-700">
                        Duration:{" "}
                        <span className="font-semibold text-luxury-black">
                          {Math.floor((calculatedDurationMinutes - 60) / 60)}h{" "}
                          {(calculatedDurationMinutes - 60) % 60}m
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Euro className="h-5 w-5 text-luxury-gold mr-2" />
                      <span className="text-gray-700">
                        Price:{" "}
                        <span className="font-semibold text-luxury-black">
                          €
                          {calculatedPrice
                            ? calculatedPrice.toFixed(2)
                            : "Subject to request"}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Car className="h-5 w-5 text-luxury-gold mr-2" />
                      <span className="text-gray-700">
                        Extra Vehicle:{" "}
                        <span className="font-semibold text-luxury-black">
                          {formData.extraVehicle ||
                          selectedCar?.category === "classic"
                            ? "Yes"
                            : "No"}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Vehicle Selection */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <Car className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">
                  Select Your Vehicle
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
                      {car.name}
                    </h3>
                    <p className="text-luxury-gold font-medium mb-2">
                      {car.category === "classic"
                        ? "Subject to request"
                        : `€${car.basePrice} (${car.maxKmIncluded}km included)`}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      {car.category === "classic"
                        ? "Contact us for pricing"
                        : `+€${car.pricePerKmExtra}/km extra`}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        car.category === "modern"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {car.category.charAt(0).toUpperCase() +
                        car.category.slice(1)}
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
                  Special Requests
                </h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) =>
                    handleInputChange("specialRequests", e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors resize-none"
                  placeholder="Any special requirements, accessibility needs, or additional services..."
                />
              </div>
            </div>

            {/* Booking Button */}
            <div className="text-center">
              {!import.meta.env.VITE_CAL_USERNAME ? (
                <div className="text-sm text-red-600">
                  Missing Cal.com username. Please set{" "}
                  <code>VITE_CAL_USERNAME</code>.
                </div>
              ) : selectedCar?.category === "classic" ? (
                // Contact Us button for classic cars
                <Link
                  to="/contact"
                  className="btn-luxury-premium text-xl px-12 py-5 group"
                >
                  <div className="flex items-center">
                    <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Contact Us - {selectedCar.name}</span>
                  </div>
                </Link>
              ) : selectedCar && calculatedDistanceKm && !isCalculating ? (
                // Cal.com booking button for modern cars
                <button
                  data-cal-namespace={`airport-${selectedCar.id}`}
                  data-cal-link={`${import.meta.env.VITE_CAL_USERNAME}/airport-${selectedCar.id}`}
                  data-cal-config={`{"layout":"month_view","duration":"${nearestDurationMinutes}","name":"${`${formData.firstName} ${formData.lastName}`.trim()}","email":"${formData.email}","notes":"Flight: ${formData.flightNumber} (${formData.airline}). From ${formData.pickupLocation} to ${formData.dropoffLocation}. Passengers: ${formData.passengers}. Hand Luggage: ${formData.handLuggage}. Large Luggage: ${formData.largeLuggage}. Extra vehicle: ${formData.extraVehicle}. Phone: ${formData.phone}. Special: ${formData.specialRequests}. ETA: ${calculatedDurationMinutes - 60}min. Distance: ${calculatedDistanceKm} km. Price: ${calculatedPrice ? "€" + calculatedPrice.toFixed(2) : "Subject to request"}"}`}
                  className="btn-luxury-premium text-xl px-12 py-5 group"
                >
                  <div className="flex items-center">
                    <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Book {selectedCar.name}</span>
                  </div>
                </button>
              ) : selectedCar && isCalculating ? (
                <button
                  disabled
                  className="btn-luxury-premium text-xl px-12 py-5 opacity-50 cursor-not-allowed"
                >
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-3"></div>
                    <span>Calculating Price...</span>
                  </div>
                </button>
              ) : !selectedCar ? (
                <button
                  disabled
                  className="btn-luxury-premium text-xl px-12 py-5 opacity-50 cursor-not-allowed"
                >
                  <div className="flex items-center">
                    <Calendar className="mr-3 h-6 w-6" />
                    <span>Please Select a Vehicle</span>
                  </div>
                </button>
              ) : (
                <button
                  disabled
                  className="btn-luxury-premium text-xl px-12 py-5 opacity-50 cursor-not-allowed"
                >
                  <div className="flex items-center">
                    <Calendar className="mr-3 h-6 w-6" />
                    <span>Please Enter Locations & Flight Details</span>
                  </div>
                </button>
              )}

              {!formData.selectedCar && (
                <p className="text-red-600 mt-2 text-sm">
                  Please select a vehicle to proceed
                </p>
              )}
              {selectedCar &&
                (!formData.pickupLocation || !formData.dropoffLocation) && (
                  <p className="text-red-600 mt-2 text-sm">
                    Please enter both pickup and drop-off locations
                  </p>
                )}
              {selectedCar && (!formData.flightNumber || !formData.airline) && (
                <p className="text-red-600 mt-2 text-sm">
                  Please enter flight number and airline
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
