import { Text } from 'react-native-paper';

import ScheduledDonationCard from '../cards/ScheduledDonationCard';

import { getScheduledDonations } from '@/src/stores/scheduledDonations';
import { ScheduledDonation } from '@/src/types/DonationItem/ScheduledDonation';

type ScheduledDonationCardListProps = {
  onCardPress?: (item: ScheduledDonation) => void;
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
          scheudledDonation={scheduledDonation}
          onPress={props.onCardPress}
          key={`${scheduledDonation.cid}${scheduledDonation.scheduledDate}`}
        />
      ))}
    </>
  );
}
