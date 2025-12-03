import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

import { DonationItem } from '@/src/types/DonationItem/DonationItem.types';
import { getDonationCardSubtitle } from '@/src/util/donationItem';

type Priority = 'Urgent' | 'High Priority' | 'Ongoing' | 'Low';

type DonationItemCardProps = {
  item: DonationItem;
  onPress?: (item: DonationItem) => void;
};

/**
 * Returns the background color for a given priority level
 */
function getPriorityColor(
  priority: string,
  themeColors: { error: string; secondary: string; tertiary: string },
): string {
  switch (priority) {
    case 'Urgent':
      return themeColors.error;
    case 'High Priority':
      return 'rgb(220, 163, 17)';
    case 'Ongoing':
      return themeColors.secondary;
    case 'Low':
      return themeColors.tertiary;
    default:
      return themeColors.tertiary;
  }
}

/**
 * Renders a priority badge/label
 */
function PriorityBadge({ priority }: { priority: string }) {
  const theme = useTheme();
  const themeColors = theme.colors;
  const backgroundColor = getPriorityColor(priority, themeColors);

  return (
    <View style={[styles.priorityBadge, { backgroundColor }]}>
      <Text style={styles.priorityText}>{priority}</Text>
    </View>
  );
}

/**
 * Renders a card for a given DonationItem
 */
export default function DonationItemCard({ item, onPress }: DonationItemCardProps) {
  const cardContent = (
    <>
      <Card.Title title={item.itemName} subtitle={getDonationCardSubtitle(item)} />
      {item.priority && (
        <Card.Content style={styles.badgeContainer}>
          <PriorityBadge priority={item.priority} />
        </Card.Content>
      )}
    </>
  );

  if (onPress) {
    return (
      <Card onPress={() => onPress(item)} style={styles.card}>
        {cardContent}
      </Card>
    );
  }
  return <Card style={styles.card}>{cardContent}</Card>;
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
  },
  badgeContainer: {
    paddingTop: 0,
    paddingBottom: 12,
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  priorityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
