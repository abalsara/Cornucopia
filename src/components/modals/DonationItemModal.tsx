import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Portal, Text, useTheme, Modal, Button, TextInput } from 'react-native-paper';

import ActionButton from '../buttons/ActionButton';

import { DonationItem } from '@/src/types/DonationItem/DonationItem.types';

type DonationItemModalProps = {
  isVisible: boolean;
  setIsVisible: (status: boolean) => void;
  item?: DonationItem;
};

export default function DonationItemModal(props: DonationItemModalProps) {
  const theme = useTheme();

  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState(props.item?.notes);

  const handleTextChange = (text: string) => {
    // Remove any non-numeric characters using a regular expression
    const numericValue = text.replace(/[^0-9]/g, '');
    setQuantity(numericValue);
  };

  const handleAddDonationPress = (): void => {
    props.setIsVisible(false);
  };

  if (props.item) {
    return (
      <View>
        <Portal>
          <Modal
            visible={props.isVisible}
            onDismiss={() => props.setIsVisible(false)}
            contentContainerStyle={{
              ...styles.container,
              backgroundColor: theme.colors.background,
            }}>
            <View style={{ flexDirection: 'row-reverse' }}>
              <Feather
                onPress={() => props.setIsVisible(false)}
                style={{ padding: 15 }}
                name="x"
                size={36}
                color={theme.colors.onBackground}
              />
            </View>
            <View style={styles.modalContent}>
              <View>
                <Text variant="headlineMedium">{props.item.itemName}</Text>
                <Text variant="titleLarge" style={styles.mt20}>
                  Quantity
                </Text>
              </View>
              <View style={styles.QuantityContainer}>
                <View style={styles.QuantityNumberContainer}>
                  <Text variant="labelLarge">Number</Text>
                  <TextInput
                    value={quantity}
                    onChangeText={handleTextChange}
                    placeholder={String(props.item.quantity)}
                    keyboardType="numeric"
                    style={{ width: 140 }}
                  />
                </View>
                <View style={styles.QuantityUnitContainer}>
                  <Text variant="labelLarge">Unit</Text>
                  <Text variant="titleMedium" style={{ marginTop: 20 }}>
                    Cans
                  </Text>
                </View>
              </View>
              <View style={styles.mt20}>
                <Text variant="titleLarge">Notes</Text>
                <TextInput value={notes} />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <View style={{ flex: 1 }} />
              <ActionButton label="Add to Donation" onPress={handleAddDonationPress} />
            </View>
          </Modal>
        </Portal>
      </View>
    );
  }

  return <></>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'flex-start',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
  modalContent: {
    flex: 1,
    marginHorizontal: 20,
    gap: 12,
  },
  QuantityContainer: {
    flexDirection: 'row',
  },
  QuantityNumberContainer: {},
  QuantityUnitContainer: {
    marginLeft: 40,
  },
  mt20: {
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
