# Stripe Payment Plan

## Current Booking Flow (what the code does today)
- React booking forms (for example `src/components/WeddingBooking.tsx` and `src/components/TourBookingForm.tsx`) collect customer/service details, calculate an indicative price client-side, and POST to TanStack Start server routes such as `src/routes/api/wedding-booking.ts`.
- The server routes only sanitize the payload and forward an email via Resend to `info@chevalierlane.com`; there is no server-side price verification, storage, or payment step.
- Customers receive only an on-screen confirmation; owners must manually follow up, quote, and collect payment offline. This creates friction, delayed confirmations, and extra manual bookkeeping.
- **Scheduling itself happens via Cal.com**. Each “Book” button is wired to a Cal.com event type (`data-cal-link` such as `one-way-bentley-mulsanne`, `airport-mercedes-s500`, etc.), so availability, reminders, and rescheduling are already handled per-car/per-service through Cal. The Stripe plan therefore needs to react to Cal events rather than replace them.

## Recommendation: Instant Stripe Checkout Redirect + Email Fallback Link

| Option | Pros | Cons |
| --- | --- | --- |
| Send a manual Stripe Payment Link later via email | Requires almost no code change; flexible payment timing. | Entirely manual for owners, slow for customers, risk of drop-off, no guarantee that the quote/vehicle remains available. |
| Push users directly into a Stripe-hosted Checkout session after the booking form | Simple to implement with the current stack, captures intent while the customer is engaged, Checkout UI is already PCI compliant, owners see payments instantly in Stripe. | Requires minimal backend endpoint + webhook setup, must handle cancel flow. |

**Best balance**: create the Checkout session immediately and redirect the user, while also emailing the same Checkout Session URL to both the client and the owners (via Resend) so it can be reopened if their browser closes. Owners still get a concise booking email plus the Stripe link, but they no longer need to craft invoices manually.

## Target Customer Journey (aligned with Cal.com)
1. Customer fills a booking form and sees the price preview (same as now).
2. Hitting “Book {car}” opens the Car/Service-specific Cal.com event type. Cal collects the timeslot and confirms the booking; the embed fires the `bookingSuccessful` (or webhook) payload that includes the event type slug, start/end times, invitee data, etc.
3. As soon as Cal reports success, the frontend (or a Cal webhook) posts the confirmed event payload to a new backend endpoint which:
   - validates and re-calculates the price server-side,
   - creates a Stripe Checkout Session tied to that Cal event (store the Cal event UUID and event-type slug in Stripe metadata),
   - triggers the existing Resend email with the booking details **plus** the `session.url`.
4. The Cal confirmation screen shows a “Pay Now” button that the embed automatically opens (using `window.location.assign(session.url)`) so the guest lands in Stripe Checkout moments after they book the timeslot.
5. If the customer closes the browser, the emailed link lets them (or the owner) reopen that same Checkout Session. Owners see both the Cal invite and the payment status inside Stripe with shared metadata.

## Owner Workflow
- Owners continue to receive structured emails (from Resend) but now each email contains the Stripe Checkout URL, the Checkout Session ID, and the Cal event ID/slug so they can cross-reference bookings quickly.
- Every booking payment shows up inside the Stripe Dashboard with metadata (booking type, vehicle, Cal event type, event date, customer contact) so the team can reconcile quickly.
- Stripe automatically emails receipts to customers, and webhooks can be used to notify the site when a payment is completed (e.g., update a CRM sheet or fire a Slack message). No manual chasing for payment unless the session expires.

## Implementation Plan

### 1. Stripe Setup & Shared Utilities
- Install the official SDK: `stripe` package for the server routes.
- Add `STRIPE_SECRET_KEY` and (optionally) `STRIPE_WEBHOOK_SECRET` env vars; load them in server routes via `import.meta.env`.
- Move the existing client-side price logic into shared helpers (e.g., `src/lib/pricing/wedding.ts`, `src/lib/pricing/tour.ts`). The server will import these helpers to prevent tampering when calculating Checkout amounts and to compute totals for each Cal event type.
- Maintain a single mapping file such as `src/lib/cal-event-map.ts` that links Cal event slugs (`one-way-bentley-mulsanne`, `airport-mercedes-brabus`, etc.) to pricing helpers, Stripe product descriptions, and owner notes. This keeps the Cal <-> Stripe relationship explicit.

