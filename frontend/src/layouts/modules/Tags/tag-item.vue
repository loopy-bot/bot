<template>
  <a-dropdown
    trigger="contextMenu"
    :popup-max-height="false"
    @select="actionSelect"
  >
    <span
      class="arco-tag arco-tag-size-medium arco-tag-checked"
      :class="{ 'link-activated': itemData.fullPath === $route.fullPath }"
      @click="goto(itemData)"
    >
      <span class="tag-link">
        {{ generateTitle(itemData.title) }}
      </span>
      <span
        class="arco-icon-hover arco-tag-icon-hover arco-icon-hover-size-medium arco-tag-close-btn"
        @click.stop="tagClose(itemData, index)"
      >
        <icon-close />
      </span>
    </span>
    <template #content>
      <a-doption :disabled="disabledReload" :value="Eaction.reload">
        <icon-refresh />
        <span>重新加载</span>
      </a-doption>
      <a-doption
        class="sperate-line"
        :disabled="disabledCurrent"
        :value="Eaction.current"
      >
        <icon-close />
        <span>关闭当前标签页</span>
      </a-doption>
      <a-doption :disabled="disabledLeft" :value="Eaction.left">
        <icon-to-left />
        <span>关闭左侧标签页</span>
      </a-doption>
      <a-doption
        class="sperate-line"
        :disabled="disabledRight"
        :value="Eaction.right"
      >
        <icon-to-right />
        <span>关闭右侧标签页</span>
      </a-doption>
      <a-doption :value="Eaction.others">
        <icon-swap />
        <span>关闭其它标签页</span>
      </a-doption>
      <a-doption :value="Eaction.all">
        <icon-folder-delete />
        <span>关闭全部标签页</span>
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
  import { PropType, computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { PageProps } from '@/store/app/types';
  import useI18n from '@/hooks/useI18n';
  import usePageStore from '@/store/app/pages';
  import { FIRST_ROUTE_NAME, } from '@/router/constants';

  const pagestore = usePageStore();

  const { generateTitle } = useI18n();

  // eslint-disable-next-line no-shadow
  enum Eaction {
    reload = 'reload',
    current = 'current',
    left = 'left',
    right = 'right',
    others = 'others',
    all = 'all',
  }

  const props = defineProps({
    itemData: {
      type: Object as PropType<any>,
      default() {
        return [];
      },
    },
    index: {
      type: Number,
      default: 0,
    },
  });

  const router = useRouter();
  const route = useRoute();

  const goto = (tag: PageProps) => {
    router.push({ ...tag });
  };
  const tagList = computed(() => {
    return pagestore.getTags;
  });

  const disabledReload = computed(() => {
    return props.itemData.fullPath !== route.fullPath;
  });

  const disabledCurrent = computed(() => {
    return props.index === 0;
  });

  const disabledLeft = computed(() => {
    return [0, 1].includes(props.index);
  });

  const disabledRight = computed(() => {
    return props.index === tagList.value.length - 1;
  });

  const tagClose = (tag: PageProps, idx: number) => {
    pagestore.deleteTag(tag);
    pagestore.deletePage(tag);
    
    if (props.itemData.fullPath === route.fullPath) {
      const latest = tagList.value[idx - 1]; // 获取队列的前一个tab
      router.push({ name: latest.name });
    }
  };

  const findCurrentRouteIndex = () => {
    return tagList.value.findIndex((el) => el.fullPath === route.fullPath);
  };
  const actionSelect = async (value: any) => {
    const { itemData, index } = props;
    const copyTagList = [...tagList.value];
    if (value === Eaction.current) {
      tagClose(itemData, index);
    } else if (value === Eaction.left) {
      const currentRouteIdx = findCurrentRouteIndex();
      copyTagList.splice(1, props.index - 1);

      pagestore.freshPages(copyTagList);
      if (currentRouteIdx < index) {
        router.push({ name: itemData.name });
      }
    } else if (value === Eaction.right) {
      const currentRouteIdx = findCurrentRouteIndex();
      copyTagList.splice(props.index + 1);

      pagestore.freshPages(copyTagList);
      if (currentRouteIdx > index) {
        router.push({ name: itemData.name });
      }
    } else if (value === Eaction.others) {
      const filterList = tagList.value.filter((_el, idx) => {
        return idx === 0 || idx === props.index;
      });
      pagestore.freshPages(filterList);
      router.push({ name: itemData.name });
    } else if (value === Eaction.reload) {
      pagestore.deletePage(itemData);
      router.push({ name: FIRST_ROUTE_NAME });
      pagestore.addPage(itemData);
    } else {
      pagestore.resetTags();
      router.push({ name: FIRST_ROUTE_NAME });
    }
  };
</script>

<style scoped lang="scss">
  .tag-link {
    color: var(--color-text-2);
    text-decoration: none;
  }
  .link-activated {
    color: rgb(var(--link-6));
    .tag-link {
      color: rgb(var(--link-6));
    }
    & + .arco-tag-close-btn {
      color: rgb(var(--link-6));
    }
  }
  :deep(.arco-dropdown-option-content) {
    span {
      margin-left: 10px;
    }
  }
  .arco-dropdown-open {
    .tag-link {
      color: rgb(var(--danger-6));
    }
    .arco-tag-close-btn {
      color: rgb(var(--danger-6));
    }
  }
  .sperate-line {
    border-bottom: 1px solid var(--color-neutral-3);
  }
</style>