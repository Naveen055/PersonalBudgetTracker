import { Card } from "@/components/ui/card";
import RecurrenceOptions from "./RecurrenceOptions";
import RecurrenceSettings from "./RecurrenceSettings";
import DaySelector from "./DaySelector";
import MonthlyPatternPicker from "./MonthlyPatternPicker";
import DateRangePicker from "./DateRangePicker";
import MiniCalendarPreview from "./MiniCalendarPreview";
import SummaryPreview from "./SummaryPreview";
import { Button } from "@/components/ui/button";
import { useRecurrenceStore } from "@/store/recurrenceStore";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

export default function RecurringDatePicker() {
  const { toast } = useToast();
  const recurrenceType = useRecurrenceStore((state) => state.recurrenceType);

  const handleSave = () => {
    toast({
      title: "Recurrence Saved",
      description: "Your recurring date configuration has been saved successfully.",
    });
  };

  const handleCancel = () => {
    toast({
      title: "Cancelled",
      description: "Changes have been cancelled.",
    });
  };

  return (
    <Card className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Controls */}
          <div className="lg:col-span-2 space-y-6">
            <RecurrenceOptions />
            <RecurrenceSettings />
            
            {recurrenceType === 'weekly' && <DaySelector />}
            {recurrenceType === 'monthly' && <MonthlyPatternPicker />}
            
            <DateRangePicker />
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <MiniCalendarPreview />
            <SummaryPreview />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="px-6 py-3"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="px-6 py-3"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Recurrence
          </Button>
        </div>
      </div>
    </Card>
  );
}