### 2. Cal.com Handshake
- Use the Cal embed API (`getCalApi`) to listen for the `bookingSuccessful` event; the callback receives the event type slug, invitee, and booked slot.
- Alternatively (or additionally), configure a Cal webhook so the backend can respond even if the user closes the browser.
- When the booking succeeds, build a payload with: Cal event ID, slug, start/end timestamps, captured form inputs (route, passengers, decoration, etc.), and send it to `/api/payments/create-checkout-session`.

### 3. Create Checkout Session Endpoint
- Add `src/routes/api/payments/create-checkout-session.ts`.
- Responsibilities:
  1. Accept Cal event data + the enriched booking context.
  2. Validate required fields, look up the relevant pricing helper by Cal event slug, and recompute the total price.
  3. Create (or reuse) a Stripe Customer using the invitee email.
  4. Create a Checkout Session with:
     - `mode: 'payment'`.
     - Line item name derived from the Cal event map (e.g., "One-Way – Bentley Mulsanne").
     - `unit_amount` = total price (in cents) or a configured deposit for that event type.
     - `metadata` capturing Cal event ID, event type slug, booking type, vehicle ID, event date/time, pickup/drop-off, passengers, decoration, and internal notes.
     - `success_url` pointing to `/booking/payment-success?eventId=...`.
     - `cancel_url` pointing to a safe Cal landing page (e.g., `/booking/${carId}`) so the user can re-open the scheduler if needed.
  5. Trigger the existing Resend email templates but append a **"Complete Payment"** button that links to `session.url`. Send one email to the client and one to the owner.
  6. Respond with `{ sessionUrl, bookingId, calEventId }`.

### 4. Update Booking Components & Cal Confirmation
- When the Cal embed reports success, call the payment endpoint and, on success, immediately redirect to `sessionUrl`.
- If Cal is opened in a popup, use `window.location.assign(sessionUrl)` after closing the popup so the experience still feels seamless.
- Keep a “Payment Pending” banner on the relevant page that checks `/api/payments/status?calEventId=` so users who return later see the correct state and can re-open the emailed Checkout link.

### 5. Success / Cancel Routes
- Add new client routes (e.g., `src/routes/booking/payment-success.tsx` and `payment-cancel.tsx`) that read query params (`?bookingId=&session_id=`) and display the booking summary plus the Cal event reference.
- On the success page, optionally fetch `/api/payments/status?session_id=...` to show live confirmation pulled from Stripe (using `stripe.checkout.sessions.retrieve`) and highlight the Cal event details so guests can add it to their calendar if they missed the original email.

### 6. Webhook (optional but recommended)
- Implement `src/routes/api/stripe-webhook.ts` to handle `checkout.session.completed`.
- Verify payload with `stripe.webhooks.constructEvent`.
- On success, log/store the payment status (could be as simple as appending to a Google Sheet, Supabase table, or sending another Resend email to the owners confirming payment). Include both Cal and Stripe IDs for easy reconciliation.
- If later a database is introduced, this webhook can mark a booking record as "paid".

### 7. Operations Checklist
- Configure in Stripe Dashboard:
  - Default email receipt language (PT/EN) and branding to match Chevalier Lane.
  - Saved products like "Wedding Chauffeur Deposit" if you prefer fixed price IDs instead of ad-hoc amounts.
  - Set up notification emails to owners for every payment (Stripe → Business settings → Notifications).
- Configure Cal.com:
  - Ensure each event type slug matches the mapping file.
  - Attach any owner-only notes (vehicle assignment, driver info) using Cal's internal notes so they remain in sync with Stripe metadata.
- Train owners to look up bookings in Stripe by searching metadata fields (Cal event ID or customer email).
- Document how to resend the Checkout link from the Stripe Dashboard (each session shows a "Copy link" button) and how to trigger a new Cal invite if an event gets rescheduled.

## Why This Stays Simple
- One new backend endpoint + optional webhook; no need for a full order database yet.
- Stripe Checkout handles PCI, payment methods, 3D Secure, and receipts automatically.
- Re-using the Resend setup keeps owners in the loop and doubles as a fallback payment reminder (no additional tooling).
- Customers can pay immediately on desktop or mobile without waiting for an emailed invoice, but the same link is still emailed in case they close the tab.
