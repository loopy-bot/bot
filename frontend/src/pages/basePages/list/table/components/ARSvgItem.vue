<template>
  <component class="ico" :style="styleInfo" :is="icon"></component>
</template>

<script setup>
const props = defineProps({
  icon: {
    require: true,
    default: 'Fold',
    type: String,
  },
  styleInfo: {
    require: false,
    default: '',
    type: String,
  }
});
const { icon, styleInfo } = props;
</script>

<style scoped lang="scss">
.ico {
  width: .7em;
  height: .7em;
  font-size: 20px;
  margin: 0 !important;
}
</style>
