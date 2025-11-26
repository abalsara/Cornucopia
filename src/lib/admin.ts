import { supabase } from './supabase';
import { Tables } from '../types/database.types';

export type Admin = Tables<'admin'>;

/**
 * Fetches the single admin record from the `admin` table.

 * @returns {Promise<Admin | undefined>}
 * A promise resolving to the admin record if found, otherwise `undefined`.
 *
 * @throws {Error}
 * Throws an error if the Supabase query fails.
 */
export const fetchAdmin = async (): Promise<Admin | undefined> => {
  const { data, error } = await supabase.from('admin').select().maybeSingle();
  if (error) throw new Error(`error while calling fetchAdmin: ${error}`);
  if (!data) return undefined;

  const admin: Admin = data;
  return admin;
};

/**
 * Gets an admin by their user id (uid). Used to fetch cid associated with admin.
 * @param uid user id
 * @returns the admin with the given uid, or null if not found
 */
export const getAdminByUid = async (uid: string): Promise<Admin | null> => {
  const { data, error } = await supabase.from('admin').select().eq('uid', uid).maybeSingle();
  if (error) throw new Error(`error while calling getAdminByUid: ${error}`);
  return data;
};
