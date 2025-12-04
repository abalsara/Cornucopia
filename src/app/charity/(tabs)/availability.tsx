import { randomUUID } from 'expo-crypto';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Portal, Text, useTheme } from 'react-native-paper';

import CenteredActivityIndicator from '@/src/components/CenteredActivityIndicator';
import ThemedView from '@/src/components/ThemedView';
import AvailabilityList from '@/src/components/lists/AvailabilityList';
import TimePicker from '@/src/components/modals/TimePicker';
import {
  Availability,
  deleteAvailabilities,
  fetchAvailabilityByAdmin,
  insertAvailabilities,
} from '@/src/lib/availability';
import { getCharity } from '@/src/stores/charities';

const defaultStartTime = new Date();
const defaultEndTime = new Date();
defaultStartTime.setHours(9, 0, 0, 0);
defaultEndTime.setHours(17, 0, 0, 0);

/**
 * This tab renders the drop off hours for the charity that the user is an administrator of
 */
export default function AvailabilityTab() {
  // loading state
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);

  // availability related state
  const [cid, setCid] = useState<string | undefined>(undefined);
  const [availabilityMap, setAvailabilityMap] = useState<Map<string, Availability>>(new Map()); // maps id to availability
  const [dayOfWeek, setDayOfWeek] = useState<number | undefined>(undefined);
  const [startTime, setStartTime] = useState<Date>(defaultStartTime);
  const [endTime, setEndTime] = useState<Date>(defaultEndTime);
  const [modified, setModified] = useState(false);
  const availabilityList = Array.from(availabilityMap.values());

  // time picker related state
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState<'start' | 'end'>('start');
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const theme = useTheme();

  // Synchronize availability with database
  useEffect(() => {
    syncAvailability().then(() => setLoading(false));
  }, []);

  const syncAvailability = async (): Promise<void> => {
    const newAvailability = new Map(availabilityMap);
    const response = await fetchAvailabilityByAdmin();
    for (const a of response.availability) {
      newAvailability.set(a.id, a);
    }
    setCid(response.cid);
    setAvailabilityMap(newAvailability);
  };

  /**
   * Opens the time selection modal for creating a new availability entry.
   *
   * @param dayOfWeek - The day of the week (0–6) that the user wants to add availability for.
   */
  const handlePlusIconPress = (dayOfWeek: number): void => {
    // create a new availability obj
    // update selectedId, dayOfWeek state
    // update the availability map
    // show time picker
    if (cid === undefined) {
      throw new Error(`cid is undefined`);
    }
    const id = randomUUID();
    const now = new Date();
    const newAvailability: Availability = {
      cid,
      id,
      day_of_week: dayOfWeek,
      open_time: defaultStartTime.toTimeString().substring(0, 5),
      close_time: defaultEndTime.toTimeString().substring(0, 5),
      created_at: now.toJSON(),
    };
    const copy = new Map(availabilityMap);
    copy.set(newAvailability.id, newAvailability);
    setAvailabilityMap(copy);
    setSelectedId(id);
    setDayOfWeek(dayOfWeek);
    setStartTime(defaultStartTime);
    setEndTime(defaultEndTime);
    setSelectedTime('start');
    setModified(true);
    setTimePickerVisible(true);
  };

  /**
   * Refreshes the availability state after a child component deletes an entry.
   */
  const handleTrashPress = (id: string): void => {
    const copy = new Map(availabilityMap);
    copy.delete(id);
    setModified(true);
    setAvailabilityMap(copy);
  };

  /**
   * Called when the user confirms the times on the TimePicker modal.
   */
  const handleConfirm = (startTimeParam: Date, endTimeParam: Date): void => {
    if (
      cid === undefined ||
      dayOfWeek === undefined ||
      startTime === undefined ||
      selectedId === undefined
    ) {
      throw new Error(
        `Invalid parameters: {dayOfWeek: ${dayOfWeek}, openTime: ${startTime}, closeTime: ${endTime}, id: ${selectedId}}`,
      );
    }
    const now = new Date();
    const newAvailability: Availability = {
      cid,
      open_time: startTimeParam.toTimeString().substring(0, 5),
      close_time: endTimeParam.toTimeString().substring(0, 5),
      id: selectedId,
      day_of_week: dayOfWeek,
      created_at: now.toJSON(),
    };
    const newAvailabilityMap = new Map(availabilityMap);
    newAvailabilityMap.set(newAvailability.id, newAvailability);
    setAvailabilityMap(newAvailabilityMap);
    setTimePickerVisible(false);
  };

  const handleSave = async (): Promise<void> => {
    if (cid === undefined) {
      throw new Error(`cid is undefined`);
    }
    try {
      setSaveLoading(true);
      await deleteAvailabilities(cid);
      await insertAvailabilities(Array.from(availabilityMap.values()));
      await syncAvailability();
      setSaveLoading(false);
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return (
      <ThemedView>
        <CenteredActivityIndicator />
      </ThemedView>
    );
  }

  if (!cid) {
    // the user is a charity administrator, but has not created a charity
    return <></>;
  }

  const charity = getCharity(cid);
  if (!charity) throw new Error(`charity is undefined for cid ${cid}`);

  return (
    <ThemedView>
      <View style={styles.container}>
        <Text variant="bodyMedium">
          Choose which days & times {charity.c_name} can accept donations
        </Text>
        <Text variant="titleLarge" style={{ marginTop: 20 }}>
          Weekly Hours
        </Text>
        <AvailabilityList
          availability={availabilityList}
          onPlusIconPress={handlePlusIconPress}
          onTrashPress={handleTrashPress}
        />
        <Portal>
          <TimePicker
            visible={timePickerVisible}
            setVisible={setTimePickerVisible}
            startTime={startTime}
            endTime={endTime}
            selected={selectedTime}
            setSelected={setSelectedTime}
            onConfirm={handleConfirm}
            key={selectedId}
          />
        </Portal>
      </View>
      <View style={styles.bottomBar}>
        <View style={{ marginHorizontal: 20 }}>
          <Button onPress={handleSave} mode="contained" disabled={!modified}>
            {saveLoading ? (
              <ActivityIndicator color={theme.colors.onPrimary} />
            ) : (
              <Text style={{ color: theme.colors.onPrimary }}>Save</Text>
            )}
          </Button>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row-reverse',
    margin: 20,
  },
});
