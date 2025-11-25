import { useFocusEffect, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import CenteredActivityIndicator from '@/src/components/CenteredActivityIndicator';
import ThemedView from '@/src/components/ThemedView';
import ScheduledDonationCardList from '@/src/components/lists/ScheduledDonationCardList';
import {
  getAllCharityScheduledDonations,
  loadScheduledDonations,
} from '@/src/stores/charityScheduledDonations';
import { ScheduledDonation } from '@/src/types/DonationItem/ScheduledDonation';

export default function Donations() {
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState<ScheduledDonation[]>([]);

  const router = useRouter();

  // set donation state
  useFocusEffect(() => {
    loadScheduledDonations().then(() => {
      setDonations(getAllCharityScheduledDonations());
      setLoading(false);
    });
  });

  const handleCardPress = (scheduledDonation: ScheduledDonation): void => {
    router.push(
      `/charity/pages/charityDonationDetails?dateString=${scheduledDonation.scheduledDate.toJSON()}&pid=${scheduledDonation.pid}`,
    );
  };

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
        <ScheduledDonationCardList
          onCardPress={handleCardPress}
          scheduledDonations={donations}
          screenType="charity"
        />
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
