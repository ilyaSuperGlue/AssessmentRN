import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SettingState {
  visible: boolean;
  toggleVisible: (bool?: boolean) => void;
}

export const useSettingStore = create<SettingState>()(
  persist(
    set => ({
      visible: false,
      toggleVisible: (bool?: boolean) => {
        set(({ visible }) => ({
          visible: bool !== undefined ? bool : !visible,
        }));
      },
    }),
    {
      name: 'setting-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({ visible: state.visible }),
    },
  ),
);
