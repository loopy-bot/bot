import { resolveComponent, h } from "vue";

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: '',
    },
    meta: {
      type: Object,
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
    elIcon: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return () => {
      if (props.meta?.remixIcon) {
        return <remix-icon icon-class={props.meta?.remixIcon} className="nav-icon" />;
      }
      if (props.meta?.arcoIcon) {
        return h(resolveComponent(props.meta?.arcoIcon));
      }
      if (props.meta?.icon) {
        return <svg-icon icon-class={props.meta?.icon} />;
      }
    };
  },
});
