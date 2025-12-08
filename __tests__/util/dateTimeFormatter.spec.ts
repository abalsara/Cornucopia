import {
  formatDate,
  formatTime,
  formatTimeFromString,
  getDayIndexFromDate,
  getUnavailableDays,
  toMinutes,
  toHHMM,
} from '@/src/util/dateTimeFormatter';

describe('formatDate', () => {
  it('formats a standard date correctly', () => {
    const date = new Date('2024-10-29T12:00:00'); // Tuesday, Oct 29
    expect(formatDate(date)).toBe('Tuesday, October 29th');
  });

  it('returns correct ordinal suffixes', () => {
    expect(formatDate(new Date('2024-01-01T12:00:00Z'))).toBe('Monday, January 1st');
    expect(formatDate(new Date('2024-01-02T12:00:00Z'))).toBe('Tuesday, January 2nd');
    expect(formatDate(new Date('2024-01-03T12:00:00Z'))).toBe('Wednesday, January 3rd');
    expect(formatDate(new Date('2024-01-04T12:00:00Z'))).toBe('Thursday, January 4th');
    expect(formatDate(new Date('2024-01-11T12:00:00Z'))).toBe('Thursday, January 11th'); // special case
    expect(formatDate(new Date('2024-01-13T12:00:00Z'))).toBe('Saturday, January 13th'); // special case
  });
});

describe('formatTime', () => {
  it('formats morning times correctly', () => {
    const date = new Date();
    date.setHours(9, 7); // 9:07 AM
    expect(formatTime(date)).toBe('9:07 AM');
  });

  it('formats noon as 12 PM', () => {
    const date = new Date();
    date.setHours(12, 0);
    expect(formatTime(date)).toBe('12:00 PM');
  });

  it('formats midnight as 12 AM', () => {
    const date = new Date();
    date.setHours(0, 15);
    expect(formatTime(date)).toBe('12:15 AM');
  });

  it('formats afternoon times correctly', () => {
    const date = new Date();
    date.setHours(15, 30); // 3:30 PM
    expect(formatTime(date)).toBe('3:30 PM');
  });
});

describe('formatTimeFromString', () => {
  it('returns undefined for null or empty', () => {
    expect(formatTimeFromString(null)).toBeUndefined();
    expect(formatTimeFromString('')).toBeUndefined();
  });

  it('correctly formats valid HH:MM strings', () => {
    expect(formatTimeFromString('14:30')).toBe('2:30 PM');
    expect(formatTimeFromString('09:05')).toBe('9:05 AM');
    expect(formatTimeFromString('00:00')).toBe('12:00 AM');
  });
});

describe('getDayIndexFromDate', () => {
  it('returns correct day index', () => {
    expect(getDayIndexFromDate('2024-10-29T12:00:00Z')).toBe(2); // Tuesday
  });

  it('throws error for invalid date', () => {
    expect(() => getDayIndexFromDate('not-a-date')).toThrow('Invalid date string: not-a-date');
  });
});

describe('getUnavailableDays', () => {
  it('returns days not in the availability list', () => {
    const availability = [{ day_of_week: 1 }, { day_of_week: 3 }, { day_of_week: 5 }] as any;

    expect(getUnavailableDays(availability)).toEqual([0, 2, 4, 6]);
  });

  it('returns all days when availability is empty', () => {
    expect(getUnavailableDays([])).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  it('returns empty list when all days are available', () => {
    const availability = [0, 1, 2, 3, 4, 5, 6].map((d) => ({ day_of_week: d })) as any;
    expect(getUnavailableDays(availability)).toEqual([]);
  });
});

describe('toMinutes', () => {
  it('converts HH:MM to minutes', () => {
    expect(toMinutes('00:00')).toBe(0);
    expect(toMinutes('01:00')).toBe(60);
    expect(toMinutes('12:30')).toBe(750);
    expect(toMinutes('23:59')).toBe(1439);
  });
});

describe('toHHMM', () => {
  it('converts minutes to HH:MM am/pm correctly', () => {
    expect(toHHMM(0)).toBe('0:00 am'); // midnight format given your code
    expect(toHHMM(60)).toBe('1:00 am');
    expect(toHHMM(12 * 60)).toBe('12:00 pm'); // noon
    expect(toHHMM(13 * 60 + 5)).toBe('1:05 pm');
  });

  it('handles minutes near end of day', () => {
    expect(toHHMM(23 * 60 + 59)).toBe('11:59 pm');
  });
});
