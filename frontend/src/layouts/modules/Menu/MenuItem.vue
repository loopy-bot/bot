<template>
  <template v-if="!item.hidden">
    <template v-if="onlyItem">
      <Link :to="resolvePath(onlyItem.path)">
        <a-menu-item
          :key="resolvePath(onlyItem.path)"
        >
          <template #icon>
            <Icon :meta="onlyItem.meta || item.meta" />
          </template>
          {{ generateTitle(onlyItem.meta?.title) }}
        </a-menu-item>
      </Link>
    </template>

    <a-sub-menu
      v-if="children.length"
      :key="resolvePath(item.path)"
    >
      <template v-if="item.meta" #icon>
        <Icon :meta="item.meta" />
      </template>
      <template v-if="item.meta" #title>
        {{ generateTitle(item?.meta?.title) }}
      </template>
      <menu-item v-for="route in children" :key="route.path" :item="route" :base-path="item.path" />
    </a-sub-menu>
  </template>
</template>

<script lang="ts" name="menuItem" setup>
import MenuItem from './MenuItem.vue';
import Link from './Link.vue';
import Icon from './icon';
import { isExternal } from '@/utils/validate';
import useI18n from '@/hooks/useI18n';
import { PageProps } from '@/store/app/types';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  basePath: {
    type: String,
    default: '',
  },
});
const { generateTitle } = useI18n();
const { item, } = props;
const children = ref<Array<PageProps>>([]);
const onlyItem = ref<PageProps | null>(null);

onMounted(() => {
  const subs = item.children && item.children.filter((n: PageProps) => !n.hidden);
  if (subs && subs.length > 1) {
    children.value = subs;
  } else if (subs && subs.length === 1) {
    onlyItem.value = subs[0];
  } else {
    onlyItem.value = item as PageProps;
  }
});

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  if (props.basePath === routePath) return routePath;
  return `${props.basePath}/${routePath}`;
};
</script>
