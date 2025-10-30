import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import ActionButton from '@/src/components/buttons/ActionButton';
import { getSavedSchedule } from '@/src/stores/savedSchedule';
import { formatDate, formatTime } from '@/src/util/dateTimeFormatter';

export default function DonationConfirmedPage() {
  const router = useRouter();

  const getConfirmationString = (): string => {
    const date = getSavedSchedule();
    if (!date) throw new Error('date is undefined');
    return `You have successfully scheduled your donation with Charity Name on ${formatDate(date)} at ${formatTime(date)}`;
  };

  const handleButtonPress = (): void => {
    router.dismissAll();
    router.replace('/(tabs)/myDonations');
  };

  return (
    <ThemedView>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text variant="headlineMedium">Congrats</Text>
          <Text variant="bodyLarge">{getConfirmationString()}</Text>
        </View>

        <View>
          <ActionButton label="View Donation Details" onPress={handleButtonPress} />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 30,
    flex: 1,
  },
  contentContainer: {
    marginVertical: 10,
    flex: 1,
  },
  buttonContainer: {
    marginBottom: 30,
  },
});
