import React, { useState } from 'react';
import { Text, Card } from 'react-native-paper';

import { MedicalSuppliesItem } from '@/src/types/DonationItem/DonationItem.types';

type MedicalSuppliesItemCardProps = {
  item: MedicalSuppliesItem;
};

export default function MedicalSuppliesItemCard({ item }: MedicalSuppliesItemCardProps) {
  const [medicalItem] = useState(item);
  return (
    <>
      <Text variant="titleMedium" style={{ marginTop: 10 }}>
        Medical Supplies
      </Text>
      <Card>
        <Card.Title
          title={medicalItem.itemName}
          subtitle={`${medicalItem.notes}\n${medicalItem.type}`}
        />
      </Card>
    </>
  );
}
