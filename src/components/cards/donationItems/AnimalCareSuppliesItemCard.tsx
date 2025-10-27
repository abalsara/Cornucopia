import { useState } from 'react';
import { Card, Text } from 'react-native-paper';

import { AnimalCareSuppliesItem } from '@/src/types/DonationItem/DonationItem.types';

type AnimalCareSuppliesItemCardProps = {
  item: AnimalCareSuppliesItem;
};

export default function AnimalCareSuppliesItemCard({ item }: AnimalCareSuppliesItemCardProps) {
  const [animalItem] = useState(item);
  return (
    <>
      <Text variant="titleMedium" style={{ marginTop: 10 }}>
        Animal Care Supplies
      </Text>
      <Card>
        <Card.Title
          title={animalItem.itemName}
          subtitle={`${animalItem.notes}\n${animalItem.animal} — ${animalItem.type}`}
        />
      </Card>
    </>
  );
}
