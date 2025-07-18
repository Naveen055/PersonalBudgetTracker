import { Clock, Calendar, CalendarDays, CalendarCheck } from "lucide-react";
import { useRecurrenceStore, RecurrenceType } from "@/store/recurrenceStore";
import { cn } from "@/lib/utils";

const recurrenceOptions = [
  { type: 'daily' as RecurrenceType, label: 'Daily', icon: CalendarDays },
  { type: 'weekly' as RecurrenceType, label: 'Weekly', icon: Calendar },
  { type: 'monthly' as RecurrenceType, label: 'Monthly', icon: CalendarCheck },
  { type: 'yearly' as RecurrenceType, label: 'Yearly', icon: Calendar },
];

export default function RecurrenceOptions() {
  const { recurrenceType, setRecurrenceType } = useRecurrenceStore();

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        <Clock className="mr-2 h-5 w-5 text-primary inline" />
        Recurrence Type
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {recurrenceOptions.map(({ type, label, icon: Icon }) => (
          <button
            key={type}
            onClick={() => setRecurrenceType(type)}
            className={cn(
              "px-4 py-3 rounded-lg font-medium transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2",
              recurrenceType === type
                ? "bg-primary text-primary-foreground"
                : "bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
            )}
          >
            <Icon className="h-4 w-4 block mb-1 mx-auto" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
