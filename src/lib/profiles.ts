import type { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

// Profile shape in the database. Add fields here as Schema is made and grows
export type Profile = {
  id: string; // matches auth user's id
  email?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  created_at?: string | null;
};

/**
 * Create or update a profile row for a Supabase Auth user.
 * This upserts into the 'profiles' table which should exist in your DB.
 *
 * Contract:
 * - Input: Supabase User object
 * - Output: the upserted profile row or throws an error
 */
export async function createOrUpdateProfile(user: User) {
  if (!user || !user.id) throw new Error("Invalid user");

  const profile: Partial<Profile> = {
    id: user.id,
    email: user.email ?? null,
    created_at: new Date().toISOString(),
  };

  const { data, error } = await supabase.from<Profile>("profiles").upsert(profile, {
    onConflict: "id",
  });

  if (error) throw error;
  return data?.[0] ?? null;
}

export async function getProfile(id: string) {
  const { data, error } = await supabase.from<Profile>("profiles").select("*").eq("id", id).single();
  if (error) throw error;
  return data as Profile;
}
