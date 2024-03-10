import dataSource from '../dataSorce';
import i18n from '@/locale';

const t = i18n?.global?.t;

const quality = {
  type: 'quality',
  title: t('cardList.tab.title.content'),
  add: t('cardList.content.action'),
  openText: t('cardList.content.inspection'),
  closeText: t('cardList.content.delete'),
  getList: dataSource.queryInspectionList,
};
const service = {
  type: 'service',
  title: t('cardList.tab.title.service'),
  add: t('cardList.content.action'),
  openText: t('cardList.service.open'),
  closeText: t('cardList.service.cancel'),
  expiresText: t('cardList.service.renew'),
  tagText: t('cardList.service.tag'),
  expiresTagText: t('cardList.service.expiresTag'),
  getList: dataSource.queryTheServiceList,
};
const rule = {
  type: 'rule',
  title: t('cardList.tab.title.preset'),
  tagText: t('cardList.preset.tag'),
  getList: dataSource.queryRulesPresetList,
};

export default {
  defaultKey: 1,
  type: 'rounded',
  options: [
    {
      key: 1,
      title: t('cardList.tab.title.all'),
      content: [
        quality,
        service,
        rule,
      ],
    },
    {
      key: 2,
      title: t('cardList.tab.title.content'),
      content: [
        quality,
      ],
    },
    {
      key: 3,
      title: t('cardList.tab.title.service'),
      content: [
        service,
      ],
    },
    {
      key: 4,
      title: t('cardList.tab.title.preset'),
      content: [
        rule,
      ],
    },
  ]
};
