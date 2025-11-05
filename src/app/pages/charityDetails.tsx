import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Text } from 'react-native-paper';

import { getCharity } from '@/src/stores/charities';

export default function CharityDetails() {
  const { cid } = useLocalSearchParams<{
    cid: string;
    // location: string;
    // typesServed?: string; // can serialize array as JSON string
    // rating?: string;
    // mission?: string;
    // reviews?: string;
  }>();

  const charity = getCharity(cid);
  if (!charity) throw new Error(`charity with cid: ${cid} does not exist`);

  // const parsedTypesServed: string[] = typesServed ? JSON.parse(typesServed) : [];
  // const parsedRating = rating ? parseFloat(rating) : 0;
  // const parsedReviews = reviews ? parseInt(reviews, 10) : 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />
        <IconButton icon="bell-outline" size={24} onPress={() => {}} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Name & Info */}
        <View style={styles.nameSection}>
          <Text variant="headlineSmall" style={styles.charityName}>
            {charity?.c_name}
          </Text>
          {/* <Text variant="bodyMedium" style={styles.charityTags}>
            {parsedTypesServed?.join(' • ')}
          </Text> */}

          {/* <View style={styles.ratingRow}>
            <Text variant="titleMedium">⭐ {parsedRating}</Text>
            <Divider style={styles.dividerVertical} />
            <Text variant="bodyMedium">{parsedReviews ?? 0} Reviews</Text>
          </View> */}
        </View>

        {/* Mission Section */}
        {/* <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Mission
          </Text>
          <Card style={styles.infoCard}>
            <Card.Content>
              <Text variant="bodyMedium" style={styles.paragraph}>
                {mission ?? 'This charity’s mission statement is currently unavailable.'}
              </Text>
            </Card.Content>
          </Card>
        </View> */}

        {/* Location & Logistics */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Location & Logistics
          </Text>
          <Card style={styles.infoCard}>
            <Card.Content>
              <Text variant="bodyMedium" style={styles.address}>
                📍 {charity.city}, {charity.state}
              </Text>
              <Text variant="bodySmall" style={styles.paragraph}>
                Description of drop-off hours and rules.
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Actions
          </Text>
          <Card style={styles.actionCard} onPress={() => {}}>
            <Card.Content style={styles.actionRow}>
              <Text variant="bodyLarge">💬 Message Charity</Text>
              <IconButton icon="chevron-right" size={20} />
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomBar}>
        <Button
          mode="contained"
          onPress={() => router.push(`/pages/charityNeedsPage?cid=${cid}`)}
          style={styles.bottomButton}>
          Browse {charity.c_name}’s Needs
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingTop: 8,
  },
  nameSection: {
    alignItems: 'center',
    marginVertical: 16,
  },
  charityName: {
    fontWeight: 'bold',
  },
  charityTags: {
    color: 'gray',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  dividerVertical: {
    height: 20,
    width: 1,
    backgroundColor: 'gray',
    marginHorizontal: 8,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoCard: {
    borderRadius: 12,
  },
  paragraph: {
    lineHeight: 20,
  },
  address: {
    fontWeight: '600',
    marginBottom: 6,
  },
  actionCard: {
    borderRadius: 12,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  bottomButton: {
    borderRadius: 12,
    paddingVertical: 4,
  },
});
