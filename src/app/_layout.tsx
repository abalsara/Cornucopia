import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { en, registerTranslation } from 'react-native-paper-dates';

import ThemedView from '../components/ThemedView';
import { darkTheme, lightTheme } from '../styles/themes';

/**
 * --------------------------------------------------------
 *  This section configures the React Native Paper Dates module
 * --------------------------------------------------------
 */
const isAndroid = require('react-native').Platform.OS === 'android';
// const isHermesEnabled = !!global.HermesInternal;

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
  // apply a theme to the app depending on the device's theme
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === 'dark' ? darkTheme : lightTheme;

  if (colorScheme === 'dark') {
    // prevent flickering on navigation
    SystemUI.setBackgroundColorAsync('black');
  }

  return (
    <PaperProvider theme={paperTheme}>
      <ThemedView>
        <Stack
          screenOptions={{
            headerShown: false,
            headerTintColor: paperTheme.colors.onBackground,
            presentation: 'transparentModal',
          }}>
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
          <Stack.Screen name="auth" />
        </Stack>
      </ThemedView>

      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </PaperProvider>
  );
}
