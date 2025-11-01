import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import Navbar from '@/src/components/bars/Navbar';
import DonationItemCardList from '@/src/components/lists/DonationItemCardList';
import { getSavedDonations } from '@/src/stores/savedDonations';

export default function YourDonationPage() {
  return (
    <ThemedView>
      <Navbar title="Example Charity" />
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
