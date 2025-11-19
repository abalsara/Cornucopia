import { Session } from '@supabase/supabase-js';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useState, useEffect } from 'react';
import { useColorScheme, View } from 'react-native';
import { ActivityIndicator, PaperProvider } from 'react-native-paper';
import { en, registerTranslation } from 'react-native-paper-dates';

import ThemedView from '../components/ThemedView';
import { fetchAdmin } from '../lib/admin';
import { fetchAllCharities } from '../lib/charities';
import { fetchAllRatings } from '../lib/ratings';
import { supabase } from '../lib/supabase';
import { setAdmin } from '../stores/admin';
import { initCharitiesStore } from '../stores/charities';
import { initRatingsStore } from '../stores/ratings';
import { darkTheme, lightTheme } from '../styles/themes';

/**
 * --------------------------------------------------------
 *  This section configures the React Native Paper Dates module
 * --------------------------------------------------------
 */
const isAndroid = require('react-native').Platform.OS === 'android';

if (isAndroid) {
  require('@formatjs/intl-getcanonicallocales/polyfill');
  require('@formatjs/intl-locale/polyfill');

  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/locale-data/en.js');

  require('@formatjs/intl-displaynames/polyfill');
  require('@formatjs/intl-displaynames/locale-data/en.js');

  require('@formatjs/intl-listformat/polyfill');
  require('@formatjs/intl-listformat/locale-data/en.js');

  require('@formatjs/intl-numberformat/polyfill');
  require('@formatjs/intl-numberformat/locale-data/en.js');

  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/locale-data/en.js');

  require('@formatjs/intl-datetimeformat/polyfill');
  require('@formatjs/intl-datetimeformat/locale-data/en.js');

  require('@formatjs/intl-datetimeformat/add-golden-tz.js');

  // https://formatjs.io/docs/polyfills/intl-datetimeformat/#default-timezone
  if ('__setDefaultTimeZone' in Intl.DateTimeFormat) {
    (Intl.DateTimeFormat as any).__setDefaultTimeZone(require('expo-localization').timezone);
  }
}
registerTranslation('en', en);
/**
 * --------------------------------------------------------
 */

export default function RootLayout() {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isDonor, setIsDonor] = useState<boolean | undefined>(undefined);

  // apply a theme to the app depending on the device's theme
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === 'dark' ? darkTheme : lightTheme;

  if (colorScheme === 'dark') {
    // prevent flickering on navigation
    SystemUI.setBackgroundColorAsync('black');
  }

  /**
   * Handles updates to the authentication session and determines whether
   * the current user should be treated as a donor or an admin.
   *
   * Behavior:
   * - If a session exists, the function attempts to fetch the admin record.
   *   - If an admin record is found, the user is marked *not* a donor.
   *   - If no admin record exists, the user is treated as a donor.
   * - If no session exists, the user is always treated as a donor.
   *
   * After determining donor/admin status, the function updates session state
   * and clears the loading state.
   *
   * @param {Session | null} session - The updated authentication session, or null if the user is signed out.
   * @returns {Promise<void>} Resolves when session and loading state have been updated.
   *
   * @throws {Error} Throws if fetching the admin record fails.
   */
  const handleSessionChange = async (session: Session | null): Promise<void> => {
    if (session) {
      try {
        const admin = await fetchAdmin();
        setIsDonor(admin === undefined);
      } catch (error) {
        throw new Error(`Error while calling handleSessionChange: ${error}`);
      }
    } else {
      setIsDonor(true);
    }
    setSession(session);
    setLoading(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => handleSessionChange(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));

    // initialize global state
    fetchAllCharities().then((charities) => initCharitiesStore(charities));
    fetchAllRatings().then((ratings) => initRatingsStore(ratings));
    fetchAdmin().then((admin) => (admin ? setAdmin(admin) : setAdmin(undefined)));
  }, []);

  // check if isDonor is undefined to prevent prematurely showing the auth screen
  if (loading === true || isDonor === undefined) {
    return (
      <PaperProvider theme={paperTheme}>
        <ThemedView>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator />
          </View>
        </ThemedView>
      </PaperProvider>
    );
  }

  const isLoggedIn = session !== null && session.user !== undefined;
  return (
    <PaperProvider theme={paperTheme}>
      <ThemedView>
        <Stack
          screenOptions={{
            headerShown: false,
            headerTintColor: paperTheme.colors.onBackground,
            presentation: 'transparentModal',
          }}>
          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen name="auth" />
          </Stack.Protected>

          <Stack.Protected guard={isLoggedIn}>
            <Stack.Protected guard={isDonor}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="pages/donationInfo" />
              <Stack.Screen
                name="pages/charityNeedsPage"
                options={{ headerTitle: 'Example Charity' }}
              />
              <Stack.Screen name="pages/scheduleDropoffPage" />
              <Stack.Screen name="pages/yourDonationPage" />
              <Stack.Screen name="pages/reviewAndConfirmPage" />
              <Stack.Screen name="pages/donationConfirmedPage" />
              <Stack.Screen name="pages/donationDetailsPage" />
              <Stack.Screen name="pages/howDropoffWorksPage" />
            </Stack.Protected>

            <Stack.Protected guard={!isDonor}>
              <Stack.Screen name="charity" />
            </Stack.Protected>
          </Stack.Protected>
        </Stack>
      </ThemedView>

      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </PaperProvider>
  );
}
