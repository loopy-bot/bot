<template>
  <div class="main" :class="{ 'show-tag-view': settings.showTags }">
    <router-view v-slot="{ Component }">
      <transition v-if="settings.openAnimation" name="fade-transform" mode="out-in">
        <div class="compo">
          <keep-alive :include="keepViews">
            <component :is="Component" :key="key" />
          </keep-alive>
        </div>
      </transition>
      <keep-alive v-else :include="keepViews">
        <component :is="Component" :key="key" />
      </keep-alive>
    </router-view>
  </div>
</template>
    
<script setup>
import { storeToRefs } from 'pinia';
import usePageStore from '@/store/app/pages';
import useSettingStore from '@/store/app/settings';
import router from '@/router';
import { onMounted } from 'vue';

const store = usePageStore();
const settingsStore = useSettingStore();

const keepViews = ref('');

const route = useRoute();
const settings = computed(() => settingsStore.settings);

const key = computed(() => {
  return route.name;
});
watch(
  () => store.getPages,
  () => {
    keepViews.value = store.getPages;
  },
  { deep: true },
);
</script>

<style scoped lang="scss">
.main {
  padding: $appMainPadding;
  position: relative;
  overflow: auto;
  background-color: var(--color-fill-2);
  height: 100%;
  width: 100%;
}
.compo {
  width: 100%;
  height: 100%;
}
.show-tag-view {
  height: calc(100% - #{$tagViewHeight}) !important;
}
</style>