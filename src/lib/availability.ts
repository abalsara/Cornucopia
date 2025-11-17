import { supabase } from './supabase';
import { Time } from '../types/Time';
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

export const insertAvailability = async (
  cid: string,
  day_of_week: number,
  open_time: Date,
  close_time: Date,
  is_closed?: boolean,
): Promise<void> => {
  console.log(`open: ${open_time.toTimeString().substring(0, 5)}`);

  const { error } = await supabase.from('Availability').insert({
    cid,
    day_of_week,
    open_time: open_time.toTimeString().substring(0, 5), // format HH:MM
    close_time: close_time.toTimeString().substring(0, 5),
    is_closed: is_closed ?? false,
  });
  if (error) throw new Error(`Error while calling insertAvailability: ${error.message}`);
};
