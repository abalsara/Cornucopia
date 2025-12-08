import { calculateDistance } from '@/src/util/distance';

describe('calculateDistance', () => {
  test('returns 0 when coordinates are identical', () => {
    const result = calculateDistance(40, -74, 40, -74);
    expect(result).toBe(0);
  });

  test('calculates a known distance between two major cities (NYC → LA)', () => {
    // NYC: (40.7128, -74.0060)
    // LA:  (34.0522, -118.2437)
    // Expected distance ~ 2445 miles (approx)
    const result = calculateDistance(40.7128, -74.006, 34.0522, -118.2437);

    expect(result).toBeGreaterThan(2400);
    expect(result).toBeLessThan(2500);
  });

  test('calculates distance for short local distances (Golden Gate → Alcatraz)', () => {
    // Golden Gate Bridge: (37.8199, -122.4783)
    // Alcatraz Island:   (37.8270, -122.4230)
    // Expected distance ~ 3.1 miles
    const result = calculateDistance(37.8199, -122.4783, 37.827, -122.423);

    expect(result).toBeCloseTo(3.1, 0); // within ~1 decimal point
  });

  test('calculates distance across the equator', () => {
    const result = calculateDistance(-1, 30, 1, 30); // 2 degrees latitude
    // Roughly 138 miles
    expect(result).toBeCloseTo(138, 0);
  });

  test('calculates distance across the prime meridian', () => {
    const result = calculateDistance(10, -1, 10, 1); // 2 degrees longitude at latitude 10
    // Roughly ~ 136 miles
    expect(result).toBeCloseTo(136, 0);
  });

  test('handles negative coordinates properly (southern and western hemispheres)', () => {
    const result = calculateDistance(-33.865143, 151.2099, -37.8136, 144.9631); // Sydney → Melbourne
    // Expected ~ 443 miles
    expect(result).toBeCloseTo(443, -1);
  });
});
