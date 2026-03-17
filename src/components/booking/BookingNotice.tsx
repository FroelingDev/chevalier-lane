interface BookingNoticeProps {
  message: string;
  tone?: "warning" | "info";
}

export default function BookingNotice({
  message,
  tone = "warning",
}: BookingNoticeProps) {
  const toneClasses =
    tone === "warning"
      ? "border-amber-300 bg-amber-50 text-amber-900"
      : "border-luxury-gold/30 bg-luxury-gold/5 text-luxury-black";

  return (
    <div className={`rounded-lg border px-4 py-3 text-sm ${toneClasses}`}>
      {message}
    </div>
  );
}
