import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { StyleSheet, View } from 'react-native';
import { List, Text, useTheme } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import Navbar from '@/src/components/bars/Navbar';

export default function HowDropoffWorksPage() {
  const theme = useTheme();

  return (
    <>
      <Navbar title="" />
      <ThemedView>
        <View style={styles.container}>
          <Text variant="headlineMedium" style={{ marginBottom: 20 }}>
            How Dropoff Works
          </Text>

          <List.Item
            style={{ marginHorizontal: -15 }}
            descriptionStyle={{ marginRight: 10 }}
            title={<Text variant="titleLarge">Pack Your Donation</Text>}
            description="Pack up your items according to the charity's guidelines"
            right={() => (
              <Feather
                name="package"
                size={40}
                color={theme.colors.onBackground}
                style={{ alignSelf: 'center' }}
              />
            )}
          />

          <List.Item
            style={{ marginHorizontal: -15 }}
            descriptionStyle={{ marginRight: 10 }}
            title={<Text variant="titleLarge">Drop Off</Text>}
            description="Bring your items to the drop off location during your appointment window"
            right={() => (
              <FontAwesome6
                name="car-side"
                size={36}
                color={theme.colors.onBackground}
                style={{ alignSelf: 'center' }}
              />
            )}
          />

          <List.Item
            style={{ marginHorizontal: -15 }}
            descriptionStyle={{ marginRight: 10 }}
            title={<Text variant="titleLarge">Confirmation</Text>}
            description="Ask charity staff to mark your donation as received in the Cornucopia app"
            right={() => (
              <AntDesign
                name="check-circle"
                size={40}
                color={theme.colors.onBackground}
                style={{ alignSelf: 'center' }}
              />
            )}
          />
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    gap: 20,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});
