<template>
  <a-row>
    <a-col :flex="1">
      <a-form
        :model="formModel"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
        label-align="left"
      >
        <a-row :gutter="16">
          <template v-for="(item) in filterList" :key="item.field">
            <a-col :span="8">
              <a-form-item
                :field="item.field"
                :label="item.label"
              >
                <a-input
                  v-if="item.component.type === 'input'"
                  v-model="formModel[item.field]"
                  :placeholder="item.component.placeholder"
                />

                <a-select
                  v-if="item.component.type === 'select'"
                  v-model="formModel[item.field]"
                  :options="item.component.options"
                  :placeholder="item.component.placeholder"
                />

                <a-range-picker
                  v-if="item.component.type === 'rangePicker'"
                  v-model="formModel[item.field]"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
          </template>
        </a-row>
      </a-form>
    </a-col>
    <a-divider style="height: 84px" direction="vertical" />
    <a-col :flex="'86px'" style="text-align: right">
      <a-space direction="vertical" :size="18">
        <a-button type="primary" @click="search">
          <template #icon>
            <icon-search />
          </template>
          {{ '查询' }}
        </a-button>
        <a-button @click="reset">
          <template #icon> 
            <icon-refresh />
          </template>
          {{ '重置' }}
        </a-button>
      </a-space>
    </a-col>
  </a-row>
</template>

<script setup>
import config from '../config';

const { initConfig, filterList, title, } = config;

const props = defineProps({
  fetchData: {
    require: true,
    default: () => {},
    type: Function,
  },
  pagination: {
    require: true,
    default: () => {},
    type: Object,
  }
});

const generateFormModel = (e) => {
  let obj = {};
  for (const item of filterList) {
    obj[item?.field] = e && e[item?.field] ? e[item?.field] : '';
    if (item?.defaultValue) {
      obj[item?.field] = item?.defaultValue;
    }
  }
  return obj;
};

const { fetchData, pagination, } = props;
const formModel = ref(generateFormModel());

/**
 * @return {*}
 * @description: 搜索
 */  
const search = () => {
  fetchData({
    ...pagination,
    ...formModel.value,
  });
};

/**
 * @return {*}
 * @description: 重置
 */
const reset = () => {
  formModel.value = generateFormModel();
};
</script>

<style scoped lang="scss">
.ico {
  width: .7em;
  height: .7em;
  font-size: 20px;
  margin: 0 !important;
}
</style>
