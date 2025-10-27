import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import DonationItemCard from '../../cards/DonationItemCard';

import { DonationItem } from '@/src/types/DonationItem/DonationItem.types';

type DonationListProps = {
  items: DonationItem[];
};

export default function CharityNeedsList({ items }: DonationListProps) {
  if (!items || items.length === 0) {
    return <Text>No donation needs available.</Text>;
  }

  const grouped = items.reduce<Record<string, DonationItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const renderCategory = (category: string, categoryItems: DonationItem[]) => {
    const title =
      {
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
      }[category] ?? 'Other';

    return (
      <View key={category} style={{ marginBottom: 16 }}>
        <Text variant="titleMedium" style={{ marginTop: 10 }}>
          {title}
        </Text>

        {categoryItems.map((item) => {
          return <DonationItemCard key={item.itemName} item={item} />;
        })}
      </View>
    );
  };

  return (
    <>
      {Object.entries(grouped).map(([category, categoryItems]) =>
        renderCategory(category, categoryItems),
      )}
    </>
  );
}
