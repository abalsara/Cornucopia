import React, { useState } from 'react';
import { Text, Card } from 'react-native-paper';

import { HygieneItem } from '@/src/types/DonationItem/DonationItem.types';

type HygieneItemCardProps = {
  item: HygieneItem;
};

export default function HygieneItemCard({ item }: HygieneItemCardProps) {
  const [hygieneItem] = useState(item);
  return (
    <>
      <Text variant="titleMedium" style={{ marginTop: 10 }}>
        Hygiene
      </Text>
      <Card>
        <Card.Title title={hygieneItem.itemName} subtitle={hygieneItem.notes} />
      </Card>
    </>
  );
}
