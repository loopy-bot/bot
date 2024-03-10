import { defineStore } from 'pinia';
import { PageState, PageProps } from './types';
import { FIRST_ROUTE_NAME, DEFAULT_ROUTE, } from '@/router/constants';

// 缓存页面
const useAppStore = defineStore('pages', {
  state: (): PageState => ({
    pages: new Set([FIRST_ROUTE_NAME]),
    tags: [DEFAULT_ROUTE],
  }),
  getters: {
    getPages(): string[] {
      return [...this.pages];
    },
    getTags(): Array<PageProps> {
      return this.tags;
    },
  },
  actions: {
    setPages (routes: Array<string>) {
      this.$patch((state) => {
        state.pages = new Set(routes);
      });
    },
    addPage (route: PageProps) {
      this.$patch((state) => {
        state.pages.add(route?.name);
      });
    },
    deletePage (route: PageProps) {
      this.$patch((state) => {
        state.pages.delete(route?.name);
      });
    },
    freshPages (tagList: Array<PageProps>) {
      this.pages.clear();
      this.tags = tagList;
      const arr = tagList.filter((e) => e?.meta?.cachePage);
      this.pages = new Set(arr.map((e) => e?.name));
    },
    resetTags () {
      this.$patch((state) => {
        state.pages.clear();
        state.pages.add(FIRST_ROUTE_NAME);
        state.tags = [DEFAULT_ROUTE];
      });
    },
    addTag(page: PageProps) {
      this.$patch((state) => {
        if (state.tags.some((v: PageProps) => {
          return v.path === page.path;
        })) return;
        state.tags.push({ ...page, });
      });
    },
    deleteTag(page: PageProps) {
      this.$patch((state) => {
        if (!state.tags.some((v) => v.path === page.path)) return;
        for (let i = 0; i < state.tags.length; i++) {
          if (state.tags[i]?.path === page?.path) {
            state.tags.splice(i, 1);
          }
        }
      });
    },
  }
});

export default useAppStore;
