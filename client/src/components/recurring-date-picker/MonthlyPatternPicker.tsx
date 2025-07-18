import { Grid3x3 } from "lucide-react";
import { useRecurrenceStore } from "@/store/recurrenceStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function MonthlyPatternPicker() {
  const { monthlyPattern, setMonthlyPattern, dayOfMonth, weekOfMonth, dayOfWeek } = useRecurrenceStore();

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const ordinals = ['1st', '2nd', '3rd', '4th'];

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        <Grid3x3 className="mr-2 h-5 w-5 text-primary inline" />
        Monthly Pattern
      </h3>
      <RadioGroup value={monthlyPattern} onValueChange={setMonthlyPattern} className="space-y-3">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="dayOfMonth" id="dayOfMonth" />
          <Label htmlFor="dayOfMonth" className="text-gray-700">
            On day <strong>{dayOfMonth}</strong> of the month
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="dayOfWeek" id="dayOfWeek" />
          <Label htmlFor="dayOfWeek" className="text-gray-700">
            On the <strong>{ordinals[weekOfMonth - 1]} {dayNames[dayOfWeek]}</strong> of the month
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="lastDay" id="lastDay" />
          <Label htmlFor="lastDay" className="text-gray-700">
            On the <strong>last {dayNames[dayOfWeek]}</strong> of the month
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
