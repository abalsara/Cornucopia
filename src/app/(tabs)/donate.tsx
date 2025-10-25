/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, IconButton, Text, TextInput } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';

export default function FindCharityScreen() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [useLocation, setUseLocation] = useState(false);
  const router = useRouter();

  const searchNearbyCharities = async (lat: number, lon: number) => {
    console.log(`Searching for charities near (${lat}, ${lon})...`);
    // Replace with backend or public charity API call
    // const response = await fetch(`https://api.example.com/charities?lat=${lat}&lon=${lon}`);
    // const results = await response.json();
  };

  const handleSearchPress = () => {
    Alert.alert(
      'Use Your Location?',
      'Would you like to use your current location to find charities nearby?',
      [
        {
          text: 'No, search manually',
          onPress: () => setSearchVisible(true),
          style: 'cancel',
        },
        {
          text: 'Yes, use location',
          onPress: async () => {
            try {
              const { status } = await Location.requestForegroundPermissionsAsync();
              if (status !== 'granted') {
                Alert.alert(
                  'Permission denied',
                  'Location permission is required to find nearby charities.',
                );
                return;
              }

              const location = await Location.getCurrentPositionAsync({});
              const { latitude, longitude } = location.coords;
              setUseLocation(true);
              // Call charity search logic here
              // await searchNearbyCharities(latitude, longitude);
            } catch (error) {
              console.error('Error getting location:', error);
              Alert.alert('Error', 'Failed to retrieve your location.');
            }
          },
        },
      ],
    );
  };

  const handleInfoPress = (): void => {
    router.push('/pages/donationInfo');
  };

  const handleSubmitSearch = () => {
    // implement search for city / zip here
    const text = searchText;
    if (isValidZipCode(text)) {
      // zipcode
    } else {
      // city
    }
    console.log('Searching for:', searchText);
  };

  /**
   * Checks if a string is a valid US ZIP code (5-digit or ZIP+4).
   */
  function isValidZipCode(zipCode: string) {
    const pattern = /^\d{5}(?:-\d{4})?$/;
    return pattern.test(zipCode);
  }

  return (
    <ThemedView>
      <View style={styles.headerRow}>
        <Text variant="headlineMedium" style={styles.title}>
          Find a Charity
        </Text>
        <IconButton icon="information-outline" onPress={handleInfoPress} />
      </View>

      <Text variant="bodyMedium" style={styles.subtitle}>
        Search by zip code, city, or use your own location.
      </Text>

      {!searchVisible ? (
        <Button
          mode="outlined"
          icon="magnify"
          style={styles.searchButton}
          onPress={handleSearchPress}>
          Search by location
        </Button>
      ) : (
        <TextInput
          mode="outlined"
          label="Search by city or zip"
          value={searchText}
          onChangeText={setSearchText}
          right={<TextInput.Icon icon="magnify" onPress={handleSubmitSearch} />}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
  },
  subtitle: {
    color: '#888',
    marginBottom: 20,
  },
  searchButton: {
    borderRadius: 10,
    marginBottom: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
});
