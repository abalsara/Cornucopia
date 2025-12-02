import { useFocusEffect, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import CenteredActivityIndicator from '@/src/components/CenteredActivityIndicator';
import ThemedView from '@/src/components/ThemedView';
import ScheduledDonationCardList from '@/src/components/lists/ScheduledDonationCardList';
import 'react-native-url-polyfill/auto';
import { getScheduledDonations, loadScheduledDonations } from '@/src/stores/scheduledDonations';
import { ScheduledDonation } from '@/src/types/DonationItem/ScheduledDonation';

/**
 * Displays all donations that the currently logged-in donor has scheduled with charities.
 */
export default function Index() {
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState<ScheduledDonation[] | undefined>(undefined);
  const router = useRouter();

  // Initialize the state store on first load
  useEffect(() => {
    loadScheduledDonations().then(() => {
      setDonations(getScheduledDonations());
      setLoading(false);
    });
  }, []);

  // Load the donations from the store whenever the tab is focused except for first load
  useFocusEffect(() => {
    if (!loading) {
      setDonations(getScheduledDonations());
    }
  });

  const handleCardPress = (scheduledDonation: ScheduledDonation): void => {
    router.push(
      `/pages/donationDetailsPage?cid=${scheduledDonation.cid}&date=${scheduledDonation.scheduledDate.toJSON()}`,
    );
  };

  if (loading || donations === undefined) {
    return (
      <ThemedView>
        <CenteredActivityIndicator />
      </ThemedView>
    );
  }

  return (
    <ThemedView>
      <View style={styles.container}>
        <Text>Upcoming</Text>
        <ScrollView>
          <ScheduledDonationCardList
            scheduledDonations={donations}
            onCardPress={handleCardPress}
            screenType="donor"
          />
        </ScrollView>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    gap: 12,
    flex: 1,
  },
});
