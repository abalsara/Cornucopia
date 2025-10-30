import { View } from 'react-native';
import { DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type DatePickerProps = {
  onConfirm: (date?: number) => void;
  onDismiss: () => void;
  visible: boolean;
};

export default function DatePicker(props: DatePickerProps) {
  return (
    <SafeAreaProvider>
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={props.visible}
          onDismiss={props.onDismiss}
          date={undefined}
          onConfirm={(params) => props.onConfirm(params.date?.getTime())}
        />
      </View>
    </SafeAreaProvider>
  );
}
