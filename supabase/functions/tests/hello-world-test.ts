// Import required libraries and modules
import { assertEquals } from "jsr:@std/assert@1";
import { SupabaseClient } from "npm:@supabase/supabase-js@2.76.1";

// Will load the .env file to Deno.env
// deno-lint-ignore no-unversioned-import
import { load } from "jsr:@std/dotenv";
import testSupabaseAdmin from "../_shared/supabaseAdmin.ts";

await load({
  envPath: ".env.local", // Path to your Expo .env.local file
  export: true, // Export variables to Deno.env
});

// Test the 'hello-world' function
const testHelloWorld = async () => {
  const client: SupabaseClient = testSupabaseAdmin;

  // Invoke the 'hello-world' function with a parameter
  const { data: func_data, error: func_error } = await client.functions.invoke(
    "hello-world",
    {
      body: { name: "bar" },
    },
  );

  // Check for errors from the function invocation
  if (func_error) {
    throw new Error("Invalid response: " + func_error.message);
  }

  // Log the response from the function
  console.log(JSON.stringify(func_data, null, 2));

  // Assert that the function returned the expected result
  assertEquals(func_data.message, "Hello bar!");
};

// Register and run the tests
Deno.test("Hello-world Function Test", testHelloWorld);
