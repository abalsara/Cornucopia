import { JSX, useEffect, useState } from 'react';
import { Card, Text, useTheme } from 'react-native-paper';

import CenteredActivityIndicator from '../CenteredActivityIndicator';

import { getProfile, Profile } from '@/src/lib/profiles';
import { getCharity } from '@/src/stores/charities';
import { ScheduledDonation } from '@/src/types/DonationItem/ScheduledDonation';
import { formatDate, formatTime } from '@/src/util/dateTimeFormatter';

type ScheduledDonationCardProps = {
  scheduledDonation: ScheduledDonation;
  onPress?: (donation: ScheduledDonation) => void;
  screenType: 'donor' | 'charity';
};

export default function ScheduledDonationCard(props: ScheduledDonationCardProps) {
  const [loading, setLoading] = useState(true);
  const [donor, setDonor] = useState<Profile | undefined>(undefined);
  const theme = useTheme();

  useEffect(() => {
    getProfile(props.scheduledDonation.pid).then((donor) => {
      setDonor(donor);
      setLoading(false);
    });
  }, []);

  const charity = getCharity(props.scheduledDonation.cid);
  if (!charity) throw new Error(`Charity with id: ${props.scheduledDonation.cid} does not exist`);

  const handlePress = (): void => {
    if (props.onPress) {
      props.onPress(props.scheduledDonation);
    }
  };

  const getDescription = (): string => {
    let description = '';
    for (const item of props.scheduledDonation.items) {
      description += `${item.itemName}, `;
    }

    const length = description.length;
    description = length > 2 ? description.substring(0, length - 2) : description;
    return description;
  };

  const renderStatus = (): JSX.Element | undefined => {
    if (props.scheduledDonation.fulfilled) {
      return <Text style={{ color: theme.colors.secondary }}>Received</Text>;
    }
    const now = new Date();
    const expired = now.getTime() - props.scheduledDonation.scheduledDate.getTime() > 0;
    if (expired) {
      return <Text style={{ color: theme.colors.error }}>Expired</Text>;
    }
  };

  if (loading) {
    return (
      <Card>
        <CenteredActivityIndicator />
      </Card>
    );
  }

  if (!donor) throw new Error('donor is undefined');
  const title =
    props.screenType === 'charity' ? `${donor.first_name} ${donor.last_name}` : charity.c_name;

  return (
    <Card style={{ marginTop: 10 }} onPress={handlePress}>
      <Card.Title
        title={title}
        subtitle={getDescription()}
        right={() => renderStatus()}
        rightStyle={{ marginRight: 20, marginTop: -24 }}
      />
      <Card.Content>
        <Text>
          {formatDate(props.scheduledDonation.scheduledDate)} at{' '}
          {formatTime(props.scheduledDonation.scheduledDate)}
        </Text>
      </Card.Content>
    </Card>
  );
}
