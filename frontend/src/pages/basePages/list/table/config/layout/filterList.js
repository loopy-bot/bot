/**
 * @description: 此文件用来描述筛选列表，即筛选、搜索、查询表格相关字段的展示和解析
 */

import i18n from '@/locale';
import { contentTypeOptions, filterTypeOptions, statusOptions, } from './options';

const t = i18n?.global?.t;


/**
 * @return {*}
 * @description: 需要提供component描述筛选输入
 */
export const fields = [
  {
    field: 'number', // 字段value
    label: t('searchTable.form.number'), // 字段对应的中文
    component: { // 填写表单时对应的组件类型
      type: 'input',
      placeholder: t('searchTable.form.number.placeholder'),
    },
  },
  {
    field: 'name',
    label: t('searchTable.form.name'),
    component: {
      type: 'input',
      placeholder: t('searchTable.form.name.placeholder'),
    },
  },
  {
    field: 'contentType',
    label: t('searchTable.form.contentType'),
    component: {
      type: 'select',
      placeholder: t('searchTable.form.selectDefault'),
      options: contentTypeOptions,
    },
  },
  {
    field: 'filterType',
    label: t('searchTable.form.filterType'),
    component: {
      type: 'select',
      placeholder: t('searchTable.form.selectDefault'),
      options: filterTypeOptions,
    },
  },
  {
    field: 'createdTime',
    label: t('searchTable.form.createdTime'),
    defaultValue: ['', ''],
    component: {
      type: 'rangePicker',
    },
  },
  {
    field: 'status',
    label: t('searchTable.form.status'),
    component: {
      type: 'select',
      placeholder: t('searchTable.form.selectDefault'),
      options: statusOptions,
    },
  }
];

export default fields;
