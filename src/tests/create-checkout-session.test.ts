import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  airportCarOptions,
} from "@/lib/pricing/airport";
import {
  corporateCarOptions,
} from "@/lib/pricing/corporate";
import {
  oneWayCarOptions,
} from "@/lib/pricing/one-way-cars";
import { tourOptions } from "@/lib/pricing/tour";
import { weddingVehicles } from "@/lib/pricing/wedding";

const stripeCreateMock = vi.fn();
const stripeRetrieveMock = vi.fn();
const resendSendMock = vi.fn();

vi.mock("@/lib/stripe", () => ({
  getStripeClient: () => ({
    checkout: {
      sessions: {
        create: stripeCreateMock,
        retrieve: stripeRetrieveMock,
      },
    },
  }),
}));

vi.mock("@/lib/resend", () => ({
  getResendClient: () => ({
    emails: {
      send: resendSendMock,
    },
  }),
}));

import {
  handleCreateCheckoutSessionRequest,
} from "@/routes/api/payments/create-checkout-session";
import { handlePaymentStatusRequest } from "@/routes/api/payments/status";

function buildRequest(body: unknown) {
  return new Request("https://chevalierlane.test/api/payments/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("create checkout session route", () => {
  beforeEach(() => {
    stripeCreateMock.mockReset();
    stripeRetrieveMock.mockReset();
    resendSendMock.mockReset();

    stripeCreateMock.mockResolvedValue({
      id: "cs_test_123",
      url: "https://checkout.stripe.com/c/pay/cs_test_123",
    });
    resendSendMock.mockResolvedValue({ id: "email_test" });
  });

  it.each([
    {
      label: "wedding",
      buildBody: () => {
        const vehicle = weddingVehicles.find((item) => item.category === "main");
        if (!vehicle) {
          throw new Error("Missing wedding vehicle fixture");
        }

        return {
          bookingType: "wedding",
          calEventSlug: `wedding-main-${vehicle.id}`,
          calEventId: "cal_wedding_1",
          wedding: {
            serviceType: "main",
            selectedVehicleId: vehicle.id,
            durationHours: 3,
            numberOfTrips: 1,
            decorationPrice: 0,
            decorationOptionName: null,
            startLocation: "Lisbon",
            endLocation: "Sintra",
            eventDate: "2026-06-01",
            eventTime: "14:00",
            specialRequests: "White flowers",
            firstName: "Ada",
            lastName: "Lovelace",
            email: "ada@example.com",
            phone: "+351 912 345 678",
          },
        };
      },
    },
    {
      label: "tour",
      buildBody: () => {
        const vehicle = oneWayCarOptions[0];
        const tour = tourOptions[0];

        return {
          bookingType: "tour",
          calEventSlug: `tour-${tour.id}`,
          calEventId: "cal_tour_1",
          tour: {
            selectedTourId: tour.id,
            participants: 2,
            selectedAddOns: [],
            startLocation: "Lisbon",
            specialRequests: "Window seats",
            firstName: "Ada",
            lastName: "Lovelace",
            email: "ada@example.com",
            phone: "+351 912 345 678",
            selectedVehicleId: vehicle.id,
            distanceKm: 35,
            needsBabySeat: false,
            babySeatCount: 0,
          },
        };
      },
    },
    {
      label: "one-way",
      buildBody: () => {
        const vehicle = oneWayCarOptions[0];

        return {
          bookingType: "one-way",
          calEventSlug: `one-way-${vehicle.id}`,
          calEventId: "cal_one_way_1",
          oneWay: {
            selectedVehicleId: vehicle.id,
            startLocation: "Lisbon",
            endLocation: "Porto",
            passengers: 2,
            specialRequests: "Cold water",
            firstName: "Ada",
            lastName: "Lovelace",
            email: "ada@example.com",
            phone: "+351 912 345 678",
            distanceKm: 25,
            needsBabySeat: false,
            babySeatCount: 0,
          },
        };
      },
    },
    {
      label: "airport",
      buildBody: () => {
        const vehicle = airportCarOptions[0];

        return {
          bookingType: "airport",
          calEventSlug: `airport-${vehicle.id}`,
          calEventId: "cal_airport_1",
          airport: {
            selectedVehicleId: vehicle.id,
            pickupLocation: "Lisbon Airport",
            dropoffLocation: "Cascais",
            passengers: 2,
            specialRequests: "Help with luggage",
            extraVehicle: true,
            flightNumber: "TP123",
            airline: "TAP",
            handLuggage: "2",
            largeLuggage: "1",
            firstName: "Ada",
            lastName: "Lovelace",
            email: "ada@example.com",
            phone: "+351 912 345 678",
            distanceKm: 30,
            needsBabySeat: false,
            babySeatCount: 0,
          },
        };
      },
    },
    {
      label: "corporate",
      buildBody: () => {
        const vehicle = corporateCarOptions[0];

        return {
          bookingType: "corporate",
          calEventSlug: `corporate-${vehicle.id}`,
          calEventId: "cal_corporate_1",
          corporate: {
            selectedVehicleId: vehicle.id,
            startLocation: "Lisbon",
            durationMinutes: 180,
            passengers: 2,
            specialRequests: "Board meeting stop",
            firstName: "Ada",
            lastName: "Lovelace",
            email: "ada@example.com",
            phone: "+351 912 345 678",
            bookingMode: "hourly",
            needsBabySeat: false,
            babySeatCount: 0,
          },
        };
      },
    },
  ])("emails the payment link and hides checkout data for $label", async ({ buildBody }) => {
    const response = await handleCreateCheckoutSessionRequest(buildRequest(buildBody()));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      status: "email_sent",
      recipientEmail: "ada@example.com",
    });

    expect(stripeCreateMock).toHaveBeenCalledTimes(1);
    expect(stripeCreateMock.mock.calls[0]?.[0]).toMatchObject({
      mode: "payment",
      customer_creation: "always",
      customer_email: "ada@example.com",
      payment_intent_data: {
        receipt_email: "ada@example.com",
      },
      invoice_creation: {
        enabled: true,
      },
    });

    expect(resendSendMock).toHaveBeenCalledTimes(2);
    expect(resendSendMock.mock.calls[0]?.[0]).toMatchObject({
      to: ["ada@example.com"],
      subject: "Your Chevalier Lane invoice",
    });
    expect(String(resendSendMock.mock.calls[0]?.[0]?.html)).toContain("Pay Invoice");
    expect(String(resendSendMock.mock.calls[0]?.[0]?.html)).toContain("https://checkout.stripe.com/c/pay/cs_test_123");

    expect(resendSendMock.mock.calls[1]?.[0]).toMatchObject({
      to: ["info@chevalierlane.com"],
    });
    expect(String(resendSendMock.mock.calls[1]?.[0]?.html)).not.toContain("Pay Invoice");
  });

  it("returns Stripe payment status without sending follow-up emails", async () => {
    stripeRetrieveMock.mockResolvedValue({
      id: "cs_paid_123",
      status: "complete",
      payment_status: "paid",
      amount_total: 125000,
      currency: "eur",
      customer_email: "paid@example.com",
      customer_details: { email: "paid@example.com" },
      metadata: { booking_type: "one-way" },
    });

    const response = await handlePaymentStatusRequest(
      new Request("https://chevalierlane.test/api/payments/status?session_id=cs_paid_123"),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toMatchObject({
      id: "cs_paid_123",
      payment_status: "paid",
      customer_email: "paid@example.com",
    });
    expect(resendSendMock).not.toHaveBeenCalled();
  });
});
