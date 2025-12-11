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
  Euro,
  Wine,
  MapPin,
  Plus,
  Minus,
  Car,
} from "lucide-react";
import { getCalApi, type EmbedEvent } from "@calcom/embed-react";
import { usePlacesAutocomplete } from "../lib/usePlacesAutocomplete";
import {
  tourOptions,
  type TourOption,
  TOUR_DESTINATIONS,
  calculateTourPrice,
  type TourPricingBreakdown,
} from "../lib/pricing/tour";
import {
  oneWayCarOptions as carOptions,
  type OneWayCarOption as CarOption,
} from "../lib/pricing/one-way-cars";

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedTour: string;
  selectedVehicle: string;
  startLocation: string;
  participants: number;
  selectedAddOns: string[];
  specialRequests: string;
}

type TourCheckoutSnapshot = BookingFormData & {
  distanceKm: number | null;
};

export function TourBookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    selectedTour: "",
    selectedVehicle: "",
    startLocation: "",
    participants: 1,
    selectedAddOns: [],
    specialRequests: "",
  });

  const [selectedTourOption, setSelectedTourOption] =
    useState<TourOption | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<CarOption | null>(
    null
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [priceBreakdown, setPriceBreakdown] =
    useState<TourPricingBreakdown | null>(null);
  const [calculatedDistanceKm, setCalculatedDistanceKm] = useState<
    number | null
  >(null);
  const [isCalculatingDistance, setIsCalculatingDistance] = useState(false);
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
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
      }. Price: €${totalPrice.toFixed(2)}. Phone: ${formData.phone || ""}.`
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

  // Calculate total price when selections change
  useEffect(() => {
    const pricingResult = calculateTourPrice({
      tourOption: selectedTourOption,
      participants: formData.participants,
      selectedAddOnIds: formData.selectedAddOns,
      vehicle: selectedVehicle
        ? {
            minPrice: selectedVehicle.minPrice,
            pricePerKm: selectedVehicle.pricePerKm,
          }
        : null,
      distanceKm: calculatedDistanceKm,
    });

    setTotalPrice(pricingResult.total);
    setPriceBreakdown(pricingResult.breakdown);
  }, [
    selectedTourOption,
    selectedVehicle,
    formData.participants,
    formData.selectedAddOns,
    calculatedDistanceKm,
  ]);

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
      const vehicle = carOptions.find((v) => v.id === value);
      setSelectedVehicle(vehicle || null);
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
      setFormData((prev) => ({ ...prev, participants: newCount }));
    }
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];

    if (!formData.firstName.trim()) errors.push("First name is required");
    if (!formData.lastName.trim()) errors.push("Last name is required");
    if (!formData.email.trim()) errors.push("Email is required");
    if (!formData.phone.trim()) errors.push("Phone number is required");
    if (!formData.selectedTour) errors.push("Please select a tour option");
    if (!formData.selectedVehicle)
      errors.push("Please select a vehicle for the tour");
    if (!formData.startLocation.trim())
      errors.push("Starting location is required");

    if (selectedTourOption) {
      if (formData.participants < selectedTourOption.minParticipants) {
        errors.push(
          `Minimum ${selectedTourOption.minParticipants} participants required for this tour`
        );
      }
      if (
        selectedTourOption.maxParticipants &&
        formData.participants > selectedTourOption.maxParticipants
      ) {
        errors.push(
          `Maximum ${selectedTourOption.maxParticipants} participants allowed for this tour`
        );
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push("Please enter a valid email address");
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
            },
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(
            data?.error || "Unable to create a Stripe checkout session."
          );
        }

        const data = await response.json();
        if (data.sessionUrl) {
          window.location.assign(data.sessionUrl as string);
        } else {
          throw new Error("Stripe checkout session URL missing.");
        }
      } catch (error) {
        console.error("Tour checkout creation failed:", error);
        setCheckoutError(
          error instanceof Error
            ? error.message
            : "Unable to create Stripe checkout session."
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

    const errors = validateForm();
    if (errors.length > 0) {
      alert("Please fix the following errors:\n" + errors.join("\n"));
      return;
    }

    if (!selectedTourOption || !calSlug || !calLink) {
      alert("Please select a tour option to continue.");
      return;
    }

    if (!selectedVehicle) {
      alert("Please select a vehicle for the tour.");
      return;
    }

    pendingBookingRef.current = {
      ...formData,
      distanceKm: calculatedDistanceKm ?? null,
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
        style={{ backgroundImage: "url(/scenic-routes.png)" }}
      >
        <div className="absolute inset-0 bg-luxury-black/60"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl luxury-display text-white mb-6 tracking-wider">
            Book Your Luxury Tour
          </h1>
          <div className="gold-separator mx-auto w-64 mb-8"></div>
          <p className="text-xl font-playfair text-white/90 leading-relaxed">
            Experience Portugal's finest wine regions with our exclusive private
            tours. Select your preferred experience below and see pricing update
            in real-time.
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
                    placeholder="+34 649 64 29 98"
                  />
                </div>
              </div>
            </div>

            {/* Tour Selection */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <Wine className="h-6 w-6 text-luxury-gold mr-3" />
                <h2 className="text-2xl luxury-heading text-luxury-black">
                  Select Your Tour Experience
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                    placeholder="e.g., Lisbon Airport, Hotel"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    We’ll calculate the transfer distance to your selected
                    experience.
                  </p>
                </div>

                <div className="bg-luxury-gold/5 border border-luxury-gold/20 rounded-lg p-4 text-sm text-gray-700">
                  <p className="font-medium text-luxury-black mb-1">
                    Distance to Experience
                  </p>
                  {isCalculatingDistance ? (
                    <p>Calculating distance...</p>
                  ) : calculatedDistanceKm !== null ? (
                    <p>
                      Approximately{" "}
                      <span className="font-semibold text-luxury-black">
                        {calculatedDistanceKm} km
                      </span>{" "}
                      from your pickup location to{" "}
                      {selectedTourOption
                        ? TOUR_DESTINATIONS[selectedTourOption.category].name
                        : "the experience"}
                      .
                    </p>
                  ) : (
                    <p>
                      Enter a starting location to calculate driving distance.
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Buddha Eden Tours */}
                <div>
                  <h3 className="text-lg font-semibold text-luxury-black mb-4 flex items-center">
                    <MapPin className="h-5 w-5 text-luxury-gold mr-2" />
                    Buddha Eden Gardens (Bombarral)
                  </h3>
                  <div className="space-y-3">
                    {tourOptions
                      .filter((t) => t.category === "buddha-eden")
                      .map((tour) => (
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
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-luxury-black">
                                    {tour.name}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {tour.duration}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="text-luxury-gold font-semibold">
                                    {tour.priceRange
                                      ? `€${tour.priceRange[0]}–${tour.priceRange[1]}`
                                      : `€${tour.basePrice}`}{" "}
                                    pp
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    per person
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 mt-2">
                                {tour.description}
                              </p>
                              <div className="text-xs text-gray-600 mt-1">
                                Min {tour.minParticipants} participant
                                {tour.minParticipants > 1 ? "s" : ""}
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
                    {tourOptions
                      .filter((t) => t.category === "palacio")
                      .map((tour) => (
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
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-luxury-black">
                                    {tour.name}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {tour.duration}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="text-luxury-gold font-semibold">
                                    {tour.priceRange
                                      ? `€${tour.priceRange[0]}–${tour.priceRange[1]}`
                                      : `€${tour.basePrice}`}{" "}
                                    pp
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    per person
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 mt-2">
                                {tour.description}
                              </p>
                              <div className="text-xs text-gray-600 mt-1">
                                Min {tour.minParticipants} participant
                                {tour.minParticipants > 1 ? "s" : ""}
                                {tour.maxParticipants &&
                                  ` • Max ${tour.maxParticipants}`}
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
                  Select Your Vehicle
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {carOptions.map((vehicle) => (
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
                      {vehicle.name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-1">
                      {vehicle.price}
                    </p>
                    <p className="text-luxury-gold font-medium mb-2">
                      Starting from €{vehicle.minPrice}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        vehicle.category === "modern"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {vehicle.category === "modern" ? "Modern" : "Classic"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Participants & Add-ons */}
            {selectedTourOption && (
              <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
                <div className="flex items-center mb-6">
                  <Users className="h-6 w-6 text-luxury-gold mr-3" />
                  <h2 className="text-2xl luxury-heading text-luxury-black">
                    Participants & Options
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Number of Participants */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Number of Participants
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
                      Min {selectedTourOption.minParticipants}
                      {selectedTourOption.maxParticipants &&
                        ` • Max ${selectedTourOption.maxParticipants}`}
                    </p>
                  </div>

                  {/* Add-ons */}
                  {selectedTourOption.addOns &&
                    selectedTourOption.addOns.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Optional Add-ons
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
                                      {addOn.name}
                                    </span>
                                    <p className="text-sm text-gray-600">
                                      {addOn.description}
                                    </p>
                                  </div>
                                  <span className="text-luxury-gold font-semibold">
                                    €{addOn.price} pp
                                  </span>
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
                      {selectedTourOption.name} × {formData.participants}{" "}
                      participant{formData.participants > 1 ? "s" : ""}
                    </span>
                    <span className="font-semibold text-luxury-black">
                      €
                      {(
                        selectedTourOption.basePrice * formData.participants
                      ).toFixed(2)}
                    </span>
                  </div>

                  {selectedTourOption.addOns?.map((addOn) => {
                    if (formData.selectedAddOns.includes(addOn.id)) {
                      return (
                        <div key={addOn.id} className="flex justify-between">
                          <span className="text-gray-700">
                            {addOn.name} × {formData.participants} participant
                            {formData.participants > 1 ? "s" : ""}
                          </span>
                          <span className="font-semibold text-luxury-black">
                            €{(addOn.price * formData.participants).toFixed(2)}
                          </span>
                        </div>
                      );
                    }
                    return null;
                  })}

                  {selectedVehicle && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">
                        Vehicle: {selectedVehicle.name}
                      </span>
                      <span className="font-semibold text-luxury-black">
                        €
                        {(
                          priceBreakdown?.vehicle ?? selectedVehicle.minPrice
                        ).toFixed(2)}
                        {calculatedDistanceKm &&
                        calculatedDistanceKm > 25 &&
                        selectedVehicle?.pricePerKm ? (
                          <span className="text-xs text-gray-500 ml-2">
                            ({selectedVehicle.minPrice.toFixed(2)} base +{" "}
                            {(calculatedDistanceKm - 25).toFixed(1)} km × €
                            {selectedVehicle.pricePerKm.toFixed(2)})
                          </span>
                        ) : null}
                      </span>
                    </div>
                  )}

                  {selectedVehicle && calculatedDistanceKm === null && (
                    <p className="text-xs text-amber-600">
                      Unable to estimate distance. Vehicle cost reflects minimum
                      price; actual total may vary.
                    </p>
                  )}

                  <div className="border-t border-luxury-gold/30 pt-2 mt-3">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-luxury-black">
                        Total Price
                      </span>
                      <span className="font-bold text-luxury-gold">
                        €{totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Prices are subject to VAT
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Special Requests */}
            <div className="bg-white rounded-lg shadow-luxury p-8 border border-luxury-gold/10">
              <div className="flex items-center mb-6">
                <Wine className="h-6 w-6 text-luxury-gold mr-3" />
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
                  placeholder="Any dietary requirements, accessibility needs, preferred languages, or special requests..."
                />
              </div>
            </div>

            <div className="text-center space-y-3">
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
                      ? "Preparing secure payment..."
                      : "Schedule & Pay"}
                  </span>
                </div>
              </button>

              {checkoutError && (
                <p className="text-red-600 text-sm">{checkoutError}</p>
              )}
              {!calUsername && (
                <p className="text-red-600 text-sm">
                  Missing Cal.com username. Please configure{" "}
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
