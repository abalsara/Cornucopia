import { supabase } from '../lib/supabase';

export async function getCurrentUserId() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (!session?.user?.id) {
    console.log('No user session found.');
    return null;
  }

  if (error) {
    console.error('Error fetching user:', error.message);
    return null;
  }

  if (session) {
    console.log('Current user ID:', session.user.id);
    return session.user.id;
  } else {
    console.log('No user is currently signed in.');
    return null;
  }
}
