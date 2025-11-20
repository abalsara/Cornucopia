import { View } from 'react-native';
import { TimePickerModal } from 'react-native-paper-dates';
import { PossibleInputTypes } from 'react-native-paper-dates/lib/typescript/Time/timeUtils';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type TimePickerProps = {
  onConfirm: (hours: number, minutes: number) => void;
  onDismiss: () => void;
  visible: boolean;
  label?: string;
  defaultInputType?: PossibleInputTypes;
};

/**
 * clock modal that allows the user to select a time
 */
export default function TimePicker(props: TimePickerProps) {
  return (
    <SafeAreaProvider>
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <TimePickerModal
          label={props.label}
          visible={props.visible}
          onDismiss={props.onDismiss}
          onConfirm={({ hours, minutes }) => props.onConfirm(hours, minutes)}
          hours={9}
          minutes={0}
          defaultInputType={props.defaultInputType}
        />
      </View>
    </SafeAreaProvider>
  );
}
