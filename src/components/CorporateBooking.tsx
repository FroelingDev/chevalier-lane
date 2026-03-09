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
import PhoneField from "@/components/booking/PhoneField";
import { useLanguage } from "@/components/LanguageProvider";
import {
  formatInternationalPhone,
  getCapacityMessage,
  getInquiryCtaLabel,
  getVehicleAvailabilityMessage,
} from "@/lib/booking";
import {
  corporateCarOptions,
  calculateCorporatePrice,
  type CorporateCarOption,
} from "@/lib/pricing/corporate";
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
  duration: string;
  passengers: string;
  specialRequests: string;
  bookingMode: "hourly" | "full-day";
  needsBabySeat: boolean;
  babySeatCount: string;
}

const HOURLY_DURATION_OPTIONS = [120, 150, 180, 240, 300, 360, 420, 480];
const FULL_DAY_DURATION_OPTIONS = [480, 540, 600, 720];

const formatDuration = (minutes: number, t?: (key: string) => string): string => {
  const translate = t ?? ((value: string) => value);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours} ${translate(hours === 1 ? "hour" : "hours")}`;
  }
  return `${hours}h ${mins}m`;
};

export function CorporateBooking() {
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
    duration: "120",
    passengers: "1",
    specialRequests: "",
    bookingMode: "hourly",
    needsBabySeat: false,
    babySeatCount: "1",
  });

  const [selectedCar, setSelectedCar] = useState<CorporateCarOption | null>(null);
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [selectionNotice, setSelectionNotice] = useState<string | null>(null);
  const pendingBookingRef = useRef<
    (BookingFormData & { durationMinutes: number }) | null
  >(null);
  const lastCalSlugRef = useRef<string | null>(null);
  const calButtonRef = useRef<HTMLButtonElement | null>(null);
  const isProcessingCheckoutRef = useRef(false);
  const calUsername = import.meta.env.VITE_CAL_USERNAME;
  const calSlug = selectedCar ? `corporate-${selectedCar.id}` : null;
  const calLink = calSlug && calUsername ? `${calUsername}/${calSlug}` : null;
  const calNotes = selectedCar
    ? `Mode: ${
        formData.bookingMode === "full-day" ? "Full Day" : "By the Hour"
      }. From ${formData.startLocation || "TBD"}. Duration: ${formatDuration(
        Number(formData.duration) || 120,
        t,
      )}. Passengers: ${formData.passengers}. Phone: ${
        formData.phone || ""
      }. Baby seat: ${
        formData.needsBabySeat ? `Yes (${formData.babySeatCount})` : "No"
      }. Special: ${formData.specialRequests || "None"}.`
    : undefined;
  const calConfig =
    calLink && selectedCar
      ? JSON.stringify({
          layout: "month_view",
          duration: String(formData.duration || "120"),
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
            bookingType: "corporate",
            calEventSlug: slug,
            calEventId: calData?.uid,
            calStartTime: calData?.startTime,
            calEndTime: calData?.endTime,
            calInvitee: {
              name: `${snapshot.firstName} ${snapshot.lastName}`.trim(),
              email: snapshot.email,
              phone: snapshot.phone,
            },
            corporate: {
              selectedVehicleId: snapshot.selectedCar,
              startLocation: snapshot.startLocation,
              durationMinutes: snapshot.durationMinutes,
              passengers: Number(snapshot.passengers) || 1,
              specialRequests: snapshot.specialRequests,
              firstName: snapshot.firstName,
              lastName: snapshot.lastName,
              email: snapshot.email,
              phone: snapshot.phone,
              bookingMode: snapshot.bookingMode,
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
        console.error("Corporate checkout creation failed:", error);
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
    if (formData.duration && selectedCar) {
      const durationMinutes = parseInt(formData.duration, 10);
      calculateCorporatePrice(durationMinutes, selectedCar);
    }
  }, [formData.duration, selectedCar]);

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    if (field === "bookingMode") {
      const bookingMode = value as BookingFormData["bookingMode"];
      setFormData((prev) => ({
        ...prev,
        bookingMode,
        duration: bookingMode === "full-day" ? "480" : "120",
      }));
      return;
    }

    if (field === "selectedCar") {
      const car = corporateCarOptions.find((option) => option.id === value) || null;
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
    if (!formData.duration) errors.push(t("Duration is required"));

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

    if (!selectedCar || !calSlug) {
      return;
    }

    const durationMinutes = parseInt(formData.duration, 10) || 0;
    pendingBookingRef.current = {
      ...formData,
      phone,
      durationMinutes,
    };
    lastCalSlugRef.current = calSlug;
    setCheckoutError(null);
    calButtonRef.current?.click();
  };

  const durationOptions =
    formData.bookingMode === "full-day"
      ? FULL_DAY_DURATION_OPTIONS
      : HOURLY_DURATION_OPTIONS;

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white">
      <section
        className="relative py-20 px-4 bg-cover bg-center"
        style={{ backgroundImage: "url(/corp-6.png)" }}
      >
        <div className="absolute inset-0 bg-luxury-black/60"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl luxury-display text-white mb-6 tracking-wider">
            {t("By the Hour | Full Day")}
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
                      formData.bookingMode === "hourly"
                        ? "border-luxury-gold bg-luxury-gold/5"
                        : "border-gray-200"
                    }`}
                    onClick={() => handleInputChange("bookingMode", "hourly")}
                  >
                    <div className="font-semibold text-luxury-black">
                      {t("Book by the Hour")}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      {t("Flexible hourly chauffeur service.")}
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`rounded-lg border-2 px-4 py-4 text-left transition-colors ${
                      formData.bookingMode === "full-day"
                        ? "border-luxury-gold bg-luxury-gold/5"
                        : "border-gray-200"
                    }`}
                    onClick={() => handleInputChange("bookingMode", "full-day")}
                  >
                    <div className="font-semibold text-luxury-black">
                      {t("Book Full Day")}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      {t("Minimum 8 hours with the same booking flow.")}
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
                    {t("Duration")}
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) =>
                      handleInputChange("duration", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
                  >
                    {durationOptions.map((minutes) => (
                      <option key={minutes} value={minutes.toString()}>
                        {formatDuration(minutes, t)}
                      </option>
                    ))}
                  </select>
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
                        {formatDuration(parseInt(formData.duration, 10), t)}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-luxury-gold mr-2" />
                    <span className="text-gray-700">
                      {formData.bookingMode === "full-day"
                        ? t("Full Day")
                        : t("By the Hour")}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <Car className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">
                  {t("Select Your Vehicle")}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {corporateCarOptions.map((car) => (
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
                    <p className="text-gray-600 font-medium mb-2">
                      {car.availabilityStatus === "coming-soon"
                        ? t("Available Soon")
                        : t("Pricing shown at secure checkout")}
                    </p>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {t("Modern")}
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

            <div className="text-center">
              {!calUsername ? (
                <div className="text-sm text-red-600">
                  {t("Missing Cal.com username. Please set")}{" "}
                  <code>VITE_CAL_USERNAME</code>.
                </div>
              ) : (
                <>
                  <button
                    type="submit"
                    disabled={
                      isCreatingCheckout ||
                      !selectedCar ||
                      !formData.startLocation ||
                      !formData.duration
                    }
                    className={`btn-luxury-premium text-xl px-12 py-5 group ${
                      isCreatingCheckout ||
                      !selectedCar ||
                      !formData.startLocation ||
                      !formData.duration
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
                  {selectedCar && !formData.startLocation && (
                    <p className="text-red-600 mt-2 text-sm">
                      {t("Please enter a starting location")}
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
