import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Portal, Text } from 'react-native-paper';

import CenteredActivityIndicator from '@/src/components/CenteredActivityIndicator';
import ThemedView from '@/src/components/ThemedView';
import ActionButton from '@/src/components/buttons/ActionButton';
import DonationItemCardList from '@/src/components/lists/DonationItemCardList';
import DonationItemModalRead from '@/src/components/modals/DonationItemModalRead';
import { getProfile, Profile } from '@/src/lib/profiles';
import { getCharityScheduledDonation } from '@/src/stores/charityScheduledDonations';
import { DonationItem } from '@/src/types/DonationItem/DonationItem.types';
import { ScheduledDonation } from '@/src/types/DonationItem/ScheduledDonation';
import { formatDate, formatTime } from '@/src/util/dateTimeFormatter';

export default function CharityDonationDetails() {
  const { dateString, pid } = useLocalSearchParams<{ dateString: string; pid: string }>();

  const [loading, setLoading] = useState(true);
  const [donor, setDonor] = useState<Profile | undefined>(undefined);
  const [donation, setDonation] = useState<ScheduledDonation | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DonationItem | undefined>(undefined);
  const router = useRouter();

  const date = new Date(dateString);
  useEffect(() => {
    getProfile(pid).then((profile) => {
      setDonor(profile);
      setDonation(getCharityScheduledDonation(date, pid));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <ThemedView>
        <CenteredActivityIndicator />
      </ThemedView>
    );
  }

  if (!donor) throw new Error('Donor is undefined');
  if (!donation) throw new Error('Donation is undefined');

  const handleCardPress = (item: DonationItem): void => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <ThemedView>
      <Portal.Host>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => router.back()} />
        </Appbar.Header>
        <View style={styles.container}>
          <View style={{ gap: 2 }}>
            <Text variant="headlineMedium">Donation Details</Text>
            <Text variant="bodyLarge">
              {donor.first_name} {donor.last_name}
            </Text>
            <Text variant="bodyLarge">{formatDate(date)}</Text>
            <Text variant="bodyLarge">{formatTime(date)}</Text>
          </View>

          <View>
            <Text variant="headlineMedium">Donation</Text>
            <ScrollView>
              <DonationItemCardList items={donation.items} onCardPress={handleCardPress} />
            </ScrollView>
          </View>
        </View>
        <Portal>
          <DonationItemModalRead
            isVisible={modalVisible}
            setIsVisible={setModalVisible}
            item={selectedItem}
          />
        </Portal>
        <View style={styles.button}>
          <ActionButton label="Review & Complete Donation" onPress={() => {}} />
        </View>
      </Portal.Host>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    gap: 20,
    flex: 1,
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 16,
  },
});
