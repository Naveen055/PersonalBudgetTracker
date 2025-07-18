import { useState } from "react";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useRecurrenceStore } from "@/store/recurrenceStore";
import { getMonthDates, isDateInRecurrence, isDateInCurrentMonth } from "@/utils/recurrenceUtils";
import { format, addMonths, subMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MiniCalendarPreview() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const getRecurringDates = useRecurrenceStore((state) => state.getRecurringDates);

  const recurringDates = getRecurringDates();
  const monthDates = getMonthDates(currentMonth.getFullYear(), currentMonth.getMonth());

  const dayHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className="bg-gradient-to-br from-primary/5 to-blue-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        <Eye className="mr-2 h-5 w-5 text-primary inline" />
        Calendar Preview
      </h3>
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={previousMonth}
            className="p-1 hover:bg-gray-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h4 className="font-semibold text-gray-900">
            {format(currentMonth, 'MMMM yyyy')}
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextMonth}
            className="p-1 hover:bg-gray-100"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {dayHeaders.map((day) => (
            <div key={day} className="text-xs text-gray-500 p-2 font-medium">
              {day}
            </div>
          ))}
          {monthDates.map((date, index) => {
            const isInCurrentMonth = isDateInCurrentMonth(date, currentMonth);
            const isRecurring = isDateInRecurrence(date, recurringDates);
            
            return (
              <div
                key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${index}`}
                className={cn(
                  "text-sm p-2 relative",
                  isInCurrentMonth ? "text-gray-900" : "text-gray-400",
                  isRecurring && isInCurrentMonth
                    ? "bg-primary text-primary-foreground rounded-full font-medium"
                    : ""
                )}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
