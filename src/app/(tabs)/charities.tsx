import ThemedView from '@/src/components/ThemedView';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function charities() {
  return (
    <ThemedView>
      <View style={styles.container}>
        <Text>Charities</Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
