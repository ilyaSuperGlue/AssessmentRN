import colors from './src/assets/colors';
import { StyleSheet } from 'react-native-unistyles';
import { useThemeStore } from './src/store/useThemeStore';

const appThemes = {
  light: {
    colors: colors.light,
  },
  dark: {
    colors: colors.dark,
  },
};
type AppThemes = typeof appThemes;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: appThemes,
  settings: {
    initialTheme: useThemeStore.getState().theme,
  },
});
