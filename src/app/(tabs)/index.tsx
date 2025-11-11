import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import ScheduledDonationCardList from '@/src/components/lists/ScheduledDonationCardList';
import 'react-native-url-polyfill/auto';
import { ScheduledDonation } from '@/src/types/DonationItem/ScheduledDonation';

export default function Index() {
  const router = useRouter();

  const handleCardPress = (scheduledDonation: ScheduledDonation): void => {
    router.push(
      `/pages/donationDetailsPage?cid=${scheduledDonation.cid}&date=${scheduledDonation.scheduledDate.toJSON()}`,
    );
  };

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
