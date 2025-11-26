import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type FormEvent,
} from "react";
import { getCalApi, type EmbedEvent } from "@calcom/embed-react";
import { useNavigate } from "@tanstack/react-router";
import {
  Calendar,
  Car,
  MapPin,
  User,
  Clock,
  CheckCircle,
  Euro,
} from "lucide-react";
import { usePlacesAutocomplete } from "../lib/usePlacesAutocomplete";

export interface CarOption {
  id: string;
  name: string;
  category: "modern" | "classic";
  image: string;
  price: string;
  minPrice: number;
  pricePerKm?: number;
}

export const carOptions: CarOption[] = [
  // Modern Cars
  {
    id: "bentley-mulsanne",
    name: "Bentley Mulsanne",
    category: "modern",
    image: "/bentley-mulsanne.png",
    price: "€270 (max. 25km) + €3,50/km",
    minPrice: 270,
    pricePerKm: 3.5,
  },
  {
    id: "mercedes-s500-brabus",
    name: "Mercedes S500 Brabus",
    category: "modern",
    image: "/mercedes-s500-brabus.png",
    price: "€190 (max. 25km) + €1,80/km",
    minPrice: 190,
    pricePerKm: 1.8,
  },
  // {
  //   id: 'mercedes-maybach',
  //   name: 'Mercedes Maybach',
  //   category: 'modern',
  //   image: '/foton-pagoda.png',
  //   price: '€230 (max. 25km) + €3/km',
  //   minPrice: 230,
  //   pricePerKm: 3
  // },
  // Classic Cars
  {
    id: "rolls-royce-silver-shadow",
    name: "Rolls-Royce Silver Shadow",
    category: "classic",
    image: "/rolls-royce-silver-shadow.png",
    price: "€300 (max. 20km) + Subject to request",
    minPrice: 300,
  },
  {
    id: "rolls-royce-silver-cloud-ii",
    name: "Rolls-Royce Silver Cloud II",
    category: "classic",
    image: "/rolls-royce-silver-cloud-ii.png",
    price: "€350 (max. 20km) + Subject to request",
    minPrice: 350,
  },
  {
    id: "oldsmobile-super-88",
    name: "Oldsmobile Super 88",
    category: "classic",
    image: "/oldsmobile-super-88.png",
    price: "€320 (max. 20km) + Subject to request",
    minPrice: 320,
  },
];

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedCar: string;
  startLocation: string;
  endLocation: string;
  passengers: string;
  specialRequests: string;
  serviceType: string;
}

type OneWayCheckoutSnapshot = BookingFormData & {
  distanceKm: number;
};

// Available booking duration options in minutes
const DURATION_OPTIONS = [120, 150, 180, 240, 300, 360, 420, 480];

// Find the nearest duration option
const findNearestDuration = (calculatedMinutes: number): number => {
  return DURATION_OPTIONS.reduce((prev, curr) =>
    Math.abs(curr - calculatedMinutes) < Math.abs(prev - calculatedMinutes)
      ? curr
      : prev,
  );
};

const calculatePrice = (
  distanceKm: number,
  selectedCar: CarOption,
): number | null => {
  if (distanceKm <= 25) {
    return selectedCar.minPrice || 0;
  } else if (selectedCar.pricePerKm) {
    return selectedCar.minPrice + (distanceKm - 25) * selectedCar.pricePerKm;
  } else {
    return null;
  }
};

