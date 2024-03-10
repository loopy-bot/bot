<template>
  <div class="tab-bar-container">
    <a-affix ref="affixRef" :offset-top="offsetTop">
      <div class="tab-bar-box">
        <div class="tab-bar-scroll">
          <div class="tags-wrap">
            <tag-item
              v-for="(tag, index) in tagList"
              :key="tag.fullPath"
              :index="index"
              :item-data="tag"
            />
          </div>
        </div>
        <div class="tag-bar-operation"></div>
      </div>
    </a-affix>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted, } from 'vue';
  import type { RouteLocationNormalized } from 'vue-router';
  import { PageProps } from '@/store/app/types';
  import { useRouter, useRoute } from 'vue-router'
  import usePageStore from '@/store/app/pages';
  import tagItem from './tag-item.vue';
  import { watch } from 'vue';

  const pagestore = usePageStore();

  const affixRef = ref();
  const tagList = computed(() => {
    return pagestore.getTags;
  });
  const offsetTop = 60;

  watch(
    () => tagList,
    () => {
      console.log(tagList);
    }
  );

  const formatTag = (route: RouteLocationNormalized): PageProps => {
    const { path, name, meta, fullPath, query } = route;
    return {
      path,
      title: meta.title || '',
      name: String(name),
      fullPath,
      query,
    };
  };

  const checkRoute = (to: RouteLocationNormalized) => {
    const page = formatTag(to);
    if (
      !tagList.value.some((tag) => tag.fullPath === to.fullPath)
    ) {
      pagestore.addTag(page);
    }
  };

  const router = useRouter();
  router.beforeEach(async (to: RouteLocationNormalized) => {
    checkRoute(to);
    pagestore.addPage(formatTag(to));
  });

  const route = useRoute();
  const initTags = () => {
    checkRoute(route);
  };

  onMounted(() => {
    initTags();
  });

</script>

<style scoped lang="scss">
  .tab-bar-container {
    position: relative;
    background-color: var(--color-bg-2);
    .tab-bar-box {
      display: flex;
      padding: 0 0 0 20px;
      background-color: var(--color-bg-2);
      border-bottom: 1px solid var(--color-border);
      .tab-bar-scroll {
        height: 32px;
        flex: 1;
        overflow: hidden;
        .tags-wrap {
          padding: 4px 0;
          height: 48px;
          white-space: nowrap;
          overflow-x: auto;

          :deep(.arco-tag) {
            display: inline-flex;
            align-items: center;
            margin-right: 6px;
            cursor: pointer;
            &:first-child {
              .arco-tag-close-btn {
                display: none;
              }
            }
          }
        }
      }
    }

    .tag-bar-operation {
      width: 100px;
      height: 32px;
    }
  }
</style>