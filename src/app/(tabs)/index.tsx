import { Session } from '@supabase/supabase-js';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import Navbar from '@/src/components/bars/Navbar';
import ScheduledDonationCard from '@/src/components/cards/ScheduledDonationCard';
import { supabase } from '@/src/lib/supabase';
import 'react-native-url-polyfill/auto';
import { getScheduledDonations } from '@/src/stores/scheduledDonations';

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
        <Redirect href="/auth" />
      </ThemedView>
    );
  }

  const scheduledDonations = getScheduledDonations();
  return (
    <ThemedView>
      <Navbar title="My Donations" backButtonShown={false} />
      <View style={styles.container}>
        <Text>Upcoming</Text>
        {scheduledDonations.map((scheduledDonation) => (
          <ScheduledDonationCard
            cid={scheduledDonation.cid}
            schedule={scheduledDonation.scheduledDate}
            key={`${scheduledDonation.cid}${scheduledDonation.scheduledDate}`}
          />
        ))}
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
