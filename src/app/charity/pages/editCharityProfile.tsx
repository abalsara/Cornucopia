import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Chip,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import { getCharityByAdmin, updateCharity, type Charity } from '@/src/lib/charities';
import { supabase } from '@/src/lib/supabase';

const CAUSES = ['Shelter & Housing', 'Youth', 'Families', 'Education', 'Animals', 'Veterans'];

export default function EditCharityProfileScreen() {
  const [charity, setCharity] = useState<Charity | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const [charityName, setCharityName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [mission, setMission] = useState('');
  const [selectedCauses, setSelectedCauses] = useState<string[]>([]);

  useEffect(() => {
    loadCharity();
  }, []);

  const loadCharity = async () => {
    try {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user?.id) {
        router.replace('/auth');
        return;
      }

      const data = await getCharityByAdmin(session.user.id);
      setCharity(data);

      // Pre-fill form with existing data
      setCharityName(data.c_name ?? '');
      setEmail(data.email ?? '');
      setPhone(data.phone_num ?? '');
      setAddress(data.address ?? '');
      setCity(data.city ?? '');
      setState(data.state ?? '');
      setZipCode(data.zip_code ?? '');
      setMission(data.mission ?? '');
      setSelectedCauses(data.causes ?? []);
    } catch (error) {
      console.error('Error loading charity:', error);
      Alert.alert('Error', 'Failed to load charity profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleCause = (cause: string) => {
    setSelectedCauses((prev) =>
      prev.includes(cause) ? prev.filter((c) => c !== cause) : [...prev, cause],
    );
  };

  const handleSave = async () => {
    if (!charity?.cid) {
      Alert.alert('Error', 'Unable to save charity profile. Please try again.');
      return;
    }

    // Basic validation
    if (!charityName.trim()) {
      Alert.alert('Validation Error', 'Charity name is required.');
      return;
    }

    if (!address.trim() || !city.trim() || !state.trim() || !zipCode.trim()) {
      Alert.alert('Validation Error', 'Complete address is required.');
      return;
    }

    if (email && !email.includes('@')) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    try {
      setSaving(true);

      const updates = {
        c_name: charityName.trim(),
        email: email.trim() || null,
        phone_num: phone.trim() || null,
        address: address.trim(),
        city: city.trim(),
        state: state.trim(),
        zip_code: zipCode.trim(),
        mission: mission.trim(),
        causes: selectedCauses.length > 0 ? selectedCauses : null,
      };

      await updateCharity(charity.cid, updates);

      Alert.alert('Success', 'Charity profile updated successfully!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error('Error updating charity:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      Alert.alert('Error', `Failed to update charity profile: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <ThemedView>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <IconButton icon="arrow-left" size={28} onPress={handleCancel} />
          <Text variant="headlineMedium" style={styles.headerTitle}>
            Edit Charity Profile
          </Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Basic Information
          </Text>

          <TextInput
            label="Charity Name *"
            value={charityName}
            onChangeText={setCharityName}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            mode="outlined"
            style={styles.input}
            keyboardType="phone-pad"
          />

          <Text variant="titleMedium" style={[styles.sectionTitle, { marginTop: 24 }]}>
            Address *
          </Text>

          <TextInput
            label="Street Address *"
            value={address}
            onChangeText={setAddress}
            mode="outlined"
            style={styles.input}
          />

          <View style={styles.row}>
            <TextInput
              label="City *"
              value={city}
              onChangeText={setCity}
              mode="outlined"
              style={[styles.input, styles.flex1, { marginRight: 8 }]}
            />

            <TextInput
              label="State *"
              value={state}
              onChangeText={setState}
              mode="outlined"
              style={[styles.input, styles.stateInput]}
              maxLength={2}
              autoCapitalize="characters"
            />
          </View>

          <TextInput
            label="Zip Code *"
            value={zipCode}
            onChangeText={setZipCode}
            mode="outlined"
            style={styles.input}
            keyboardType="number-pad"
            maxLength={5}
          />

          <Text variant="titleMedium" style={[styles.sectionTitle, { marginTop: 24 }]}>
            Mission & Causes
          </Text>

          <TextInput
            label="Mission Statement"
            value={mission}
            onChangeText={setMission}
            mode="outlined"
            style={styles.input}
            multiline
            numberOfLines={4}
            placeholder="Describe your charity's mission..."
          />

          <Text variant="bodyMedium" style={{ marginBottom: 12 }}>
            Select Causes
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

          <Text variant="bodySmall" style={styles.helperText}>
            * Required fields
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={handleCancel}
            style={styles.cancelButton}
            disabled={saving}>
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleSave}
            style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
            loading={saving}
            disabled={saving}>
            Save Changes
          </Button>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontWeight: '700',
  },
  formSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  flex1: {
    flex: 1,
  },
  stateInput: {
    width: 80,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    marginVertical: 4,
  },
  helperText: {
    color: '#888',
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
  },
  saveButton: {
    flex: 1,
  },
});
