import { createServerFileRoute } from "@tanstack/react-start/server";
import type Stripe from "stripe";
import { getResendClient } from "@/lib/resend";
import { getStripeClient } from "@/lib/stripe";

const stripe = getStripeClient();
const owners = ["info@chevalierlane.com"];

export const ServerRoute = createServerFileRoute(
  "/api/payments/status",
).methods({
  GET: async ({ request }) => {
    const url = new URL(request.url);
    const rawSessionId = url.searchParams.get("session_id");
    const sessionId = rawSessionId?.replace(/^['"]+|['"]+$/g, "");

    if (!sessionId) {
      return new Response(JSON.stringify({ error: "session_id is required" }), {
        status: 400,
      });
    }

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      // Fire-and-forget confirmation emails once payment is complete
      void sendConfirmationEmailsOnce(session).catch((error) => {
        console.error("post-payment email send failed", error);
      });

      return new Response(
        JSON.stringify({
          id: session.id,
          status: session.status,
          payment_status: session.payment_status,
          amount_total: session.amount_total,
          currency: session.currency,
          metadata: session.metadata,
        }),
        { status: 200 },
      );
    } catch (error) {
      console.error("Stripe status lookup failed", error);
      return new Response(
        JSON.stringify({ error: "Unable to locate that session" }),
        { status: 404 },
      );
    }
  },
});

function escapeHtml(value: string | null | undefined) {
  if (!value) return "";
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatAmount(amount: number | null, currency: string | null) {
  if (!amount || !currency) return "N/A";
  return `${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`;
}

function bookingLabel(metadata: Record<string, string> | null | undefined) {
  const type = metadata?.booking_type;
  if (type === "wedding") return "Wedding";
  if (type === "tour") return "Tour";
  if (type === "one-way") return "One-way transfer";
  if (type === "airport") return "Airport transfer";
  if (type === "corporate") return "Corporate service";
  return "Booking";
}

function bookingDetails(metadata: Record<string, string> | null | undefined) {
  if (!metadata) return [];

  const details: string[] = [];
  if (metadata.contact_name) {
    details.push(`Guest: ${metadata.contact_name}`);
  }
  if (metadata.contact_phone) {
    details.push(`Phone: ${metadata.contact_phone}`);
  }

  switch (metadata.booking_type) {
    case "wedding": {
      if (metadata.service_type) {
        details.push(
          `Service: ${
            metadata.service_type === "main" ? "Main Fleet" : "Guest Transport"
          }`,
        );
      }
      if (metadata.event_date) {
        details.push(`Event date: ${metadata.event_date}`);
      }
      if (metadata.event_time) {
        details.push(`Event time: ${metadata.event_time}`);
      }
      if (metadata.start_location || metadata.end_location) {
        details.push(
          `Route: ${metadata.start_location || "TBD"} → ${metadata.end_location || "TBD"}`,
        );
      }
      break;
    }
    case "tour": {
      if (metadata.tour_name) {
        details.push(`Tour: ${metadata.tour_name}`);
      }
      if (metadata.participants) {
        details.push(`Participants: ${metadata.participants}`);
      }
      if (metadata.start_location) {
        details.push(`Pickup: ${metadata.start_location}`);
      }
      break;
    }
    case "one-way": {
      if (metadata.start_location || metadata.end_location) {
        details.push(
          `Route: ${metadata.start_location || "TBD"} → ${metadata.end_location || "TBD"}`,
        );
      }
      if (metadata.passengers) {
        details.push(`Passengers: ${metadata.passengers}`);
      }
      if (metadata.distance_km) {
        details.push(`Distance: ${metadata.distance_km} km`);
      }
      if (metadata.special_requests) {
        details.push(`Special requests: ${metadata.special_requests}`);
      }
      break;
    }
    case "airport": {
      if (metadata.pickup_location || metadata.dropoff_location) {
        details.push(
          `Route: ${metadata.pickup_location || "TBD"} → ${metadata.dropoff_location || "TBD"}`,
        );
      }
      if (metadata.passengers) {
        details.push(`Passengers: ${metadata.passengers}`);
      }
      if (metadata.distance_km) {
        details.push(`Distance: ${metadata.distance_km} km`);
      }
      if (metadata.flight_number || metadata.airline) {
        details.push(
          `Flight: ${metadata.flight_number || "TBD"} ${metadata.airline || ""}`.trim(),
        );
      }
      if (metadata.hand_luggage || metadata.large_luggage) {
        details.push(
          `Luggage: ${metadata.hand_luggage || "0"} hand / ${metadata.large_luggage || "0"} large`,
        );
      }
      if (metadata.extra_vehicle) {
        details.push(
          `Extra vehicle: ${metadata.extra_vehicle === "true" ? "Yes" : "No"}`,
        );
      }
      if (metadata.special_requests) {
        details.push(`Special requests: ${metadata.special_requests}`);
      }
      break;
    }
    case "corporate": {
      if (metadata.start_location) {
        details.push(`Start location: ${metadata.start_location}`);
      }
      if (metadata.duration_minutes) {
        details.push(`Duration: ${metadata.duration_minutes} minutes`);
      }
      if (metadata.passengers) {
        details.push(`Passengers: ${metadata.passengers}`);
      }
      if (metadata.special_requests) {
        details.push(`Special requests: ${metadata.special_requests}`);
      }
      break;
    }
    default:
      break;
  }

  return details;
}

function buildCustomerHtml(session: Stripe.Checkout.Session) {
  const metadata = session.metadata || {};
  const contactName =
    metadata.contact_name ||
    session.customer_details?.name ||
    session.customer_email ||
    "Guest";
  const amount = formatAmount(session.amount_total, session.currency);
  const details = bookingDetails(metadata)
    .map((line) => `<li>${escapeHtml(line)}</li>`)
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; color: #1a1a1a;">
      <h1 style="color: #b08d57;">Payment received</h1>
      <p>Thank you, ${escapeHtml(contactName)}. Your ${escapeHtml(bookingLabel(metadata))} is confirmed.</p>
      <p><strong>Amount paid:</strong> ${escapeHtml(amount)}</p>
      ${
        details
          ? `<h2 style="color:#333;margin-top:20px;">Booking details</h2><ul>${details}</ul>`
          : ""
      }
      <p style="margin-top:20px;">Reference: ${escapeHtml(session.id)}</p>
    </div>
  `;
}

function buildOwnerHtml(
  session: Stripe.Checkout.Session,
  customerEmail: string | null,
) {
  const metadata = session.metadata || {};
  const details = bookingDetails(metadata)
    .map((line) => `<li>${escapeHtml(line)}</li>`)
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; color: #1a1a1a;">
      <h1 style="color: #b08d57;">Paid booking received</h1>
      <p>${escapeHtml(bookingLabel(metadata))} has been paid.</p>
      <p><strong>Amount paid:</strong> ${escapeHtml(formatAmount(session.amount_total, session.currency))}</p>
      <p><strong>Stripe session:</strong> ${escapeHtml(session.id)}</p>
      ${customerEmail ? `<p><strong>Customer email:</strong> ${escapeHtml(customerEmail)}</p>` : ""}
      ${
        details
          ? `<h2 style="color:#333;margin-top:20px;">Details</h2><ul>${details}</ul>`
          : ""
      }
    </div>
  `;
}

async function sendConfirmationEmailsOnce(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") return;
  const resend = getResendClient();
  if (!resend) return;

  const alreadySent =
    session.metadata?.confirmation_email_sent === "true" ||
    session.metadata?.confirmation_email_sent === "1";
  if (alreadySent) return;

  const customerEmail =
    session.customer_details?.email || session.customer_email || null;
  if (!customerEmail && owners.length === 0) {
    return;
  }

  const customerHtml = customerEmail ? buildCustomerHtml(session) : null;
  const ownerHtml = buildOwnerHtml(session, customerEmail);
  const subject = "Your Chevalier Lane booking is confirmed";
  const ownerSubject = `Paid booking – ${bookingLabel(session.metadata)}`;

  const sends: Promise<unknown>[] = [];
  if (customerEmail && customerHtml) {
    sends.push(
      resend.emails.send({
        from: "Chevalier Lane <onboarding@resend.dev>",
        to: [customerEmail],
        subject,
        html: customerHtml,
      }),
    );
  }

  if (owners.length > 0) {
    sends.push(
      resend.emails.send({
        from: "Chevalier Lane <onboarding@resend.dev>",
        to: owners,
        subject: ownerSubject,
        html: ownerHtml,
      }),
    );
  }

  try {
    await Promise.all(sends);
    await stripe.checkout.sessions.update(session.id, {
      metadata: {
        ...session.metadata,
        confirmation_email_sent: "true",
      },
    });
  } catch (error) {
    console.error("Unable to mark/send confirmation email", error);
  }
}
