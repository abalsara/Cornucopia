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
    .from('charities')
    .upsert([charity], { onConflict: 'admin' })
    .select()
    .single();

  if (error) throw error;
  if (!data) throw new Error('No charity returned from upsert');

  return data;
}

/**
 * Retrieves a charity from the `charities` table in the database.
 *
 * @param adminId - The unique user ID associated with the charity.
 * @returns A Promise that resolves to a Charity object.
 * @throws If the charity cannot be found or a database error occurs.
 */
export async function getCharityByAdmin(adminId: string): Promise<Charity> {
  if (!adminId) throw new Error('adminId is required');

  const { data, error } = await supabase
    .from('charities')
    .select('*')
    .eq('admin', adminId)
    .single();

  if (error) throw error;
  if (!data) throw new Error('Charity not found');

  return data;
}
