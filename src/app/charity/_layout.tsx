import { Stack } from 'expo-router';

export default function CharityLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: 'transparentModal',
        headerShown: false,
      }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="pages/charityDonationDetails" />
    </Stack>
  );
}
