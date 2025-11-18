type LatLng = { lat: number; lng: number };

const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY;
if (!GEOCODING_API_KEY) {
  throw new Error('Missing GEOCODING_API_KEY environment variable');
}

/**
 * Convert an address string to lat/lng using Google Geocoding API (server-side).
 * Returns the best match or throws an error.
 */
export async function geocodeAddress(address: string): Promise<LatLng> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?${address}?${GEOCODING_API_KEY}`;

  const res = await fetch(url, { method: 'GET' });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Geocoding API HTTP ${res.status}: ${body}`);
  }

  const data = await res.json();

  // Basic response handling per Google docs:
  // - status: OK, ZERO_RESULTS, OVER_QUERY_LIMIT, REQUEST_DENIED, INVALID_REQUEST, UNKNOWN_ERROR
  if (data.status === 'OK' && Array.isArray(data.results) && data.results.length > 0) {
    const loc = data.results[0].geometry.location;
    return { lat: loc.lat, lng: loc.lng };
  }

  // Helpful error message for debugging
  const errMsg = `Geocoding failed: status=${data.status}, error_message=${data.error_message || 'none'}`;
  throw new Error(errMsg);
}

/**
 * Allows longitude/latitude lookup based on partial address information.
 * At least one of city, state, or zip_code must be provided.
 * Returns the best match or throws an error.
 */
export async function geocodePartialAddress(
  city?: string,
  state?: string,
  zip_code?: string,
): Promise<LatLng> {
  const addressParts: string[] = [];
  if (city) addressParts.push(city);
  if (state) addressParts.push(state);
  if (zip_code) addressParts.push(zip_code);

  if (addressParts.length === 0) {
    throw new Error('At least one of city, state, or zip_code must be provided for geocoding.');
  }

  const address = addressParts.join(',+');
  return geocodeAddress(address);
}
