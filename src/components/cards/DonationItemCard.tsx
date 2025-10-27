import React from 'react';
import { Card } from 'react-native-paper';

import { DonationItem } from '@/src/types/DonationItem/DonationItem.types';

type DonationItemCardProps = {
  item: DonationItem;
};

/**
 * Renders a card for any DonationItem type.
 * Automatically adjusts title/subtitle based on category.
 */
export default function DonationItemCard({ item }: DonationItemCardProps) {
  const { category, itemName, notes } = item;

  // Build subtitle details depending on category type
  const getSubtitle = (): string => {
    switch (category) {
      case 'animalCareSupplies':
        return `${notes}\n${item.animal} — ${item.type}`;
      case 'clothing':
        return `${notes}\n${item.ageGroup} — ${item.gender}`;
      case 'electronics':
        return `${notes}\n${item.type}`;
      case 'food':
        return `${notes}\nStorage: ${item.storageRequirement}`;
      case 'furniture':
        return `${notes}\n${item.type}`;
      case 'householdGoods':
        return `${notes}\n${item.type}`;
      case 'hygiene':
        return notes;
      case 'medical':
        return `${notes}\n${item.type}`;
      case 'schoolAndOffice':
        return notes;
      case 'sports':
        return `${notes}\n${item.type}`;
      case 'toysAndGames':
        return `${notes}\nAge group: ${item.ageGroup}`;
      case 'uncategorized':
        return notes;
      default:
        return notes;
    }
  };

  return (
    <>
      <Card>
        <Card.Title title={itemName} subtitle={getSubtitle()} />
      </Card>
    </>
  );
}
