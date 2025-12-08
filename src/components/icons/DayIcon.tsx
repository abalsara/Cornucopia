import { StyleSheet, View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

type DayIconProps = {
  day: string;
};

/**
 * Renders a custom icon for the given day for the availability tab
 * @param props.day - Day of the week (0 - 6)
 */
export default function DayIcon(props: DayIconProps) {
  const theme = useTheme();
  return (
    <View style={[styles.circle, { backgroundColor: theme.colors.primary }]}>
      <Text style={[styles.text, { color: theme.colors.onPrimary }]}>{props.day}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 48,
    height: 48,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 15,
  },
});
