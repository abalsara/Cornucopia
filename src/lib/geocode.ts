import { supabase } from './supabase';

type LatLng = { lat: number; lng: number };

/**
 * Convert an address string to lat/lng using Google Geocoding API (server-side).
 * Returns the best match or throws an error.
 */
export async function geocodeAddress(addressParam: string): Promise<LatLng> {
  const payload = { address: addressParam };
  const { data, error } = await supabase.functions.invoke('geocode-address', { body: payload });
  if (error) throw error;
  if (!data) throw new Error('No data returned from geocoding');
  return data as LatLng;
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
