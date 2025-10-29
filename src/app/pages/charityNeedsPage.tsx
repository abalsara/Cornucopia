import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Divider, Portal, Text, Modal, useTheme, Button } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import CharityNeedsNavbar from '@/src/components/bars/CharityNeedsNavbar';
import CharityNeedsList from '@/src/components/lists/CharityNeedsList';
import DonationItemModal from '@/src/components/modals/DonationItemModal';
import { getCharityNeeds } from '@/src/lib/needs';
import { DonationItem } from '@/src/types/DonationItem/DonationItem.types';

export default function CharityNeedsPage() {
  const { cid } = useLocalSearchParams<{ cid: string }>();
  const items = getCharityNeeds(cid);
  const [inSelectStage, setInSelectStage] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [selectedItem, setSelecteditem] = useState<DonationItem | undefined>(undefined);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const handleStartDonationPress = (): void => {
    setInSelectStage(true);
  };

  const handleCardPress = (item: DonationItem): void => {
    setSelecteditem(item);
    setModalIsVisible(true);
  };

  const theme = useTheme();

  return (
    <ThemedView>
      <DonationItemModal
        item={selectedItem}
        isVisible={modalIsVisible}
        setIsVisible={setModalIsVisible}
      />
      <ScrollView style={{ marginHorizontal: 20 }}>
        <Text variant="titleLarge">Needs</Text>
        <CharityNeedsList items={items} onCardPress={handleCardPress} />
      </ScrollView>
      <Divider />

      <CharityNeedsNavbar
        inSelectStage={inSelectStage}
        onStartDonation={handleStartDonationPress}
        selectedItems={selectedItems}
      />
    </ThemedView>
  );
}
