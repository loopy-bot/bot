<template>
  <a-dropdown @select="handleSelect">
    <a-button shape="circle" class="nav-svg-icon">
      <svg-icon icon-class="size" />
    </a-button>
    <template #content>
      <a-doption
        v-for="item in sizeOptions"
        :value="item.value"
        :disabled="size === item.value"
        :key="item.value">{{ item.label }}
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script setup>
import { computed, reactive, toRefs } from 'vue';
import setting from '@/settings';

const state = reactive({
  sizeOptions: [
    { label: 'Large ', value: 'large' },
    { label: 'Default ', value: 'default' },
    { label: 'Small', value: 'small' },
  ],
});

const size = computed(() => localStorage.getItem('size') || setting.defaultSize);

const handleSelect = (sizeParams) => {
  localStorage.setItem('size', sizeParams);
  location.reload();
};
const { sizeOptions } = toRefs(state);
</script>

<style scoped lang="scss"></style>
