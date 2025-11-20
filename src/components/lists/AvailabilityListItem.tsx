import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { JSX, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, List, Text, useTheme } from 'react-native-paper';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';

import { Availability, deleteAvailability } from '@/src/lib/availability';
import { formatTimeFromString } from '@/src/util/dateTimeFormatter';

type AvailabilityListItemProps = {
  dayOfWeek: number;
  availabilityMap: Map<number, Availability[]>;
  onPlusIconPress: () => void;
  onTrashPress: () => Promise<void>;
};

type IconName =
  | 'alpha-s-circle-outline'
  | 'alpha-m-circle-outline'
  | 'alpha-t-circle-outline'
  | 'alpha-w-circle-outline'
  | 'alpha-f-circle-outline';

const iconNames: IconName[] = [
  'alpha-s-circle-outline',
  'alpha-m-circle-outline',
  'alpha-t-circle-outline',
  'alpha-w-circle-outline',
  'alpha-t-circle-outline',
  'alpha-f-circle-outline',
  'alpha-s-circle-outline',
];

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
  const [pendingDeleteId, setPendingDeleteId] = useState(''); // track which items are being deleted for loading state
  const theme = useTheme();
  const availabilityList = props.availabilityMap.get(props.dayOfWeek);

  if (!availabilityList) {
    return (
      <List.Item
        title="Closed"
        left={(leftProps) => (
          <MaterialCommunityIcons {...leftProps} name={iconNames[props.dayOfWeek]} size={40} />
        )}
        right={(rightProps) => (
          <AntDesign {...rightProps} name="plus-circle" size={24} onPress={props.onPlusIconPress} />
        )}
      />
    );
  }

  /**
   * Deletes a specific availability entry and synce the availability tab with the database.
   * Displays a loading indicator for the row being deleted.
   *
   * @param {string} availability - The availability record to delete.
   */
  const handleTrashPress = async (availability: Availability): Promise<void> => {
    setPendingDeleteId(availability.id);
    await deleteAvailability(availability.id);
    await props.onTrashPress();
    setPendingDeleteId('');
  };

  const renderRightButtons = (
    rightProps: { color: string; style?: Style },
    availability: Availability,
  ): JSX.Element => {
    // replace the trash icon with an activity indicator if it is being deleted
    if (pendingDeleteId === availability.id) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <ActivityIndicator color={theme.colors.error} />
          <AntDesign {...rightProps} name="plus-circle" size={24} onPress={props.onPlusIconPress} />
        </View>
      );
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        <FontAwesome
          {...rightProps}
          name="trash-o"
          size={24}
          color={theme.colors.error}
          onPress={async () => handleTrashPress(availability)}
        />
        <AntDesign {...rightProps} name="plus-circle" size={24} onPress={props.onPlusIconPress} />
      </View>
    );
  };

  return availabilityList.map((availability) => {
    const item = (
      <List.Item
        key={availability.id + '-' + availability.period_index}
        title={
          <Text style={{ marginLeft: 'auto' }}>
            {formatTimeFromString(availability.open_time)} -{' '}
            {formatTimeFromString(availability.close_time)}
          </Text>
        }
        left={(leftProps) => (
          <MaterialCommunityIcons
            {...leftProps}
            name={iconNames[availability.day_of_week]}
            size={40}
          />
        )}
        right={(rightProps) => renderRightButtons(rightProps, availability)}
      />
    );

    return item;
  });
}
