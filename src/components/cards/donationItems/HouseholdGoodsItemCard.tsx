import React, { useState } from 'react';
import { Text, Card } from 'react-native-paper';

import { HouseholdGoodsItem } from '@/src/types/DonationItem/DonationItem.types';

type HouseholdGoodsItemCardProps = {
  item: HouseholdGoodsItem;
};

export default function HouseholdGoodsItemCard({ item }: HouseholdGoodsItemCardProps) {
  const [householdItem] = useState(item);
  return (
    <>
      <Text variant="titleMedium" style={{ marginTop: 10 }}>
        Household Goods
      </Text>
      <Card>
        <Card.Title
          title={householdItem.itemName}
          subtitle={`${householdItem.notes}\n${householdItem.type}`}
        />
      </Card>
    </>
  );
}
