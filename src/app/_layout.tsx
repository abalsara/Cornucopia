import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import ThemedView from '../components/ThemedView';
import { darkTheme, lightTheme } from '../styles/themes';

// on top of your index.android.js file
const isAndroid = require('react-native').Platform.OS === 'android'; // this line is only needed if you don't use an .android.js file
const isHermesEnabled = !!global.HermesInternal; // this line is only needed if you don't use an .android.js file

// in your index.js file
if (isHermesEnabled || isAndroid) {
  // this line is only needed if you don't use an .android.js file

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
    Intl.DateTimeFormat.__setDefaultTimeZone(require('expo-localization').timezone);
  }
} // this line is only needed if you don't use an .android.js file

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
            headerStyle: {
              backgroundColor: paperTheme.colors.background,
            },
            headerShadowVisible: false,
            headerTintColor: paperTheme.colors.onBackground,
            presentation: 'transparentModal',
          }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="pages/donationInfo" options={{ headerShown: false }} />
          <Stack.Screen
            name="pages/charityNeedsPage"
            options={{ headerTitle: 'Example Charity' }}
          />
          <Stack.Screen
            name="pages/scheduleDropoffPage"
            options={{ headerTitle: 'Example Charity' }}
          />
          <Stack.Screen
            name="pages/yourDonationPage"
            options={{ headerTitle: 'Example Charity' }}
          />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
      </ThemedView>

      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </PaperProvider>
  );
}
