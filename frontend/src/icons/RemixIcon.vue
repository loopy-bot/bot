<template>
  <i :class="[iconName, svgClass]"></i>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return {
      iconName: computed(() => `${props.iconClass}`),
      svgClass: computed(() => {
        if (props.className) {
          return `svg-icon ${props.className}`;
        }
        return 'svg-icon';
      }),
    };
  },
});
</script>

<style scoped lang="scss">
.nav-icon {
  display: inline-block;
  font-size: 19px;
  position: relative;
}

.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>
