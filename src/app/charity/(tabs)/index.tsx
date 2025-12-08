import { useFocusEffect, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import CenteredActivityIndicator from '@/src/components/CenteredActivityIndicator';
import ThemedView from '@/src/components/ThemedView';
import ScheduledDonationCardList from '@/src/components/lists/ScheduledDonationCardList';
import {
  getAllCharityScheduledDonations,
  loadScheduledDonations,
} from '@/src/stores/charityScheduledDonations';
import { ScheduledDonation } from '@/src/types/DonationItem/ScheduledDonation';

/**
 * Displays all donations that donors have scheduled with the charity
 * associated with the logged in admin.
 */
export default function Donations() {
  const theme = useTheme();
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
        <View style={styles.header}>
          <Text variant="headlineLarge" style={styles.headerTitle}>
            Donations
          </Text>
          <Text
            variant="bodyMedium"
            style={[styles.subtitle, { color: theme.colors.onBackground }]}>
            View donations scheduled by donors for your charity
          </Text>
        </View>

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
  header: {
    marginBottom: 12,
  },
  headerTitle: {
    fontWeight: '500',
  },
  subtitle: {
    marginTop: 6,
  },
});
