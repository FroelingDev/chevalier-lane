import { COUNTRY_CODE_OPTIONS } from "@/lib/booking";

interface PhoneFieldProps {
  label: string;
  countryCode: string;
  phoneNumber: string;
  onCountryCodeChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  placeholder?: string;
}

export default function PhoneField({
  label,
  countryCode,
  phoneNumber,
  onCountryCodeChange,
  onPhoneNumberChange,
  placeholder,
}: PhoneFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="grid grid-cols-[180px_1fr] gap-3">
        <select
          value={countryCode}
          onChange={(e) => onCountryCodeChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
        >
          {COUNTRY_CODE_OPTIONS.map((option) => (
            <option key={option.code} value={option.code}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="tel"
          required
          value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
