import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import Navbar from '@/src/components/bars/Navbar';
import DonationItemCardList from '@/src/components/lists/DonationItemCardList';
import { getCharity } from '@/src/stores/charities';
import { getSavedDonations } from '@/src/stores/savedDonations';

/**
 * Renders a list of the donor's saved donation items as part of the
 * schedule a donation user flow
 */
export default function YourDonationPage() {
  const { cid } = useLocalSearchParams<{ cid: string }>(); // the charity ID
  const charity = getCharity(cid);
  if (!charity) throw new Error(`Charity with cid: ${cid} does not exist`);
  return (
    <ThemedView>
      <Navbar title={charity.c_name} />
      <View style={styles.container}>
        <Text variant="headlineMedium">Your Donation</Text>
        <DonationItemCardList items={getSavedDonations()} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
});
