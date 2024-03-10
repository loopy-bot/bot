import i18n from '@/locale';

const t = i18n?.global?.t;

export const contentTypeOptions = [
  {
    label: t('searchTable.form.contentType.img'),
    value: 'img',
  },
  {
    label: t('searchTable.form.contentType.horizontalVideo'),
    value: 'horizontalVideo',
  },
  {
    label: t('searchTable.form.contentType.verticalVideo'),
    value: 'verticalVideo',
  },
];
export const filterTypeOptions = [
  {
    label: t('searchTable.form.filterType.artificial'),
    value: 'artificial',
  },
  {
    label: t('searchTable.form.filterType.rules'),
    value: 'rules',
  },
];
export const statusOptions = [
  {
    label: t('searchTable.form.status.online'),
    value: 'online',
  },
  {
    label: t('searchTable.form.status.offline'),
    value: 'offline',
  },
];
