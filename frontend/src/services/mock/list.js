import fly from '@/api/mock';
import qs from 'query-string';

export function queryPolicyList(params) {
  return fly.get('/api/list/policy');
}

export function queryInspectionList() {
  return fly.get('/api/list/quality-inspection');
}

export function queryTheServiceList() {
  return fly.get('/api/list/the-service');
}

export function queryRulesPresetList() {
  return fly.get('/api/list/rules-preset');
}
