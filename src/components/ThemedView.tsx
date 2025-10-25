import { StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';

type ThemedViewProps = ViewProps;

export default function ThemedView({ ...Props }: ThemedViewProps) {
  const theme = useTheme();

  return (
    <View style={{ ...styles.view, backgroundColor: theme.colors.background }} {...Props}></View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
