import { create } from 'zustand';
import { addDays, addWeeks, addMonths, addYears, format, isAfter, isBefore, startOfDay } from 'date-fns';

export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type MonthlyPattern = 'dayOfMonth' | 'dayOfWeek' | 'lastDay';

export interface RecurrenceState {
  // Basic settings
  recurrenceType: RecurrenceType;
  interval: number;
  
  // Weekly settings
  selectedDays: boolean[]; // [Sun, Mon, Tue, Wed, Thu, Fri, Sat]
  
  // Monthly settings
  monthlyPattern: MonthlyPattern;
  dayOfMonth: number;
  weekOfMonth: number; // 1-4 for first/second/third/fourth, -1 for last
  dayOfWeek: number; // 0-6 for Sun-Sat
  
  // Date range
  startDate: Date;
  endDate: Date | null;
  
  // Actions
  setRecurrenceType: (type: RecurrenceType) => void;
  setInterval: (interval: number) => void;
  setSelectedDays: (days: boolean[]) => void;
  toggleDay: (dayIndex: number) => void;
  setMonthlyPattern: (pattern: MonthlyPattern) => void;
  setDayOfMonth: (day: number) => void;
  setWeekOfMonth: (week: number) => void;
  setDayOfWeek: (day: number) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date | null) => void;
  
  // Computed
  getRecurringDates: () => Date[];
  getSummaryText: () => string;
  getOccurrenceCount: () => number;
}

export const useRecurrenceStore = create<RecurrenceState>((set, get) => ({
  // Initial state
  recurrenceType: 'daily',
  interval: 1,
  selectedDays: [false, true, false, true, false, true, false], // Mon, Wed, Fri
  monthlyPattern: 'dayOfMonth',
  dayOfMonth: 15,
  weekOfMonth: 2,
  dayOfWeek: 2, // Tuesday
  startDate: new Date(2024, 0, 15), // Jan 15, 2024
  endDate: new Date(2024, 11, 31), // Dec 31, 2024
  
  // Actions
  setRecurrenceType: (type) => set({ recurrenceType: type }),
  setInterval: (interval) => set({ interval }),
  setSelectedDays: (days) => set({ selectedDays: days }),
  toggleDay: (dayIndex) => set((state) => ({
    selectedDays: state.selectedDays.map((selected, index) => 
      index === dayIndex ? !selected : selected
    )
  })),
  setMonthlyPattern: (pattern) => set({ monthlyPattern: pattern }),
  setDayOfMonth: (day) => set({ dayOfMonth: day }),
  setWeekOfMonth: (week) => set({ weekOfMonth: week }),
  setDayOfWeek: (day) => set({ dayOfWeek: day }),
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  
  // Computed values
  getRecurringDates: () => {
    const state = get();
    const dates: Date[] = [];
    const maxDates = 200; // Limit to prevent infinite loops
    
    let currentDate = startOfDay(state.startDate);
    const endDate = state.endDate ? startOfDay(state.endDate) : null;
    
    for (let i = 0; i < maxDates; i++) {
      if (endDate && isAfter(currentDate, endDate)) {
        break;
      }
      
      let shouldInclude = false;
      
      switch (state.recurrenceType) {
        case 'daily':
          shouldInclude = true;
          break;
        case 'weekly':
          shouldInclude = state.selectedDays[currentDate.getDay()];
          break;
        case 'monthly':
          // For monthly, we need to check if current date matches the pattern
          if (state.monthlyPattern === 'dayOfMonth') {
            shouldInclude = currentDate.getDate() === state.dayOfMonth;
          } else if (state.monthlyPattern === 'dayOfWeek') {
            const dayOfWeek = currentDate.getDay();
            const weekOfMonth = Math.ceil(currentDate.getDate() / 7);
            shouldInclude = dayOfWeek === state.dayOfWeek && weekOfMonth === state.weekOfMonth;
          } else if (state.monthlyPattern === 'lastDay') {
            const dayOfWeek = currentDate.getDay();
            const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
            const daysFromEnd = daysInMonth - currentDate.getDate();
            shouldInclude = dayOfWeek === state.dayOfWeek && daysFromEnd < 7;
          }
          break;
        case 'yearly':
          shouldInclude = currentDate.getMonth() === state.startDate.getMonth() && 
                         currentDate.getDate() === state.startDate.getDate();
          break;
      }
      
      if (shouldInclude) {
        dates.push(new Date(currentDate));
      }
      
      // Move to next date based on recurrence type
      switch (state.recurrenceType) {
        case 'daily':
          currentDate = addDays(currentDate, state.interval);
          break;
        case 'weekly':
          currentDate = addDays(currentDate, 1);
          break;
        case 'monthly':
          currentDate = addDays(currentDate, 1);
          break;
        case 'yearly':
          currentDate = addYears(currentDate, state.interval);
          break;
      }
    }
    
    return dates;
  },
  
  getSummaryText: () => {
    const state = get();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayAbbr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    let summaryText = '';
    
    switch (state.recurrenceType) {
      case 'daily':
        summaryText = state.interval === 1 ? 'Every day' : `Every ${state.interval} days`;
        break;
      case 'weekly':
        const selectedDayNames = state.selectedDays
          .map((selected, index) => selected ? dayNames[index] : null)
          .filter(Boolean);
        
        if (selectedDayNames.length === 0) {
          summaryText = 'No days selected';
        } else if (state.interval === 1) {
          summaryText = `Every week on ${selectedDayNames.join(', ')}`;
        } else {
          summaryText = `Every ${state.interval} weeks on ${selectedDayNames.join(', ')}`;
        }
        break;
      case 'monthly':
        if (state.monthlyPattern === 'dayOfMonth') {
          summaryText = state.interval === 1 
            ? `Every month on day ${state.dayOfMonth}`
            : `Every ${state.interval} months on day ${state.dayOfMonth}`;
        } else if (state.monthlyPattern === 'dayOfWeek') {
          const ordinal = ['1st', '2nd', '3rd', '4th'][state.weekOfMonth - 1];
          summaryText = state.interval === 1
            ? `Every month on the ${ordinal} ${dayNames[state.dayOfWeek]}`
            : `Every ${state.interval} months on the ${ordinal} ${dayNames[state.dayOfWeek]}`;
        } else if (state.monthlyPattern === 'lastDay') {
          summaryText = state.interval === 1
            ? `Every month on the last ${dayNames[state.dayOfWeek]}`
            : `Every ${state.interval} months on the last ${dayNames[state.dayOfWeek]}`;
        }
        break;
      case 'yearly':
        summaryText = state.interval === 1 ? 'Every year' : `Every ${state.interval} years`;
        break;
    }
    
    return summaryText;
  },
  
  getOccurrenceCount: () => {
    return get().getRecurringDates().length;
  }
}));
