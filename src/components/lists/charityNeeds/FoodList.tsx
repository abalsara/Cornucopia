import { useState } from 'react';
import { Text } from 'react-native-paper';

import FoodItemCard from '../../cards/donationItems/FoodItemCard';

import { FoodItem } from '@/src/types/DonationItem/DonationItem.types';

type FoodListProps = {
  foodItems: FoodItem[];
};

export default function FoodList(props: FoodListProps) {
  const [foodList] = useState(props.foodItems);
  return (
    <>
      <Text variant="titleMedium" style={{ marginTop: 10 }}>
        Food
      </Text>
      {foodList.map((item) => (
        <FoodItemCard key={item.itemName} foodItem={item} />
      ))}
    </>
  );
}
