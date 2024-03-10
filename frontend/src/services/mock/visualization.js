import fly from '@/api/mock';

let store = null;

fly.interceptors.response.use(
	async (response) => {
    return response;
	},
	async (error) => {
    await store.insertData({
      type: 'api',
      content: error?.message,
      stack: error?.stack,
      extra: '',
      date: new Date().getTime(),
    });
	}
);

export function queryDataChainGrowth(data) {
  return fly.get('/api/data-chain-growth', data);
}

export function queryPopularAuthor() {
  return fly.get('/api/popular-author/list');
}

export function queryContentPublish() {
  return fly.get('/api/content-publish');
}

export function queryContentPeriodAnalysis() {
  return fly.get('/api/content-period-analysis');
}

export function queryPublicOpinionAnalysis(data) {
  return fly.get(
    '/api/public-opinion-analysis',
    data
  );
}

export function queryDataOverview() {
  return fly.get('/api/data-overview');
}
