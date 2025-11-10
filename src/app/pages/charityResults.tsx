import { useRouter } from 'expo-router';
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Card, IconButton, Avatar, useTheme } from 'react-native-paper';

import { Charity } from '@/src/lib/charities';
import { getCharities } from '@/src/stores/charities';

// const charities: Charity[] = [
//   // PLACEHOLDER CHARITIES
//   {
//     name: 'Charity Name',
//     typesServed: ['Veterans', 'Homelessness'],
//     location: 'Location',
//     rating: 4.7,
//   },
//   {
//     name: 'Friends of Youth',
//     typesServed: ['Youth', 'Homelessness'],
//     location: 'Bellevue, WA',
//     rating: 4.2,
//   },
//   {
//     name: 'Timberlake Church',
//     typesServed: ['Church', 'Families'],
//     location: 'Redmond, WA',
//     rating: 4.7,
//   },
// ];

export default function CharityResults() {
  const theme = useTheme();
  const router = useRouter();

  const charities = getCharities();

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />
        <View style={styles.headerTextContainer}>
          <Text variant="titleLarge" style={styles.headerTitle}>
            Charities Near Seattle
          </Text>
          <Text variant="labelMedium" style={styles.headerSubtitle}>
            within 50 miles
          </Text>
        </View>
        <IconButton
          icon="filter-variant"
          size={24}
          onPress={() => {} /* Include filtering function here */}
        />
      </View>

      {/* Results Count */}
      <Text style={styles.resultsText}>{charities.length} Charities Found</Text>

      {/* Charity List */}
      <FlatList
        data={charities}
        keyExtractor={(charity) => charity.cid}
        renderItem={({ item: charity }) => (
          <Card
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: '/pages/charityDetails',
                params: {
                  cid: charity.cid,
                },
              })
            }>
            <View style={styles.cardContent}>
              <Avatar.Icon icon="home-heart" size={48} style={styles.avatar} />
              <View style={styles.charityInfo}>
                <Text variant="titleMedium" style={styles.charityName}>
                  {charity.c_name}
                </Text>
                {/* <Text variant="bodySmall" style={styles.charityTags}>
                  {charity.typesServed.join(' • ')}
                </Text> */}
                <Text
                  variant="bodySmall"
                  style={[styles.charityLocation, { color: theme.colors.onSurfaceVariant }]}>
                  {charity.city}, {charity.state}
                </Text>
              </View>
              {/* <View style={styles.ratingContainer}>
                <Text variant="titleMedium">⭐ {charity.rating}</Text>
              </View> */}
            </View>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTextContainer: {
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'gray',
  },
  resultsText: {
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
    color: 'gray',
  },
  card: {
    marginVertical: 6,
    borderRadius: 12,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  avatar: {
    marginRight: 12,
  },
  charityInfo: {
    flex: 1,
  },
  charityName: {
    fontWeight: 'bold',
  },
  charityTags: {
    color: 'black',
    marginTop: 2,
  },
  charityLocation: {
    marginTop: 2,
    fontStyle: 'italic',
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
});
