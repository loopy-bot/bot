<template>
  <div class="container">
    <a-row :gutter="20" align="stretch">
      <a-col :span="24">
        <a-card class="general-card" :title="title">
          <a-row justify="space-between">
            <a-col :span="24">
              <a-tabs :default-active-tab="tabs.defaultKey" type="rounded">
                <a-tab-pane v-for="item in tabs.options" :key="item.key" :title="item.title">
                  <template v-for="op in item.content" :key="op.key">
                    <QualityInspection
                      v-if="op.type === 'quality'"
                      :itemConfig="op"
                    />
                    <TheService
                      v-if="op.type === 'service'"
                      :itemConfig="op"
                    />
                    <RulesPreset
                      v-if="op.type === 'rule'"
                      :itemConfig="op"
                    />
                  </template>
                </a-tab-pane>
              </a-tabs>
            </a-col>
            <a-input-search
              :placeholder="$t('cardList.searchInput.placeholder')"
              style="width: 240px; position: absolute; top: 60px; right: 20px"
            />
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup name="Card">
  import config from '../config';
  import QualityInspection from './components/quality-inspection.vue';
  import TheService from './components/the-service.vue';
  import RulesPreset from './components/rules-preset.vue';

  const {
    title,
    tabs,
  } = config;
</script>

<style scoped lang="scss">
  .container {
    padding-bottom: 20px;
    :deep(.arco-list-content) {
      overflow-x: hidden;
    }

    :deep(.arco-card-meta-title) {
      font-size: 14px;
    }
  }
  :deep(.arco-list-col) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  :deep(.arco-list-item) {
    width: 33%;
  }

  :deep(.block-title) {
    margin: 0 0 12px 0;
    font-size: 14px;
  }
  :deep(.list-wrap) {
    // min-height: 140px;
    .list-row {
      align-items: stretch;
      .list-col {
        margin-bottom: 16px;
      }
    }
    :deep(.arco-space) {
      width: 100%;
      .arco-space-item {
        &:last-child {
          flex: 1;
        }
      }
    }
  }
</style>
