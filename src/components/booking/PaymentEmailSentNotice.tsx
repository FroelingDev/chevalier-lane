import { CheckCircle } from "lucide-react";

interface PaymentEmailSentNoticeProps {
  title: string;
  message: string;
  emailLabel: string;
  email: string;
}

export default function PaymentEmailSentNotice({
  title,
  message,
  emailLabel,
  email,
}: PaymentEmailSentNoticeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-lg shadow-luxury p-12 border border-luxury-gold/20">
          <CheckCircle className="h-20 w-20 text-luxury-gold mx-auto mb-6" />
          <h1 className="text-4xl luxury-display text-luxury-black mb-6">
            {title}
          </h1>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {message}
          </p>
          <div className="bg-luxury-gold/5 p-6 rounded-lg border border-luxury-gold/10">
            <p className="text-sm text-gray-600">
              {emailLabel}{" "}
              <span className="font-semibold text-luxury-black">{email}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
