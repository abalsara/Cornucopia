import type { User } from '@supabase/supabase-js';

import { supabase } from './supabase';
import { Tables } from '../types/database.types';

// Profile shape in the database. Regenerate 'database.types.ts' as Schema is made and grows
export type Profile = Tables<'Profiles'>;

/**
 * Create or update a profile row for a Supabase Auth user.
 * This upserts into the 'Profiles' table which should exist in DB.
 *
 * Contract:
 * - Input: Supabase User object
 * - Output: the upserted profile row or throws an error
 */
export async function createOrUpdateProfile(user: User): Promise<Profile> {
  if (!user || !user.id) throw new Error('Invalid user');

  const profile: Partial<Profile> = {
    id: user.id,
    email: user.email ?? null,
    created_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('Profiles')
    .upsert(profile, {
      onConflict: 'id',
    })
    .select()
    .single();
  if (error) throw error;

  const responseProfile: Profile = data;
  return responseProfile;
}

/**
 * Retrieves a user profile from the `Profiles` table in the database.
 *
 * @param id - The unique user ID associated with the desired profile.
 * @returns A Promise that resolves to a Profile object.
 * @throws If the profile cannot be found or a database error occurs.
 */
export async function getProfile(id: string): Promise<Profile> {
  const { data, error } = await supabase.from('Profiles').select().eq('id', id).single();
  if (error) throw error;

  const profile: Profile = data;
  return profile;
}

/**
 * Updates specific fields of a user profile in the database.
 *
 * @param id - The unique user ID of the profile to update.
 * @param updates - Partial profile object containing fields to update.
 * @returns A Promise that resolves to the updated Profile object.
 * @throws If the update fails or a database error occurs.
 */
export async function updateProfile(id: string, updates: Partial<Profile>): Promise<Profile> {
  if (!id) throw new Error('Profile ID is required');

  const { data, error } = await supabase
    .from('Profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  const profile: Profile = data;
  return profile;
}
