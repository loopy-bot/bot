import { reactive } from 'vue';

const pageStore = {};

const factory = (key) => {
  if (!pageStore[key]) {
    pageStore[key] = reactive({
      current: 1,
      pageSize: 20,
      total: 0,
    });
  }
  return pageStore[key];
};

export default function usePage(key) {
  const page = factory(key);
  const setPage = (value) => {
    // current, pageSize, total
    Object.assign(page, value);
  };
  return {
    page,
    setPage,
  };
}
