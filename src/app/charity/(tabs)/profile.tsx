import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Chip, IconButton, Text, useTheme } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import { getCharityByAdmin, type Charity } from '@/src/lib/charities';
import { supabase } from '@/src/lib/supabase';

export default function CharityProfileScreen() {
  const [charity, setCharity] = useState<Charity | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const theme = useTheme();

  const loadCharity = useCallback(async () => {
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
    } catch (error) {
      console.error('Error loading charity:', error);
      setCharity(null);
      // Don't show alert on first load, let the UI handle it
    } finally {
      setLoading(false);
    }
  }, [router]);

  useFocusEffect(
    useCallback(() => {
      loadCharity();
    }, [loadCharity]),
  );

  const handleEditProfile = () => {
    router.push('/charity/pages/editCharityProfile');
  };

  const handleLogOut = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await supabase.auth.signOut();
            router.replace('/auth');
          } catch (error) {
            console.error('Error signing out:', error);
            Alert.alert('Error', 'Failed to sign out. Please try again.');
          }
        },
      },
    ]);
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

  if (!charity) {
    return (
      <ThemedView>
        <View style={styles.centerContainer}>
          <Text variant="headlineSmall" style={styles.noCharityTitle}>
            No Charity Found
          </Text>
          <Text variant="bodyMedium" style={styles.noCharityText}>
            Your account is not associated with a charity yet.
          </Text>
          <Text variant="bodySmall" style={styles.noCharityHint}>
            Please contact support or create a charity in the database.
          </Text>
          <Button mode="contained" onPress={handleLogOut} style={styles.retryButton}>
            Log Out
          </Button>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineLarge" style={styles.headerTitle}>
            Charity Profile
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onBackground }}>
            Manage your charity's information
          </Text>
        </View>

        {/* Charity Info Section */}
        <View style={styles.profileSection}>
          {/* Charity Icon */}
          <View style={styles.charityIconContainer}>
            <View style={[styles.charityIcon, { backgroundColor: theme.colors.primaryContainer }]}>
              <Text variant="headlineLarge">{charity.c_name?.[0]?.toUpperCase() || 'C'}</Text>
            </View>
          </View>

          {/* Charity Name */}
          <Text variant="headlineSmall" style={styles.charityName}>
            {charity.c_name}
          </Text>

          {/* Mission */}
          <Text variant="bodyMedium" style={styles.mission}>
            {charity.mission || 'No mission statement yet'}
          </Text>

          {/* Edit Button */}
          <Button
            mode="outlined"
            icon="pencil"
            onPress={handleEditProfile}
            style={styles.editButton}>
            Edit Profile
          </Button>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Contact Information
          </Text>

          {charity.email && (
            <View style={styles.infoRow}>
              <IconButton icon="email-outline" size={20} />
              <Text variant="bodyMedium" style={styles.infoText}>
                {charity.email}
              </Text>
            </View>
          )}

          {charity.phone_num && (
            <View style={styles.infoRow}>
              <IconButton icon="phone-outline" size={20} />
              <Text variant="bodyMedium" style={styles.infoText}>
                {charity.phone_num}
              </Text>
            </View>
          )}

          <View style={styles.infoRow}>
            <IconButton icon="map-marker-outline" size={20} />
            <View style={styles.flex1}>
              <Text variant="bodyMedium" style={styles.infoText}>
                {charity.address}
              </Text>
              <Text variant="bodyMedium" style={styles.infoText}>
                {charity.city}, {charity.state} {charity.zip_code}
              </Text>
            </View>
          </View>
        </View>

        {/* Causes */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Causes We Support
          </Text>
          {charity.causes && charity.causes.length > 0 ? (
            <View style={styles.chipContainer}>
              {charity.causes.map((cause) => (
                <Chip
                  key={cause}
                  mode="flat"
                  style={[styles.chip, { backgroundColor: theme.colors.primaryContainer }]}>
                  {cause}
                </Chip>
              ))}
            </View>
          ) : (
            <Text variant="bodyMedium" style={styles.emptyText}>
              No causes selected yet
            </Text>
          )}
        </View>

        {/* Account Info */}
        <View style={styles.accountInfo}>
          <Text variant="bodySmall" style={styles.accountInfoText}>
            Member since {new Date(charity.created_at).toLocaleDateString()}
          </Text>
        </View>

        {/* Log Out Button */}
        <Button mode="contained" icon="logout" onPress={handleLogOut} style={styles.logOutButton}>
          Log Out
        </Button>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryButton: {
    marginTop: 16,
  },
  noCharityTitle: {
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  noCharityText: {
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 40,
  },
  noCharityHint: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 24,
    paddingHorizontal: 40,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontWeight: '500',
    marginBottom: 6,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  charityIconContainer: {
    marginBottom: 16,
  },
  charityIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  charityName: {
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  mission: {
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  editButton: {
    marginTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginVertical: 4,
  },
  logOutButton: {
    marginTop: 12,
  },
  accountInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  accountInfoText: {
    color: '#888',
  },
  emptyText: {
    color: '#888',
    fontStyle: 'italic',
  },
});
