import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { List } from 'react-native-paper';

import { Availability } from '@/src/lib/availability';
import { formatTimeFromString } from '@/src/util/dateTimeFormatter';

type AvailabilityListItemProps = {
  dayOfWeek: number;
  availabilityMap: Map<number, Availability[]>;
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
  const availability = props.availabilityMap.get(props.dayOfWeek);

  if (!availability) {
    return (
      <List.Item
        title="Closed"
        left={(leftProps) => (
          <MaterialCommunityIcons {...leftProps} name={iconNames[props.dayOfWeek]} size={40} />
        )}
        right={(rightProps) => <AntDesign {...rightProps} name="plus-circle" size={24} />}
      />
    );
  }

  return availability.map((a) => {
    const closed = a.is_closed;

    const item = (
      <List.Item
        key={a.id + '-' + a.period_index}
        title={
          closed
            ? 'Closed'
            : `${formatTimeFromString(a.open_time)} - ${formatTimeFromString(a.close_time)}`
        }
        left={(leftProps) => (
          <MaterialCommunityIcons {...leftProps} name={iconNames[a.day_of_week]} size={40} />
        )}
        right={(rightProps) => <AntDesign {...rightProps} name="plus-circle" size={24} />}
      />
    );

    return item;
  });
}
