<template>
  <div class="scroll-y">
    <h3 class="title">{{ $t('settings.title') }}</h3>
    <div class="content">
      <div class="box">
        {{ $t('settings.layoutTitle') }}
        <div class="info">
          <a-radio-group v-model="appStore.settings.layout" direction="vertical">
            <a-radio v-for="item in layouts" :label="item.value" :key="item.value" :value="item.value">{{ item.label }}</a-radio>
          </a-radio-group>
        </div>
      </div>
      <div class="box">
        {{ $t('settings.menuTheme') }}
        <div class="info">
          <a-radio-group v-model="appStore.settings.menuTheme" direction="vertical">
            <a-radio v-for="item in menuTheme" :label="item.value" :key="item.value" :value="item.value">{{ item.label }}</a-radio>
          </a-radio-group>
        </div>
      </div>
      <div class="box">
        {{ $t('settings.layoutComposTitle') }}
        <div class="info">
          {{ $t('settings.showTop') }}：
          <a-switch type="round" v-model="appStore.settings.showTop" />
        </div>
        <div class="info">
          {{ $t('settings.showTool') }}：
          <a-switch type="round" v-model="appStore.settings.showTool" />
        </div>
        <div class="info">
          {{ $t('settings.showMenu') }}：
          <a-switch type="round" v-model="appStore.settings.showMenu" />
        </div>
        <div class="info">
          {{ $t('settings.showTags') }}：
          <a-switch type="round" v-model="appStore.settings.showTags" />
        </div>
      </div>

      <div v-if="!appStore.settings.isProduct" class="box">
        {{ $t('settings.apiHostTitle') }}：
        <div class="info">
          {{ apiHost ? apiHost : baseUrl }}
        </div>
        <div class="info">
          <a-tag v-if="!apiHost" round>js</a-tag>
          <a-tag v-else type="success" round>localStorage</a-tag>
          <a-button type="primary" @click="clear()">clear</a-button>
        </div>
        <div class="info">
          <a-input-search v-model="api.host" :button-text="$t('settings.submit')" search-button @search="submitForm"  />
        </div>
      </div>

      <!-- <div class="box">
        {{ $t('settings.animationTitle') }}：
        <div class="info">
          {{ $t('settings.openAnimation') }}：
          <a-switch type="round" v-model="appStore.settings.openAnimation" />
        </div>
        <div class="info">
          {{ $t('settings.openProgress') }}：
          <a-switch type="round" v-model="appStore.settings.openProgress" />
        </div>
      </div> -->

      <div class="box">
        {{ $t('settings.productTitle') }}：
        <svg-icon icon-class="huaji"></svg-icon>
        <div class="info">
          {{ $t('settings.isProduct') }}：
          <a-switch type="round" v-model="appStore.settings.isProduct" :disabled="appStore.settings.isProduct" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="Setting">
import { Notification } from '@arco-design/web-vue';
import { getBaseUrl } from '@/api/apiConfig';
import { useAppStore } from '@/store/app/settings';
import { reactive } from 'vue';

const appStore = useAppStore();

const apiHost = ref(localStorage.getItem('apiHost'));

watch(
  () => appStore.settings.showTop,
  (value) => {
    if (value) {
      document.getElementsByTagName('body')[0].style.setProperty('--size-title-height', '60px');
    } else {
      document.getElementsByTagName('body')[0].style.setProperty('--size-title-height', '0px');
    }
  }
);

const baseUrl = getBaseUrl();

const api = reactive({
  host: baseUrl,
});

const layouts = [{
  label: '顶部菜单',
  value: 'top',
}, {
  label: '左侧菜单',
  value: 'left',
}, {
  label: 'mix风格',
  value: 'mix',
}];

const menuTheme = [{
  label: '暗黑',
  value: 'dark',
}, {
  label: '默认',
  value: 'light',
}];

const submitForm = () => {
  Notification.success('api地址已修改.');
  localStorage.setItem('apiHost', api.host);
  apiHost.value = localStorage.getItem('apiHost');
};

const settings = computed(() => appStore.settings || {});

const clear = () => {
  localStorage.removeItem('apiHost');
  apiHost.value = localStorage.getItem('apiHost');
};
</script>

<style scoped lang="scss">
.scroll-y {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 15px;
  height: 100vh;
  color: var(--color-text-1);
  background: var(--color-bg-1);

  .title {
    font-weight: 700;
    text-align: center;
  }

  .content {
    .box {
      padding: 15px 20px;
      margin: 20px 0;
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
    }

    .info {
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
