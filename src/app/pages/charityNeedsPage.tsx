import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { ActivityIndicator, Divider, Portal, Text } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import CharityNeedsNavbar from '@/src/components/bars/CharityNeedsNavbar';
import Navbar from '@/src/components/bars/Navbar';
import CharityNeedsList from '@/src/components/lists/CharityNeedsList';
import DonationItemModalEdit from '@/src/components/modals/DonationItemModalEdit';
import { getCharityNeeds } from '@/src/lib/needs';
import { getCharity } from '@/src/stores/charities';
import { saveDonation, resetSavedDonations, getSavedDonations } from '@/src/stores/savedDonations';
import { DonationItem } from '@/src/types/DonationItem/DonationItem.types';

/**
 * This page renders a list of a charity's needs grouped by category
 */
export default function CharityNeedsPage() {
  const { cid } = useLocalSearchParams<{ cid: string }>(); // the charity ID
  const charity = getCharity(cid);
  if (!charity) throw new Error(`Charity with cid: ${cid} does not exist`);

  const [items, setItems] = useState<DonationItem[]>([]);

  // only allow user to select items after clicking the 'start your donation' button
  const [inSelectStage, setInSelectStage] = useState(false);

  const [selectedItem, setSelecteditem] = useState<DonationItem | undefined>(undefined);
  const [donations, setDonations] = useState<DonationItem[]>([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCharityNeeds(cid)
      .then((fetchedItems) => {
        setItems(fetchedItems);
        setLoading(false);
      })
      .catch((error) => {
        throw new Error(`An unexpected error occured at getCharityNeeds: ${error}`);
      });
  }, [cid]);

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

  if (loading) {
    return (
      <ThemedView>
        <ActivityIndicator style={{ marginVertical: 'auto' }} />
      </ThemedView>
    );
  }

  return (
    <ThemedView>
      <Portal.Host>
        <Navbar title={charity.c_name} />
        <Portal>
          <DonationItemModalEdit
            item={selectedItem}
            isVisible={modalIsVisible}
            setIsVisible={setModalIsVisible}
            onAddDonationPress={handleAddDonationPress}
            key={selectedItem?.itemName ?? ''}
          />
        </Portal>

        <ScrollView style={{ marginHorizontal: 20 }}>
          <Text variant="titleLarge">Needs</Text>
          <CharityNeedsList
            items={items}
            onCardPress={inSelectStage ? handleCardPress : undefined}
          />
        </ScrollView>
        <Divider />

        <CharityNeedsNavbar
          cid={cid}
          inSelectStage={inSelectStage}
          onStartDonation={handleStartDonationPress}
          donations={donations}
        />
      </Portal.Host>
    </ThemedView>
  );
}
