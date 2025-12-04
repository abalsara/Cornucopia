import { fetchAdmin } from './admin';
import { supabase } from './supabase';
import { Tables } from '../types/database.types';

export type Availability = Tables<'Availability'>;

type AdminAvailability = {
  cid: string;
  availability: Availability[];
};

/**
 * Fetches the charity ID and full availability list for the currently
 * authenticated administrator.
 *
 * If the logged-in user is not a charity administrator or has no associated
 * charity (`cid`), the function returns `{ cid: null, availability: [] }`.
 *
 * @returns {Promise<{ cid: string | null, availability: Availability[] }>}
 *   An object containing the admin's `cid` (or `null` if none) and the list
 *   of availability records for that charity.
 *
 * @throws {Error} If fetching the admin or availability data fails unexpectedly.
 */
export const fetchAvailabilityByAdmin = async (): Promise<AdminAvailability> => {
  const admin = await fetchAdmin();
  if (!admin) {
    throw new Error('User is not a charity admin');
  }
  return {
    cid: admin.cid,
    availability: await fetchAvailabilityByCid(admin.cid),
  };
};

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
 * being stored.
 *
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
 * @param {string} id - The primary key of the availability record to delete.
 * @returns {Promise<void>} Resolves when the deletion is completed.
 * @throws {Error} If the Supabase delete operation fails.
 */
export const deleteAvailability = async (id: string): Promise<void> => {
  const { error } = await supabase.from('Availability').delete().eq('id', id);
  if (error) throw new Error(`Error while calling deleteAvailability: ${error.message}`);
};

export const insertAvailabilities = async (availabilities: Availability[]): Promise<void> => {
  const { error } = await supabase.from('Availability').insert(availabilities);
  if (error) throw new Error(`Error while calling insertAvailability: ${error.message}`);
};

export const deleteAvailabilities = async (cid: string): Promise<void> => {
  const { error } = await supabase.from('Availability').delete().eq('cid', cid);
  if (error) throw new Error(`Error while calling deleteAvailability: ${error.message}`);
};
