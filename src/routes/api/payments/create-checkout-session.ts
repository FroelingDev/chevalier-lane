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
import { airportCarOptions, calculateAirportPrice } from "@/lib/pricing/airport";
import {
  corporateCarOptions,
  calculateCorporatePrice,
} from "@/lib/pricing/corporate";
import { getResendClient } from "@/lib/resend";
import { getStripeClient } from "@/lib/stripe";

const owners = ["info@chevalierlane.com"];

const stripe = getStripeClient();

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(
    value
  );

interface BasePayload {
  bookingType: "wedding" | "tour" | "one-way" | "airport" | "corporate";
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

interface AirportPayload extends BasePayload {
  bookingType: "airport";
  airport: {
    selectedVehicleId: string;
    pickupLocation: string;
    dropoffLocation: string;
    passengers: number;
    specialRequests?: string;
    extraVehicle: boolean;
    flightNumber: string;
    airline: string;
    handLuggage: string;
    largeLuggage: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    distanceKm: number;
  };
}

interface CorporatePayload extends BasePayload {
  bookingType: "corporate";
  corporate: {
    selectedVehicleId: string;
    startLocation: string;
    durationMinutes: number;
    passengers: number;
    specialRequests?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

type RequestBody =
  | WeddingPayload
  | TourPayload
  | OneWayPayload
  | AirportPayload
  | CorporatePayload;

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
    <div style="background:#f7f4ef;padding:32px 12px;font-family: 'Helvetica Neue', Arial, sans-serif;color:#1a1a1a;">
      <table style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e7dccb;box-shadow:0 6px 18px rgba(16,16,16,0.08);width:100%;">
        <tbody>
          <tr>
            <td style="background:linear-gradient(135deg,#1b1b1b,#2b2b2b);padding:28px 32px;">
              <div style="color:#f7d9a5;text-transform:uppercase;letter-spacing:3px;font-size:12px;font-weight:600;">Chevalier Lane</div>
              <div style="color:#ffffff;font-size:26px;font-weight:600;margin-top:6px;">${heading}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#2b2b2b;">${intro}</p>
              <p style="margin:0 0 24px;">
                <a href="${sessionUrl}" style="display:inline-block;padding:14px 26px;background:#b08d57;color:#ffffff;border-radius:6px;text-decoration:none;font-weight:700;letter-spacing:0.3px;">Pay Invoice</a>
              </p>
              <div style="background:#fbf8f2;border:1px solid #efe2cf;border-radius:10px;padding:20px;">
                <div style="font-size:14px;font-weight:600;color:#7a5a2a;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Booking Details</div>
                <table style="width:100%;border-collapse:collapse;font-size:14px;">
                  <tbody>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Vehicle</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.vehicleName} (${summary.serviceType})</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">When</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.eventDate} at ${summary.eventTime}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Route</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.startLocation} → ${summary.endLocation}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Decoration</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.decoration}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Total</td>
                      <td style="padding:8px 0;font-weight:700;color:#b08d57;">${summary.total}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin-top:20px;border-top:1px solid #efe2cf;padding-top:16px;">
                <div style="font-size:14px;font-weight:600;color:#7a5a2a;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Contact</div>
                <div style="font-size:14px;color:#2b2b2b;line-height:1.6;">${contact.name}<br/>${contact.email}<br/>${contact.phone}</div>
              </div>
              <p style="margin:24px 0 0;font-size:12px;color:#7a7a7a;line-height:1.6;">If you have any questions, reply to this email and our concierge team will assist you promptly.</p>
            </td>
          </tr>
          <tr>
            <td style="background:#111111;padding:18px 32px;color:#e3d5bf;font-size:12px;text-align:center;letter-spacing:0.3px;">
              Chevalier Lane · Luxury Chauffeur Services · Portugal
            </td>
          </tr>
        </tbody>
      </table>
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
    <div style="background:#f7f4ef;padding:32px 12px;font-family: 'Helvetica Neue', Arial, sans-serif;color:#1a1a1a;">
      <table style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e7dccb;box-shadow:0 6px 18px rgba(16,16,16,0.08);width:100%;">
        <tbody>
          <tr>
            <td style="background:linear-gradient(135deg,#1b1b1b,#2b2b2b);padding:28px 32px;">
              <div style="color:#f7d9a5;text-transform:uppercase;letter-spacing:3px;font-size:12px;font-weight:600;">Chevalier Lane</div>
              <div style="color:#ffffff;font-size:26px;font-weight:600;margin-top:6px;">${heading}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#2b2b2b;">${intro}</p>
              <p style="margin:0 0 24px;">
                <a href="${sessionUrl}" style="display:inline-block;padding:14px 26px;background:#b08d57;color:#ffffff;border-radius:6px;text-decoration:none;font-weight:700;letter-spacing:0.3px;">Pay Invoice</a>
              </p>
              <div style="background:#fbf8f2;border:1px solid #efe2cf;border-radius:10px;padding:20px;">
                <div style="font-size:14px;font-weight:600;color:#7a5a2a;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Tour Details</div>
                <table style="width:100%;border-collapse:collapse;font-size:14px;">
                  <tbody>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Experience</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.tourName}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Location</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.location}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Participants</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.participants}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Vehicle</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.vehicleName}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Pickup</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.pickup}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Destination</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.destination}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Total</td>
                      <td style="padding:8px 0;font-weight:700;color:#b08d57;">${summary.total}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin-top:20px;background:#ffffff;border:1px solid #efe2cf;border-radius:10px;padding:16px;">
                <div style="font-size:14px;font-weight:600;color:#7a5a2a;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Selected Add-ons</div>
                <ul style="padding-left:18px;margin:0;color:#2b2b2b;">${addOnHtml}</ul>
              </div>
              <div style="margin-top:20px;border-top:1px solid #efe2cf;padding-top:16px;">
                <div style="font-size:14px;font-weight:600;color:#7a5a2a;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Contact</div>
                <div style="font-size:14px;color:#2b2b2b;line-height:1.6;">${contact.name}<br/>${contact.email}<br/>${contact.phone}</div>
              </div>
              <p style="margin:24px 0 0;font-size:12px;color:#7a7a7a;line-height:1.6;">If you have any questions, reply to this email and our concierge team will assist you promptly.</p>
            </td>
          </tr>
          <tr>
            <td style="background:#111111;padding:18px 32px;color:#e3d5bf;font-size:12px;text-align:center;letter-spacing:0.3px;">
              Chevalier Lane · Luxury Chauffeur Services · Portugal
            </td>
          </tr>
        </tbody>
      </table>
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
    <div style="background:#f7f4ef;padding:32px 12px;font-family: 'Helvetica Neue', Arial, sans-serif;color:#1a1a1a;">
      <table style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e7dccb;box-shadow:0 6px 18px rgba(16,16,16,0.08);width:100%;">
        <tbody>
          <tr>
            <td style="background:linear-gradient(135deg,#1b1b1b,#2b2b2b);padding:28px 32px;">
              <div style="color:#f7d9a5;text-transform:uppercase;letter-spacing:3px;font-size:12px;font-weight:600;">Chevalier Lane</div>
              <div style="color:#ffffff;font-size:26px;font-weight:600;margin-top:6px;">${heading}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#2b2b2b;">${intro}</p>
              <p style="margin:0 0 24px;">
                <a href="${sessionUrl}" style="display:inline-block;padding:14px 26px;background:#b08d57;color:#ffffff;border-radius:6px;text-decoration:none;font-weight:700;letter-spacing:0.3px;">Pay Invoice</a>
              </p>
              <div style="background:#fbf8f2;border:1px solid #efe2cf;border-radius:10px;padding:20px;">
                <div style="font-size:14px;font-weight:600;color:#7a5a2a;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Transfer Details</div>
                <table style="width:100%;border-collapse:collapse;font-size:14px;">
                  <tbody>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Vehicle</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.vehicleName}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Route</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.startLocation} → ${summary.endLocation}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Passengers</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.passengers}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Distance</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.distance}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Total</td>
                      <td style="padding:8px 0;font-weight:700;color:#b08d57;">${summary.total}</td>
                    </tr>
                    ${summary.specialRequests ? `<tr><td style="padding:8px 0;color:#6b6b6b;">Special Requests</td><td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.specialRequests}</td></tr>` : ""}
                  </tbody>
                </table>
              </div>
              <div style="margin-top:20px;border-top:1px solid #efe2cf;padding-top:16px;">
                <div style="font-size:14px;font-weight:600;color:#7a5a2a;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Contact</div>
                <div style="font-size:14px;color:#2b2b2b;line-height:1.6;">${contact.name}<br/>${contact.email}<br/>${contact.phone}</div>
              </div>
              <p style="margin:24px 0 0;font-size:12px;color:#7a7a7a;line-height:1.6;">If you have any questions, reply to this email and our concierge team will assist you promptly.</p>
            </td>
          </tr>
          <tr>
            <td style="background:#111111;padding:18px 32px;color:#e3d5bf;font-size:12px;text-align:center;letter-spacing:0.3px;">
              Chevalier Lane · Luxury Chauffeur Services · Portugal
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function buildAirportEmailHtml({
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
    pickupLocation: string;
    dropoffLocation: string;
    passengers: string;
    distance: string;
    flight: string;
    extraVehicle: string;
    luggage: string;
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
    <div style="background:#f7f4ef;padding:32px 12px;font-family: 'Helvetica Neue', Arial, sans-serif;color:#1a1a1a;">
      <table style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e7dccb;box-shadow:0 6px 18px rgba(16,16,16,0.08);width:100%;">
        <tbody>
          <tr>
            <td style="background:linear-gradient(135deg,#1b1b1b,#2b2b2b);padding:28px 32px;">
              <div style="color:#f7d9a5;text-transform:uppercase;letter-spacing:3px;font-size:12px;font-weight:600;">Chevalier Lane</div>
              <div style="color:#ffffff;font-size:26px;font-weight:600;margin-top:6px;">${heading}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#2b2b2b;">${intro}</p>
              <p style="margin:0 0 24px;">
                <a href="${sessionUrl}" style="display:inline-block;padding:14px 26px;background:#b08d57;color:#ffffff;border-radius:6px;text-decoration:none;font-weight:700;letter-spacing:0.3px;">Pay Invoice</a>
              </p>
              <div style="background:#fbf8f2;border:1px solid #efe2cf;border-radius:10px;padding:20px;">
                <div style="font-size:14px;font-weight:600;color:#7a5a2a;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Airport Transfer Details</div>
                <table style="width:100%;border-collapse:collapse;font-size:14px;">
                  <tbody>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Vehicle</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.vehicleName}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Route</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.pickupLocation} → ${summary.dropoffLocation}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Passengers</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.passengers}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Distance</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.distance}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Flight</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.flight}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Extra vehicle</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.extraVehicle}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Luggage</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.luggage}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Total</td>
                      <td style="padding:8px 0;font-weight:700;color:#b08d57;">${summary.total}</td>
                    </tr>
                    ${summary.specialRequests ? `<tr><td style="padding:8px 0;color:#6b6b6b;">Special Requests</td><td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.specialRequests}</td></tr>` : ""}
                  </tbody>
                </table>
              </div>
              <div style="margin-top:20px;border-top:1px solid #efe2cf;padding-top:16px;">
                <div style="font-size:14px;font-weight:600;color:#7a5a2a;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Contact</div>
                <div style="font-size:14px;color:#2b2b2b;line-height:1.6;">${contact.name}<br/>${contact.email}<br/>${contact.phone}</div>
              </div>
              <p style="margin:24px 0 0;font-size:12px;color:#7a7a7a;line-height:1.6;">If you have any questions, reply to this email and our concierge team will assist you promptly.</p>
            </td>
          </tr>
          <tr>
            <td style="background:#111111;padding:18px 32px;color:#e3d5bf;font-size:12px;text-align:center;letter-spacing:0.3px;">
              Chevalier Lane · Luxury Chauffeur Services · Portugal
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function buildCorporateEmailHtml({
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
    duration: string;
    passengers: string;
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
    <div style="background:#f7f4ef;padding:32px 12px;font-family: 'Helvetica Neue', Arial, sans-serif;color:#1a1a1a;">
      <table style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e7dccb;box-shadow:0 6px 18px rgba(16,16,16,0.08);width:100%;">
        <tbody>
          <tr>
            <td style="background:linear-gradient(135deg,#1b1b1b,#2b2b2b);padding:28px 32px;">
              <div style="color:#f7d9a5;text-transform:uppercase;letter-spacing:3px;font-size:12px;font-weight:600;">Chevalier Lane</div>
              <div style="color:#ffffff;font-size:26px;font-weight:600;margin-top:6px;">${heading}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#2b2b2b;">${intro}</p>
              <p style="margin:0 0 24px;">
                <a href="${sessionUrl}" style="display:inline-block;padding:14px 26px;background:#b08d57;color:#ffffff;border-radius:6px;text-decoration:none;font-weight:700;letter-spacing:0.3px;">Pay Invoice</a>
              </p>
              <div style="background:#fbf8f2;border:1px solid #efe2cf;border-radius:10px;padding:20px;">
                <div style="font-size:14px;font-weight:600;color:#7a5a2a;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Corporate Service Details</div>
                <table style="width:100%;border-collapse:collapse;font-size:14px;">
                  <tbody>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Vehicle</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.vehicleName}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Starting Location</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.startLocation}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Duration</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.duration}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Passengers</td>
                      <td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.passengers}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b6b6b;">Total</td>
                      <td style="padding:8px 0;font-weight:700;color:#b08d57;">${summary.total}</td>
                    </tr>
                    ${summary.specialRequests ? `<tr><td style="padding:8px 0;color:#6b6b6b;">Special Requests</td><td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${summary.specialRequests}</td></tr>` : ""}
                  </tbody>
                </table>
              </div>
              <div style="margin-top:20px;border-top:1px solid #efe2cf;padding-top:16px;">
                <div style="font-size:14px;font-weight:600;color:#7a5a2a;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Contact</div>
                <div style="font-size:14px;color:#2b2b2b;line-height:1.6;">${contact.name}<br/>${contact.email}<br/>${contact.phone}</div>
              </div>
              <p style="margin:24px 0 0;font-size:12px;color:#7a7a7a;line-height:1.6;">If you have any questions, reply to this email and our concierge team will assist you promptly.</p>
            </td>
          </tr>
          <tr>
            <td style="background:#111111;padding:18px 32px;color:#e3d5bf;font-size:12px;text-align:center;letter-spacing:0.3px;">
              Chevalier Lane · Luxury Chauffeur Services · Portugal
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function calculateOneWayQuote(
  distanceKm: number,
  minPrice: number,
  maxKmIncluded: number,
  pricePerKm?: number
) {
  const roundToCents = (value: number) => Math.round(value * 100) / 100;

  if (distanceKm <= maxKmIncluded) {
    return roundToCents(minPrice * ONE_WAY_PRICE_MARKUP_MULTIPLIER);
  }

  if (pricePerKm) {
    const base = minPrice + (distanceKm - maxKmIncluded) * pricePerKm;
    return roundToCents(base * ONE_WAY_PRICE_MARKUP_MULTIPLIER);
  }

  return null;
}

