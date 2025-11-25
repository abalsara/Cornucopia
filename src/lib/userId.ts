import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL ? process.env.EXPO_PUBLIC_SUPABASE_URL : '',
  process.env.EXPO_PUBLIC_SUPABASE_KEY ? process.env.EXPO_PUBLIC_SUPABASE_KEY : '',
);

export async function getCurrentUserId() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching user:', error.message);
    return null;
  }

  if (user) {
    console.log('Current user ID:', user.id);
    return user.id;
  } else {
    console.log('No user is currently signed in.');
    return null;
  }
}
