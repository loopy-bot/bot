<template>
  <div class="container" :class="settings.menuTheme">
    <img
      class="logo"
      src="/logo.png"
    />
    <div class="name" v-if="isCollapse || settings.layout !== 'mix'">
      {{settings.title}}
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store/app/settings';
import { computed, } from 'vue';

const appStore = useAppStore();
const settings = computed(() => appStore.settings);
const isCollapse = computed(() => {
  return appStore.sidebar.opened
});
</script>

<style scoped lang="scss">
@mixin center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  @include center;
  width: 100%;
  height: 100%;

  .logo {
    width: 32px;
    margin: 12px;
    transition: width 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }

  .name {
    @include center;
    font-weight: 700;
    font-size: 20px;
    color: var(--color-var-text);
  }
}
</style>
