import { View } from 'react-native';
import { Text } from 'react-native-paper';

import DonationItemCardList from './DonationItemCardList';

import { Category, DonationItem } from '@/src/types/DonationItem/DonationItem.types';

type DonationListProps = {
  items: DonationItem[];
  onCardPress?: (item: DonationItem) => void;
};

/**
 * A list of items that the charity is requesting, grouped into sections by category,
 * @param props.items - List of DonationItems the charity is requesting
 * @returns a title and list of cards representing each item for each item category
 */
export default function DonationList(props: DonationListProps) {
  if (!props.items || props.items.length === 0) {
    return <Text>No donation needs available.</Text>;
  }

  // Use a Map to group items by category
  const grouped = new Map<Category, DonationItem[]>();

  for (const item of props.items) {
    if (!grouped.has(item.category)) {
      grouped.set(item.category, []);
    }
    grouped.get(item.category)!.push(item);
  }

  return (
    <>
      {[...grouped.entries()].map(([category, categoryItems]) => (
        <View key={category} style={{ marginBottom: 16 }}>
          <Text key={category} variant="titleMedium" style={{ marginTop: 10 }}>
            {category}
          </Text>

          <DonationItemCardList items={categoryItems} onCardPress={props.onCardPress} />
        </View>
      ))}
    </>
  );
}
