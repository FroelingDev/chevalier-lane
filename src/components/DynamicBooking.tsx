import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type FormEvent,
} from "react";
import { getCalApi, type EmbedEvent } from "@calcom/embed-react";
import { useNavigate } from "@tanstack/react-router";
import { Calendar, Car, Clock, MapPin, User } from "lucide-react";
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
  oneWayCarOptions,
  type OneWayCarOption,
} from "@/lib/pricing/one-way-cars";
import { usePlacesAutocomplete } from "@/lib/usePlacesAutocomplete";

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
}

type DynamicCheckoutSnapshot = BookingFormData & {
  distanceKm: number;
};

interface DynamicBookingProps {
  carId: string;
}

const DURATION_OPTIONS = [120, 150, 180, 240, 300, 360, 420, 480];
const ONE_WAY_PRICE_MARKUP_MULTIPLIER = 1.06;

const findNearestDuration = (calculatedMinutes: number): number => {
  return DURATION_OPTIONS.reduce((prev, curr) =>
    Math.abs(curr - calculatedMinutes) < Math.abs(prev - calculatedMinutes)
      ? curr
      : prev,
  );
};

const roundToCents = (value: number) => Math.round(value * 100) / 100;

const calculatePrice = (
  distanceKm: number,
  selectedCar: OneWayCarOption,
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

export function DynamicBooking({ carId }: DynamicBookingProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneCountryCode: "+351",
    phoneNumber: "",
    phone: "",
    selectedCar: carId,
    startLocation: "",
    endLocation: "",
    passengers: "1",
    needsBabySeat: false,
    babySeatCount: "1",
    specialRequests: "",
  });
  const [selectedCar, setSelectedCar] = useState<OneWayCarOption | null>(null);
  const [selectionNotice, setSelectionNotice] = useState<string | null>(null);
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
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const pendingBookingRef = useRef<DynamicCheckoutSnapshot | null>(null);
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

        const data = await response.json();
        if (data.sessionUrl) {
          window.location.assign(data.sessionUrl as string);
          return;
        }

        throw new Error(t("Stripe checkout session URL missing."));
      } catch (error) {
        console.error("Dynamic booking checkout creation failed:", error);
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

  useEffect(() => {
    const car = oneWayCarOptions.find((option) => option.id === carId) || null;

    if (!car) {
      navigate({ to: "/booking/one-way" });
      return;
    }

    setSelectedCar(car);
    setFormData((prev) => ({ ...prev, selectedCar: car.id }));
    setSelectionNotice(getVehicleAvailabilityMessage(car.name));
  }, [carId, navigate]);

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
    if (field === "passengers") {
      const passengerCount = Number(value) || 1;

      if (selectedCar && passengerCount > selectedCar.maxPassengers) {
        setSelectionNotice(
          getCapacityMessage(
            selectedCar.name,
            selectedCar.maxPassengers,
            passengerCount,
          ),
        );
      } else if (selectedCar) {
        setSelectionNotice(getVehicleAvailabilityMessage(selectedCar.name));
      }

      setFormData((prev) => ({ ...prev, passengers: value }));
      return;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (formattedPhone: string): string[] => {
    const errors: string[] = [];
    const passengerCount = Number(formData.passengers) || 1;

    if (!formData.firstName.trim()) errors.push(t("First name is required"));
    if (!formData.lastName.trim()) errors.push(t("Last name is required"));
    if (!formData.email.trim()) errors.push(t("Email is required"));
    if (!formattedPhone.trim()) errors.push(t("Phone number is required"));
    if (!formData.startLocation.trim()) {
      errors.push(t("Starting location is required"));
    }
    if (!formData.endLocation.trim()) {
      errors.push(t("Final destination is required"));
    }
    if (!selectedCar) {
      errors.push(t("Please select a vehicle"));
    }
    if (selectedCar && selectedCar.availabilityStatus === "coming-soon") {
      errors.push(t(getVehicleAvailabilityMessage(selectedCar.name) || ""));
    }
    if (selectedCar && passengerCount > selectedCar.maxPassengers) {
      errors.push(
        t(
          getCapacityMessage(
            selectedCar.name,
            selectedCar.maxPassengers,
            passengerCount,
          ),
        ),
      );
    }

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

  const shouldUseSpecialRequestFlow =
    !!selectedCar &&
    !!calculatedDistanceKm &&
    !isCalculating &&
    selectedCar.category === "classic" &&
    calculatedDistanceKm > 20;
  const isBlockedVehicle = selectedCar?.availabilityStatus === "coming-soon";
  const passengerCount = Number(formData.passengers) || 1;
  const exceedsCapacity =
    !!selectedCar && passengerCount > selectedCar.maxPassengers;
  const buttonDisabled =
    isCreatingCheckout ||
    isCalculating ||
    !selectedCar ||
    isBlockedVehicle ||
    exceedsCapacity ||
    !formData.startLocation.trim() ||
    !formData.endLocation.trim() ||
    calculatedDistanceKm === null ||
    calculatedPrice === null ||
    !calLink ||
    !calConfig;
  const buttonLabel = isCreatingCheckout
    ? t("Preparing your price request...")
    : isCalculating
      ? t("Calculating route...")
      : !selectedCar
        ? t("Please Select a Vehicle")
        : isBlockedVehicle
          ? t("Currently unavailable")
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
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
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

            {selectedCar && (
              <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
                <div className="flex items-center mb-6">
                  <Car className="h-6 w-6 text-luxury-gold mr-3" />
                  <h2 className="text-2xl luxury-heading text-luxury-black">
                    {t("Selected Vehicle")}
                  </h2>
                </div>

                <div className="border-2 border-luxury-gold bg-luxury-gold/5 rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-16 overflow-hidden rounded-md bg-gray-100">
                      <img
                        src={selectedCar.image}
                        alt={selectedCar.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "legacy.png";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-luxury-black mb-1">
                        {t(selectedCar.name)}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {selectedCar.availabilityStatus === "coming-soon"
                          ? t("Available Soon")
                          : t("Pricing shown at secure checkout")}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-block px-3 py-1 text-sm rounded-full ${
                            selectedCar.category === "modern"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {selectedCar.category === "modern"
                            ? t("Modern")
                            : t("Classic")}
                        </span>
                        <span className="text-xs text-gray-500">
                          {selectedCar.maxPassengers}{" "}
                          {selectedCar.maxPassengers === 1
                            ? t("Passenger")
                            : t("Passengers")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
              ) : shouldUseSpecialRequestFlow || isBlockedVehicle ? (
                <button
                  type="button"
                  onClick={() => navigate({ to: "/contact" })}
                  className="btn-luxury-premium text-xl px-12 py-5 group"
                >
                  <div className="flex items-center">
                    <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                    <span>
                      {isBlockedVehicle
                        ? t("Contact Concierge")
                        : t("Make a Special Request")}
                    </span>
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

                  <p className="text-sm text-gray-600">
                    {t(
                      "We'll confirm availability first, then you'll see the final total on the secure Stripe checkout page.",
                    )}
                  </p>

                  {checkoutError && (
                    <p className="text-red-600 text-sm">{checkoutError}</p>
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
