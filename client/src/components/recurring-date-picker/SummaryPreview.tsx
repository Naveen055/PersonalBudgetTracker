import { FileText, CheckCircle, Calendar, TrendingUp } from "lucide-react";
import { useRecurrenceStore } from "@/store/recurrenceStore";
import { formatDate } from "@/utils/recurrenceUtils";

export default function SummaryPreview() {
  const { 
    startDate, 
    endDate, 
    selectedDays, 
    getSummaryText, 
    getOccurrenceCount,
    recurrenceType 
  } = useRecurrenceStore();

  const summaryText = getSummaryText();
  const occurrenceCount = getOccurrenceCount();

  const getSelectedDaysText = () => {
    if (recurrenceType !== 'weekly') return null;
    
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const selectedDayNames = selectedDays
      .map((selected, index) => selected ? dayNames[index] : null)
      .filter(Boolean);
    
    return selectedDayNames.length > 0 ? selectedDayNames.join(', ') : 'No days selected';
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        <FileText className="mr-2 h-5 w-5 text-emerald-500 inline" />
        Summary
      </h3>
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="space-y-3">
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-gray-900 font-medium">{summaryText}</p>
              {getSelectedDaysText() && (
                <p className="text-sm text-gray-600">{getSelectedDaysText()}</p>
              )}
            </div>
          </div>
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-gray-900 font-medium">From {formatDate(startDate)}</p>
              <p className="text-sm text-gray-600">
                {endDate ? `to ${formatDate(endDate)}` : 'with no end date'}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <TrendingUp className="h-5 w-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-gray-900 font-medium">{occurrenceCount} occurrences</p>
              <p className="text-sm text-gray-600">in the selected period</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
