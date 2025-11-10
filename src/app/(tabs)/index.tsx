import { Session } from '@supabase/supabase-js';
import { Redirect, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import ScheduledDonationCardList from '@/src/components/lists/ScheduledDonationCardList';
import { fetchAllCharities } from '@/src/lib/charities';
import { supabase } from '@/src/lib/supabase';
import 'react-native-url-polyfill/auto';
import { initCharitiesStore } from '@/src/stores/charities';
import { ScheduledDonation } from '@/src/types/DonationItem/ScheduledDonation';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  const handleCardPress = (scheduledDonation: ScheduledDonation): void => {
    router.push(
      `/pages/donationDetailsPage?cid=${scheduledDonation.cid}&date=${scheduledDonation.scheduledDate.toJSON()}`,
    );
  };

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
        <ScheduledDonationCardList onCardPress={handleCardPress} />
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
