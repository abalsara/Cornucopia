import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import { getProfile, updateProfile, type Profile } from '@/src/lib/profiles';
import { supabase } from '@/src/lib/supabase';

export default function EditProfileScreen() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user?.id) {
        router.replace('/auth');
        return;
      }

      const data = await getProfile(session.user.id);
      setProfile(data);

      // Pre-fill form with existing data
      setFirstName(data.first_name ?? '');
      setLastName(data.last_name ?? '');
      setEmail(data.email ?? '');
      setAvatarUrl(data.avatar_url ?? '');
    } catch (error) {
      console.error('Error loading profile:', error);
      Alert.alert('Error', 'Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!profile?.id) {
      Alert.alert('Error', 'Unable to save profile. Please try again.');
      return;
    }

    // Basic validation
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert('Validation Error', 'First name and last name are required.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    try {
      setSaving(true);

      const updates = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        avatar_url: avatarUrl.trim() || null,
      };

      await updateProfile(profile.id, updates);

      Alert.alert('Success', 'Profile updated successfully!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
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
            Edit Profile
          </Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <TextInput
            label="First Name *"
            value={firstName}
            onChangeText={setFirstName}
            mode="outlined"
            style={styles.input}
            autoCapitalize="words"
          />

          <TextInput
            label="Last Name *"
            value={lastName}
            onChangeText={setLastName}
            mode="outlined"
            style={styles.input}
            autoCapitalize="words"
          />

          <TextInput
            label="Email *"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            label="Avatar URL (Optional)"
            value={avatarUrl}
            onChangeText={setAvatarUrl}
            mode="outlined"
            style={styles.input}
            placeholder="https://example.com/photo.jpg"
            autoCapitalize="none"
          />

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
  input: {
    marginBottom: 16,
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
