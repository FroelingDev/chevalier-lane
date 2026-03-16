import { createServerFileRoute } from "@tanstack/react-start/server";
import { getStripeClient } from "@/lib/stripe";

function getStripe() {
  return getStripeClient();
}

export async function handlePaymentStatusRequest(request: Request) {
  const url = new URL(request.url);
  const rawSessionId = url.searchParams.get("session_id");
  const sessionId = rawSessionId?.replace(/^['"]+|['"]+$/g, "");

  if (!sessionId) {
    return new Response(JSON.stringify({ error: "session_id is required" }), {
      status: 400,
    });
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);

    return new Response(
      JSON.stringify({
        id: session.id,
        status: session.status,
        payment_status: session.payment_status,
        amount_total: session.amount_total,
        currency: session.currency,
        customer_email:
          session.customer_details?.email || session.customer_email || null,
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
}

export const ServerRoute = createServerFileRoute("/api/payments/status").methods(
  {
    GET: ({ request }) => handlePaymentStatusRequest(request),
  },
);
