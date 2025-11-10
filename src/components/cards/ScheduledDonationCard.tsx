import { Card } from 'react-native-paper';

import { getCharity } from '@/src/stores/charities';
import { ScheduledDonation } from '@/src/types/DonationItem/ScheduledDonation';
import { formatDate, formatTime } from '@/src/util/dateTimeFormatter';

type ScheduledDonationCardProps = {
  scheudledDonation: ScheduledDonation;
  onPress?: (donation: ScheduledDonation) => void;
};

export default function ScheduledDonationCard(props: ScheduledDonationCardProps) {
  const charity = getCharity(props.scheudledDonation.cid);
  if (!charity) throw new Error(`Charity with id: ${props.scheudledDonation.cid} does not exist`);

  const handlePress = (): void => {
    if (props.onPress) {
      props.onPress(props.scheudledDonation);
    }
  };

  return (
    <Card style={{ marginTop: 10 }} onPress={handlePress}>
      <Card.Title
        title={charity.c_name}
        subtitle={`${formatDate(props.scheudledDonation.scheduledDate)} at ${formatTime(props.scheudledDonation.scheduledDate)}`}
      />
    </Card>
  );
}
