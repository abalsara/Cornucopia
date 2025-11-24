import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import Navbar from '@/src/components/bars/Navbar';
import ActionButton from '@/src/components/buttons/ActionButton';
import DonationItemCardList from '@/src/components/lists/DonationItemCardList';
import { supabase } from '@/src/lib/supabase';
import { getCharity } from '@/src/stores/charities';
import { getSavedDonations } from '@/src/stores/savedDonations';
import { getSavedSchedule } from '@/src/stores/savedSchedule';
import { setScheduledDonation } from '@/src/stores/scheduledDonations';
import { formatDate, formatTime } from '@/src/util/dateTimeFormatter';

/**
 * This page is shown to the donor after selecting a donation drop off time,
 * but has not yet been confirmed
 */
export default function ReviewAndConfirmPage() {
  const { cid } = useLocalSearchParams<{ cid: string }>(); // the charity ID
  const charity = getCharity(cid);
  if (!charity) throw new Error(`Charity with cid: ${cid} does not exist`);

  const router = useRouter();
  const donationItems = getSavedDonations();
  const date = getSavedSchedule();
  if (!date) throw new Error('date is undefined');

  const getFormattedDateTime = (): string => {
    return `${formatDate(date)} at ${formatTime(date)}`;
  };

  const handleConfirmPress = async (): Promise<void> => {
    // TODO: insert date into db
    const user = await supabase.auth.getUser();
    const pid = user.data.user?.id;
    if (!pid) throw new Error('user id is undefined');
    setScheduledDonation(cid, pid, donationItems, date);
    router.push(`/pages/donationConfirmedPage?cid=${cid}`);
  };

  return (
    <ThemedView>
      <Navbar title={charity.c_name} />
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
            <Text variant="bodyLarge">{charity.c_name}</Text>
            <Text variant="bodyLarge">{charity.address}</Text>
            <Text variant="bodyLarge">
              {charity.city}, {charity.state} {charity.zip_code}
            </Text>
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
