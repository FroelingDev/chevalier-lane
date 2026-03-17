import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const componentPaths = [
  "src/components/OneWayBooking.tsx",
  "src/components/AirportBooking.tsx",
  "src/components/CorporateBooking.tsx",
  "src/components/DynamicBooking.tsx",
  "src/components/TourBookingForm.tsx",
  "src/components/WeddingBooking.tsx",
];

function readComponent(relativePath: string) {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("booking email-only frontend flow", () => {
  it("removes direct Stripe redirects from priced booking components", () => {
    for (const filePath of componentPaths) {
      expect(readComponent(filePath)).not.toContain("window.location.assign");
    }
  });

  it("wires components to show the payment email confirmation state", () => {
    for (const filePath of componentPaths) {
      const file = readComponent(filePath);
      expect(file).toContain("PaymentEmailSentNotice");
      expect(file).toContain("setPaymentEmailSentTo");
      expect(file).toContain("recipientEmail");
    }
  });

  it("removes the old checkout-pricing copy from the updated booking components", () => {
    for (const filePath of componentPaths) {
      const file = readComponent(filePath);
      expect(file).not.toContain("Pricing shown at secure checkout");
      expect(file).toContain("Price shared by email after reservation");
    }
  });
});
