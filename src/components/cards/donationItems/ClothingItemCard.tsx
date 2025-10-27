import { useState } from 'react';
import { Card, Text } from 'react-native-paper';

import { ClothingItem } from '@/src/types/DonationItem/DonationItem.types';

type ClothingItemCardProps = {
  item: ClothingItem;
};

export default function ClothingItemCard({ item }: ClothingItemCardProps) {
  const [clothingItem] = useState(item);
  return (
    <>
      <Text variant="titleMedium" style={{ marginTop: 10 }}>
        Clothing
      </Text>
      <Card>
        <Card.Title
          title={clothingItem.itemName}
          subtitle={`${clothingItem.notes}\n${clothingItem.ageGroup} — ${clothingItem.gender}`}
        />
      </Card>
    </>
  );
}
