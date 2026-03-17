import { describe, expect, it } from "vitest";
import {
  formatInternationalPhone,
  getCapacityMessage,
  getVehicleAvailabilityMessage,
} from "@/lib/booking";
import { calculateCorporatePrice, corporateCarOptions } from "@/lib/pricing/corporate";

describe("booking helpers", () => {
  it("formats a local phone number with the selected country code", () => {
    expect(formatInternationalPhone("+351", "912 345 678")).toBe(
      "+351 912 345 678",
    );
  });

  it("keeps an already international phone number untouched", () => {
    expect(formatInternationalPhone("+351", "+44 20 1234 5678")).toBe(
      "+44 20 1234 5678",
    );
  });

  it("returns the blocked Bentley message", () => {
    expect(getVehicleAvailabilityMessage("Bentley Mulsanne")).toContain(
      "soon be available",
    );
  });

  it("builds a passenger capacity warning", () => {
    expect(getCapacityMessage("Bentley Mulsanne", 3, 4)).toContain(
      "accommodate 4 passengers",
    );
  });

  it("calculates an 8 hour full-day style corporate booking", () => {
    const maybach = corporateCarOptions.find((car) => car.id === "mercedes-maybach");
    expect(maybach).toBeDefined();
    expect(calculateCorporatePrice(480, maybach!)).toBeGreaterThan(0);
  });
});
