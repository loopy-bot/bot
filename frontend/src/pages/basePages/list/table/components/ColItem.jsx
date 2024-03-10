import ARSvgItem from './ARSvgItem.vue';

/**
 * @return {*}
 * @description: 表格项解析器
 */
export default defineComponent({
  props: {
    meta: {
      type: Object,
      default: null,
    },
    info: {
      type: Object,
      default: null,
    }
  },
  setup(props, {emit}) {
    const { meta, info } = props;
    const res = meta.resolve(info);
    return () => {
      if (res?.type === 'avatar') {
        return (
          <a-space>
            <a-avatar size={16} shape="square">
              <img alt="avatar" src={res?.src} />
            </a-avatar>
            {res?.text}
          </a-space>
        );
      }
      if (res?.type === 'text') {
        return (
          <a-space>
            {res?.text}
          </a-space>
        );
      }
      if (res?.type === 'icon') {
        return (
          <a-space>
            <ARSvgItem icon={res?.src} styleInfo={res?.style} />
            {res?.text}
          </a-space>
        );
      }
    };
  },
});
