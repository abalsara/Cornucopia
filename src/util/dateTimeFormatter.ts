/**
 * Formats a Date object into a string like "Tuesday, October 29th".
 *
 * @param date - The Date object to format
 * @returns A formatted date string
 */
export function formatDate(date: Date): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayOfMonth = date.getDate();

  const suffix = getOrdinalSuffix(dayOfMonth);

  return `${dayName}, ${monthName} ${dayOfMonth}${suffix}`;
}

/**
 * Formats a Date object into a string like "3:07 PM".
 *
 * @param date - The Date object to format
 * @returns A formatted time string
 */
export function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours >= 12 ? 'PM' : 'AM';
  const adjustedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${adjustedHours}:${formattedMinutes} ${period}`;
}

/**
 * Helper: Returns the ordinal suffix for a given day (e.g., "st", "nd", "rd", "th").
 */
function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}
