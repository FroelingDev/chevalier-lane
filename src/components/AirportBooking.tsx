import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type FormEvent,
} from "react";
import { Link } from "@tanstack/react-router";
import { getCalApi, type EmbedEvent } from "@calcom/embed-react";
import {
  Calendar,
  Car,
  MapPin,
  User,
  Clock,
  Plane,
} from "lucide-react";
import BabySeatFields from "@/components/booking/BabySeatFields";
import BookingNotice from "@/components/booking/BookingNotice";
import PhoneField from "@/components/booking/PhoneField";
import { useLanguage } from "@/components/LanguageProvider";
import {
  formatInternationalPhone,
  getCapacityMessage,
  getInquiryCtaLabel,
  getVehicleAvailabilityMessage,
} from "@/lib/booking";
import {
  airportCarOptions,
  calculateAirportPrice,
  type AirportCarOption,
} from "@/lib/pricing/airport";
import { usePlacesAutocomplete } from "../lib/usePlacesAutocomplete";

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
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
  needsBabySeat: boolean;
  babySeatCount: string;
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

export function AirportBooking() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneCountryCode: "+351",
    phoneNumber: "",
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
    needsBabySeat: false,
    babySeatCount: "1",
  });

  const [selectedCar, setSelectedCar] = useState<AirportCarOption | null>(null);
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [selectionNotice, setSelectionNotice] = useState<string | null>(null);
  const [calculatedDurationMinutes, setCalculatedDurationMinutes] =
    useState<number>(140);
  const [nearestDurationMinutes, setNearestDurationMinutes] =
    useState<number>(140);
  const [calculatedDistanceKm, setCalculatedDistanceKm] = useState<
    number | null
  >(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const pendingBookingRef = useRef<(BookingFormData & { distanceKm: number }) | null>(
    null
  );
  const lastCalSlugRef = useRef<string | null>(null);
  const calButtonRef = useRef<HTMLButtonElement | null>(null);
  const isProcessingCheckoutRef = useRef(false);
  const calUsername = import.meta.env.VITE_CAL_USERNAME;
  const calSlug = selectedCar ? `airport-${selectedCar.id}` : null;
  const calLink = calSlug && calUsername ? `${calUsername}/${calSlug}` : null;
  const calNotes = selectedCar
    ? `Flight: ${formData.flightNumber || "TBD"} (${formData.airline || "TBD"}). From ${
        formData.pickupLocation || "TBD"
      } to ${formData.dropoffLocation || "TBD"}. Passengers: ${
        formData.passengers
      }. Hand Luggage: ${formData.handLuggage}. Large Luggage: ${
        formData.largeLuggage
      }. Extra vehicle: ${formData.extraVehicle}. Phone: ${
        formData.phone || ""
      }. Baby seat: ${
        formData.needsBabySeat ? `Yes (${formData.babySeatCount})` : "No"
      }. Special: ${formData.specialRequests || "None"}. ETA: ${
        calculatedDurationMinutes - 60
      }min. Distance: ${calculatedDistanceKm ?? "TBD"} km.`
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

  const handleCheckoutCreation = useCallback(
    async (calData?: {
      uid?: string;
      startTime?: string;
      endTime?: string;
    }) => {
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
            bookingType: "airport",
            calEventSlug: slug,
            calEventId: calData?.uid,
            calStartTime: calData?.startTime,
            calEndTime: calData?.endTime,
            calInvitee: {
              name: `${snapshot.firstName} ${snapshot.lastName}`.trim(),
              email: snapshot.email,
              phone: snapshot.phone,
            },
            airport: {
              selectedVehicleId: snapshot.selectedCar,
              pickupLocation: snapshot.pickupLocation,
              dropoffLocation: snapshot.dropoffLocation,
              passengers: Number(snapshot.passengers) || 1,
              specialRequests: snapshot.specialRequests,
              extraVehicle: snapshot.extraVehicle,
              flightNumber: snapshot.flightNumber,
              airline: snapshot.airline,
              handLuggage: snapshot.handLuggage,
              largeLuggage: snapshot.largeLuggage,
              firstName: snapshot.firstName,
              lastName: snapshot.lastName,
              email: snapshot.email,
              phone: snapshot.phone,
              distanceKm: snapshot.distanceKm,
              needsBabySeat: snapshot.needsBabySeat,
              babySeatCount: snapshot.needsBabySeat
                ? Number(snapshot.babySeatCount)
                : 0,
            },
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(
            data?.error || t("Unable to create a Stripe checkout session.")
          );
        }

        const data = await response.json();
        if (data.sessionUrl) {
          window.location.assign(data.sessionUrl as string);
          return;
        } else {
          throw new Error(t("Stripe checkout session URL missing."));
        }
      } catch (error) {
        console.error("Airport checkout creation failed:", error);
        setCheckoutError(
          error instanceof Error
            ? error.message
            : t("Unable to create Stripe checkout session.")
        );
      } finally {
        setIsCreatingCheckout(false);
        isProcessingCheckoutRef.current = false;
        pendingBookingRef.current = null;
        lastCalSlugRef.current = null;
      }
    },
    []
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
        calculateAirportPrice(calculatedDistance, selectedCar, formData.extraVehicle);
        setHasCalculated(true);
      } else {
        console.warn("Could not calculate route distance");
        setCalculatedDistanceKm(null);
        setHasCalculated(true);
      }
    } catch (error) {
      console.error("Error calculating trip details:", error);
      setCalculatedDurationMinutes(120);
      setNearestDurationMinutes(120);
      setCalculatedDistanceKm(null);
      setHasCalculated(true);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleInputChange = (
    field: keyof BookingFormData,
    value: string | boolean
  ) => {
    if (field === "selectedCar") {
      const car =
        airportCarOptions.find((option) => option.id === value) || null;
      const passengerCount = Number(formData.passengers) || 1;

      if (car) {
        const availabilityMessage = getVehicleAvailabilityMessage(car.name);
        if (availabilityMessage) {
          setSelectionNotice(availabilityMessage);
          return;
        }

        if (passengerCount > car.maxPassengers) {
          setSelectionNotice(
            getCapacityMessage(car.name, car.maxPassengers, passengerCount),
          );
          return;
        }
      }

      setSelectionNotice(null);
      setSelectedCar(car);
      setFormData((prev) => ({
        ...prev,
        selectedCar: String(value),
        extraVehicle: car?.category === "classic" ? true : prev.extraVehicle,
      }));
      return;
    }

    if (field === "passengers") {
      const passengerCount = Number(value) || 1;
      if (selectedCar && passengerCount > selectedCar.maxPassengers) {
        setSelectedCar(null);
        setSelectionNotice(
          getCapacityMessage(selectedCar.name, selectedCar.maxPassengers, passengerCount),
        );
        setFormData((prev) => ({ ...prev, passengers: String(value), selectedCar: "" }));
        return;
      }
      setSelectionNotice(null);
      setFormData((prev) => ({ ...prev, passengers: String(value) }));
      return;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (formattedPhone: string): string[] => {
    const errors: string[] = [];

    if (!formData.firstName.trim()) errors.push(t("First name is required"));
    if (!formData.lastName.trim()) errors.push(t("Last name is required"));
    if (!formData.email.trim()) errors.push(t("Email is required"));
    if (!formattedPhone.trim()) errors.push(t("Phone number is required"));
    if (!formData.selectedCar) errors.push(t("Please select a vehicle"));
    if (!formData.pickupLocation.trim())
      errors.push(t("Pickup location is required"));
    if (!formData.dropoffLocation.trim())
      errors.push(t("Drop-off location is required"));
    if (!formData.flightNumber.trim())
      errors.push(t("Flight number is required"));
    if (!formData.airline.trim()) errors.push(t("Airline is required"));

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push(t("Please enter a valid email address"));
    }

    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const phone = formatInternationalPhone(
      formData.phoneCountryCode,
      formData.phoneNumber,
    );
    const errors = validateForm(phone);
    if (errors.length > 0) {
      alert(t("Please fix the following errors:\n") + errors.join("\n"));
      return;
    }

    if (!selectedCar || selectedCar.category === "classic") {
      return;
    }

    if (!calculatedDistanceKm || !calSlug) {
      alert(t("Please enter both pickup and drop-off locations"));
      return;
    }

    pendingBookingRef.current = {
      ...formData,
      phone,
      distanceKm: calculatedDistanceKm,
    };
    lastCalSlugRef.current = calSlug;
    setCheckoutError(null);
    calButtonRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white">
      {/* Header */}
      <section
        className="relative py-20 px-4 bg-cover bg-center"
        style={{ backgroundImage: "url(/air-6.png)" }}
      >
        <div className="absolute inset-0 bg-luxury-black/60"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl luxury-display text-white mb-6 tracking-wider">
            {t("Book Your Airport Transfer")}
          </h1>
          <div className="gold-separator mx-auto w-64 mb-8"></div>
          <p className="text-xl font-playfair text-white/90 leading-relaxed">
            {t(
              "Experience premium airport transfers with our luxury fleet from Tires (Cascais Airport). Pricing is shown securely on checkout after your details are confirmed."
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

                <PhoneField
                  label={t("Phone")}
                  countryCode={formData.phoneCountryCode}
                  phoneNumber={formData.phoneNumber}
                  onCountryCodeChange={(value) =>
                    handleInputChange("phoneCountryCode", value)
                  }
                  onPhoneNumberChange={(value) =>
                    handleInputChange("phoneNumber", value)
                  }
                  placeholder="912 345 678"
                />
              </div>
            </div>

            {/* Flight Information */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <Plane className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">
                  {t("Flight Information")}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Flight Number")}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.flightNumber}
                    onChange={(e) =>
                      handleInputChange("flightNumber", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder={t("e.g., TP 1234, IB 5678")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Airline")}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.airline}
                    onChange={(e) =>
                      handleInputChange("airline", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                    placeholder={t("e.g., TAP Air Portugal, Iberia")}
                  />
                </div>
              </div>
            </div>

            {/* Luggage Information */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <Car className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">
                  {t("Luggage Information")}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Hand Luggage")}
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
                        {num} {num === 1 ? t("Piece") : t("Pieces")}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Large Luggage")}
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
                        {num} {num === 1 ? t("Piece") : t("Pieces")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                {t(
                  "Please specify the number of hand luggage (carry-on) and large luggage (checked bags) you'll be traveling with."
                )}
              </p>
            </div>

            {/* Transfer Details */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">
                  {t("Transfer Details")}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Pickup Location")}
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
                    placeholder={t(
                      "e.g., Tires Airport (Cascais), Lisbon Airport"
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Drop-off Location")}
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
                    placeholder={t("e.g., Lisbon City Center, Hotel Name")}
                  />
                </div>

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
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num.toString()}>
                        {num} {num === 1 ? t("Passenger") : t("Passengers")}
                      </option>
                    ))}
                  </select>
                </div>

                <BabySeatFields
                  title={t("Baby Seat Included")}
                  needsBabySeat={formData.needsBabySeat}
                  babySeatCount={formData.babySeatCount}
                  onNeedsBabySeatChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      needsBabySeat: value,
                      babySeatCount: value ? prev.babySeatCount : "1",
                    }))
                  }
                  onBabySeatCountChange={(value) =>
                    handleInputChange("babySeatCount", value)
                  }
                />

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
                      {t("Extra vehicle for luggage")} (€{selectedCar.extraVehiclePrice})
                    </label>
                  </div>
                )}

                {selectedCar?.category === "classic" && (
                  <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                    <p className="text-sm text-amber-800">
                      <strong>{t("Note:")}</strong>{" "}
                      {t(
                        "Classic car transfers include an extra vehicle (Range Rover Vogue) for luggage at"
                      )}{" "}
                      €{selectedCar.extraVehiclePrice} {t("extra")}.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Trip Summary */}
            {(isCalculating || hasCalculated) && (
              <div className="bg-luxury-gold/5 rounded-lg p-6 border border-luxury-gold/20">
                <h3 className="text-lg font-semibold text-luxury-black mb-3">
                  {t("Transfer Summary")}
                </h3>
                {isCalculating ? (
                  <div className="text-center py-4">
                    <div className="inline-flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-luxury-gold mr-2"></div>
                      <span className="text-gray-600">
                        {t("Calculating route...")}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-luxury-gold mr-2" />
                      <span className="text-gray-700">
                        {t("Distance:")}{" "}
                        <span className="font-semibold text-luxury-black">
                          {calculatedDistanceKm} km
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-luxury-gold mr-2" />
                      <span className="text-gray-700">
                        {t("Duration:")}{" "}
                        <span className="font-semibold text-luxury-black">
                          {Math.floor((calculatedDurationMinutes - 60) / 60)}h{" "}
                          {(calculatedDurationMinutes - 60) % 60}m
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Car className="h-5 w-5 text-luxury-gold mr-2" />
                      <span className="text-gray-700">
                        {t("Extra Vehicle:")}{" "}
                        <span className="font-semibold text-luxury-black">
                          {formData.extraVehicle ||
                          selectedCar?.category === "classic"
                            ? t("Yes")
                            : t("No")}
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
                  {t("Select Your Vehicle")}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {airportCarOptions.map((car) => (
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
                    <p className="text-sm text-gray-600 mb-2">
                      {car.availabilityStatus === "coming-soon"
                        ? t("Available Soon")
                        : t("Pricing shown at secure checkout")}
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
                    <p className="mt-2 text-xs text-gray-500">
                      {car.maxPassengers}{" "}
                      {car.maxPassengers === 1 ? t("Passenger") : t("Passengers")}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {selectionNotice && <BookingNotice message={t(selectionNotice)} />}

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

            {/* Booking Button */}
            <div className="text-center">
              {!calUsername ? (
                <div className="text-sm text-red-600">
                  {t("Missing Cal.com username. Please set")}{" "}
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
                    <span>
                      {t("Contact Us")} - {t(selectedCar.name)}
                    </span>
                  </div>
                </Link>
              ) : (
                <>
                  <button
                    type="submit"
                    disabled={
                      isCreatingCheckout ||
                      isCalculating ||
                      !selectedCar ||
                      !calculatedDistanceKm
                    }
                    className={`btn-luxury-premium text-xl px-12 py-5 group ${
                      isCreatingCheckout ||
                      isCalculating ||
                      !selectedCar ||
                      !calculatedDistanceKm
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <div className="flex items-center">
                      {isCreatingCheckout ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-3"></div>
                      ) : (
                        <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                      )}
                      <span>
                        {selectedCar
                          ? getInquiryCtaLabel(t(selectedCar.name))
                          : t("Find Out Prices")}
                      </span>
                    </div>
                  </button>

                  {checkoutError && (
                    <p className="text-red-600 text-sm mt-2">{checkoutError}</p>
                  )}
                  {!formData.selectedCar && (
                    <p className="text-red-600 mt-2 text-sm">
                      {t("Please select a vehicle to proceed")}
                    </p>
                  )}
                  {selectedCar &&
                    (!formData.pickupLocation || !formData.dropoffLocation) && (
                      <p className="text-red-600 mt-2 text-sm">
                        {t("Please enter both pickup and drop-off locations")}
                      </p>
                    )}
                  {selectedCar && (!formData.flightNumber || !formData.airline) && (
                    <p className="text-red-600 mt-2 text-sm">
                      {t("Please enter flight number and airline")}
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
