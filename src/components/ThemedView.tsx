import { StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';

type ThemedViewProps = ViewProps;

/**
 * Renders a non-transparent background with color matching the device's theme.
 * Should be used on all non-transparent screens
 */
export default function ThemedView({ ...Props }: ThemedViewProps) {
  const theme = useTheme();

  return <View style={{ ...styles.view, backgroundColor: theme.colors.background }} {...Props} />;
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
