import { useState } from 'react';
import { Card, Text } from 'react-native-paper';

import { FoodItem } from '@/src/types/DonationItem/DonationItem.types';

type FoodItemCardProps = {
  foodItem: FoodItem;
};

export default function FoodItemCard(props: FoodItemCardProps) {
  const [foodItem] = useState(props.foodItem);
  return (
    <>
      <Card>
        <Card.Title title={foodItem.itemName} subtitle={foodItem.notes} />
      </Card>
    </>
  );
}
