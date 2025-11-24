import { useFocusEffect } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import CenteredActivityIndicator from '@/src/components/CenteredActivityIndicator';
import ThemedView from '@/src/components/ThemedView';
import ScheduledDonationCardList from '@/src/components/lists/ScheduledDonationCardList';
import { getCharityScheduledDonations } from '@/src/lib/donation';
import { ScheduledDonation } from '@/src/types/DonationItem/ScheduledDonation';

export default function Donations() {
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState<ScheduledDonation[]>([]);

  // set donation state
  useFocusEffect(() => {
    getCharityScheduledDonations().then((scheduledDonations) => {
      setDonations(scheduledDonations);
      setLoading(false);
    });
  });

  if (loading) {
    return (
      <ThemedView>
        <CenteredActivityIndicator />
      </ThemedView>
    );
  }

  return (
    <ThemedView>
      <View style={styles.container}>
        <ScheduledDonationCardList scheduledDonations={donations} screenType="charity" />
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
