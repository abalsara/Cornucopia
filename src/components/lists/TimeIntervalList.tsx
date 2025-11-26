import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { Availability } from '@/src/lib/availability';
import { toMinutes, toHHMM, formatDate } from '@/src/util/dateTimeFormatter';

type TimeIntervalListProps = {
  availability: Availability[];
  date: Date;
  onIntervalPress: (hours: number, minutes: number) => void;
  onBackPress: () => void;
};

export default function TimeIntervalList({
  availability,
  date,
  onIntervalPress,
  onBackPress,
}: TimeIntervalListProps) {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);

  // get day of week
  const dayOfWeek = date.getDay();

  // Filter to this specific day
  const todaysPeriods = availability
    .filter((a) => a.day_of_week === dayOfWeek)
    .sort((a, b) => a.period_index - b.period_index);

  // Generate all time segments
  const intervals: string[] = [];

  todaysPeriods.forEach((period) => {
    const start = toMinutes(period.open_time);
    const end = toMinutes(period.close_time);

    for (let t = start; t < end; t += 15) {
      const next = t + 15;
      intervals.push(`${toHHMM(t)} - ${toHHMM(next)}`);
    }
  });

  const handlePress = (interval: string, idx: number) => {
    const [time, rest] = interval.split(' ');
    const [period] = rest.split(' ');

    const totalMinutes = toMinutes(time);
    const rawHours = Math.floor(totalMinutes / 60);
    const hours = period === 'pm' && rawHours !== 12 ? rawHours + 12 : rawHours;
    const minutes = totalMinutes % 60;
    setSelected(idx);
    onIntervalPress(hours, minutes);
  };

  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={theme.colors.onBackground}
          style={{ paddingRight: 8 }}
          onPress={onBackPress}
        />
        <Text variant="titleLarge">{formatDate(date)}</Text>
      </View>
      <ScrollView>
        {intervals.map((time, idx) => {
          const color = selected === idx ? theme.colors.primary : theme.colors.outlineVariant;
          return (
            <Pressable key={idx} onPress={() => handlePress(time, idx)}>
              <View style={{ ...styles.container, borderColor: color }}>
                <Text variant="titleMedium" style={{ color }}>
                  {time}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
    marginHorizontal: 32,
    padding: 5,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
