import tabs  from './layout/tabs';
import dataSource from './dataSorce';
import i18n from '@/locale';

const t = i18n?.global?.t;

const initConfig = () => {
  // 可以通过页面参数
};

export default {
  title: t('menu.list.cardList'),
  // 标签
  tabs,
  // 数据源
  dataSource,
  // 修改config
  initConfig,
};
