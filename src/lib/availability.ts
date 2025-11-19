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

/**
 * Inserts a new availability entry for a given charity (`cid`) into the
 * `Availability` table. Time values are converted to `"HH:MM"` format before
 * being stored. If `is_closed` is not provided, it defaults to `false`.
 *
 * @param {string} cid - The charity ID associated with the availability record.
 * @param {number} day_of_week - The day of the week (0–6) the availability applies to.
 * @param {Date} open_time - The opening time as a JavaScript Date object.
 * @param {Date} close_time - The closing time as a JavaScript Date object.
 * @returns {Promise<void>} Resolves when the insert completes successfully.
 * @throws {Error} If the Supabase insert operation fails.
 */
export const insertAvailability = async (
  cid: string,
  day_of_week: number,
  open_time: Date,
  close_time: Date,
): Promise<void> => {
  console.log(`open: ${open_time.toTimeString().substring(0, 5)}`);

  const { error } = await supabase.from('Availability').insert({
    cid,
    day_of_week,
    open_time: open_time.toTimeString().substring(0, 5), // format HH:MM
    close_time: close_time.toTimeString().substring(0, 5),
  });
  if (error) throw new Error(`Error while calling insertAvailability: ${error.message}`);
};

/**
 * Deletes an availability record by its unique ID.
 *
 * @async
 * @function deleteAvailability
 * @param {string} id - The primary key of the availability record to delete.
 * @returns {Promise<void>} Resolves when the deletion is completed.
 * @throws {Error} If the Supabase delete operation fails.
 */
export const deleteAvailability = async (id: string): Promise<void> => {
  const { error } = await supabase.from('Availability').delete().eq('id', id);
  if (error) throw new Error(`Error while calling deleteAvailability: ${error.message}`);
};
