# Instant Stripe Checkout Implementation Steps

## Phase 0 – Prerequisites & Backlog Prep
1. **Confirm secrets + accounts**
   - Ensure Stripe account has desired products, branding, and live/test keys ready.
   - Add `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, and `STRIPE_WEBHOOK_SECRET` to the `.env` files (local + deploy target) and surface missing env vars as build errors.
2. **Audit current booking forms**
   - List every component + route that POSTS bookings (e.g., `src/components/WeddingBooking.tsx`, `src/routes/api/wedding-booking.ts`).
   - Note which form fields map to pricing inputs and which Cal event slug they should trigger.
   - ✅ Findings summarized in `booking-form-audit.md` (Phase 0.2 output).
3. **Decide hosting strategy for Cal handoff**
   - Confirm whether the Cal embed fires events on the main marketing pages or in a popup so we can wire the redirect logic correctly.
   - ✅ Documented in `cal-handoff.md` – current flows use the Cal overlay popup inside each booking page, so we can hook `bookingSuccessful` directly in those components.

## Phase 1 – Shared Pricing + Event Config
4. **Extract pricing helpers**
   - Move / duplicate existing client-side price math into `src/lib/pricing/<service>.ts` modules.
   - Export deterministic functions (pure, typed) that take normalized booking data and return `{ currency, unitAmount, breakdown }`.
   - Update React components to import the shared helpers instead of custom inline math to keep UI and server in sync.
   - ✅ Wedding + Tour helpers now live in `src/lib/pricing/wedding.ts` and `src/lib/pricing/tour.ts`, with UI components consuming them.
5. **Create the Cal ↔ Stripe map**
   - Add `src/lib/cal-event-map.ts` exporting a dictionary keyed by Cal event slug that references:
     - `stripeDescription`, `pricingResolver`, `productId` (optional), `defaultDeposit`, copy for customer/owner emails, and fallback URLs.
   - Include TypeScript types + runtime guards so API routes can reject unknown slugs early.
   - ✅ Scaffolded in `src/lib/cal-event-map.ts`, auto-generating entries for every wedding vehicle and tour option with metadata + default redirect paths.

## Phase 2 – Backend Payment Endpoint
6. **Create `/api/payments/create-checkout-session` route**
   - Base file: `src/routes/api/payments/create-checkout-session.ts` (TanStack Start handler).
   - Validate the payload schema (Cal event id/slug, invitee info, enriched booking form data) using Zod or existing validator.
   - Look up the event slug in `cal-event-map`, recompute price using the shared helper, and guard against tampering.
   - Initialize the Stripe SDK once (shared `src/lib/stripe.ts`) to reuse across handlers.
   - Create/retrieve the Stripe Customer by email, attach metadata (Cal event + booking context), and create the Checkout Session with mode `payment` + `success_url` + `cancel_url` from config.
   - Return `{ sessionUrl, sessionId, calEventId }` JSON; include safe errors for validation/Stripe failures.
   - ✅ Implemented for wedding & tour bookings (emails + metadata) in `src/routes/api/payments/create-checkout-session.ts`.

## Phase 3 – Booking Emails + Fallback Link
7. **Extend Resend email payload**
   - Update existing API routes/emails to accept the new fields (Checkout session URL + ID, Cal event data, amount summary).
   - Ensure both the owner + guest versions contain a clear "Complete Payment" button linking to `session.url`.
   - Keep legacy email structure intact so operations are not disrupted.

## Phase 4 – Frontend + Cal Embed
8. **Listen for `bookingSuccessful`**
   - In each booking component, hook into `getCalApi().on('bookingSuccessful', ...)` with a shared helper.
   - Gather Cal payload + recent form inputs and POST to `/api/payments/create-checkout-session`.
   - While awaiting the response, show a “Preparing secure payment…” loader; on success, `window.location.assign(sessionUrl)`.
   - If the Cal widget is in a popup, close it before redirecting or open Checkout in the same tab for mobile friendliness.
   - ✅ Wedding & tour forms now attach Cal listeners and redirect to Stripe immediately.
9. **Handle pending payments**
   - Persist the Cal event ID + session ID in local state or query params so the UI can render a “Payment pending” status.
   - Add a small helper route `/api/payments/status?calEventId=` that proxies `stripe.checkout.sessions.list` by metadata to let users reopen the link if needed.
   - ✅ `/api/payments/status?session_id=` returns live Stripe state, and the success page surfaces it to users.

## Phase 5 – Success / Cancel UX
10. **Add payment success + cancel routes**
    - Create `src/routes/booking/payment-success.tsx` and `payment-cancel.tsx` screens that parse query params for session + event IDs.
    - Fetch the Checkout Session server-side to confirm payment state and surface Cal event info + receipt guidance.
    - Offer buttons to “Return to home” and “Need to reschedule?” linking back to the relevant Cal slug.
    - ✅ Implemented with Stripe status polling + friendly CTAs.

## Phase 6 – Webhooks & Ops
11. **Stripe webhook endpoint**
    - Implement `src/routes/api/stripe-webhook.ts` verifying signatures and handling `checkout.session.completed` and `expired`.
    - On completion, notify owners (Resend email or Slack) and flag any CRM/Sheet entries as paid.
12. **Runbook + monitoring**
    - Document how to replay a webhook, resend Checkout links, and locate metadata in Stripe.
    - Add logging/alerting for failed session creation or webhook validation (e.g., simple console + Vercel log drain).

## Phase 7 – QA & Rollout
13. **End-to-end test matrix**
    - Simulate multiple Cal event types in Stripe test mode (desktop/mobile, popup vs inline).
    - Verify the fallback email link opens the same session even after closing the browser.
    - Confirm cancel flow returns to Cal booking page and allows re-trigger.
14. **Deployment checklist**
    - Ensure env vars are present in production build pipeline.
    - Deploy backend first, then frontend (so new redirect calls hit working endpoints).
    - Switch Stripe to live keys after smoke tests succeed; monitor the first few live bookings manually.
