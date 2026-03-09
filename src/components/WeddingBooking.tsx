import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type FormEvent,
} from "react";
import { Calendar, Car, User, Clock, Heart, CheckCircle } from "lucide-react";
import { getCalApi, type EmbedEvent } from "@calcom/embed-react";
import PhoneField from "@/components/booking/PhoneField";
import { useLanguage } from "@/components/LanguageProvider";
import { formatInternationalPhone, getVehicleAvailabilityMessage } from "@/lib/booking";
import { usePlacesAutocomplete } from "../lib/usePlacesAutocomplete";
import {
  weddingVehicles,
  type WeddingVehicle,
  decorationOptions,
  calculateWeddingPrice,
} from "../lib/pricing/wedding";

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  phone: string;
  selectedVehicle: string;
  serviceType: "main" | "transport";
  durationHours: string;
  numberOfTrips: string;
  needsGuestTransport: "yes" | "no";
  guestTransportVehicleCount: string;
  startLocation: string;
  endLocation: string;
  eventDate: string;
  eventTime: string;
  specialRequests: string;
  decorationOption: string;
  decorationPrice: string;
}

type WeddingCheckoutSnapshot = BookingFormData & {
  decorationOptionName?: string | null;
};

// Available booking durations in hours
const DURATION_OPTIONS = [3, 4, 5, 6, 8, 10, 12];

