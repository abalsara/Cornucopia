import { View } from 'react-native';
import { TimePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type TimePickerProps = {
  onConfirm: (hours: number, minutes: number) => void;
  onDismiss: () => void;
  visible: boolean;
};

/**
 * clock modal that allows the user to select a time
 */
export default function TimePicker(props: TimePickerProps) {
  return (
    <SafeAreaProvider>
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <TimePickerModal
          visible={props.visible}
          onDismiss={props.onDismiss}
          onConfirm={({ hours, minutes }) => props.onConfirm(hours, minutes)}
          hours={9}
          minutes={0}
        />
      </View>
    </SafeAreaProvider>
  );
}
