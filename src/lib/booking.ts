export type VehicleAvailabilityStatus = "available" | "coming-soon";

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
