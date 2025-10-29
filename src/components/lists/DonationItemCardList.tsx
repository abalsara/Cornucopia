import DonationItemCard from '../cards/DonationItemCard';

import { DonationItem } from '@/src/types/DonationItem/DonationItem.types';

type DonationItemCardListProps = {
  items: DonationItem[];
  onCardPress?: (item: DonationItem) => void;
};

export default function DonationItemCardList(props: DonationItemCardListProps) {
  return (
    <>
      {props.items.map((item) => (
        <DonationItemCard onPress={props.onCardPress} key={item.itemName} item={item} />
      ))}
    </>
  );
}
