import RecurringDatePicker from "@/components/recurring-date-picker/RecurringDatePicker";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Recurring Date Picker</h1>
            <p className="text-gray-600">Configure your recurring schedule with precision</p>
          </div>

          <RecurringDatePicker />

          {/* Footer */}
          <div className="text-center mt-8 text-gray-500">
            <p className="text-sm">Recurring Date Picker Component • Built with React + TypeScript + Zustand</p>
          </div>
        </div>
      </div>
    </div>
  );
}
