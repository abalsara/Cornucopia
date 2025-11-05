// Import required libraries and modules
import { assertEquals } from 'jsr:@std/assert@1';
// deno-lint-ignore no-unversioned-import
import { load } from 'jsr:@std/dotenv';
import { SupabaseClient } from 'npm:@supabase/supabase-js@2.76.1';

// Will load the .env file to Deno.env
import testSupabaseClient from '../_shared/supabaseClient.ts';

await load({
  envPath: '.env.local', // Path to your Expo .env.local file
  export: true, // Export variables to Deno.env
});

// Test the creation and functionality of the Supabase client
const testClientCreation = async () => {
  const client: SupabaseClient = testSupabaseClient;

  // Test a simple query to the database
  const { data: table_data, error: table_error } = await client
    .from('Profiles')
    .select('*')
    .limit(1);

  assertEquals(table_data, null);
  assertEquals(table_error?.message, 'permission denied for table Profiles');
};

// Register and run the tests
Deno.test('Non-Admin Client Creation Test', testClientCreation);
