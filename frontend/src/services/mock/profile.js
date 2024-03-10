import fly from '@/api/mock';

export function queryProfileBasic() {
  return fly.get('/api/profile/basic');
}

export function queryOperationLog() {
  return fly.get('/api/operation/log');
}
