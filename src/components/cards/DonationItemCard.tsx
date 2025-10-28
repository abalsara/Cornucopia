import React from 'react';
import { Card } from 'react-native-paper';

import { DonationItem } from '@/src/types/DonationItem/DonationItem.types';
import { getDonationCardSubtitle } from '@/src/util/donationItem';

type DonationItemCardProps = {
  item: DonationItem;
};

/**
 * Renders a card for a given DonationItem
 */
export default function DonationItemCard({ item }: DonationItemCardProps) {
  return (
    <Card style={{ marginTop: 10 }}>
      <Card.Title title={item.itemName} subtitle={getDonationCardSubtitle(item)} />
    </Card>
  );
}
