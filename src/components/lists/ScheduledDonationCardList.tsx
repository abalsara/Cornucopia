import { Text } from 'react-native-paper';

import ScheduledDonationCard from '../cards/ScheduledDonationCard';

import { getScheduledDonations } from '@/src/stores/scheduledDonations';
import { DonationItem } from '@/src/types/DonationItem/DonationItem.types';

type ScheduledDonationCardListProps = {
  onCardPress?: (item: DonationItem) => void;
};

export default function ScheduledDonationCardList(props: ScheduledDonationCardListProps) {
  const scheduledDonations = getScheduledDonations();
  if (scheduledDonations.length === 0) {
    return <Text>You dont have any scheduled donations</Text>;
  }
  return (
    <>
      {scheduledDonations.map((scheduledDonation) => (
        <ScheduledDonationCard
          cid={scheduledDonation.cid}
          schedule={scheduledDonation.scheduledDate}
          key={`${scheduledDonation.cid}${scheduledDonation.scheduledDate}`}
        />
      ))}
    </>
  );
}
