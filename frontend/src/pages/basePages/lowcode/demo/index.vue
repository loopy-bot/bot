<template>
  <div class="app">
    <form-create class="form" v-model="value" v-model:api="fApi" :rule="rule" :option="option"></form-create>
  </div>
</template>

<script setup>
import ruleFile from './schema.json';

const fApi = ref({});
// 表单数据
const value = ref({});
// 表单生成规则
const rule = ref(ruleFile);
// 组件参数配置
const option = ref({
  // 表单提交事件
  onSubmit: (formData) => {
    console.log(JSON.stringify(formData));
  }
});
</script>
<style scoped lang="scss">
@mixin center {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-bg-white);
}

.app {
  @include center;
  width: 100%;
  height: 100%;

  .form {
    width: 100%;
    height: 100%;
    padding: 50px 20px;
  }
}
</style>
