import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import Navbar from '@/src/components/bars/Navbar';
import ActionButton from '@/src/components/buttons/ActionButton';
import DonationItemCardList from '@/src/components/lists/DonationItemCardList';
import { getSavedDonations } from '@/src/stores/savedDonations';
import { getSavedSchedule } from '@/src/stores/savedSchedule';
import { formatDate, formatTime } from '@/src/util/dateTimeFormatter';

export default function ReviewAndConfirmPage() {
  const router = useRouter();
  const donationItems = getSavedDonations();
  const date = getSavedSchedule();
  if (!date) throw new Error('date is undefined');

  const getFormattedDateTime = (): string => {
    return `${formatDate(date)} at ${formatTime(date)}`;
  };

  const handleConfirmPress = (): void => {
    // TODO: insert date into db
    router.push('/pages/donationConfirmedPage');
  };

  return (
    <ThemedView>
      <Navbar title="Example Charity" />
      <View style={styles.container}>
        <Text variant="headlineMedium">Review & Confirm</Text>
        <View style={styles.contentContainer}>
          <Text variant="titleLarge">Donation</Text>
          <ScrollView>
            <DonationItemCardList items={donationItems} />
          </ScrollView>
        </View>

        <View style={{ flex: 1 }}>
          <Text variant="titleLarge">Drop off</Text>

          <View style={styles.contentContainer}>
            <Text variant="labelLarge">Date</Text>
            <Text variant="bodyLarge">{getFormattedDateTime()}</Text>
          </View>

          <View style={styles.contentContainer}>
            <Text variant="titleMedium">Location</Text>
            <Text variant="bodyLarge">Example charity</Text>
            <Text variant="bodyLarge">Address</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <ActionButton label="Confirm" onPress={handleConfirmPress} />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    gap: 10,
  },
  contentContainer: {
    marginVertical: 10,
  },
  buttonContainer: {
    marginBottom: 30,
  },
});
