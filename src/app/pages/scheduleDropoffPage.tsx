import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import ActionButton from '@/src/components/buttons/ActionButton';
import DatePicker from '@/src/components/modals/DatePicker';
import TimePicker from '@/src/components/modals/TimePicker';

export default function ScheduleDropoffPage() {
  const theme = useTheme();
  // date state
  const [date, setDate] = useState<number | undefined>(undefined);
  const [dateVisible, setDateVisible] = useState(false);

  // time state
  const [hours, setHours] = useState<number | undefined>();
  const [minutes, setMinutes] = useState<number | undefined>();
  const [timeVisible, setTimeVisible] = useState(false);

  const handleConfirmDate = (milliseconds?: number): void => {
    setDate(milliseconds);
    setDateVisible(false);
  };

  const handleConfirmTime = (hours: number, minutes: number): void => {
    setHours(hours);
    setMinutes(minutes);
    setTimeVisible(false);
  };

  const getDate = (): string => {
    if (date) {
      const newDate = new Date(date);
      return newDate.toISOString();
    }
    return 'no date selected';
  };

  const getTime = (): string => {
    if (hours !== undefined && minutes !== undefined) {
      return `${hours} hours and ${minutes} minutes`;
    }
    return 'no time selected';
  };

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
          <Button onPress={() => setDateVisible(true)}>Select Date</Button>
          <Text>Selected date: {getDate()}</Text>

          <Button onPress={() => setTimeVisible(true)}>Select Time</Button>
          <Text>Selected time: {getTime()}</Text>
        </View>
        <DatePicker
          onConfirm={handleConfirmDate}
          onDismiss={() => setDateVisible(false)}
          visible={dateVisible}
        />
        <TimePicker
          onConfirm={handleConfirmTime}
          onDismiss={() => setTimeVisible(false)}
          visible={timeVisible}
        />
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
