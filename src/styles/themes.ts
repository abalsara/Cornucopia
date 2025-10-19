import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { authColorScheme, darkColorScheme, lightColorScheme } from "./colors";

export const lightTheme = {
  ...MD3LightTheme,
  colors: lightColorScheme.colors,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: darkColorScheme.colors,
};

export const authTheme = {
  ...MD3LightTheme,
  roundness: 2,
  colors: authColorScheme.colors,
};
