import { Stack } from "expo-router";
import { useEffect } from "react";
import { createOrUpdateProfile } from "../lib/profiles";
import { supabase } from "../lib/supabase";

export default function RootLayout() {
  useEffect(() => {
    // Create a profile row for any user that signs in.
    // We attach this listener at the app root so it runs once.
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === "INITIAL_SESSION" || event === "USER_UPDATED") && session?.user) {
        // log any errors to console.
        createOrUpdateProfile(session.user).catch((err) => {
          // eslint-disable-next-line no-console
          console.error("createOrUpdateProfile error:", err);
        });
      }
    });

    return () => listener?.subscription?.unsubscribe();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
