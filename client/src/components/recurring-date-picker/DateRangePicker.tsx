import { CalendarRange } from "lucide-react";
import { useRecurrenceStore } from "@/store/recurrenceStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

export default function DateRangePicker() {
  const { startDate, endDate, setStartDate, setEndDate } = useRecurrenceStore();

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setStartDate(date);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      const date = new Date(value);
      setEndDate(date);
    } else {
      setEndDate(null);
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        <CalendarRange className="mr-2 h-5 w-5 text-primary inline" />
        Date Range
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate" className="text-sm font-medium text-gray-700 mb-2 block">
            Start Date *
          </Label>
          <Input
            id="startDate"
            type="date"
            value={format(startDate, 'yyyy-MM-dd')}
            onChange={handleStartDateChange}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="endDate" className="text-sm font-medium text-gray-700 mb-2 block">
            End Date (Optional)
          </Label>
          <Input
            id="endDate"
            type="date"
            value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
            onChange={handleEndDateChange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
