import { CalendarCheck } from "lucide-react";
import { useRecurrenceStore } from "@/store/recurrenceStore";
import { getDayName, getDayAbbr } from "@/utils/recurrenceUtils";
import { cn } from "@/lib/utils";

export default function DaySelector() {
  const { selectedDays, toggleDay } = useRecurrenceStore();

  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayAbbreviations = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        <CalendarCheck className="mr-2 h-5 w-5 text-primary inline" />
        Select Days
      </h3>
      <div className="grid grid-cols-7 gap-2">
        {dayLabels.map((label, index) => {
          // Convert from Mon-Sun to Sun-Sat indexing
          const dayIndex = index === 6 ? 0 : index + 1;
          const isSelected = selectedDays[dayIndex];
          
          return (
            <div key={label} className="text-center">
              <div className="text-xs text-gray-500 mb-2">{label}</div>
              <button
                onClick={() => toggleDay(dayIndex)}
                className={cn(
                  "w-10 h-10 rounded-full font-medium transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  isSelected
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
                )}
              >
                {dayAbbreviations[index]}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
