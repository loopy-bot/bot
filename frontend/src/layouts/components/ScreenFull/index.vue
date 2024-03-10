<template>
  <a-button shape="circle" class="nav-svg-icon" @click="click">
    <component :is="isFullscreen ? 'IconFullscreenExit' : 'IconFullscreen'"></component>
  </a-button>
</template>

<script setup>
import screenfull from 'screenfull';
import { onMounted, onUnmounted, reactive, toRefs } from 'vue';
import { Notification } from '@arco-design/web-vue';

const isFullscreen = ref(false);

const change = () => {
  isFullscreen.value = !isFullscreen.value;
};
const init = () => {
  if (screenfull.enabled) {
    screenfull.on('change', change);
  }
};
const destroy = () => {
  if (screenfull.enabled) {
    screenfull.off('change', change);
  }
};

onMounted(() => {
  init();
});
onUnmounted(() => {
  destroy();
});

const click = () => {
  if (!screenfull.isEnabled) {
    Notification.warning('浏览器不支持');
    return false;
  }
  change();
  screenfull.toggle();
};
</script>

<style lang="scss" scoped>
.nav-svg-icon {
  font-size: 18px;
}
</style>
