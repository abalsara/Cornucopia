import { supabase } from './supabase';
import { Tables } from '../types/database.types';

export type Availability = Tables<'Availability'>;

/**
 * Fetches all availability records associated with a specific charity.
 *
 * Queries the `Availability` table for rows where the `id` column matches
 * the provided charity ID (`cid`). Returns all matching availability entries.
 *
 * @param {string} cid - The charity ID used to filter availability records.
 * @returns {Promise<Availability[]>}
 * A promise resolving to an array of availability records.
 * The array may be empty if no availability exists for the given ID.
 *
 * @throws {Error}
 * Throws if the Supabase query fails.
 */
export const fetchAvailabilityByCid = async (cid: string): Promise<Availability[]> => {
  const { data, error } = await supabase.from('Availability').select().eq('cid', cid);
  if (error) throw new Error(`Error while calling fetchAvailability: ${error.message}`);

  const availability: Availability[] = data;
  return availability;
};
