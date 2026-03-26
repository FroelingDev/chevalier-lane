import { createServerFileRoute } from "@tanstack/react-start/server";
import { getResendClient } from "@/lib/resend";

type BookingType = "one-way" | "airport" | "tour";

const sanitize = (value: string | undefined) => {
  if (!value) return "";
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

const formatBoolean = (value: boolean) => (value ? "Yes" : "No");

const serviceTitles: Record<BookingType, string> = {
  "one-way": "One-Way Transfer",
  airport: "Airport Transfer",
  tour: "Tour Inquiry",
};

const serviceIntros: Record<BookingType, string> = {
  "one-way": "A new one-way transfer inquiry has been submitted.",
  airport: "A new airport transfer inquiry has been submitted.",
  tour: "A new tour inquiry has been submitted.",
};

export const ServerRoute = createServerFileRoute("/api/booking-inquiry").methods({
  POST: async ({ request }) => {
    try {
      const body = (await request.json()) as {
        bookingType: BookingType;
        customer: {
          firstName: string;
          lastName: string;
          email: string;
          phone: string;
        };
        summary: {
          vehicleName: string;
          fleetCategory: string;
          pickupLabel?: string;
          pickupLocation: string;
          dropoffLabel?: string;
          dropoffLocation: string;
          passengers?: number;
          flightNumber?: string;
          airline?: string;
          handLuggage?: string;
          largeLuggage?: string;
          selectedTourName?: string;
          participants?: number;
          selectedAddOns?: string[];
          distanceKm?: number | null;
          needsBabySeat?: boolean;
          babySeatCount?: number;
          specialRequests?: string;
        };
      };

      const resend = getResendClient();
      if (!resend) {
        return new Response(JSON.stringify({ error: "Resend API key missing" }), {
          status: 500,
        });
      }

      const { bookingType, customer, summary } = body;
      const title = serviceTitles[bookingType];
      const fullName = `${customer.firstName} ${customer.lastName}`.trim();
      const addOns = summary.selectedAddOns?.length
        ? summary.selectedAddOns.map((item) => `<li>${sanitize(item)}</li>`).join("")
        : "<li>None selected</li>";

      const internalHtml = `
        <div style="font-family:Arial,sans-serif;color:#1a1a1a;line-height:1.6;">
          <h1 style="color:#b08d57;">${sanitize(title)} Inquiry</h1>
          <p>${sanitize(serviceIntros[bookingType])}</p>
          <h2>Client Details</h2>
          <p><strong>Name:</strong> ${sanitize(fullName)}</p>
          <p><strong>Email:</strong> ${sanitize(customer.email)}</p>
          <p><strong>Phone:</strong> ${sanitize(customer.phone)}</p>

          <h2>Journey Details</h2>
          <p><strong>Fleet:</strong> ${sanitize(summary.fleetCategory)}</p>
          <p><strong>Vehicle:</strong> ${sanitize(summary.vehicleName)}</p>
          <p><strong>${sanitize(summary.pickupLabel || "Pickup") }:</strong> ${sanitize(summary.pickupLocation)}</p>
          <p><strong>${sanitize(summary.dropoffLabel || "Destination") }:</strong> ${sanitize(summary.dropoffLocation)}</p>
          ${typeof summary.passengers === "number" ? `<p><strong>Passengers:</strong> ${summary.passengers}</p>` : ""}
          ${typeof summary.participants === "number" ? `<p><strong>Participants:</strong> ${summary.participants}</p>` : ""}
          ${typeof summary.distanceKm === "number" ? `<p><strong>Estimated Distance:</strong> ${summary.distanceKm.toFixed(1)} km</p>` : ""}
          ${summary.flightNumber ? `<p><strong>Flight Number:</strong> ${sanitize(summary.flightNumber)}</p>` : ""}
          ${summary.airline ? `<p><strong>Airline:</strong> ${sanitize(summary.airline)}</p>` : ""}
          ${summary.handLuggage ? `<p><strong>Hand Luggage:</strong> ${sanitize(summary.handLuggage)}</p>` : ""}
          ${summary.largeLuggage ? `<p><strong>Large Luggage:</strong> ${sanitize(summary.largeLuggage)}</p>` : ""}
          ${summary.selectedTourName ? `<p><strong>Tour:</strong> ${sanitize(summary.selectedTourName)}</p>` : ""}
          <p><strong>Baby Seat:</strong> ${formatBoolean(Boolean(summary.needsBabySeat))}${summary.needsBabySeat ? ` (${summary.babySeatCount || 1})` : ""}</p>

          ${bookingType === "tour" ? `<h2>Add-ons</h2><ul>${addOns}</ul>` : ""}

          <h2>Special Requests</h2>
          <p>${summary.specialRequests ? sanitize(summary.specialRequests).replace(/\n/g, "<br/>") : "None provided."}</p>
        </div>
      `;

      const customerHtml = `
        <div style="font-family:Arial,sans-serif;color:#1a1a1a;line-height:1.6;background:#f7f4ef;padding:32px 16px;">
          <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e7dccb;border-radius:12px;overflow:hidden;">
            <div style="background:#111111;padding:28px 32px;">
              <div style="color:#f7d9a5;text-transform:uppercase;letter-spacing:3px;font-size:12px;font-weight:600;">Chevalier Lane</div>
              <div style="color:#ffffff;font-size:28px;font-weight:600;margin-top:8px;">Thank you for your inquiry</div>
            </div>
            <div style="padding:28px 32px;">
              <p>Hello ${sanitize(customer.firstName) || "there"},</p>
              <p>We have received your ${sanitize(title).toLowerCase()} request and our concierge team is preparing your personalized quote.</p>
              <p><strong>Vehicle:</strong> ${sanitize(summary.vehicleName)}<br />
              <strong>Journey:</strong> ${sanitize(summary.pickupLocation)} to ${sanitize(summary.dropoffLocation)}</p>
              <p>Please check your email for your personalized quote. You will also receive a WhatsApp message shortly with your secure invoice to complete payment.</p>
              <p style="margin-top:24px;color:#6b7280;">If you need immediate assistance, reply to this email or contact us at +351.</p>
            </div>
          </div>
        </div>
      `;

      const [ownerResponse, customerResponse] = await Promise.all([
        resend.emails.send({
          from: "Chevalier Lane <no-reply@updates.chevalierlane.com>",
          to: ["info@chevalierlane.com"],
          subject: `${title} Inquiry - ${fullName || "New Inquiry"}`,
          html: internalHtml,
        }),
        resend.emails.send({
          from: "Chevalier Lane <no-reply@updates.chevalierlane.com>",
          to: [customer.email],
          subject: "We received your Chevalier Lane inquiry",
          html: customerHtml,
        }),
      ]);

      const error = ownerResponse.error || customerResponse.error;
      if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }

      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (error) {
      console.error("Booking inquiry submission failed:", error);
      return new Response(
        JSON.stringify({ error: "Unable to process inquiry at this time." }),
        { status: 500 },
      );
    }
  },
});
