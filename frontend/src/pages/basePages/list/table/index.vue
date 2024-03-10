<template>
  <div class="container">
    <a-card class="general-card" :title="title">
      <FilterTable :fetchData="fetchData" :pagination="pagination" />
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <Operate type="primary" icon="IconPlus" :text="$t('searchTable.operations.create')"
              @opt="() => operate('create', '创建', false)" />
            <Operate :text="$t('searchTable.operations.import')" @opt="() => operate('import', '导入', false)" />
          </a-space>
        </a-col>
        <a-col :span="8" style="text-align: right">
          <a-space>
            <Operate icon="IconDownload" :text="$t('searchTable.operations.download')"
              @opt="() => operate('download', '下载', false)" />
          </a-space>
        </a-col>
      </a-row>
      <a-table
        row-key="id" :loading="loading" :bordered="false"
        :pagination="pagination" :data="renderData"
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column
            v-for="item in fieldList" :key="item.field"
            :title="item.label" :data-index="item.field"
          >
            <template v-if="item.resolve" #cell="{ record }">
              <ColItem :meta="item" :info="record" @opt="(flag, text, e) => operate(flag, text, e)" />
            </template>
          </a-table-column>

          <a-table-column
            title="操作"
            data-index="operations"
          >
            <template #cell="{ record }">
              <a-button type="text" status="normal"
                @click="() => operate('view', '查看', record)">
                {{ $t('searchTable.operations.view') }}
              </a-button>
              <a-button type="text" status="warning"
                @click="() => operate('modify', '修改', record)">
                {{ $t('searchTable.operations.modify') }}
              </a-button>
              <a-button type="text" status="danger"
                @click="() => operate('delete', '删除', record)">
                {{ $t('searchTable.operations.delete') }}
              </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup name='search_table'>
  import { computed, ref, reactive, onMounted, } from 'vue';
  import { ColItem, FilterTable, Operate } from './components/index';
  import useLoading from '@/hooks/loading';
  // 可以全局缓存的分页hook
  import usePage from '@/hooks/usePage';
  import config from './config';
  import { Notification, } from '@arco-design/web-vue';
  import { queryPolicyList, } from '@/services/mock/list';

  const { initConfig, fieldList, title, } = config;

  const { loading, setLoading } = useLoading(true);
  const renderData = ref([]);
  const { page, setPage } = usePage('search_table');
  const pagination = page;

  /**
   * @description: 更新页码
   */
  const fetchData = async (
    params = pagination
  ) => {
    setLoading(true);
    try {
      const { data } = await queryPolicyList(params);
      renderData.value = data.list;
      setPage({
        current: params.current,
        total: data.total,
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  /**
   * @param {*} eventType 事件类型
   * @param {*} title 事件名
   * @param {*} e 关联数据
   * @description: 事件处理器
   */
  const operate = (eventType, title, e) => {
    Notification.info({
      title: `${title} - ${eventType}`,
      content: JSON.stringify(e),
    });
    // 将具体处理方法分发下去, 根据不同eventType调用不同函数
  };

  /**
   * @param {*} current
   * @return {*}
   * @description: 分页
   */
  const onPageChange = (current) => {
    fetchData({ ...pagination, current });
  };

  onMounted(() => {
    fetchData();
  });
</script>

<style scoped lang="scss">
  @import url('./index.scss');
</style>
