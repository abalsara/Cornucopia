// Import required libraries and modules
import { createClient } from 'npm:@supabase/supabase-js@2.76.1';

// Will load the .env file to Deno.env
// deno-lint-ignore no-unversioned-import
import { load } from 'jsr:@std/dotenv';

await load({
  envPath: '.env.local', // Path to your Expo .env.local file
  export: true, // Export variables to Deno.env
});

// Set up the configuration for the Supabase client
const supabaseUrl = Deno.env.get('TEST_SUPABASE_URL') ?? '';
const supabaseKey = Deno.env.get('TEST_SUPABASE_KEY') ?? '';
const options = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
};

const testSupabaseClient = createClient(supabaseUrl, supabaseKey, options);

export default testSupabaseClient;
