import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import CenteredActivityIndicator from '@/src/components/CenteredActivityIndicator';
import ThemedView from '@/src/components/ThemedView';
import AvailabilityList from '@/src/components/lists/AvailabilityList';
import TimePicker from '@/src/components/modals/TimePicker';
import { Availability, fetchAvailabilityByAdmin, insertAvailability } from '@/src/lib/availability';
import { getCharity } from '@/src/stores/charities';

/**
 * This tab renders the drop off hours for the charity that the user is an administrator of
 */
export default function AvailabilityTab() {
  const [cid, setCid] = useState<string | null>(null);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [dayOfWeek, setDayOfWeek] = useState<number | undefined>(undefined);
  const [openTime, setOpenTime] = useState<Date | undefined>(undefined);
  const [closeTime, setCloseTime] = useState<Date | undefined>(undefined);
  const [openTimeModalVisible, setOpenTimeModalVisible] = useState(false);
  const [closeTimeModalVisible, setCloseTimeModalVisible] = useState(false);

  // Synchronize availability with database
  useEffect(() => {
    syncAvailability().then(() => setLoading(false));
  }, []);

  const syncAvailability = async (): Promise<void> => {
    const { cid, availability } = await fetchAvailabilityByAdmin();
    setCid(cid);
    setAvailability(availability);
  };

  /**
   * Opens the time selection modal for creating a new availability entry.
   *
   * @param dayOfWeek - The day of the week (0–6) that the user wants to add availability for.
   */
  const handlePlusIconPress = (dayOfWeek: number): void => {
    setDayOfWeek(dayOfWeek);
    setOpenTimeModalVisible(true);
  };

  /**
   * Refreshes the availability state after a child component deletes an entry.
   * Ensures the UI stays in sync with the database.
   */
  const handleTrashPress = async (): Promise<void> => {
    await syncAvailability();
  };

  /**
   * Called when the user confirms the time on the open TimePicker modal.
   * Sets the openTime state and then renders the close TimePicker modal.
   *
   * @param hours - The hour returned by the TimePicker
   * @param minutes - The minutes returned by the TimePicker
   */
  const handleConfirmOpenTime = (hours: number, minutes: number): void => {
    const date = new Date();
    date.setHours(hours, minutes);
    setOpenTime(date);
    setOpenTimeModalVisible(false);
    setCloseTimeModalVisible(true);
  };

  /**
   * Called when the user confirms the time on the close TimePicker modal.
   * Sets the closeTime state and then inserts the Availability object into the db.
   *
   * @param hours - The hour returned by the TimePicker
   * @param minutes - The minutes returned by the TimePicker
   */
  const handleConfirmCloseTime = async (hours: number, minutes: number): Promise<void> => {
    const date = new Date();
    date.setHours(hours, minutes);
    setCloseTime(date);
    if (cid === null || dayOfWeek === undefined || openTime === undefined) {
      throw new Error(
        `Invalid parameters: {dayOfWeek: ${dayOfWeek}, openTime: ${openTime}, closeTime: ${closeTime}}`,
      );
    }
    try {
      setLoading(true);
      setCloseTimeModalVisible(false);
      await insertAvailability(cid, dayOfWeek, openTime, date);
      await syncAvailability();
      setLoading(false);
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
          availability={availability}
          onPlusIconPress={handlePlusIconPress}
          onTrashPress={handleTrashPress}
        />

        <TimePicker
          label="Select opening time"
          visible={openTimeModalVisible}
          onConfirm={handleConfirmOpenTime}
          onDismiss={() => setOpenTimeModalVisible(false)}
        />
        <TimePicker
          label="Select closing time"
          visible={closeTimeModalVisible}
          onConfirm={async (hours, minutes) => handleConfirmCloseTime(hours, minutes)}
          onDismiss={() => setCloseTimeModalVisible(false)}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
});
