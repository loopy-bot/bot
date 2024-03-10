/**
 * @description: 此文件用来描述字段列表，即表格相关字段的展示和解析
 */

import i18n from '@/locale';

const t = i18n?.global?.t;

/**
 * @return {*}
 * @description: 一般情况下，使用field和label就行，因为展示的内容一般是直接采用value，
 * 但是如果需要临时计算转换也可以传入函数此外可以根据情况传入resolve函数，返回一个对象，这些都会被components下colItem组件解析
 */
export const fields = [
  {
    field: 'number', // 字段value
    label: t('searchTable.form.number'), // 字段对应的中文
  },
  {
    field: 'name',
    label: t('searchTable.form.name'),
  },
  {
    field: 'contentType',
    label: t('searchTable.form.contentType'),
    resolve: (record) => { // 返回一个图片+文字
      let src;
      if (record.contentType === 'img')
        src='//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/581b17753093199839f2e327e726b157.svg~tplv-49unhts6dw-image.image';
      else if (record.contentType === 'horizontalVideo')
        src='//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77721e365eb2ab786c889682cbc721c1.svg~tplv-49unhts6dw-image.image';
      else
        src='//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/ea8b09190046da0ea7e070d83c5d1731.svg~tplv-49unhts6dw-image.image';
      return {
        type: 'avatar',
        src,
        text: t(`searchTable.form.contentType.${record.contentType}`),
      };
    },
  },
  {
    field: 'filterType',
    label: t('searchTable.form.filterType'),
    resolve: (record) => { // 返回的text需要临时计算，例如原text为video，需要翻译成视频
      return {
        type: 'text',
        text: t(`searchTable.form.filterType.${record.filterType}`),
      };
    },
  },
  {
    field: 'count',
    label: t('searchTable.form.count'),
  },
  {
    field: 'createdTime',
    label: t('searchTable.form.createdTime'),
  },
  {
    field: 'status',
    label: t('searchTable.form.status'),
    resolve: (record) => { // 返回图标和文字结合
      let src = '';
      let style = '';
      if (record.status === 'offline') {
        src = 'IconCloseCircle';
        style = 'color: #ff5d63';
      }
      else {
        src = 'IconCheckCircle';
        style = 'color: #00c055';
      }
      return {
        type: 'icon',
        style,
        src,
        text: t(`searchTable.form.status.${record.status}`),
      };
    },
  }
];

export default fields;
