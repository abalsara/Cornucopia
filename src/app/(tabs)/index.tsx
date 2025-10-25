import ThemedView from '@/src/components/ThemedView';
import { supabase } from '@/src/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import 'react-native-url-polyfill/auto';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <ThemedView>
        <ActivityIndicator />
      </ThemedView>
    );
  }
  if (!session || !session.user) {
    return (
      <ThemedView>
        <Redirect href={'/auth'} />
      </ThemedView>
    );
  }
  return (
    <ThemedView>
      <View style={styles.container}>
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
