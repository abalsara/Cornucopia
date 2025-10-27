import React, { useState } from 'react';
import { Text, Card } from 'react-native-paper';

import { UncategorizedItem } from '@/src/types/DonationItem/DonationItem.types';

type UncategorizedItemCardProps = {
  item: UncategorizedItem;
};

export default function UncategorizedItemCard({ item }: UncategorizedItemCardProps) {
  const [uncategorizedItem] = useState(item);
  return (
    <>
      <Text variant="titleMedium" style={{ marginTop: 10 }}>
        Uncategorized
      </Text>
      <Card>
        <Card.Title title={uncategorizedItem.itemName} subtitle={uncategorizedItem.notes} />
      </Card>
    </>
  );
}
