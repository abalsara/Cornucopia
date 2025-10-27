import React, { useState } from 'react';
import { Text, Card } from 'react-native-paper';

import { ToysAndGames } from '@/src/types/DonationItem/DonationItem.types';

type ToysAndGamesCardProps = {
  item: ToysAndGames;
};

export default function ToysAndGamesCard({ item }: ToysAndGamesCardProps) {
  const [toyItem] = useState(item);
  return (
    <>
      <Text variant="titleMedium" style={{ marginTop: 10 }}>
        Toys & Games
      </Text>
      <Card>
        <Card.Title title={toyItem.itemName} subtitle={`${toyItem.notes}\n${toyItem.ageGroup}`} />
      </Card>
    </>
  );
}
