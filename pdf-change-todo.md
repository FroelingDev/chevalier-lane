# Website Change Todo List

Source: `/Users/froelingdev/Downloads/Untitled document (13).pdf`

## 1. Show an "available soon" notice for Bentley Mulsanne in booking flows

- [ ] Add a small notification/pop-up when users select the Bentley Mulsanne in booking sections.
- [ ] Use the requested message: `Our flagship Bentley Mulsanne will soon be available for selected services.`
- [ ] Show the same notice when users open the Bentley Mulsanne detail page and press `Reserve This Vehicle`.
- [ ] Decide whether Bentley Mulsanne should still be selectable after the warning, or blocked for the affected services.

Relevant files:
- `src/components/OneWayBooking.tsx`
- `src/components/AirportBooking.tsx`
- `src/components/CorporateBooking.tsx`
- `src/components/WeddingBooking.tsx`
- `src/components/TourBookingForm.tsx`
- `src/components/DynamicBooking.tsx`
- `src/routes/modern/bentley-mulsanne.tsx`
- `src/components/CarDetail.tsx`
- `src/lib/pricing/one-way-cars.ts`
- `src/lib/pricing/airport.ts`
- `src/lib/pricing/corporate.ts`
- `src/lib/pricing/wedding.ts`

## 2. Add international phone country-code selector to every booking form

- [ ] Replace plain phone inputs with an international phone field that includes country-code selection.
- [ ] Apply this consistently across all booking services before the user enters the phone number.
- [ ] Keep payloads/API contracts compatible with existing `phone` fields.
- [ ] Validate formatting so backend emails and Stripe/Cal payloads still receive usable phone values.

Relevant files:
- `src/components/OneWayBooking.tsx`
- `src/components/AirportBooking.tsx`
- `src/components/CorporateBooking.tsx`
- `src/components/TourBookingForm.tsx`
- `src/components/WeddingBooking.tsx`
- `src/components/DynamicBooking.tsx`
- `src/routes/api/payments/create-checkout-session.ts`
- `src/routes/api/tour-booking.ts`
- `src/routes/api/wedding-booking.ts`

## 3. Add "Baby Seat Included" option to selected services

- [ ] Add a yes/no baby-seat field plus quantity selector where applicable.
- [ ] Include it in these booking services:
- [ ] One-Way
- [ ] Airports
- [ ] By the Hour
- [ ] Tours
- [ ] Persist the choice through Cal notes, checkout payloads, and notification emails if those systems should see it.

Relevant files:
- `src/components/OneWayBooking.tsx`
- `src/components/AirportBooking.tsx`
- `src/components/CorporateBooking.tsx`
- `src/components/TourBookingForm.tsx`
- `src/components/DynamicBooking.tsx`
- `src/routes/api/payments/create-checkout-session.ts`
- `src/routes/api/tour-booking.ts`

## 4. Prevent selecting cars that do not fit the passenger count

- [ ] Add vehicle seat-capacity metadata for booking vehicles.
- [ ] When a client chooses 4 passengers, block any vehicle that only seats 3.
- [ ] Show a clear warning/modal instead of allowing the invalid selection.
- [ ] Apply this validation both when selecting a car card and when passenger count changes after a car is already selected.

Relevant files:
- `src/components/OneWayBooking.tsx`
- `src/components/AirportBooking.tsx`
- `src/components/CorporateBooking.tsx`
- `src/components/DynamicBooking.tsx`
- `src/components/TourBookingForm.tsx`
- `src/lib/pricing/one-way-cars.ts`
- `src/lib/pricing/airport.ts`
- `src/lib/pricing/corporate.ts`
- `src/lib/pricing/wedding.ts`

## 5. Simplify the weddings "Guest Transport" section

- [ ] Remove the guest-transport vehicle cards from the wedding booking flow.
- [ ] Replace them with informational copy only: `For transporting wedding guests and party. Only modern vehicles available.`
- [ ] Keep the yes/no question: `Do you need vehicles for guest transport?`
- [ ] If the answer is yes, show a field asking: `How many vehicles do you need?`
- [ ] Remove the visible `6% VAT` text from this section.
- [ ] Update pricing and booking logic so guest transport no longer depends on choosing an explicit car card.
- [ ] Confirm how pricing should work once the vehicle choice is removed, since the current model depends on per-vehicle transport entries.

