import React, { useState } from 'react';
import { Text, Card } from 'react-native-paper';

import { ElectronicsItem } from '@/src/types/DonationItem/DonationItem.types';

type ElectronicsItemCardProps = {
  item: ElectronicsItem;
};

export default function ElectronicsItemCard({ item }: ElectronicsItemCardProps) {
  const [electronicsItem] = useState(item);
  return (
    <>
      <Text variant="titleMedium" style={{ marginTop: 10 }}>
        Electronics
      </Text>
      <Card>
        <Card.Title
          title={electronicsItem.itemName}
          subtitle={`${electronicsItem.notes}\n${electronicsItem.type}`}
        />
      </Card>
    </>
  );
}
