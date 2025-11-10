import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Divider, List, Portal, Text, useTheme } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import DonationItemCardList from '@/src/components/lists/DonationItemCardList';
import DonationItemModalRead from '@/src/components/modals/DonationItemModalRead';
import { getCharity } from '@/src/stores/charities';
import { getScheduledDonation, removeScheduledDonation } from '@/src/stores/scheduledDonations';
import { DonationItem } from '@/src/types/DonationItem/DonationItem.types';
import { formatDate, formatTime } from '@/src/util/dateTimeFormatter';

export default function DonationDetailsPage() {
  const { cid, date } = useLocalSearchParams<{ cid: string; date: string }>();
  const scheduledDate = new Date(date);
  const scheduledDonation = getScheduledDonation(cid, scheduledDate);
  if (!scheduledDonation)
    throw new Error(`scheduledDonation with cid '${cid}' and date '${date}' is undefined`);

  const charity = getCharity(scheduledDonation.cid);
  const [selectedItem, setSelecteditem] = useState<DonationItem | undefined>(undefined);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const handleCardPress = (item: DonationItem): void => {
    setSelecteditem(item);
    setModalIsVisible(true);
  };

  const handleCancelDonationPress = (): void => {
    removeScheduledDonation(scheduledDonation.cid, scheduledDonation.scheduledDate);
    router.dismissAll();
  };

  if (!charity) throw new Error(`Charity with id '${scheduledDonation.cid}' is undefined`);
  return (
    <Portal.Host>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="" />
        <Appbar.Action
          icon="information"
          onPress={() => router.push('/pages/howDropoffWorksPage')}
        />
      </Appbar.Header>
      <DonationItemModalRead
        item={selectedItem}
        isVisible={modalIsVisible}
        setIsVisible={setModalIsVisible}
      />
      <ThemedView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text variant="titleLarge">Donation Details</Text>
            <Text>{charity.c_name}</Text>
          </View>
          <Divider style={styles.divider} />
          <ScrollView>
            <View style={styles.section}>
              <Text variant="titleLarge">Location & Logistics</Text>

              <View style={styles.labelView}>
                <Text variant="labelLarge">Location</Text>
                <Text>{charity.address}</Text>
                <Text>
                  {charity.city}, {charity.state} {charity.zip_code}
                </Text>
              </View>

              <View style={styles.labelView}>
                <Text variant="labelMedium">Date & Time</Text>
                <Text>
                  {formatDate(scheduledDonation.scheduledDate)} at{' '}
                  {formatTime(scheduledDonation.scheduledDate)}
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text variant="titleLarge">Your Donation</Text>
              <DonationItemCardList items={scheduledDonation.items} onCardPress={handleCardPress} />
            </View>

            <View style={styles.section}>
              <Text variant="titleLarge">More Actions</Text>
              <List.Section>
                <List.Item
                  left={() => (
                    <FontAwesome6 name="message" size={24} color={theme.colors.onBackground} />
                  )}
                  right={() => (
                    <Entypo name="chevron-right" size={24} color={theme.colors.onBackground} />
                  )}
                  title="Message Charity"
                />
                <List.Item
                  left={() => <Feather name="x" size={24} color={theme.colors.onBackground} />}
                  right={() => (
                    <Entypo name="chevron-right" size={24} color={theme.colors.onBackground} />
                  )}
                  title="Cancel Donation"
                  onPress={handleCancelDonationPress}
                />
              </List.Section>
            </View>
          </ScrollView>
        </View>
      </ThemedView>
    </Portal.Host>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  container: {
    marginHorizontal: 20,
  },
  divider: {
    marginTop: 20,
    height: 1,
  },
  labelView: {
    marginTop: 10,
  },
  section: {
    marginVertical: 20,
  },
});
