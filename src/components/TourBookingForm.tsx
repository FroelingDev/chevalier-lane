import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type FormEvent,
} from "react";
import {
  Calendar,
  Users,
  Wine,
  MapPin,
  Plus,
  Minus,
  Car,
} from "lucide-react";
import { getCalApi, type EmbedEvent } from "@calcom/embed-react";
import { Link } from "@tanstack/react-router";
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
} from "@/lib/booking";
import { usePlacesAutocomplete } from "../lib/usePlacesAutocomplete";
import {
  tourOptions,
  type TourOption,
  TOUR_DESTINATIONS,
} from "../lib/pricing/tour";
import {
  oneWayCarOptions as carOptions,
  type OneWayCarOption as CarOption,
} from "../lib/pricing/one-way-cars";

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  phone: string;
  selectedTour: string;
  selectedVehicle: string;
  startLocation: string;
  participants: number;
  needsBabySeat: boolean;
  babySeatCount: string;
  selectedAddOns: string[];
  specialRequests: string;
}

type TourCheckoutSnapshot = BookingFormData & {
  distanceKm: number | null;
};

export function TourBookingForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneCountryCode: "+351",
    phoneNumber: "",
    phone: "",
    selectedTour: "",
    selectedVehicle: "",
    startLocation: "",
    participants: 1,
    needsBabySeat: false,
    babySeatCount: "1",
    selectedAddOns: [],
    specialRequests: "",
  });

  const [selectedTourOption, setSelectedTourOption] =
    useState<TourOption | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<CarOption | null>(
    null
  );
  const [fleetCategory, setFleetCategory] = useState<"modern" | "classic" | null>(null);
  const [calculatedDistanceKm, setCalculatedDistanceKm] = useState<
    number | null
  >(null);
  const [isCalculatingDistance, setIsCalculatingDistance] = useState(false);
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [paymentEmailSentTo, setPaymentEmailSentTo] = useState<string | null>(null);
  const [selectionNotice, setSelectionNotice] = useState<string | null>(null);
  const pendingBookingRef = useRef<TourCheckoutSnapshot | null>(null);
  const lastCalSlugRef = useRef<string | null>(null);
  const calButtonRef = useRef<HTMLButtonElement | null>(null);
  const isProcessingCheckoutRef = useRef(false);
  const calUsername = import.meta.env.VITE_CAL_USERNAME;
  const calSlug = selectedTourOption ? `tour-${selectedTourOption.id}` : null;
  const calLink = calSlug && calUsername ? `${calUsername}/${calSlug}` : null;
  const calNotes = selectedTourOption
    ? `Experience: ${selectedTourOption.name}. Pickup: ${
        formData.startLocation || "TBD"
      }. Participants: ${formData.participants}. Vehicle: ${
        selectedVehicle?.name || "TBD"
      }. Phone: ${formData.phone || ""}. Baby seat: ${
        formData.needsBabySeat ? `Yes (${formData.babySeatCount})` : "No"
      }.`
    : undefined;
  const calConfig = calLink
    ? JSON.stringify({
        layout: "month_view",
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

  // Update selected tour option when selection changes
  useEffect(() => {
    const tour = tourOptions.find((t) => t.id === formData.selectedTour);
    setSelectedTourOption(tour || null);

    // Reset add-ons when changing tours
    if (tour?.id !== selectedTourOption?.id) {
      setFormData((prev) => ({ ...prev, selectedAddOns: [] }));
    }

    // Reset participants if below minimum
    if (tour && formData.participants < tour.minParticipants) {
      setFormData((prev) => ({ ...prev, participants: tour.minParticipants }));
    }
  }, [formData.selectedTour]);

  // Cal listener effect inserted after checkout handler definition

  // Recalculate distance whenever start location or tour changes
  useEffect(() => {
    const calculateDistance = async () => {
      if (!formData.startLocation || !selectedTourOption) {
        setCalculatedDistanceKm(null);
        return;
      }

      const destinationMeta = TOUR_DESTINATIONS[selectedTourOption.category];
      if (!destinationMeta?.address) {
        setCalculatedDistanceKm(null);
        return;
      }

      setIsCalculatingDistance(true);
      try {
        const distance = await startLocationAutocomplete.calculateRouteDistance(
          formData.startLocation,
          destinationMeta.address
        );
        if (distance && Number.isFinite(distance)) {
          setCalculatedDistanceKm(distance);
        } else {
          setCalculatedDistanceKm(null);
        }
      } catch (error) {
        console.error("Failed to calculate tour distance:", error);
        setCalculatedDistanceKm(null);
      } finally {
        setIsCalculatingDistance(false);
      }
    };

    calculateDistance();
  }, [formData.startLocation, selectedTourOption]);

  const handleInputChange = (
    field: keyof BookingFormData,
    value: string | number
  ) => {
    if (field === "selectedVehicle") {
      const vehicle = carOptions.find((v) => v.id === value) || null;
      if (vehicle) {
        const availabilityMessage = getVehicleAvailabilityMessage(vehicle.name);
        if (availabilityMessage) {
          setSelectionNotice(availabilityMessage);
          return;
        }

        if (formData.participants > vehicle.maxPassengers) {
          setSelectionNotice(
            getCapacityMessage(vehicle.name, vehicle.maxPassengers, formData.participants),
          );
          return;
        }
      }

      setSelectionNotice(null);
      setSelectedVehicle(vehicle);
      setFormData((prev) => ({
        ...prev,
        selectedVehicle: typeof value === "string" ? value : String(value),
      }));
      return;
    }

    if (field === "startLocation") {
      setCalculatedDistanceKm(null);
      setFormData((prev) => ({
        ...prev,
        startLocation: typeof value === "string" ? value : String(value),
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddOnToggle = (addOnId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedAddOns: prev.selectedAddOns.includes(addOnId)
        ? prev.selectedAddOns.filter((id) => id !== addOnId)
        : [...prev.selectedAddOns, addOnId],
    }));
  };

  const adjustParticipants = (delta: number) => {
    if (!selectedTourOption) return;

    const newCount = formData.participants + delta;
    const minParticipants = selectedTourOption.minParticipants;
    const maxParticipants = selectedTourOption.maxParticipants || 20;

    if (newCount >= minParticipants && newCount <= maxParticipants) {
      if (selectedVehicle && newCount > selectedVehicle.maxPassengers) {
        setSelectedVehicle(null);
        setSelectionNotice(
          getCapacityMessage(selectedVehicle.name, selectedVehicle.maxPassengers, newCount),
        );
        setFormData((prev) => ({
          ...prev,
          participants: newCount,
          selectedVehicle: "",
        }));
        return;
      }

      setSelectionNotice(null);
      setFormData((prev) => ({ ...prev, participants: newCount }));
    }
  };

  const validateForm = (formattedPhone: string): string[] => {
    const errors: string[] = [];

    if (!formData.firstName.trim()) errors.push(t("First name is required"));
    if (!formData.lastName.trim()) errors.push(t("Last name is required"));
    if (!formData.email.trim()) errors.push(t("Email is required"));
    if (!formattedPhone.trim()) errors.push(t("Phone number is required"));
    if (!formData.selectedTour) errors.push(t("Please select a tour option"));
    if (!formData.selectedVehicle)
      errors.push(t("Please select a vehicle for the tour"));
    if (!formData.startLocation.trim())
      errors.push(t("Starting location is required"));

    if (selectedTourOption) {
      if (formData.participants < selectedTourOption.minParticipants) {
        errors.push(
          `${t("Minimum")} ${
            selectedTourOption.minParticipants
          } ${t("participants required for this tour")}`
        );
      }
      if (
        selectedTourOption.maxParticipants &&
        formData.participants > selectedTourOption.maxParticipants
      ) {
        errors.push(
          `${t("Maximum")} ${
            selectedTourOption.maxParticipants
          } ${t("participants allowed for this tour")}`
        );
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push(t("Please enter a valid email address"));
    }

    return errors;
  };

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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingType: "tour",
            calEventSlug: slug,
            calEventId: calData?.uid,
            calStartTime: calData?.startTime,
            calEndTime: calData?.endTime,
            calInvitee: {
              name: `${snapshot.firstName} ${snapshot.lastName}`.trim(),
              email: snapshot.email,
              phone: snapshot.phone,
            },
            tour: {
              selectedTourId: snapshot.selectedTour,
              participants: snapshot.participants,
              selectedAddOns: snapshot.selectedAddOns,
              startLocation: snapshot.startLocation,
              specialRequests: snapshot.specialRequests,
              firstName: snapshot.firstName,
              lastName: snapshot.lastName,
              email: snapshot.email,
              phone: snapshot.phone,
              selectedVehicleId: snapshot.selectedVehicle,
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

        const data = (await response.json()) as { recipientEmail?: string };
        setPaymentEmailSentTo(data.recipientEmail || snapshot.email);
      } catch (error) {
        console.error("Tour checkout creation failed:", error);
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

  const handleSubmit = (e: FormEvent) => {
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

    if (!selectedTourOption || !calSlug || !calLink) {
      alert(t("Please select a tour option to continue."));
      return;
    }

    if (!selectedVehicle) {
      alert(t("Please select a vehicle for the tour."));
      return;
    }

    if (selectedVehicle.requiresContact) {
      return;
    }

    pendingBookingRef.current = {
      ...formData,
      phone,
      distanceKm: calculatedDistanceKm ?? null,
    };
    lastCalSlugRef.current = calSlug;
    setCheckoutError(null);
    calButtonRef.current?.click();
  };

  const handleFleetCategoryChange = (category: "modern" | "classic") => {
    setFleetCategory(category);
    setSelectedVehicle(null);
    setFormData((prev) => ({ ...prev, selectedVehicle: "" }));
    setSelectionNotice(null);
  };

  const filteredVehicles = fleetCategory
    ? carOptions.filter((v) => v.category === fleetCategory)
    : [];

  const requiresContact = selectedVehicle?.requiresContact ?? false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white">
      {/* Header */}
      <section
        className="relative py-20 px-4 bg-cover bg-center"
        style={{ backgroundImage: "url(/scenic-routes.png)" }}
      >
        <div className="absolute inset-0 bg-luxury-black/60"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl luxury-display text-white mb-6 tracking-wider">
            {t("Book Your Luxury Tour")}
          </h1>
          <div className="gold-separator mx-auto w-64 mb-8"></div>
          <p className="text-xl font-playfair text-white/90 leading-relaxed">
            {t(
              "Experience the grandeur of a 16th-century Palace combined with world-class wine production. Our exclusive private tours offer intimate access to the historic estate, extensive art collections, and premium wine tastings in the heart of Portugal's renowned wine region."
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
                <Users className="h-6 w-6 text-luxury-gold mr-3" />
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

            {/* Tour Selection */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <Wine className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">
                  {t("Select Your Tour Experience")}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                    placeholder={t("e.g., Lisbon Airport, Hotel")}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {t(
                      "We’ll calculate the transfer distance to your selected experience."
                    )}
                  </p>
                </div>

                <div className="bg-luxury-gold/5 border border-luxury-gold/20 rounded-lg p-4 text-sm text-gray-700">
                  <p className="font-medium text-luxury-black mb-1">
                    {t("Distance to Experience")}
                  </p>
                  {isCalculatingDistance ? (
                    <p>{t("Calculating distance...")}</p>
                  ) : calculatedDistanceKm !== null ? (
                    <p>
                      {t("Approximately")}{" "}
                      <span className="font-semibold text-luxury-black">
                        {calculatedDistanceKm} km
                      </span>{" "}
                      {t("from your pickup location to")}{" "}
                      {selectedTourOption
                        ? t(TOUR_DESTINATIONS[selectedTourOption.category].name)
                        : t("the experience")}
                      .
                    </p>
                  ) : (
                    <p>
                      {t(
                        "Enter a starting location to calculate driving distance."
                      )}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-1 gap-6">
                {/* Palácio Tours */}
                <div>
                  <h3 className="text-lg font-semibold text-luxury-black mb-4 flex items-center">
                    <MapPin className="h-5 w-5 text-luxury-gold mr-2" />
                    {t("Palácio da Bacalhôa (Azeitão)")}
                  </h3>
                  <div className="space-y-3">
                    {tourOptions.map((tour) => (
                        <div
                          key={tour.id}
                          className="border border-gray-200 rounded-lg p-4 hover:border-luxury-gold transition-colors"
                        >
                          <label className="flex items-start space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name="tour"
                              value={tour.id}
                              checked={formData.selectedTour === tour.id}
                              onChange={(e) =>
                                handleInputChange(
                                  "selectedTour",
                                  e.target.value
                                )
                              }
                              className="mt-1 text-luxury-gold focus:ring-luxury-gold"
                            />
                            <div className="flex-1">
                              <div className="flex items-start">
                                <div>
                                  <h4 className="font-semibold text-luxury-black">
                                    {t(tour.name)}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {t(tour.duration)}
                                  </p>
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 mt-2">
                                {t(tour.description)}
                              </p>
                              <div className="text-xs text-gray-600 mt-1">
                                {t("Min")} {tour.minParticipants}{" "}
                                {tour.minParticipants > 1
                                  ? t("participants")
                                  : t("participant")}
                                {tour.maxParticipants &&
                                  ` • ${t("Max")} ${tour.maxParticipants}`}
                              </div>
                            </div>
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Selection */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <Car className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">
                  {t("Select Your Vehicle")}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
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
                    {t("A timeless experience with our vintage Rolls-Royce.")}
                  </div>
                </button>
              </div>

              {!fleetCategory && (
                <p className="text-sm text-gray-500 italic mb-4">
                  {t("Please select a fleet category above to see available vehicles.")}
                </p>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <button
                    key={vehicle.id}
                    type="button"
                    onClick={() =>
                      handleInputChange("selectedVehicle", vehicle.id)
                    }
                    className={`relative border-2 rounded-lg p-4 text-left transition-all duration-300 ${
                      formData.selectedVehicle === vehicle.id
                        ? "border-luxury-gold bg-luxury-gold/5 shadow-lg"
                        : "border-gray-200 hover:border-luxury-gold/50"
                    }`}
                  >
                    <div className="aspect-video mb-4 overflow-hidden rounded-md bg-gray-100">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "legacy.png";
                        }}
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-luxury-black mb-2">
                      {t(vehicle.name)}
                    </h3>
                    <p className="mb-2 text-sm text-gray-600">
                      {vehicle.availabilityStatus === "coming-soon"
                        ? t("Available Soon")
                        : t("Price shared by email after reservation")}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        vehicle.category === "modern"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {vehicle.category === "modern"
                        ? t("Modern")
                        : t("Classic")}
                    </span>
                    <p className="mt-2 text-xs text-gray-500">
                      {vehicle.maxPassengers}{" "}
                      {vehicle.maxPassengers === 1 ? t("Passenger") : t("Passengers")}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {selectionNotice && <BookingNotice message={t(selectionNotice)} />}

            {/* Participants & Add-ons */}
            {selectedTourOption && (
              <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
                <div className="flex items-center mb-6">
                <Users className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">
                  {t("Participants & Options")}
                </h2>
              </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Number of Participants */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {t("Number of Participants")}
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        onClick={() => adjustParticipants(-1)}
                        disabled={
                          formData.participants <=
                          selectedTourOption.minParticipants
                        }
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
                        disabled={
                          selectedTourOption.maxParticipants !== undefined &&
                          formData.participants >=
                            selectedTourOption.maxParticipants
                        }
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      {t("Min")} {selectedTourOption.minParticipants}
                      {selectedTourOption.maxParticipants &&
                        ` • ${t("Max")} ${selectedTourOption.maxParticipants}`}
                    </p>
                  </div>

                  {/* Add-ons */}
                  {selectedTourOption.addOns &&
                    selectedTourOption.addOns.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          {t("Optional Add-ons")}
                        </label>
                        <div className="space-y-3">
                          {selectedTourOption.addOns.map((addOn) => (
                            <label
                              key={addOn.id}
                              className="flex items-start space-x-3 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={formData.selectedAddOns.includes(
                                  addOn.id
                                )}
                                onChange={() => handleAddOnToggle(addOn.id)}
                                className="mt-1 text-luxury-gold focus:ring-luxury-gold rounded"
                              />
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <span className="font-medium text-luxury-black">
                                      {t(addOn.name)}
                                    </span>
                                    <p className="text-sm text-gray-600">
                                      {t(addOn.description)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
                <div className="mt-6">
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
            )}

            {/* Special Requests */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <Wine className="h-6 w-6 text-luxury-gold mr-3" />
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
                    "Any dietary requirements, accessibility needs, preferred languages, or special requests..."
                  )}
                />
              </div>
            </div>

            <div className="text-center space-y-3">
              {requiresContact ? (
                <Link
                  to="/contact"
                  className="btn-luxury-premium text-xl px-12 py-5 group"
                >
                  <div className="flex items-center justify-center">
                    <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                    <span>{t("Contact Us")}</span>
                  </div>
                </Link>
              ) : (
                <button
                  type="submit"
                  disabled={
                    isCreatingCheckout ||
                    !selectedTourOption ||
                    !selectedVehicle ||
                    !calLink
                  }
                  className={`btn-luxury-premium text-xl px-12 py-5 group ${
                    isCreatingCheckout ||
                    !selectedTourOption ||
                    !selectedVehicle ||
                    !calLink
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                    <span>
                      {isCreatingCheckout
                        ? t("Sending your payment email...")
                        : getInquiryCtaLabel(
                            selectedVehicle ? t(selectedVehicle.name) : undefined,
                          )}
                    </span>
                  </div>
                </button>
              )}

              {checkoutError && (
                <p className="text-red-600 text-sm">{checkoutError}</p>
              )}
              {!calUsername && (
                <p className="text-red-600 text-sm">
                  {t("Missing Cal.com username. Please configure")}{" "}
                  <code>VITE_CAL_USERNAME</code>.
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
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