const formatDurationLabel = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

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
        "Your Chevalier Lane invoice",
        buildWeddingEmailHtml({
          heading: "Your invoice is ready",
          intro:
            "Your booking is scheduled. Use the invoice below to complete payment securely.",
          sessionUrl: session.url,
          summary: emailSummary,
          contact,
        })
      ),
      sendEmail(
        owners,
        `Wedding invoice ready – ${contact.name || "Guest"}`,
        buildWeddingEmailHtml({
          heading: "New Wedding Booking",
          intro:
            "A guest completed the Cal.com scheduling flow. Use the Stripe link below to collect payment.",
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
        "Your Chevalier Lane invoice",
        buildTourEmailHtml({
          heading: "Your invoice is ready",
          intro:
            "Your tour is scheduled. Use the invoice below to complete payment securely.",
          sessionUrl: session.url,
          summary: emailSummary,
          contact,
        })
      ),
      sendEmail(
        owners,
        `Tour invoice ready – ${contact.name || "Guest"}`,
        buildTourEmailHtml({
          heading: "New Tour Booking",
          intro:
            "A guest completed the Cal.com flow for a tour booking. Use the link below to collect payment.",
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
    vehicle.maxKmIncluded,
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
    const invoiceRecipients = Array.from(
      new Set([customerEmail, ...owners].filter(Boolean))
    );

    await Promise.all([
      sendEmail(
        invoiceRecipients,
        "Your Chevalier Lane invoice",
        buildOneWayEmailHtml({
          heading: "Your invoice is ready",
          intro:
            "Your transfer is scheduled. Use the invoice below to complete payment securely.",
          sessionUrl: session.url,
          summary: emailSummary,
          contact,
        })
      ),
      sendEmail(
        owners,
        `One-way invoice ready – ${contact.name || "Guest"}`,
        buildOneWayEmailHtml({
          heading: "New One-way Booking",
          intro:
            "A guest completed the Cal.com flow for a one-way transfer. Use the link below to collect payment.",
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

async function handleAirportPayload(body: AirportPayload, origin: string) {
  const config = getCalEventConfig(body.calEventSlug);
  if (!config || config.kind !== "airport") {
    return new Response(JSON.stringify({ error: "Unknown Cal event" }), {
      status: 400,
    });
  }

  const payload = body.airport;
  const vehicle = airportCarOptions.find(
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

  const calculatedPrice = calculateAirportPrice(
    distanceKm,
    vehicle,
    payload.extraVehicle
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
    bookingType: "airport",
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
      booking_type: "airport",
      cal_event_slug: body.calEventSlug,
      cal_event_id: body.calEventId || "",
      vehicle_id: vehicle.id,
      pickup_location: payload.pickupLocation ?? "",
      dropoff_location: payload.dropoffLocation ?? "",
      passengers: String(payload.passengers),
      distance_km: distanceKm.toFixed(2),
      extra_vehicle: payload.extraVehicle ? "true" : "false",
      flight_number: payload.flightNumber ?? "",
      airline: payload.airline ?? "",
      hand_luggage: payload.handLuggage ?? "",
      large_luggage: payload.largeLuggage ?? "",
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
    pickupLocation: payload.pickupLocation || "TBD",
    dropoffLocation: payload.dropoffLocation || "TBD",
    passengers: String(payload.passengers ?? 1),
    distance: `${distanceKm.toFixed(1)} km`,
    flight: `${payload.flightNumber || "TBD"} · ${payload.airline || "TBD"}`,
    extraVehicle: payload.extraVehicle ? "Yes" : "No",
    luggage: `${payload.handLuggage || "0"} hand / ${payload.largeLuggage || "0"} large`,
    total: formatCurrency(calculatedPrice),
    specialRequests: payload.specialRequests,
  };

  if (session.url) {
    const invoiceRecipients = Array.from(
      new Set([customerEmail, ...owners].filter(Boolean))
    );

    await Promise.all([
      sendEmail(
        invoiceRecipients,
        "Your Chevalier Lane invoice",
        buildAirportEmailHtml({
          heading: "Your invoice is ready",
          intro:
            "Your airport transfer is scheduled. Use the invoice below to complete payment securely.",
          sessionUrl: session.url,
          summary: emailSummary,
          contact,
        })
      ),
      sendEmail(
        owners,
        `Airport invoice ready – ${contact.name || "Guest"}`,
        buildAirportEmailHtml({
          heading: "New Airport Booking",
          intro:
            "A guest completed the Cal.com flow for an airport transfer. Use the link below to collect payment.",
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

async function handleCorporatePayload(body: CorporatePayload, origin: string) {
  const config = getCalEventConfig(body.calEventSlug);
  if (!config || config.kind !== "corporate") {
    return new Response(JSON.stringify({ error: "Unknown Cal event" }), {
      status: 400,
    });
  }

  const payload = body.corporate;
  const vehicle = corporateCarOptions.find(
    (v) => v.id === payload.selectedVehicleId
  );
  if (!vehicle) {
    return new Response(JSON.stringify({ error: "Unknown vehicle" }), {
      status: 400,
    });
  }

  const durationMinutes = Number(payload.durationMinutes) || 0;
  const calculatedPrice = calculateCorporatePrice(durationMinutes, vehicle);
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
    bookingType: "corporate",
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
      booking_type: "corporate",
      cal_event_slug: body.calEventSlug,
      cal_event_id: body.calEventId || "",
      vehicle_id: vehicle.id,
      start_location: payload.startLocation ?? "",
      duration_minutes: String(durationMinutes),
      passengers: String(payload.passengers),
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
    duration: formatDurationLabel(durationMinutes),
    passengers: String(payload.passengers ?? 1),
    total: formatCurrency(calculatedPrice),
    specialRequests: payload.specialRequests,
  };

  if (session.url) {
    const invoiceRecipients = Array.from(
      new Set([customerEmail, ...owners].filter(Boolean))
    );

    await Promise.all([
      sendEmail(
        invoiceRecipients,
        "Your Chevalier Lane invoice",
        buildCorporateEmailHtml({
          heading: "Your invoice is ready",
          intro:
            "Your corporate booking is scheduled. Use the invoice below to complete payment securely.",
          sessionUrl: session.url,
          summary: emailSummary,
          contact,
        })
      ),
      sendEmail(
        owners,
        `Corporate invoice ready – ${contact.name || "Guest"}`,
        buildCorporateEmailHtml({
          heading: "New Corporate Booking",
          intro:
            "A guest completed the Cal.com flow for a corporate booking. Use the link below to collect payment.",
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

      if (body.bookingType === "airport") {
        return await handleAirportPayload(body, origin);
      }

      if (body.bookingType === "corporate") {
        return await handleCorporatePayload(body, origin);
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