export function OneWayBooking() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    selectedCar: "",
    startLocation: "",
    endLocation: "",
    passengers: "1",
    specialRequests: "",
    serviceType: "one-way",
  });

  const [bookingComplete] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarOption | null>(null);
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
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
  const pendingBookingRef = useRef<OneWayCheckoutSnapshot | null>(null);
  const lastCalSlugRef = useRef<string | null>(null);
  const calButtonRef = useRef<HTMLButtonElement | null>(null);
  const isProcessingCheckoutRef = useRef(false);
  const calUsername = import.meta.env.VITE_CAL_USERNAME;
  const calSlug = selectedCar ? `one-way-${selectedCar.id}` : null;
  const calLink = calSlug && calUsername ? `${calUsername}/${calSlug}` : null;
  const calNotes = selectedCar
    ? `From ${formData.startLocation || "TBD"} to ${
        formData.endLocation || "TBD"
      }. Passengers: ${formData.passengers}. Phone: ${formData.phone || ""}. Special: ${
        formData.specialRequests || "None"
      }. ETA: ${calculatedDurationMinutes - 60}min. Distance: ${
        calculatedDistanceKm ?? "TBD"
      } km. Price: €${
        calculatedPrice !== null ? calculatedPrice : "Subject to request"
      }.`
    : undefined;
  const calConfig =
    calLink && selectedCar
      ? JSON.stringify({
          layout: "month_view",
          duration: String(nearestDurationMinutes),
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          notes: calNotes,
        })
      : undefined;

  // Google Places Autocomplete hooks
  const startLocationAutocomplete = usePlacesAutocomplete({
    onPlaceSelect: (place) => {
      if (place.formatted_address) {
        handleInputChange("startLocation", place.formatted_address);
      }
    },
    types: ["establishment", "geocode"],
    componentRestrictions: { country: "PT" },
  });

  const endLocationAutocomplete = usePlacesAutocomplete({
    onPlaceSelect: (place) => {
      if (place.formatted_address) {
        handleInputChange("endLocation", place.formatted_address);
      }
    },
    types: ["establishment", "geocode"],
    componentRestrictions: { country: "PT" },
  });

  const handleCheckoutCreation = useCallback(
    async (calData?: { uid?: string; startTime?: string; endTime?: string }) => {
      const snapshot = pendingBookingRef.current;
      const slug = lastCalSlugRef.current;
      if (!snapshot || !slug || isProcessingCheckoutRef.current) {
        return;
      }

      isProcessingCheckoutRef.current = true;
      setIsCreatingCheckout(true);
      setCheckoutError(null);

      try {
        const response = await fetch("/api/payments/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingType: "one-way",
            calEventSlug: slug,
            calEventId: calData?.uid,
            calStartTime: calData?.startTime,
            calEndTime: calData?.endTime,
            calInvitee: {
              name: `${snapshot.firstName} ${snapshot.lastName}`.trim(),
              email: snapshot.email,
              phone: snapshot.phone,
            },
            oneWay: {
              selectedVehicleId: snapshot.selectedCar,
              startLocation: snapshot.startLocation,
              endLocation: snapshot.endLocation,
              passengers: Number(snapshot.passengers) || 1,
              specialRequests: snapshot.specialRequests,
              firstName: snapshot.firstName,
              lastName: snapshot.lastName,
              email: snapshot.email,
              phone: snapshot.phone,
              distanceKm: snapshot.distanceKm,
            },
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(
            data?.error || "Unable to create a Stripe checkout session.",
          );
        }

        const data = await response.json();
        if (data.sessionUrl) {
          window.location.assign(data.sessionUrl as string);
        } else {
          throw new Error("Stripe checkout session URL missing.");
        }
      } catch (error) {
        console.error("One-way checkout creation failed:", error);
        setCheckoutError(
          error instanceof Error
            ? error.message
            : "Unable to create Stripe checkout session.",
        );
      } finally {
        setIsCreatingCheckout(false);
        isProcessingCheckoutRef.current = false;
        pendingBookingRef.current = null;
        lastCalSlugRef.current = null;
      }
    },
    [],
  );

  // Initialize Cal API when car is selected
  useEffect(() => {
    if (!calSlug || !calUsername) {
      return;
    }

    let mounted = true;
    let cleanup: (() => void) | null = null;

    const initCal = async () => {
      try {
        const cal = await getCalApi({ namespace: calSlug });
        if (!mounted) return;

        cal("ui", { hideEventTypeDetails: true, layout: "month_view" });

        const handleV2 = (event: EmbedEvent<"bookingSuccessfulV2">) => {
          handleCheckoutCreation(event.detail.data);
        };
        const handleLegacy = (event: EmbedEvent<"bookingSuccessful">) => {
          const bookingData: any =
            (event.detail.data as any)?.booking ?? event.detail.data;
          handleCheckoutCreation({
            uid: bookingData?.uid || bookingData?.id,
            startTime: bookingData?.startTime,
            endTime: bookingData?.endTime,
          });
        };

        cal("on", { action: "bookingSuccessfulV2", callback: handleV2 });
        cal("on", { action: "bookingSuccessful", callback: handleLegacy });

        cleanup = () => {
          cal("off", { action: "bookingSuccessfulV2", callback: handleV2 });
          cal("off", { action: "bookingSuccessful", callback: handleLegacy });
        };
      } catch (error) {
        console.error("Failed to initialize Cal embed", error);
      }
    };

    void initCal();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [calSlug, calUsername, handleCheckoutCreation]);

  // Calculate trip details when locations or selected car change
  useEffect(() => {
    if (formData.startLocation && formData.endLocation && selectedCar) {
      calculateTripDetails();
    }
  }, [formData.startLocation, formData.endLocation, selectedCar]);

  const calculateTripDetails = async () => {
    if (!formData.startLocation || !formData.endLocation || !selectedCar) {
      return;
    }

    setIsCalculating(true);

    try {
      const [calculatedDuration, calculatedDistance] = await Promise.all([
        startLocationAutocomplete.calculateRouteDuration(
          formData.startLocation,
          formData.endLocation,
        ),
        startLocationAutocomplete.calculateRouteDistance(
          formData.startLocation,
          formData.endLocation,
        ),
      ]);

      if (calculatedDuration) {
        setCalculatedDurationMinutes(calculatedDuration);
        const nearestDuration = findNearestDuration(calculatedDuration);
        setNearestDurationMinutes(nearestDuration);
        console.log(
          `Trip duration calculated: ${calculatedDuration} minutes → rounded to: ${nearestDuration} minutes (${Math.floor(nearestDuration / 60)}h ${nearestDuration % 60}m)`,
        );
      } else {
        console.warn(
          "Could not calculate route duration, using default 120 minutes",
        );
        setCalculatedDurationMinutes(120);
        setNearestDurationMinutes(120);
      }

      if (calculatedDistance) {
        setCalculatedDistanceKm(calculatedDistance);
        console.log(`Trip distance calculated: ${calculatedDistance} km`);

        // Calculate price based on distance
        const price = calculatePrice(calculatedDistance, selectedCar);
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

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "selectedCar") {
      const car = carOptions.find((c) => c.id === value);
      setSelectedCar(car || null);
    }
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];

    if (!formData.firstName.trim()) errors.push("First name is required");
    if (!formData.lastName.trim()) errors.push("Last name is required");
    if (!formData.email.trim()) errors.push("Email is required");
    if (!formData.phone.trim()) errors.push("Phone number is required");
    if (!formData.selectedCar) errors.push("Please select a vehicle");
    if (!formData.startLocation.trim())
      errors.push("Starting location is required");
    if (!formData.endLocation.trim())
      errors.push("Final destination is required");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push("Please enter a valid email address");
    }

    return errors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      alert("Please fix the following errors:\n" + errors.join("\n"));
      return;
    }

    if (!selectedCar || !calSlug || !calLink || !calConfig) {
      alert("Please select a vehicle to continue.");
      return;
    }

    if (calculatedDistanceKm === null || calculatedPrice === null) {
      alert("We were unable to calculate a quote for this transfer.");
      return;
    }

    if (!calUsername) {
      alert("Missing Cal.com configuration. Please try again later.");
      return;
    }

    pendingBookingRef.current = {
      ...formData,
      distanceKm: calculatedDistanceKm,
    };
    lastCalSlugRef.current = calSlug;
    setCheckoutError(null);
    calButtonRef.current?.click();
  };

  const shouldUseSpecialRequestFlow = Boolean(
    selectedCar &&
      calculatedDistanceKm !== null &&
      !isCalculating &&
      selectedCar.category === "classic" &&
      calculatedDistanceKm > 20,
  );

  const buttonDisabled =
    isCreatingCheckout ||
    isCalculating ||
    !selectedCar ||
    !formData.startLocation.trim() ||
    !formData.endLocation.trim() ||
    calculatedDistanceKm === null ||
    calculatedPrice === null ||
    !calLink ||
    !calConfig;

  const buttonLabel = isCreatingCheckout
    ? "Preparing secure payment..."
    : isCalculating
      ? "Calculating price..."
      : !selectedCar
        ? "Please Select a Vehicle"
        : !formData.startLocation.trim() || !formData.endLocation.trim()
          ? "Please Enter Locations"
          : `Book ${selectedCar.name}`;

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
              Thank you for choosing Chevalier Lane. Your booking request has
              been received and our concierge team will contact you shortly to
              confirm the details and finalize your reservation.
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
        style={{ backgroundImage: "url(/cloud-seating.png)" }}
      >
        <div className="absolute inset-0 bg-luxury-black/60"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl luxury-display text-white mb-6 tracking-wider">
            Book Your One-Way Transfer
          </h1>
          <div className="gold-separator mx-auto w-64 mb-8"></div>
          <p className="text-xl font-playfair text-white/90 leading-relaxed">
            Experience luxury transportation with our premium chauffeur service.
            Reserve your vehicle and destinations below.
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

            {/* Trip Details */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">
                  Trip Details
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Starting Location
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
                    placeholder="e.g., Lisbon Airport, Hotel Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Final Destination
                  </label>
                  <input
                    ref={endLocationAutocomplete.inputRef}
                    type="text"
                    required
                    value={formData.endLocation}
                    onChange={(e) =>
                      handleInputChange("endLocation", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder="e.g., Porto City Center, Algarve Resort"
                  />
                </div>

                {/* Pickup date/time will be chosen in the Cal.com scheduler */}

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
              </div>
            </div>

            {/* Trip Summary */}
            {(isCalculating || hasCalculated) && (
              <div className="bg-luxury-gold/5 rounded-lg p-6 border border-luxury-gold/20">
                <h3 className="text-lg font-semibold text-luxury-black mb-3">
                  Trip Summary
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
                  <div className="grid md:grid-cols-3 gap-4">
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
                          {calculatedPrice
                            ? `€${calculatedPrice.toFixed(2)}`
                            : "Subject to request"}
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
                      {car.price}
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

            {/* Cal.com Popup Button */}
            <div className="text-center space-y-3">
              {!calUsername ? (
                <div className="text-sm text-red-600">
                  Missing Cal.com username. Please set <code>VITE_CAL_USERNAME</code>.
                </div>
              ) : shouldUseSpecialRequestFlow ? (
                <button
                  type="button"
                  onClick={() => navigate({ to: "/contact" })}
                  className="btn-luxury-premium text-xl px-12 py-5 group"
                >
                  <div className="flex items-center">
                    <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Make a Special Request</span>
                  </div>
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    disabled={buttonDisabled}
                    className={`btn-luxury-premium text-xl px-12 py-5 group ${
                      buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      {isCreatingCheckout ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-3"></div>
                      ) : (
                        <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                      )}
                      <span>{buttonLabel}</span>
                    </div>
                  </button>

                  {checkoutError && (
                    <p className="text-red-600 text-sm">{checkoutError}</p>
                  )}
                  {!formData.selectedCar && (
                    <p className="text-red-600 mt-2 text-sm">
                      Please select a vehicle to proceed
                    </p>
                  )}
                  {selectedCar &&
                    (!formData.startLocation || !formData.endLocation) && (
                      <p className="text-red-600 mt-2 text-sm">
                        Please enter both starting location and destination
                      </p>
                    )}
                  {calLink && calConfig && (
                    <button
                      ref={calButtonRef}
                      data-cal-namespace={calSlug ?? undefined}
                      data-cal-link={calLink}
                      data-cal-config={calConfig}
                      className="hidden"
                      aria-hidden="true"
                    />
                  )}
                </>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
