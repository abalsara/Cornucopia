import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, IconButton, Text, useTheme } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import { getProfile, type Profile } from '@/src/lib/profiles';
import { supabase } from '@/src/lib/supabase';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const theme = useTheme();

  const loadProfile = useCallback(async () => {
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
    } catch (error) {
      console.error('Error loading profile:', error);
      Alert.alert('Error', 'Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile]),
  );

  const handleEditProfile = () => {
    router.push('/pages/editProfile');
  };

  const handleNotifications = () => {
    // Navigate to notifications page
    Alert.alert('Notifications', 'Notifications page coming soon');
  };

  const handleSavedCharities = () => {
    // Navigate to saved charities page
    Alert.alert('Saved Charities', 'Saved charities page coming soon');
  };

  const handleAccountSettings = () => {
    // Navigate to account settings page
    Alert.alert('Account Settings', 'Account settings page coming soon');
  };

  const handleFAQs = () => {
    // Navigate to FAQs page
    Alert.alert('FAQs', 'FAQs page coming soon');
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

  if (!profile) {
    return (
      <ThemedView>
        <View style={styles.centerContainer}>
          <Text variant="bodyLarge">Unable to load profile</Text>
          <Button mode="contained" onPress={loadProfile} style={styles.retryButton}>
            Retry
          </Button>
        </View>
      </ThemedView>
    );
  }

  const userName = `${profile.first_name ?? ''} ${profile.last_name ?? ''}`.trim() || 'User';
  const userInitials =
    `${profile.first_name?.[0] ?? ''}${profile.last_name?.[0] ?? ''}`.toUpperCase() || 'U';

  return (
    <ThemedView>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header with notification bell */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text variant="headlineLarge" style={styles.headerTitle}>
              Profile
            </Text>
            <Text
              variant="bodyMedium"
              style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
              Manage your account and settings
            </Text>
          </View>
          <IconButton icon="bell-outline" size={28} onPress={handleNotifications} />
        </View>

        {/* Profile Info Section (Top 1/3) */}
        <View style={styles.profileSection}>
          <View style={styles.profileContent}>
            {/* Profile Photo */}
            <View style={styles.profilePhotoContainer}>
              {profile.avatar_url ? (
                <Image source={{ uri: profile.avatar_url }} style={styles.profilePhoto} />
              ) : (
                <View
                  style={[styles.profilePhoto, { backgroundColor: theme.colors.primaryContainer }]}>
                  <Text variant="headlineLarge" style={styles.initialsText}>
                    {userInitials}
                  </Text>
                </View>
              )}
            </View>

            {/* User Info */}
            <View style={styles.userInfo}>
              <Text variant="headlineSmall" style={styles.userName}>
                {userName}
              </Text>
              <Text variant="bodyMedium" style={styles.userEmail}>
                {profile.email}
              </Text>
              <Text variant="bodySmall" style={styles.userBio}>
                Helping make a difference in my community
              </Text>
            </View>
          </View>

          {/* Edit Button */}
          <Button
            mode="outlined"
            icon="pencil"
            onPress={handleEditProfile}
            style={styles.editButton}>
            Edit Profile
          </Button>
        </View>

        {/* Navigation Links Section (Bottom 2/3) */}
        <View style={styles.linksSection}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Quick Links
          </Text>

          <View style={styles.linkItem}>
            <IconButton icon="heart-outline" size={24} />
            <Text variant="bodyLarge" style={styles.linkText} onPress={handleSavedCharities}>
              Saved Charities
            </Text>
            <IconButton icon="chevron-right" size={24} onPress={handleSavedCharities} />
          </View>

          <View style={styles.linkItem}>
            <IconButton icon="cog-outline" size={24} />
            <Text variant="bodyLarge" style={styles.linkText} onPress={handleAccountSettings}>
              Account Settings
            </Text>
            <IconButton icon="chevron-right" size={24} onPress={handleAccountSettings} />
          </View>

          <View style={styles.linkItem}>
            <IconButton icon="help-circle-outline" size={24} />
            <Text variant="bodyLarge" style={styles.linkText} onPress={handleFAQs}>
              FAQs
            </Text>
            <IconButton icon="chevron-right" size={24} onPress={handleFAQs} />
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontWeight: '500',
    marginBottom: 6,
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
    paddingRight: 8,
  },
  profileSection: {
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  profileContent: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  profilePhotoContainer: {
    marginRight: 16,
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontWeight: '500',
    marginBottom: 4,
  },
  userEmail: {
    color: '#888',
    marginBottom: 4,
  },
  userBio: {
    color: '#666',
    fontStyle: 'italic',
  },
  editButton: {
    alignSelf: 'flex-start',
  },
  linksSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 12,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  linkText: {
    flex: 1,
  },
  logOutButton: {
    marginTop: 12,
  },
});
