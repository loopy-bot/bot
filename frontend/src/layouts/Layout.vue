<template>
  <TopMenu v-if="layout === 'top'" />
  <LeftMenu v-if="layout === 'left'" />
  <MixedMenu v-if="layout === 'mix'" />
</template>

<script setup name="Layout" lang="ts">
import { computed, } from 'vue';
import { useAppStore } from '@/store/app/settings';
import LeftMenu from './LeftLayout/index.vue';
import TopMenu from './TopLayout/index.vue';
import MixedMenu from './MixedLayout/index.vue';

const appStore = useAppStore();
const layout = computed(() => {
  return appStore.settings.layout;
});
</script>

<style lang="scss" scoped>
</style>
