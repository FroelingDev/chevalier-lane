import { createServerFileRoute } from "@tanstack/react-start/server";
import { getResendClient } from "@/lib/resend";

const sanitize = (value: string | undefined) => {
  if (!value) return "";
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

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

export const ServerRoute = createServerFileRoute("/api/tour-booking").methods({
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
        selectedTour,
        selectedTourName,
        participants,
        addOnDetails,
        specialRequests,
        totalPrice,
        selectedVehicle,
        vehicleName,
        vehicleCategory,
        vehicleMinPrice,
        vehiclePriceDescription,
        calculatedDistanceKm,
        startLocation,
        needsBabySeat,
        babySeatCount,
      } = body;

      const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();
      const tourLabel = selectedTourName || selectedTour || "Not specified";
      const vehicleLabel = vehicleName || selectedVehicle || "Not specified";
      const formattedTotalPrice = formatCurrency(
        typeof totalPrice === "number" ? totalPrice : null,
      );
      const formattedVehiclePrice = formatCurrency(
        typeof vehicleMinPrice === "number" ? vehicleMinPrice : null,
      );
      const distanceLabel = calculatedDistanceKm
        ? `${calculatedDistanceKm.toFixed(1)} km`
        : "N/A";
      const addOnsList = (addOnDetails as string[] | undefined)?.filter(
        Boolean,
      );
      const addOnsHtml =
        addOnsList && addOnsList.length > 0
          ? addOnsList.map((addOn) => `<li>${sanitize(addOn)}</li>`).join("")
          : "<li>None selected</li>";

      const html = `
        <div style="font-family: Arial, sans-serif; color: #1a1a1a;">
          <h1 style="color: #b08d57;">New Tour Booking Request</h1>
          <p>You have received a new tour booking request via the Chevalier Lane website.</p>

          <h2 style="color: #333;">Client Details</h2>
          <p><strong>Name:</strong> ${sanitize(fullName) || "N/A"}</p>
          <p><strong>Email:</strong> ${sanitize(email) || "N/A"}</p>
          <p><strong>Phone:</strong> ${sanitize(phone) || "N/A"}</p>
          <p><strong>Starting Location:</strong> ${sanitize(startLocation) || "N/A"}</p>

          <h2 style="color: #333;">Tour Details</h2>
          <p><strong>Selected Tour:</strong> ${sanitize(tourLabel)}</p>
          <p><strong>Participants:</strong> ${sanitize(String(participants ?? "N/A"))}</p>
          <p><strong>Vehicle:</strong> ${sanitize(vehicleLabel)}</p>
          <p><strong>Vehicle Category:</strong> ${sanitize(vehicleCategory || "") || "N/A"}</p>
          <p><strong>Vehicle Pricing:</strong> ${vehiclePriceDescription ? sanitize(vehiclePriceDescription) : formattedVehiclePrice}</p>
          <p><strong>Estimated Distance:</strong> ${sanitize(distanceLabel)}</p>
          <p><strong>Baby Seat:</strong> ${needsBabySeat ? `Yes (${sanitize(String(babySeatCount || 1))})` : "No"}</p>

          <h2 style="color: #333;">Add-ons</h2>
          <ul>${addOnsHtml}</ul>

          <h2 style="color: #333;">Pricing</h2>
          <p><strong>Total Estimated Price:</strong> ${sanitize(formattedTotalPrice)}</p>

          <h2 style="color: #333;">Special Requests</h2>
          <p>${specialRequests ? sanitize(specialRequests).replace(/\n/g, "<br/>") : "None provided."}</p>
        </div>
      `;

      const { error } = await resend.emails.send({
        from: "Chevalier Lane <no-reply@updates.chevalierlane.com>",
        to: ["info@chevalierlane.com"],
        subject: `Tour Booking – ${fullName || "New Inquiry"}`,
        html,
      });

      if (error) {
        console.error("Resend email error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
        });
      }

      return new Response(
        JSON.stringify({ message: "Tour booking submitted successfully" }),
        { status: 200 },
      );
    } catch (error) {
      console.error("Tour booking submission failed:", error);
      return new Response(
        JSON.stringify({ error: "Unable to process booking at this time." }),
        { status: 500 },
      );
    }
  },
});
