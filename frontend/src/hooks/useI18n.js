import { useI18n } from 'vue-i18n';

export default function () {
  const { t, te } = useI18n({ useScope: 'global' });
  const generateTitle = (title) => {
    const hasKey = te(`route.${title}`);
    if (hasKey) {
      return t(`route.${title}`);
    }
    return title;
  };

  return {
    generateTitle,
  };
}
