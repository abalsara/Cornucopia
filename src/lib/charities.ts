import type { User } from '@supabase/supabase-js';

import { supabase } from './supabase';
import { Tables } from '../types/database.types';

export type Charity = Tables<'Charities'>;

/**
 * Upsert a charity row (onConflict: "admin") and return the created/updated row.
 * Uses the passed user's id as the admin, c_name as the charity name
 */
export async function createCharity(user: User, c_name: string): Promise<Charity> {
  if (!user || !user.id) throw new Error('User with a valid id is required');

  const charity = {
    admin: user.id,
    name: c_name,
  };

  const { data, error } = await supabase
    .from('Charities')
    .upsert([charity], { onConflict: 'admin' })
    .select()
    .single();

  if (error) throw error;
  if (!data) throw new Error('No charity returned from upsert');

  return data;
}

/**
 * Retrieves a charity from the `Charities` table in the database.
 *
 * @param adminId - The unique user ID associated with the charity.
 * @returns A Promise that resolves to a Charity object.
 * @throws If the charity cannot be found or a database error occurs.
 */
export async function getCharityByAdmin(adminId: string): Promise<Charity> {
  if (!adminId) throw new Error('adminId is required');

  // First, get the charity ID from the admin table
  const { data: adminData, error: adminError } = await supabase
    .from('admin')
    .select('cid')
    .eq('uid', adminId)
    .single();

  if (adminError) throw adminError;
  if (!adminData?.cid) throw new Error('No charity associated with this admin');

  // Then get the charity details
  const { data, error } = await supabase
    .from('Charities')
    .select('*')
    .eq('cid', adminData.cid)
    .single();

  if (error) throw error;
  if (!data) throw new Error('Charity not found');

  return data;
}

/**
 * Retrieves all charities from the `Charities` table in the database.
 *
 * @returns A Promise that resolves to a Charity object.
 * @throws If a database error occurs.
 */
export async function fetchAllCharities(): Promise<Charity[]> {
  const { data, error } = await supabase.from('Charities').select('*');

  if (error) throw error;

  return data;
}

/**
 * Updates a charity in the `Charities` table in the database.
 *
 * @param cid - The unique charity ID.
 * @param updates - Partial charity data to update.
 * @returns A Promise that resolves to the updated Charity object.
 * @throws If the charity cannot be found or a database error occurs.
 */
export async function updateCharity(
  cid: string,
  updates: Partial<Omit<Charity, 'cid' | 'created_at'>>,
): Promise<Charity> {
  if (!cid) throw new Error('cid is required');

  const { data, error } = await supabase
    .from('Charities')
    .update(updates)
    .eq('cid', cid)
    .select()
    .single();

  if (error) throw error;
  if (!data) throw new Error('Charity not found');

  return data;
}
