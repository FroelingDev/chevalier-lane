# Phase 0.3 – Cal.com Handoff Strategy

Goal: understand how each booking experience currently invokes Cal so we know where to attach the future `bookingSuccessful → Stripe` redirect logic.

## How Cal is embedded today
- Every self-serve booking page that already charges indicatively (one-way transfers, airport transfers, corporate, and the car-specific `/booking/$id` pages) imports `getCalApi` from `@calcom/embed-react`.
- When the user selects a car, we call `getCalApi({ namespace })` and immediately configure the UI via `cal('ui', { hideEventTypeDetails: true, layout: 'month_view' })`. The namespace always matches the slug portion we pass to Cal (e.g., `one-way-bentley-mulsanne`).
- The “Book” CTA is a regular `<button>` element with `data-cal-namespace`, `data-cal-link`, and `data-cal-config` attributes. Clicking it opens Cal’s overlay popup on top of the current booking page; there is **no redirect to an external tab**.
- Because these experiences already run Cal inside the same React tree, we can later call `const cal = await getCalApi({ namespace })` and register `cal('bookingSuccessful', handler)` to kick off the Stripe Checkout fetch before Cal dismisses.
- The Cal embed script itself is loaded via the `@calcom/embed-react` package (no manual `<script>` tag in `__root.tsx`), so every component that imports it already has access to the event bus.

## Component coverage
| Route | Component | Cal namespace pattern | Trigger style | Notes |
| --- | --- | --- | --- | --- |
| `/booking/one-way` | `OneWayBooking` | `one-way-${selectedCar.id}` | Overlay popup on same page | After the inline form validates, the button opens Cal; currently no listener for `bookingSuccessful`. |
| `/booking/$id` (fleet detail) | `DynamicBooking` | `one-way-${selectedCar.id}` | Overlay popup | Same flow as one-way, initialized with the `carId` route param. |
| `/booking/airport` | `AirportBooking` | `airport-${selectedCar.id}` | Overlay popup | Uses additional notes (flight data) in `data-cal-config`. |
| `/booking/corporate` | `CorporateBooking` | `corporate-${selectedCar.id}` | Overlay popup | Includes duration + pricing data inside `data-cal-config`. |

## Not yet Cal-enabled
- `WeddingBooking` and `TourBookingForm` submit to `/api/wedding-booking` and `/api/tour-booking` respectively and currently stop at an on-screen confirmation email—there is no Cal step yet. To keep parity with the rest of the flow, we’ll need to introduce Cal event types (per audit in `booking-form-audit.md`) and then attach the same popup + `bookingSuccessful` hook before we can redirect to Stripe Checkout.

## Implications for Stripe work
- Since the working flows already rely on Cal popups inside the booking pages, we can safely implement the Stripe redirect on the **frontend** after listening to `bookingSuccessful`—no need to configure a separate Cal-hosted confirmation page right away.
- For resilience (user closes browser mid-flow), we should still add a Cal webhook later (Phase 4/6), but the primary “instant checkout” path can be implemented by wiring those existing popups to call `/api/payments/create-checkout-session` immediately after Cal emits the success event.
