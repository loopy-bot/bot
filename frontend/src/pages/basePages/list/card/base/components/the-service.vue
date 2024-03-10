<template>
  <div class="list-wrap">
    <a-typography-title class="block-title" :heading="6">
      {{ itemConfig.title }}
    </a-typography-title>
    <a-row class="list-row" :gutter="24">
      <a-col
        v-for="item in renderData"
        :key="item.id"
        :xs="12"
        :sm="12"
        :md="12"
        :lg="6"
        :xl="6"
        :xxl="6"
        class="list-col"
        style="min-height: 162px"
      >
        <CardWrap
          :loading="loading"
          :title="item.title"
          :description="item.description"
          :default-value="item.enable"
          :action-type="item.actionType"
          :expires="item.expires"
          :open-txt="itemConfig.openText"
          :close-txt="itemConfig.closeText"
          :expires-text="itemConfig.expiresText"
          :tag-text="itemConfig.tagText"
          :expires-tag-text="itemConfig.expiresTagText"
          :icon="item.icon"
        >
          <template #skeleton>
            <a-skeleton :animation="true">
              <a-skeleton-line :widths="['100%', '40%', '100%']" :rows="3" />
              <a-skeleton-line :widths="['40%']" :rows="1" />
            </a-skeleton>
          </template>
        </CardWrap>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
  import useRequest from '@/hooks/request';
  import CardWrap from './card-wrap.vue';

  const props = defineProps({
    itemConfig: {
      require: true,
      default: () => {},
      type: Object,
    },
  });

  const { itemConfig, } = props;

  const defaultValue = new Array(4).fill({});
  const { loading, response: renderData } = useRequest(
    itemConfig.getList,
    defaultValue
  );
</script>

<style scoped lang="scss"></style>
