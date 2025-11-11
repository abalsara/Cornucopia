import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: 'transparentModal',
        headerShown: false,
      }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
