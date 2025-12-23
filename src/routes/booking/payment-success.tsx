import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useLanguage } from "@/components/LanguageProvider";

type PaymentSuccessSearch = {
  session_id?: string;
  bookingType?: "wedding" | "tour" | "one-way";
};

interface PaymentStatusResponse {
  id: string;
  status: string | null;
  payment_status: string | null;
  amount_total: number | null;
  currency: string | null;
  metadata: Record<string, string>;
}

export const Route = createFileRoute("/booking/payment-success")({
  validateSearch: (search: Record<string, unknown>): PaymentSuccessSearch => ({
    session_id:
      typeof search.session_id === "string" && search.session_id.length > 0
        ? search.session_id
        : undefined,
    bookingType:
      search.bookingType === "wedding" ||
      search.bookingType === "tour" ||
      search.bookingType === "one-way"
        ? (search.bookingType as PaymentSuccessSearch["bookingType"])
        : undefined,
  }),
  component: PaymentSuccessPage,
});

function PaymentSuccessPage() {
  const { t } = useLanguage();
  const search = Route.useSearch();
  const [status, setStatus] = useState<PaymentStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search.session_id) {
      setError(t("Missing Stripe session reference"));
      return;
    }

    setLoading(true);
    setError(null);
    fetch(
      `/api/payments/status?session_id=${encodeURIComponent(search.session_id)}`,
    )
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(
            data?.error || t("Unable to confirm payment status"),
          );
        }
        return response.json() as Promise<PaymentStatusResponse>;
      })
      .then((data) => {
        setStatus(data);
      })
      .catch((err: unknown) => {
        console.error("Status fetch failed", err);
        setError(
          err instanceof Error
            ? err.message
            : t("Unable to confirm payment status"),
        );
      })
      .finally(() => setLoading(false));
  }, [search.session_id, t]);

  const amount =
    status?.amount_total && status.currency
      ? `${(status.amount_total / 100).toFixed(2)} ${status.currency.toUpperCase()}`
      : null;

  const secondaryLink =
    search.bookingType === "tour"
      ? { to: "/booking/tours", label: t("View other tours") }
      : search.bookingType === "one-way"
        ? { to: "/booking/one-way", label: t("Book another transfer") }
        : { to: "/booking/wedding", label: t("Back to wedding services") };

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center bg-white rounded-lg shadow-luxury p-10 border border-luxury-gold/20">
        <h1 className="text-4xl luxury-display text-luxury-black mb-4">
          {t("Thank you for your payment")}
        </h1>
        {loading && <p className="text-gray-600">{t("Checking Stripe...")}</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && (
          <div className="space-y-4">
            <p className="text-gray-700">
              {t(
                "We’ve received your booking details and the transaction is currently marked as",
              )}
              <span className="font-semibold text-luxury-black">
                {" "}
                {status?.payment_status || status?.status || t("processing")}
              </span>
              .
            </p>
            {amount && (
              <p className="text-gray-700">
                {t("Amount:")}{" "}
                <span className="font-semibold text-luxury-black">
                  {amount}
                </span>
              </p>
            )}
            <p className="text-gray-600 text-sm">
              {t(
                "A confirmation has been emailed to you. Our concierge will follow up shortly with final details.",
              )}
            </p>
          </div>
        )}
        <div className="mt-8 flex flex-col gap-3">
          <Link to="/" className="btn-luxury-premium inline-block">
            {t("Return Home")}
          </Link>
          <Link
            to={secondaryLink.to}
            className="text-sm text-luxury-gold hover:underline"
          >
            {secondaryLink.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
