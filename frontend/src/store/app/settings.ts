import { defineStore } from 'pinia';
import defaultSettings from '@/settings';

if (!defaultSettings?.showTop) document.getElementsByTagName('body')[0].style.setProperty('--size-title-height', '0px');

export const useAppStore = defineStore('settings', {
  state: () => ({
    sidebar: { opened: true },
    settings: defaultSettings,
  }),
  actions: {
    getSettings(data: any) {
      this.$patch((state) => {
        state.settings = { ...state.settings, ...data };
      });
    },
    toggleSideBar() {
      this.$patch((state) => {
        state.sidebar.opened = !state.sidebar.opened;
      });
    },
    changeTheme(theme: string) {
      document.body.removeAttribute('arco-theme');
      this.$patch((state) => {
        state.settings = { 
          ...state.settings,
          theme,
        };
      });
      document.body.setAttribute('arco-theme', theme);
    },
  }
});

export default useAppStore;
