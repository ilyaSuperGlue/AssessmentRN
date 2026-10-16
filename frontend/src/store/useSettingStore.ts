import { create } from 'zustand';

interface SettingState {
  visible: boolean;
  toggleVisible: (bool?: boolean) => void;
}

export const useSettingStore = create<SettingState>(set => ({
  visible: false,
  toggleVisible: (bool?: boolean) => {
    set(({ visible }) => ({ visible: bool !== undefined ? bool : !visible }));
  },
}));
