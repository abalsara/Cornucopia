import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

export default function AuthLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerShadowVisible: false,
        headerTintColor: theme.colors.onBackground,
        presentation: "transparentModal",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "landingPage",
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          title: "Login",
        }}
      />
      <Stack.Screen
        name="signUp"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
