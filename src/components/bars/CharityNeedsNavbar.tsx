import { JSX } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import ActionButton from '../buttons/ActionButton';

type CharityNeedsNavbarProps = {
  inSelectStage: boolean;
  selectedItems: string[];
  onStartDonation: () => void;
};

export default function CharityNeedsNavbar(props: CharityNeedsNavbarProps) {
  const renderNumSelected = (): JSX.Element => {
    if (props.inSelectStage) {
      return (
        <Pressable>
          <Text variant="titleLarge" style={styles.text}>
            {props.selectedItems.length} items selected
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
