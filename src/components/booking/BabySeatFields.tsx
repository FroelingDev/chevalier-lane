interface BabySeatFieldsProps {
  title: string;
  needsBabySeat: boolean;
  babySeatCount: string;
  onNeedsBabySeatChange: (value: boolean) => void;
  onBabySeatCountChange: (value: string) => void;
}

export default function BabySeatFields({
  title,
  needsBabySeat,
  babySeatCount,
  onNeedsBabySeatChange,
  onBabySeatCountChange,
}: BabySeatFieldsProps) {
  return (
    <div className="md:col-span-2 rounded-lg border border-luxury-gold/15 bg-luxury-gold/5 p-4">
      <div className="text-sm font-medium text-gray-700 mb-3">{title}</div>
      <div className="flex items-center gap-6">
        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
          <input
            type="radio"
            name={`${title}-needs-baby-seat`}
            checked={needsBabySeat}
            onChange={() => onNeedsBabySeatChange(true)}
            className="h-4 w-4 border-gray-300 text-luxury-gold focus:ring-luxury-gold"
          />
          Yes
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
          <input
            type="radio"
            name={`${title}-needs-baby-seat`}
            checked={!needsBabySeat}
            onChange={() => onNeedsBabySeatChange(false)}
            className="h-4 w-4 border-gray-300 text-luxury-gold focus:ring-luxury-gold"
          />
          No
        </label>
      </div>

      {needsBabySeat && (
        <div className="mt-4 max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Baby seat quantity
          </label>
          <select
            value={babySeatCount}
            onChange={(e) => onBabySeatCountChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-colors"
          >
            {[1, 2, 3].map((count) => (
              <option key={count} value={count.toString()}>
                {count}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
