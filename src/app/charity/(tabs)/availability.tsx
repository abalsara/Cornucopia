import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import CenteredActivityIndicator from '@/src/components/CenteredActivityIndicator';
import ThemedView from '@/src/components/ThemedView';
import AvailabilityList from '@/src/components/lists/AvailabilityList';
import { Availability, fetchAvailabilityByCid } from '@/src/lib/availability';
import { getAdmin } from '@/src/stores/admin';
import { getCharity } from '@/src/stores/charities';

/**
 * This tab renders the drop off hours for the charity that the user is an administrator of
 */
export default function AvailabilityTab() {
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);

  const admin = getAdmin();
  if (!admin) throw new Error('admin is undefined');
  const cid = admin.cid;

  useEffect(() => {
    if (cid) {
      fetchAvailabilityByCid(cid)
        .then((val) => {
          console.log(val.toString());
          setAvailability(val);
          setLoading(false);
        })
        .catch((error) => {
          throw error;
        });
    }
  }, []);

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
  if (!charity) throw new Error('charity is undefined');

  return (
    <ThemedView>
      {/* <Navbar title="Drop-off Availability" backButtonShown={false} /> */}
      <View style={styles.container}>
        <Text variant="bodyMedium">
          Choose which days & times your organization can accept donations
        </Text>
        <Text variant="titleLarge">Weekly Hours</Text>
        <AvailabilityList availability={availability} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
});
