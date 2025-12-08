import { computeAvgRating } from '@/src/util/ratings';

describe('computeAvgRating', () => {
  const base = {
    cid: null,
    created_at: '2024-01-01T00:00:00Z',
    desc: null,
    pid: 'some-pid',
  };

  test('returns 0 for an empty array', () => {
    expect(computeAvgRating([])).toBe(0);
  });

  test('returns the star value when only one rating is present', () => {
    const ratings = [{ ...base, star: 4 }];
    expect(computeAvgRating(ratings)).toBe(4);
  });

  test('computes the correct average for multiple ratings', () => {
    const ratings = [
      { ...base, star: 5 },
      { ...base, star: 3 },
      { ...base, star: 4 },
    ];
    expect(computeAvgRating(ratings)).toBe(4);
  });

  test('ignores ratings with null stars', () => {
    const ratings = [
      { ...base, star: 5 },
      { ...base, star: null },
      { ...base, star: 1 },
    ];
    expect(computeAvgRating(ratings)).toBe(3); // (5 + 1) / 2
  });

  test('returns 0 when all stars are null', () => {
    const ratings = [
      { ...base, star: null },
      { ...base, star: null },
    ];
    expect(computeAvgRating(ratings)).toBe(0);
  });

  test('handles fractional averages correctly', () => {
    const ratings = [
      { ...base, star: 5 },
      { ...base, star: 4 },
    ];
    expect(computeAvgRating(ratings)).toBe(4.5);
  });

  test('treats star = 0 as a valid rating', () => {
    const ratings = [
      { ...base, star: 0 },
      { ...base, star: 5 },
    ];
    expect(computeAvgRating(ratings)).toBe(2.5);
  });

  test('works with multiple mixed values including null', () => {
    const ratings = [
      { ...base, star: null },
      { ...base, star: 2 },
      { ...base, star: null },
      { ...base, star: 4 },
      { ...base, star: 3 },
    ];
    expect(computeAvgRating(ratings)).toBe(3); // (2 + 4 + 3) / 3
  });
});
