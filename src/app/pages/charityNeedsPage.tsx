import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import CharityNeedsList from '@/src/components/lists/CharityNeedsList';
import { getCharityNeeds } from '@/src/lib/needs';

export default function CharityNeedsPage() {
  const { cid } = useLocalSearchParams<{ cid: string }>();
  const items = getCharityNeeds(cid);

  return (
    <ThemedView>
      <ScrollView style={{ marginHorizontal: 20 }}>
        <Text variant="titleLarge">Needs</Text>
        <CharityNeedsList items={items} />
      </ScrollView>
      <Divider />
      <Button
        style={styles.button}
        // onPress={() => router.push('/pages/startDonation')}
        labelStyle={styles.buttonText}
        contentStyle={styles.buttonContent}
        mode="contained">
        Start your donation
      </Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 20,
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'light',
  },
  buttonContent: {
    height: 60,
  },
});
