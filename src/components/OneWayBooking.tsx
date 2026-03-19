import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type FormEvent,
} from "react";
import { getCalApi, type EmbedEvent } from "@calcom/embed-react";
import { Calendar, Car, MapPin, User, Clock } from "lucide-react";
import BabySeatFields from "@/components/booking/BabySeatFields";
import BookingNotice from "@/components/booking/BookingNotice";
import PaymentEmailSentNotice from "@/components/booking/PaymentEmailSentNotice";
import PhoneField from "@/components/booking/PhoneField";
import { useLanguage } from "@/components/LanguageProvider";
import {
  formatInternationalPhone,
  getCapacityMessage,
  getInquiryCtaLabel,
  getVehicleAvailabilityMessage,
  validateClassicRoute,
} from "@/lib/booking";
import {
  oneWayCarOptions as carOptions,
  type OneWayCarOption as CarOption,
} from "@/lib/pricing/one-way-cars";
import { usePlacesAutocomplete } from "../lib/usePlacesAutocomplete";

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  phone: string;
  selectedCar: string;
  startLocation: string;
  endLocation: string;
  passengers: string;
  needsBabySeat: boolean;
  babySeatCount: string;
  specialRequests: string;
  serviceType: string;
}

type OneWayCheckoutSnapshot = BookingFormData & {
  distanceKm: number;
};

const DURATION_OPTIONS = [120, 150, 180, 240, 300, 360, 420, 480];

const findNearestDuration = (calculatedMinutes: number): number => {
  return DURATION_OPTIONS.reduce((prev, curr) =>
    Math.abs(curr - calculatedMinutes) < Math.abs(prev - calculatedMinutes)
      ? curr
      : prev,
  );
};

const ONE_WAY_PRICE_MARKUP_MULTIPLIER = 1.06;
const roundToCents = (value: number) => Math.round(value * 100) / 100;

const calculatePrice = (
  distanceKm: number,
  selectedCar: CarOption,
): number | null => {
  const basePrice =
    distanceKm <= selectedCar.maxKmIncluded
      ? selectedCar.minPrice || 0
      : selectedCar.pricePerKm
        ? selectedCar.minPrice +
          (distanceKm - selectedCar.maxKmIncluded) * selectedCar.pricePerKm
        : null;

  if (basePrice === null) return null;

  return roundToCents(basePrice * ONE_WAY_PRICE_MARKUP_MULTIPLIER);
};

