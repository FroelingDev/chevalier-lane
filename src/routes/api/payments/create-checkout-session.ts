import { createServerFileRoute } from "@tanstack/react-start/server";
import { getCalEventConfig } from "@/lib/cal-event-map";
import {
  calculateWeddingPrice,
  weddingVehicles,
  decorationOptions,
  type WeddingServiceType,
} from "@/lib/pricing/wedding";
import {
  calculateTourPrice,
  tourOptions,
  TOUR_DESTINATIONS,
} from "@/lib/pricing/tour";
import { oneWayCarOptions } from "@/lib/pricing/one-way-cars";
import { getResendClient } from "@/lib/resend";
import { getStripeClient } from "@/lib/stripe";

const owners = ["info@chevalierlane.com"];

const stripe = getStripeClient();

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(
    value
  );

interface BasePayload {
  bookingType: "wedding" | "tour" | "one-way";
  calEventSlug: string;
  calEventId?: string;
  calStartTime?: string;
  calEndTime?: string;
  calInvitee?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

interface WeddingPayload extends BasePayload {
  bookingType: "wedding";
  wedding: {
    serviceType: WeddingServiceType;
    selectedVehicleId: string;
    durationHours: number;
    numberOfTrips: number;
    decorationPrice?: number;
    decorationOptionName?: string | null;
    startLocation: string;
    endLocation: string;
    eventDate: string;
    eventTime: string;
    specialRequests?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

interface TourPayload extends BasePayload {
  bookingType: "tour";
  tour: {
    selectedTourId: string;
    participants: number;
    selectedAddOns: string[];
    startLocation: string;
    specialRequests?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    selectedVehicleId: string;
    distanceKm?: number | null;
  };
}

interface OneWayPayload extends BasePayload {
  bookingType: "one-way";
  oneWay: {
    selectedVehicleId: string;
    startLocation: string;
    endLocation: string;
    passengers: number;
    specialRequests?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    distanceKm?: number | null;
  };
}

type RequestBody = WeddingPayload | TourPayload | OneWayPayload;

const successQueryKey = "session_id";

const ONE_WAY_PRICE_MARKUP_MULTIPLIER = 1.06;

function buildUrl(
  origin: string,
  path: string,
  params: Record<string, string | undefined>
) {
  const url = new URL(path, origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });
  const encodedPlaceholder = encodeURIComponent("{CHECKOUT_SESSION_ID}");
  return url.toString().replace(encodedPlaceholder, "{CHECKOUT_SESSION_ID}");
}

async function sendEmail(to: string[], subject: string, html: string) {
  const resendClient = getResendClient();
  if (!resendClient) {
    console.warn("Resend API key missing; skipping email send for", subject);
    return;
  }

  try {
    await resendClient.emails.send({
      from: "Chevalier Lane <onboarding@resend.dev>",
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Resend email error", error);
  }
}

function buildWeddingEmailHtml({
  heading,
  intro,
  sessionUrl,
  summary,
  contact,
}: {
  heading: string;
  intro: string;
  sessionUrl: string;
  summary: {
    vehicleName: string;
    serviceType: string;
    eventDate: string;
    eventTime: string;
    startLocation: string;
    endLocation: string;
    decoration: string;
    total: string;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}) {
  return `
    <div style="font-family: Arial, sans-serif; color: #1a1a1a;">
      <h1 style="color: #b08d57;">${heading}</h1>
      <p>${intro}</p>
      <p>
        <a href="${sessionUrl}" style="display:inline-block;padding:12px 24px;background:#b08d57;color:#fff;border-radius:4px;text-decoration:none;font-weight:bold;">
          Complete Payment
        </a>
      </p>
      <h2 style="color:#333;margin-top:32px;">Booking Details</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tbody>
          <tr>
            <td style="padding:6px 0;font-weight:bold;">Vehicle</td>
            <td style="padding:6px 0;">${summary.vehicleName} (${summary.serviceType})</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-weight:bold;">When</td>
            <td style="padding:6px 0;">${summary.eventDate} at ${summary.eventTime}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-weight:bold;">Route</td>
            <td style="padding:6px 0;">${summary.startLocation} → ${summary.endLocation}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-weight:bold;">Decoration</td>
            <td style="padding:6px 0;">${summary.decoration}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-weight:bold;">Total</td>
            <td style="padding:6px 0;">${summary.total}</td>
          </tr>
        </tbody>
      </table>
      <h2 style="color:#333;margin-top:24px;">Contact</h2>
      <p>
        ${contact.name}<br/>
        ${contact.email}<br/>
        ${contact.phone}
      </p>
    </div>
  `;
}

function buildTourEmailHtml({
  heading,
  intro,
  sessionUrl,
  summary,
  contact,
}: {
  heading: string;
  intro: string;
  sessionUrl: string;
  summary: {
    tourName: string;
    location: string;
    participants: number;
    vehicleName: string;
    pickup: string;
    destination: string;
    addOns: string[];
    total: string;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}) {
  const addOnHtml =
    summary.addOns.length > 0
      ? summary.addOns
          .map((item) => `<li style="margin-bottom:4px;">${item}</li>`)
          .join("")
      : "<li>None selected</li>";

  return `
    <div style="font-family: Arial, sans-serif; color: #1a1a1a;">
      <h1 style="color: #b08d57;">${heading}</h1>
      <p>${intro}</p>
      <p>
        <a href="${sessionUrl}" style="display:inline-block;padding:12px 24px;background:#b08d57;color:#fff;border-radius:4px;text-decoration:none;font-weight:bold;">
          Complete Payment
        </a>
      </p>
      <h2 style="color:#333;margin-top:32px;">Tour Details</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tbody>
          <tr>
            <td style="padding:6px 0;font-weight:bold;">Experience</td>
            <td style="padding:6px 0;">${summary.tourName}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-weight:bold;">Location</td>
            <td style="padding:6px 0;">${summary.location}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-weight:bold;">Participants</td>
            <td style="padding:6px 0;">${summary.participants}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-weight:bold;">Vehicle</td>
            <td style="padding:6px 0;">${summary.vehicleName}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-weight:bold;">Pickup</td>
            <td style="padding:6px 0;">${summary.pickup}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-weight:bold;">Destination</td>
            <td style="padding:6px 0;">${summary.destination}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-weight:bold;">Total</td>
            <td style="padding:6px 0;">${summary.total}</td>
          </tr>
        </tbody>
      </table>
      <h2 style="color:#333;margin-top:24px;">Selected Add-ons</h2>
      <ul style="padding-left:18px;">${addOnHtml}</ul>
      <h2 style="color:#333;margin-top:24px;">Contact</h2>
      <p>
        ${contact.name}<br/>
        ${contact.email}<br/>
        ${contact.phone}
      </p>
    </div>
  `;
}

function buildOneWayEmailHtml({
  heading,
  intro,
  sessionUrl,
  summary,
  contact,
}: {
  heading: string;
  intro: string;
  sessionUrl: string;
  summary: {
    vehicleName: string;
    startLocation: string;
    endLocation: string;
    passengers: string;
    distance: string;
    total: string;
    specialRequests?: string;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}) {
  return `
    <div style="font-family: Arial, sans-serif; color: #1a1a1a;">
      <h1 style="color: #b08d57;">${heading}</h1>
      <p>${intro}</p>
      <p>
        <a href="${sessionUrl}" style="display:inline-block;padding:12px 24px;background:#b08d57;color:#fff;border-radius:4px;text-decoration:none;font-weight:bold;">
          Complete Payment
        </a>
      </p>
      <h2 style="color:#333;margin-top:32px;">Transfer Details</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tbody>
          <tr>
            <td style="padding:6px 0;font-weight:bold;">Vehicle</td>
            <td style="padding:6px 0;">${summary.vehicleName}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-weight:bold;">Route</td>
            <td style="padding:6px 0;">${summary.startLocation} → ${summary.endLocation}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-weight:bold;">Passengers</td>
            <td style="padding:6px 0;">${summary.passengers}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-weight:bold;">Distance</td>
            <td style="padding:6px 0;">${summary.distance}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-weight:bold;">Total</td>
            <td style="padding:6px 0;">${summary.total}</td>
          </tr>
          ${summary.specialRequests ? `<tr><td style="padding:6px 0;font-weight:bold;">Special Requests</td><td style="padding:6px 0;">${summary.specialRequests}</td></tr>` : ""}
        </tbody>
      </table>
      <h2 style="color:#333;margin-top:24px;">Contact</h2>
      <p>
        ${contact.name}<br/>
        ${contact.email}<br/>
        ${contact.phone}
      </p>
    </div>
  `;
}

function calculateOneWayQuote(
  distanceKm: number,
  minPrice: number,
  pricePerKm?: number
) {
  const roundToCents = (value: number) => Math.round(value * 100) / 100;

  if (distanceKm <= 25) {
    return roundToCents(minPrice * ONE_WAY_PRICE_MARKUP_MULTIPLIER);
  }

  if (pricePerKm) {
    const base = minPrice + (distanceKm - 25) * pricePerKm;
    return roundToCents(base * ONE_WAY_PRICE_MARKUP_MULTIPLIER);
  }

  return null;
}

async function handleWeddingPayload(body: WeddingPayload, origin: string) {
  const config = getCalEventConfig(body.calEventSlug);
  if (!config || config.kind !== "wedding") {
    return new Response(JSON.stringify({ error: "Unknown Cal event" }), {
      status: 400,
    });
  }

  const payload = body.wedding;
  const vehicle = weddingVehicles.find(
    (v) => v.id === payload.selectedVehicleId
  );
  if (!vehicle) {
    return new Response(JSON.stringify({ error: "Unknown vehicle" }), {
      status: 400,
    });
  }

  if (vehicle.category !== payload.serviceType) {
    return new Response(
      JSON.stringify({ error: "Vehicle does not match service type" }),
      {
        status: 400,
      }
    );
  }

  const decorationPrice = Number(payload.decorationPrice) || 0;
  const durationHours = Number(payload.durationHours) || 0;
  const numberOfTrips = Number(payload.numberOfTrips) || 0;

  const pricing = calculateWeddingPrice({
    vehicle,
    serviceType: payload.serviceType,
    durationHours,
    numberOfTrips,
    decorationPrice,
  });

  const amountInCents = Math.round(pricing.total * 100);
  if (Number.isNaN(amountInCents) || amountInCents <= 0) {
    return new Response(
      JSON.stringify({ error: "Unable to calculate a valid payment amount" }),
      { status: 400 }
    );
  }

  const successUrl = buildUrl(origin, config.successPath, {
    [successQueryKey]: "{CHECKOUT_SESSION_ID}",
    bookingType: "wedding",
    calEventId: body.calEventId,
  });
  const cancelUrl = buildUrl(origin, config.cancelPath, {});

  const customerEmail = payload.email || body.calInvitee?.email;
  if (!customerEmail) {
    return new Response(JSON.stringify({ error: "Guest email is required" }), {
      status: 400,
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: customerEmail,
    payment_intent_data: {
      receipt_email: customerEmail,
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: amountInCents,
          product_data: {
            name: config.stripeDescription,
          },
        },
      },
    ],
    metadata: {
      booking_type: "wedding",
      cal_event_slug: body.calEventSlug,
      cal_event_id: body.calEventId || "",
      service_type: payload.serviceType,
      vehicle_id: vehicle.id,
      event_date: payload.eventDate ?? "",
      event_time: payload.eventTime ?? "",
      start_location: payload.startLocation ?? "",
      end_location: payload.endLocation ?? "",
      contact_name: `${payload.firstName} ${payload.lastName}`.trim(),
      contact_phone: payload.phone ?? "",
    },
  });

  const totalFormatted = formatCurrency(pricing.total);
  const decorationLabel =
    payload.decorationOptionName ||
    decorationOptions.find((d) => d.minPrice === decorationPrice)?.name ||
    "Custom";

  const emailSummary = {
    vehicleName: vehicle.name,
    serviceType:
      payload.serviceType === "main" ? "Main Fleet" : "Guest Transport",
    eventDate: payload.eventDate || "TBD",
    eventTime: payload.eventTime || "TBD",
    startLocation: payload.startLocation || "TBD",
    endLocation: payload.endLocation || "TBD",
    decoration: decorationLabel,
    total: totalFormatted,
  };

  const contact = {
    name: `${payload.firstName} ${payload.lastName}`.trim(),
    email: customerEmail,
    phone: payload.phone,
  };

  if (session.url) {
    await Promise.all([
      sendEmail(
        [customerEmail],
        "Complete your Chevalier Lane reservation",
        buildWeddingEmailHtml({
          heading: "Confirm your booking",
          intro:
            "Your event is scheduled. Complete the secure payment below to finalize your reservation.",
          sessionUrl: session.url,
          summary: emailSummary,
          contact,
        })
      ),
      sendEmail(
        owners,
        `New wedding booking ready for payment – ${contact.name || "Guest"}`,
        buildWeddingEmailHtml({
          heading: "New Wedding Booking",
          intro:
            "A guest has completed the Cal.com scheduling flow. The Stripe Checkout link below lets you monitor or resend the payment.",
          sessionUrl: session.url,
          summary: emailSummary,
          contact,
        })
      ),
    ]);
  }

  return new Response(
    JSON.stringify({
      sessionId: session.id,
      sessionUrl: session.url,
      amount: pricing.total,
      currency: pricing.currency,
    }),
    { status: 200 }
  );
}

async function handleTourPayload(body: TourPayload, origin: string) {
  const config = getCalEventConfig(body.calEventSlug);
  if (!config || config.kind !== "tour") {
    return new Response(JSON.stringify({ error: "Unknown Cal event" }), {
      status: 400,
    });
  }

  const payload = body.tour;
  const tour = tourOptions.find((t) => t.id === payload.selectedTourId);
  if (!tour) {
    return new Response(JSON.stringify({ error: "Unknown tour option" }), {
      status: 400,
    });
  }

  const vehicle = oneWayCarOptions.find(
    (v) => v.id === payload.selectedVehicleId
  );
  if (!vehicle) {
    return new Response(JSON.stringify({ error: "Unknown vehicle" }), {
      status: 400,
    });
  }

  const pricing = calculateTourPrice({
    tourOption: tour,
    participants: payload.participants,
    selectedAddOnIds: payload.selectedAddOns,
    vehicle: {
      minPrice: vehicle.minPrice,
      pricePerKm: vehicle.pricePerKm,
    },
    distanceKm: payload.distanceKm ?? null,
  });

  const amountInCents = Math.round(pricing.total * 100);
  if (Number.isNaN(amountInCents) || amountInCents <= 0) {
    return new Response(
      JSON.stringify({ error: "Unable to calculate a valid payment amount" }),
      { status: 400 }
    );
  }

  const successUrl = buildUrl(origin, config.successPath, {
    [successQueryKey]: "{CHECKOUT_SESSION_ID}",
    bookingType: "tour",
    calEventId: body.calEventId,
  });
  const cancelUrl = buildUrl(origin, config.cancelPath, {});

  const customerEmail = payload.email || body.calInvitee?.email;
  if (!customerEmail) {
    return new Response(JSON.stringify({ error: "Guest email is required" }), {
      status: 400,
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: customerEmail,
    payment_intent_data: {
      receipt_email: customerEmail,
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: amountInCents,
          product_data: {
            name: config.stripeDescription,
          },
        },
      },
    ],
    metadata: {
      booking_type: "tour",
      cal_event_slug: body.calEventSlug,
      cal_event_id: body.calEventId || "",
      tour_id: tour.id,
      tour_name: tour.name,
      participants: String(payload.participants),
      vehicle_id: vehicle.id,
      start_location: payload.startLocation ?? "",
      contact_name: `${payload.firstName} ${payload.lastName}`.trim(),
      contact_phone: payload.phone ?? "",
    },
  });

  const destinationLabel =
    TOUR_DESTINATIONS[tour.category]?.name || tour.location;
  const addOnNames = payload.selectedAddOns
    .map((id) => tour.addOns?.find((addOn) => addOn.id === id)?.name)
    .filter((name): name is string => Boolean(name));
  const emailSummary = {
    tourName: tour.name,
    location: tour.location,
    participants: payload.participants,
    vehicleName: vehicle.name,
    pickup: payload.startLocation || "TBD",
    destination: destinationLabel,
    addOns: addOnNames,
    total: formatCurrency(pricing.total),
  };

  const contact = {
    name: `${payload.firstName} ${payload.lastName}`.trim(),
    email: customerEmail,
    phone: payload.phone,
  };

  if (session.url) {
    await Promise.all([
      sendEmail(
        [customerEmail],
        "Complete your Chevalier Lane reservation",
        buildTourEmailHtml({
          heading: "Confirm your booking",
          intro:
            "Your tour has been scheduled. Complete the secure payment below to finalize your reservation.",
          sessionUrl: session.url,
          summary: emailSummary,
          contact,
        })
      ),
      sendEmail(
        owners,
        `New tour booking ready for payment – ${contact.name || "Guest"}`,
        buildTourEmailHtml({
          heading: "New Tour Booking",
          intro:
            "A guest completed the Cal.com flow for a tour booking. Use the link below to monitor or resend the payment.",
          sessionUrl: session.url,
          summary: emailSummary,
          contact,
        })
      ),
    ]);
  }

  return new Response(
    JSON.stringify({
      sessionId: session.id,
      sessionUrl: session.url,
      amount: pricing.total,
      currency: pricing.currency,
    }),
    { status: 200 }
  );
}

async function handleOneWayPayload(body: OneWayPayload, origin: string) {
  const config = getCalEventConfig(body.calEventSlug);
  if (!config || config.kind !== "one-way") {
    return new Response(JSON.stringify({ error: "Unknown Cal event" }), {
      status: 400,
    });
  }

  const payload = body.oneWay;
  const vehicle = oneWayCarOptions.find(
    (v) => v.id === payload.selectedVehicleId
  );
  if (!vehicle) {
    return new Response(JSON.stringify({ error: "Unknown vehicle" }), {
      status: 400,
    });
  }

  const distanceKm =
    typeof payload.distanceKm === "number" && !Number.isNaN(payload.distanceKm)
      ? payload.distanceKm
      : null;
  if (!distanceKm || distanceKm <= 0) {
    return new Response(
      JSON.stringify({ error: "Distance is required to calculate pricing" }),
      { status: 400 }
    );
  }

  const calculatedPrice = calculateOneWayQuote(
    distanceKm,
    vehicle.minPrice,
    vehicle.pricePerKm
  );
  if (!calculatedPrice || calculatedPrice <= 0) {
    return new Response(
      JSON.stringify({ error: "Unable to calculate a valid payment amount" }),
      { status: 400 }
    );
  }

  const amountInCents = Math.round(calculatedPrice * 100);
  if (Number.isNaN(amountInCents) || amountInCents <= 0) {
    return new Response(
      JSON.stringify({ error: "Unable to calculate a valid payment amount" }),
      { status: 400 }
    );
  }

  const successUrl = buildUrl(origin, config.successPath, {
    [successQueryKey]: "{CHECKOUT_SESSION_ID}",
    bookingType: "one-way",
    calEventId: body.calEventId,
  });
  const cancelUrl = buildUrl(origin, config.cancelPath, {});

  const customerEmail = payload.email || body.calInvitee?.email;
  if (!customerEmail) {
    return new Response(JSON.stringify({ error: "Guest email is required" }), {
      status: 400,
    });
  }

  const passengerCount = Number(payload.passengers) || 1;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: customerEmail,
    payment_intent_data: {
      receipt_email: customerEmail,
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: amountInCents,
          product_data: {
            name: config.stripeDescription,
          },
        },
      },
    ],
    metadata: {
      booking_type: "one-way",
      cal_event_slug: body.calEventSlug,
      cal_event_id: body.calEventId || "",
      vehicle_id: vehicle.id,
      start_location: payload.startLocation ?? "",
      end_location: payload.endLocation ?? "",
      passengers: String(passengerCount),
      distance_km: distanceKm.toFixed(2),
      special_requests: payload.specialRequests ?? "",
      contact_name: `${payload.firstName} ${payload.lastName}`.trim(),
      contact_phone: payload.phone ?? "",
    },
  });

