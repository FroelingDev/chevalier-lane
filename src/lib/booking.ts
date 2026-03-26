export type VehicleAvailabilityStatus = "available" | "coming-soon";
export type FleetCategory = "modern" | "classic";
export type ClassicRouteService = "one-way" | "airport" | "tour";

export type VehicleBookingMeta = {
  maxPassengers: number;
  availabilityStatus?: VehicleAvailabilityStatus;
  requiresContact?: boolean;
};

export type CountryCodeOption = {
  code: string;
  label: string;
};

export const BENTLEY_BLOCKED_MESSAGE =
  "Our flagship Bentley Mulsanne will soon be available for selected services.";

export const CLASSIC_ROUTE_BLOCKED_MESSAGE =
  "Classic vehicles are only available for short-distance journeys within Cascais and Estoril. Please select a modern vehicle.";

export const CLASSIC_AIRPORT_ONLY_MESSAGE =
  "Classic vehicles only operate from Tires Airport (Cascais Airport). No other airports are supported for pickup or drop-off.";

const CASCAIS_AREA_MATCHERS = [
  "cascais",
  "estoril",
  "monte estoril",
  "sao joao do estoril",
  "sao pedro do estoril",
  "parede",
  "carcavelos",
];

const TIRES_AIRPORT_MATCHERS = [
  "tires airport",
  "cascais airport",
  "cascais / tires airport",
  "aerodromo municipal de cascais",
];

const LISBON_AIRPORT_MATCHERS = [
  "lisbon airport",
  "humberto delgado airport",
  "aeroporto de lisboa",
  "lisbon portela airport",
];

const ANY_AIRPORT_MATCHERS = [
  "airport",
  "aeroporto",
  "aerodromo",
  "aeropuerto",
  "flughafen",
];

export const COUNTRY_CODE_OPTIONS: CountryCodeOption[] = [
  { code: "+351", label: "Portugal (+351)" },
  { code: "+34", label: "Spain (+34)" },
  { code: "+44", label: "United Kingdom (+44)" },
  { code: "+33", label: "France (+33)" },
  { code: "+49", label: "Germany (+49)" },
  { code: "+1", label: "United States (+1)" },
];

export function formatInternationalPhone(
  countryCode: string,
  phoneNumber: string,
): string {
  const trimmedNumber = phoneNumber.trim();
  if (!trimmedNumber) return "";
  if (trimmedNumber.startsWith("+")) return trimmedNumber;
  return `${countryCode} ${trimmedNumber}`.trim();
}

export function getVehicleAvailabilityMessage(vehicleName: string): string | null {
  if (vehicleName !== "Bentley Mulsanne") return null;
  return BENTLEY_BLOCKED_MESSAGE;
}

function normalizeLocation(value: string): string {
  return value.trim().toLowerCase();
}

function matchesLocation(value: string, matchers: string[]): boolean {
  const normalized = normalizeLocation(value);
  return matchers.some((matcher) => normalized.includes(matcher));
}

export function isWithinClassicServiceArea(location: string): boolean {
  return matchesLocation(location, CASCAIS_AREA_MATCHERS);
}

export function isTiresAirportLocation(location: string): boolean {
  return matchesLocation(location, TIRES_AIRPORT_MATCHERS);
}

export function isLisbonAirportLocation(location: string): boolean {
  return matchesLocation(location, LISBON_AIRPORT_MATCHERS);
}

export function isAnyAirportLocation(location: string): boolean {
  return matchesLocation(location, ANY_AIRPORT_MATCHERS);
}

export function getFleetCategoryTitle(category: FleetCategory): string {
  return category === "modern"
    ? "Modern Chauffeur Fleet"
    : "Classic Chauffeur Fleet";
}

export function validateClassicRoute({
  service,
  pickupLocation,
  dropoffLocation,
  distanceKm,
}: {
  service: ClassicRouteService;
  pickupLocation: string;
  dropoffLocation: string;
  distanceKm: number | null;
}): string | null {
  if (!pickupLocation.trim() || !dropoffLocation.trim()) {
    return null;
  }

  if (distanceKm !== null && distanceKm > 25) {
    return CLASSIC_ROUTE_BLOCKED_MESSAGE;
  }

  if (service === "airport") {
    const pickupIsOtherAirport =
      isAnyAirportLocation(pickupLocation) && !isTiresAirportLocation(pickupLocation);
    const dropoffIsOtherAirport =
      isAnyAirportLocation(dropoffLocation) && !isTiresAirportLocation(dropoffLocation);

    if (pickupIsOtherAirport || dropoffIsOtherAirport) {
      return CLASSIC_AIRPORT_ONLY_MESSAGE;
    }

    if (!isTiresAirportLocation(pickupLocation)) {
      return CLASSIC_ROUTE_BLOCKED_MESSAGE;
    }

    if (!isWithinClassicServiceArea(dropoffLocation)) {
      return CLASSIC_ROUTE_BLOCKED_MESSAGE;
    }

    return null;
  }

  if (
    !isWithinClassicServiceArea(pickupLocation) ||
    !isWithinClassicServiceArea(dropoffLocation)
  ) {
    return CLASSIC_ROUTE_BLOCKED_MESSAGE;
  }

  return null;
}

export function exceedsVehicleCapacity(
  maxPassengers: number,
  passengerCount: number,
): boolean {
  return passengerCount > maxPassengers;
}

export function getCapacityMessage(
  _vehicleName: string,
  maxPassengers: number,
  passengerCount: number,
): string {
  const passengerLabel = maxPassengers === 1 ? "passenger" : "passengers";
  return `This vehicle only accommodates up to ${maxPassengers} ${passengerLabel}. Please choose a vehicle that can accommodate ${passengerCount} passengers.`;
}

export function getInquiryCtaLabel(
  selectedName?: string | null,
  prefix = "Find Out Prices",
): string {
  return selectedName ? `${prefix} - ${selectedName}` : prefix;
}
