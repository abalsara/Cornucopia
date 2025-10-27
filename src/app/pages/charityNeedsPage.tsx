import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import CharityNeedsList from '@/src/components/lists/charityNeeds/CharityNeedsList';
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
    </ThemedView>
  );
}