  const contact = {
    name: `${payload.firstName} ${payload.lastName}`.trim(),
    email: customerEmail,
    phone: payload.phone,
  };

  const emailSummary = {
    vehicleName: vehicle.name,
    startLocation: payload.startLocation || "TBD",
    endLocation: payload.endLocation || "TBD",
    passengers: String(passengerCount),
    distance: `${distanceKm.toFixed(1)} km`,
    total: formatCurrency(calculatedPrice),
    specialRequests: payload.specialRequests,
  };

  if (session.url) {
    await Promise.all([
      sendEmail(
        [customerEmail],
        "Complete your Chevalier Lane reservation",
        buildOneWayEmailHtml({
          heading: "Confirm your booking",
          intro:
            "Your transfer has been scheduled. Complete the secure payment below to finalize your reservation.",
          sessionUrl: session.url,
          summary: emailSummary,
          contact,
        })
      ),
      sendEmail(
        owners,
        `New one-way booking ready for payment – ${contact.name || "Guest"}`,
        buildOneWayEmailHtml({
          heading: "New One-way Booking",
          intro:
            "A guest completed the Cal.com flow for a one-way transfer. Use the link below to monitor or resend the payment.",
          sessionUrl: session.url,
          summary: emailSummary,
          contact,
        })
      ),
    ]);
  }

  return new Response(
    JSON.stringify({
      sessionId: session.id,
      sessionUrl: session.url,
      amount: calculatedPrice,
      currency: "eur",
    }),
    { status: 200 }
  );
}

export const ServerRoute = createServerFileRoute(
  "/api/payments/create-checkout-session"
).methods({
  POST: async ({ request }) => {
    try {
      const origin = new URL(request.url).origin;
      const body = (await request.json()) as RequestBody;

      if (body.bookingType === "wedding") {
        return await handleWeddingPayload(body, origin);
      }

      if (body.bookingType === "tour") {
        return await handleTourPayload(body, origin);
      }

      if (body.bookingType === "one-way") {
        return await handleOneWayPayload(body, origin);
      }

      return new Response(
        JSON.stringify({ error: "Unsupported booking type" }),
        {
          status: 400,
        }
      );
    } catch (error) {
      console.error("create-checkout-session error", error);
      return new Response(
        JSON.stringify({ error: "Unable to create checkout session" }),
        {
          status: 500,
        }
      );
    }
  },
});
