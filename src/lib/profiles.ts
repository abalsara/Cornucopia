import type { User } from '@supabase/supabase-js';

import { supabase } from './supabase';
import { Tables } from '../types/database.types';

// Profile shape in the database. Regenerate 'database.types.ts' as Schema is made and grows
export type Profile = Tables<'Profiles'>;

/**
 * Create or update a profile row for a Supabase Auth user.
 * This upserts into the 'profiles' table which should exist in DB.
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
    .from('profiles')
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
 * Retrieves a user profile from the `profiles` table in the database.
 *
 * @param id - The unique user ID associated with the desired profile.
 * @returns A Promise that resolves to a Profile object.
 * @throws If the profile cannot be found or a database error occurs.
 */
export async function getProfile(id: string): Promise<Profile> {
  const { data, error } = await supabase.from('profiles').select().eq('id', id).single();
  if (error) throw error;

  const profile: Profile = data;
  return profile;
}