// Calculate price based on vehicle, duration/trips, and VAT
export function WeddingBooking() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneCountryCode: "+351",
    phoneNumber: "",
    phone: "",
    selectedVehicle: "",
    serviceType: "main",
    durationHours: "3",
    numberOfTrips: "1",
    needsGuestTransport: "no",
    guestTransportVehicleCount: "1",
    startLocation: "",
    endLocation: "",
    eventDate: "",
    eventTime: "",
    specialRequests: "",
    decorationOption: "",
    decorationPrice: "0",
  });

  const [selectedVehicle, setSelectedVehicle] = useState<WeddingVehicle | null>(
    null
  );
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const calButtonRef = useRef<HTMLButtonElement | null>(null);
  const pendingBookingRef = useRef<WeddingCheckoutSnapshot | null>(null);
  const lastCalSlugRef = useRef<string | null>(null);
  const isProcessingCheckoutRef = useRef(false);
  const calUsername = import.meta.env.VITE_CAL_USERNAME;
  const calSlug = selectedVehicle
    ? `wedding-${formData.serviceType}-${selectedVehicle.id}`
    : null;
  const calLink = calSlug && calUsername ? `${calUsername}/${calSlug}` : null;
  const calNotes =
    selectedVehicle &&
    `Vehicle: ${selectedVehicle.name}. Date: ${
      formData.eventDate || "TBD"
    } ${formData.eventTime || ""}. Route: ${
      formData.startLocation || "TBD"
    } → ${formData.endLocation || "TBD"}. Phone: ${
      formData.phone || "N/A"
    }.`;
  const calConfig = calLink
    ? JSON.stringify({
        layout: "month_view",
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
            bookingType: "wedding",
            calEventSlug: slug,
            calEventId: calData?.uid,
            calStartTime: calData?.startTime,
            calEndTime: calData?.endTime,
            calInvitee: {
              name: `${snapshot.firstName} ${snapshot.lastName}`.trim(),
              email: snapshot.email,
              phone: snapshot.phone,
            },
            wedding: {
              serviceType: snapshot.serviceType,
              selectedVehicleId: snapshot.selectedVehicle,
              durationHours: parseInt(snapshot.durationHours, 10) || 0,
              numberOfTrips: parseInt(snapshot.numberOfTrips, 10) || 0,
              decorationPrice: parseFloat(snapshot.decorationPrice) || 0,
              decorationOptionName: snapshot.decorationOptionName ?? null,
              needsGuestTransport: snapshot.needsGuestTransport === "yes",
              guestTransportVehicleCount:
                snapshot.needsGuestTransport === "yes"
                  ? Number(snapshot.guestTransportVehicleCount)
                  : 0,
              startLocation: snapshot.startLocation,
              endLocation: snapshot.endLocation,
              eventDate: snapshot.eventDate,
              eventTime: snapshot.eventTime,
              specialRequests: snapshot.specialRequests,
              firstName: snapshot.firstName,
              lastName: snapshot.lastName,
              email: snapshot.email,
              phone: snapshot.phone,
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
        console.error("Checkout session creation failed:", error);
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

  useEffect(() => {
    if (!calSlug || !calUsername) {
      return;
    }

    let isMounted = true;
    let cleanup: (() => void) | null = null;

    const initCal = async () => {
      try {
        const cal = await getCalApi({ namespace: calSlug });
        if (!isMounted) return;

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
      isMounted = false;
      cleanup?.();
    };
  }, [calSlug, calUsername, handleCheckoutCreation]);

  useEffect(() => {
    if (selectedVehicle && formData.serviceType === "main") {
      const duration = parseInt(formData.durationHours) || 0;
      const decorationPrice = parseFloat(formData.decorationPrice) || 0;

      const priceResult = calculateWeddingPrice({
        vehicle: selectedVehicle,
        serviceType: formData.serviceType,
        durationHours: duration,
        decorationPrice,
      });
      setCalculatedPrice(priceResult.total);
    }
  }, [
    selectedVehicle,
    formData.serviceType,
    formData.durationHours,
    formData.numberOfTrips,
    formData.decorationPrice,
  ]);

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    if (field === "serviceType") {
      setSelectedVehicle(null);
      setCalculatedPrice(null);
      setFormData((prev) => ({
        ...prev,
        serviceType: value as BookingFormData["serviceType"],
        selectedVehicle: "",
        durationHours: value === "main" ? prev.durationHours || "3" : "3",
        numberOfTrips: value === "transport" ? "1" : prev.numberOfTrips,
      }));
      return;
    }

    if (field === "selectedVehicle") {
      const vehicle = weddingVehicles.find((v) => v.id === value) || null;
      if (vehicle) {
        const availabilityMessage = getVehicleAvailabilityMessage(vehicle.name);
        if (availabilityMessage) {
          alert(t(availabilityMessage));
          return;
        }
      }
      setSelectedVehicle(vehicle);
      setFormData((prev) => ({ ...prev, selectedVehicle: value }));
      return;
    } else if (field === "decorationOption") {
      const decoration = decorationOptions.find((d) => d.id === value);
      setFormData((prev) => {
        if (decoration) {
          const defaultPrice = Math.round(
            (decoration.minPrice + decoration.maxPrice) / 2
          );
          return {
            ...prev,
            decorationOption: value,
            decorationPrice: defaultPrice.toString(),
          };
        }
        return { ...prev, decorationOption: "", decorationPrice: "0" };
      });
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
    if (formData.serviceType === "main" && !formData.selectedVehicle)
      errors.push(t("Please select a vehicle"));
    if (!formData.startLocation.trim())
      errors.push(t("Starting location is required"));
    if (!formData.endLocation.trim())
      errors.push(t("Final location is required"));
    if (!formData.eventDate) errors.push(t("Event date is required"));
    if (!formData.eventTime) errors.push(t("Event time is required"));

    if (formData.serviceType === "main") {
      if (!formData.durationHours || parseInt(formData.durationHours) < 3) {
        errors.push(t("Minimum 3 hours required for main fleet bookings"));
      }
    }

    if (formData.serviceType === "transport") {
      if (formData.needsGuestTransport !== "yes") {
        errors.push(t("Please confirm whether guest transport is needed"));
      }
      if (
        formData.needsGuestTransport === "yes" &&
        (!formData.guestTransportVehicleCount ||
          parseInt(formData.guestTransportVehicleCount, 10) < 1)
      ) {
        errors.push(t("Please enter how many vehicles are needed"));
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push(t("Please enter a valid email address"));
    }

    return errors;
  };

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

    if (formData.serviceType === "transport") {
      setIsCreatingCheckout(true);
      setCheckoutError(null);
      fetch("/api/wedding-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone,
          selectedVehicle: "",
          selectedVehicleName: "Guest Transport Inquiry",
          calculatedPrice: null,
        }),
      })
        .then(async (response) => {
          if (!response.ok) {
            const data = await response.json().catch(() => null);
            throw new Error(data?.error || t("Unable to process booking at this time."));
          }
          setBookingComplete(true);
        })
        .catch((error: unknown) => {
          setCheckoutError(
            error instanceof Error
              ? error.message
              : t("Unable to process booking at this time."),
          );
        })
        .finally(() => setIsCreatingCheckout(false));
      return;
    }

    if (!calSlug || !calLink) {
      alert(t("Please select a vehicle to schedule with Cal.com."));
      return;
    }

    if (!selectedVehicle || calculatedPrice === null) {
      alert(t("Please complete the pricing details before scheduling."));
      return;
    }

    const decorationLabel = formData.decorationOption
      ? decorationOptions.find((d) => d.id === formData.decorationOption)?.name
      : null;

    pendingBookingRef.current = {
      ...formData,
      phone,
      decorationOptionName: decorationLabel ?? null,
    };
    lastCalSlugRef.current = calSlug;
    setCheckoutError(null);

    calButtonRef.current?.click();
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-luxury p-12 border border-luxury-gold/20">
            <CheckCircle className="h-20 w-20 text-luxury-gold mx-auto mb-6" />
            <h1 className="text-4xl luxury-display text-luxury-black mb-6">
              {t("Invoice Sent")}
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {t(
                "We have emailed your invoice with the total price and a secure Stripe payment link. Please check your inbox to complete payment."
              )}
            </p>
            <div className="bg-luxury-gold/5 p-6 rounded-lg border border-luxury-gold/10">
              <p className="text-sm text-gray-600">
                {t("The invoice has been sent to")}{" "}
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
        style={{ backgroundImage: "url(/wed-4.png)" }}
      >
        <div className="absolute inset-0 bg-luxury-black/60"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl luxury-display text-white mb-6 tracking-wider">
            {t("Book Your Wedding Transport")}
          </h1>
          <div className="gold-separator mx-auto w-64 mb-8"></div>
          <p className="text-xl font-playfair text-white/90 leading-relaxed">
            {t(
              "Create unforgettable memories with our premium wedding transportation services. Choose from our classic main fleet for the couple or additional transport vehicles for your guests."
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
                  placeholder="649 64 29 98"
                />
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <Heart className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">
                  {t("Wedding Event Details")}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Wedding Date")}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) =>
                      handleInputChange("eventDate", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Event Start Time")}
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.eventTime}
                    onChange={(e) =>
                      handleInputChange("eventTime", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                  />
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
                    placeholder={t("e.g., Hotel, Church, Home")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Final Location")}
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
                    placeholder={t("e.g., Ceremony Venue, Reception Hall")}
                  />
                </div>
              </div>
            </div>

            {/* Service Type Selection */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <h2 className="text-2xl luxury-heading text-luxury-black mb-6">
                {t("Service Type")}
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    formData.serviceType === "main"
                      ? "border-luxury-gold bg-luxury-gold/5"
                      : "border-gray-200 hover:border-luxury-gold/50"
                  }`}
                  onClick={() => handleInputChange("serviceType", "main")}
                >
                  <h3 className="text-lg font-semibold text-luxury-black mb-2">
                    {t("Main Wedding Fleet")}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {t(
                      "For the couple - stationary use, photos, ceremonies (23% VAT)"
                    )}
                  </p>
                  <p className="text-luxury-gold font-medium">
                    {t("Prices from €750 (min 3h)")}
                  </p>
                </div>

                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    formData.serviceType === "transport"
                      ? "border-luxury-gold bg-luxury-gold/5"
                      : "border-gray-200 hover:border-luxury-gold/50"
                  }`}
                  onClick={() => handleInputChange("serviceType", "transport")}
                >
                  <h3 className="text-lg font-semibold text-luxury-black mb-2">
                    {t("Guest Transport")}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {t(
                      "For transporting wedding guests and party. Only modern vehicles available."
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Vehicle Selection */}
            {formData.serviceType === "main" && (
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <Car className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">
                  {t("Select Your Vehicle")}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {weddingVehicles
                  .filter(
                    (vehicle) => vehicle.category === "main"
                  )
                  .map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                        formData.selectedVehicle === vehicle.id
                          ? "border-luxury-gold bg-luxury-gold/5 shadow-lg"
                          : "border-gray-200 hover:border-luxury-gold/50"
                      }`}
                      onClick={() =>
                        handleInputChange("selectedVehicle", vehicle.id)
                      }
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
                      {vehicle.category === "main" &&
                        vehicle.basePrice &&
                        vehicle.extraHourRate && (
                          <p className="text-luxury-gold font-medium mb-2">
                            €{vehicle.basePrice}/{vehicle.minimumHours}
                            {t("h")} · €{vehicle.extraHourRate}/{t("hour")} {t("extra")}
                          </p>
                        )}
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          vehicle.category === "main"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {vehicle.category === "main"
                          ? t("Main Fleet")
                          : t("Transport")}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            )}

            {/* Booking Details */}
            {(selectedVehicle || formData.serviceType === "transport") && (
              <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
                <h2 className="text-2xl luxury-heading text-luxury-black mb-6">
                  {t("Booking Details")}
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {formData.serviceType === "main" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("Duration (Hours)")}
                      </label>
                      <select
                        value={formData.durationHours}
                        onChange={(e) =>
                          handleInputChange("durationHours", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                      >
                        {DURATION_OPTIONS.map((hours) => (
                          <option key={hours} value={hours.toString()}>
                            {hours} {t("hours")}{" "}
                            {hours === 12 ? t("(Full Day Rate)") : ""}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        {t("Minimum 3 hours required")}
                      </p>
                    </div>
                  )}

                  {formData.serviceType === "transport" && (
                    <>
                      <div className="md:col-span-2 rounded-lg border border-luxury-gold/15 bg-luxury-gold/5 p-4">
                        <p className="text-sm text-gray-700">
                          {t(
                            "For transporting wedding guests and party. Only modern vehicles available."
                          )}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t("Do you need vehicles for guest transport?")}
                        </label>
                        <select
                          value={formData.needsGuestTransport}
                          onChange={(e) =>
                            handleInputChange("needsGuestTransport", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                        >
                          <option value="no">{t("No")}</option>
                          <option value="yes">{t("Yes")}</option>
                        </select>
                      </div>
                      {formData.needsGuestTransport === "yes" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("How many vehicles do you need?")}
                          </label>
                          <select
                            value={formData.guestTransportVehicleCount}
                            onChange={(e) =>
                              handleInputChange(
                                "guestTransportVehicleCount",
                                e.target.value,
                              )
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                          >
                            {[1, 2, 3, 4, 5, 6].map((count) => (
                              <option key={count} value={count.toString()}>
                                {count}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </>
                  )}

                  {formData.serviceType === "main" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t("Decoration Options (Optional)")}
                        </label>
                        <select
                          value={formData.decorationOption}
                          onChange={(e) =>
                            handleInputChange("decorationOption", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                        >
                          <option value="">{t("No decoration")}</option>
                          {decorationOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                              {t(option.name)} - {t(option.priceRange)}
                            </option>
                          ))}
                        </select>
                      </div>

                      {formData.decorationOption && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("Decoration Price (€)")}
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={formData.decorationPrice}
                            onChange={(e) =>
                              handleInputChange("decorationPrice", e.target.value)
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                            placeholder={t("Enter decoration price")}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Price Summary */}
            {formData.serviceType === "main" && calculatedPrice !== null && (
              <div className="bg-luxury-gold/5 rounded-lg p-6 border border-luxury-gold/20">
                <h3 className="text-lg font-semibold text-luxury-black mb-3">
                  {t("Estimated Summary")}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">
                    {t("Pricing shown at secure checkout")}
                  </span>
                </div>
              </div>
            )}

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
                    "Any special requirements, decoration details, or additional services..."
                  )}
                />
              </div>
            </div>

            {/* Cal.com Popup Button */}
            <div className="text-center space-y-3">
              <button
                type="submit"
                disabled={
                  isCreatingCheckout ||
                  (formData.serviceType === "main" &&
                    (!selectedVehicle || calculatedPrice === null || !calLink))
                }
                className={`btn-luxury-premium text-xl px-12 py-5 group ${
                  isCreatingCheckout ||
                  (formData.serviceType === "main" &&
                    (!selectedVehicle || calculatedPrice === null || !calLink))
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                <div className="flex items-center justify-center">
                  <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>
                    {isCreatingCheckout
                      ? t("Preparing your request...")
                      : formData.serviceType === "transport"
                        ? t("Send Guest Transport Inquiry")
                        : t("Find Out Prices")}
                  </span>
                </div>
              </button>

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
