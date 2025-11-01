import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Portal, Text, useTheme, Modal, TextInput } from 'react-native-paper';

import ActionButton from '../buttons/ActionButton';

import { DonationItem } from '@/src/types/DonationItem/DonationItem.types';

type DonationItemModalProps = {
  isVisible: boolean;
  setIsVisible: (status: boolean) => void;
  item?: DonationItem;
  onAddDonationPress: (item: DonationItem) => void;
};

/**
 * Renders a modal that contains a DonationItem's properties.
 * Shown when pressing a card on the charityNeedsPage.
 */
export default function DonationItemModal(props: DonationItemModalProps) {
  const item = structuredClone(props.item);
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState(item?.notes ?? '');
  const theme = useTheme();

  const { height } = useWindowDimensions();
  const buttonPos = height - 164;

  const handleQuantityChange = (text: string) => {
    // Remove any non-numeric characters using a regular expression
    const numericValue = text.replace(/[^0-9]/g, '');
    setQuantity(numericValue);
  };

  if (item) {
    return (
      <Portal>
        <Modal
          visible={props.isVisible}
          onDismiss={() => props.setIsVisible(false)}
          style={{ marginTop: 0, marginBottom: 0, flex: 1 }}
          contentContainerStyle={{
            ...styles.container,
            backgroundColor: theme.colors.background,
            minHeight: buttonPos,
          }}>
          <View>
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
                <Text variant="headlineMedium">{item.itemName}</Text>
                <Text variant="titleLarge" style={styles.mt20}>
                  Quantity
                </Text>
              </View>
              <View style={styles.QuantityContainer}>
                <View>
                  <Text variant="labelLarge">Number</Text>
                  <TextInput
                    value={quantity}
                    onChangeText={handleQuantityChange}
                    placeholder={String(item.quantity)}
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
                <TextInput value={notes} onChangeText={(text) => setNotes(text)} />
              </View>
            </View>
          </View>

          <View style={{ flex: 1 }} />

          <View>
            <View style={styles.buttonContainer}>
              <View style={{ flex: 1 }} />
              <ActionButton
                label="Add to Donation"
                onPress={() => props.onAddDonationPress(item)}
              />
            </View>
          </View>
        </Modal>
      </Portal>
    );
  }
  return <></>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    justifyContent: 'space-between',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    shadowOpacity: 0,
  },
  modalContent: {
    marginHorizontal: 20,
    gap: 12,
  },
  QuantityContainer: {
    flexDirection: 'row',
  },
  QuantityUnitContainer: {
    marginLeft: 40,
  },
  mt20: {
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 20,
    marginBottom: 40,
  },
});
