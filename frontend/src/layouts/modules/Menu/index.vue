<template>
  <div class="menu" :class="settings.menuTheme === 'dark' ? 'darkmenu' : ''">
    <a-menu class="menu"
      :show-collapse-button="false"
      :collapsed="!isCollapse"
      :mode="mode"
      :level-indent="34"
      v-model:selected-keys="activeMenu"
      :default-open-keys="openKeys"
      @onCollapse="toggleSideBar"
    >
    <a-menu-item v-if="show_top_title" key="0" disabled>
      <slot name="project-title" :collapsed="!isCollapse"></slot>
      </a-menu-item>
      <menu-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
    </a-menu>
    <a-button v-if="!mode" class="btn" @click="toggleSideBar">
      <icon-menu-fold v-if="isCollapse" />
      <icon-menu-unfold v-else />
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import MenuItem from './MenuItem.vue';
import { useAppStore } from '@/store/app/settings';
import { usePermissionStore } from '@/store/app/permission';
import { useRouter, useRoute } from 'vue-router';
import { reactive } from 'vue';
import type { ModeType } from './types';

const props = defineProps<{
  mode: ModeType,
  show_top_title: boolean,
}>();
const { mode, } = props;

const appStore = useAppStore();
const settings = computed(() => appStore.settings);

const permissionStore = usePermissionStore();
const routes = computed(() => {
  return permissionStore.routes;
});
const isCollapse = computed(() => {
  return appStore.sidebar.opened
});
const now = useRoute();
const activeMenu = ref([now?.path]);
const openKeys = reactive<Array<string>>([]);

if (now?.matched?.length > 0) {
  openKeys.push(now?.matched[0]?.path);
}

const router = useRouter();
router.beforeEach((to, _from, next) => {
  activeMenu.value = [to.path];
  next();
});

const toggleSideBar = () => {
  appStore.toggleSideBar();
};
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;
}

.btn {
  position: absolute;
  z-index: 999;
  bottom: 12px;
  right: 3px;
  background: var(--color-var-bg) !important;
  color: var(--color-var-text) !important;
}
</style>
