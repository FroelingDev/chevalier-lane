import { createFileRoute, Link } from "@tanstack/react-router";
import { useLanguage } from "@/components/LanguageProvider";

export const Route = createFileRoute("/booking/payment-cancel")({
  validateSearch: (search: Record<string, unknown>) => ({
    bookingType:
      typeof search.bookingType === "string" ? search.bookingType : undefined,
  }),
  component: PaymentCancelPage,
});

function PaymentCancelPage() {
  const { t } = useLanguage();
  const search = Route.useSearch();
  const returnLink =
    search.bookingType === "tour"
      ? { to: "/booking/tours", label: t("Back to Tours") }
      : search.bookingType === "one-way"
        ? { to: "/booking/one-way", label: t("Book another transfer") }
        : search.bookingType === "airport"
          ? { to: "/booking/airport", label: t("Book another transfer") }
          : search.bookingType === "corporate"
            ? { to: "/booking/corporate", label: t("Book another transfer") }
            : { to: "/booking/wedding", label: t("Back to Wedding Bookings") };

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white flex items-center justify-center px-4">
      <div className="max-w-xl mx-auto text-center bg-white rounded-lg shadow-luxury p-10 border border-luxury-gold/20">
        <h1 className="text-4xl luxury-display text-luxury-black mb-4">
          {t("Checkout paused")}
        </h1>
        <p className="text-gray-700 mb-6">
          {t(
            "Your reservation is still in place. You can restart payment anytime using the email link we sent, or return to the booking page below.",
          )}
        </p>
        <div className="flex flex-col gap-3">
          <Link to={returnLink.to} className="btn-luxury-premium inline-block">
            {returnLink.label}
          </Link>
          <Link to="/" className="text-sm text-luxury-gold hover:underline">
            {t("Return Home")}
          </Link>
        </div>
      </div>
    </div>
  );
}
