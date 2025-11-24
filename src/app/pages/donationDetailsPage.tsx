import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { JSX, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Divider, List, Portal, Text, useTheme } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import DonationItemCardList from '@/src/components/lists/DonationItemCardList';
import DonationItemModalRead from '@/src/components/modals/DonationItemModalRead';
import { getCharity } from '@/src/stores/charities';
import { getScheduledDonation, removeScheduledDonation } from '@/src/stores/scheduledDonations';
import { DonationItem } from '@/src/types/DonationItem/DonationItem.types';
import { formatDate, formatTime } from '@/src/util/dateTimeFormatter';

/**
 * This page renders information about a scheduled donation including
 * the charity name, location, list of DonationItems, and scheduled dropoff time
 */
export default function DonationDetailsPage() {
  const { cid, date } = useLocalSearchParams<{ cid: string; date: string }>();
  const scheduledDate = new Date(date);
  const scheduledDonation = getScheduledDonation(cid, scheduledDate);
  if (!scheduledDonation)
    throw new Error(`scheduledDonation with cid '${cid}' and date '${date}' is undefined`);

  const charity = getCharity(scheduledDonation.cid);
  if (!charity) throw new Error(`Charity with id '${scheduledDonation.cid}' is undefined`);

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

  const renderStatusBanner = (): JSX.Element | undefined => {
    if (scheduledDonation.fulfilled) {
      return (
        <View
          style={{
            ...styles.banner,
            borderColor: theme.colors.secondary,
          }}>
          <Text style={{ color: theme.colors.secondary, margin: 4 }}>
            This donation was marked as received
          </Text>
        </View>
      );
    }
    const now = new Date();
    const expired = now.getTime() - scheduledDonation.scheduledDate.getTime() > 0;
    if (expired) {
      return (
        <View
          style={{
            ...styles.banner,
            borderColor: theme.colors.error,
          }}>
          <Text style={{ color: theme.colors.error, margin: 4 }}>This donation has expired</Text>
        </View>
      );
    }
  };

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
          <View>
            <Text variant="headlineMedium">Donation Details</Text>
            {renderStatusBanner()}
            <Text variant="titleLarge">{charity.c_name}</Text>
          </View>
          <ScrollView>
            <View style={styles.section}>
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
  container: {
    marginHorizontal: 20,
  },
  labelView: {
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
  },
  banner: {
    minHeight: 60,
    marginVertical: 12,
    borderWidth: 2,
  },
});
