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
        <Pressable onPress={() => router.push('/pages/yourDonationPage')}>
          <Text variant="titleLarge">{props.donations.length} items selected</Text>
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
          onPress={() => router.push('/pages/scheduleDropoffPage')}
          disabled={props.donations.length === 0}
        />
      </View>
    );
  }
  return (
    <View style={{ margin: 20, marginBottom: 32 }}>
      <ActionButton label="Start your Donation" onPress={props.onStartDonation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    marginBottom: 32,
  },
});
