import fly from '@/api/mock';

export function submitChannelForm(data) {
  return fly.get('/api/channel-form/submit', { data });
}
