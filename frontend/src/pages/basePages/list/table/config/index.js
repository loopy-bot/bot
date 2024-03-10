import fieldList  from './layout/fieldList';
import filterList  from './layout/filterList';
import i18n from '@/locale';

const t = i18n?.global?.t;

const initConfig = () => {
  // 可以通过页面参数
};

export default {
  title: t('menu.list.searchTable'),
  // 字段功能列表
  fieldList,
  // 筛选字段列表
  filterList,
  // 修改config
  initConfig,
};
