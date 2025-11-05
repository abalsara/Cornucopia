import { Card } from 'react-native-paper';

import { getCharity } from '@/src/stores/charities';
import { formatDate, formatTime } from '@/src/util/dateTimeFormatter';

type ScheduledDonationCardProps = {
  cid: string;
  schedule: Date;
};

export default function ScheduledDonationCard(props: ScheduledDonationCardProps) {
  const charity = getCharity(props.cid);
  if (!charity) throw new Error(`Charity with id: ${props.cid} does not exist`);
  return (
    <Card style={{ marginTop: 10 }}>
      <Card.Title
        title={charity.c_name}
        subtitle={`${formatDate(props.schedule)} at ${formatTime(props.schedule)}`}
      />
    </Card>
  );
}
