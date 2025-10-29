import { useRouter } from 'expo-router';
import { JSX } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import ActionButton from '../buttons/ActionButton';

import { DonationItem } from '@/src/types/DonationItem/DonationItem.types';

type CharityNeedsNavbarProps = {
  inSelectStage: boolean;
  onStartDonation: () => void;
  donations: DonationItem[];
};

export default function CharityNeedsNavbar(props: CharityNeedsNavbarProps) {
  const router = useRouter();
  const renderNumSelected = (): JSX.Element => {
    if (props.inSelectStage) {
      return (
        <Pressable onPress={() => router.push('pages/yourDonationPage')}>
          <Text variant="titleLarge" style={styles.text}>
            {props.donations.length} items selected
          </Text>
        </Pressable>
      );
    }
    return <></>;
  };

  if (props.inSelectStage) {
    return (
      <View style={styles.container}>
        {renderNumSelected()}
        <ActionButton
          label="Next"
          onPress={() => console.log('redirect to Schedule Dropoff Page')}
          disabled={props.donations.length === 0}
        />
      </View>
    );
  }
  return (
    <View>
      <ActionButton label="Start your Donation" onPress={props.onStartDonation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: 30,
  },
});
