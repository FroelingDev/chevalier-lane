import Stripe from "stripe";

let stripeClient: Stripe | null = null;

const STRIPE_API_VERSION: Stripe.StripeConfig["apiVersion"] = "2024-06-20";

export function getStripeClient() {
  const secretKey =
    (typeof process !== "undefined" && process.env?.STRIPE_SECRET_KEY) ||
    import.meta.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey, {
      apiVersion: STRIPE_API_VERSION,
    });
  }

  return stripeClient;
}
