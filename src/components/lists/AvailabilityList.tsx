import { List } from 'react-native-paper';

import AvailabilityListItem from './AvailabilityListItem';

import { Availability } from '@/src/lib/availability';

type AvailabilityListProps = {
  availability: Availability[];
  onPlusIconPress: (dayOfWeek: number) => void;
  onTrashPress: () => Promise<void>;
};

/**
 * Displays a full weekly list of business hours using the `AvailabilityListItem`
 * component for each day of the week.
 *
 * The component receives an array of availability entries and groups them by
 * `day_of_week` (0–6). Each grouped set is passed to the corresponding
 * `AvailabilityListItem`, which handles rendering of intervals or "Closed"
 * status for that day.
 *
 * Days are rendered in order from Sunday (0) through Saturday (6).
 *
 * @param {Availability[]} props.availability - A flat array of availability objects
 *   that describe open/close periods for various days of the week.
 */
export default function AvailabilityList(props: AvailabilityListProps) {
  // Map day of week to Availability
  const availabilityMap: Map<number, Availability[]> = new Map();
  for (const availability of props.availability) {
    if (!availabilityMap.has(availability.day_of_week)) {
      availabilityMap.set(availability.day_of_week, []);
    }
    availabilityMap.get(availability.day_of_week)!.push(availability);
  }

  return (
    <List.Section>
      <AvailabilityListItem
        dayOfWeek={0}
        availabilityMap={availabilityMap}
        onPlusIconPress={() => props.onPlusIconPress(0)}
        onTrashPress={props.onTrashPress}
      />
      <AvailabilityListItem
        dayOfWeek={1}
        availabilityMap={availabilityMap}
        onPlusIconPress={() => props.onPlusIconPress(1)}
        onTrashPress={props.onTrashPress}
      />
      <AvailabilityListItem
        dayOfWeek={2}
        availabilityMap={availabilityMap}
        onPlusIconPress={() => props.onPlusIconPress(2)}
        onTrashPress={props.onTrashPress}
      />
      <AvailabilityListItem
        dayOfWeek={3}
        availabilityMap={availabilityMap}
        onPlusIconPress={() => props.onPlusIconPress(3)}
        onTrashPress={props.onTrashPress}
      />
      <AvailabilityListItem
        dayOfWeek={4}
        availabilityMap={availabilityMap}
        onPlusIconPress={() => props.onPlusIconPress(4)}
        onTrashPress={props.onTrashPress}
      />
      <AvailabilityListItem
        dayOfWeek={5}
        availabilityMap={availabilityMap}
        onPlusIconPress={() => props.onPlusIconPress(5)}
        onTrashPress={props.onTrashPress}
      />
      <AvailabilityListItem
        dayOfWeek={6}
        availabilityMap={availabilityMap}
        onPlusIconPress={() => props.onPlusIconPress(6)}
        onTrashPress={props.onTrashPress}
      />
    </List.Section>
  );
}
