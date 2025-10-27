import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import DonationItemCard from '../cards/DonationItemCard';

import { DonationItem } from '@/src/types/DonationItem/DonationItem.types';

type DonationListProps = {
  items: DonationItem[];
};

export default function DonationList({ items }: DonationListProps) {
  if (!items || items.length === 0) {
    return <Text>No donation needs available.</Text>;
  }

  // Use a Map to group items by category
  const grouped = new Map<string, DonationItem[]>();

  for (const item of items) {
    if (!grouped.has(item.category)) {
      grouped.set(item.category, []);
    }
    grouped.get(item.category)!.push(item);
  }

  const categoryTitles: Record<string, string> = {
    food: 'Food',
    clothing: 'Clothing',
    furniture: 'Furniture',
    electronics: 'Electronics',
    hygiene: 'Hygiene',
    medical: 'Medical Supplies',
    sports: 'Sports Equipment',
    toysAndGames: 'Toys & Games',
    schoolAndOffice: 'School & Office Supplies',
    animalCareSupplies: 'Animal Care Supplies',
    householdGoods: 'Household Goods',
    uncategorized: 'Uncategorized',
  };

  return (
    <>
      {[...grouped.entries()].map(([category, categoryItems]) => (
        <View key={category} style={{ marginBottom: 16 }}>
          <Text key={category} variant="titleMedium" style={{ marginTop: 10 }}>
            {categoryTitles[category] ?? 'Other'}
          </Text>
          {categoryItems.map((item) => (
            <DonationItemCard key={item.itemName} item={item} />
          ))}
        </View>
      ))}
    </>
  );
}
