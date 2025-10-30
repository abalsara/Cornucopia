import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import ActionButton from '@/src/components/buttons/ActionButton';

export default function ScheduleDropoffPage() {
  const theme = useTheme();
  return (
    <ThemedView>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text variant="headlineMedium">Schedule Dropoff</Text>
          <Text
            style={{ ...styles.text, color: theme.colors.onSurfaceVariant }}
            variant="bodyLarge">
            Pick a date & time that works best to drop off your donation at Example charity, in
            city, state.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={{ flex: 1 }} />
          <ActionButton label="Next" onPress={() => console.log('go to confirm page')} />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  text: {
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 32,
  },
});
