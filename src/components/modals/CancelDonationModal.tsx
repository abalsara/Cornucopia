import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, Text, useTheme } from 'react-native-paper';

type CancelDonationModalProps = {
  visible: boolean;
  handleConfirm: () => void;
  handleDismiss: () => void;
};

/**
 * This modal is shown after pressing the 'Cancel donation' button on the donationDetailsPage
 */
export default function CancelDonationModal(props: CancelDonationModalProps) {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleConfirm = (): void => {
    setLoading(true);
    props.handleConfirm();
  };

  return (
    <Portal>
      <Modal
        visible={props.visible}
        onDismiss={props.handleDismiss}
        contentContainerStyle={{ margin: 20, backgroundColor: theme.colors.background }}>
        <View style={styles.container}>
          <Text variant="titleLarge">Are you sure you want to cancel this donation?</Text>
          <View style={{ flexDirection: 'row', marginTop: 40 }}>
            <View style={{ flex: 1 }} />
            <Button>Cancel</Button>
            <Button
              buttonColor={theme.colors.error}
              textColor={theme.colors.onError}
              onPress={handleConfirm}
              disabled={loading}>
              Yes, I'm sure
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
