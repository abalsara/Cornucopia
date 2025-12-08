import { JSX, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Button, Modal, Text, useTheme } from 'react-native-paper';

import { formatTime } from '@/src/util/dateTimeFormatter';

type TimePickerProps = {
  startTime: Date;
  endTime: Date;
  visible: boolean;
  selected: 'start' | 'end';
  setSelected: (status: 'start' | 'end') => void;
  onConfirm: (startTime: Date, endTime: Date) => void;
  setVisible: (status: boolean) => void;
};

/**
 * Renders a bottom-sheet style modal that allows a charity admin to enter a start time and end time
 * for a day of the week on the availability tab.
 */
export default function TimePicker(props: TimePickerProps) {
  const [startTime, setStartTime] = useState<Date>(props.startTime);
  const [endTime, setEndTime] = useState<Date>(props.endTime);
  const theme = useTheme();

  const startTimeColor =
    props.selected === 'start' ? theme.colors.background : theme.colors.surfaceDisabled;
  const endTimeColor =
    props.selected === 'end' ? theme.colors.background : theme.colors.surfaceDisabled;

  const renderDatePicker = (): JSX.Element => {
    if (props.selected === 'start') {
      return (
        <DatePicker date={startTime} onDateChange={(time) => setStartTime(time)} mode="time" />
      );
    }
    return <DatePicker date={endTime} onDateChange={(time) => setEndTime(time)} mode="time" />;
  };

  return (
    <Modal
      visible={props.visible}
      style={styles.modal}
      contentContainerStyle={{
        backgroundColor: theme.colors.background,
      }}>
      <View
        style={{
          ...styles.content,
          backgroundColor: theme.colors.surfaceDisabled,
        }}>
        <Pressable style={{ flex: 1 }} onPress={() => props.setSelected('start')}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: startTimeColor,
              borderTopRightRadius: 5,
            }}>
            <Text>Start time</Text>
            <Text>{formatTime(startTime)}</Text>
          </View>
        </Pressable>
        <Pressable style={{ flex: 1 }} onPress={() => props.setSelected('end')}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: endTimeColor,
              borderTopLeftRadius: 5,
            }}>
            <Text>End time</Text>
            <Text>{formatTime(endTime)}</Text>
          </View>
        </Pressable>
      </View>
      <View style={{ alignSelf: 'center' }}>{renderDatePicker()}</View>
      <View style={styles.buttons}>
        <Button onPress={() => props.onConfirm(startTime, endTime)} mode="contained">
          Use these times
        </Button>
        <Button onPress={() => props.setVisible(false)}>Cancel</Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttons: {
    marginHorizontal: 20,
    gap: 8,
    marginBottom: 10,
  },
});
