import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

/**
 * A simple utility component that centers a loading spinner vertically
 * within its container. Useful for displaying loading states while data
 * is being fetched or processed.
 */
export default function CenteredActivityIndicator() {
  return (
    <View style={{ flex: 1, marginVertical: 'auto' }}>
      <ActivityIndicator />
    </View>
  );
}
