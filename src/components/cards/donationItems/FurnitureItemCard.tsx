import React, { useState } from 'react';
import { Text, Card } from 'react-native-paper';

import { FurnitureItem } from '@/src/types/DonationItem/DonationItem.types';

type FurnitureItemCardProps = {
  item: FurnitureItem;
};

export default function FurnitureItemCard({ item }: FurnitureItemCardProps) {
  const [furnitureItem] = useState(item);
  return (
    <>
      <Text variant="titleMedium" style={{ marginTop: 10 }}>
        Furniture
      </Text>
      <Card>
        <Card.Title
          title={furnitureItem.itemName}
          subtitle={`${furnitureItem.notes}\n${furnitureItem.type}`}
        />
      </Card>
    </>
  );
}
