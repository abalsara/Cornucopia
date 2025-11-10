import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, View } from 'react-native';
import { Portal, Text, useTheme, Modal } from 'react-native-paper';

import { DonationItem } from '@/src/types/DonationItem/DonationItem.types';

type DonationItemModalReadProps = {
  isVisible: boolean;
  setIsVisible: (status: boolean) => void;
  item?: DonationItem;
};

/**
 * Renders a modal that contains a DonationItem's properties.
 * Shown when pressing a card on the charityNeedsPage.
 */
export default function DonationItemModalRead(props: DonationItemModalReadProps) {
  const item = props.item;
  const theme = useTheme();

  if (!item) return <></>;

  return (
    <Portal>
      <Modal
        visible={props.isVisible}
        onDismiss={() => props.setIsVisible(false)}
        style={{ marginTop: 0, marginBottom: 0, flex: 1 }}
        contentContainerStyle={{
          ...styles.container,
          backgroundColor: theme.colors.background,
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
                <Text>{item.quantity}</Text>
              </View>
              <View style={styles.QuantityUnitContainer}>
                <Text variant="labelLarge">Unit</Text>
                <Text variant="titleMedium" style={{ marginTop: 20 }}>
                  {item.unit}
                </Text>
              </View>
            </View>
            <View style={styles.mt20}>
              <Text variant="titleLarge">Notes</Text>
              <Text>{item.notes}</Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 1 }} />
      </Modal>
    </Portal>
  );
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
