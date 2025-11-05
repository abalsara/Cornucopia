import { Session } from '@supabase/supabase-js';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import ScheduledDonationCardList from '@/src/components/lists/ScheduledDonationCardList';
import { supabase } from '@/src/lib/supabase';
import 'react-native-url-polyfill/auto';
import { fetchAllCharities } from '@/src/lib/charities';
import { initCharitiesStore } from '@/src/stores/charities';

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

    // initialize global state
    fetchAllCharities().then((charities) => initCharitiesStore(charities));
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
        <Redirect href="/auth" />
      </ThemedView>
    );
  }

  return (
    <ThemedView>
      <View style={styles.container}>
        <Text>Upcoming</Text>
        <ScheduledDonationCardList />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    gap: 12,
  },
});
