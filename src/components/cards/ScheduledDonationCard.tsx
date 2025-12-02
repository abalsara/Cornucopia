import { JSX, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

import CenteredActivityIndicator from '../CenteredActivityIndicator';

import { getProfile, Profile } from '@/src/lib/profiles';
import { getCharity } from '@/src/stores/charities';
import { ScheduledDonation } from '@/src/types/DonationItem/ScheduledDonation';
import { formatDate, formatTime } from '@/src/util/dateTimeFormatter';
import { scheduledDonationIsFulfilled } from '@/src/util/donationItem';

type ScheduledDonationCardProps = {
  scheduledDonation: ScheduledDonation;
  onPress?: (donation: ScheduledDonation) => void;
  screenType: 'donor' | 'charity';
};

/**
 * Displays a single card on the index tab of the donor or charity screen depending on the prop's screenType
 */
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
    if (scheduledDonationIsFulfilled(props.scheduledDonation)) {
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

  // Display the donor's name if the screenType is 'charity'
  // otherwise, display the charity's name
  if (!donor) throw new Error('donor is undefined');
  const title =
    props.screenType === 'charity' ? `${donor.first_name} ${donor.last_name}` : charity.c_name;

  return (
    <Card style={styles.card} onPress={handlePress}>
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

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 4,
  },
});
