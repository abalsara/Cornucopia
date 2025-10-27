import React, { useState } from 'react';
import { Text, Card } from 'react-native-paper';

import { SportsEquipmentItem } from '@/src/types/DonationItem/DonationItem.types';

type SportsEquipmentItemCardProps = {
  item: SportsEquipmentItem;
};

export default function SportsEquipmentItemCard({ item }: SportsEquipmentItemCardProps) {
  const [sportsItem] = useState(item);
  return (
    <>
      <Text variant="titleMedium" style={{ marginTop: 10 }}>
        Sports Equipment
      </Text>
      <Card>
        <Card.Title
          title={sportsItem.itemName}
          subtitle={`${sportsItem.notes}\n${sportsItem.type}`}
        />
      </Card>
    </>
  );
}
