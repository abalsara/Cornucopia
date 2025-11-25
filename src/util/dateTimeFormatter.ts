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
 * Converts a time string (e.g., `"14:30"`) into a formatted 12-hour time string
 * using the `formatTime` utility. If the input is `null` or empty, `undefined`
 * is returned.
 *
 * This helper is useful when time values are stored as `"HH:MM"` strings (such
 * as those coming from supabase) but need to be displayed in user-friendly
 * AM/PM format.
 *
 * @param {string | null} time - A time string in `"HH:MM"` format, or `null` if no time is available.
 * @returns {string | undefined} A formatted time string (e.g., `"2:30 PM"`), or `undefined` if input is invalid.
 */
export const formatTimeFromString = (time: string | null): string | undefined => {
  if (!time) return undefined;

  const [h, m] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(h, m);
  return formatTime(date);
};

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
