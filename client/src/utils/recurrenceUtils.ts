import { format, isWithinInterval, startOfMonth, endOfMonth, startOfDay } from 'date-fns';

export function formatDate(date: Date): string {
  return format(date, 'MMMM d, yyyy');
}

export function formatDateShort(date: Date): string {
  return format(date, 'MMM d');
}

export function getDayName(dayIndex: number): string {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return dayNames[dayIndex];
}

export function getDayAbbr(dayIndex: number): string {
  const dayAbbr = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return dayAbbr[dayIndex];
}

export function getMonthDates(year: number, month: number): Date[] {
  const dates: Date[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // Add padding for previous month
  const startPadding = firstDay.getDay();
  for (let i = startPadding - 1; i >= 0; i--) {
    dates.push(new Date(year, month, -i));
  }
  
  // Add current month dates
  for (let day = 1; day <= lastDay.getDate(); day++) {
    dates.push(new Date(year, month, day));
  }
  
  // Add padding for next month
  const endPadding = 42 - dates.length; // 6 weeks * 7 days
  for (let i = 1; i <= endPadding; i++) {
    dates.push(new Date(year, month + 1, i));
  }
  
  return dates;
}

export function isDateInRecurrence(date: Date, recurringDates: Date[]): boolean {
  const targetDate = startOfDay(date);
  return recurringDates.some(recurringDate => 
    startOfDay(recurringDate).getTime() === targetDate.getTime()
  );
}

export function isDateInCurrentMonth(date: Date, currentMonth: Date): boolean {
  return date.getMonth() === currentMonth.getMonth() && 
         date.getFullYear() === currentMonth.getFullYear();
}
