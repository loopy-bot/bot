<template>
  <div class="top">
    <div v-if="settings.showTitle" class="title">
      <slot name="title"></slot>
    </div>
    <div class="center">
      <slot name="menu"></slot>
    </div>
    <div v-if="settings.showTool" class="right-menu">
      <ul class="right-side">
        <li>
          <ToogleTheme />
        </li>
        <li>
          <ScreenFull />
        </li>
        <li>
          <SizeSelect />
        </li>
        <li>
          <LangSelect />
        </li>
        <li>
          <Person />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import ToogleTheme from '@/layouts/components/ToogleTheme/index.vue'; 
import SizeSelect from '@/layouts/components/SizeSelect/index.vue';
import LangSelect from '@/layouts/components/LangSelect/index.vue';
import ScreenFull from '@/layouts/components/ScreenFull/index.vue';
import Person from '@/layouts/components/Person/index.vue';

import { useAppStore } from '@/store/app/settings';
import { useUserStore } from '@/store/user/index';

const appStore = useAppStore();
const settings = computed(() => appStore.settings);
const opened = computed(() => appStore.sidebar.opened);
const toggleSideBar = () => {
  appStore.toggleSideBar();
};
</script>

<style lang="scss" scoped>
@mixin center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.top {
  @include center;
  height: 100%;
  width: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
  overflow-y: hidden;
  
  .title {
    @include center;
    width: 10%;

    .logo {
      width: 32px;
      height: 30px;
      margin: 20px;
    }

    .name {
      @include center;
      font-size: 14px;
      color: var(--color-text-2);

      .left {
        color: var(--color-text-1);
        font-weight: 700;
        font-size: 20px;
        border-right: 1px solid var(--color-text-4);
        padding-right: 12px;
        margin-right: 12px;
      }
    }
  }

  .center {
    flex: 1;
  }

  .right-menu {
    display: flex;
    justify-content: space-between;

    .right-side {
      display: flex;
      padding-right: 20px;
      list-style: none;
      :deep(.locale-select) {
        border-radius: 20px;
      }
      li {
        display: flex;
        align-items: center;
        padding: 0 10px;
      }
    }
  }
}
</style>
