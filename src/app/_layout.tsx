import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import ThemedView from "../components/ThemedView";
import { darkColorScheme, lightColorScheme } from "../styles/colors";

export default function RootLayout() {
  const lightTheme = {
    ...MD3LightTheme,
    colors: lightColorScheme.colors,
  };
  const darkTheme = {
    ...MD3DarkTheme,
    colors: darkColorScheme.colors,
  };

  // apply a theme to the app depending on the device's theme
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === "dark" ? darkTheme : lightTheme;

  if (colorScheme === "dark") {
    // prevent flickering on navigation
    SystemUI.setBackgroundColorAsync("black");
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
            presentation: "transparentModal",
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
      </ThemedView>

      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </PaperProvider>
  );
}
