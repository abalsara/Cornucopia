import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Text, useTheme } from 'react-native-paper';

import CenteredActivityIndicator from '@/src/components/CenteredActivityIndicator';
import ThemedView from '@/src/components/ThemedView';
import Navbar from '@/src/components/bars/Navbar';
import ActionButton from '@/src/components/buttons/ActionButton';
import TimeIntervalList from '@/src/components/lists/TimeIntervalList';
import { Availability, fetchAvailabilityByCid } from '@/src/lib/availability';
import { getCharity } from '@/src/stores/charities';
import { setSavedSchedule } from '@/src/stores/savedSchedule';
import { getUnavailableDays } from '@/src/util/dateTimeFormatter';

/**
 * This page allows the donor to pick a date and time to drop off their donation
 */
export default function ScheduleDropoffPage() {
  const { cid } = useLocalSearchParams<{ cid: string }>(); // the charity ID
  const charity = getCharity(cid);
  if (!charity) throw new Error(`Charity with cid: ${cid} does not exist`);

  const theme = useTheme();
  const router = useRouter();

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const unavailableDays = getUnavailableDays(availability);
  const today = new Date();
  const todayString = today.toISOString().split('T')[0]; // "YYYY-MM-DD"

  // set availability state
  useEffect(() => {
    fetchAvailabilityByCid(cid).then((availability) => {
      setAvailability(availability);
      setLoading(false);
    });
  }, []);

  const handleBackArrowPress = (): void => {
    setDate(undefined);
  };

  const handleIntervalPress = (hours: number, minutes: number) => {
    if (!date) throw new Error('invalid date');
    const newDate = new Date(date);
    newDate.setHours(hours, minutes);
    setDate(newDate);
  };

  const handleNextButtonPress = (): void => {
    if (!date) throw new Error('invalid date');
    setSavedSchedule(date);
    router.push(`/pages/reviewAndConfirmPage?cid=${cid}`);
  };

  if (loading) {
    return (
      <ThemedView>
        <CenteredActivityIndicator />
      </ThemedView>
    );
  }

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
          {date === undefined ? (
            <Calendar
              onDayPress={(selectedDay) => {
                const [year, month, day] = selectedDay.dateString.split('-').map(Number);
                const selected = new Date(year, month - 1, day);
                setDate(selected);
              }}
              disabledByWeekDays={unavailableDays}
              disableAllTouchEventsForDisabledDays
              minDate={todayString}
              markedDates={{
                [todayString]: {
                  disabled: unavailableDays.includes(today.getDay()),
                  marked: true,
                },
              }}
            />
          ) : (
            <TimeIntervalList
              availability={availability}
              date={date}
              onIntervalPress={handleIntervalPress}
              onBackPress={handleBackArrowPress}
            />
          )}
        </View>

        <View style={styles.buttonContainer}>
          <View style={{ flex: 1 }} />
          <ActionButton label="Next" onPress={handleNextButtonPress} disabled={!date} />
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
