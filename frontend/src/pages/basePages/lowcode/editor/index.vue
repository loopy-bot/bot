<template>
  <div class="app">
    <a-space class="btn">
      <a-button type="primary" status="success" @click="getRule">导出配置</a-button>
    </a-space>
    <fc-designer ref="designer" />
    <a-modal width="70vw" v-model:visible="visible">
      <template #title>
        <a-button @click="clip">复制配置</a-button>
      </template>
      <div class="content">
        <highlightjs language='javascript' :code="config" />
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import clipboard from '@/utils/clipboard';

const config = ref('');
const visible = ref(false);
const designer = ref(null);

const getRule = () => {
  const res = designer.value.getRule();
  config.value = JSON.stringify(res, null, 2);
  visible.value = true;
};

const clip = (e) => {
  clipboard(config.value, e);
};
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
  padding: 50px 20px;

  .btn {
    position: absolute;
    top: 20px;
    right: 120px;
  }
}

.content {
  height: 70vh;
  overflow: auto;
}
</style>
