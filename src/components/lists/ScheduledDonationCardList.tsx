import { Text } from 'react-native-paper';

import ScheduledDonationCard from '../cards/ScheduledDonationCard';

import { ScheduledDonation } from '@/src/types/DonationItem/ScheduledDonation';

type ScheduledDonationCardListProps = {
  onCardPress?: (item: ScheduledDonation) => void;
  scheduledDonations: ScheduledDonation[];
};

export default function ScheduledDonationCardList(props: ScheduledDonationCardListProps) {
  if (props.scheduledDonations.length === 0) {
    return <Text>You dont have any scheduled donations</Text>;
  }
  return (
    <>
      {props.scheduledDonations.map((scheduledDonation) => (
        <ScheduledDonationCard
          scheudledDonation={scheduledDonation}
          onPress={props.onCardPress}
          key={`${scheduledDonation.cid}${scheduledDonation.scheduledDate}`}
        />
      ))}
    </>
  );
}
