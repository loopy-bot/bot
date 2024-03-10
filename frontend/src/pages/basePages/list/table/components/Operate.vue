<template>
  <a-button :type="type" @click="() => $emit('opt')">
    <template #icon v-if="icon">
      <ARSvgItem :icon="icon" />
    </template>
    {{ text }}
  </a-button>
</template>

<script setup>
import ARSvgItem from './ARSvgItem.vue';

const props = defineProps({
  type: {
    require: true,
    default: 'secondary',
    type: String,
  },
  icon: {
    require: true,
    default: '',
    type: String,
  },
  text: {
    require: true,
    default: '',
    type: String,
  },
});
const { icon, text, type, } = props;
</script>
