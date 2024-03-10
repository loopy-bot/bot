<template>
  <a-dropdown @select="handleSelect">
    <a-button shape="circle" class="nav-svg-icon">
      <svg-icon icon-class="language" />
    </a-button>
    <template #content>
      <a-doption
        v-for="item in langOptions"
        :key="item.value"
        :value="item.value"
        :disabled="lang === item.value">{{ item.label }}
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script setup>
import { computed, reactive, toRefs } from 'vue';
import settings from '@/settings';

const state = reactive({
  langOptions: [
    { label: '中文', value: 'zh' },
    { label: 'English', value: 'en' },
  ],
});

const lang = computed(() => localStorage.getItem('language') || settings.defaultLanguage);

const handleSelect = (langParams) => {
  localStorage.setItem('language', langParams);
  location.reload();
};
const { langOptions } = toRefs(state);
</script>

<style scoped lang="scss"></style>
