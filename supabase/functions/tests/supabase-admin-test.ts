// Import required libraries and modules
import { assert } from "jsr:@std/assert@1";
import { SupabaseClient } from "npm:@supabase/supabase-js@2.76.1";

// Will load the .env file to Deno.env
// deno-lint-ignore no-unversioned-import
import { load } from "jsr:@std/dotenv";
import testSupabaseAdmin from "../_shared/supabaseAdmin.ts";

await load({
  envPath: ".env.local", // Path to your Expo .env.local file
  export: true, // Export variables to Deno.env
});

// Test the creation and functionality of the Supabase client
const testClientCreation = async () => {
  const client: SupabaseClient = testSupabaseAdmin;

  // Test a simple query to the database
  const { data: table_data, error: table_error } = await client
    .from("Profiles")
    .select("*")
    .limit(1);
  if (table_error) {
    throw new Error("Invalid Supabase client: " + table_error.message);
  }
  assert(table_data, "Data should be returned from the query.");
};

// Register and run the tests
Deno.test("Admin Client Creation Test", testClientCreation);