export function OneWayBooking() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneCountryCode: "+351",
    phoneNumber: "",
    phone: "",
    selectedCar: "",
    startLocation: "",
    endLocation: "",
    passengers: "1",
    needsBabySeat: false,
    babySeatCount: "1",
    specialRequests: "",
    serviceType: "one-way",
  });

  const [selectedCar, setSelectedCar] = useState<CarOption | null>(null);
  const [fleetCategory, setFleetCategory] = useState<"modern" | "classic" | null>(null);
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [paymentEmailSentTo, setPaymentEmailSentTo] = useState<string | null>(null);
  const [selectionNotice, setSelectionNotice] = useState<string | null>(null);
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
      }. Passengers: ${formData.passengers}. Phone: ${formData.phone || ""}. Baby seat: ${
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
            data?.error || t("Unable to create a Stripe checkout session."),
          );
        }

        const data = (await response.json()) as { recipientEmail?: string };
        setPaymentEmailSentTo(data.recipientEmail || snapshot.email);
      } catch (error) {
        console.error("One-way checkout creation failed:", error);
        setCheckoutError(
          error instanceof Error
            ? error.message
            : t("Unable to create Stripe checkout session."),
        );
      } finally {
        setIsCreatingCheckout(false);
        isProcessingCheckoutRef.current = false;
        pendingBookingRef.current = null;
        lastCalSlugRef.current = null;
      }
    },
    [t],
  );

  if (paymentEmailSentTo) {
    return (
      <PaymentEmailSentNotice
        title={t("Payment Email Sent")}
        message={t(
          "We sent your total price and secure payment link by email. Please use that email to complete payment.",
        )}
        emailLabel={t("The payment email has been sent to")}
        email={paymentEmailSentTo}
      />
    );
  }

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

  useEffect(() => {
    if (formData.startLocation && formData.endLocation && selectedCar) {
      void calculateTripDetails();
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
        setNearestDurationMinutes(findNearestDuration(calculatedDuration));
      } else {
        setCalculatedDurationMinutes(120);
        setNearestDurationMinutes(120);
      }

      if (calculatedDistance) {
        setCalculatedDistanceKm(calculatedDistance);
        setCalculatedPrice(calculatePrice(calculatedDistance, selectedCar));
      } else {
        setCalculatedDistanceKm(null);
        setCalculatedPrice(null);
      }

      setHasCalculated(true);
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
    if (field === "selectedCar") {
      const car = carOptions.find((option) => option.id === value) || null;
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
      setFormData((prev) => ({ ...prev, selectedCar: value }));
      return;
    }

    if (field === "passengers") {
      const passengerCount = Number(value) || 1;
      if (selectedCar && passengerCount > selectedCar.maxPassengers) {
        setSelectedCar(null);
        setSelectionNotice(
          getCapacityMessage(selectedCar.name, selectedCar.maxPassengers, passengerCount),
        );
        setFormData((prev) => ({ ...prev, passengers: value, selectedCar: "" }));
        return;
      }
      setSelectionNotice(null);
      setFormData((prev) => ({ ...prev, passengers: value }));
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
    if (!formData.startLocation.trim())
      errors.push(t("Starting location is required"));
    if (!formData.endLocation.trim())
      errors.push(t("Final destination is required"));

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

    if (!selectedCar || !calSlug || !calLink || !calculatedDistanceKm) {
      alert(t("Please complete your transfer details before continuing."));
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

  const handleFleetCategoryChange = (category: "modern" | "classic") => {
    setFleetCategory(category);
    setSelectedCar(null);
    setFormData((prev) => ({ ...prev, selectedCar: "" }));
    setSelectionNotice(null);
  };

  const filteredCarOptions = fleetCategory
    ? carOptions.filter((car) => car.category === fleetCategory)
    : [];

  const classicRouteError =
    fleetCategory === "classic" &&
    formData.startLocation &&
    formData.endLocation
      ? validateClassicRoute({
          service: "one-way",
          pickupLocation: formData.startLocation,
          dropoffLocation: formData.endLocation,
          distanceKm: calculatedDistanceKm,
        })
      : null;

  const buttonDisabled =
    isCreatingCheckout ||
    isCalculating ||
    !selectedCar ||
    !formData.startLocation.trim() ||
    !formData.endLocation.trim() ||
    calculatedDistanceKm === null ||
    calculatedPrice === null ||
    !calLink ||
    !calConfig ||
    !!classicRouteError;

  const buttonLabel = isCreatingCheckout
    ? t("Sending your payment email...")
    : isCalculating
      ? t("Calculating route...")
      : !selectedCar
        ? t("Please Select a Vehicle")
        : !formData.startLocation.trim() || !formData.endLocation.trim()
          ? t("Please Enter Locations")
          : getInquiryCtaLabel(t(selectedCar.name));

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white">
      <section
        className="relative py-20 px-4 bg-cover bg-center"
        style={{ backgroundImage: "url(/one-way-transfer.png)" }}
      >
        <div className="absolute inset-0 bg-luxury-black/60"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl luxury-display text-white mb-6 tracking-wider">
            {t("Book Your One-Way Transfer")}
          </h1>
          <div className="gold-separator mx-auto w-64 mb-8"></div>
          <p className="text-xl font-playfair text-white/90 leading-relaxed">
            {t(
              "Experience luxury transportation with our premium chauffeur service. Reserve your vehicle and destinations below.",
            )}
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-12">
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
                  placeholder="649 64 29 98"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">
                  {t("Trip Details")}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2 grid md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    className={`rounded-lg border-2 px-4 py-4 text-left transition-colors ${
                      fleetCategory === "modern"
                        ? "border-luxury-gold bg-luxury-gold/5"
                        : "border-gray-200"
                    }`}
                    onClick={() => handleFleetCategoryChange("modern")}
                  >
                    <div className="font-semibold text-luxury-black">
                      {t("Modern Chauffeur Fleet")}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      {t("Executive luxury vehicles with our modern fleet.")}
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`rounded-lg border-2 px-4 py-4 text-left transition-colors ${
                      fleetCategory === "classic"
                        ? "border-luxury-gold bg-luxury-gold/5"
                        : "border-gray-200"
                    }`}
                    onClick={() => handleFleetCategoryChange("classic")}
                  >
                    <div className="font-semibold text-luxury-black">
                      {t("Classic Chauffeur Fleet")}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      {t("A short-distance luxury experience with our vintage Rolls-Royce.")}
                    </div>
                  </button>
                </div>

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
                    {t("Final Destination")}
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
                    placeholder={t("e.g., Porto City Center, Algarve Resort")}
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
              </div>
            </div>

            {(isCalculating || hasCalculated) && (
              <div className="bg-luxury-gold/5 rounded-lg p-6 border border-luxury-gold/20">
                <h3 className="text-lg font-semibold text-luxury-black mb-3">
                  {t("Trip Summary")}
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
                  <div className="grid md:grid-cols-2 gap-4">
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
                  </div>
                )}
              </div>
            )}

            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <Car className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">
                  {t("Select Your Vehicle")}
                </h2>
              </div>

              {!fleetCategory && (
                <p className="text-sm text-gray-500 italic">
                  {t("Please select a fleet category above to see available vehicles.")}
                </p>
              )}

              {classicRouteError && (
                <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                  <span className="mt-0.5 flex-shrink-0 text-red-500">&#9888;</span>
                  <p className="text-sm text-red-700">{t(classicRouteError)}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCarOptions.map((car) => (
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
                    <p className="font-medium mb-2 text-gray-600">
                      {car.availabilityStatus === "coming-soon"
                        ? t("Available Soon")
                        : t("Price shared by email after reservation")}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        car.category === "modern"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {car.category === "modern" ? t("Modern") : t("Classic")}
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
                    "Any special requirements, accessibility needs, or additional services...",
                  )}
                />
              </div>
            </div>

            <div className="text-center space-y-3">
              {!calUsername ? (
                <div className="text-sm text-red-600">
                  {t("Missing Cal.com username. Please set")}{" "}
                  <code>VITE_CAL_USERNAME</code>.
                </div>
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
                      {t("Please select a vehicle to proceed")}
                    </p>
                  )}
                  {selectedCar &&
                    (!formData.startLocation || !formData.endLocation) && (
                      <p className="text-red-600 mt-2 text-sm">
                        {t("Please enter both starting location and destination")}
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
