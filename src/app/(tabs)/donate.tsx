/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, IconButton, Text, TextInput, useTheme } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import { LatLng, geocodePartialAddress } from '@/src/lib/geocode';
import { waCities } from '@/src/stores/data/waCities';

export const waZipCodes = [
  '98001',
  '98002',
  '98003',
  '98004',
  '98005',
  '98006',
  '98101',
  '98102',
  '98103',
  '98104',
  '98105',
  '98106',
];

export default function FindCharityScreen() {
  const theme = useTheme();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [useLocation, setUseLocation] = useState(false);
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const updateSuggestions = (text: string) => {
    setSearchText(text);

    if (!text.trim()) {
      setSuggestions([]);
      return;
    }

    const lower = text.toLowerCase();

    const cityMatches = waCities.filter((c) => c.toLowerCase().startsWith(lower));

    const zipMatches = waZipCodes.filter((z) => z.startsWith(text));

    // show both, prioritize cities
    const results = [...cityMatches, ...zipMatches].slice(0, 8);
    setSuggestions(results);
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
              router.push(`/pages/charityResults?lat=${latitude}&lon${longitude}`);
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

  const handleSubmitSearch = async () => {
    // implement search for city / zip here
    const text = searchText;
    let zipCode: string | undefined = undefined;
    let city: string | undefined = undefined;
    if (isValidZipCode(text)) {
      zipCode = text;
    } else {
      city = text;
    }
    try {
      const coords: LatLng = await geocodePartialAddress(city, '', zipCode);
      router.push(`/pages/charityResults?lat=${coords.lat}&lon=${coords.lng}&search=${text}`);
      console.log('Searching for:', searchText);
    } catch (error) {
      throw error;
    }
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
      <View style={{ marginHorizontal: 20 }}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text variant="headlineLarge" style={styles.headerTitle}>
              Find a Charity
            </Text>
            <Text
              variant="bodyMedium"
              style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
              Search by zip code, city, or use your own location.
            </Text>
          </View>
          <IconButton icon="information-outline" onPress={handleInfoPress} />
        </View>

        {!searchVisible ? (
          <Button
            mode="outlined"
            icon="magnify"
            style={styles.searchButton}
            onPress={handleSearchPress}>
            Search by location
          </Button>
        ) : (
          <>
            <TextInput
              mode="outlined"
              label="Search by city or zip"
              value={searchText}
              onChangeText={updateSuggestions}
              right={<TextInput.Icon icon="magnify" onPress={handleSubmitSearch} />}
            />

            {suggestions.length > 0 && (
              <View style={styles.dropdown}>
                {suggestions.map((item, index) => (
                  <Button
                    key={index}
                    mode="text"
                    onPress={() => {
                      setSearchText(item);
                      setSuggestions([]);
                    }}
                    contentStyle={{ justifyContent: 'flex-start' }}
                    style={styles.dropdownItem}>
                    {item}
                  </Button>
                ))}
              </View>
            )}
          </>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginTop: 4,
    elevation: 3,
    paddingVertical: 4,
  },
  dropdownItem: {
    alignItems: 'flex-start',
  },
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerTitle: {
    fontWeight: '500',
  },
  subtitle: {
    marginTop: 6,
    marginRight: 8,
  },
  headerLeft: {
    flex: 1,
    paddingRight: 8,
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
