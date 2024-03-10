<template>
  <div class="container">
    <a-card class="general-card" title="日志追踪">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  field="filterType"
                  label="日志类型"
                >
                  <a-select
                    v-model="formModel.filterType"
                    :options="filterTypeOptions"
                    placeholder="错误"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="createdTime"
                  label="发现时间"
                >
                  <a-range-picker
                    v-model="formModel.createdTime"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 42px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ '查询' }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :data="renderData"
        :bordered="false"
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column
            title="ID"
            data-index="id"
          />
          <a-table-column
            title="类型"
            data-index="type"
          >
            <template #cell="{ record }">
              <div>{{ typeMap[record?.type] }}</div>
            </template>
          </a-table-column>
          <a-table-column
            title="错误信息"
            data-index="content"
          />
          <a-table-column
            title="堆栈"
            data-index="stack"
          >
            <template #cell="{ record }">
              <a-button @click="() => showInf(record)">查看</a-button>
            </template>
          </a-table-column>
          <a-table-column
            title="额外信息"
            data-index="extra"
          />
          <a-table-column
            title="发现时间"
            data-index="date"
          >
            <template #cell="{ record }">
              <div>{{ new Date(record?.date) }}</div>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <a-modal width="70vw" v-model:visible="visible">
        <div class="content">
          <highlightjs language='javascript' :code="stack" />
        </div>
      </a-modal>
    </a-card>
  </div>
</template>

<script setup>
  import { computed, ref, reactive, onMounted } from 'vue';
  import { Modal } from '@arco-design/web-vue';
  import useLoading from '@/hooks/loading';
  import usePage from '@/hooks/usePage';

  import { initDB, } from '@/modules/log';

  const showInf = (record) => {
    visible.value = true;
    stack.value =record?.stack;
  };

  const generateFormModel = () => {
    return {
      filterType: 'error',
      createdTime: [],
    };
  };
  const { loading, setLoading } = useLoading(true);
  const renderData = ref([]);
  const formModel = ref(generateFormModel());
  const { page, setPage } = usePage('log');
  const pagination = page;

  const visible = ref(false);
  const stack = ref('');

  const store = ref(null);

  const typeMap = {
    'error': '错误',
    'warn': '警告',
    'api': '接口',
  };
  const filterTypeOptions = [];
  for (const key of Object.keys(typeMap)) {
    filterTypeOptions.push({
      label: typeMap[key],
      value: key,
    });
  }

  const fetchData = async (
    params = pagination
  ) => {
    setLoading(true);
    try {
      const res =  await store.value.getDataByIndex('type', formModel?.value?.filterType);
      renderData.value = res;
      setPage({
        current: params.current,
        total: res?.length,
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    fetchData({
      ...pagination,
      ...formModel.value,
    });
  };
  const onPageChange = (current) => {
    fetchData({ ...pagination, current });
  };

  const initData= async () => {
    store.value = await initDB();
    fetchData();
  };

  onMounted(() => {
    initData();
  });
</script>

<style scoped lang="scss">
  .container {
    padding-bottom: 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
</style>
