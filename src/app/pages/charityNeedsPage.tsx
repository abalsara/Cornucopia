import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Divider, Portal, Text } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import CharityNeedsNavbar from '@/src/components/bars/CharityNeedsNavbar';
import Navbar from '@/src/components/bars/Navbar';
import CharityNeedsList from '@/src/components/lists/CharityNeedsList';
import DonationItemModal from '@/src/components/modals/DonationItemModal';
import { getCharityNeedsDummy } from '@/src/lib/donationItems';
import { saveDonation, resetSavedDonations, getSavedDonations } from '@/src/stores/savedDonations';
import { DonationItem } from '@/src/types/DonationItem/DonationItem.types';

/**
 * This page renders a list of a charity's needs grouped by category
 */
export default function CharityNeedsPage() {
  const { cid } = useLocalSearchParams<{ cid: string }>(); // the charity ID
  const items = getCharityNeedsDummy(cid); // Donation items that the charity needs

  // only allow user to select items after clicking the 'start your donation' button
  const [inSelectStage, setInSelectStage] = useState(false);

  const [selectedItem, setSelecteditem] = useState<DonationItem | undefined>(undefined);
  const [donations, setDonations] = useState<DonationItem[]>([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const handleStartDonationPress = (): void => {
    resetSavedDonations();
    setInSelectStage(true);
  };

  const handleCardPress = (item: DonationItem): void => {
    setSelecteditem(item);
    setModalIsVisible(true);
  };

  const handleAddDonationPress = (item: DonationItem): void => {
    saveDonation(item);
    setDonations(getSavedDonations());
    setModalIsVisible(false);
  };

  return (
    <ThemedView>
      <Portal.Host>
        <Navbar title="Example Charity" />
        <DonationItemModal
          item={selectedItem}
          isVisible={modalIsVisible}
          setIsVisible={setModalIsVisible}
          onAddDonationPress={handleAddDonationPress}
        />
        <ScrollView style={{ marginHorizontal: 20 }}>
          <Text variant="titleLarge">Needs</Text>
          <CharityNeedsList
            items={items}
            onCardPress={inSelectStage ? handleCardPress : undefined}
          />
        </ScrollView>
        <Divider />

        <CharityNeedsNavbar
          inSelectStage={inSelectStage}
          onStartDonation={handleStartDonationPress}
          donations={donations}
        />
      </Portal.Host>
    </ThemedView>
  );
}
