import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/booking/payment-cancel")({
  component: PaymentCancelPage,
});

function PaymentCancelPage() {
  const search = Route.useSearch<{ bookingType?: string }>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white flex items-center justify-center px-4">
      <div className="max-w-xl mx-auto text-center bg-white rounded-lg shadow-luxury p-10 border border-luxury-gold/20">
        <h1 className="text-4xl luxury-display text-luxury-black mb-4">
          Payment canceled
        </h1>
        <p className="text-gray-700 mb-6">
          No worries — your Cal.com booking is still reserved. You can restart checkout anytime using the email link we sent or return to the booking page below.
        </p>
        <div className="flex flex-col gap-3">
          {search.bookingType === "tour" ? (
            <Link to="/booking/tours" className="btn-luxury-premium inline-block">
              Back to Tours
            </Link>
          ) : (
            <Link to="/booking/wedding" className="btn-luxury-premium inline-block">
              Back to Wedding Bookings
            </Link>
          )}
          <Link to="/" className="text-sm text-luxury-gold hover:underline">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
