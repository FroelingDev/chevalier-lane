# Phase 0.2 – Booking Form Audit

Only two booking forms currently POST data to our TanStack Start API routes (`/api/wedding-booking` and `/api/tour-booking`). Both collect expanded context, compute indicative pricing on the client, and send the payload to Resend. The other booking experiences (one-way, airport, corporate, fleet pages) already go straight to Cal.com via `data-cal-link` attributes and therefore are outside this audit.

## Wedding Booking (`src/components/WeddingBooking.tsx`)
- **Rendered on**: `/booking/wedding` via `src/routes/booking/wedding.tsx`.
- **Backend target**: `src/routes/api/wedding-booking.ts` (`POST /api/wedding-booking`) which sanitizes the payload and emails `info@chevalierlane.com` via Resend.
- **Pricing inputs**:
  - `serviceType` toggles between the “main wedding fleet” hourly model and the “guest transport” per-trip model.
  - `selectedVehicle` picks one of the `weddingVehicles` entries, each supplying `hourlyRate` (or `perTripRate`), minimum hours, and the VAT rate (23% for main fleet, 6% for transport).
  - `durationHours` (min 3h, or a special 12h flat rate) controls pricing when `serviceType === 'main'`.
  - `numberOfTrips` (1–6, capped by `maxTripsPerBooking`) drives the per-trip calculation when `serviceType === 'transport'`.
  - `decorationOption` → `decorationPrice` is added to the base fare before VAT is applied.
  - The helper `calculatePrice()` combines those values + VAT to set `calculatedPrice`, which is posted to the backend.
- **Other captured fields**: contact info, start/end locations, event date/time, `specialRequests`, and decoration labels—all forwarded to the API email but not part of the price math.
- **Cal.com slug to trigger**: introduce event types per vehicle + service so pricing metadata stays aligned. Proposed pattern `wedding-${serviceType}-${selectedVehicle}` (examples: `wedding-main-rolls-royce-silver-cloud-ii`, `wedding-transport-bentley-mulsanne-transport`). These slugs will back the Checkout session metadata when we hook Cal → Stripe.

## Tour Booking (`src/components/TourBookingForm.tsx`)
- **Rendered on**: `/booking/tours` via `src/routes/booking/tours.tsx`.
- **Backend target**: `src/routes/api/tour-booking.ts` (`POST /api/tour-booking`) which assembles the HTML summary and emails it with Resend.
- **Pricing inputs**:
  - `selectedTour` references entries in `tourOptions[]` (Buddha Eden vs Palácio experiences). Each option has `basePrice`, optional `priceRange`, required participant minimums, and available add-ons.
  - `participants` multiplies the tour `basePrice`, respecting min/max validations.
  - `selectedAddOns` contributes extra per-person pricing (each lookup is appended to the payload as `addOnDetails`).
  - `selectedVehicle` pulls from `carOptions` (shared with one-way bookings). Vehicle pricing uses `minPrice` for ≤25km trips and adds `pricePerKm` beyond that threshold.
  - `startLocation` feeds Google Places autocomplete, and `calculateRouteDistance` sets `calculatedDistanceKm`, which is used inside `calculateVehiclePrice()` to derive the chauffeur cost.
  - The `totalPrice` state equals `tour base + add-ons + vehicle cost`; that number is posted to the API.
- **Other captured fields**: contact info, `specialRequests`, derived destination address (Buddha Eden vs Palácio) and explicit add-on names.
- **Cal.com slug to trigger**: define event types per experience so Stripe metadata can point back to the confirmed itinerary. Suggested pattern `tour-${selectedTourOption.id}` (examples: `tour-buddha-eden-gardens`, `tour-palacio-wine-tasting`). Include the vehicle + pickup metadata as part of the Checkout session `metadata` rather than the slug.

## Summary Checklist
- ✅ Identified all current POST-ing booking forms and their API routes.
- ✅ Documented every form field that influences on-screen/server price calculations.
- ✅ Proposed Cal.com event type slugs so we can wire the `bookingSuccessful` hook to `/api/payments/create-checkout-session` in Phase 4.
