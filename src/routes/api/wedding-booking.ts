import { createServerFileRoute } from "@tanstack/react-start/server";
import { getResendClient } from "@/lib/resend";

const formatCurrency = (value: number | null | undefined) => {
  if (value === null || value === undefined) return "N/A";
  try {
    return new Intl.NumberFormat("en-IE", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  } catch (error) {
    console.error("Currency formatting failed", error);
    return `€${value.toFixed(2)}`;
  }
};

const formatServiceDetails = (
  serviceType: "main" | "transport",
  details: { durationHours?: string; numberOfTrips?: string },
) => {
  if (serviceType === "main") {
    const duration = sanitize(details.durationHours || "") || "N/A";
    return `<p><strong>Duration:</strong> ${duration} hours</p>`;
  }

  const trips = sanitize(details.numberOfTrips || "") || "N/A";
  return `<p><strong>Number of Trips:</strong> ${trips}</p>`;
};

const sanitize = (value: string | undefined) => {
  if (!value) return "";
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

export const ServerRoute = createServerFileRoute(
  "/api/wedding-booking",
).methods({
  POST: async ({ request }) => {
    try {
      const body = await request.json();
      const resend = getResendClient();
      if (!resend) {
        return new Response(
          JSON.stringify({ error: "Resend API key missing" }),
          { status: 500 },
        );
      }

      const {
        firstName,
        lastName,
        email,
        phone,
        serviceType,
        selectedVehicle,
        selectedVehicleName,
        durationHours,
        numberOfTrips,
        startLocation,
        endLocation,
        eventDate,
        eventTime,
        specialRequests,
        decorationOption,
        decorationOptionName,
        decorationPrice,
        calculatedPrice,
      } = body;

      const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();
      const vehicleLabel =
        selectedVehicleName || selectedVehicle || "Not specified";
      const decorationLabel =
        decorationOptionName || decorationOption || "None";
      const formattedDecorationPrice = decorationPrice
        ? `€${decorationPrice}`
        : "N/A";
      const formattedTotalPrice = formatCurrency(
        typeof calculatedPrice === "number" ? calculatedPrice : null,
      );
      const serviceLabel =
        serviceType === "transport" ? "Guest Transport" : "Main Wedding Fleet";

      const html = `
        <div style="font-family: Arial, sans-serif; color: #1a1a1a;">
          <h1 style="color: #b08d57;">New Wedding Booking Request</h1>
          <p>You have received a new wedding booking request via the Chevalier Lane website.</p>
          <h2 style="color: #333;">Client Details</h2>
          <p><strong>Name:</strong> ${sanitize(fullName) || "N/A"}</p>
          <p><strong>Email:</strong> ${sanitize(email) || "N/A"}</p>
          <p><strong>Phone:</strong> ${sanitize(phone) || "N/A"}</p>

          <h2 style="color: #333;">Event Details</h2>
          <p><strong>Service Type:</strong> ${serviceLabel}</p>
          <p><strong>Selected Vehicle:</strong> ${sanitize(vehicleLabel)}</p>
          ${formatServiceDetails(serviceType, { durationHours, numberOfTrips })}
          <p><strong>Wedding Date:</strong> ${sanitize(eventDate) || "N/A"}</p>
          <p><strong>Event Time:</strong> ${sanitize(eventTime) || "N/A"}</p>
          <p><strong>Starting Location:</strong> ${sanitize(startLocation) || "N/A"}</p>
          <p><strong>Final Location:</strong> ${sanitize(endLocation) || "N/A"}</p>

          <h2 style="color: #333;">Decoration</h2>
          <p><strong>Option:</strong> ${sanitize(decorationLabel)}</p>
          <p><strong>Estimated Decoration Price:</strong> ${sanitize(formattedDecorationPrice)}</p>

          <h2 style="color: #333;">Pricing</h2>
          <p><strong>Calculated Total (incl. VAT):</strong> ${sanitize(formattedTotalPrice)}</p>

          <h2 style="color: #333;">Special Requests</h2>
          <p>${specialRequests ? sanitize(specialRequests).replace(/\n/g, "<br/>") : "None provided."}</p>
        </div>
      `;

      const { error } = await resend.emails.send({
        from: "Chevalier Lane <onboarding@resend.dev>",
        to: ["info@chevalierlane.com"],
        subject: `Wedding Booking – ${fullName || "New Inquiry"}`,
        html,
      });

      if (error) {
        console.error("Resend email error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
        });
      }

      return new Response(
        JSON.stringify({ message: "Wedding booking submitted successfully" }),
        { status: 200 },
      );
    } catch (error) {
      console.error("Wedding booking submission failed:", error);
      return new Response(
        JSON.stringify({ error: "Unable to process booking at this time." }),
        { status: 500 },
      );
    }
  },
});
