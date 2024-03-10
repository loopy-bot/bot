<template>
  <div>
    {{log(state)}}
  </div>
</template>

<script setup>
  import { ref, onMounted, } from 'vue';
  
  const state = ref(0);

  const log = (e) => {
    console.log('render: ', e);
  };

  onMounted(() => {
    state.value = 1;
    console.log('first: ', state.value);
    state.value = 2;
    console.log('second: ', state.value);
  });
</script>
