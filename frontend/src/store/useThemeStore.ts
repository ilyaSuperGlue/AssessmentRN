import { create } from 'zustand';
import { UnistylesRuntime } from 'react-native-unistyles';
import { ThemeEnum } from '../constant/theme';

interface ThemeState {
  theme: ThemeEnum;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: ThemeEnum.LIGHT,
  toggleTheme: () => {
    const theme =
      get().theme === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT;
    UnistylesRuntime.setTheme(theme);
    set({ theme });
  },
}));
