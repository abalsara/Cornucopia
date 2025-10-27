import React, { useState } from 'react';
import { Text, Card } from 'react-native-paper';

import { SchoolAndOfficeSupplies } from '@/src/types/DonationItem/DonationItem.types';

type SchoolAndOfficeSuppliesCardProps = {
  item: SchoolAndOfficeSupplies;
};

export default function SchoolAndOfficeSuppliesCard({ item }: SchoolAndOfficeSuppliesCardProps) {
  const [supplyItem] = useState(item);
  return (
    <>
      <Text variant="titleMedium" style={{ marginTop: 10 }}>
        School & Office Supplies
      </Text>
      <Card>
        <Card.Title title={supplyItem.itemName} subtitle={supplyItem.notes} />
      </Card>
    </>
  );
}
