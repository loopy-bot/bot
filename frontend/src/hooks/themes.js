import { computed } from 'vue';
import { useAppStore } from '@/store/app/settings';

const appStore = useAppStore();
export default function useThemes() {
  const isDark = computed(() => {
    return appStore.settings.themes === 'dark';
  });
  return {
    isDark,
  };
}
