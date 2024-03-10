<template>
  <a-layout class="over-layout" :class="{ mobile: appStore.hideMenu }">
    <div v-if="settings.showTop" class="top-container">
      <Top>
        <template #title>
          <Title v-if="settings.showTitle" />
        </template>
      </Top>
    </div>
    <div :class="classObj" class="layout-wrapper" :style="settings.showTop ? '' : 'top: 0'">
      <div v-if="settings.showMenu" class="menu-container">
        <Menu />
      </div>
      <div class="main-container">
        <Tags v-show="settings.showTags" />
        <Main />
      </div>
      <RightPanel v-if="!appStore.settings.isProduct">
        <Setting />
      </RightPanel>
    </div>
  </a-layout>
</template>

<script setup name="LeftMenu">
import { Menu, Main, Tags, Top, } from '../modules';
import { useAppStore } from '@/store/app/settings';
import Setting from '@/layouts/components/Setting/index.vue';
import RightPanel from '@/layouts/components/RightPanel/index.vue';
import Title from '@/layouts/components/Title/index.vue'; 

const appStore = useAppStore();
const opened = computed(() => appStore.sidebar.opened);

const settings = computed(() => appStore.settings);
const classObj = computed(() => ({
  closeSidebar: !opened.value,
  hideSidebar: !settings.value.showMenu,
}));
</script>

<style lang="scss" scoped>
.over-layout {
  width: 100%;
  height: 100%;
  background-color: var(--color-fill-2);
}
.layout-wrapper {
  display: flex;
  position: fixed;
  top: $titleHeight;
  width: 100%;
  height: 100%;
  background-color: var(--color-bg-2);
}
.top-container {
  width: 100%;
  height: $titleHeight;
  position: fixed;
}
.main-container {
  height: calc(100% - $titleHeight) !important;
  transition: margin-left 0.28s;
  width: calc(100vw - $sideBarWidth);
  background-color: var(--color-bg-2);
}
.menu-container {
  transition: width 0.28s;
  background: var(--color-bg-2);
  width: $sideBarWidth !important;
  height: calc(100% - $titleHeight);
  position: relative;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  box-shadow: 0 2px 5px 0 var(--color-border);
  border-right: 1px solid var(--color-border);
}
.closeSidebar {
  .menu-container {
    width: 49px !important;
  }
  .main-container {
    width: calc(100vw - 49px);
  }
}
.hideSidebar {
  .menu-container {
    width: 0 !important;
  }
  .main-container {
    margin-left: 0;
  }
}
</style>