Relevant files:
- `src/components/WeddingBooking.tsx`
- `src/lib/pricing/wedding.ts`
- `src/routes/api/payments/create-checkout-session.ts`
- `src/routes/api/wedding-booking.ts`
- `src/lib/cal-event-map.ts`
- `src/components/LanguageProvider.tsx`

## 6. Restructure the homepage services section

- [ ] Keep the opening services section content exactly as-is:
- [ ] Title: `Our Services`
- [ ] Text: `Discover the full spectrum of luxury transportation experiences crafted for discerning individuals who demand nothing less than perfection.`
- [ ] Background image/video
- [ ] Remove the two buttons: `Book Your Service` and `Explore Services`.
- [ ] After that opening block, insert the `Complete Service Portfolio` layout directly below.
- [ ] Keep the portfolio section buttons (`Find out more`, `Contact us`) intact.
- [ ] Remove all sections between `Complete Service Portfolio` and `Why Choose Chevalier Lane`.
- [ ] Keep `Why Choose Chevalier Lane` and `Ready to Experience Luxury`.

Relevant files:
- `src/routes/services/index.tsx`
- `src/components/LanguageProvider.tsx`

## 7. Replace payment-first CTAs with inquiry-first CTAs

- [ ] Change final booking CTA text from `Pay` or `Schedule & Pay` to `Find Out Prices` or similar wording.
- [ ] Update booking success copy so it no longer implies prices are shown directly on the site.
- [ ] Confirm the actual flow: user submits booking inquiry first, then the team reviews and manually sends pricing.
- [ ] If the Stripe checkout flow should no longer happen immediately, remove or defer automatic checkout-session creation from booking components.
- [ ] Update any payment/invoice emails and success pages so the user journey matches the new inquiry-first process.

Relevant files:
- `src/components/OneWayBooking.tsx`
- `src/components/AirportBooking.tsx`
- `src/components/CorporateBooking.tsx`
- `src/components/TourBookingForm.tsx`
- `src/components/WeddingBooking.tsx`
- `src/components/DynamicBooking.tsx`
- `src/routes/api/payments/create-checkout-session.ts`
- `src/routes/api/payments/status.ts`
- `src/routes/booking/payment-success.tsx`
- `src/routes/booking/payment-cancel.tsx`
- `src/lib/cal-event-map.ts`
- `src/components/LanguageProvider.tsx`

## 8. Split "By the Hour" into Hourly vs Full Day

- [ ] Change the service title copy to something like `By the Hour | Full Day`.
- [ ] In the booking flow, add a choice between `Book by the Hour` and `Book Full Day`.
- [ ] Keep the existing hourly flow for `Book by the Hour`.
- [ ] Create a separate full-day booking flow for `Book Full Day`.
- [ ] For the full-day flow, allow a minimum duration of 8 hours.
- [ ] Keep the rest of the booking form behavior aligned with the existing by-the-hour form.
- [ ] Confirm whether this should live under the existing route or as a new route/view.

Relevant files:
- `src/routes/services/business.tsx`
- `src/routes/booking/corporate.tsx`
- `src/components/CorporateBooking.tsx`
- `src/lib/pricing/corporate.ts`
- `src/components/LanguageProvider.tsx`

## 9. Remove classic fleet hero videos

- [ ] Remove the visible video from the Rolls-Royce Silver Cloud II page.
- [ ] Remove the visible video from the Rolls-Royce Silver Shadow page.
- [ ] Check the remaining classic fleet pages to make sure no hero videos are still wired in.

Relevant files:
- `src/routes/classic/rolls-royce-silver-cloud-ii.tsx`
- `src/routes/classic/rolls-royce-silver-shadow.tsx`
- `src/components/CarDetail.tsx`
- `public/cloud-1.mp4`
- `public/shadow.mp4`

## Cross-cutting follow-up

- [ ] Update translations for any new strings added to the UI.
- [ ] Re-test every booking flow end to end after the structural changes.
- [ ] Re-run TypeScript checks because the booking logic is shared across UI, pricing helpers, and server routes.

Relevant files:
- `src/components/LanguageProvider.tsx`
- `src/routeTree.gen.ts`
- `src/routes/api/payments/create-checkout-session.ts`
- `src/components/*.tsx`
