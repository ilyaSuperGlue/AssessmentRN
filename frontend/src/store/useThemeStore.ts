import { create } from 'zustand';
import { UnistylesRuntime } from 'react-native-unistyles';
import { ThemeEnum } from '../constant/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ThemeState {
  theme: ThemeEnum;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: ThemeEnum.LIGHT,
      toggleTheme: () => {
        const theme =
          get().theme === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT;
        UnistylesRuntime.setTheme(theme);
        set({ theme });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({ theme: state.theme }),
      onRehydrateStorage: () => state => {
        if (state?.theme) {
          UnistylesRuntime.setTheme(state.theme);
        }
      },
    },
  ),
);
