import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';

export default function Messages() {
  return (
    <ThemedView>
      <View style={styles.container}>
        <Text>Messages</Text>
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
