import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import CenteredActivityIndicator from '@/src/components/CenteredActivityIndicator';
import ThemedView from '@/src/components/ThemedView';
import AvailabilityList from '@/src/components/lists/AvailabilityList';
import TimePicker from '@/src/components/modals/TimePicker';
import { Availability, fetchAvailabilityByCid, insertAvailability } from '@/src/lib/availability';
import { getAdmin } from '@/src/stores/admin';
import { getCharity } from '@/src/stores/charities';

/**
 * This tab renders the drop off hours for the charity that the user is an administrator of
 */
export default function AvailabilityTab() {
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [dayOfWeek, setDayOfWeek] = useState<number | undefined>(undefined);
  const [openTime, setOpenTime] = useState<Date | undefined>(undefined);
  const [closeTime, setCloseTime] = useState<Date | undefined>(undefined);
  const [openTimeModalVisible, setOpenTimeModalVisible] = useState(false);
  const [closeTimeModalVisible, setCloseTimeModalVisible] = useState(false);

  const admin = getAdmin();
  if (!admin) throw new Error('admin is undefined');
  const cid = admin.cid;

  // Synchronize availability state with database
  useEffect(() => {
    if (cid) {
      fetchAvailabilityByCid(cid)
        .then((val) => {
          setAvailability(val);
          setLoading(false);
        })
        .catch((error) => {
          throw error;
        });
    }
  }, [cid]);

  // Callback function that is executed when the plus icon is pressed in AvailabilityListItem
  const handlePlusIconPress = (dayOfWeek: number): void => {
    if (!cid) throw new Error('Error while calling handlePlusIconPress: cid is undefined');
    setDayOfWeek(dayOfWeek);
    setOpenTimeModalVisible(true);
  };

  // Callback function that is executed when the trash icon is pressed in AvailabilityListItem
  const handleTrashPress = async (): Promise<void> => {
    if (!cid) {
      throw new Error(`cid is null`);
    }
    try {
      setAvailability(await fetchAvailabilityByCid(cid));
    } catch (error) {
      throw error;
    }
  };

  const handleConfirmOpenTime = (hours: number, minutes: number): void => {
    const date = new Date();
    date.setHours(hours, minutes);
    setOpenTime(date);
    setOpenTimeModalVisible(false);
    setCloseTimeModalVisible(true);
  };

  const handleConfirmCloseTime = async (hours: number, minutes: number): Promise<void> => {
    const date = new Date();
    date.setHours(hours, minutes);
    setCloseTime(date);
    if (cid === null || dayOfWeek === undefined || openTime === undefined) {
      throw new Error(
        `Invalid parameters: {cid: ${cid}, dayOfWeek: ${dayOfWeek}, openTime: ${openTime}, closeTime: ${closeTime}}`,
      );
    }
    try {
      setLoading(true);
      setCloseTimeModalVisible(false);
      await insertAvailability(cid, dayOfWeek, openTime, date);
      setAvailability(await fetchAvailabilityByCid(cid));
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
          Choose which days & times your organization can accept donations
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
