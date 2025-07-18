import { Settings } from "lucide-react";
import { useRecurrenceStore } from "@/store/recurrenceStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RecurrenceSettings() {
  const { recurrenceType, interval, setInterval } = useRecurrenceStore();

  const getUnitLabel = () => {
    switch (recurrenceType) {
      case 'daily':
        return interval === 1 ? 'day' : 'days';
      case 'weekly':
        return interval === 1 ? 'week' : 'weeks';
      case 'monthly':
        return interval === 1 ? 'month' : 'months';
      case 'yearly':
        return interval === 1 ? 'year' : 'years';
      default:
        return 'day(s)';
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        <Settings className="mr-2 h-5 w-5 text-primary inline" />
        Recurrence Settings
      </h3>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 font-medium">Every</span>
        <Select value={interval.toString()} onValueChange={(value) => setInterval(parseInt(value))}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-gray-700 font-medium">{getUnitLabel()}</span>
      </div>
    </div>
  );
}
