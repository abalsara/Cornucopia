import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { JSX } from 'react';
import { View } from 'react-native';
import { List, Text, useTheme } from 'react-native-paper';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';

import DayIcon from '../icons/DayIcon';

import { Availability } from '@/src/lib/availability';
import { formatTimeFromString } from '@/src/util/dateTimeFormatter';

type AvailabilityListItemProps = {
  dayOfWeek: number;
  availabilityMap: Map<number, Availability[]>;
  onPlusIconPress: () => void;
  onTrashPress: (id: string) => void;
};

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Renders the availability information for a specific day of the week.
 *
 * Displays one or more time intervals for the given day, or "Closed" if no
 * availability exists in the provided map. Each entry includes an icon that
 * represents the day and a right-aligned action icon.
 *
 * @param {number} props.dayOfWeek - Numeric day of the week (0–6), used to select the matching availability and corresponding icon.
 * @param {Map<number, Availability[]>} props.availabilityMap - A map of dayOfWeek → availability entries for that day.
 */
export default function AvailabilityListItem(props: AvailabilityListItemProps) {
  const theme = useTheme();
  const availabilityList = props.availabilityMap.get(props.dayOfWeek);

  if (!availabilityList) {
    return (
      <List.Item
        title="Closed"
        left={() => <DayIcon day={days[props.dayOfWeek]} />}
        right={(rightProps) => (
          <AntDesign {...rightProps} name="plus-circle" size={24} onPress={props.onPlusIconPress} />
        )}
      />
    );
  }

  const renderRightButtons = (
    rightProps: { color: string; style?: Style },
    availability: Availability,
  ): JSX.Element => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <FontAwesome
          {...rightProps}
          name="trash-o"
          size={24}
          color={theme.colors.error}
          onPress={() => props.onTrashPress(availability.id)}
        />
        <AntDesign {...rightProps} name="plus-circle" size={24} onPress={props.onPlusIconPress} />
      </View>
    );
  };

  return availabilityList.map((availability) => {
    const item = (
      <List.Item
        key={availability.id}
        title={
          <Text style={{ marginLeft: 'auto' }}>
            {formatTimeFromString(availability.open_time)} -{' '}
            {formatTimeFromString(availability.close_time)}
          </Text>
        }
        left={() => <DayIcon day={days[props.dayOfWeek]} />}
        right={(rightProps) => renderRightButtons(rightProps, availability)}
      />
    );

    return item;
  });
}
