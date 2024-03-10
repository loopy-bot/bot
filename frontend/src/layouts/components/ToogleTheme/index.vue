<template>
  <a-dropdown @select="onToggle">
    <a-button
      class="nav-btn"
      :shape="'circle'"
    >
      <template #icon>
        <icon-sun-fill v-if="theme === 'light'" />
        <icon-moon-fill v-else />
      </template>
    </a-button>
    <template #content>
      <a-doption value="light">明亮</a-doption>
      <a-doption value="dark">暗黑</a-doption>
      <a-doption value="darkblue">蓝黑</a-doption>
    </template>
  </a-dropdown>
</template>

<script setup>
import { computed, reactive, toRefs, onMounted } from 'vue';
import { useAppStore } from '@/store/app/settings';

const appStore = useAppStore();
const theme = computed(() => {
  return appStore.settings.theme;
});
const layout = computed(() => {
  return appStore.settings.layout;
});

onMounted(() => {
  appStore.changeTheme(localStorage.getItem('arco-theme'));
  // window.location.reload();
});

const onToggle = (t) => {
  localStorage.setItem('arco-theme', t);
  appStore.changeTheme(t);
  // window.location.reload();
};
</script>

<style scoped lang="scss">
.nav-svg-icon {
  font-size: 18px;
  color: #5a5e66;
}
</style>
