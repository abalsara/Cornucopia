import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Text,
  Button,
  IconButton,
  Chip,
  Divider,
  useTheme,
  ActivityIndicator,
  Modal,
} from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import { Charity, fetchAllCharities } from '@/src/lib/charities';
import { Rating, fetchRatingsByCid } from '@/src/lib/ratings';
import { supabase } from '@/src/lib/supabase'; // Adjust path as needed
import { getCharities } from '@/src/stores/charities';

// type Charity = {
//   cid: string;
//   c_name: string;
//   city: string;
//   state: string;
//   latitude?: number;
//   longitude?: number;
//   typesServed?: string[];
//   rating?: number;
// };

type CharityFilterProps = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  userLocation: { lat: number; lon: number };
  onApply: (charities: Charity[]) => void;
};

const CAUSES = ['Shelter & Housing', 'Youth', 'Families', 'Education', 'Animals', 'Veterans'];

export default function CharityFilter(props: CharityFilterProps) {
  const theme = useTheme();
  const router = useRouter();

  const [distance, setDistance] = useState(40);
  const [selectedCauses, setSelectedCauses] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(4);
  const [loading, setLoading] = useState(false);
  const [filteredCount, setFilteredCount] = useState(0);

  // User location (you might want to get this from a location service)
  //   const userLocation = {
  //     city: 'Seattle',
  //     state: 'WA',
  //     latitude: 47.6062,
  //     longitude: -122.3321,
  //   };

  const toggleCause = (cause: string) => {
    setSelectedCauses((prev) =>
      prev.includes(cause) ? prev.filter((c) => c !== cause) : [...prev, cause],
    );
  };

  // Fetch filtered charities from Supabase
  let fullyFiltered = [];
  const fetchFilteredCharities = async () => {
    setLoading(true);
    const charities = await fetchAllCharities();
    const filteredByRating =
      charities.filter(async (charity) => {
        const ratingArr: Rating[] = await fetchRatingsByCid(charity.cid);
        let totalRating: number = 0;
        ratingArr.forEach((rating) => (totalRating += rating.star || 0));
        const avg = totalRating / ratingArr.length;
        return avg >= minRating;
      }) || [];
    const filteredByDistance =
      filteredByRating.filter((charity) => {
        const dist = calculateDistance(
          props.userLocation.lat,
          props.userLocation.lon,
          charity.latitude || 0,
          charity.longitude || 0,
        );
        return dist <= distance;
      }) || [];

    const filteredByCause = filteredByDistance.filter((charity) => {
      let b: boolean = false;
      if (charity.causes == null) {
        return false;
      }
      charity.causes.forEach((cause) => {
        if (!b) {
          b = selectedCauses.includes(cause);
        }
      });
      return b;
    });

    fullyFiltered = filteredByCause;

    setFilteredCount(fullyFiltered.length);
    setLoading(false);
    return fullyFiltered;
  };

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 3959; // Earth's radius in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Update count when filters change
  useEffect(() => {
    fetchFilteredCharities();
  }, [distance, selectedCauses, minRating]);

  const handleApply = async () => {
    const filtered = await fetchFilteredCharities();
    props.setIsVisible(false);
    props.onApply(filtered);
  };

  const handleClear = () => {
    const charities = getCharities();
    setDistance(40);
    setSelectedCauses([]);
    setMinRating(4);
    props.setIsVisible(false);
    props.onApply(charities);
  };

  return (
    <Modal visible={props.isVisible}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Charity Filters
          </Text>
          <IconButton icon="close" onPress={() => router.back()} />
        </View>

        {/* Distance Filter */}
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Distance From You
        </Text>
        <Text style={styles.subText}>
          Showing charities within{' '}
          <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>{distance} miles</Text>{' '}
          of user
        </Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={5}
          maximumValue={50}
          step={5}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor="#ddd"
          thumbTintColor={theme.colors.primary}
          value={distance}
          onValueChange={setDistance}
        />
        <View style={styles.rangeLabels}>
          <Text>5mi</Text>
          <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>{distance}mi</Text>
          <Text>50mi</Text>
        </View>

        <Divider style={{ marginVertical: 16 }} />

        {/* Cause Filter */}
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Cause
        </Text>
        <View style={styles.chipContainer}>
          {CAUSES.map((cause) => (
            <Chip
              key={cause}
              mode={selectedCauses.includes(cause) ? 'flat' : 'outlined'}
              selected={selectedCauses.includes(cause)}
              onPress={() => toggleCause(cause)}
              style={[
                styles.chip,
                selectedCauses.includes(cause) && {
                  backgroundColor: theme.colors.primary,
                },
              ]}
              textStyle={{
                color: selectedCauses.includes(cause) ? '#fff' : theme.colors.onSurface,
              }}>
              {cause}
            </Chip>
          ))}
        </View>

        <Button mode="text" onPress={() => {}} style={{ alignSelf: 'flex-start', marginTop: 4 }}>
          Show More ↓
        </Button>

        <Divider style={{ marginVertical: 16 }} />

        {/* Reviews Filter */}
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Reviews
        </Text>
        <Text style={styles.subText}>
          Showing charities with reviews better than{' '}
          <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>{minRating}★</Text>
        </Text>
        <View style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <IconButton
              key={star}
              icon={star <= minRating ? 'star' : 'star-outline'}
              iconColor={star <= minRating ? theme.colors.primary : '#ccc'}
              size={32}
              onPress={() => setMinRating(star)}
            />
          ))}
        </View>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <Button
            mode="outlined"
            onPress={handleClear}
            style={styles.clearBtn}
            labelStyle={{ color: theme.colors.onSurface }}>
            Clear All
          </Button>
          <Button
            mode="contained"
            onPress={handleApply}
            style={[styles.applyBtn, { backgroundColor: theme.colors.primary }]}
            loading={loading}
            disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : `Show ${filteredCount} charities`}
          </Button>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subText: {
    color: '#555',
    marginBottom: 8,
    fontSize: 14,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  chip: {
    marginVertical: 4,
  },
  starContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 12,
  },
  clearBtn: {
    flex: 1,
    borderColor: '#ddd',
  },
  applyBtn: {
    flex: 1,
  },
});
