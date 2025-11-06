import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import Navbar from '@/src/components/bars/Navbar';
import ActionButton from '@/src/components/buttons/ActionButton';
import DatePicker from '@/src/components/modals/DatePicker';
import TimePicker from '@/src/components/modals/TimePicker';
import { getCharity } from '@/src/stores/charities';
import { setSavedSchedule } from '@/src/stores/savedSchedule';
import { formatDate, formatTime } from '@/src/util/dateTimeFormatter';

/**
 * This page allows the donor to pick a date and time to drop off their donation
 */
export default function ScheduleDropoffPage() {
  const { cid } = useLocalSearchParams<{ cid: string }>(); // the charity ID
  const charity = getCharity(cid);
  if (!charity) throw new Error(`Charity with cid: ${cid} does not exist`);

  const theme = useTheme();
  const router = useRouter();

  // date state
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [dateVisible, setDateVisible] = useState(false);

  // time state
  const [hours, setHours] = useState<number | undefined>();
  const [minutes, setMinutes] = useState<number | undefined>();
  const [timeVisible, setTimeVisible] = useState(false);

  const handleConfirmDate = (date?: Date): void => {
    setDate(date);
    setDateVisible(false);
  };

  const handleConfirmTime = (hours: number, minutes: number): void => {
    if (date) {
      setHours(hours);
      setMinutes(minutes);

      const newDate = date;
      newDate.setHours(hours, minutes);
      setDate(newDate);
      setTimeVisible(false);
    }
  };

  const getFormattedTime = (): string => {
    if (date !== undefined && hours !== undefined && minutes !== undefined) {
      return formatTime(date);
    }
    return 'no time selected';
  };

  const handleNextButtonPress = (): void => {
    if (!date) throw new Error('invalid date');
    setSavedSchedule(date);
    router.push(`/pages/reviewAndConfirmPage?cid=${cid}`);
  };

  const handleSelectTimePress = (): void => {
    setTimeVisible(true);
  };

  return (
    <ThemedView>
      <Navbar title={charity.c_name} />
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text variant="headlineMedium">Schedule Dropoff</Text>
          <Text
            style={{ ...styles.text, color: theme.colors.onSurfaceVariant }}
            variant="bodyLarge">
            Pick a date & time that works best to drop off your donation at {charity.c_name}, in{' '}
            {charity.city}, {charity.state}.
          </Text>

          {/* Date selection */}
          <View style={styles.dateTimeContainer}>
            <Text variant="bodyLarge">Date: {date ? formatDate(date) : 'no date selected'}</Text>
            <Button onPress={() => setDateVisible(true)} mode="contained">
              Select Date
            </Button>
          </View>

          {/* Time selection */}
          <View style={styles.dateTimeContainer}>
            <Text variant="bodyLarge">Time: {getFormattedTime()}</Text>
            <Button onPress={handleSelectTimePress} mode="contained" disabled={date === undefined}>
              Select Time
            </Button>
          </View>
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
          <ActionButton
            label="Next"
            onPress={handleNextButtonPress}
            disabled={date === undefined || hours === undefined || minutes === undefined}
          />
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
  dateTimeContainer: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
