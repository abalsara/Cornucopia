import { Availability } from '../lib/availability';

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
 * Returns the day-of-week index (0–6) for a given date string.
 *
 * The input date string must be in a format that the JavaScript `Date`
 * constructor can parse (such as "YYYY-MM-DD"). The result follows the
 * standard `Date.getDay()` convention:

 * @param {string} dateStr - A date string parsable by the JavaScript `Date` constructor.
 * @returns {number} An integer from 0 to 6 representing the day of the week.
 * @throws {Error} If the provided string cannot be parsed into a valid Date.
 */
export function getDayIndexFromDate(dateStr: string): number {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date string: ${dateStr}`);
  }
  return date.getDay(); // 0–6
}

/**
 * Computes the list of day-of-week indices (0–6) that have **no availability**
 * in the given Availability array.

 * This function returns all days (0–6) that do *not* appear in any of the
 * availability records.
 *
 * @param {Availability[]} availability - An array of availability objects.
 * @returns {number[]} A list of day indices (0–6) where availability is missing.
 */
export const getUnavailableDays = (availability: Availability[]): number[] => {
  const days = [0, 1, 2, 3, 4, 5, 6];
  const available = new Set();
  for (const a of availability) {
    available.add(a.day_of_week);
  }

  return days.filter((day) => {
    return !available.has(day);
  });
};

/**
 * Converts "HH:MM" → minutes since midnight.
 */
export const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/**
 * Converts minutes since midnight → "HH:MM".
 */
export const toHHMM = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (h < 12) {
    return `${h}:${String(m).padStart(2, '0')} am`;
  }
  return `${h === 12 ? 12 : h % 12}:${String(m).padStart(2, '0')} pm`;
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
